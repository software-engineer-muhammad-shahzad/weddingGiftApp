import { postRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import type { ContributionsListData, ContributionsListResponse } from "../types/coupleContributions"

export const getContributions = async (): Promise<ContributionsListData> => {
  const response = await postRequest<ContributionsListResponse>(
    endpoints.dashboard.coupleContributionList,
    {
      isIncludeGuests: true,
      isIncludeCouples: true,
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
