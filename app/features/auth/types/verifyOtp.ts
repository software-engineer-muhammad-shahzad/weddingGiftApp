export interface VerifyOtpPayload {
  email: string
  otp: string
}

export interface ResendOtpPayload {
  email: string
}

export interface VerifyOtpResponse {
  statusCode?: number
  statusMessage?: string
  data?: {
    message?: string
    [key: string]: any
  }
  [key: string]: any
}
