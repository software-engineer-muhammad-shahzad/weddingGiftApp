import { ResourceMetadata } from "./ResourceMetadata"

export interface ContributorItem {
  id: number
  guestName: string | null
  guestProfilePic: string | null
  amount: number
  defaultCurrencySymbol: string | null
  messagePreview: string
  isRead: boolean
  resourceMetadata: ResourceMetadata
}

export interface ContributorListData {
  items: ContributorItem[]
  page: number
  pageSize: number
  totalCount: number
}

export interface ContributorListResponse {
  statusCode: number
  statusMessage: string
  data: ContributorListData
}
