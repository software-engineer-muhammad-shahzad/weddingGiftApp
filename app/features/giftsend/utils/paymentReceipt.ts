import type { ChargePaymentData } from "../types"

const toNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return fallback
}

const toText = (value: unknown, fallback = ""): string => {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  return fallback
}

/** Normalize BE charge payload (camelCase or PascalCase) into a receipt model. */
export const normalizeChargePaymentData = (
  raw: unknown
): ChargePaymentData | null => {
  if (!raw || typeof raw !== "object") return null

  const data = raw as Record<string, unknown>

  const transactionNumber = toText(
    data.transactionNumber ??
      data.TransactionNumber ??
      data.paymentId ??
      data.PaymentId
  )
  if (!transactionNumber) return null

  return {
    transactionNumber,
    paymentDate: toText(data.paymentDate ?? data.PaymentDate),
    senderName: toText(data.senderName ?? data.SenderName, "—"),
    senderAccountNo: toText(data.senderAccountNo ?? data.SenderAccountNo) || null,
    receiverName: toText(data.receiverName ?? data.ReceiverName, "—"),
    receiverAccountNo:
      toText(data.receiverAccountNo ?? data.ReceiverAccountNo) || null,
    giftAmount: data.giftAmount ?? data.GiftAmount,
    platformFee: data.platformFee ?? data.PlatformFee,
    stripeFee: data.stripeFee ?? data.StripeFee,
    netToRecipient: data.netToRecipient ?? data.NetToRecipient,
    attachmentCharges: data.attachmentCharges ?? data.AttachmentCharges,
    defaultCurrencySymbol: toText(
      data.defaultCurrencySymbol ?? data.DefaultCurrencySymbol
    ),
    defaultCurrency: toText(data.defaultCurrency ?? data.DefaultCurrency),
  }
}

export const getReceiptFeeTotal = (receipt: ChargePaymentData): any =>
  receipt.platformFee;

export const formatReceiptAmount = (amount: any): string =>
  amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

export const formatReceiptDateTime = (value: string): string => {
  if (!value) return "—"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  const datePart = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  return `${datePart} | ${timePart}`
}

export const formatAccountDisplay = (value: string | number | null | undefined): string => {
  if (value == null) return "—"

  const raw = String(value).trim()
  if (!raw) return "—"

  const digits = raw.replace(/\D/g, "")
  if (digits.length >= 4) {
    return `•••• ${digits.slice(-4)}`
  }

  return raw
}
