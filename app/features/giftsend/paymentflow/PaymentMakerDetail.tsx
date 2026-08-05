"use client"

import { Download, Share2 } from "lucide-react"
import Button from "../../../components/elements/Button"
import type { ChargePaymentData } from "../types"
import { formatAccountDisplay } from "../utils/paymentReceipt"

interface PaymentMakerDetailProps {
  receipt: ChargePaymentData
  onDone: () => void
  onDownload: () => void
  onShare: () => void
  isDownloading?: boolean
  isSharing?: boolean
}

const PaymentMakerDetail = ({
  receipt,
  onDone,
  onDownload,
  onShare,
  isDownloading = false,
  isSharing = false,
}: PaymentMakerDetailProps) => {
  return (
    <>
      <div className="mt-4 sm:mt-6 p-4 border border-white/25 rounded-[20px] bg-white/5">
        <div className="relative pb-4">
          <div className="flex justify-between gap-3">
            <p className="text-[#B5B5B5] font-medium text-sm">Sender Name</p>
            <p className="text-white font-medium text-sm text-right">
              {receipt.senderName || "—"}
            </p>
          </div>
          <div className="flex justify-between gap-3 mt-2">
            <p className="text-[#B5B5B5] font-medium text-sm">Account Number</p>
            <p className="text-white font-medium text-sm text-right">
              {formatAccountDisplay(receipt.senderAccountNo)}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-[#30114E] via-white to-[#30114E]" />
        </div>

        <div className="pt-4">
          <div className="flex justify-between gap-3">
            <p className="text-[#B5B5B5] font-medium text-sm">Receiver Name</p>
            <p className="text-white font-medium text-sm text-right">
              {receipt.receiverName || "—"}
            </p>
          </div>
          <div className="flex justify-between gap-3 mt-2">
            <p className="text-[#B5B5B5] font-medium text-sm">Account Number</p>
            <p className="text-white font-medium text-sm text-right">
              {formatAccountDisplay(receipt.receiverAccountNo)}
            </p>
          </div>
        </div>
      </div>

      <div data-receipt-actions className="flex mt-5 gap-4 justify-center">
        <Button
          type="button"
          className="border border-[#5FDA78]! bg-transparent! py-0! w-11 h-11 rounded-full! flex items-center justify-center disabled:opacity-50"
          onClick={onShare}
          disabled={isSharing || isDownloading}
          aria-label="Share receipt"
        >
          <Share2 className="text-white w-5 h-5" />
        </Button>
        <Button
          type="button"
          className="border border-[#5FDA78]! bg-transparent! py-0! w-11 h-11 rounded-full! flex items-center justify-center disabled:opacity-50"
          onClick={onDownload}
          disabled={isDownloading || isSharing}
          aria-label="Download receipt"
        >
          <Download className="text-white w-5 h-5" />
        </Button>
      </div>

      <div data-receipt-actions>
        <Button
          type="button"
          className="bg-[#5FDA78]! text-[#330065]! mt-5 py-3! rounded-full w-full"
          onClick={onDone}
        >
          Done
        </Button>
      </div>
    </>
  )
}

export default PaymentMakerDetail
