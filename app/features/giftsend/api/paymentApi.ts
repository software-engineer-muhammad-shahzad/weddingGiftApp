import endpoints from "@/app/services/endpoint"
import { postRequest } from "@/app/services/http"
import { CreateCardPayload, CreateCardResponse, MakePaymentPayload, MakePaymentResponse } from "../types"

export const createCard = async (payload: CreateCardPayload): Promise<CreateCardResponse> => {
  return postRequest(endpoints.payment.createCard, payload)
}

export const makePayment = async (payload: MakePaymentPayload): Promise<MakePaymentResponse> => {
  return postRequest(endpoints.payment.makePayment, payload)
}
