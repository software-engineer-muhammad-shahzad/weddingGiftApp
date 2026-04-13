"use client"
import Image from "next/image"
import { useState } from 'react'
import ModalLayer from "../../ui/ModalLayer"
import { Download, Share2 } from 'lucide-react'
import Button from "../../elements/Button"

interface ReceivedGift {
    name: string
    amount: string
    message: string
    image: string
}
interface AllTabProps {
    receivedGiftData: ReceivedGift[]
}

const AllTab = ({ receivedGiftData }: AllTabProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedData, setSelectedData] = useState<any>(null)

    // Dummy data for multiple gift cards

    const handleItemClick = (data: any) => {
        setSelectedData(data)
        setIsModalOpen(true)
    }

    return (
        <>
            <div className="flex flex-col gap-4 max-h-96 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {receivedGiftData.map((item, index) => (
                    <div key={index} className="flex justify-between  py-6 md:py-8 border-b border-[#47038A] cursor-pointer" onClick={() => handleItemClick(item)}>
                        <div className="flex gap-3 md:gap-4 items-center">
                            <div className="border border-[#5FDA78] rounded-full w-12 h-12 ">
                                <Image src="/images/profile-pic.png" alt="profile" width={10} height={10} />
                            </div>
                            <div className="flex flex-col gap-2 ">
                                <p className="text-white  md:text-[16px] font-semibold">{item.name} <span className="ms-2">{item.amount}</span></p>
                                <p className="text-white text-[14px] font-light">{item.message}</p>
                                <p className="text-white  text-[12px] font-light">Monday, 10 June</p>
                            </div>
                        </div>
                        <div>
                            <Image src={item.image} alt="card-image" width={85} height={60} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && selectedData && (
                <ModalLayer
                    onClose={() => setIsModalOpen(false)}
                    modalHeight="h-full  md:h-[400px]"
                    modalWidth="w-full max-w-[280px] sm:max-w-[400px]"
                    overlayColor="bg-[#171515EB] "
                >
                    <div className="bg-[#5FDA78] h-full w-full   p-6 flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center gap-4 w-full ">
                            <div className="text-center  w-full flex h-[150px] justify-center">
                                <Image
                                    src={selectedData.image || "/images/card-image.png"}
                                    alt="gift-image"
                                    width={350}
                                    height={100}
                                    className="rounded-sm"
                                />
                            </div>
                            <div className="text-center w-full max-w-75 ">
                                <h3 className="text-white text-xl font-semibold mb-2 wrap-break-word">{selectedData.name}
                                    <span className="text-[#391F68] ms-4 text-2xl font-semibold mb-2">{selectedData.amount}</span></h3>

                                <p className="text-white text-lg wrap-break-word">{selectedData.message}</p>
                                <div className="flex gap-4 justify-center mt-4">
                                    <Button
                                        className="px-4 glass-card! w-12! h-12!  md:w-14! md:h-14!   text-white rounded-full"
                        
                                    >
                                        <Share2 className="w-5 h-5 text-white  " />

                                    </Button>
                                    {/* download button */}
                                    <Button
                                        className="px-4 py-1   text-white w-12! h-12!  md:w-14! md:h-14! rounded-full"
                                       
                                    >

                                        <Download className="w-8 h-8 text-white" />

                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalLayer>
            )}
        </>
    )
}

export default AllTab