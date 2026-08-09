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
import type {
  AnnouncementDismissalData,
  AnnouncementDismissalResponse,
} from "../types/announcementDismissal"
import { getRequest, postRequest } from "@/app/services/http"
import { CoupleProfileDetailsData, CoupleProfileDetailsResponse } from "../types/coupleProfileDetails"
import { deleteCoupleProfile, getCoupleProfileDetails, submitCoupleSupportTicket, updateCoupleBankDetails, updateCoupleProfile, updateCoupleProfileDetails } from "../api/dashboardApi"
import { CoupleSupportTicketPayload, CoupleSupportTicketResponse } from "../types/submitSupportTicket"

// getDashboardData
export const getDashboardData = async (): Promise<CoupleDashboardData> => {
  try {
    const response = await getRequest<CoupleDashboardResponse>(
      endpoints.dashboard.coupleDashboard,
      // backend returns 403 for this endpoint before a couple has bank
      // details set up — handled below as BANK_ACCOUNT_REQUIRED, not a real error.
      { silenceStatuses: [403] }
    )

    if (response.statusCode !== 200 || !response.data) {
      throw new Error(response.statusMessage || "Failed to fetch dashboard")
    }

    const raw = response.data as CoupleDashboardData & { ProfileImageUrl?: string | null }

    return {
      ...response.data,
      profileImageUrl: raw.profileImageUrl ?? raw.ProfileImageUrl ?? null,
    }
  } catch (err: any) {
    if (err?.response?.status === 403) {
      throw Object.assign(new Error("Bank account required"), {
        code: "BANK_ACCOUNT_REQUIRED",
      })
    }
    throw err
  }
}

// getContributorList
export const getContributorList = async (page: number = 1): Promise<ContributorListData> => {
  const pageSize = 10
  const offset = (page - 1) * pageSize
  const emptyList: ContributorListData = { items: [], page, pageSize, totalCount: 0 }

  try {
    const response = await postRequest<ContributorListResponse>(
      endpoints.dashboard.coupleContributionList,
      {
        isIncludeGuests: true,
        isIncludeCouples: true,
      },
      // backend returns 403 for this endpoint before a couple has bank
      // details set up — an expected empty state, not a real error.
      { params: { offset, length: pageSize }, silenceStatuses: [403] }
    )

    if (response.statusCode !== 200 || !response.data) {
      return emptyList
    }

    return {
      items: response.data.items ?? [],
      page: response.data.page ?? page,
      pageSize: response.data.pageSize ?? pageSize,
      totalCount: response.data.totalCount ?? 0,
    }
  } catch (err: any) {
    if (err?.response?.status === 403) {
      return emptyList
    }
    throw err
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

// dismissAnnouncement
export const dismissAnnouncement = async (
  announcementId: number
): Promise<AnnouncementDismissalData> => {
  const url = endpoints.notifications.dismissAnnouncement.replace(
    "{announcementId}",
    String(announcementId)
  )

  const response = await postRequest<AnnouncementDismissalResponse>(url)

  if (response.statusCode !== 200 || !response.data) {
    throw new Error(response.statusMessage || "Failed to dismiss announcement")
  }

  return response.data
}

// coupleBankDetails
export const getCoupleBankDetailsData = async (): Promise<CoupleBankDetailsData | null> => {
  try {
    const response = await getRequest<CoupleBankDetailsResponse>(
      endpoints.bankdetails.coupleBankDetails,
      // backend returns 403 (not 404) when no bank details exist yet — that's
      // an expected empty state here, so don't spam the console for it.
      { silenceStatuses: [403] }
    )

    if (response.statusCode !== 200 || !response.data) {
      throw new Error(response.statusMessage || "Failed to fetch bank details")
    }

    const raw = response.data as CoupleBankDetailsData & {
      Dob?: string | null
      dateOfBirth?: string | null
      DateOfBirth?: string | null
    }

    return {
      ...raw,
      dob: raw.dob ?? raw.Dob ?? raw.dateOfBirth ?? raw.DateOfBirth ?? null,
    }
  } catch (err: any) {
    // Not set up yet — treat as an empty state, not an error.
    // (backend returns 403 for this endpoint when no bank details exist yet,
    // in addition to the more conventional 404)
    const status = err?.response?.status
    if (status === 404 || status === 403) {
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
    try {
      // backend returns 403 for this endpoint before a couple has bank
      // details set up — handled below as BANK_ACCOUNT_REQUIRED, not a real error.
      const response = await getCoupleProfileDetails({ silenceStatuses: [403] })

      if (response.statusCode !== 200 || !response.data) {
        throw new Error(
          response.statusMessage ||
          "Failed to fetch couple profile details"
        )
      }

      return response.data
    } catch (err: any) {
      if (err?.response?.status === 403) {
        throw Object.assign(new Error("Bank account required"), {
          code: "BANK_ACCOUNT_REQUIRED",
        })
      }
      throw err
    }
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

