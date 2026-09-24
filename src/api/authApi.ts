import { apiClient } from './client';

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
  const res = await apiClient.get<DeviceRegistration[]>('/api/learn/devices');
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
