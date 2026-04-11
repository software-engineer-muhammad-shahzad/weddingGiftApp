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
    <ModalLayer onClose={handleClose}>
      <div className="w-100 h-64 p-4 bg-[#5FDA78] rounded-lg flex flex-col items-center justify-center">
        <div>
          <Image src="/images/card-image.png" alt="card-image" width={150} height={150} />
        </div>

        <div className="flex gap-4 mt-5 w-full">
          <Button
            className={`rounded-[47px] text-sm p-2 border border-[#330065] transition-all ${
              activeButton === "cancel"
                ? "bg-[#330065] text-[#5FDA78]"
                : "bg-[#5FDA78] text-[#330065]"
            }`}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>

          <Button
            className={`rounded-[47px] text-sm border border-[#330065] p-2 transition-all ${
              activeButton === "select"
                ? "bg-[#330065] text-[#5FDA78]"
                : "bg-[#5FDA78] text-[#330065]"
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