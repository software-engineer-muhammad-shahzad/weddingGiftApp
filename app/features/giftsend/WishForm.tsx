"use client"

import Button from "../../components/elements/Button"

interface WishFormProps {
  openStripeModal: () => void
}

const WishForm = ({ openStripeModal }: WishFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Button
        type="button"
        className="bg-[#5FDA78] rounded-2xl py-3! md:py-4"
        onClick={() => openStripeModal()}
      >
        Add Card
      </Button>
    </div>
  )
}

export default WishForm
