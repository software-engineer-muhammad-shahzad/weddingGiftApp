"use client"
import Image from "next/image"
import Link from "next/link"
import GuestCheckoutForm from "@/app/features/giftsend/GuestCheckoutForm"
import ProfileDescription from "@/app/features/giftsend/ProfileDescription"
import StripeCardModal from "@/app/features/giftsend/StripeCardModal"
import WishAmount from "@/app/features/giftsend/WishAmount"
import WishCard from "@/app/features/giftsend/WishCard"
import WishForm from "@/app/features/giftsend/WishForm"
import WishMessage from "@/app/features/giftsend/WishMessage"
import WishVideo from "@/app/features/giftsend/WishVideo"
import { useGuestCheckout } from "@/app/features/giftsend/hooks/useGuestCheckout"
import { useGuestInviteDetails } from "@/app/features/giftsend/hooks/useGuestInviteDetails"
import { showError } from "@/app/lib/toast"
import { useParams } from "next/navigation"
import { useState } from "react"

type ModalType = "stripeCard" | null

const page = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data: coupleDetails, isLoading: isCoupleDetailsLoading } = useGuestInviteDetails(slug)
  const {
    isReady: isGuestReady,
    isLoading: isGuestLoading,
    error: guestCheckoutError,
    savedPaymentMethods,
    refreshSavedPaymentMethods,
    submitGuestDetails,
  } = useGuestCheckout()

  const [greetingText, setGreetingText] = useState(
    "Congratulations! Wishing you a lifetime of happiness together.",
  )
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [video, setVideo] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [amount, setAmount] = useState("")
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null)

  const greetingCards = coupleDetails?.cardTemplate.greetingCards ?? []
  const currency =
    coupleDetails?.defaultCurrencySymbol?.trim() ||
    coupleDetails?.currency ||
    ""
  const selectedCard = greetingCards.find((card) => card.id === selectedCardId)
  const recipientUserId = coupleDetails?.coupleUserId ?? null
  const cardTemplate = coupleDetails?.cardTemplate
  const platformServiceFeePercent =
    coupleDetails?.platformServiceFeeAmount ?? cardTemplate?.platformFeePercent ?? 0
  const wishingCardAddon =
    coupleDetails?.wishingCardAddonAmount ?? cardTemplate?.cardPrice ?? 0
  const wishingVideoAddon =
    coupleDetails?.wishingVideoAddonAmount ?? cardTemplate?.videoPrice ?? 0
  const wishingCardAmount =
    selectedCardId !== null ? wishingCardAddon : undefined
  const wishingVideoAmount = videoUrl ? wishingVideoAddon : undefined
  const hasPendingVideoUpload = Boolean(video) && !videoUrl

  const openModal = (type: ModalType) => {
    setActiveModal(type)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const handleContinueToPayment = () => {
    if (!recipientUserId) {
      showError("Invite details are still loading. Please wait a moment and try again.")
      return
    }

    if (hasPendingVideoUpload) {
      showError("Please upload your wishing video before continuing to payment.")
      return
    }

    refreshSavedPaymentMethods()
    openModal("stripeCard")
  }

  return (
    <>
      <div className="min-h-screen w-full bg-[#330065] max-w-382.5 flex justify-center mx-auto">
        <div className="w-full flex flex-col gap-8 h-full max-w-200 py-10 px-6 sm:px-8 md:px-10">
          {!isGuestReady ? (
            <div className="flex flex-col gap-3">
              <GuestCheckoutForm isLoading={isGuestLoading} onSubmit={submitGuestDetails} />
              {guestCheckoutError && (
                <p className="text-red-400 text-sm text-center px-2">{guestCheckoutError}</p>
              )}
            </div>
          ) : (
            <>
              <ProfileDescription data={coupleDetails} isLoading={isCoupleDetailsLoading} />

              <WishMessage greetingText={greetingText} setGreetingText={setGreetingText} />

              <div className="flex flex-col gap-4 p-4 sm:p-5 border border-[#5FDA78] rounded-[20px] glass-card">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/shagun-logo.svg"
                    alt="Shagun Direct"
                    width={28}
                    height={28}
                    className="shrink-0"
                  />
                  <p className="text-white text-base sm:text-lg font-medium text-center flex-1 pe-7">
                    Choose a Card or Add a Video
                  </p>
                </div>

                <WishCard
                  greetingCards={greetingCards}
                  selectedCardId={selectedCardId}
                  onSelectCard={setSelectedCardId}
                  addonAmount={wishingCardAddon}
                  currency={currency}
                />
                <WishVideo
                  video={video}
                  setVideo={setVideo}
                  addonAmount={wishingVideoAddon}
                  currency={currency}
                  coupleId={recipientUserId}
                  videoUrl={videoUrl}
                  onVideoUrlChange={setVideoUrl}
                  disabled={selectedCardId !== null}
                />
              </div>
              <WishAmount
                amount={amount}
                setAmount={setAmount}
                currency={currency}
                wishingCardAmount={wishingCardAmount ?? 0}
                wishingVideoAmount={wishingVideoAmount}
              />
              <p className="px-2 text-[11px] text-white md:text-sm">
                By continuing, you agree to the Shagun Direct Payments{" "}
                <Link href="/terms-of-service" className="border-b" target="_blank" rel="noopener noreferrer">
                  Terms of Service.
                </Link>{" "}
                The{" "}
                <Link href="/privacy-notice" className="border-b" target="_blank" rel="noopener noreferrer">
                  Privacy Notice
                </Link>{" "}
                describes how your data is handled.
              </p>
              <WishForm
                hasSavedCards={savedPaymentMethods.length > 0}
                disabled={hasPendingVideoUpload}
                openStripeModal={handleContinueToPayment}
              />
            </>
          )}

          {activeModal === "stripeCard" && recipientUserId && (
            <StripeCardModal
              isModalOpen={activeModal === "stripeCard"}
              setIsModalOpen={(open) => {
                if (!open) {
                  refreshSavedPaymentMethods()
                  closeModal()
                }
              }}
              amount={amount}
              recipientUserId={recipientUserId}
              wishingCardPath={selectedCard?.imageUrl}
              wishingVideoPath={videoUrl ?? undefined}
              wishingContent={greetingText}
              wishingCardAmount={wishingCardAmount}
              wishingVideoAmount={wishingVideoAmount}
              platformServiceFeeAmount={platformServiceFeePercent}
              currency={currency}
              greetingMediaType={videoUrl ? "Video" : selectedCard ? "Image" : undefined}
              savedPaymentMethods={savedPaymentMethods}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default page
