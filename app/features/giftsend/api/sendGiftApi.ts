import endpoints from "@/app/services/endpoint"
import { getRequest, postRequest } from "@/app/services/http"
import { GuestCheckoutPayload, GuestInviteResponse, SendGiftUserResponse, StripeCustomerResponse } from "../types"

export const getSendGiftUser = async (
  userId: number,
  options?: { skipAuth?: boolean },
): Promise<SendGiftUserResponse> => {
  return getRequest(endpoints.sendGift.sendGift.replace("{userid}", String(userId)), {
    skipAuth: options?.skipAuth,
  })
}

export const getGuestInviteDetails = async (publicSlug: string): Promise<GuestInviteResponse> => {
  return getRequest(endpoints.guest.getCoupleDetails.replace("{publicSlug}", publicSlug), { skipAuth: true })
}

export const createGuestUser = async (payload: GuestCheckoutPayload): Promise<SendGiftUserResponse> => {
  return postRequest(endpoints.sendGift.createUserServer, payload, { skipAuth: true })
}

export const createStripeCustomer = async (guestId: number): Promise<StripeCustomerResponse> => {
  return postRequest(
    endpoints.sendGift.createUserStripe.replace("{guestid}", String(guestId)),
    {},
    { skipAuth: true },
  )
}
