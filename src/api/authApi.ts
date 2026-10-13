import { apiClient, getTutorLeaseToken, setTutorLeaseToken } from './client';

export interface LearnerProfile {
  id: string;
  displayName: string;
  grade: string;
  curriculumCode: string;
  preferredLanguage: string;
  enrolledSubjects: string[];
  isPrimary: boolean;
  status: string;
}

export interface LearnSessionData {
  authenticated: boolean;
  userId: string | null;
  email: string | null;
  displayName: string | null;
  accountId: string | null;
  studentId?: string | null;
  accountStatus?: 'PENDING_PAYMENT' | 'ACTIVE' | 'SUSPENDED' | 'EXPIRED' | string | null;
  registeredGrade?: string | null;
  accountType: 'GUARDIAN' | 'INDEPENDENT_STUDENT' | null;
  activeLearner: LearnerProfile | null;
  learners: LearnerProfile[];
}

export interface DeviceRegistration {
  id: string;
  deviceName: string;
  userAgentSummary: string;
  status: 'ACTIVE' | 'REVOKED';
  registeredAt: string;
  lastSeenAt: string;
  currentDevice?: boolean;
}

export interface TutorLeaseResponse {
  status: 'GRANTED' | 'CONFLICT' | 'INVALID' | 'REVOKED';
  leaseToken: string | null;
  expiresAt: string | null;
  activeDeviceName: string | null;
  message: string;
}

export interface TutorLeaseRequest {
  learnerId?: string;
  deviceId: string;
  deviceName: string;
  forceTakeover?: boolean;
}

export interface StudentProfileData {
  id: string;
  name: string;
  grade: string;
  language: string;
  streakDays: number;
  topicsMastered: number;
  questionsAnswered: number;
  accuracyPercent: number;
  badges: Array<{
    id: string;
    title: Record<string, string>;
    description: Record<string, string>;
    icon: string;
    unlockedAt: string;
  }>;
}

export interface StudentProfileUpdateRequest {
  name?: string;
  grade?: string;
  language?: string;
}

/**
 * Fetches the currently authenticated session details from the BFF.
 */
export async function getSession(): Promise<LearnSessionData> {
  const res = await apiClient.get<LearnSessionData>('/api/learn/auth/session');
  return res.data;
}

/**
 * Initiates student login by redirecting browser to Keycloak via BFF PKCE initiation.
 */
export function redirectToLogin(returnPath: string = '/'): void {
  window.location.href = `/api/learn/auth/login?redirect=${encodeURIComponent(returnPath)}`;
}

// ─── Direct-grant Registration & Login ────────────────────────────────────────

export interface RegisterRequest {
  fullName: string;
  username: string;
  password: string;
  mobileNumber: string;
  grade: string;
  preferredLanguage: string;
  email?: string;
  name?: string;
  language?: string;
}

