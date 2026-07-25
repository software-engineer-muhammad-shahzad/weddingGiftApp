"use client"

import ModalLayer from "../../../components/ui/ModalLayer"
import Image from "next/image"
import { Check } from "lucide-react"
import Button from "../../../components/elements/Button"
import type { ChargePaymentData } from "../types"
import PaymentSucessfull from "./PaymentSucessfull"

interface PaymentSucessfulModalProps {
  showPaymentSuccess: boolean
  setShowPaymentSuccess: (value: boolean) => void
  receipt?: ChargePaymentData | null
  onDone?: () => void
}

const PaymentSucessfulModal = ({
  showPaymentSuccess,
  setShowPaymentSuccess,
  receipt = null,
  onDone,
}: PaymentSucessfulModalProps) => {
  if (!showPaymentSuccess) return null

  const handleClose = () => {
    setShowPaymentSuccess(false)
    onDone?.()
  }

  return (
    <ModalLayer
      onClose={handleClose}
      modalHeight="auto"
      modalWidth="w-[92%] max-w-[360px] sm:max-w-[420px]"
      overlayColor="bg-[#171515EB]"
      position="center"
    >
      <div
        className="bg-[#330065] w-full max-h-[90vh] p-4 sm:p-6 flex flex-col overflow-y-auto rounded-[20px]"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {receipt ? (
          <PaymentSucessfull
            receipt={receipt}
            onDone={handleClose}
          />
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-3 w-full">
              <Image
                src="/images/shagun-logo.svg"
                alt="Shagun Direct"
                width={48}
                height={48}
              />
              <div className="text-white">
                <p className="font-semibold text-lg">Shagun Direct</p>
                <p className="text-xs text-white/80">
                  Skip the Envelope, Send the Love.
                </p>
              </div>
            </div>
            <div className="w-20 h-20 rounded-full bg-[#5FDA78] flex items-center justify-center my-8">
              <Check className="w-10 h-10 text-white stroke-[3]" />
            </div>
            <p className="text-white font-semibold text-2xl text-center mb-6">
              Payment Successful!
            </p>
            <Button
              type="button"
              className="bg-[#5FDA78]! text-[#330065]! py-3! rounded-full w-full"
              onClick={handleClose}
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </ModalLayer>
  )
}

export default PaymentSucessfulModal
