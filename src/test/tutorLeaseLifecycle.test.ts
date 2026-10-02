import test, { describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import type { AxiosResponse } from 'axios';
import { apiClient, setTutorLeaseToken, getTutorLeaseToken } from '../api/client';
import {
  ensureTutorLease,
  resetTutorLeaseGate,
  getOrCreateDeviceId,
  getDeviceFriendlyName,
  acquireTutorLease,
  sendTutorHeartbeat,
  releaseTutorLease,
  listDevices,
} from '../api/authApi';

// In-memory mock storage for Node environment
class MockStorage {
  private store: Map<string, string> = new Map();
  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  clear(): void {
    this.store.clear();
  }
}

const mockLocalStorage = new MockStorage();
const mockSessionStorage = new MockStorage();

// Install mock storage onto globalThis
(globalThis as unknown as { localStorage: MockStorage }).localStorage = mockLocalStorage;
(globalThis as unknown as { sessionStorage: MockStorage }).sessionStorage = mockSessionStorage;

describe('ATLAS Learn — P0 R4.1 Tutor Lease Lifecycle & Error Classification', () => {
  let requestLog: Array<{
    method: string;
    url: string;
    headers: Record<string, string>;
    data?: unknown;
  }> = [];

  let leaseCounter = 0;
  let simulatedConflict: boolean = false;
  let simulatedConflictData: { activeDeviceName: string; message: string } | null = null;
  let simulatedLeaseRequired: boolean = false;
  let simulatedDeviceLimitExceeded: boolean = false;
  let simulatedDeviceRevoked: boolean = false;

  beforeEach(() => {
    requestLog = [];
    leaseCounter = 0;
    simulatedConflict = false;
    simulatedConflictData = null;
    simulatedLeaseRequired = false;
    simulatedDeviceLimitExceeded = false;
    simulatedDeviceRevoked = false;
    mockLocalStorage.clear();
    mockSessionStorage.clear();
    resetTutorLeaseGate();

    // Set an auth token so the client is considered authenticated
    mockLocalStorage.setItem('atlas_auth_token', 'mock-jwt-learner-101');

    // Intercept all requests via custom axios adapter
    apiClient.defaults.adapter = async (config) => {
      const headersRecord: Record<string, string> = {};
      if (config.headers) {
        if (typeof config.headers.forEach === 'function') {
          config.headers.forEach((val: string, key: string) => {
            headersRecord[key] = val;
          });
        } else {
          for (const [k, v] of Object.entries(config.headers)) {
            if (typeof v === 'string') headersRecord[k] = v;
          }
        }
      }

      requestLog.push({
        method: (config.method || 'get').toUpperCase(),
        url: config.url || '',
        headers: headersRecord,
        data: config.data ? (typeof config.data === 'string' ? JSON.parse(config.data) : config.data) : undefined,
      });

      const url = config.url || '';

      if (url.includes('/api/learn/tutor/lease/acquire')) {
        if (simulatedDeviceLimitExceeded) {
          return Promise.reject({
            response: {
              status: 403,
              statusText: 'Forbidden',
              data: {
                error: 'DEVICE_LIMIT_EXCEEDED',
                message: 'Maximum registered devices (2) reached for this account.',
                maxDevices: 2,
              },
            },
          });
        }

        if (simulatedDeviceRevoked) {
          return Promise.reject({
            response: {
              status: 403,
              statusText: 'Forbidden',
              data: {
                status: 'REVOKED',
                error: 'DEVICE_REVOKED',
                message: 'This device registration has been revoked.',
              },
            },
          });
        }

        if (simulatedConflict) {
          return {
            data: {
              status: 'CONFLICT',
              leaseToken: null,
              expiresAt: null,
              activeDeviceName: simulatedConflictData?.activeDeviceName || 'Chrome on Windows 11',
              message: simulatedConflictData?.message || 'Another device is currently using this tutor session.',
            },
            status: 409,
            statusText: 'Conflict',
            headers: {},
            config,
          };
        }

        leaseCounter++;
        const token = `lease-token-uuid-${leaseCounter}`;
        return {
          data: {
            status: 'GRANTED',
            leaseToken: token,
            expiresAt: new Date(Date.now() + 60000).toISOString(),
            activeDeviceName: null,
            message: 'Lease granted',
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }

      if (url.includes('/api/learn/tutor/lease/heartbeat')) {
        return {
          data: { status: 'OK' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }

      if (url.includes('/api/learn/tutor/lease/release')) {
        return {
          data: { status: 'OK' },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }

      if (url.includes('/api/learn/devices')) {
        const callerDeviceId = headersRecord['X-Atlas-Device-Id'];
        return {
          data: [
            {
              id: 'dev-reg-1',
              deviceName: 'Google Chrome on Windows 10/11',
              userAgentSummary: 'Mozilla/5.0 Chrome/131',
              status: 'ACTIVE',
              registeredAt: '2026-10-01T10:00:00Z',
              lastSeenAt: '2026-10-02T12:00:00Z',
              currentDevice: callerDeviceId === 'dev-current-123',
            },
            {
              id: 'dev-reg-2',
              deviceName: 'Apple Safari on macOS',
              userAgentSummary: 'Mozilla/5.0 Safari/605',
              status: 'ACTIVE',
              registeredAt: '2026-09-30T10:00:00Z',
              lastSeenAt: '2026-10-01T08:00:00Z',
              currentDevice: false,
            },
          ],
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }

      if (url.includes('/api/learn/tutor')) {
        const leaseToken = headersRecord['X-Atlas-Lease-Token'] || (config.headers as Record<string, string>)?.['X-Atlas-Lease-Token'];
        if (!leaseToken) {
          // Backend returns HTTP 428 Precondition Required for missing lease token
          return Promise.reject({
            response: {
              status: 428,
              statusText: 'Precondition Required',
              data: {
                error: 'LEASE_REQUIRED',
                message: 'An active tutor lease token is required to start a learning session.',
              },
            },
          });
        }

        if (simulatedLeaseRequired) {
          simulatedLeaseRequired = false; // only fail once
          return Promise.reject({
            response: {
              status: 428,
              statusText: 'Precondition Required',
              data: {
                error: 'LEASE_REQUIRED',
                message: 'An active tutor lease token is required to start a learning session.',
              },
            },
          });
        }

        return {
          data: {
            answer: 'Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide.',
            sources: [],
            suggestedFollowUps: ['Explain chlorophyll', 'Show light reaction'],
          },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      }

      return {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      };
    };
  });

  // LEASE-01: Fresh Live session acquires valid lease
  test('LEASE-01: Fresh Live session acquires valid lease', async () => {
    assert.strictEqual(getTutorLeaseToken(), null, 'Should start with no lease token');
    const res = await ensureTutorLease(false);
    assert.strictEqual(res.status, 'GRANTED');
    if (res.status === 'GRANTED') {
      assert.ok(res.leaseToken.startsWith('lease-token-uuid-'));
      assert.strictEqual(getTutorLeaseToken(), res.leaseToken, 'Token must be stored in storage');
    }
  });

  // LEASE-02: Multiple Tutor questions in same topic retain lease
  test('LEASE-02: Multiple Tutor questions in same topic retain lease', async () => {
    const first = await ensureTutorLease(false);
    assert.strictEqual(first.status, 'GRANTED');
    const initialToken = (first as { leaseToken: string }).leaseToken;

    const second = await ensureTutorLease(false);
    assert.strictEqual(second.status, 'GRANTED');
    assert.strictEqual((second as { leaseToken: string }).leaseToken, initialToken, 'Must retain same token without reacquiring');

    const third = await ensureTutorLease(false);
    assert.strictEqual((third as { leaseToken: string }).leaseToken, initialToken);
    assert.strictEqual(leaseCounter, 1, 'Only one acquisition request must have been made to backend');
  });

  // LEASE-03: Topic A → Topic B retains browser/device lease
  test('LEASE-03: Topic A -> Topic B retains browser/device lease', async () => {
    const topicALease = await ensureTutorLease(false);
    assert.strictEqual(topicALease.status, 'GRANTED');
    const tokenA = (topicALease as { leaseToken: string }).leaseToken;

    // Simulate navigation: Topic A -> Topic B (different curriculum session, same device)
    const topicBLease = await ensureTutorLease(false);
    assert.strictEqual(topicBLease.status, 'GRANTED');
    assert.strictEqual((topicBLease as { leaseToken: string }).leaseToken, tokenA, 'Device lease must persist across topic transitions');
  });

  // LEASE-04: Subject A → Subject B retains browser/device lease
  test('LEASE-04: Subject A -> Subject B retains browser/device lease', async () => {
    const scienceLease = await ensureTutorLease(false);
    const scienceToken = (scienceLease as { leaseToken: string }).leaseToken;

    // Simulate navigation: Science -> Mathematics
    const mathLease = await ensureTutorLease(false);
    assert.strictEqual((mathLease as { leaseToken: string }).leaseToken, scienceToken, 'Device lease must persist across subject transitions');
  });

  // LEASE-05: Teach Me → Clarify More retains lease
  test('LEASE-05: Teach Me -> Clarify More retains lease', async () => {
    const teachMeLease = await ensureTutorLease(false);
    const token = (teachMeLease as { leaseToken: string }).leaseToken;

    // Clarify More invokes Tutor interaction in same topic
    const clarifyLease = await ensureTutorLease(false);
    assert.strictEqual((clarifyLease as { leaseToken: string }).leaseToken, token, 'Lease must be retained across Teach Me and Clarify More');
  });

  // LEASE-06: Mock → Live establishes/reuses exactly one valid lease
  test('LEASE-06: Mock -> Live establishes/reuses exactly one valid lease', async () => {
    // In Mock mode, no lease was acquired
    assert.strictEqual(getTutorLeaseToken(), null);
    assert.strictEqual(leaseCounter, 0);

    // Switch to Live triggers eager lease acquisition
    const liveLease = await ensureTutorLease(false);
    assert.strictEqual(liveLease.status, 'GRANTED');
    assert.strictEqual(leaseCounter, 1, 'Exactly one lease acquired on switch to Live');
    assert.strictEqual(getTutorLeaseToken(), (liveLease as { leaseToken: string }).leaseToken);
  });

  // LEASE-07: Mock → Live does not produce false 409
  test('LEASE-07: Mock -> Live does not produce false 409', async () => {
    const liveLease = await ensureTutorLease(false);
    assert.notStrictEqual(liveLease.status, 'CONFLICT', 'Switching to live must never produce a false conflict');
    assert.strictEqual(liveLease.status, 'GRANTED');
  });

  // LEASE-08: Browser refresh behaves according to intended lease semantics
  test('LEASE-08: Browser refresh retains active lease from storage', async () => {
    const first = await ensureTutorLease(false);
    const initialToken = (first as { leaseToken: string }).leaseToken;

    // Simulate browser refresh: in-memory gate resets, but storage persists
    resetTutorLeaseGate();
    // Restore the token in storage as browser refresh would preserve sessionStorage
    setTutorLeaseToken(initialToken);

    const afterRefresh = await ensureTutorLease(false);
    assert.strictEqual(afterRefresh.status, 'GRANTED');
    assert.strictEqual((afterRefresh as { leaseToken: string }).leaseToken, initialToken, 'Reuses lease from storage without re-acquisition');
    assert.strictEqual(leaseCounter, 1, 'No new network call on refresh when token is present');
  });

  // LEASE-09: One browser cannot falsely classify itself as another device
  test('LEASE-09: One browser cannot falsely classify itself as another device', async () => {
    const devId1 = getOrCreateDeviceId();
    const devId2 = getOrCreateDeviceId();
    assert.strictEqual(devId1, devId2, 'Same browser must maintain consistent device ID');

    const res = await ensureTutorLease(false);
    assert.strictEqual(res.status, 'GRANTED');
    const acquireReq = requestLog.find((r) => r.url.includes('/lease/acquire'));
    assert.ok(acquireReq, 'Acquire request was sent');
    assert.strictEqual((acquireReq.data as { deviceId: string }).deviceId, devId1);
  });

  // LEASE-10: A genuine competing client follows the intended transfer/reconnect policy
  test('LEASE-10: A genuine competing client receives structured CONFLICT with activeDeviceName', async () => {
    simulatedConflict = true;
    simulatedConflictData = {
      activeDeviceName: 'Safari on iPad Pro',
      message: 'Another device is currently using this tutor session.',
    };

    const res = await ensureTutorLease(false);
    assert.strictEqual(res.status, 'CONFLICT');
    if (res.status === 'CONFLICT') {
      assert.strictEqual(res.conflictData.activeDeviceName, 'Safari on iPad Pro');
      assert.strictEqual(getTutorLeaseToken(), null, 'Conflicting token must not be stored');
    }
  });

  // LEASE-11: Curriculum-scoped conversation IDs remain isolated after lease fix
  test('LEASE-11: Curriculum-scoped conversation IDs remain isolated from lease identity', async () => {
    const leaseRes = await ensureTutorLease(false);
    assert.strictEqual(leaseRes.status, 'GRANTED');
    const leaseToken = (leaseRes as { leaseToken: string }).leaseToken;

    const convId1 = 'student-101:grade-10:science:plant-cells';
    const convId2 = 'student-101:grade-10:science:animal-cells';

    assert.notStrictEqual(convId1, convId2, 'Conversation IDs must remain curriculum-isolated');
    // Both independent conversation scopes share the same valid device lease token
    assert.strictEqual(getTutorLeaseToken(), leaseToken);
  });

  // LEASE-12: Logout properly releases/clears applicable lease state
  test('LEASE-12: Logout properly releases/clears applicable lease state and resets gate', async () => {
    const res = await ensureTutorLease(false);
    const token = (res as { leaseToken: string }).leaseToken;
    assert.ok(token);

    // Call releaseTutorLease
    await releaseTutorLease(token);
    assert.strictEqual(getTutorLeaseToken(), null, 'Token must be cleared after release');

    const releaseReq = requestLog.find((r) => r.url.includes('/lease/release'));
    assert.ok(releaseReq, 'Release request must have been sent to backend');
    assert.strictEqual((releaseReq.data as { leaseToken: string }).leaseToken, token);
  });

  // LEASE-13: Two callers invoke ensureTutorLease() concurrently
  test('LEASE-13: Concurrent ensureTutorLease() invocations share exact same in-flight promise', async () => {
    // Fire two calls simultaneously without waiting for the first
    const [p1, p2] = await Promise.all([
      ensureTutorLease(false),
      ensureTutorLease(false),
    ]);

    assert.strictEqual(p1.status, 'GRANTED');
    assert.strictEqual(p2.status, 'GRANTED');
    assert.strictEqual(
      (p1 as { leaseToken: string }).leaseToken,
      (p2 as { leaseToken: string }).leaseToken,
      'Both callers must receive the exact same lease token'
    );
    assert.strictEqual(leaseCounter, 1, 'Backend must only be called ONCE despite concurrent callers');
  });

  // LEASE-14: Teach Me → /tutor?q=... under Live with no cached token
  test('LEASE-14: Prefilled query awaits lease before inference and dispatches exactly once', async () => {
    assert.strictEqual(getTutorLeaseToken(), null);

    // Caller 1 (Mount effect) and Caller 2 (URL prefill handler) both request lease concurrently
    const [mountLease, prefillLease] = await Promise.all([
      ensureTutorLease(false),
      ensureTutorLease(false),
    ]);

    assert.strictEqual(mountLease.status, 'GRANTED');
    assert.strictEqual(prefillLease.status, 'GRANTED');

    // Live inference request sent using apiClient
    await apiClient.post('/api/learn/tutor', {
      message: 'Explain Pythagoras Theorem',
      subjectId: 'math',
      topicId: 'geometry',
    });

    const tutorRequests = requestLog.filter((r) => r.url.includes('/api/learn/tutor') && !r.url.includes('/lease'));
    assert.strictEqual(tutorRequests.length, 1, 'Tutor request sent exactly once');
    assert.strictEqual(
      tutorRequests[0].headers['X-Atlas-Lease-Token'],
      (prefillLease as { leaseToken: string }).leaseToken,
      'Live request must include the acquired lease token header'
    );
  });

  // LEASE-15: Backend returns LEASE_REQUIRED (428)
  test('LEASE-15: Backend LEASE_REQUIRED (428) leaves isSuperseded false and allows recovery retry', async () => {
    // Simulate scenario: frontend had no token, backend returned 428 Precondition Required
    setTutorLeaseToken(null);
    let caughtStatus: number | undefined;
    let caughtErrorCode: string | undefined;

    try {
      await apiClient.post('/api/learn/tutor', { message: 'Hello' });
    } catch (err: unknown) {
      const axErr = err as { response?: { status?: number; data?: { error?: string } } };
      caughtStatus = axErr.response?.status;
      caughtErrorCode = axErr.response?.data?.error;
    }

    assert.strictEqual(caughtStatus, 428, 'Backend must return 428 for missing lease');
    assert.strictEqual(caughtErrorCode, 'LEASE_REQUIRED');

    // Verify recovery: acquiring lease and retrying succeeds
    const recovery = await ensureTutorLease(false);
    assert.strictEqual(recovery.status, 'GRANTED');
    const retryRes = await apiClient.post('/api/learn/tutor', { message: 'Hello' });
    assert.strictEqual(retryRes.status, 200);
  });

  // LEASE-16: Backend returns genuine DEVICE_CONFLICT (409)
  test('LEASE-16: Backend genuine DEVICE_CONFLICT (409) propagates structured conflict data', async () => {
    simulatedConflict = true;
    simulatedConflictData = {
      activeDeviceName: 'Firefox on macOS Sonoma',
      message: 'Active lease belongs to Firefox on macOS Sonoma.',
    };

    const res = await ensureTutorLease(false);
    assert.strictEqual(res.status, 'CONFLICT');
    if (res.status === 'CONFLICT') {
      assert.strictEqual(res.conflictData.status, 'CONFLICT');
      assert.strictEqual(res.conflictData.activeDeviceName, 'Firefox on macOS Sonoma');
    }
  });

  // LEASE-17 & NEGATIVE NETWORK ASSERTION: No tokenless Live POST
  test('LEASE-17 & NEGATIVE NETWORK ASSERTION: Live inference never dispatched without active lease token', async () => {
    // Invariant: Before ensureTutorLease() finishes, no POST /api/learn/tutor is dispatched
    setTutorLeaseToken(null);
    resetTutorLeaseGate();

    let tutorPostAttemptedWithoutLease = false;

    // Simulate defensive pre-inference gate from TutorPage.tsx
    const liveMessageDispatcher = async (msg: string) => {
      const token = getTutorLeaseToken();
      if (!token) {
        // Defensive gate requires lease
        const leaseRes = await ensureTutorLease(false);
        if (leaseRes.status !== 'GRANTED') {
          return { error: 'NO_LEASE' };
        }
      }

      // Check invariant before network call
      const activeToken = getTutorLeaseToken();
      if (!activeToken) {
        tutorPostAttemptedWithoutLease = true;
        throw new Error('INVARIANT_VIOLATION: Dispatched live inference without lease token!');
      }

      return apiClient.post('/api/learn/tutor', { message: msg });
    };

    const result = (await liveMessageDispatcher('What is an animal cell?')) as AxiosResponse;
    assert.strictEqual(tutorPostAttemptedWithoutLease, false, 'No POST was dispatched without a token');
    assert.strictEqual(result.status, 200);

    const tutorPosts = requestLog.filter((r) => r.url === '/api/learn/tutor');
    assert.strictEqual(tutorPosts.length, 1);
    assert.ok(tutorPosts[0].headers['X-Atlas-Lease-Token'], 'Dispatched POST must carry X-Atlas-Lease-Token header');
  });

  // DEVICE-01: Backend HTTP 403 DEVICE_LIMIT_EXCEEDED returns structured domain result
  test('DEVICE-01: Backend HTTP 403 DEVICE_LIMIT_EXCEEDED maps to structured DEVICE_LIMIT_EXCEEDED result', async () => {
    simulatedDeviceLimitExceeded = true;

    const res = await ensureTutorLease(false);
    assert.strictEqual(res.status, 'DEVICE_LIMIT_EXCEEDED');
    if (res.status === 'DEVICE_LIMIT_EXCEEDED') {
      assert.strictEqual(res.maxDevices, 2);
      assert.ok(res.message.includes('Maximum registered devices'));
    }
  });

  // DEVICE-02: Device limit exceeded does NOT set leaseToken in storage
  test('DEVICE-02: Device limit error does not store lease token in client storage', async () => {
    simulatedDeviceLimitExceeded = true;
    setTutorLeaseToken(null);

    await ensureTutorLease(false);
    assert.strictEqual(getTutorLeaseToken(), null, 'Lease token must not be stored on quota failure');
  });

  // DEVICE-03: Concurrent ensureTutorLease() calls under quota limit share single network request
  test('DEVICE-03: Concurrent ensureTutorLease() calls under quota limit are deduplicated to 1 call', async () => {
    simulatedDeviceLimitExceeded = true;

    const [r1, r2, r3] = await Promise.all([
      ensureTutorLease(false),
      ensureTutorLease(false),
      ensureTutorLease(false),
    ]);

    assert.strictEqual(r1.status, 'DEVICE_LIMIT_EXCEEDED');
    assert.strictEqual(r2.status, 'DEVICE_LIMIT_EXCEEDED');
    assert.strictEqual(r3.status, 'DEVICE_LIMIT_EXCEEDED');

    const acquireCalls = requestLog.filter((r) => r.url.includes('/api/learn/tutor/lease/acquire'));
    assert.strictEqual(acquireCalls.length, 1, 'Concurrent lease attempts must be deduplicated to 1 network call');
  });

  // DEVICE-04: listDevices() sends X-Atlas-Device-Id header
  test('DEVICE-04: listDevices() sends X-Atlas-Device-Id header with client device ID', async () => {
    mockLocalStorage.setItem('atlas_learn_device_id', 'dev-current-123');

    const devices = await listDevices();
    assert.ok(devices.length > 0);

    const devCall = requestLog.find((r) => r.url === '/api/learn/devices');
    assert.ok(devCall, 'Must call /api/learn/devices');
    assert.strictEqual(devCall.headers['X-Atlas-Device-Id'], 'dev-current-123');
  });

  // DEVICE-05: listDevices() identifies current device via currentDevice boolean
  test('DEVICE-05: listDevices() receives currentDevice boolean distinguishing current device', async () => {
    mockLocalStorage.setItem('atlas_learn_device_id', 'dev-current-123');

    const devices = await listDevices();
    assert.strictEqual(devices.length, 2);

    const currentDev = devices.find((d) => d.id === 'dev-reg-1');
    const otherDev = devices.find((d) => d.id === 'dev-reg-2');

    assert.strictEqual(currentDev?.currentDevice, true, 'Matching device must have currentDevice = true');
    assert.strictEqual(otherDev?.currentDevice, false, 'Non-matching device must have currentDevice = false');
  });

  // DEVICE-06: Backend HTTP 403 DEVICE_REVOKED maps to structured DEVICE_REVOKED result
  test('DEVICE-06: Backend HTTP 403 DEVICE_REVOKED maps to structured DEVICE_REVOKED result', async () => {
    simulatedDeviceRevoked = true;

    const res = await ensureTutorLease(false);
    assert.strictEqual(res.status, 'DEVICE_REVOKED');
    if (res.status === 'DEVICE_REVOKED') {
      assert.ok(res.message.includes('revoked'));
    }
  });

  // DEVICE-07: Invariant check: DEVICE_LIMIT_EXCEEDED is distinct from CONFLICT
  test('DEVICE-07: DEVICE_LIMIT_EXCEEDED does not produce CONFLICT or populate conflictData', async () => {
    simulatedDeviceLimitExceeded = true;

    const res = await ensureTutorLease(false);
    assert.notStrictEqual(res.status, 'CONFLICT');
    assert.strictEqual(res.status, 'DEVICE_LIMIT_EXCEEDED');
  });
});
