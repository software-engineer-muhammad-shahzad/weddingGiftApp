"use client"

import Button from "../../components/elements/Button"

interface WishFormProps {
  openStripeModal: () => void
  hasSavedCards?: boolean
  disabled?: boolean
}

const WishForm = ({
  openStripeModal,
  hasSavedCards = false,
  disabled = false,
}: WishFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Button
        type="button"
        className="bg-[#5FDA78] rounded-2xl py-3! md:py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => openStripeModal()}
        disabled={disabled}
      >
        {hasSavedCards ? "Continue to Payment" : "Add Card"}
      </Button>
    </div>
  )
}

export default WishForm
