import { useState } from "react"
import { ResetPasswordPayload } from "../types/setPassword"
import { resetPassword } from "../api/authApi"


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
        } catch (err) {
            setError("Something went wrong")
            return false
        } finally {
            setIsLoading(false)
        }
    }

    return { handleResetPassword, isLoading, isSuccess, error }
}

export default useResetPassword