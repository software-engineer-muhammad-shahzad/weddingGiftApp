import { useState, useEffect } from "react"
import { getDashboardData } from "@/app/features/dashboard/services/dashboardService"
import type { CoupleDashboardData } from "@/app/features/dashboard/types/coupleDashboard"

export const useDashboard = () => {
  const [data, setData] = useState<CoupleDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [needsBankAccount, setNeedsBankAccount] = useState(false)

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setNeedsBankAccount(false)

      const dashboardData = await getDashboardData()

      setData(dashboardData)
    } catch (err: any) {
      if (err?.code === "BANK_ACCOUNT_REQUIRED") {
        setNeedsBankAccount(true)
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong")
      }
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
    needsBankAccount,
    refetch: fetchDashboardData,
  }
}