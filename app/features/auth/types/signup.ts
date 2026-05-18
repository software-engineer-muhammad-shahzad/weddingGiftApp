// Backend signup payload shape
export interface SignupPayload {
  fullName: string
  partnerName: string
  eventDate: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

export interface SignupResponse {
  statusCode?: number
  statusMessage?: string
  data?: {
    message?: string
    email?: string
    [key: string]: any
  }
  [key: string]: any
}
