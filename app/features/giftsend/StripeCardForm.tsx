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
import { attachPaymentMethod, createCard, makePayment } from "./api/paymentApi"
import ConfirmPaymentModal from "./ConfirmPaymentModal"
import {
  GUEST_EMAIL_KEY,
  GUEST_FULL_NAME_KEY,
  GUEST_USER_ID_KEY,
  STRIPE_CUSTOMER_ID_KEY,
} from "./constants"

interface StripeCardFormProps {
  onClose: () => void
  amount: string
  recipientUserId: number | null
  wishingCardPath?: string
  wishingVideoPath?: string
  wishingContent?: string
  wishingCardAmount?: number
  wishingVideoAmount?: number
  platformServiceFeeAmount?: number
  currency?: string
  greetingMediaType?: "Image" | "Video"
}

interface PendingCharge {
  guestUserId: number
  stripeCustomerId: string
  paymentMethodId: string
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

const StripeCardForm = ({
  onClose,
  amount,
  recipientUserId,
  wishingCardPath,
  wishingVideoPath,
  wishingContent,
  wishingCardAmount,
  wishingVideoAmount,
  platformServiceFeeAmount,
  currency = "",
  greetingMediaType,
}: StripeCardFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isCharging, setIsCharging] = useState(false)
  const [pendingCharge, setPendingCharge] = useState<PendingCharge | null>(null)

  const parsedAmount = Number(amount)

  const handleSubmit = async () => {
    if (!stripe || !elements) return

    setError(null)

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

    if (!guestUserId || !stripeCustomerId || !recipientUserId) {
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

      // Card is saved and attached — hold off on the actual charge until the
      // guest confirms the amount breakdown in ConfirmPaymentModal.
      setPendingCharge({
        guestUserId,
        stripeCustomerId,
        paymentMethodId: paymentMethod.id,
      })
      setIsConfirmOpen(true)
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

  const handleConfirmPayment = async () => {
    if (!pendingCharge || !recipientUserId) return

    setIsCharging(true)
    setError(null)

    try {
      await makePayment({
        recipientUserId,
        guestUserId: pendingCharge.guestUserId,
        amount: parsedAmount,
        paymentMethodId: pendingCharge.paymentMethodId,
        customerId: pendingCharge.stripeCustomerId,
        stripeCustomerId: pendingCharge.stripeCustomerId,
        wishingCardPath,
        wishingVideoPath,
        wishingContent,
        wishingCardAmount,
        wishingVideoAmount,
        greetingMediaType,
      })

      showSuccess("Payment successful")
      setIsConfirmOpen(false)
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
      setIsCharging(false)
    }
  }

  const handleCancelPayment = () => {
    // Card is already saved — just back out of the charge so the guest can
    // review/change the amount or retry without re-entering card details.
    setIsConfirmOpen(false)
    setPendingCharge(null)
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

      <ConfirmPaymentModal
        isModalOpen={isConfirmOpen}
        onCancel={handleCancelPayment}
        onConfirm={handleConfirmPayment}
        isSubmitting={isCharging}
        currency={currency}
        giftAmount={parsedAmount}
        wishingCardAmount={wishingCardAmount}
        wishingVideoAmount={wishingVideoAmount}
        platformServiceFeeAmount={platformServiceFeeAmount}
      />
    </div>
  )
}

export default StripeCardForm
