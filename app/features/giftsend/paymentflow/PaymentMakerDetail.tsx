"use client"

import { useEffect, useState } from "react"
import { Download, Share2 } from "lucide-react"
import Button from "../../../components/elements/Button"
import type { ChargePaymentData } from "../types"
import {
  formatAccountDisplay,
  formatReceiptAmount,
  formatReceiptDateTime,
  getReceiptFeeTotal,
} from "../utils/paymentReceipt"

interface PaymentMakerDetailProps {
  receipt: ChargePaymentData
  onDone: () => void
  onDownload: () => void
  isDownloading?: boolean
}

const PaymentMakerDetail = ({
  receipt,
  onDone,
  onDownload,
  isDownloading = false,
}: PaymentMakerDetailProps) => {
  const [showShareModal, setShowShareModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const userAgent =
        navigator.userAgent || navigator.vendor || (window as any).opera
      const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent
        )
      setIsMobile(isMobileDevice)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const feeTotal = getReceiptFeeTotal(receipt)
  const amountLabel = `${formatReceiptAmount(receipt.netToRecipient)}${
    receipt.defaultCurrencySymbol ? ` ${receipt.defaultCurrencySymbol}` : ""
  }`
  const receiptSummary = [
    `Sender: ${receipt.senderName}`,
    `Receiver: ${receipt.receiverName}`,
    `Amount: ${amountLabel}`,
    `Fee: ${formatReceiptAmount(feeTotal)}`,
    `Date: ${formatReceiptDateTime(receipt.paymentDate)}`,
    `${receipt.transactionNumber}`,
  ].join("\n")

  const handleShare = async () => {
    const shareData = {
      title: "Shagun Direct - Payment Receipt",
      text: receiptSummary,
      url: window.location.href,
    }

    if (isMobile && navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        setShowShareModal(true)
      }
      return
    }

    setShowShareModal(true)
  }

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

      <div
        data-receipt-actions
        className="flex mt-5 gap-4 justify-center"
      >
        <Button
          type="button"
          className="border border-[#5FDA78]! bg-transparent! py-0! w-11 h-11 rounded-full! flex items-center justify-center"
          onClick={handleShare}
        >
          <Share2 className="text-white w-5 h-5" />
        </Button>
        <Button
          type="button"
          className="border border-[#5FDA78]! bg-transparent! py-0! w-11 h-11 rounded-full! flex items-center justify-center disabled:opacity-50"
          onClick={onDownload}
          disabled={isDownloading}
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

      {showShareModal && (
        <div
          data-receipt-actions
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-[#5FDA78] rounded-xl p-5 w-[300px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[#330065] font-semibold mb-4 text-center">
              Share Invoice
            </h2>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(receiptSummary)}`,
                    "_blank"
                  )
                }}
                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white"
              >
                W
              </button>

              <button
                type="button"
                onClick={() => {
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                    "_blank"
                  )
                }}
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white"
              >
                f
              </button>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(receiptSummary)
                  setShowShareModal(false)
                }}
                className="mt-4 w-fit text-[#330065] border-b border-transparent hover:border-b-[#330065] cursor-pointer text-sm text-center"
              >
                Copy Receipt
              </button>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="mt-2 w-fit text-gray-500 cursor-pointer border-b border-transparent hover:border-b-[#726a82] text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PaymentMakerDetail