export interface RegisterResponse {
  studentId: string;
  fullName: string;
  username: string;
  mobileNumber: string;
  grade: string;
  preferredLanguage: string;
  status: 'PENDING_PAYMENT' | 'ACTIVE' | 'SUSPENDED' | 'EXPIRED';
  whatsappSupportNumber: string;
  message: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * Registers a new student account via the BFF.
 * On success returns student registration details with generated Student ID (e.g. ATL-26-XXXXXX)
 * and WhatsApp instructions for payment slip activation.
 */
export async function registerStudent(req: RegisterRequest): Promise<RegisterResponse> {
  const payload = {
    fullName: req.fullName || req.name || '',
    username: req.username,
    password: req.password,
    mobileNumber: req.mobileNumber,
    grade: req.grade || 'grade-10',
    preferredLanguage: req.preferredLanguage || req.language || 'en',
    email: req.email,
  };
  const res = await apiClient.post<RegisterResponse>('/api/learn/auth/register', payload);
  return res.data;
}

/**
 * Signs in an existing student with username + password via the BFF direct-grant flow.
 * Passes X-Atlas-Device-Id and X-Atlas-Device-Name headers to enforce the 2-device limit.
 * On success the backend sets HttpOnly session cookies.
 * Returns the active LearnSessionData for immediate in-app sign-in.
 */
export async function loginWithPassword(req: LoginRequest): Promise<LearnSessionData> {
  const deviceId = getOrCreateDeviceId();
  const deviceName = getDeviceFriendlyName();
  const res = await apiClient.post<LearnSessionData>('/api/learn/auth/login', req, {
    headers: {
      'X-Atlas-Device-Id': deviceId,
      'X-Atlas-Device-Name': deviceName,
    },
  });
  return res.data;
}

/**
 * Logs out the current student session, clears cookies, and returns the Keycloak logout redirect.
 */
export async function logout(): Promise<string | undefined> {
  const res = await apiClient.post<{ status: string; logoutUrl?: string }>('/api/learn/auth/logout');
  return res.data?.logoutUrl;
}

/**
 * Revokes all sessions and active devices for the account and returns the Keycloak logout redirect.
 */
export async function logoutAll(): Promise<string | undefined> {
  const res = await apiClient.post<{ status: string; logoutUrl?: string }>('/api/learn/auth/logout-all');
  return res.data?.logoutUrl;
}

/**
 * Fetches the student profile from durable PostgreSQL storage.
 */
export async function getProfile(): Promise<StudentProfileData> {
  const res = await apiClient.get<StudentProfileData>('/api/learn/profile');
  return res.data;
}

export interface AllowedGradesData {
  studentId: string;
  accountType: string;
  defaultGrade: string | null;
  /** Grades the learner is entitled to, as "grade-N" (a STUDENT has exactly their registered grade). */
  allowedGrades: string[];
}

/** Grades the signed-in learner is entitled to (GET /api/learn/entitlements/allowed-grades). */
export async function getAllowedGrades(): Promise<AllowedGradesData> {
  const res = await apiClient.get<AllowedGradesData>('/api/learn/entitlements/allowed-grades');
  return res.data;
}

/**
 * Updates the student profile in durable PostgreSQL storage.
 */
export async function updateProfile(req: StudentProfileUpdateRequest): Promise<StudentProfileData> {
  const res = await apiClient.put<StudentProfileData>('/api/learn/profile', req);
  return res.data;
}

/**
 * Lists all registered devices for the student account.
 */
export async function listDevices(): Promise<DeviceRegistration[]> {
  const deviceId = getOrCreateDeviceId();
  const res = await apiClient.get<DeviceRegistration[]>('/api/learn/devices', {
    headers: {
      'X-Atlas-Device-Id': deviceId,
    },
  });
  return res.data;
}

/**
 * Revokes a registered device.
 */
export async function revokeDevice(deviceId: string): Promise<void> {
  await apiClient.delete(`/api/learn/devices/${deviceId}`);
}

/**
 * Requests an exclusive tutor lease for this device.
 */
export async function acquireTutorLease(req: TutorLeaseRequest): Promise<TutorLeaseResponse> {
  const res = await apiClient.post<TutorLeaseResponse>('/api/learn/tutor/lease/acquire', req);
  return res.data;
}

export type EnsureTutorLeaseResult =
  | { status: 'GRANTED'; leaseToken: string }
  | { status: 'CONFLICT'; conflictData: TutorLeaseResponse }
  | { status: 'DEVICE_LIMIT_EXCEEDED'; message: string; maxDevices: number }
  | { status: 'DEVICE_REVOKED'; message: string }
  | { status: 'UNAUTHENTICATED' }
  | { status: 'ERROR'; error: unknown };

let inFlightLeasePromise: Promise<EnsureTutorLeaseResult> | null = null;

/**
 * Idempotent lease gate:
 * - If a valid active lease token exists and not forcing takeover, reuses it immediately.
 * - If an acquisition is already in progress, awaits the exact same in-flight promise.
 * - Otherwise acquires a lease from the backend, caches it in client storage, and returns the result.
 * - Disallows duplicate concurrent network calls.
 */
export async function ensureTutorLease(forceTakeover: boolean = false): Promise<EnsureTutorLeaseResult> {
  if (!forceTakeover) {
    const existing = getTutorLeaseToken();
    if (existing) {
      return { status: 'GRANTED', leaseToken: existing };
    }
  }

  if (inFlightLeasePromise) {
    return inFlightLeasePromise;
  }

  inFlightLeasePromise = (async () => {
    try {
      const devId = getOrCreateDeviceId();
      const devName = getDeviceFriendlyName();
      const res = await acquireTutorLease({
        deviceId: devId,
        deviceName: devName,
        forceTakeover: !!forceTakeover,
      });

      if (res.status === 'GRANTED' && res.leaseToken) {
        setTutorLeaseToken(res.leaseToken);
        return { status: 'GRANTED' as const, leaseToken: res.leaseToken };
      } else if (res.status === 'CONFLICT') {
        setTutorLeaseToken(null);
        return { status: 'CONFLICT' as const, conflictData: res };
      } else if (res.status === 'REVOKED') {
        setTutorLeaseToken(null);
        return { status: 'DEVICE_REVOKED' as const, message: res.message || 'This device has been revoked.' };
      } else {
        return { status: 'ERROR' as const, error: new Error(res.message || 'Lease not granted') };
      }
    } catch (err: unknown) {
      const axErr = err as {
        response?: {
          status?: number;
          data?: {
            status?: string;
            error?: string;
            message?: string;
            maxDevices?: number;
            leaseToken?: string | null;
            expiresAt?: string | null;
            activeDeviceName?: string | null;
          };
        };
      };
      if (axErr.response?.status === 401) {
        return { status: 'UNAUTHENTICATED' as const };
      }
      if (axErr.response?.status === 403) {
        const data = axErr.response.data;
        if (data?.error === 'DEVICE_LIMIT_EXCEEDED' || data?.status === 'DEVICE_LIMIT_EXCEEDED') {
          setTutorLeaseToken(null);
          return {
            status: 'DEVICE_LIMIT_EXCEEDED' as const,
            message: data.message || 'Maximum registered devices limit reached.',
            maxDevices: data.maxDevices || 2,
          };
        }
        if (data?.status === 'REVOKED' || data?.error === 'DEVICE_REVOKED') {
          setTutorLeaseToken(null);
          return {
            status: 'DEVICE_REVOKED' as const,
            message: data.message || 'This device has been revoked.',
          };
        }
      }
      if (axErr.response?.status === 409 || axErr.response?.data?.status === 'CONFLICT') {
        const conflict: TutorLeaseResponse = {
          status: 'CONFLICT',
          leaseToken: axErr.response?.data?.leaseToken || null,
          expiresAt: axErr.response?.data?.expiresAt || null,
          activeDeviceName: axErr.response?.data?.activeDeviceName || null,
          message: axErr.response?.data?.message || 'Another device is currently using this tutor session.',
        };
        setTutorLeaseToken(null);
        return { status: 'CONFLICT' as const, conflictData: conflict };
      }
      return { status: 'ERROR' as const, error: err };
    } finally {
      inFlightLeasePromise = null;
    }
  })();

  return inFlightLeasePromise!;
}

export function resetTutorLeaseGate(): void {
  inFlightLeasePromise = null;
  setTutorLeaseToken(null);
}

/**
 * Extends the active lease heartbeat every 30 seconds.
 */
export async function sendTutorHeartbeat(leaseToken: string): Promise<boolean> {
  try {
    const res = await apiClient.post<{ status: string }>('/api/learn/tutor/lease/heartbeat', { leaseToken });
    return res.data.status === 'ACTIVE';
  } catch (err) {
    return false;
  }
}

/**
 * Releases the exclusive tutor lease on navigation away.
 */
export async function releaseTutorLease(leaseToken: string): Promise<void> {
  try {
    await apiClient.post('/api/learn/tutor/lease/release', { leaseToken });
  } catch (err) {
    console.warn('[authApi] Failed to release tutor lease:', err);
  } finally {
    resetTutorLeaseGate();
  }
}

/**
 * Resolves or creates a persistent device ID for this browser.
 */
export function getOrCreateDeviceId(): string {
  if (typeof localStorage === 'undefined') return 'server-device';
  let devId = localStorage.getItem('atlas_learn_device_id');
  if (!devId) {
    devId = 'dev-' + Math.random().toString(36).substring(2, 12) + '-' + Date.now().toString(36);
    localStorage.setItem('atlas_learn_device_id', devId);
  }
  return devId;
}

/**
 * Generates a human-friendly name for this device.
 */
export function getDeviceFriendlyName(): string {
  if (typeof navigator === 'undefined') return 'Web Browser';
  const ua = navigator.userAgent;
  let browser = 'Browser';
  if (ua.includes('Edg/')) browser = 'Microsoft Edge';
  else if (ua.includes('Chrome/')) browser = 'Google Chrome';
  else if (ua.includes('Firefox/')) browser = 'Mozilla Firefox';
  else if (ua.includes('Safari/')) browser = 'Apple Safari';

  let os = 'Device';
  if (ua.includes('Windows NT 10.0')) os = 'Windows 10/11';
  else if (ua.includes('Macintosh')) os = 'macOS';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Linux')) os = 'Linux';

  return `${browser} on ${os}`;
}
