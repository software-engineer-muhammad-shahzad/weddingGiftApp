"use client"
import ProfileDescription from "@/app/features/giftsend/ProfileDescription"
import SelectCardModal from "@/app/features/giftsend/SelectCardModal"
import StripeCardModal from "@/app/features/giftsend/StripeCardModal"
import WishAmount from "@/app/features/giftsend/WishAmount"
import WishCard from "@/app/features/giftsend/WishCard"
import WishForm from "@/app/features/giftsend/WishForm"
import WishMessage from "@/app/features/giftsend/WishMessage"
import WishVideo from "@/app/features/giftsend/WishVideo"
import { useGuestInviteDetails } from "@/app/features/giftsend/hooks/useGuestInviteDetails"
import Announcement from "@/app/features/dashboard/home/Announcement"
import { buildContentImageUrl } from "@/app/utils/imageUrl"
import { useParams } from "next/navigation"
import { useState } from 'react'

// Define modal types
type ModalType = 'selectCard' | 'stripeCard' | null

const page = () => {
    const { slug } = useParams<{ slug: string }>()
    const { data: coupleDetails, isLoading: isCoupleDetailsLoading } = useGuestInviteDetails(slug)

    const [greetingText, setGreetingText] = useState("Congratulations! Wishing you a lifetime of happiness together.")
    const [activeModal, setActiveModal] = useState<ModalType>(null)
    const [video, setVideo] = useState(null);
    const [amount, setAmount] = useState("");
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null)

    const greetingCards = coupleDetails?.cardTemplate.greetingCards ?? []
    const currency = coupleDetails?.currency ?? ""
    const selectedCard = greetingCards.find((card) => card.id === selectedCardId)

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
            <div className="min-h-screen w-full max-w-382.5 flex justify-center mx-auto">
                <div className="w-full flex flex-col gap-8 h-full bg-[#330065] max-w-200 py-10 border px-6 sm:px-8 md:px-10">

                    <ProfileDescription data={coupleDetails} isLoading={isCoupleDetailsLoading} />

                    {coupleDetails?.announcement?.content && (
                        <Announcement latestAnnouncement={coupleDetails.announcement.content} />
                    )}

                    <WishMessage greetingText={greetingText} setGreetingText={setGreetingText} />

                    <WishCard
                        openModal={() => openModal('selectCard')}
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
                    />
                    <WishAmount amount={amount} setAmount={setAmount} currency={currency} />
                    <WishForm openStripeModal={() => openModal('stripeCard')} />

                    {/* Render modals based on type */}
                    {activeModal === 'selectCard' && (
                        <SelectCardModal
                            isModalOpen={activeModal === 'selectCard'}
                            setIsModalOpen={closeModal}
                            openStripeModal={() => openModal('stripeCard')}
                            imageUrl={selectedCard ? buildContentImageUrl(selectedCard.cardImagePath) : undefined}
                        />
                    )}

                    {activeModal === 'stripeCard' && (
                        <StripeCardModal
                            isModalOpen={activeModal === 'stripeCard'}
                            setIsModalOpen={closeModal}
                            amount={amount}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default page