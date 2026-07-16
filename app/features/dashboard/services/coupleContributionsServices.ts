import { postRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import { getData } from "@/app/utils/storage/storageHelper"
import type { LoginData } from "@/app/features/auth/types/login"
import type { ContributionsListData, ContributionsListResponse } from "../types/coupleContributions"

export const getContributions = async (search = ""): Promise<ContributionsListData> => {
  const authData = getData<LoginData>("authData", "local")

  const response = await postRequest<ContributionsListResponse>(
    endpoints.dashboard.coupleContributionList,
    {
      coupleUserId: authData?.userId ?? 0,
      search,
      isIncludeGuests: true,
      isIncludeCouples: true,
      isIncludePricing: true,
    }
  )

  if (response.statusCode !== 200 || !response.data) {
    return {
      items: [],
      offset: 0,
      length: 0,
      totalReturned: 0,
      totalOverall: 0,
    }
  }

  return response.data
}
