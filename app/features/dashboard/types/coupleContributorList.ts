export interface ContributorItem {
  id: number
  guestName: string | null
  amount: number
  currency: string
  receivedAtUtc: string
  messagePreview: string
  isRead: boolean
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
