"use client"

import { useEffect } from "react"
import { useAutoLogout } from "@/app/hooks/useAutoLogout"
import { showWarning } from "@/app/lib/toast"

/**
 * App-wide session timeout watcher for authenticated users.
 * Also surfaces logout reason toasts after redirect to /login.
 */
export default function SessionTimeoutProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useAutoLogout()

  useEffect(() => {
    const reason = sessionStorage.getItem("authLogoutReason")
    if (!reason) return

    sessionStorage.removeItem("authLogoutReason")

    if (reason === "inactivity") {
      showWarning("You were logged out due to 10 minutes of inactivity.")
    } else if (reason === "expired") {
      showWarning("Your session has expired. Please sign in again.")
    }
  }, [])

  return <>{children}</>
}
