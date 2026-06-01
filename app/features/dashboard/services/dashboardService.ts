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
import { getRequest } from "@/app/services/http"
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
  const response = await getRequest<ContributorListResponse>(
    `${endpoints.dashboard.coupleContributionList}?page=${page}`
  )

  if (response.statusCode !== 200 || !response.data) {
    throw new Error(response.statusMessage || "Failed to fetch contributor list")
  }

  return response.data
}

// getNotifications
export const getNotifications = async (page: number = 1): Promise<NotificationListData> => {
  const response = await getRequest<NotificationListResponse>(
    `${endpoints.notifications.coupleNotification}?page=${page}`
  )

  if (response.statusCode !== 200 || !response.data) {
    throw new Error(response.statusMessage || "Failed to fetch notifications")
  }

  return response.data
}

// coupleBankDetails
export const getCoupleBankDetailsData = async (): Promise<CoupleBankDetailsData> => {
  const response = await getRequest<CoupleBankDetailsResponse>(
    endpoints.bankdetails.coupleBankDetails
  )

  if (response.statusCode !== 200 || !response.data) {
    throw new Error(response.statusMessage || "Failed to fetch bank details")
  }

  return response.data
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
export const updateCouplePhotoData = async (data: any): Promise<void> => {
  await updateCoupleProfile(data)
  // ✅ if no error thrown = success, done!
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

