"use client"
import Image from "next/image"
import Button from "../elements/Button"
import { useState } from "react"
import ModalLayer from "../ui/ModalLayer"

interface SelectCardModalProps {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  openAddCardModal: () => void
}

const SelectCardModal = ({ isModalOpen, setIsModalOpen, openAddCardModal }: SelectCardModalProps) => {
  const [activeButton, setActiveButton] = useState<"cancel" | "select" | null>(null)

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleSelectCard = () => {
    setIsModalOpen(false)
    openAddCardModal()
  }

  if (!isModalOpen) return null

  return (
    <ModalLayer 
      onClose={handleClose}
      modalHeight="h-full md:h-[300px]"
      modalWidth="w-full max-w-[280px] sm:max-w-[400px]"
      overlayColor="bg-[#171515EB] "
    >
      <div className="bg-[#5FDA78] h-full w-full p-6 flex flex-col items-center justify-center">
        <div className="w-full">
  <Image
    src="/images/congrates-card.svg"
    alt="card-image"
    width={374}
    height={265}
  
   
  />
</div>

        <div className="flex gap-4 mt-5 w-full">
          <Button
            className={`rounded-[47px] text-sm! md:text-lg! py-2! p-2 border border-[#330065] transition-all ${
              activeButton === "cancel"
                ? "bg-[#330065]! text-[#5FDA78]"
                : "bg-[#5FDA78] hover:bg-[#330065] hover:text-[#5FDA78] text-[#330065]"
            }`}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>

          <Button
            className={`rounded-[47px] text-sm! md:text-lg! py-2! border border-[#330065] p-2 transition-all ${
              activeButton === "select"
                ? "bg-[#330065] text-[#5FDA78]"
                : "bg-[#5FDA78] hover:bg-[#330065] hover:text-[#5FDA78] text-[#330065]"
            }`}
            onClick={handleSelectCard}
          >
            Select Card
          </Button>
        </div>
      </div>
    </ModalLayer>
  )
}

export default SelectCardModal