"use client"

import Link from "next/link"
import { X } from "lucide-react"
import ModalLayer from "@/app/components/ui/ModalLayer"

interface BankAccountRequiredModalProps {
  isOpen: boolean
  /**
   * Omit to make the prompt blocking (no close affordance, no click-outside).
   * Used when the dashboard itself can't load without bank details; the
   * button-triggered prompts pass a closer so the user can back out.
   */
  onClose?: () => void
}

const BankAccountRequiredModal = ({ isOpen, onClose }: BankAccountRequiredModalProps) => {
  if (!isOpen) return null

  return (
    <ModalLayer
      onClose={onClose}
      modalHeight="auto"
      modalWidth="w-[90%] max-w-[360px]"
      overlayColor="bg-[#171515EB]"
      position="center"
      className="rounded-2xl border border-[#5FDA78]"
    >
      <div className="bg-[#330065] rounded-2xl p-6 flex flex-col gap-4">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="self-end -mt-2 -mr-2 cursor-pointer text-white/70 transition-colors hover:text-white"
          >
            <X size={18} />
          </button>
        )}

        <p className="text-white font-semibold text-xl text-center">
          Bank Account Required
        </p>
        <p className="text-white/80 text-sm text-center">
          Please add bank account details first.
        </p>
        <Link
          href="/dashboard/setting/bank-info"
          className="mt-2 w-full bg-[#5FDA78] text-[#330065] text-center py-3 rounded-full font-semibold hover:bg-[#4ecb68] transition-colors"
        >
          Add Bank Details
        </Link>
      </div>
    </ModalLayer>
  )
}

export default BankAccountRequiredModal
