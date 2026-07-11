import { deleteRequest, getRequest, postRequest, putRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import type { CoupleDashboardResponse } from "@/app/features/dashboard/types/coupleDashboard"
import type { CoupleBankDetailsResponse } from "@/app/features/dashboard/types/coupleBankDetails"
import { CoupleProfileDetailsResponse } from "../types/coupleProfileDetails"
import { CoupleSupportTicketPayload, CoupleSupportTicketResponse } from "../types/submitSupportTicket"

export const getCoupleDashboard = async (config: any = {}): Promise<CoupleDashboardResponse> => {
  return getRequest(endpoints.dashboard.coupleDashboard, config)
}

// get-bank-details
export const getCoupleBankDetails = async (config: any = {}): Promise<CoupleBankDetailsResponse> => {
  return getRequest(endpoints.bankdetails.coupleBankDetails, config)
}

// update-bank-details
export const updateCoupleBankDetails = async (data: any): Promise<any> => {
  return putRequest(endpoints.bankdetails.coupleBankDetails, data)
}

// call couple-profile-details api
export const getCoupleProfileDetails = async (config: any = {}): Promise<CoupleProfileDetailsResponse> => {
  return getRequest(endpoints.coupleProfile.coupleProfileDetails, config)
}

// call couple-update-profile
export const updateCoupleProfileDetails = async (data: any): Promise<any> => {
  return putRequest(endpoints.coupleProfile.coupleProfileDetails, data)
}



//update-couple-photo
export const updateCoupleProfile = (formData: FormData): Promise<any> => {
  return postRequest(endpoints.coupleProfile.updateCoupleProfile, formData)
}



// delete-couple-Photo
export const deleteCoupleProfile = (): Promise<any> => {
  return deleteRequest(endpoints.coupleProfile.deleteCoupleProfile)
}

// submit-support-ticket

export const submitCoupleSupportTicket = (data: CoupleSupportTicketPayload): Promise<CoupleSupportTicketResponse> => {
  return postRequest( endpoints.support.coupleSubmitTicket,data)
}