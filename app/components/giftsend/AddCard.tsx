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
        <ModalLayer onClose={handleClose}>
            <div className="w-100 h-64 p-4 bg-[#5FDA78] rounded-lg flex flex-col items-center justify-center">
                <p className="text-[#330065] font-semibold text-lg">Accepted Cards</p>
                {/* selct catrd option */}
                <div className="flex justify-between px-4 w-full">
                    <Image src="/images/visa-card-image.png" alt="add-card" width={100} height={50}/>
                    <Image src="/images/p-visa-card.png" alt="add-card" width={100} height={50}/>
                    <Image src="/images/american-express.png" alt="add-card" width={100} height={50}/>
                </div>
                {/* button ok */}
                <Button className="bg-[#330065] rounded-[47px] text-[#5FDA78] text-lg py-2 mt-6" onClick={handleOk}>Ok</Button>
            </div>
        </ModalLayer>
    )
}

export default AddCard