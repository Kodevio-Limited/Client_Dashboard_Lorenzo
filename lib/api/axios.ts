import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Required to automatically send/receive HttpOnly refreshToken cookie
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Append Bearer Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = useAuthStore.getState().accessToken || localStorage.getItem('accessToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh Token Helper
export async function refreshAuthToken(): Promise<string> {
  const refreshResponse = await axios.post<{
    success?: boolean;
    message?: string;
    data: { userId: number; accessToken: string };
  }>(`${BASE_URL}/auth/refresh-token`, {}, { withCredentials: true });

  const newAccessToken = refreshResponse.data?.data?.accessToken;

  if (!newAccessToken) {
    throw new Error('Failed to refresh authentication token');
  }

  useAuthStore.getState().setAuth({ accessToken: newAccessToken });
  return newAccessToken;
}

// Response Interceptor: Handle 401 Silent Refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string; success?: boolean }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (!error.response || error.response.status !== 401) {
      const customMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
      return Promise.reject(new Error(customMessage));
    }

    if (
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/refresh-token')
    ) {
      let customMessage = error.response?.data?.message || 'Authentication failed';
      if (customMessage === 'INVALID_CREDENTIALS') {
        customMessage = 'Invalid email or password. Please check your credentials.';
      }
      return Promise.reject(new Error(customMessage));
    }

    if (originalRequest._retry) {
      useAuthStore.getState().clearAuth();
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newAccessToken = await refreshAuthToken();
      processQueue(null, newAccessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }

      return apiClient(originalRequest);
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      useAuthStore.getState().clearAuth();

      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }

      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiClient;
