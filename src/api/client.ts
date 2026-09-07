import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Resolves the active authentication Bearer token.
 * Checks localStorage, sessionStorage, and environment variables.
 */
export function getAuthToken(): string | null {
  return (
    localStorage.getItem('atlas_auth_token') ||
    localStorage.getItem('atlas_token') ||
    localStorage.getItem('token') ||
    sessionStorage.getItem('atlas_auth_token') ||
    sessionStorage.getItem('atlas_token') ||
    import.meta.env.VITE_ATLAS_AUTH_TOKEN ||
    null
  );
}

/**
 * Stores a Bearer token in localStorage for subsequent API requests.
 */
export function setAuthToken(token: string): void {
  localStorage.setItem('atlas_auth_token', token);
}

/**
 * Clears stored authentication tokens.
 */
export function clearAuthToken(): void {
  localStorage.removeItem('atlas_auth_token');
  localStorage.removeItem('atlas_token');
  localStorage.removeItem('token');
  sessionStorage.removeItem('atlas_auth_token');
  sessionStorage.removeItem('atlas_token');
}

/**
 * Resolves the tenant identifier.
 * Requires explicit configuration (e.g. from session or env).
 * Does NOT fallback to an unsafe silent real-tenant default.
 */
export function getTenantId(): string | null {
  return (
    localStorage.getItem('atlas_tenant_id') ||
    sessionStorage.getItem('atlas_tenant_id') ||
    import.meta.env.VITE_ATLAS_TENANT_ID ||
    null
  );
}

export const apiClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor: dynamically attaches Bearer token & tenant header
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      if (config.headers && typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const currentTenant = getTenantId();
    if (currentTenant) {
      if (config.headers && typeof config.headers.set === 'function') {
        config.headers.set('X-Atlas-Tenant-Id', currentTenant);
      } else {
        config.headers = config.headers || {};
        config.headers['X-Atlas-Tenant-Id'] = currentTenant;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: logs clear diagnostic context for auth / network failures
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      console.warn(
        '[ATLAS API Auth]: Request rejected with 401 Unauthorized. ' +
        'Missing or invalid Bearer token. Ensure you have set a valid token via ' +
        '`setAuthToken(token)` or `VITE_ATLAS_AUTH_TOKEN` in your environment.'
      );
    } else if (status === 403) {
      console.warn(
        '[ATLAS API Auth]: Request rejected with 403 Forbidden. ' +
        'User lacks membership or permissions for the requested tenant resource.'
      );
    } else {
      console.error('[ATLAS API Error]:', status, error.message);
    }
    return Promise.reject(error);
  }
);

// Expose token utilities on window in browser environment for developer convenience
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).setAtlasToken = setAuthToken;
  (window as unknown as Record<string, unknown>).getAtlasToken = getAuthToken;
  (window as unknown as Record<string, unknown>).clearAtlasToken = clearAuthToken;
}

