"use client"

import { useEffect, useMemo, useState } from "react"
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type { StripeElementStyle } from "@stripe/stripe-js"
import Button from "@/app/components/elements/Button"
import { showError, showSuccess } from "@/app/lib/toast"
import { getData, saveData } from "@/app/utils/storage/storageHelper"
import { getSendGiftUser } from "./api/sendGiftApi"
import { attachPaymentMethod, createCard, makePayment } from "./api/paymentApi"
import ConfirmPaymentModal from "./ConfirmPaymentModal"
import {
  GUEST_EMAIL_KEY,
  GUEST_FULL_NAME_KEY,
  GUEST_PAYMENT_METHOD_KEY,
  GUEST_USER_ID_KEY,
  STRIPE_CUSTOMER_ID_KEY,
} from "./constants"
import type { GuestPaymentMethod } from "./types"
import {
  extractPaymentMethodsFromGuestData,
  formatCardExpiry,
  getCardHolderName,
  getCardLast4,
  getDefaultPaymentMethodId,
  hasPaymentMethodData,
  normalizePaymentMethods,
} from "./utils/paymentMethod"

const ADD_NEW_CARD_VALUE = "__add_new_card__"

interface StripeCardFormProps {
  onClose: () => void
  amount: string
  recipientUserId: number | null
  wishingCardPath?: string
  wishingVideoPath?: string
  wishingContent?: string
  wishingCardAmount?: number
  wishingVideoAmount?: number
  platformServiceFeeAmount?: number
  currency?: string
  greetingMediaType?: "Image" | "Video"
  savedPaymentMethods?: GuestPaymentMethod[]
}

interface PendingCharge {
  guestUserId: number
  stripeCustomerId: string
  paymentMethodId: string
}

const elementStyle: StripeElementStyle = {
  base: {
    fontSize: "16px",
    color: "#330065",
    fontFamily: "inherit",
    "::placeholder": { color: "#9a8fae" },
  },
  invalid: { color: "#dc2626" },
}

const readStoredPaymentMethods = (): GuestPaymentMethod[] => {
  const stored = getData<GuestPaymentMethod | GuestPaymentMethod[]>(GUEST_PAYMENT_METHOD_KEY, "local")
  return normalizePaymentMethods(stored)
}

const mergeCardLists = (...lists: GuestPaymentMethod[][]): GuestPaymentMethod[] => {
  const seen = new Set<string>()
  const merged: GuestPaymentMethod[] = []

  for (const list of lists) {
    for (const card of list) {
      if (!hasPaymentMethodData(card) || seen.has(card.paymentMethodId)) continue
      seen.add(card.paymentMethodId)
      merged.push(card)
    }
  }

  return merged
}

