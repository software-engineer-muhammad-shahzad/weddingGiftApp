import { useState } from "react"
import { UpdateBankDetailsData } from "../types/UpdateBankDetails"
import { updateBankDetails } from "../services/dashboardService"

export const useUpdateBankInfo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const updateBankData = async (payload: UpdateBankDetailsData) => {
    try {
      setIsLoading(true)
      setError(null)
      setIsSuccess(false)

      // ✅ CALL SERVICE LAYER ONLY
      const response = await updateBankDetails(payload)

      // ✅ 204 = success if no error thrown
      setIsSuccess(true)
      return response
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong"
      )
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    updateBankData,
    isLoading,
    error,
    isSuccess,
    setIsSuccess,
  }
}