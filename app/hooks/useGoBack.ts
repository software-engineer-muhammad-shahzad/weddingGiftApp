"use client"

import { useRouter } from "next/navigation"

/**
 * Header back buttons used to hard-link to a fixed parent route, which always
 * sent the user "home" even when they'd arrived from somewhere else (e.g.
 * notifications opened from the gifts or statistic tab). This instead goes
 * back through actual browser history when there is any, only falling back
 * to a fixed route for a direct/deep-linked visit with no history to return to.
 */
export const useGoBack = (fallbackHref: string) => {
  const router = useRouter()

  return () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
      return
    }

    router.push(fallbackHref)
  }
}
