"use client"

import Image from "next/image"
import { useState } from "react"
import { Check } from "lucide-react"
import { buildContentImageUrl } from "@/app/utils/imageUrl"
import { GreetingCardDTO } from "./types"
import SelectCardModal from "./SelectCardModal"

interface openSelectImageProps {
    greetingCards: GreetingCardDTO[]
    selectedCardId: number | null
    onSelectCard: (id: number | null) => void
    addonAmount: number
    currency: string
}

const CardThumbnail = ({ path }: { path: string }) => {
    const [hasError, setHasError] = useState(false)

    return (
        <Image
            src={buildContentImageUrl(path)}
            alt="wishing-card"
            width={100}
            height={100}
            unoptimized={!hasError}
            onError={() => setHasError(true)}
            className="w-full h-auto object-cover"
        />
    )
}

const WishCard = ({ greetingCards, selectedCardId, onSelectCard, addonAmount, currency }: openSelectImageProps) => {
    const [previewCard, setPreviewCard] = useState<GreetingCardDTO | null>(null)

    const handleThumbnailClick = (card: GreetingCardDTO) => {
        setPreviewCard(card)
    }

    const handleCloseModal = () => {
        setPreviewCard(null)
    }

    const handleSelectCard = () => {
        if (!previewCard) return
        onSelectCard(previewCard.id)
        setPreviewCard(null)
    }

    const handleRemoveCard = () => {
        onSelectCard(null)
        setPreviewCard(null)
    }

    return (
        <>
            {/* add wishing card */}
            <div className="px-4 md:px-8 flex glass-card gap-4 flex-col py-8 border border-[#5FDA78] rounded-[20px]">

                <div className="relative">
                    <p className="text-white text-start text-[16px] pb-6">
                        Add any wishing card for just {currency} {addonAmount.toFixed(2)}
                    </p>

                    <div className="absolute bottom-0 left-0 w-full h-px
    bg-linear-to-r from-[#30114E] via-white to-[#30114E]" />
                </div>
                {/*wish card div — show 4 at a time, scroll horizontally for more */}
                <div
                    className="flex gap-2 pt-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth pb-1"
                    style={{ scrollbarWidth: "thin" }}
                >
                    {greetingCards.length > 0 ? (
                        greetingCards.map((card) => (
                            <button
                                key={card.id}
                                type="button"
                                onClick={() => handleThumbnailClick(card)}
                                className="relative shrink-0 w-[calc((100%-1.5rem)/4)] snap-start rounded-md overflow-hidden cursor-pointer"
                            >
                                <CardThumbnail path={card.imageUrl} />

                                {selectedCardId === card.id && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                        <div className="w-6 h-6 rounded-full bg-[#5FDA78] flex items-center justify-center">
                                            <Check size={14} className="text-[#330065]" strokeWidth={3} />
                                        </div>
                                    </div>
                                )}
                            </button>
                        ))
                    ) : (
                        <p className="text-white/70 text-sm">No wishing cards available</p>
                    )}
                </div>
            </div>

            <SelectCardModal
                isModalOpen={!!previewCard}
                setIsModalOpen={(open) => {
                    if (!open) handleCloseModal()
                }}
                isSelected={previewCard?.id === selectedCardId}
                onSelect={handleSelectCard}
                onRemove={handleRemoveCard}
                imageUrl={previewCard ? buildContentImageUrl(previewCard.imageUrl) : undefined}
            />
        </>
    )
}

export default WishCard
