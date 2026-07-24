import { useCallback, useState } from "react"
import { verifyOtp as verifyOtpApi } from "@/app/features/auth/services/authService"
import { showSuccess, showError } from "@/app/lib/toast"
import { asyncHandler } from "@/app/utils/asyncHandler"
import { getData, removeData } from "@/app/utils/storage/storageHelper"
import type { VerifyOtpPayload } from "@/app/features/auth/types/verifyOtp"

export type UseVerifyOtpResult = {
    /** Keep email in storage when next step still needs it (e.g. forgot-password → set-password). */
    verifyOtp: (otp: string, options?: { keepEmail?: boolean }) => Promise<boolean>
    isLoading: boolean
}

export const useVerifyOtp = (): UseVerifyOtpResult => {
    const [isLoading, setIsLoading] = useState(false)

    const verifyOtp = useCallback(async (otp: string, options?: { keepEmail?: boolean }) => {
        setIsLoading(true)

        const email = getData<string>("email", "local")
        if (!email) {
            showError("Email not found. Please restart the signup flow.")
            setIsLoading(false)
            return false
        }

        const payload: VerifyOtpPayload = { email, otp }
        const result = await asyncHandler(() => verifyOtpApi(payload))

        if (result.success && result.data.statusCode === 200) {
            showSuccess(
                result.data?.data?.message ||
                    result.data?.statusMessage ||
                    "OTP verified successfully."
            )
            if (!options?.keepEmail) {
                removeData("email", "local")
            }
            setIsLoading(false)
            return true
        }

        const errorMessage =
            result.success === false
                ? result.error
                : result.data?.statusMessage || "OTP verification failed."
        showError(errorMessage)
        setIsLoading(false)
        return false
    }, [])

    return {
        verifyOtp,
        isLoading,
    }
}
