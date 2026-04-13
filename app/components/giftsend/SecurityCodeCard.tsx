import Image from "next/image"
import ModalLayer from "../ui/ModalLayer"
import Link from "next/link"

interface SecurityCodeCardProps {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
}

const SecurityCodeCard = ({ isModalOpen, setIsModalOpen }: SecurityCodeCardProps) => {
    if (!isModalOpen) return null

    const handleClose = () => {
        setIsModalOpen(false)
    }

    return (
        <ModalLayer 
            onClose={handleClose}
            modalHeight="md:h-[300px]!"
            modalWidth="w-full max-w-[280px] sm:max-w-[400px]"
            overlayColor="bg-[#171515EB] "
        >
            <div className="bg-[#5FDA78] h-full w-full p-4 md:p-6 flex flex-col items-center justify-center">
                <p className="text-[#330065] font-semibold text-lg mb-2">Security Code</p>
                <p className="text-[#330065] text-md py-2 text-center">The security code is the three digits on the back of your card</p>
                {/* selct catrd option */}
                <div className="flex px-4 w-full justify-center">
                    <Image src="/images/card-code.png" alt="card-code" width={100} height={50} />

                </div>
                {/* button ok */}
                <Link
                    href={{
                        pathname: "/verify-otp",
                        query: { source: "payment" }
                    }}
                    className="bg-[#330065]! text-center w-full rounded-[47px] text-[#5FDA78]! text-lg py-3! mt-6"
                >
                    Ok
                </Link>
            </div>
        </ModalLayer>
    )
}

export default SecurityCodeCard