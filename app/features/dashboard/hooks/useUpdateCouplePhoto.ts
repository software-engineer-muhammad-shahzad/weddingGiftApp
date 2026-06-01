import { useState } from "react"
import { updateCouplePhotoData } from "../services/dashboardService"

const UPLOAD_KEY = "file" // 👈 change to "image" if backend says so

export const useUpdateCouplePhoto = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const updateProfilePhoto = async (file: File) => {
    try {
      setIsLoading(true)
      setError(null)
      setIsSuccess(false)

      const formData = new FormData()

      // ✅ IMPORTANT: must match backend exactly
      formData.append(UPLOAD_KEY, file)

      const res = await updateCouplePhotoData(formData)

      setIsSuccess(true)

      return res?.data // { profileImageUrl }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong"

      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    updateProfilePhoto,
    isLoading,
    error,
    isSuccess,
    setIsSuccess,
  }
}