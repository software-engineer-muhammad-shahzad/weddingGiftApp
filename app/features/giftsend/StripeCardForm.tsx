"use client"

import { useState } from "react"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import Button from "@/app/components/elements/Button"
import { showError, showSuccess } from "@/app/lib/toast"
import { getData } from "@/app/utils/storage/storageHelper"
import type { LoginData } from "@/app/features/auth/types/login"
import { createCard, makePayment } from "./api/paymentApi"
import {
  GUEST_EMAIL_KEY,
  GUEST_FULL_NAME_KEY,
  GUEST_USER_ID_KEY,
  STRIPE_CUSTOMER_ID_KEY,
} from "./constants"

interface StripeCardFormProps {
  onClose: () => void
  amount: string
}

const StripeCardForm = ({ onClose, amount }: StripeCardFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!stripe || !elements) return

    setIsSubmitting(true)
    setError(null)

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setIsSubmitting(false)
      setError(submitError.message || "Card details are invalid")
      return
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      setIsSubmitting(false)
      setError("Card details are not available. Please try again.")
      return
    }

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    })

    if (stripeError || !paymentMethod) {
      setIsSubmitting(false)
      setError(stripeError?.message || "Card details are invalid")
      return
    }

    const guestUserId = getData<number>(GUEST_USER_ID_KEY, "local")
    const stripeCustomerId = getData<string>(STRIPE_CUSTOMER_ID_KEY, "local")
    const guestFullName = getData<string>(GUEST_FULL_NAME_KEY, "local")
    const guestEmail = getData<string>(GUEST_EMAIL_KEY, "local")
    const authData = getData<LoginData>("authData", "local")

    if (!guestUserId || !stripeCustomerId || !authData?.userId) {
      setIsSubmitting(false)
      setError("Missing guest or recipient details. Please refresh and try again.")
      return
    }

    try {
      const card = paymentMethod.card

      await createCard({
        userId: guestUserId,
        guestUserId,
        customerId: stripeCustomerId,
        stripeCustomerId,
        paymentMethodId: paymentMethod.id,
        cardLast4Digits: card?.last4 ?? "",
        expMonth: card?.exp_month ?? 0,
        expYear: card?.exp_year ?? 0,
        cvc: "",
        name: guestFullName ?? "",
        email: guestEmail ?? "",
        cardBrand: card?.brand ?? "",
      })

      await makePayment({
        recipientUserId: authData.userId,
        guestUserId: guestUserId,
        amount: Number(amount) || 0,
        paymentMethodId: paymentMethod.id,
        customerId: stripeCustomerId,
        stripeCustomerId,
      })

      showSuccess("Payment successful")
      onClose()
    } catch (err: any) {
      const apiMessage =
        err?.response?.data?.message ||
        err?.response?.data?.statusMessage ||
        err?.response?.data?.error ||
        err?.message ||
        "Payment failed. Please try again."

      setError(apiMessage)
      showError(apiMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-[#330065] font-semibold text-base sm:text-lg">Enter Card Details</p>

      <div className="bg-white rounded-xl border border-[#330065] px-3 py-3 sm:px-4">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      {error && <p className="text-red-600 text-xs sm:text-sm">{error}</p>}

      <Button
        className="w-full bg-[#330065]! text-[#5FDA78]! rounded-[47px] py-3! mt-2"
        onClick={handleSubmit}
        disabled={!stripe || !elements || isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Save Card"}
      </Button>
    </div>
  )
}

export default StripeCardForm
