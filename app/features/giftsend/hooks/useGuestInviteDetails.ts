"use client"

import { useEffect, useState } from "react"
import { GuestInviteData } from "../types"
import { getGuestInviteDetails } from "../api/sendGiftApi"

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
        setData(res.data)
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvite()
  }, [slug])

  return { data, isLoading, error }
}
