import Image from "next/image"
import { useState } from "react"
import { Check } from "lucide-react"
import { buildContentImageUrl } from "@/app/utils/imageUrl"
import { GreetingCardDTO } from "./types"

const FALLBACK_CARD_IMAGE = "/images/congrates-card.svg"

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
            src={hasError ? FALLBACK_CARD_IMAGE : buildContentImageUrl(path)}
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
    const handleThumbnailClick = (card: GreetingCardDTO) => {
        onSelectCard(selectedCardId === card.id ? null : card.id)
    }

    return (
        <>
            {/* add wishing card */}
            <div className="px-4 md:px-8 flex glass-card gap-4 flex-col py-8 border border-[#5FDA78] rounded-[20px]"
                >



                <div className="relative">
                    <p className="text-white text-start text-[16px] pb-6">
                        Add any wishing card for just {currency} {addonAmount.toFixed(2)}
                    </p>

                    <div className="absolute bottom-0 left-0 w-full h-px
    bg-linear-to-r from-[#30114E] via-white to-[#30114E]" />
                </div>
                {/*wish card div  */}
                <div className="grid grid-cols-4 gap-2 pt-4">
                    {greetingCards.length > 0 ? (
                        greetingCards.map((card) => (
                            <button
                                key={card.id}
                                type="button"
                                onClick={() => handleThumbnailClick(card)}
                                className={`relative rounded-md overflow-hidden cursor-pointer `}
                            >
                                <CardThumbnail path={card.cardImagePath} />

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
                        <p className="col-span-4 text-white/70 text-sm">No wishing cards available</p>
                    )}
                </div>



            </div>
        </>
    )
}

export default WishCard
