"use client"

import ModalLayer from "@/app/components/ui/ModalLayer"
import Button from "@/app/components/elements/Button"

interface ConfirmPaymentModalProps {
  isModalOpen: boolean
  onCancel: () => void
  onConfirm: () => void
  isSubmitting: boolean
  currency: string
  giftAmount: number
  wishingCardAmount?: number
  wishingVideoAmount?: number
  platformServiceFeeAmount?: number
}

const ConfirmPaymentModal = ({
  isModalOpen,
  onCancel,
  onConfirm,
  isSubmitting,
  currency,
  giftAmount,
  wishingCardAmount,
  wishingVideoAmount,
  platformServiceFeeAmount,
}: ConfirmPaymentModalProps) => {
  if (!isModalOpen) return null

  const subtotal =
    giftAmount + (wishingCardAmount ?? 0) + (wishingVideoAmount ?? 0)
  const serviceFeePercent = platformServiceFeeAmount ?? 0
  const serviceFeeAmount =
    serviceFeePercent > 0 ? (giftAmount * serviceFeePercent) / 100 : 0
  const total = subtotal + serviceFeeAmount

  return (
    <ModalLayer
      onClose={onCancel}
      modalHeight="auto"
      modalWidth="w-[90%] max-w-[320px] sm:max-w-[400px]"
      overlayColor="bg-[#171515EB]"
      position="center"
    >
      <div className="bg-[#330065] border border-[#5FDA78] rounded-[20px] w-full p-6 flex flex-col gap-4">
        <p className="text-white font-semibold text-lg text-center">Confirm Payment</p>

        <div className="flex flex-col gap-2 text-white text-sm">
          <div className="flex justify-between">
            <span className="text-white/70">Gift Amount</span>
            <span>{currency} {giftAmount.toFixed(2)}</span>
          </div>

          {!!wishingCardAmount && (
            <div className="flex justify-between">
              <span className="text-white/70">Wishing Card</span>
              <span>{currency} {wishingCardAmount.toFixed(2)}</span>
            </div>
          )}

          {!!wishingVideoAmount && (
            <div className="flex justify-between">
              <span className="text-white/70">Wishing Video</span>
              <span>{currency} {wishingVideoAmount.toFixed(2)}</span>
            </div>
          )}

          {serviceFeeAmount > 0 && (
            <div className="flex justify-between">
              <span className="text-white/70">
                Service Fee ({serviceFeePercent.toFixed(2)}%)
              </span>
              <span>{currency} {serviceFeeAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="h-px bg-white/20 my-1" />

          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>{currency} {total.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-white/70 text-xs text-center">Do you want to proceed with this payment?</p>

        <div className="flex gap-4 justify-center">
          <Button
            type="button"
            className="rounded-[47px] py-2! px-8 border border-white! bg-transparent! text-white!"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            No
          </Button>

          <Button
            type="button"
            className="rounded-[47px] py-2! px-8 bg-[#5FDA78]! text-[#330065]!"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Yes"}
          </Button>
        </div>
      </div>
    </ModalLayer>
  )
}

export default ConfirmPaymentModal
