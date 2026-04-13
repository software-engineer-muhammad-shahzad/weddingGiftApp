import { FaqsPageImage, HowItWorkIcon } from "@/app/components/icons/Icons"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { howItWorksData } from "@/app/components/data"
import Image from "next/image"

const page = () => {
    return (
        <div className="min-h-screen overflow-auto   w-full max-w-382.5 flex  justify-center mx-auto ">
            <div className="w-full h-full bg-[#330065] max-w-200 py-8 relative  border border-red-400  px-3">
                {/* my profile back navigation */}
                <Link href="/dashboard/setting" className="flex w-fit items-center gap-2">
                    <ChevronLeft className='text-white' />
                    <p className="text-white text-2xl font-medium  border-b border-transparent hover:border-white transition-all duration-300">How It Works</p>


                </Link>


                {/* image faqs */}

                <div className="flex justify-center mt-17">
                    <FaqsPageImage/>

                </div>
                {/* description */}
                <div className="flex flex-col mt-15 gap-7 px-3 md:px-10 pb-40">
                    {howItWorksData.map((item) => (
                        <div key={item.id} className="flex items-start gap-3">
                            <div className="pt-1.5 md:pt-1">
                                <HowItWorkIcon />
                            </div>
                           
<div >
                                <p className="text-white text-xl font-light">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            

            {/* form end */}
           <div className="absolute  left-0 top-110 md:top-60  ">
                  <Image
                    src="/images/bg-images/left-rainbow.png"
                    alt="Rainbow"
                    width={650}
                    height={600}
                    className="object-contain  "
                  />
                </div>
                </div>

        </div>
    )
}

export default page