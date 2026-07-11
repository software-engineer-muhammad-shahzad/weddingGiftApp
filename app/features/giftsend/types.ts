export interface SendGiftUserData {
  displayId: string
  userId: number
  fullName: string
  partnerName: string
  contactNumber: string
  email: string
}

export interface SendGiftUserResponse {
  statusCode: number
  statusMessage: string
  data: SendGiftUserData
}

export interface GuestCheckoutPayload {
  fullName: string
  contactNumber: string
  email: string
}

export interface StripeCustomerData {
  stripeCustomerId: string
}

export interface StripeCustomerResponse {
  statusCode: number
  statusMessage: string
  data: StripeCustomerData
}

export interface CreateCardPayload {
  userId: number
  guestUserId?: number
  customerId?: string
  stripeCustomerId?: string
  paymentMethodId: string
  cardLast4Digits: string
  expMonth: number
  expYear: number
  cvc: string
  name: string
  email: string
  cardBrand: string
}

export interface CreateCardResponse {
  statusCode: number
  statusMessage: string
  data: any
}

export interface MakePaymentPayload {
  recipientUserId: number
  guestUserId: number
  amount: number
  paymentMethodId: string
  customerId?: string
  stripeCustomerId?: string
}

export interface MakePaymentResponse {
  statusCode: number
  statusMessage: string
  data: any
}
