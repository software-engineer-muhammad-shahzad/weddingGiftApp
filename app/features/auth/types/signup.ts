import { postRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"

export interface SignupPayload {
  name: string
  partnerName: string
  eventDate: string
  email: string
  phoneNumber: string
  password: string
}

export interface SignupResponse {
  message?: string
  email?: string
  [key: string]: any
}

export const signup = async (payload: SignupPayload): Promise<SignupResponse> => {
  return postRequest(endpoints.auth.signup, payload, { skipAuth: true })
}
