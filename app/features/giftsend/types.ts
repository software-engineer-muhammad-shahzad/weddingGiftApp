import { ResourceMetadata } from "../dashboard/types/ResourceMetadata"

export interface GreetingCardDTO {
  id: number
  orderNo: number
  imageUrl: string
  resourceMetadata: ResourceMetadata
}

export interface CardTemplateDTO {
  id: number
  cardPrice: number
  videoPrice: number
  platformFeePercent: number
  greetingCards: GreetingCardDTO[]
  resourceMetadata: ResourceMetadata
}

export interface AnnouncementDTO {
  id: number
  announcedBy: number
  adminFullName: string | null
  content: string
}

export interface GuestInviteData {
  /** Couple's user id — used as recipientUserId for payment and coupleId for video upload. */
  coupleUserId: number
  publicSlug: string
  fullName: string
  partnerName: string
  eventDate: string
  profileImageUrl: string | null
  currency: string
  /** Display symbol from BE (e.g. £, $). Prefer this over currency code in UI. */
  defaultCurrencySymbol?: string | null
  wishingCardAddonAmount: number
  wishingVideoAddonAmount: number
  platformServiceFeeAmount: number
  stripePublishableKey: string
  cardTemplate: CardTemplateDTO
  announcement: AnnouncementDTO | null
}

export interface GuestInviteResponse {
  statusCode: number
  statusMessage: string
  data: GuestInviteData
}

export interface GuestPaymentMethod {
  id: number;
  paymentMethodId: string;
  cardLast4: string;
  expMonth: number;
  expYear: number;
  cardBrand?: string | null;
  isPrimary: boolean;
  cardHolderName?: string | null;
  email?: string | null;
}

export interface SendGiftUserData {
  displayId: string
  userId: number
  fullName: string
  partnerName: string
  contactNumber: string
  email: string
  /** Present when returning guest already has a Stripe customer. */
  stripeCustomerId?: string | null
  /** Present when returning guest already has saved card(s). */
  paymentMethod?: GuestPaymentMethod | GuestPaymentMethod[] | null
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

export interface AttachPaymentMethodPayload {
  userId: number
  paymentMethodId: string
}

export interface AttachPaymentMethodResponse {
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
  greetingMediaType?: "Image" | "Video"
  wishingCardAmount?: number
  wishingVideoAmount?: number
  wishingVideoPath?: string
  wishingCardPath?: string
  wishingContent?: string
}

export interface ChargePaymentData {
  transactionNumber: string
  paymentDate: string
  senderName: string
  senderAccountNo: string | null
  receiverName: string
  receiverAccountNo: string | null
  giftAmount: number
  platformFee: number
  stripeFee: number
  netToRecipient: number,
  defaultCurrencySymbol: string,
  defaultCurrency: string,
}

export interface MakePaymentResponse {
  statusCode: number
  statusMessage: string
  data: ChargePaymentData | null
}

export interface UploadWishingVideoData {
  profileImageUrl: string
}

export interface UploadWishingVideoResponse {
  statusCode: number
  statusMessage: string
  data: UploadWishingVideoData
}
