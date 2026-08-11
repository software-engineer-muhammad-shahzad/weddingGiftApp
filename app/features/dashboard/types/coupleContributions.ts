import { ResourceMetadata } from "./ResourceMetadata"

export interface ContributionItem {
  id: number
  guestName: string | null
  amount: number
  coupleUserId: number
  guestUserId: number
  paymentId: number
  defaultCurrencySymbol: string | null
  wishingCardPath: string | null
  wishingVideoPath: string | null
  isAttachment?: boolean
  resourceMetadata: ResourceMetadata
}

export interface ContributionsListData {
  items: ContributionItem[]
  offset: number
  length: number
  totalReturned: number
  totalOverall: number
}

export interface ContributionsListResponse {
  statusCode: number
  statusMessage: string
  data: ContributionsListData
}
