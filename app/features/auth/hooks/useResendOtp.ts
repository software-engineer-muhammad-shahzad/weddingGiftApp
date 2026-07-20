import { resendOtp as resendOtpApi } from "@/app/features/auth/services/authService"
import { showSuccess, showError } from "@/app/lib/toast"
import { asyncHandler } from "@/app/utils/asyncHandler"
import { getData } from "@/app/utils/storage/storageHelper"
import type { ResendOtpPayload } from "@/app/features/auth/types/verifyOtp"
import { useCallback, useState } from "react"

export type UseResendOtpResult = {
  resendOtp: () => Promise<boolean>
  isLoading: boolean
}

export const useResendOtp = (): UseResendOtpResult => {
  const [isLoading, setIsLoading] = useState(false)

  const resendOtp = useCallback(async () => {
    setIsLoading(true)

    const email = getData<string>("email", "local")
    if (!email) {
      showError("Email not found in session. Please restart the signup flow.")
      setIsLoading(false)
      return false
    }

    const payload: ResendOtpPayload = { email }
    const result = await asyncHandler(() => resendOtpApi(payload))

    if (result.success) {
      const successMessage =
        result.data?.data?.message || result.data?.statusMessage || "OTP resent successfully."
      showSuccess(successMessage)
      setIsLoading(false)
      return true
    }

    showError(result.error)
    setIsLoading(false)
    return false
  }, [])

  return {
    resendOtp,
    isLoading,
  }
}
