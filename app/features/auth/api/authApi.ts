import { postRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import type { SignupPayload, SignupResponse } from "@/app/features/auth/types/signup"
import type {
  ResendOtpPayload,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from "@/app/features/auth/types/verifyOtp"
import type { LoginPayload, LoginResponse } from "@/app/features/auth/types/login"
import type { ForgotPasswordPayload, ForgotPasswordResponse } from "@/app/features/auth/types/forgotPassword"
import { ResetPasswordPayload } from "../types/setPassword"

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

// login api call
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  // A 400 here just means "invalid email or password" and a 403 means the
  // email isn't verified yet — both are handled by useLogin, so don't also
  // spam the console for them.
  return postRequest(endpoints.auth.login, payload, { skipAuth: true, silenceStatuses: [400, 403] })
}

// forgot Password api call
export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> => {
  return postRequest(endpoints.auth.forgotPassword, payload, { skipAuth: true })
}

// Reset-password
  export const resetPassword = async (payload: ResetPasswordPayload): Promise<{message:string}> => {
  return postRequest(endpoints.auth.setNewPassword, payload, { skipAuth: true })
}