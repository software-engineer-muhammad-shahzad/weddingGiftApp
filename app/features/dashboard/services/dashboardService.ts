import endpoints from "@/app/services/endpoint"
import type {
  CoupleDashboardData,
  CoupleDashboardResponse,
} from "../types/coupleDashboard"
import type {
  ContributorListData,
  ContributorListResponse,
} from "../types/coupleContributorList"
import type {
  NotificationListData,
  NotificationListResponse,
} from "../types/coupleNotifications"
import type {
  CoupleBankDetailsData,
  CoupleBankDetailsResponse,
} from "../types/coupleBankDetails"
import { getRequest, postRequest } from "@/app/services/http"
import { CoupleProfileDetailsData, CoupleProfileDetailsResponse } from "../types/coupleProfileDetails"
import { deleteCoupleProfile, getCoupleProfileDetails, submitCoupleSupportTicket, updateCoupleBankDetails, updateCoupleProfile, updateCoupleProfileDetails } from "../api/dashboardApi"
import { CoupleSupportTicketPayload, CoupleSupportTicketResponse } from "../types/submitSupportTicket"

// getDashboardData
export const getDashboardData = async (): Promise<CoupleDashboardData> => {
  const response = await getRequest<CoupleDashboardResponse>(
    endpoints.dashboard.coupleDashboard
  )

  if (response.statusCode !== 200 || !response.data) {
    throw new Error(response.statusMessage || "Failed to fetch dashboard")
  }

  return response.data
}

// getContributorList
export const getContributorList = async (page: number = 1): Promise<ContributorListData> => {
  const pageSize = 10
  const offset = (page - 1) * pageSize

  const response = await postRequest<ContributorListResponse>(
    endpoints.dashboard.coupleContributionList,
    {
      isIncludeGuests: true,
      isIncludeCouples: true,
    },
    { params: { offset, length: pageSize } }
  )

  if (response.statusCode !== 200 || !response.data) {
    return {
      items: [],
      page,
      pageSize,
      totalCount: 0,
    }
  }

  return {
    items: response.data.items ?? [],
    page: response.data.page ?? page,
    pageSize: response.data.pageSize ?? pageSize,
    totalCount: response.data.totalCount ?? 0,
  }
}

// getNotifications
export const getNotifications = async (page: number = 1, search = ""): Promise<NotificationListData> => {
  const pageSize = 10
  const offset = (page - 1) * pageSize

  const response = await postRequest<NotificationListResponse>(
    endpoints.notifications.coupleNotification,
    { search },
    { params: { offset, length: pageSize } }
  )

  if (response.statusCode !== 200 || !response.data) {
    return {
      items: [],
      page,
      pageSize,
      totalCount: 0,
    }
  }

  return {
    items: response.data.items ?? [],
    page: response.data.page ?? page,
    pageSize: response.data.pageSize ?? pageSize,
    totalCount: response.data.totalCount ?? 0,
  }
}

// markAllNotificationsRead
export const markAllNotificationsRead = async (): Promise<void> => {
  await postRequest(endpoints.notifications.markAllRead)
}

// coupleBankDetails
export const getCoupleBankDetailsData = async (): Promise<CoupleBankDetailsData | null> => {
  try {
    const response = await getRequest<CoupleBankDetailsResponse>(
      endpoints.bankdetails.coupleBankDetails
    )

    if (response.statusCode !== 200 || !response.data) {
      throw new Error(response.statusMessage || "Failed to fetch bank details")
    }

    return response.data
  } catch (err: any) {
    // Not set up yet — treat as an empty state, not an error.
    if (err?.response?.status === 404) {
      return null
    }
    throw err
  }
}


// updateBankDetails



export const updateBankDetails = async (data: any): Promise<void> => {
  await updateCoupleBankDetails(data)
  // ✅ if no error thrown = success, done!
}

// coupleProfileDetails
export const getCoupleProfileDetailsData =
  async (): Promise<CoupleProfileDetailsData> => {

    const response = await getCoupleProfileDetails()

    if (response.statusCode !== 200 || !response.data) {
      throw new Error(
        response.statusMessage ||
        "Failed to fetch couple profile details"
      )
    }

    return response.data
  }

// coupleUpdateProfile

export const updateCoupleProfileData = async (data: any): Promise<void> => {
  await updateCoupleProfileDetails(data)
  // ✅ if no error thrown = success, done!
}


// updateCoupleProfile
export const updateCouplePhotoData = async (data: any): Promise<any> => {
  return await updateCoupleProfile(data)
}

// delete-couple-profile
export const deleteCoupleProfileData = async (): Promise<void> => {
  await deleteCoupleProfile()

}

// submit-support-ticket
export const submitSupportTicketService = async (
  data: CoupleSupportTicketPayload
): Promise<CoupleSupportTicketResponse> => {
  try {
    const response = await submitCoupleSupportTicket(data)

    return response
  } catch (error) {
    throw error
  }
}

