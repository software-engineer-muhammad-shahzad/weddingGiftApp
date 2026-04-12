"use client"
import { ReactNode } from "react"


interface ModalLayerProps {
  children: ReactNode
  onClose?: () => void           // required: callback to close modal
  overlayColor?: string
  modalWidth?: string
  modalHeight?: string
  className?: string
  position?: "center" | "bottom"
}

const ModalLayer = ({
  children,
  onClose,
  overlayColor = "bg-[#330065B2] backdrop-blur-[20px]",
  modalHeight = "380px",
  modalWidth = "", // default value changed to "100%"
  className = "",
  position = "center",
}: ModalLayerProps) => {
  return (
    <div
      className={`fixed  inset-0 z-2 ${position === "bottom" ? "flex items-end justify-center" : "flex items-center justify-center"} ${position === "bottom" ? "rounded-t-2xl overflow-hidden" : ""} ${overlayColor}`}
      onClick={onClose} // click outside triggers close

    >
      <div
        className={`${className} ${position === "bottom" ? "" : "rounded-2xl overflow-hidden"} ${modalWidth || ""}`}
        style={{ height: modalHeight, width: modalWidth }}
        onClick={(e: any) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        {children}
      </div>
    </div>
  )
}

export default ModalLayer