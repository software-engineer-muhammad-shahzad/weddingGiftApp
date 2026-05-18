import { postRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import type { SignupPayload, SignupResponse } from "@/app/features/auth/types/signup"

export const signup = async (payload: SignupPayload): Promise<SignupResponse> => {
  return postRequest(endpoints.auth.signup, payload, { skipAuth: true })
}
