"use client"
import AddCard from "@/app/features/giftsend/AddCard"
import ProfileDescription from "@/app/features/giftsend/ProfileDescription"
import SecurityCodeCard from "@/app/features/giftsend/SecurityCodeCard"
import SelectCardModal from "@/app/features/giftsend/SelectCardModal"
import WishAmount from "@/app/features/giftsend/WishAmount"
import WishCard from "@/app/features/giftsend/WishCard"
import WishForm from "@/app/features/giftsend/WishForm"
import WishMessage from "@/app/features/giftsend/WishMessage"
import WishVideo from "@/app/features/giftsend/WishVideo"
import { useState } from 'react'

// Define modal types
type ModalType = 'selectCard' | 'addCard' | 'securityCode' | null

const page = () => {
    const [greetingText, setGreetingText] = useState("Congratulations! Wishing you a lifetime of happiness together.")
    const [activeModal, setActiveModal] = useState<ModalType>(null)
    const [video, setVideo] = useState(null);

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

                    <ProfileDescription />

                    <WishMessage greetingText={greetingText} setGreetingText={setGreetingText} />

                    <WishCard openModal={() => openModal('selectCard')} />
                    <WishVideo video={video} setVideo={setVideo}/>
                    <WishAmount />
                    <WishForm openModal={() => openModal('selectCard')} />

                    {/* Render modals based on type */}
                    {activeModal === 'selectCard' && (
                        <SelectCardModal
                            isModalOpen={activeModal === 'selectCard'}
                            setIsModalOpen={closeModal}
                            openAddCardModal={() => openModal('addCard')}
                        />
                    )}

                    {activeModal === 'addCard' && (
                        <AddCard
                            isModalOpen={activeModal === 'addCard'}
                            setIsModalOpen={closeModal}
                            openSecurityCodeModal={() => openModal('securityCode')}
                        />
                    )}

                    {activeModal === 'securityCode' && (
                        <SecurityCodeCard
                            isModalOpen={activeModal === 'securityCode'}
                            setIsModalOpen={closeModal}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default page