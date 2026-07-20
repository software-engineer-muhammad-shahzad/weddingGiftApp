import { useCallback, useState } from "react"
import { verifyOtp as verifyOtpApi } from "@/app/features/auth/services/authService"
import { showSuccess, showError } from "@/app/lib/toast"
import { asyncHandler } from "@/app/utils/asyncHandler"
import { getData, removeData } from "@/app/utils/storage/storageHelper"
import type { VerifyOtpPayload } from "@/app/features/auth/types/verifyOtp"

export type UseVerifyOtpResult = {
    verifyOtp: (otp: string) => Promise<boolean>
    isLoading: boolean
}

export const useVerifyOtp = (): UseVerifyOtpResult => {
    const [isLoading, setIsLoading] = useState(false)

    const verifyOtp = useCallback(async (otp: string) => {
        setIsLoading(true)

        const email = getData<string>("email", "local")
        if (!email) {
            showError("Email not found in session. Please restart the signup flow.")
            setIsLoading(false)
            return false
        }

        const payload: VerifyOtpPayload = { email, otp }
        const result = await asyncHandler(() => verifyOtpApi(payload))
     
        if (result.success) {
            const successMessage =
                result.data?.data?.message || result.data?.statusMessage || "OTP verified successfully."
            showSuccess(successMessage)
            removeData("email", "session")
            setIsLoading(false)
            return true
        }

        showError(result.error)
        setIsLoading(false)
        return false
    }, [])

    return {
        verifyOtp,
        isLoading,
    }
}
