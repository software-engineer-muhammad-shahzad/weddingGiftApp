import { useState } from "react"
import { deleteCoupleProfileData } from "../services/dashboardService"
import { showSuccess } from "@/app/lib/toast"

export const useDeleteCouplePhoto = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const deleteProfilePhoto = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setIsSuccess(false)

      // 👇 DELETE API call (no body needed)
      await deleteCoupleProfileData()
      showSuccess("image deleted successfully")
      setIsSuccess(true)

      return true
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong"

      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    deleteProfilePhoto,
    isLoading,
    error,
    isSuccess,
    setIsSuccess,
  }
}