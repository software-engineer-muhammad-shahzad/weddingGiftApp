"use client"
import { ReactNode } from "react"

interface ModalLayerProps {
  children: ReactNode
  onClose: () => void           // required: callback to close modal
  overlayColor?: string
  modalWidth?: string
  modalHeight?: string
  className?: string
}

const ModalLayer = ({
  children,
  onClose,
  overlayColor = "bg-black/50",
  modalWidth = "max-w-md",
  modalHeight = "auto",
  className = "",
}: ModalLayerProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${overlayColor}`}
      onClick={onClose} // click outside triggers close
    >
      <div
        className={`${modalWidth} ${className}`}
        style={{ height: modalHeight }}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        {children}
      </div>
    </div>
  )
}

export default ModalLayer