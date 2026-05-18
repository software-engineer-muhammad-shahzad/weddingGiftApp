import { postRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import type { SignupPayload, SignupResponse } from "@/app/features/auth/types/signup"
import type {
  ResendOtpPayload,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/app/features/auth/types/verifyOtp"

// signup api call
export const signup = async (payload: SignupPayload): Promise<SignupResponse> => {
  return postRequest(endpoints.auth.signup, payload, { skipAuth: true })
}

// verifyOtp api call
export const verifyOtp = async (
  payload: VerifyOtpPayload
): Promise<VerifyOtpResponse> => {
  return postRequest(endpoints.auth.verifyOtp, payload, { skipAuth: true })
}

// resendOtp api call
export const resendOtp = async (
  payload: ResendOtpPayload
): Promise<VerifyOtpResponse> => {
  return postRequest(endpoints.auth.resendOtp, payload, { skipAuth: true })
}

// resendOtp api call
