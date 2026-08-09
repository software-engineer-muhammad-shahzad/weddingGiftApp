import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

interface AxiosRequestConfigWithSkipAuth extends AxiosRequestConfig {
  skipAuth?: boolean;
  // Status codes the caller expects and handles itself (e.g. a 403/404 that
  // just means "not set up yet") — skip the noisy console.error for these.
  silenceStatuses?: number[];
}

// Prefer the explicit app/env API_URL, then NEXT_PUBLIC_API_URL, then server API_URL
const baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof process !== "undefined" ? process.env.API_URL : undefined) ||
  "";

if (!baseURL && process.env.NODE_ENV !== "production") {
  // Helpful during development to surface missing env config
  // eslint-disable-next-line no-console
  console.warn(
    "Missing API base URL: set NEXT_PUBLIC_API_URL (or API_URL for server) in your .env.local or app/.env",
  );
}

export { baseURL };

/**
 * Decodes a JWT's payload (no signature verification — client-side debugging only).
 */
const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(""),
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

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
  (config: InternalAxiosRequestConfig) => {
    const skipAuth =
      (config as AxiosRequestConfigWithSkipAuth).skipAuth === true;

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      // ✅ default: attach token
      // ❌ only skip if skipAuth is true
      if (!skipAuth && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// response interceptor

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // 🔐 unauthorized handling
    // If the request explicitly opted out of auth (skipAuth), don't auto-redirect on 401.
    const requestConfig = error?.config as
      | AxiosRequestConfigWithSkipAuth
      | undefined;
    const skipAuth = requestConfig?.skipAuth === true;

    if (status === 401 && typeof window !== "undefined" && !skipAuth) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // Avoid noisy console errors for requests that explicitly opted out of auth
    // (skipAuth) — backend may still return 401 for those endpoints and that's
    // expected during temporary auth removal. Only log when not skipAuth or
    // when the status is not 401.
    const shouldLog =
      !(skipAuth && status === 401) &&
      status !== 404 &&
      !requestConfig?.silenceStatuses?.includes(status);

    if (shouldLog) {
      const isNetworkError =
        !error?.response && error?.message === "Network Error";
      console.error(
        "API Error:",
        isNetworkError
          ? `Network Error — cannot reach ${baseURL || "(missing NEXT_PUBLIC_API_URL)"}. Check that the API is running, the local HTTPS certificate is trusted, and CORS allows this origin.`
          : `status=${status ?? "unknown"} url=${error?.config?.url ?? "unknown"}`,
        error?.response?.data ?? error.message,
      );

      // Dev-only: a 401/403 is usually a token/role problem rather than a code
      // bug — print what the current token actually claims so it's visible
      // right next to the error instead of requiring a manual devtools dig.
      if (
        (status === 401 || status === 403) &&
        process.env.NODE_ENV !== "production" &&
        typeof window !== "undefined"
      ) {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Auth debug: no token in localStorage — request was unauthenticated.");
        } else {
          const claims = decodeJwtPayload(token);
          if (!claims) {
            console.error("Auth debug: token in localStorage isn't a decodable JWT.");
          } else {
            const exp = typeof claims.exp === "number" ? new Date(claims.exp * 1000) : null;
            console.error("Auth debug: current token claims:", claims);
            if (exp) {
              console.error(
                `Auth debug: token ${exp.getTime() < Date.now() ? "EXPIRED" : "valid"} — expires ${exp.toISOString()}`,
              );
            }
          }
        }
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
