import { useState, useEffect } from "react"
import { getDashboardData } from "@/app/features/dashboard/services/dashboardService"
import type { CoupleDashboardData } from "@/app/features/dashboard/types/coupleDashboard"

export const useDashboard = () => {
  const [data, setData] = useState<CoupleDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const dashboardData = await getDashboardData()

      setData(dashboardData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return {
    data,
    isLoading,
    error,
    refetch: fetchDashboardData,
  }
}