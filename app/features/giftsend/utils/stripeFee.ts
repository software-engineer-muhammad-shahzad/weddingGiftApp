/**
 * Stripe UK domestic card pricing (per Stripe support):
 * - Standard: 1.5% + £0.20
 * - Premium (rewards/corporate): 1.9% + £0.20
 *
 * Visa, Mastercard, and Amex use the same tiers — brand alone does not
 * change the rate. We default to standard when tier is unknown on the client.
 */
const UK_FIXED_FEE = 0.2
const UK_STANDARD_PERCENT = 0.015
const UK_PREMIUM_PERCENT = 0.019

export type UkCardTier = "standard" | "premium"

const roundMoney = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100

/**
 * Chargeable total used for Stripe fee estimate:
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

/**
 * Estimate Stripe processing fee for UK domestic cards so the desired
 * amount is covered after Stripe takes its cut:
 * Final Charge = (Desired Amount + Fixed Fee) / (1 - Percentage Fee)
 * Stripe Fee   = Final Charge - Desired Amount
 * Defaults to the standard tier when tier cannot be determined client-side.
 */
export const calculateStripeFee = (
  amount: number,
  tier: UkCardTier = "standard",
): number => {
  if (!Number.isFinite(amount) || amount <= 0) return 0

  const percent = tier === "premium" ? UK_PREMIUM_PERCENT : UK_STANDARD_PERCENT
  const finalCharge = (amount + UK_FIXED_FEE) / (1 - percent)
  return roundMoney(finalCharge - amount)
}
