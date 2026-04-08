import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const page = () => {
    return (
        <div className="h-screen overflow-auto   w-full max-w-382.5 flex  justify-center mx-auto ">
            <div className="w-full h-full bg-[#330065] max-w-200 py-8  border border-red-400  px-3 ">
                {/* my profile back navigation */}
                <Link href="/dashboard/setting" className="flex w-fit items-center gap-2">
                    <ChevronLeft className='text-white' />
                    <p className="text-white text-2xl">How It Works</p>

                </Link>


                {/* image faqs */}

                <div className="flex justify-center mt-20">
                    <Image src="/images/faqs-image.png" alt="error" width={150} height={150} />

                </div>
                {/* description */}
                <div className="flex items-start mt-20 gap-2 px-10">
                    <Image
                        src="/images/faqs-bullet.png"
                        alt="faqs-bullet"
                        width={10}
                        height={10}
                        className="mt-1"
                    />

                    <p className="text-white font-light">
                        Couples register on the platform and set up their personalized wedding profile with payment details.

                    </p>
                </div>
            </div>

            {/* form end */}

        </div>
    )
}

export default page