import { signup as signupApi } from "@/app/features/auth/api/authApi"
import type { SignupPayload, SignupResponse } from "@/app/features/auth/types/signup"

export const signupUser = async (payload: SignupPayload): Promise<SignupResponse> => {
  return signupApi(payload)
}
