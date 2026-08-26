/**
 * Stripe UK domestic card pricing (per Stripe support):
 * - Standard: 1.5% + £0.20 per successful transaction
 * - Premium: 1.9% + £0.20 per successful transaction
 *
 * Visa, Mastercard, and Amex share the same tier rates — brand alone
 * does not change the fee; standard vs premium is set by the issuer.
 */
const UK_FIXED_FEE = 0.2
const UK_STANDARD_PERCENT = 0.015
const UK_PREMIUM_PERCENT = 0.019

export type UkCardTier = "standard" | "premium"

const roundMoney = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100

const getTierPercent = (tier: UkCardTier): number =>
  tier === "premium" ? UK_PREMIUM_PERCENT : UK_STANDARD_PERCENT

/**
 * Subtotal before Stripe fee:
 * gift + wishing card/video add-ons + platform service fee.
 */
export const getChargeableTotal = ({
  giftAmount,
  wishingCardAmount = 0,
  wishingVideoAmount = 0,
  platformServiceFeePercent = 0,
}: {
  giftAmount: number
  wishingCardAmount?: number
  wishingVideoAmount?: number
  platformServiceFeePercent?: number
}): number => {
  const gift = Number.isFinite(giftAmount) ? Math.max(0, giftAmount) : 0
  const card = Number.isFinite(wishingCardAmount) ? Math.max(0, wishingCardAmount) : 0
  const video = Number.isFinite(wishingVideoAmount) ? Math.max(0, wishingVideoAmount) : 0
  const feePercent = Number.isFinite(platformServiceFeePercent)
    ? Math.max(0, platformServiceFeePercent)
    : 0
  const platformFee = feePercent > 0 ? (gift * feePercent) / 100 : 0
  return roundMoney(gift + card + video + platformFee)
}

export interface StripeFeeInput {
  giftAmount: number
  wishingCardAmount?: number
  wishingVideoAmount?: number
  platformServiceFeePercent?: number
  tier?: UkCardTier
}

/**
 * Stripe UK processing fee on the subtotal charged to the card:
 * fee = (subtotal × percent) + £0.20
 */
export const calculateStripeFee = (
  subtotal: number,
  tier: UkCardTier = "standard",
): number => {
  if (!Number.isFinite(subtotal) || subtotal <= 0) return 0

  const percent = getTierPercent(tier)
  return roundMoney(subtotal * percent + UK_FIXED_FEE)
}

/** Customer pays subtotal + Stripe processing fee. */
export const getGrossChargeAmount = (
  subtotal: number,
  tier: UkCardTier = "standard",
): number => roundMoney(subtotal + calculateStripeFee(subtotal, tier))

/** Stripe fee for confirm modal and charge API — uses full payment subtotal. */
export const resolveStripeFeeAmount = ({
  giftAmount,
  wishingCardAmount,
  wishingVideoAmount,
  platformServiceFeePercent,
  tier = "standard",
}: StripeFeeInput): number =>
  calculateStripeFee(
    getChargeableTotal({
      giftAmount,
      wishingCardAmount,
      wishingVideoAmount,
      platformServiceFeePercent,
    }),
    tier,
  )
