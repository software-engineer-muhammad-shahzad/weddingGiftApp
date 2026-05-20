export interface ForgotPasswordPayload {
  email: string
}

export interface ForgotPasswordResponse {
  statusCode: number
  statusMessage: string
  data: null
}
