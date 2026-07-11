"use client"

import { useEffect, useRef, useState } from "react"
import { getData, saveData } from "@/app/utils/storage/storageHelper"
import { createGuestUser, createStripeCustomer } from "../api/sendGiftApi"
import { GuestCheckoutPayload } from "../types"
import { GUEST_EMAIL_KEY, GUEST_FULL_NAME_KEY, GUEST_USER_ID_KEY, STRIPE_CUSTOMER_ID_KEY } from "../constants"

// If this guest already has a userId + stripeCustomerId in localStorage from
// a prior submission (e.g. after a page refresh), there's no need to recreate
// them on the server/Stripe — treat the checkout as already ready.
const hasExistingGuest = () =>
  Boolean(
    getData<number>(GUEST_USER_ID_KEY, "local") &&
      getData<string>(STRIPE_CUSTOMER_ID_KEY, "local")
  )

export const useGuestCheckout = () => {
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Guards against firing the create-guest + create-stripe-customer chain
  // more than once (e.g. re-blurring already-submitted fields).
  const hasSubmittedRef = useRef(false)

  // Checked after mount (not in the initial state) to avoid a server/client
  // hydration mismatch, since localStorage isn't available during SSR.
  useEffect(() => {
    if (hasExistingGuest()) {
      hasSubmittedRef.current = true
      setIsReady(true)
    }
  }, [])

  const submitGuestDetails = async (payload: GuestCheckoutPayload) => {
    if (hasSubmittedRef.current || isLoading) return
    hasSubmittedRef.current = true

    try {
      setIsLoading(true)
      setError(null)

      const guestRes = await createGuestUser(payload)
      const guestUserId = guestRes.data.userId
      saveData(GUEST_USER_ID_KEY, guestUserId, "local")
      saveData(GUEST_FULL_NAME_KEY, guestRes.data.fullName, "local")
      saveData(GUEST_EMAIL_KEY, guestRes.data.email, "local")

      const stripeRes = await createStripeCustomer(guestUserId)
      saveData(STRIPE_CUSTOMER_ID_KEY, stripeRes.data.stripeCustomerId, "local")

      setIsReady(true)
    } catch (err: any) {
      hasSubmittedRef.current = false
      setError(err.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return { isReady, isLoading, error, submitGuestDetails }
}
