import { useState } from "react"
import { login } from "@/app/features/auth/services/authService"
import type { LoginPayload } from "@/app/features/auth/types/login"
import { saveData } from "@/app/utils/storage/storageHelper"
import { showSuccess } from "@/app/lib/toast"

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (payload: LoginPayload) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await login(payload)

      if (response.statusCode === 200 && response.data) {
        // Store the response data in local storage
        saveData("authData", response.data, "local")
        saveData("token", response.data.token, "local")
        
        // Show success toast notification
        showSuccess("Login successfully")
        
        return { success: true, data: response.data }
      } else {
        setError(response.statusMessage || "Login failed")
        return { success: false, error: response.statusMessage || "Login failed" }
      }
    } catch (err: any) {
      const errorMessage = err?.message || "An error occurred during login"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleLogin,
    isLoading,
    error,
  }
}
