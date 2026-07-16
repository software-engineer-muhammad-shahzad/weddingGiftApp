import { ResourceMetadata } from "./ResourceMetadata"

export interface NotificationItem {
  id: number
  guestName: string | null
  amount: number
  currency: string
  message: string
  subject: string
  isRead: boolean
  resourceMetadata: ResourceMetadata
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
