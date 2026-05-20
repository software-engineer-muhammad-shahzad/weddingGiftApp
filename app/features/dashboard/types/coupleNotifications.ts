export interface NotificationItem {
  id: number
  guestName: string
  amount: number
  currency: string
  receivedAtUtc: string
  messagePreview: string
  isRead: boolean
}

export interface NotificationListData {
  items: NotificationItem[]
  page: number
  pageSize: number
  totalCount: number
}

export interface NotificationListResponse {
  statusCode: number
  statusMessage: string
  data: NotificationListData
}
