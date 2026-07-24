"use client"

import { useEffect, useRef, useState } from "react"
import { getData, removeData, saveData } from "@/app/utils/storage/storageHelper"
import { createGuestUser, createStripeCustomer, getSendGiftUser } from "../api/sendGiftApi"
import {
  GUEST_CONTACT_KEY,
  GUEST_EMAIL_KEY,
  GUEST_FULL_NAME_KEY,
  GUEST_PAYMENT_METHOD_KEY,
  GUEST_USER_ID_KEY,
  STRIPE_CUSTOMER_ID_KEY,
} from "../constants"
import type { GuestCheckoutPayload, GuestPaymentMethod, SendGiftUserData } from "../types"
import {
  extractPaymentMethodsFromGuestData,
  hasPaymentMethodData,
  normalizePaymentMethods,
} from "../utils/paymentMethod"

const hasExistingGuest = () => {
  const guestUserId = Number(getData<number | string>(GUEST_USER_ID_KEY, "local"))
  const stripeCustomerId = getData<string>(STRIPE_CUSTOMER_ID_KEY, "local")
  return Boolean(guestUserId && !Number.isNaN(guestUserId) && stripeCustomerId)
}

const readStoredPaymentMethods = (): GuestPaymentMethod[] => {
  const stored = getData<GuestPaymentMethod | GuestPaymentMethod[]>(GUEST_PAYMENT_METHOD_KEY, "local")
  return normalizePaymentMethods(stored)
}

const extractMethodsFromResponse = (response: unknown): GuestPaymentMethod[] => {
  const record = response && typeof response === "object" ? (response as Record<string, unknown>) : null
  const fromData = extractPaymentMethodsFromGuestData(record?.data ?? record?.Data)
  if (fromData.length > 0) return fromData
  return extractPaymentMethodsFromGuestData(response)
}

const fetchPaymentMethodsForGuest = async (guestUserId: number): Promise<GuestPaymentMethod[]> => {
  try {
    const userRes = await getSendGiftUser(guestUserId, { skipAuth: true })
    return extractMethodsFromResponse(userRes)
  } catch {
    return []
  }
}

export const useGuestCheckout = () => {
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<GuestPaymentMethod[]>([])

  const hasSubmittedRef = useRef(false)

  const persistPaymentMethods = (methods: GuestPaymentMethod[]) => {
    const validMethods = methods.filter((method) => hasPaymentMethodData(method))
    if (validMethods.length > 0) {
      saveData(GUEST_PAYMENT_METHOD_KEY, validMethods, "local")
      setSavedPaymentMethods(validMethods)
      return
    }

    removeData(GUEST_PAYMENT_METHOD_KEY, "local")
    setSavedPaymentMethods([])
  }

  const refreshSavedPaymentMethods = () => {
    setSavedPaymentMethods(readStoredPaymentMethods())
  }

  const loadPaymentMethods = async (guestUserId: number, createResponse?: unknown) => {
    let methods = createResponse ? extractMethodsFromResponse(createResponse) : []

    if (methods.length === 0) {
      methods = await fetchPaymentMethodsForGuest(guestUserId)
    }

    if (methods.length === 0) {
      methods = readStoredPaymentMethods()
    }

    if (methods.length > 0) {
      persistPaymentMethods(methods)
    }

    return methods
  }

  useEffect(() => {
    if (!hasExistingGuest()) return

    const storedMethods = readStoredPaymentMethods()
    const fullName = getData<string>(GUEST_FULL_NAME_KEY, "local")
    const email = getData<string>(GUEST_EMAIL_KEY, "local")
    const contactNumber = getData<string>(GUEST_CONTACT_KEY, "local")
    const guestUserId = Number(getData<number | string>(GUEST_USER_ID_KEY, "local"))

    if (storedMethods.length === 0 && !contactNumber) {
      removeData(GUEST_USER_ID_KEY, "local")
      removeData(STRIPE_CUSTOMER_ID_KEY, "local")
      removeData(GUEST_PAYMENT_METHOD_KEY, "local")
      hasSubmittedRef.current = false
      setIsReady(false)
      return
    }

    hasSubmittedRef.current = true
    setSavedPaymentMethods(storedMethods)
    setIsReady(true)

    let cancelled = false
    ;(async () => {
      try {
        if (fullName && email && contactNumber) {
          const guestRes = await createGuestUser({ fullName, email, contactNumber })
          if (!cancelled) await loadPaymentMethods(guestUserId, guestRes)
        } else if (guestUserId) {
          if (!cancelled) await loadPaymentMethods(guestUserId)
        }
      } catch {
        if (!cancelled && guestUserId) await loadPaymentMethods(guestUserId)
      }
      if (!cancelled) refreshSavedPaymentMethods()
    })()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitGuestDetails = async (payload: GuestCheckoutPayload) => {
    if (hasSubmittedRef.current || isLoading) return
    hasSubmittedRef.current = true

    try {
      setIsLoading(true)
      setError(null)

      const guestRes = await createGuestUser(payload)
      const guestData = guestRes.data as SendGiftUserData & {
        UserId?: number | string
        StripeCustomerId?: string | null
        fullName?: string
        email?: string
        contactNumber?: string
        stripeCustomerId?: string | null
      }

      if (!guestData) {
        throw new Error("Guest account could not be created. Please try again.")
      }

      const guestUserId = Number(guestData.userId ?? guestData.UserId)
      if (!guestUserId) {
        throw new Error("Guest account could not be created. Please try again.")
      }

      saveData(GUEST_USER_ID_KEY, guestUserId, "local")
      saveData(GUEST_FULL_NAME_KEY, String(guestData.fullName ?? payload.fullName), "local")
      saveData(GUEST_EMAIL_KEY, String(guestData.email ?? payload.email), "local")
      saveData(
        GUEST_CONTACT_KEY,
        String(guestData.contactNumber ?? payload.contactNumber),
        "local",
      )

      await loadPaymentMethods(guestUserId, guestRes)

      const existingStripeCustomerId =
        guestData.stripeCustomerId ?? guestData.StripeCustomerId ?? null

      let stripeCustomerId = existingStripeCustomerId?.trim() || ""
      if (!stripeCustomerId) {
        const stripeRes = await createStripeCustomer(guestUserId)
        stripeCustomerId = stripeRes.data.stripeCustomerId
      }

      if (!stripeCustomerId) {
        throw new Error("Payment profile could not be created. Please try again.")
      }

      saveData(STRIPE_CUSTOMER_ID_KEY, stripeCustomerId, "local")
      setIsReady(true)
    } catch (err: any) {
      hasSubmittedRef.current = false
      setError(err.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isReady,
    isLoading,
    error,
    savedPaymentMethods,
    refreshSavedPaymentMethods,
    submitGuestDetails,
  }
}
