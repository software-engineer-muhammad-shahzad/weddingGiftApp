export interface GreetingCardDTO {
  id: number
  cardImagePath: string
  cardPrice: number
  videoPrice: number
  platformFeePercent: number
  greetingMediaType: string
}

export interface CardTemplateDTO {
  id: number
  cardPrice: number
  videoPrice: number
  platformFeePercent: number
  greetingMediaType: string
  greetingCards: GreetingCardDTO[]
  cardUrl: string | null
}

export interface AnnouncementDTO {
  id: number
  announcedBy: number
  adminFullName: string | null
  content: string
}

export interface GuestInviteData {
  // Not yet returned by /guest/invite/{publicSlug} — needs a backend change.
  // Once added, this is the couple's numeric userId (used as `coupleId` for
  // the wishing-video upload and as `recipientUserId` for the payment charge).
  coupleUserId?: number
  publicSlug: string
  fullName: string
  partnerName: string
  eventDate: string
  profileImageUrl: string | null
  currency: string
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

export interface MakePaymentResponse {
  statusCode: number
  statusMessage: string
  data: any
}

export interface UploadWishingVideoData {
  profileImageUrl: string
}

export interface UploadWishingVideoResponse {
  statusCode: number
  statusMessage: string
  data: UploadWishingVideoData
}
