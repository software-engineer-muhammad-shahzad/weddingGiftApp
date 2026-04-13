import Image from "next/image"
import Button from "../elements/Button"
import ModalLayer from "../ui/ModalLayer"

interface AddCardProps {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    openSecurityCodeModal: () => void
}

const AddCard = ({ isModalOpen, setIsModalOpen, openSecurityCodeModal }: AddCardProps) => {
    if (!isModalOpen) return null

    const handleClose = () => {
        setIsModalOpen(false)
    }

    const handleOk = () => {
        setIsModalOpen(false)
        openSecurityCodeModal()
    }

    return (
        <ModalLayer 
            onClose={handleClose}
            modalHeight=" md:h-[300px]!"
            modalWidth="w-full max-w-[280px] sm:max-w-[400px]"
            overlayColor="bg-[#171515EB] "
        >
            <div className="bg-[#5FDA78] h-full w-full p-4 md:p-6 flex  flex-col items-center justify-center">
                <p className="text-[#330065] font-semibold text-lg mb-2">Accepted Cards</p>
                {/* selct catrd option */}
                <div className="flex justify-between gap-4 px-4 w-full">
                    <Image src="/images/visa-card-image.png" alt="add-card" width={100} height={50}/>
                    <Image src="/images/p-visa-card.png" alt="add-card" width={100} height={50}/>
                    <Image src="/images/american-express.png" alt="add-card" width={100} height={50}/>
                </div>
                {/* button ok */}
                <Button className="bg-[#330065]! rounded-[47px]  font-medium text-[#5FDA78]! text-[20px]  py-3! mt-6" onClick={handleOk}>Ok</Button>
            </div>
        </ModalLayer>
    )
}

export default AddCard