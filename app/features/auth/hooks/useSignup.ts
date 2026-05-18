import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { signupUser } from "@/app/features/auth/services/authService"
import { showSuccess, showError } from "@/app/lib/toast"
import { asyncHandler } from "@/app/utils/asyncHandler"
import { saveData } from "@/app/utils/storage/storageHelper"
import type { SignupPayload } from "@/app/features/auth/types/signup"

export type UseSignupResult = {
  signup: (payload: SignupPayload) => Promise<void>
  isLoading: boolean
}

export const useSignup = (): UseSignupResult => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const signup = useCallback(async (payload: SignupPayload) => {
    setIsLoading(true)

    const result = await asyncHandler(() => signupUser(payload))

    if (result.success) {
      const successMessage =
        result.data?.data?.message ||"Signup successful."
      const email = result.data?.data?.email

      if (email) {
        saveData("email", email, "session")
      }

      showSuccess(successMessage)
      router.push("/verify-otp")
    } else {
      showError(result.error)
    }

    setIsLoading(false)
  }, [router])

  return {
    signup,
    isLoading,
  }
}
