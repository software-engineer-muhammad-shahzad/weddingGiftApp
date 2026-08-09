import { useState, useEffect } from "react"

import type {
  CoupleProfileDetailsData,
} from "../types/coupleProfileDetails"
import { getCoupleProfileDetailsData } from "../services/dashboardService"



export const useCoupleProfileDetails = () => {

  const [data, setData] =
    useState<CoupleProfileDetailsData | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] =
    useState<string | null>(null)

  const [needsBankAccount, setNeedsBankAccount] = useState(false)

  const fetchProfileDetails = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setNeedsBankAccount(false)

      const profileData =
        await getCoupleProfileDetailsData()

      setData(profileData)

    } catch (err: any) {

      if (err?.code === "BANK_ACCOUNT_REQUIRED") {
        setNeedsBankAccount(true)
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong"
        )
      }

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProfileDetails()
  }, [])

  return {
    data,
    isLoading,
    error,
    needsBankAccount,
    refetch: fetchProfileDetails,
  }
}