import type { GuestPaymentMethod } from "../types"

const asRecord = (value: unknown): Record<string, unknown> | null => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

const unwrapDotNetValues = (value: unknown): unknown => {
  const record = asRecord(value)
  if (record && Array.isArray(record.$values)) return record.$values
  return value
}

const pickString = (record: Record<string, unknown>, keys: string[]): string => {
  for (const key of keys) {
    const value = record[key]
    if (value === null || value === undefined) continue
    const text = String(value).trim()
    if (text && text !== "null" && text !== "undefined") return text
  }
  return ""
}

const pickNumber = (record: Record<string, unknown>, keys: string[]): number | null => {
  for (const key of keys) {
    const value = record[key]
    if (value === null || value === undefined || value === "") continue
    const num = Number(value)
    if (!Number.isNaN(num)) return num
  }
  return null
}

const pickBoolean = (record: Record<string, unknown>, keys: string[]): boolean => {
  for (const key of keys) {
    const value = record[key]
    if (typeof value === "boolean") return value
    if (typeof value === "string") {
      const normalized = value.trim().toLowerCase()
      if (normalized === "true") return true
      if (normalized === "false") return false
    }
  }
  return false
}

const digitsLast4 = (value: string): string => {
  const digits = value.replace(/\D/g, "")
  if (digits.length >= 4) return digits.slice(-4)
  return value.trim().slice(-4)
}

/** True when a payment method has a usable Stripe payment method id. */
export const hasPaymentMethodData = (
  paymentMethod?: GuestPaymentMethod | null,
): paymentMethod is GuestPaymentMethod =>
  Boolean(
    paymentMethod &&
      typeof paymentMethod.paymentMethodId === "string" &&
      paymentMethod.paymentMethodId.trim().length > 0,
  )

/** Normalize camelCase / PascalCase PaymentMethod payloads from the API. */
export const normalizePaymentMethod = (raw: unknown): GuestPaymentMethod | null => {
  const record = asRecord(unwrapDotNetValues(raw))
  if (!record) return null

  // Empty EF navigation property: {}
  if (Object.keys(record).length === 0) return null

  const nestedCard = asRecord(record.card) ?? asRecord(record.Card)

  const paymentMethodId =
    pickString(record, [
      "paymentMethodId",
      "PaymentMethodId",
      "stripePaymentMethodId",
      "StripePaymentMethodId",
      "stripePmId",
      "StripePmId",
      "pmId",
      "PmId",
    ]) ||
    (() => {
      const maybeId = pickString(record, ["id", "Id"])
      return maybeId.startsWith("pm_") ? maybeId : ""
    })()

  if (!paymentMethodId) return null

  const rawLast4 =
    pickString(record, [
      "cardLast4",
      "CardLast4",
      "cardLast4Digits",
      "CardLast4Digits",
      "last4Digits",
      "Last4Digits",
      "last4",
      "Last4",
      "lastFour",
      "LastFour",
      "cardNumberLast4",
      "CardNumberLast4",
      "cardNumber",
      "CardNumber",
    ]) ||
    (nestedCard
      ? pickString(nestedCard, [
          "last4",
          "Last4",
          "last4Digits",
          "Last4Digits",
          "cardNumber",
          "CardNumber",
        ])
      : "")

  const cardLast4 = rawLast4 ? digitsLast4(rawLast4).replace(/\D/g, "").slice(-4) : ""

  const expMonth =
    pickNumber(record, ["expMonth", "ExpMonth", "expiryMonth", "ExpiryMonth"]) ??
    (nestedCard ? pickNumber(nestedCard, ["exp_month", "expMonth", "ExpMonth"]) : null) ??
    1

  const expYear =
    pickNumber(record, ["expYear", "ExpYear", "expiryYear", "ExpiryYear"]) ??
    (nestedCard ? pickNumber(nestedCard, ["exp_year", "expYear", "ExpYear"]) : null) ??
    new Date().getFullYear() + 1

  const numericId = pickNumber(record, ["id", "Id"])
  const id = numericId !== null && !String(record.id ?? "").startsWith("pm_") ? numericId : 0

  return {
    id,
    paymentMethodId,
    cardLast4,
    expMonth,
    expYear,
    cardBrand:
      pickString(record, ["cardBrand", "CardBrand", "brand", "Brand"]) ||
      (nestedCard ? pickString(nestedCard, ["brand", "Brand"]) : "") ||
      null,
    isPrimary: pickBoolean(record, ["isPrimary", "IsPrimary", "primary", "Primary"]),
    cardHolderName:
      pickString(record, [
        "cardHolderName",
        "CardHolderName",
        "name",
        "Name",
        "holderName",
        "HolderName",
      ]) || null,
    email: pickString(record, ["email", "Email"]) || null,
  }
}

