"use client"

import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import ModalLayer from "@/app/components/ui/ModalLayer"
import StripeCardForm from "./StripeCardForm"
import type { GuestPaymentMethod } from "./types"

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = publishableKey ? loadStripe(publishableKey) : null

const elementsOptions: StripeElementsOptions = {}

interface StripeCardModalProps {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
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
  savedPaymentMethods?: GuestPaymentMethod[]
}

const StripeCardModal = ({
  isModalOpen,
  setIsModalOpen,
  amount,
  recipientUserId,
  wishingCardPath,
  wishingVideoPath,
  wishingContent,
  wishingCardAmount,
  wishingVideoAmount,
  platformServiceFeeAmount,
  currency,
  greetingMediaType,
  savedPaymentMethods = [],
}: StripeCardModalProps) => {
  if (!isModalOpen) return null

  const handleClose = () => setIsModalOpen(false)

  return (
    <ModalLayer
      onClose={handleClose}
      modalHeight="auto"
      modalWidth="w-[92%] max-w-[420px] sm:max-w-[560px] md:max-w-[640px]"
      overlayColor="bg-[#171515EB]"
      position="center"
    >
      <div className="bg-[#5FDA78] w-full max-h-[85vh] overflow-y-auto p-4 md:p-6 flex flex-col items-stretch justify-start">
        {stripePromise ? (
          <Elements stripe={stripePromise} options={elementsOptions}>
            <StripeCardForm
              onClose={handleClose}
              amount={amount}
              recipientUserId={recipientUserId}
              wishingCardPath={wishingCardPath}
              wishingVideoPath={wishingVideoPath}
              wishingContent={wishingContent}
              wishingCardAmount={wishingCardAmount}
              wishingVideoAmount={wishingVideoAmount}
              platformServiceFeeAmount={platformServiceFeeAmount}
              currency={currency}
              greetingMediaType={greetingMediaType}
              savedPaymentMethods={savedPaymentMethods}
            />
          </Elements>
        ) : (
          <p className="text-[#330065] text-sm text-center">
            Stripe is not configured yet. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to enable card entry.
          </p>
        )}
      </div>
    </ModalLayer>
  )
}

export default StripeCardModal
