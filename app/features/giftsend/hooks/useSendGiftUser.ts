"use client"

import { useEffect, useState } from "react"
import { getData } from "@/app/utils/storage/storageHelper"
import { LoginData } from "@/app/features/auth/types/login"
import { SendGiftUserData } from "../types"
import { getSendGiftUser } from "../api/sendGiftApi"

export const useSendGiftUser = () => {
  const [data, setData] = useState<SendGiftUserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true)
        const authData = getData<LoginData>("authData", "local")

        if (!authData?.userId) {
          throw new Error("User not found in local storage")
        }

        const res = await getSendGiftUser(authData.userId)
        setData(res.data)
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { data, isLoading, error }
}
