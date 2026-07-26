export interface AnnouncementDismissalData {
  id: number
  announcementId: number
  userId: number
  dismissedAt: string
}

export interface AnnouncementDismissalResponse {
  statusCode: number
  statusMessage: string
  data: AnnouncementDismissalData | null
}
