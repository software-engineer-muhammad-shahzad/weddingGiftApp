import {
  signup as signupApi,
  verifyOtp as verifyOtpApi,
  resendOtp as resendOtpApi,
} from "@/app/features/auth/api/authApi"
import type { SignupPayload, SignupResponse } from "@/app/features/auth/types/signup"
import type {
  ResendOtpPayload,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/app/features/auth/types/verifyOtp"

// signupUser
export const signupUser = async (payload: SignupPayload): Promise<SignupResponse> => {
  return signupApi(payload)
}

// verifyOtp
export const verifyOtp = async (
  payload: VerifyOtpPayload
): Promise<VerifyOtpResponse> => {
  return verifyOtpApi(payload)
}

// resendOtp
export const resendOtp = async (
  payload: ResendOtpPayload
): Promise<VerifyOtpResponse> => {
  return resendOtpApi(payload)
}

