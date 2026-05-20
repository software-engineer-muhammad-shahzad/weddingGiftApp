import { useState } from "react"
import { forgotPassword } from "@/app/features/auth/services/authService"
import type { ForgotPasswordPayload } from "@/app/features/auth/types/forgotPassword"
import { showSuccess, showError } from "@/app/lib/toast"
import { asyncHandler } from "@/app/utils/asyncHandler"

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleForgotPassword = async (payload: ForgotPasswordPayload) => {
    setIsLoading(true)
    setError(null)

    const result = await asyncHandler(() => forgotPassword(payload))

    if (result.success && result.data.statusCode === 200) {
      showSuccess("OTP sent to your email successfully")
      setIsLoading(false)
      return { success: true }
    } else {
      const errorMessage = result.success === false ? result.error : (result.data?.statusMessage || "Failed to send OTP")
      showError(errorMessage)
      setError(errorMessage)
      setIsLoading(false)
      return { success: false, error: errorMessage }
    }
  }

  return {
    handleForgotPassword,
    isLoading,
    error,
  }
}
