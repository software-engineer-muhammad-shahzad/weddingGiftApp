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

const AllTab = ({receivedGiftData}:AllTabProps) => {
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
                    <div key={index} className="flex justify-between py-8 border-b border-[#47038A] cursor-pointer" onClick={() => handleItemClick(item)}>
                        <div className="flex gap-4">
                            <div className="border border-[#5FDA78] rounded-full w-8 h-8">
                                <Image src="/images/profile-pic.png" alt="profile" width={10} height={10} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-white font-semibold">{item.name} <span className="ms-2">{item.amount}</span></p>
                                <p className="text-white font-light">{item.message}</p>
                            </div>
                        </div>
                        <div>
                            <Image src={item.image} alt="card-image" width={120} height={120} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && selectedData && (
                <ModalLayer
                    onClose={() => setIsModalOpen(false)}
                    modalHeight="400px"
                    modalWidth="w-[400px]"
                >
                    <div className="bg-[#330065] h-full  w-full p-6 flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center gap-4 w-full ">
                            <div className="text-center  w-full flex h-[200px] justify-center">
                                <Image
                                    src={selectedData.image || "/images/card-image.png"}
                                    alt="gift-image"
                                    width={350}
                                    height={100}
                                    className="rounded-sm"
                                    onError={(e) => console.error('Image failed to load:', e)}
                                    onLoad={() => console.log('Image loaded successfully:', selectedData.image)}
                                />
                            </div>
                            <div className="text-center w-full max-w-75 ">
                                <h3 className="text-white text-xl font-semibold mb-2 wrap-break-word">{selectedData.name} 
                                          <span className="text-[#5FDA78] ms-4 text-2xl font-semibold mb-2">{selectedData.amount}</span></h3>
                          
                                <p className="text-white text-lg wrap-break-word">{selectedData.message}</p>
                                <div className="flex gap-4 justify-center mt-4">
                                    <Button
                                        className="px-4 py-2 w-14! h-14!   text-white rounded-full"
                                        style={{
                                            background: "#391F68",
                                            boxShadow: `
      0px 0px 1.5px 0px #FF264000 inset,
      0px 0px 1.5px 0px #2673FF00 inset,
      0px 1.5px 3.33px 0px #FFFFFF19 inset,
      0px 0px 8px 0px #D1E5FF00 inset,
      0px 3px 12px -3px #00000026,
      0px 10px 28px -6px #00000040,
      0px 0px 45px 0px #FFFFFF05
    `,
                                            backdropFilter: "blur(25px)"
                                        }}
                                    >
                                         <Share2 className="w-5 h-5 text-white  " />
                                  
                                    </Button>
                                   {/* download button */}
                                       <Button
                                        className="px-4 py-1   text-white w-14! h-14! rounded-full"
                                        style={{
                                            background: "#391F68",
                                            boxShadow: `
      0px 0px 1.5px 0px #FF264000 inset,
      0px 0px 1.5px 0px #2673FF00 inset,
      0px 1.5px 3.33px 0px #FFFFFF19 inset,
      0px 0px 8px 0px #D1E5FF00 inset,
      0px 3px 12px -3px #00000026,
      0px 10px 28px -6px #00000040,
      0px 0px 45px 0px #FFFFFF05
    `,
                                            backdropFilter: "blur(25px)"
                                        }}
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