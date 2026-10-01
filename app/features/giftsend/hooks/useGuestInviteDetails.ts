"use client"

import { useEffect, useState } from "react"
import { GuestInviteData } from "../types"
import { getGuestInviteDetails } from "../api/sendGiftApi"

const normalizeInviteData = (raw: Record<string, unknown> | null | undefined): GuestInviteData | null => {
  if (!raw) return null

  const coupleUserId = Number(raw.coupleUserId ?? raw.CoupleUserId)
  if (!coupleUserId || Number.isNaN(coupleUserId)) return null

  return {
    ...(raw as unknown as GuestInviteData),
    coupleUserId,
    defaultCurrencySymbol:
      (raw.defaultCurrencySymbol as string | null | undefined) ??
      (raw.DefaultCurrencySymbol as string | null | undefined) ??
      null,
  }
}

export const useGuestInviteDetails = (slug: string) => {
  const [data, setData] = useState<GuestInviteData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setIsLoading(false)
      return
    }

    const fetchInvite = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const res = await getGuestInviteDetails(slug)
        const inviteData = normalizeInviteData(res.data as unknown as Record<string, unknown>)

        if (!inviteData) {
          setError("This invite link is no longer valid.")
          setData(null)
          return
        }

        setData(inviteData)
      } catch (err: any) {
        // The backend resolves an inactive/deactivated couple the same way
        // as an unknown slug (404) — both mean the guest's QR code/link no
        // longer works, so they share the same "expired" message here.
        const status = err?.response?.status
        setError(
          status === 404
            ? "This invite link is no longer valid."
            : err.message || "Something went wrong",
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvite()
  }, [slug])

  return { data, isLoading, error }
}
