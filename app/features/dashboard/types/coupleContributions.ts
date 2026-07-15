export interface ContributionResourceMetadata {
  createdOn: string
  createdBy: number | null
  updatedOn: string | null
  updatedBy: number | null
  deletedOn: string | null
  deletedBy: number | null
  recordStatus: string
}

export interface ContributionItem {
  id: number
  guestName: string | null
  amount: number
  coupleUserId: number
  guestUserId: number
  paymentId: number
  wishingCardPath: string | null
  wishingVideoPath: string | null
  isAttachment?: boolean
  resourceMetadata: ContributionResourceMetadata
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
