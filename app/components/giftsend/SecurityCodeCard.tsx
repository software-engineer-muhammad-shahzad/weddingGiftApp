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
        <ModalLayer onClose={handleClose}>
            <div className="w-100 h-64 p-4 bg-[#5FDA78] rounded-lg flex flex-col items-center justify-center">
                <p className="text-[#330065] font-semibold text-lg">Security Code</p>
                <p className="text-[#330065] text-md py-2 text-center">The security code is the three digits on the back of your card</p>
                {/* selct catrd option */}
                <div className="flex  px-4 w-full justify-center">
                    <Image src="/images/card-code.png" alt="card-code" width={100} height={50} />

                </div>
                {/* button ok */}
                <Link
                    href={{
                        pathname: "/verify-otp",
                        query: { source: "payment" }
                    }}
                    className="bg-[#330065] text-center w-full rounded-[47px] text-[#5FDA78] text-lg py-2 mt-6"
                >
                    Ok
                </Link>
            </div>
        </ModalLayer>
    )
}

export default SecurityCodeCard