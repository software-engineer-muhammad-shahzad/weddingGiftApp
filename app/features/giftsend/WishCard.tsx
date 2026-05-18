import Image from "next/image"

interface openSelectImageProps {
    openModal: () => void
}

const WishCard = ({ openModal }: openSelectImageProps) => {
    return (
        <>
            {/* add wishing card */}
            <div className="px-4 md:px-8 flex glass-card gap-4 flex-col py-8 border border-[#5FDA78] rounded-[20px]"
                >



                <div className="relative">
                    <p className="text-white text-start text-[16px] pb-6">
                        Add any wishing card for just £ 0.5
                    </p>

                    <div className="absolute bottom-0 left-0 w-full h-px 
    bg-linear-to-r from-[#30114E] via-white to-[#30114E]" />
                </div>
                {/*wish card div  */}
                <div className="grid grid-cols-4 gap-2 pt-4" onClick={() => openModal()}>
                    <Image src="/images/card-image.png" alt="error" width={100} height={100} />

                    <Image src="/images/card-image.png" alt="error " width={100} height={100} />

                    <Image src="/images/card-image.png" alt="error" width={100} height={100} />

                    <Image src="/images/card-image.png" alt="error" width={100} height={100} />

                </div>



            </div>
        </>
    )
}

export default WishCard