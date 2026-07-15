"use client"

import { useState } from "react"
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type { StripeElementStyle } from "@stripe/stripe-js"
import Button from "@/app/components/elements/Button"
import { showError, showSuccess } from "@/app/lib/toast"
import { getData } from "@/app/utils/storage/storageHelper"
import type { LoginData } from "@/app/features/auth/types/login"
import { attachPaymentMethod, createCard, makePayment } from "./api/paymentApi"
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

const elementStyle: StripeElementStyle = {
  base: {
    fontSize: "16px",
    color: "#330065",
    fontFamily: "inherit",
    "::placeholder": { color: "#9a8fae" },
  },
  invalid: { color: "#dc2626" },
}

const StripeCardForm = ({ onClose, amount }: StripeCardFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!stripe || !elements) return

    setError(null)

    const parsedAmount = Number(amount)
    if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a wishing amount before adding a card.")
      return
    }

    setIsSubmitting(true)

    const cardNumberElement = elements.getElement(CardNumberElement)
    if (!cardNumberElement) {
      setIsSubmitting(false)
      setError("Card details are not available. Please try again.")
      return
    }

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
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
        // Stripe Elements never exposes the raw CVC to client JS (PCI scope) —
        // send a masked placeholder to satisfy the backend's required field,
        // same as cardLast4Digits standing in for the full card number.
        cvc: "***",
        name: guestFullName ?? "",
        email: guestEmail ?? "",
        cardBrand: card?.brand ?? "",
      })

      // Links the payment method to the guest's Stripe customer before
      // charging — the charge call fails if the method isn't attached first.
      await attachPaymentMethod({
        userId: guestUserId,
        paymentMethodId: paymentMethod.id,
      })

      await makePayment({
        recipientUserId: authData.userId,
        guestUserId: guestUserId,
        amount: parsedAmount,
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

      <div className="flex flex-col gap-1">
        <label className="text-[#330065] text-xs font-medium">Card Number</label>
        <div className="bg-white rounded-xl border border-[#330065] px-3 py-3 sm:px-4">
          <CardNumberElement options={{ style: elementStyle }} />
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-[#330065] text-xs font-medium">Expiry Date</label>
          <div className="bg-white rounded-xl border border-[#330065] px-3 py-3 sm:px-4">
            <CardExpiryElement options={{ style: elementStyle }} />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <label className="text-[#330065] text-xs font-medium">CVC</label>
          <div className="bg-white rounded-xl border border-[#330065] px-3 py-3 sm:px-4">
            <CardCvcElement options={{ style: elementStyle }} />
          </div>
        </div>
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
