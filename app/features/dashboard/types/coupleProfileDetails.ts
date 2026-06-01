export interface CoupleProfileDetailsData {
  fullName: string
  partnerName: string
  eventDate: string
  email: string
  phoneNumber: string
  profileImageUrl: string | null
}

export interface CoupleProfileDetailsResponse {
  statusCode: number
  statusMessage: string
  data: CoupleProfileDetailsData
}