"use client"
import Image from "next/image"
import Button from "../../components/elements/Button"
import { useEffect, useState } from "react"
import ModalLayer from "../../components/ui/ModalLayer"

const FALLBACK_CARD_IMAGE = "/images/congrates-card.svg"

interface SelectCardModalProps {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  isSelected: boolean
  onSelect: () => void
  onRemove: () => void
  imageUrl?: string
}

const SelectCardModal = ({ isModalOpen, setIsModalOpen, isSelected, onSelect, onRemove, imageUrl }: SelectCardModalProps) => {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setHasError(false)
  }, [imageUrl])

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handlePrimaryAction = () => {
    if (isSelected) {
      onRemove()
    } else {
      onSelect()
    }
    setIsModalOpen(false)
  }

  if (!isModalOpen) return null

  return (
    <ModalLayer
      onClose={handleClose}
      modalHeight="auto"
      modalWidth="w-full max-w-200"
      overlayColor="bg-[#171515EB]"
      position="bottom"
      className="w-full"
    >
      <div className="bg-[#5FDA78] rounded-t-[28px] w-full px-6 pt-8 pb-10 flex flex-col items-center">
        <div className="w-full max-w-[280px] sm:max-w-[340px] rounded-xl overflow-hidden">
          <Image
            src={hasError || !imageUrl ? FALLBACK_CARD_IMAGE : imageUrl}
            alt="card-image"
            width={374}
            height={265}
            unoptimized={!hasError && !!imageUrl}
            onError={() => setHasError(true)}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="flex gap-4 mt-8 w-full max-w-[340px] justify-center">
          <Button
            className="flex-1 rounded-[47px] text-sm! md:text-base! py-3! border border-[#330065]! bg-transparent! text-[#330065]!"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            className={`flex-1 rounded-[47px] text-sm! md:text-base! py-3! border-0! ${
              isSelected
                ? "bg-[#330065]! text-white!"
                : "bg-[#330065]! text-white!"
            }`}
            onClick={handlePrimaryAction}
          >
            {isSelected ? "Remove Card" : "Select Card"}
          </Button>
        </div>
      </div>
    </ModalLayer>
  )
}

export default SelectCardModal
