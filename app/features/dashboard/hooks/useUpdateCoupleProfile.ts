import { useState } from "react"
import { updateCoupleProfileData } from "../services/dashboardService"

export const useUpdateCoupleProfileDetails = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [isSuccess, setIsSuccess] = useState(false);

  const updateProfile = async (payload: any) => {
    try {
      setIsLoading(true)
      setError(null)

      let res = await updateCoupleProfileData(payload)
// console.log("response of the api is getting here:",res);
      // 🔥 trigger fresh value every time
      
        setIsSuccess(true)
      

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      throw err
    } finally {
      setIsLoading(false)
       
    }
  }

  return {
    updateProfile,
    isLoading,
    error,
   isSuccess,
   setIsSuccess
  }
}