/** Accept a single PaymentMethod object or an array from the API. */
export const normalizePaymentMethods = (raw: unknown): GuestPaymentMethod[] => {
  if (!raw) return []

  const unwrapped = unwrapDotNetValues(raw)

  if (Array.isArray(unwrapped)) {
    return unwrapped
      .map((item) => normalizePaymentMethod(item))
      .filter((item): item is GuestPaymentMethod => hasPaymentMethodData(item))
  }

  const single = normalizePaymentMethod(unwrapped)
  return hasPaymentMethodData(single) ? [single] : []
}

const dedupePaymentMethods = (methods: GuestPaymentMethod[]): GuestPaymentMethod[] => {
  const seen = new Set<string>()
  const result: GuestPaymentMethod[] = []

  for (const method of methods) {
    if (seen.has(method.paymentMethodId)) continue
    seen.add(method.paymentMethodId)
    result.push(method)
  }

  return result
}

/**
 * Pull payment methods from a guest-create / user payload, supporting common
 * property names, .NET `$values` wrappers, and nested response shapes.
 */
export const extractPaymentMethodsFromGuestData = (guestData: unknown): GuestPaymentMethod[] => {
  const record = asRecord(guestData)
  if (!record) return normalizePaymentMethods(guestData)

  const candidates = [
    record.paymentMethods,
    record.PaymentMethods,
    record.paymentMethod,
    record.PaymentMethod,
    record.userPaymentMethods,
    record.UserPaymentMethods,
    record.cards,
    record.Cards,
    record.savedCards,
    record.SavedCards,
    record.data,
    record.Data,
    record.result,
    record.Result,
  ]

  for (const candidate of candidates) {
    const methods = normalizePaymentMethods(candidate)
    if (methods.length > 0) return methods
  }

  const direct = normalizePaymentMethod(record)
  if (direct) return [direct]

  const found: GuestPaymentMethod[] = []
  const visit = (node: unknown, depth: number) => {
    if (depth > 8 || node == null) return

    const unwrapped = unwrapDotNetValues(node)
    if (Array.isArray(unwrapped)) {
      unwrapped.forEach((item) => visit(item, depth + 1))
      return
    }

    const nested = asRecord(unwrapped)
    if (!nested) return

    const normalized = normalizePaymentMethod(nested)
    if (normalized) {
      found.push(normalized)
      return
    }

    for (const value of Object.values(nested)) {
      if (value && typeof value === "object") visit(value, depth + 1)
    }
  }

  visit(guestData, 0)
  return dedupePaymentMethods(found)
}

/** Prefer the primary card, otherwise the first saved card. */
export const getDefaultPaymentMethodId = (
  methods: GuestPaymentMethod[],
): string | null => {
  if (!methods.length) return null
  const primary = methods.find((method) => method.isPrimary)
  return (primary ?? methods[0]).paymentMethodId
}

export const formatCardExpiry = (month: number, year: number) => {
  const mm = String(month).padStart(2, "0")
  const yy = String(year).slice(-2)
  return `${mm}/${yy}`
}

/** Resolve last-4 from current or legacy field names. */
export const getCardLast4 = (card: {
  cardLast4?: string | number | null
  cardLast4Digits?: string | number | null
}): string => {
  const raw = card.cardLast4 ?? card.cardLast4Digits ?? ""
  const digits = String(raw).replace(/\D/g, "")
  return digits.length >= 4 ? digits.slice(-4) : digits
}

/** Resolve holder name from current or legacy field names. */
export const getCardHolderName = (card: {
  cardHolderName?: string | null
  name?: string | null
}): string => {
  return (card.cardHolderName || card.name || "").trim()
}
