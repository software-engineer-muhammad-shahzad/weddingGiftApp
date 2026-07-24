"use client"

import Button from "@/app/components/elements/Button"
import type { GuestPaymentMethod } from "./types"

interface SavedPaymentMethodPanelProps {
  paymentMethod: GuestPaymentMethod
  onUseSavedCard: () => void
  onAddAnotherCard: () => void
  isPaying?: boolean
}

const formatExpiry = (month: number, year: number) => {
  const mm = String(month).padStart(2, "0")
  const yy = String(year).slice(-2)
  return `${mm}/${yy}`
}

const SavedPaymentMethodPanel = ({
  paymentMethod,
  onUseSavedCard,
  onAddAnotherCard,
  isPaying = false,
}: SavedPaymentMethodPanelProps) => {
  const brand = paymentMethod.cardBrand?.trim() || "Card"
  const last4 = (paymentMethod.cardLast4 || "").replace(/\D/g, "").slice(-4)
  const holderName = paymentMethod.cardHolderName?.trim() || "—"

  return (
    <div className="flex flex-col gap-4 px-4 md:px-8 py-6 glass-card border border-[#5FDA78] rounded-[20px]">
      <p className="text-white text-base font-semibold">Saved card</p>
      <p className="text-white/70 text-sm">
        We found a card linked to your account. You can use it or add a different one.
      </p>

      <div className="overflow-x-auto rounded-xl border border-white/20">
        <table className="w-full min-w-[280px] text-left text-sm text-white">
          <thead className="bg-white/10 text-white/80">
            <tr>
              <th className="px-3 py-2 font-medium">Brand</th>
              <th className="px-3 py-2 font-medium">Card</th>
              <th className="px-3 py-2 font-medium">Expiry</th>
              <th className="px-3 py-2 font-medium">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-white/10">
              <td className="px-3 py-3 capitalize">{brand}</td>
              <td className="px-3 py-3">•••• {last4 || "—"}</td>
              <td className="px-3 py-3">
                {formatExpiry(paymentMethod.expMonth, paymentMethod.expYear)}
              </td>
              <td className="px-3 py-3">{holderName}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          className="flex-1 bg-[#5FDA78]! text-[#330065]! rounded-2xl py-3!"
          onClick={onUseSavedCard}
          disabled={isPaying}
        >
          {isPaying ? "Processing..." : "Use this card"}
        </Button>
        <Button
          type="button"
          className="flex-1 bg-transparent! text-white! border border-white! rounded-2xl py-3!"
          onClick={onAddAnotherCard}
          disabled={isPaying}
        >
          Add another card
        </Button>
      </div>
    </div>
  )
}

export default SavedPaymentMethodPanel
