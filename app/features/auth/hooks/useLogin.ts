import { useState } from "react"
import { login } from "@/app/features/auth/services/authService"
import type { LoginPayload } from "@/app/features/auth/types/login"
import { saveData } from "@/app/utils/storage/storageHelper"
import { showSuccess, showError } from "@/app/lib/toast"
import { asyncHandler } from "@/app/utils/asyncHandler"
import { setAuthToken } from "@/app/lib/auth/saveTokenExpriy"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (payload: LoginPayload) => {
        setIsLoading(true)

        const result = await asyncHandler(() => login(payload))

        if (result.success && result.data.statusCode === 200 && result.data.data) {
            saveData("authData", result.data.data, "local")
            setAuthToken(
                result.data.data.token,
                result.data.data.expiresAtUtc
            )

            showSuccess("Login successfully")
            setIsLoading(false)
            return { success: true, data: result.data.data }
        }

        const errorMessage =
            result.success === false
                ? result.error
                : (typeof result.data?.data === "string" && result.data.data) ||
                  (result.data?.statusMessage &&
                  !/^bad\s*request$/i.test(result.data.statusMessage)
                      ? result.data.statusMessage
                      : null) ||
                  "Login failed"

        showError(errorMessage)
        setIsLoading(false)
        return { success: false, error: errorMessage }
    }

    return {
        handleLogin,
        isLoading,
    }
}
