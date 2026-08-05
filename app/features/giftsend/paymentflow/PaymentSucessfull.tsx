"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Check, Copy } from "lucide-react"
import html2canvas from "html2canvas-pro"
import { showError, showSuccess } from "@/app/lib/toast"
import type { ChargePaymentData } from "../types"
import {
  formatReceiptAmount,
  formatReceiptDateTime,
} from "../utils/paymentReceipt"
import PaymentMakerDetail from "./PaymentMakerDetail"

interface PaymentSucessfullProps {
  receipt: ChargePaymentData
  onDone: () => void
}

const PaymentSucessfull = ({
  receipt,
  onDone,
}: PaymentSucessfullProps) => {
  const receiptRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const txnId = receipt.transactionNumber?.trim() || ""
  const receiptFileName = `payment-receipt-${receipt.transactionNumber || "shagun"}.png`

  const handleCopyTxnId = async () => {
    if (!txnId) return

    try {
      await navigator.clipboard.writeText(txnId)
      showSuccess("Transaction ID copied")
    } catch {
      showError("Failed to copy transaction ID")
    }
  }

  const captureReceiptCanvas = async () => {
    if (!receiptRef.current) {
      throw new Error("Receipt not ready")
    }

    return html2canvas(receiptRef.current, {
      backgroundColor: "#330065",
      scale: 2,
      useCORS: true,
      allowTaint: true,
      ignoreElements: (el) =>
        el instanceof HTMLElement &&
        el.hasAttribute("data-receipt-actions"),
    })
  }

  const canvasToFile = async (canvas: HTMLCanvasElement) => {
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png")
    )
    if (!blob) throw new Error("Failed to create receipt image")
    return new File([blob], receiptFileName, { type: "image/png" })
  }

  const handleDownloadPng = async () => {
    if (!receiptRef.current || isDownloading || isSharing) return

    try {
      setIsDownloading(true)
      const canvas = await captureReceiptCanvas()
      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = receiptFileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error("Failed to download receipt:", err)
      showError("Failed to download receipt. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  const handleShareReceipt = async () => {
    if (!receiptRef.current || isSharing || isDownloading) return

    try {
      setIsSharing(true)
      const canvas = await captureReceiptCanvas()
      const file = await canvasToFile(canvas)
      const shareData: ShareData = {
        files: [file],
        title: "Shagun Direct - Payment Receipt",
        text: "Payment receipt from Shagun Direct",
      }

      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function" &&
        (!navigator.canShare || navigator.canShare(shareData))
      ) {
        await navigator.share(shareData)
        return
      }

      // Fallback when Web Share with files is unavailable.
      const link = document.createElement("a")
      link.href = URL.createObjectURL(file)
      link.download = receiptFileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
      showSuccess("Receipt image downloaded. You can share it from your device.")
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return
      console.error("Failed to share receipt:", err)
      showError("Failed to share receipt. Please try again.")
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div ref={receiptRef} className="w-full flex flex-col bg-[#330065] p-1">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 shrink-0">
          <Image
            src="/images/shagun-logo.svg"
            alt="Shagun Direct"
            width={48}
            height={48}
          />
        </div>
        <div className="flex flex-col text-white">
          <p className="font-semibold text-lg sm:text-xl leading-tight">
            Shagun Direct
          </p>
          <p className="font-normal text-xs sm:text-sm text-white/80">
            Skip the Envelope, Send the Love.
          </p>
        </div>
      </div>

      <div className="flex justify-center pt-8 pb-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#5FDA78] flex items-center justify-center">
          <Check className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[3]" />
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center mb-6 sm:mb-8">
        <p className="text-white font-semibold text-2xl sm:text-[26px] text-center">
          Payment Successful!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[#B8C4B0] font-medium text-xs sm:text-sm px-2">
          <span>{formatReceiptDateTime(receipt.paymentDate)}</span>
          {txnId ? (
            <>
              <span aria-hidden>|</span>
              <span className="inline-flex items-center gap-1.5 max-w-full">
                <span className="truncate">{txnId}</span>
                <button
                  type="button"
                  data-receipt-actions
                  onClick={handleCopyTxnId}
                  className="shrink-0 text-[#5FDA78] hover:text-white transition-colors cursor-pointer"
                  aria-label="Copy transaction ID"
                  title="Copy transaction ID"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </span>
            </>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 border border-white/25 rounded-[20px] bg-white/5">
        <div className="relative px-2 pb-3">
          <p className="text-center text-white font-semibold text-2xl sm:text-3xl tracking-wide">
            {formatReceiptAmount(receipt.netToRecipient)}
            {receipt.defaultCurrencySymbol ? (
              <span className="ms-1 text-base sm:text-lg font-medium align-top">
                {receipt.defaultCurrencySymbol}
              </span>
            ) : null}
          </p>
          <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-[#30114E] via-white to-[#30114E]" />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-white text-base sm:text-lg">Platform fee</p>
          <p className="text-white text-base sm:text-lg">
            {formatReceiptAmount(receipt.platformFee)}
            {receipt.defaultCurrencySymbol ? (
              <span className="ms-1 text-base sm:text-lg font-medium align-top">
                {receipt.defaultCurrencySymbol}
              </span>
            ) : receipt.defaultCurrency}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-white text-base sm:text-lg">Stripe fee</p>
          <p className="text-white text-base sm:text-lg">
            {formatReceiptAmount(receipt.stripeFee)}
            {receipt.defaultCurrencySymbol ? (
              <span className="ms-1 text-base sm:text-lg font-medium align-top">
                {receipt.defaultCurrencySymbol}
              </span>
            ) : receipt.defaultCurrency}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-white text-base sm:text-lg">Attachment charges</p>
          <p className="text-white text-base sm:text-lg">
            {formatReceiptAmount(receipt.attachmentCharges)}
            {receipt.defaultCurrencySymbol ? (
              <span className="ms-1 text-base sm:text-lg font-medium align-top">
                {receipt.defaultCurrencySymbol}
              </span>
            ) : receipt.defaultCurrency}
          </p>
        </div>
      </div>

      <PaymentMakerDetail
        receipt={receipt}
        onDone={onDone}
        onDownload={handleDownloadPng}
        onShare={handleShareReceipt}
        isDownloading={isDownloading}
        isSharing={isSharing}
      />
    </div>
  )
}

export default PaymentSucessfull
