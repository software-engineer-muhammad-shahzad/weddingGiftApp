import { useState } from "react"
import { login } from "@/app/features/auth/services/authService"
import type { LoginPayload } from "@/app/features/auth/types/login"
import { saveData } from "@/app/utils/storage/storageHelper"
import { showSuccess } from "@/app/lib/toast"
import { asyncHandler } from "@/app/utils/asyncHandler"
import { setAuthToken } from "@/app/lib/auth/saveTokenExpriy"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (payload: LoginPayload) => {
        setIsLoading(true)
        setError(null)

        const result = await asyncHandler(() => login(payload))

        if (result.success && result.data.statusCode === 200 && result.data.data) {
            // Store the response data in local storage
            saveData("authData", result.data.data, "local")
            //   saveData("token", result.data.data.token, "local")
            setAuthToken(
                result.data.data.token,
                result.data.data.expiresAtUtc
            );



            // Show success toast notification
            showSuccess("Login successfully")

            setIsLoading(false)
            return { success: true, data: result.data.data }
        } else {
            const errorMessage = result.success === false ? result.error : (result.data?.statusMessage || "Login failed")
            setError(errorMessage)
            setIsLoading(false)
            return { success: false, error: errorMessage }
        }
    }

    return {
        handleLogin,
        isLoading,
        error,
    }
}
