import { getRequest } from "@/app/services/http"
import endpoints from "@/app/services/endpoint"
import type { CoupleDashboardResponse } from "@/app/features/dashboard/types/coupleDashboard"

export const getCoupleDashboard = async (): Promise<CoupleDashboardResponse> => {
  return getRequest(endpoints.dashboard.coupleDashboard)
}
