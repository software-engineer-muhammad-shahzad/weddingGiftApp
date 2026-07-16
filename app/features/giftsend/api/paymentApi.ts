import endpoints from "@/app/services/endpoint"
import { postRequest } from "@/app/services/http"
import {
  AttachPaymentMethodPayload,
  AttachPaymentMethodResponse,
  CreateCardPayload,
  CreateCardResponse,
  MakePaymentPayload,
  MakePaymentResponse,
  UploadWishingVideoResponse,
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

export const uploadWishingVideo = async (
  coupleId: number,
  file: File
): Promise<UploadWishingVideoResponse> => {
  const formData = new FormData()
  formData.append("file", file)

  return postRequest(endpoints.payment.uploadWishingVideo, formData, {
    params: { coupleId },
    // Video files (up to 25MB) can take longer than the default 20s API
    // timeout to upload, especially on slower connections.
    timeout: 120000,
  })
}
