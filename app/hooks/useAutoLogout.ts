"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { isTokenExpired } from "@/app/lib/auth/CheckExpiry"
import { clearAuthAndRedirect } from "@/app/lib/auth/logout"

const INACTIVITY_MS = 10 * 60 * 1000 // 10 minutes
const ACTIVITY_THROTTLE_MS = 1000
const LAST_ACTIVITY_KEY = "lastActivityAt"

const PUBLIC_ROUTE_PREFIXES = [
  "/login",
  "/signup",
  "/verify-otp",
  "/set-password",
  "/forgot-password",
  "/invite",
  "/privacy-notice",
  "/terms-of-service",
]

const ACTIVITY_EVENTS: Array<keyof WindowEventMap> = [
  "mousedown",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
  "click",
  "wheel",
]

const isPublicRoute = (pathname: string) =>
  PUBLIC_ROUTE_PREFIXES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

const hasActiveSession = () => {
  if (typeof window === "undefined") return false
  const token = localStorage.getItem("token")
  if (!token) return false
  return !isTokenExpired()
}

const readLastActivity = () => {
  const raw = localStorage.getItem(LAST_ACTIVITY_KEY)
  const parsed = raw ? Number(raw) : NaN
  return Number.isFinite(parsed) ? parsed : Date.now()
}

const writeLastActivity = (timestamp: number) => {
  localStorage.setItem(LAST_ACTIVITY_KEY, String(timestamp))
}

/**
 * Logs the user out after 10 minutes of continuous inactivity,
 * or sooner if the auth token expires.
 * Only runs on authenticated (non-public) routes.
 */
export function useAutoLogout() {
  const pathname = usePathname()
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tokenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastThrottleRef = useRef(0)
  const loggingOutRef = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (isPublicRoute(pathname)) return
    if (!hasActiveSession()) return

    const logout = (reason: "inactivity" | "expired") => {
      if (loggingOutRef.current) return
      loggingOutRef.current = true
      clearAuthAndRedirect(reason)
    }

    const clearTimers = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
        idleTimerRef.current = null
      }
      if (tokenTimerRef.current) {
        clearTimeout(tokenTimerRef.current)
        tokenTimerRef.current = null
      }
    }

    const scheduleIdleLogout = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)

      const lastActivity = readLastActivity()
      const remaining = INACTIVITY_MS - (Date.now() - lastActivity)

      if (remaining <= 0) {
        logout("inactivity")
        return
      }

      idleTimerRef.current = setTimeout(() => {
        // Re-check in case another tab recorded newer activity.
        const latest = readLastActivity()
        if (Date.now() - latest >= INACTIVITY_MS) {
          logout("inactivity")
        } else {
          scheduleIdleLogout()
        }
      }, remaining)
    }

    const scheduleTokenExpiryLogout = () => {
      const expiry = localStorage.getItem("tokenExpiry")
      if (!expiry) return

      const timeout = Number(expiry) - Date.now()
      if (timeout <= 0) {
        logout("expired")
        return
      }

      tokenTimerRef.current = setTimeout(() => {
        logout("expired")
      }, timeout)
    }

    const onActivity = () => {
      if (loggingOutRef.current) return
      if (!hasActiveSession()) return

      const now = Date.now()
      if (now - lastThrottleRef.current < ACTIVITY_THROTTLE_MS) return
      lastThrottleRef.current = now

      writeLastActivity(now)
      scheduleIdleLogout()
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key === LAST_ACTIVITY_KEY && event.newValue) {
        scheduleIdleLogout()
        return
      }

      // Token cleared in another tab.
      if (event.key === "token" && !event.newValue) {
        logout("expired")
      }
    }

    const onVisibility = () => {
      if (document.visibilityState !== "visible") return
      if (!hasActiveSession()) {
        logout("expired")
        return
      }
      if (Date.now() - readLastActivity() >= INACTIVITY_MS) {
        logout("inactivity")
        return
      }
      scheduleIdleLogout()
    }

    // Seed activity timestamp if missing / stale session start.
    writeLastActivity(Date.now())
    scheduleIdleLogout()
    scheduleTokenExpiryLogout()

    for (const eventName of ACTIVITY_EVENTS) {
      window.addEventListener(eventName, onActivity, { passive: true })
    }
    window.addEventListener("storage", onStorage)
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      clearTimers()
      for (const eventName of ACTIVITY_EVENTS) {
        window.removeEventListener(eventName, onActivity)
      }
      window.removeEventListener("storage", onStorage)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [pathname])
}
