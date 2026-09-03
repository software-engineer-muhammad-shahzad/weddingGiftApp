import { useEffect, useState } from "react"

import { getData } from "@/app/utils/storage/storageHelper"
import type { LoginData } from "@/app/features/auth/types/login"
import { getStripeConnectStatus } from "../services/dashboardService"
import type { StripeConnectStatusData } from "../types/stripeConnectStatus"

export const useStripeConnectStatus = () => {
  const [data, setData] = useState<StripeConnectStatusData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStatus = async () => {
    const coupleUserId = getData<LoginData>("authData", "local")?.userId

    if (!coupleUserId) {
      setData(null)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const status = await getStripeConnectStatus(coupleUserId)
      setData(status)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  return {
    data,
    isLoading,
    error,
    refetch: fetchStatus,
  }
}
