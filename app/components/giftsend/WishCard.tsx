import Image from "next/image"

interface openSelectImageProps {
    openModal: () => void
}

const WishCard = ({ openModal }: openSelectImageProps) => {
    return (
        <>
            {/* add wishing card */}
            <div className=" px-8 flex gap-4 flex-col py-8 border border-[#5FDA78] rounded-[20px]"
                style={{
                    background: `
                radial-gradient(38.46% 38.46% at 11.54% 19.23%, rgba(255, 255, 255, 0.05) 0%, rgba(95, 250, 120, 0.1) 70%, rgba(240, 240, 255, 0.05) 100%),
                linear-gradient(316.97deg, rgba(255, 255, 255, 0.1) 17.24%, rgba(255, 255, 255, 0) 58.62%, rgba(217, 235, 255, 0) 86.21%)
              `,
                    boxShadow: `
                0px 1.5px 3.33px rgba(255, 255, 255, 0.1) inset,
                0px 0px 8px rgba(209, 229, 255, 0.2) inset,
                0px 3px 12px -3px rgba(0, 0, 0, 0.15),
                0px 10px 28px -6px rgba(0, 0, 0, 0.25)
              `,
                    backdropFilter: 'blur(15px)',
                }}>



                <div className="relative">
                    <p className="text-white text-start text-lg pb-6">
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