const StripeCardForm = ({
  onClose,
  amount,
  recipientUserId,
  wishingCardPath,
  wishingVideoPath,
  wishingContent,
  wishingCardAmount,
  wishingVideoAmount,
  platformServiceFeeAmount,
  currency = "",
  greetingMediaType,
  savedPaymentMethods = [],
}: StripeCardFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingCards, setIsLoadingCards] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isCharging, setIsCharging] = useState(false)
  const [pendingCharge, setPendingCharge] = useState<PendingCharge | null>(null)
  const [showNewCardFields, setShowNewCardFields] = useState(false)

  const initialCards = useMemo(
    () => mergeCardLists(normalizePaymentMethods(savedPaymentMethods), readStoredPaymentMethods()),
    [savedPaymentMethods],
  )

  const [cardList, setCardList] = useState<GuestPaymentMethod[]>(initialCards)
  const [selectedOption, setSelectedOption] = useState<string>(
    () => getDefaultPaymentMethodId(initialCards) ?? ADD_NEW_CARD_VALUE,
  )

  useEffect(() => {
    const next = mergeCardLists(normalizePaymentMethods(savedPaymentMethods), readStoredPaymentMethods())
    if (next.length > 0) {
      setCardList(next)
    }
  }, [savedPaymentMethods])

  useEffect(() => {
    let cancelled = false

    const hydrateCards = async () => {
      setIsLoadingCards(true)

      const fromPropsAndStorage = mergeCardLists(
        normalizePaymentMethods(savedPaymentMethods),
        readStoredPaymentMethods(),
      )

      let fromApi: GuestPaymentMethod[] = []
      const guestUserId = Number(getData<number | string>(GUEST_USER_ID_KEY, "local"))

      if (guestUserId && !Number.isNaN(guestUserId)) {
        try {
          const userRes = await getSendGiftUser(guestUserId, { skipAuth: true })
          fromApi = extractPaymentMethodsFromGuestData(userRes.data ?? userRes)
          if (fromApi.length === 0) {
            fromApi = extractPaymentMethodsFromGuestData(userRes)
          }
        } catch {
          // Fall back to props / local storage.
        }
      }

      if (cancelled) return

      const merged = mergeCardLists(fromApi, fromPropsAndStorage)
      setCardList(merged)

      if (merged.length > 0) {
        saveData(GUEST_PAYMENT_METHOD_KEY, merged, "local")
        setSelectedOption(getDefaultPaymentMethodId(merged) ?? ADD_NEW_CARD_VALUE)
        setShowNewCardFields(false)
      } else {
        setSelectedOption(ADD_NEW_CARD_VALUE)
        setShowNewCardFields(true)
      }

      setIsLoadingCards(false)
    }

    hydrateCards()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const parsedAmount = Number(amount)
  const hasSavedCards = cardList.length > 0
  const isAddingNewCard = !hasSavedCards || showNewCardFields || selectedOption === ADD_NEW_CARD_VALUE
  const selectedSavedCard = cardList.find((card) => card.paymentMethodId === selectedOption)

  const getGuestSession = () => {
    const guestUserId = Number(getData<number | string>(GUEST_USER_ID_KEY, "local"))
    const stripeCustomerId = getData<string>(STRIPE_CUSTOMER_ID_KEY, "local")
    const guestFullName = getData<string>(GUEST_FULL_NAME_KEY, "local")
    const guestEmail = getData<string>(GUEST_EMAIL_KEY, "local")
    return { guestUserId, stripeCustomerId, guestFullName, guestEmail }
  }

  const persistCardList = (methods: GuestPaymentMethod[]) => {
    saveData(GUEST_PAYMENT_METHOD_KEY, methods, "local")
    setCardList(methods)
  }

  const openConfirmWithPaymentMethod = (
    guestUserId: number,
    stripeCustomerId: string,
    paymentMethodId: string,
  ) => {
    setPendingCharge({ guestUserId, stripeCustomerId, paymentMethodId })
    setIsConfirmOpen(true)
  }

  const selectSavedCard = (paymentMethodId: string) => {
    setSelectedOption(paymentMethodId)
    setShowNewCardFields(false)
    setError(null)
  }

  const handleAddNewCardOption = () => {
    setSelectedOption(ADD_NEW_CARD_VALUE)
    setShowNewCardFields(true)
    setError(null)
  }

  const handleUseSavedCard = () => {
    setError(null)

    if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a wishing amount before continuing.")
      return
    }

    if (!selectedSavedCard || !hasPaymentMethodData(selectedSavedCard)) {
      setError("Please select a valid saved card.")
      return
    }

    const { guestUserId, stripeCustomerId } = getGuestSession()

    if (!guestUserId || Number.isNaN(guestUserId)) {
      setError("Guest session expired. Please refresh and enter your details again.")
      return
    }

    if (!stripeCustomerId) {
      setError("Payment profile is missing. Please refresh and enter your details again.")
      return
    }

    if (!recipientUserId) {
      setError("Recipient details are missing. Please refresh the invite page and try again.")
      return
    }

    openConfirmWithPaymentMethod(guestUserId, stripeCustomerId, selectedSavedCard.paymentMethodId)
  }

  const handleSubmitNewCard = async () => {
    if (!stripe || !elements) return

    setError(null)

    if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a wishing amount before adding a card.")
      return
    }

    setIsSubmitting(true)

    const cardNumberElement = elements.getElement(CardNumberElement)
    if (!cardNumberElement) {
      setIsSubmitting(false)
      setError("Card details are not available. Please try again.")
      return
    }

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    })

    if (stripeError || !paymentMethod) {
      setIsSubmitting(false)
      setError(stripeError?.message || "Card details are invalid")
      return
    }

    const { guestUserId, stripeCustomerId, guestFullName, guestEmail } = getGuestSession()

    if (!guestUserId || Number.isNaN(guestUserId)) {
      setIsSubmitting(false)
      setError("Guest session expired. Please refresh and enter your details again.")
      return
    }

    if (!stripeCustomerId) {
      setIsSubmitting(false)
      setError("Payment profile is missing. Please refresh and enter your details again.")
      return
    }

    if (!recipientUserId) {
      setIsSubmitting(false)
      setError("Recipient details are missing. Please refresh the invite page and try again.")
      return
    }

    try {
      const card = paymentMethod.card

      await createCard({
        userId: guestUserId,
        guestUserId,
        customerId: stripeCustomerId,
        stripeCustomerId,
        paymentMethodId: paymentMethod.id,
        cardLast4Digits: card?.last4 ?? "",
        expMonth: card?.exp_month ?? 0,
        expYear: card?.exp_year ?? 0,
        cvc: "***",
        name: guestFullName ?? "",
        email: guestEmail ?? "",
        cardBrand: card?.brand ?? "",
      })

      await attachPaymentMethod({
        userId: guestUserId,
        paymentMethodId: paymentMethod.id,
      })

      const savedCard: GuestPaymentMethod = {
        id: 0,
        paymentMethodId: paymentMethod.id,
        cardLast4: card?.last4 ?? "",
        expMonth: card?.exp_month ?? 0,
        expYear: card?.exp_year ?? 0,
        cardBrand: card?.brand ?? null,
        isPrimary: true,
        cardHolderName: guestFullName ?? "",
        email: guestEmail ?? "",
      }

      const nextList = [
        savedCard,
        ...cardList.map((item) => ({ ...item, isPrimary: false })),
      ]
      persistCardList(nextList)
      setSelectedOption(savedCard.paymentMethodId)
      setShowNewCardFields(false)

      openConfirmWithPaymentMethod(guestUserId, stripeCustomerId, paymentMethod.id)
    } catch (err: any) {
      const apiMessage =
        err?.response?.data?.message ||
        err?.response?.data?.statusMessage ||
        err?.response?.data?.error ||
        err?.message ||
        "Payment failed. Please try again."

      setError(apiMessage)
      showError(apiMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirmPayment = async () => {
    if (!pendingCharge || !recipientUserId) return

    setIsCharging(true)
    setError(null)

    try {
      await makePayment({
        recipientUserId,
        guestUserId: pendingCharge.guestUserId,
        amount: parsedAmount,
        paymentMethodId: pendingCharge.paymentMethodId,
        customerId: pendingCharge.stripeCustomerId,
        stripeCustomerId: pendingCharge.stripeCustomerId,
        wishingCardPath,
        wishingVideoPath,
        wishingContent,
        wishingCardAmount,
        wishingVideoAmount,
        greetingMediaType,
      })

      showSuccess("Payment successful")
      setIsConfirmOpen(false)
      onClose()
    } catch (err: any) {
      const apiMessage =
        err?.response?.data?.message ||
        err?.response?.data?.statusMessage ||
        err?.response?.data?.error ||
        err?.message ||
        "Payment failed. Please try again."

      setError(apiMessage)
      showError(apiMessage)
    } finally {
      setIsCharging(false)
    }
  }

  const handleCancelPayment = () => {
    setIsConfirmOpen(false)
    setPendingCharge(null)
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-[#330065] font-semibold text-base sm:text-lg">
        {hasSavedCards ? "Payment method" : "Enter Card Details"}
      </p>

      {isLoadingCards && (
        <p className="text-[#330065]/80 text-sm">Loading saved cards...</p>
      )}

      {hasSavedCards && (
        <div className="flex flex-col gap-3 w-full min-w-0">
          <div className="w-full max-h-[220px] overflow-auto rounded-xl border border-[#330065] bg-white">
            <table className="w-max min-w-full text-left text-sm text-[#330065]">
              <thead className="bg-[#330065]/10 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2.5 font-medium w-8 whitespace-nowrap" aria-label="Select" />
                  <th className="px-3 py-2.5 font-medium whitespace-nowrap">Brand</th>
                  <th className="px-3 py-2.5 font-medium whitespace-nowrap">Last 4</th>
                  <th className="px-3 py-2.5 font-medium whitespace-nowrap">Expiry</th>
                  <th className="px-3 py-2.5 font-medium whitespace-nowrap">Holder Name</th>
                </tr>
              </thead>
              <tbody>
                {cardList.map((card) => {
                  const isSelected =
                    !showNewCardFields && selectedOption === card.paymentMethodId
                  const last4 = getCardLast4(card)
                  const holderName =
                    getCardHolderName(card) ||
                    getData<string>(GUEST_FULL_NAME_KEY, "local")?.trim() ||
                    "—"
                  return (
                    <tr
                      key={card.paymentMethodId}
                      className={`border-t border-[#330065]/15 cursor-pointer ${
                        isSelected ? "bg-[#5FDA78]/35" : "hover:bg-[#330065]/5"
                      }`}
                      onClick={() => selectSavedCard(card.paymentMethodId)}
                    >
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <input
                          type="radio"
                          name="payment-method"
                          className="accent-[#330065]"
                          checked={isSelected}
                          onChange={() => selectSavedCard(card.paymentMethodId)}
                        />
                      </td>
                      <td className="px-3 py-2.5 capitalize whitespace-nowrap">
                        {(card.cardBrand || "Card").trim()}
                        {card.isPrimary ? " *" : ""}
                      </td>
                      <td className="px-3 py-2.5 font-medium whitespace-nowrap">
                        {last4 ? `•••• ${last4}` : "—"}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        {formatCardExpiry(card.expMonth, card.expYear)}
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap">{holderName}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={handleAddNewCardOption}
            className={`text-left text-sm font-semibold underline-offset-2 ${
              showNewCardFields ? "text-[#330065] underline" : "text-[#330065]/80 hover:underline"
            }`}
          >
            {showNewCardFields ? "Adding new card below" : "+ Add new card"}
          </button>
        </div>
      )}

      {isAddingNewCard && (
        <>
          {hasSavedCards && (
            <p className="text-[#330065] text-sm font-medium">New card details</p>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-[#330065] text-xs font-medium">Card Number</label>
            <div className="bg-white rounded-xl border border-[#330065] px-3 py-3 sm:px-4">
              <CardNumberElement options={{ style: elementStyle }} />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-[#330065] text-xs font-medium">Expiry Date</label>
              <div className="bg-white rounded-xl border border-[#330065] px-3 py-3 sm:px-4">
                <CardExpiryElement options={{ style: elementStyle }} />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <label className="text-[#330065] text-xs font-medium">CVC</label>
              <div className="bg-white rounded-xl border border-[#330065] px-3 py-3 sm:px-4">
                <CardCvcElement options={{ style: elementStyle }} />
              </div>
            </div>
          </div>
        </>
      )}

      {error && <p className="text-red-600 text-xs sm:text-sm">{error}</p>}

      <Button
        className="w-full bg-[#330065]! text-[#5FDA78]! rounded-[47px] py-3! mt-2"
        onClick={isAddingNewCard ? handleSubmitNewCard : handleUseSavedCard}
        disabled={
          isSubmitting ||
          isLoadingCards ||
          (isAddingNewCard && (!stripe || !elements))
        }
      >
        {isSubmitting
          ? "Processing..."
          : isAddingNewCard
            ? "Save Card"
            : "Continue with selected card"}
      </Button>

      <ConfirmPaymentModal
        isModalOpen={isConfirmOpen}
        onCancel={handleCancelPayment}
        onConfirm={handleConfirmPayment}
        isSubmitting={isCharging}
        currency={currency}
        giftAmount={parsedAmount}
        wishingCardAmount={wishingCardAmount}
        wishingVideoAmount={wishingVideoAmount}
        platformServiceFeeAmount={platformServiceFeeAmount}
      />
    </div>
  )
}

export default StripeCardForm
