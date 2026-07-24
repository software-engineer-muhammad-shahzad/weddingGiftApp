export interface WeeklyStat {
  dayLabel: string
  amount: number
}

export interface RecentContributor {
  id: number
  guestName: string
  amount: number
  currency: string
  receivedAtUtc: string
  messagePreview: string
  isRead: boolean
}

export interface Invite {
  publicSlug: string
  inviteUrl: string
  qrDownloadUrl: string
}

export interface CoupleDashboardData {
  fullName: string
  partnerName: string
  eventDate: string
  receivedBalance: number
  currency: string | null
  defaultCurrencySymbol: string | null
  unReadNotificationCount: number
  weeklyStats: WeeklyStat[]
  recentContributors: RecentContributor[]
  invite: Invite
  latestAnnouncement?: string
  hasBankAccount: boolean
  profileImageUrl: string | null
}

export interface CoupleDashboardResponse {
  statusCode: number
  statusMessage: string
  data: CoupleDashboardData
}
