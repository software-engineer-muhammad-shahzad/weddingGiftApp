"use client"
import Image from "next/image"
import LeftBannerText from "../components/auth/LeftBannerText"
import VerifyOtpForm from "../components/auth/otp/VerifyOtpForm"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import ModalLayer from "../components/ui/ModalLayer"
import PaymentSucessfull from "../components/giftsend/paymentflow/PaymentSucessfull"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

const page = () => {
     const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
    const searchParams=useSearchParams()
    const source=searchParams.get("source")


    
    return (
      <div className="bg-[#350366]  min-h-screen items-center flex  overflow-auto w-full py-15.5 md:py-0 px-4 md:px-20">
           <div className=" flex flex-colmd:flex-row justify-between  h-full   w-full items-center pt-10 md:pt-0">

          <Link href="/login" className="fixed z-[9999] top-10 left-4 sm:left-6 md:left-8 text-white flex items-center cursor-pointer bg-[#350366] px-3 py-1 rounded"><ChevronLeft /><span className="border-b border-transparent hover:border-white transition-all duration-300 ml-2">OTP Verification</span></Link>
                {/* leftbannertext */}
                <div className="md:p-2  flex-1   hidden lg:block z-100">
                    <LeftBannerText />
                </div>

                {/* verify otp=form */}
                <div className=" flex-1 z-100 md:pt-10">
                    <VerifyOtpForm source={source} showPaymentSuccess={showPaymentSuccess} setShowPaymentSuccess={setShowPaymentSuccess}/>
                </div>


                {/* left-center-bottom image at natural size */}
                <div
                    className="fixed left-0 top-10"

                >
                    <Image
                        src="/images/bg-images/left-rainbow.png"
                        alt="Left Rainbow"
                        width={600}   // replace with your image's real width
                        height={600}  // replace with your image's real height
                        className="object-contain"
                    />
                </div>
            </div>
                {/* Payment Success Modal */}
            {showPaymentSuccess && (
                <ModalLayer onClose={() => setShowPaymentSuccess(false)} modalHeight="500px">
                    <div 
                        className="w-full h-full p-4 bg-[#330065] rounded-lg flex flex-col items-center overflow-y-auto" 
                        style={{
                            scrollbarWidth: 'none', /* Firefox */
                            msOverflowStyle: 'none', /* Internet Explorer 10+ */
                        }}
                    >
                        <style jsx>{`
                            div::-webkit-scrollbar {
                                display: none; /* Safari and Chrome */
                            }
                        `}</style>
                        <PaymentSucessfull />
                    
                    </div>
                </ModalLayer>
            )}
        </div>
    )
}

export default page