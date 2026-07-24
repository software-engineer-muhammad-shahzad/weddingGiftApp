import { useState } from "react"
import { ResetPasswordPayload } from "../types/setPassword"
import { resetPassword } from "../api/authApi"
import { showError } from "@/app/lib/toast"
import { handleError } from "@/app/utils/errorHandler"

const useResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleResetPassword = async (payload: ResetPasswordPayload): Promise<boolean> => {
        try {
            setIsLoading(true)
            setError(null)
            await resetPassword(payload)
            setIsSuccess(true)
            return true
        } catch (err) {
            const { error: errorMessage } = handleError(err)
            setError(errorMessage)
            showError(errorMessage || "Something went wrong")
            return false
        } finally {
            setIsLoading(false)
        }
    }

    return { handleResetPassword, isLoading, isSuccess, error }
}

export default useResetPassword