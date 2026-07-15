import endpoints from "@/app/services/endpoint"
import { postRequest } from "@/app/services/http"
import {
  AttachPaymentMethodPayload,
  AttachPaymentMethodResponse,
  CreateCardPayload,
  CreateCardResponse,
  MakePaymentPayload,
  MakePaymentResponse,
} from "../types"

export const createCard = async (payload: CreateCardPayload): Promise<CreateCardResponse> => {
  return postRequest(endpoints.payment.createCard, payload)
}

export const attachPaymentMethod = async (
  payload: AttachPaymentMethodPayload
): Promise<AttachPaymentMethodResponse> => {
  return postRequest(endpoints.payment.attachPaymentMethod, payload)
}

export const makePayment = async (payload: MakePaymentPayload): Promise<MakePaymentResponse> => {
  return postRequest(endpoints.payment.makePayment, payload)
}
