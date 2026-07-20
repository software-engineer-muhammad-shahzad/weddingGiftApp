"use client"
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
import Announcement from "@/app/features/dashboard/home/Announcement"
import { getData } from "@/app/utils/storage/storageHelper"
import type { LoginData } from "@/app/features/auth/types/login"
import { useParams } from "next/navigation"
import { useState } from 'react'

// Define modal types
type ModalType = 'stripeCard' | null

const page = () => {
    const { slug } = useParams<{ slug: string }>()
    const { data: coupleDetails, isLoading: isCoupleDetailsLoading } = useGuestInviteDetails(slug)
    const { isReady: isGuestReady, isLoading: isGuestLoading, submitGuestDetails } = useGuestCheckout()

    const [greetingText, setGreetingText] = useState("Congratulations! Wishing you a lifetime of happiness together.")
    const [activeModal, setActiveModal] = useState<ModalType>(null)
    const [video, setVideo] = useState(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null)
    const [amount, setAmount] = useState("");
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null)

    const greetingCards = coupleDetails?.cardTemplate.greetingCards ?? []
    const currency = coupleDetails?.currency ?? ""
    const selectedCard = greetingCards.find((card) => card.id === selectedCardId)

    // The couple's own userId, from local storage — needed as `coupleId` for
    // the wishing-video upload and as `recipientUserId` for the payment charge.
    const coupleId = getData<LoginData>("authData", "local")?.userId ?? null

    const handleChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
        }
    };

    const openModal = (type: ModalType) => {
        setActiveModal(type)
    }

    const closeModal = () => {
        setActiveModal(null)
    }

    return (
        <>
            {/* shagun logo */}
            <div className="min-h-screen w-full bg-[#330065] max-w-382.5 flex justify-center mx-auto">
                <div className="w-full flex flex-col gap-8 h-full  max-w-200 py-10 px-6 sm:px-8 md:px-10">

                    {!isGuestReady ? (
                        <GuestCheckoutForm isLoading={isGuestLoading} onSubmit={submitGuestDetails} />
                    ) : (
                        <>
                            <ProfileDescription data={coupleDetails} isLoading={isCoupleDetailsLoading} />

                            {/* {coupleDetails?.announcement?.content && (
                                <Announcement latestAnnouncement={coupleDetails.announcement.content} />
                            )} */}

                            <WishMessage greetingText={greetingText} setGreetingText={setGreetingText} />

                            <WishCard
                                greetingCards={greetingCards}
                                selectedCardId={selectedCardId}
                                onSelectCard={setSelectedCardId}
                                addonAmount={coupleDetails?.wishingCardAddonAmount ?? 0}
                                currency={currency}
                            />
                            <WishVideo
                                video={video}
                                setVideo={setVideo}
                                addonAmount={coupleDetails?.wishingVideoAddonAmount ?? 0}
                                currency={currency}
                                coupleId={coupleId}
                                onVideoUrlChange={setVideoUrl}
                                disabled={selectedCardId !== null}
                            />
                            <WishAmount
                                amount={amount}
                                setAmount={setAmount}
                                currency={currency}
                                wishingCardAmount={ selectedCardId !== null ? (coupleDetails?.wishingCardAddonAmount ?? 0) : 0}
                                wishingVideoAmount={videoUrl ? coupleDetails?.cardTemplate.videoPrice : undefined}
                            />
                            <WishForm openStripeModal={() => openModal('stripeCard')} />
                        </>
                    )}

                    {/* Render modals based on type */}
                    {activeModal === 'stripeCard' && (
                        <StripeCardModal
                            isModalOpen={activeModal === 'stripeCard'}
                            setIsModalOpen={closeModal}
                            amount={amount}
                            recipientUserId={coupleId}
                            wishingCardPath={selectedCard?.cardImagePath}
                            wishingVideoPath={videoUrl ?? undefined}
                            wishingContent={greetingText}
                            wishingCardAmount={selectedCard ? selectedCard.cardPrice : undefined}
                            wishingVideoAmount={videoUrl ? coupleDetails?.cardTemplate.videoPrice : undefined}
                            platformServiceFeeAmount={coupleDetails?.platformServiceFeeAmount}
                            currency={currency}
                            greetingMediaType={videoUrl ? "Video" : selectedCard ? "Image" : undefined}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default page