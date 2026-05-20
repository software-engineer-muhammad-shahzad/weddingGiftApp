import { useState, useEffect } from "react"
import { getCoupleBankDetailsData } from "../services/dashboardService"
import type { CoupleBankDetailsData } from "../types/coupleBankDetails"

export const useCoupleBankDetails = () => {
  const [data, setData] = useState<CoupleBankDetailsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBankDetails = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const bankDetails = await getCoupleBankDetailsData()

      setData(bankDetails)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBankDetails()
  }, [])

  return {
    data,
    isLoading,
    error,
    refetch: fetchBankDetails,
  }
}
