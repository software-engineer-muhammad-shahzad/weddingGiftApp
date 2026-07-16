"use client"
import Image from "next/image"
import Button from "../../components/elements/Button"
import { useEffect, useState } from "react"
import ModalLayer from "../../components/ui/ModalLayer"

const FALLBACK_CARD_IMAGE = "/images/congrates-card.svg"

const glassButtonStyle = {
  background: `
    radial-gradient(38.46% 100.49% at 11.54% 37.29%, rgba(255, 235, 255, 0) 0%, rgba(230, 255, 240, 0) 70%, rgba(240, 240, 255, 0) 100%),
    linear-gradient(292.3deg, rgba(255, 255, 255, 0.044) -17.81%, rgba(255, 255, 255, 0) 42.98%, rgba(217, 235, 255, 0) 83.5%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.066) -148.31%, rgba(0, 0, 0, 0.022) -69.93%, rgba(0, 0, 0, 0) 34.57%, rgba(0, 0, 0, 0) 112.95%),
    linear-gradient(0deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01))
  `,
  boxShadow: `
    0px 0px 1.5px 0px #FF264000 inset,
    0px 0px 1.5px 0px #2673FF00 inset,
    0px 1.5px 3.33px 0px #FFFFFF19 inset,
    0px 0px 8px 0px #D1E5FF00 inset,
    0px 3px 12px -3px #00000026,
    0px 10px 28px -6px #00000040,
    0px 0px 45px 0px #FFFFFF05
  `,
  backdropFilter: "blur(25px)",
}

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

  // reset the error flag whenever a different card is opened
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
      modalHeight="h-full md:h-[300px]"
      modalWidth="w-full max-w-[280px] sm:max-w-[400px]"
      overlayColor="bg-[#171515EB] "
      position="center"
    >
      <div className="bg-[#330065] border border-[#5FDA78] rounded-[20px] h-full w-full p-6 flex flex-col items-center justify-center">
        <div className="w-full">
  <Image
    src={hasError || !imageUrl ? FALLBACK_CARD_IMAGE : imageUrl}
    alt="card-image"
    width={374}
    height={265}
    unoptimized={!hasError && !!imageUrl}
    onError={() => setHasError(true)}
  />
</div>

        <div className="flex gap-4 mt-5 w-full justify-center">
          <Button
            className="rounded-[47px] text-sm! md:text-lg! py-2! p-2 border border-[#5FDA78]! transition-all bg-transparent! text-[#5FDA78]!"
            style={glassButtonStyle}
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            className={`rounded-[47px] text-sm! md:text-lg! py-2! border p-2 transition-all bg-transparent! ${
              isSelected ? "text-red-500! border-red-500!" : "text-[#5FDA78]! border-[#5FDA78]!"
            }`}
            style={glassButtonStyle}
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