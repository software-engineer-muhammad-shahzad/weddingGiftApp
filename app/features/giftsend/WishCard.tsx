import Image from "next/image"
import { buildContentImageUrl } from "@/app/utils/imageUrl"
import { GreetingCardDTO } from "./types"

interface openSelectImageProps {
    openModal: () => void
    greetingCards: GreetingCardDTO[]
    selectedCardId: number | null
    onSelectCard: (id: number) => void
    addonAmount: number
    currency: string
}

const WishCard = ({ openModal, greetingCards, selectedCardId, onSelectCard, addonAmount, currency }: openSelectImageProps) => {
    const handleSelect = (id: number) => {
        onSelectCard(id)
        openModal()
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
                                onClick={() => handleSelect(card.id)}
                                className={`rounded-md overflow-hidden border-2 ${selectedCardId === card.id ? "border-[#5FDA78]" : "border-transparent"}`}
                            >
                                <Image
                                    src={buildContentImageUrl(card.cardImagePath)}
                                    alt="wishing-card"
                                    width={100}
                                    height={100}
                                    unoptimized
                                />
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
