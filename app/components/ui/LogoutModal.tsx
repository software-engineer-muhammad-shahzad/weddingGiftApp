"use client"
import { ReactNode } from "react"

interface LogoutModalProps {
  children: ReactNode
  onClose?: () => void
  modalWidth?: string
  modalHeight?: string
  className?: string
}

const LogoutModal = ({
  children,
  onClose,
  modalWidth = "w-[500px]",
  modalHeight = "300px",
  className = "",
}: LogoutModalProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black/50`}
      onClick={onClose}
    >
      <div
        className={`${modalWidth} ${className} rounded-t-2xl overflow-hidden bg-clip-padding`}
        style={{ height: modalHeight }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default LogoutModal
