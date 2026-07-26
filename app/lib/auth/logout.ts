import { clearAllData } from "@/app/utils/storage/storageHelper"

export type LogoutReason = "inactivity" | "expired" | "manual"

/**
 * Clears auth session and sends the user to login.
 * Optionally stores a reason so the login page can show a toast.
 */
export function clearAuthAndRedirect(reason?: LogoutReason) {
  if (typeof window === "undefined") return

  try {
    clearAllData()
  } catch {
    localStorage.removeItem("token")
    localStorage.removeItem("tokenExpiry")
    localStorage.removeItem("authData")
  }

  if (reason) {
    try {
      sessionStorage.setItem("authLogoutReason", reason)
    } catch {
      // ignore storage failures
    }
  }

  window.location.href = "/login"
}
