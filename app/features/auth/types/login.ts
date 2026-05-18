export interface LoginPayload {
  email: string
  password: string
}

export interface LoginData {
  token: string
  expiresAtUtc: string
  userId: number
  email: string
  username: string
  fullName: string
  partnerName: string
  eventDate: string
  phoneNumber: string
  role: string
  profileImageUrl: string | null
  defaultCurrency: string
}

export interface LoginResponse {
  statusCode: number
  statusMessage: string
  data: LoginData
}
