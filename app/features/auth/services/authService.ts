import {
  signup as signupApi,
  verifyOtp as verifyOtpApi,
  resendOtp as resendOtpApi,
  login as loginApi,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
} from "@/app/features/auth/api/authApi"
import type { SignupPayload, SignupResponse } from "@/app/features/auth/types/signup"
import type {
  ResendOtpPayload,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/app/features/auth/types/verifyOtp"
import type { LoginPayload, LoginResponse } from "@/app/features/auth/types/login"
import type { ForgotPasswordPayload, ForgotPasswordResponse } from "@/app/features/auth/types/forgotPassword"
import { ResetPasswordPayload } from "../types/setPassword"

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

// login
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  return loginApi(payload)
}

// forgot password
export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> => {
  return forgotPasswordApi(payload)
}


// reset-password

export const resetPassword = async (payload: ResetPasswordPayload): Promise<{ message: string }> => {
  return resetPasswordApi(payload)
}




