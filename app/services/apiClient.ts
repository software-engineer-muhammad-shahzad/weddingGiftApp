import axios, { AxiosRequestConfig } from "axios"


interface AxiosRequestConfigWithSkipAuth extends AxiosRequestConfig {
  skipAuth?: boolean
}

// Prefer the explicit app/env API_URL, then NEXT_PUBLIC_API_URL, then server API_URL
const baseURL =
  
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof process !== "undefined" ? process.env.API_URL : undefined) ||
  ""

if (!baseURL && process.env.NODE_ENV !== "production") {
  // Helpful during development to surface missing env config
  // eslint-disable-next-line no-console
  console.warn(
    "Missing API base URL: set NEXT_PUBLIC_API_URL (or API_URL for server) in your .env.local or app/.env"
  )
}

export { baseURL }

/**
 * Axios instance
 */
const apiClient = axios.create({
  baseURL,
  // Axios has no timeout by default, so a hung backend request would
  // otherwise leave callers (e.g. a "Processing..." submit button) stuck
  // forever with no error ever surfacing.
  timeout: 20000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});


// request interceptor

apiClient.interceptors.request.use(
  (config) => {
    const requestConfig = config as AxiosRequestConfigWithSkipAuth

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      const skipAuth = requestConfig.skipAuth === true

      // ✅ default: attach token
      // ❌ only skip if skipAuth is true
      if (!skipAuth && token) {
        requestConfig.headers = requestConfig.headers || {}
        requestConfig.headers.Authorization = `Bearer ${token}`
      }
    }

    return requestConfig
  },
  (error) => Promise.reject(error)
);

// response interceptor

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // 🔐 unauthorized handling
    // If the request explicitly opted out of auth (skipAuth), don't auto-redirect on 401.
    const requestConfig = error?.config as AxiosRequestConfigWithSkipAuth | undefined
    const skipAuth = requestConfig?.skipAuth === true

    if (status === 401 && typeof window !== "undefined" && !skipAuth) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // Avoid noisy console errors for requests that explicitly opted out of auth
    // (skipAuth) — backend may still return 401 for those endpoints and that's
    // expected during temporary auth removal. Only log when not skipAuth or
    // when the status is not 401.
    const shouldLog = !(skipAuth && status === 401)

    if (shouldLog) {
      console.error(
        "API Error:",
        error?.response?.data || error.message
      );
    }

    return Promise.reject(error);
  }
);


export default apiClient;
