"use client"

import Image from "next/image"
import LeftBannerText from "../LeftBannerText"
import VerifyOtpForm from "../forgotpassword/otp/VerifyOtpForm"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import PaymentSucessfulModal from "../../../features/giftsend/paymentflow/PaymentSucessfulModal"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

const VerifyOtp = () => {
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
  const searchParams = useSearchParams()
  const source = searchParams.get("source") || "default"

  return (
    <div className="bg-[#350366]  min-h-screen items-center flex  overflow-auto w-full py-15.5 md:py-0 px-4 md:px-20">
      <div className=" flex flex-col md:flex-row justify-between  h-full   w-full items-center pt-10 md:pt-0">

        <Link href="/login" className="fixed z-[9999] top-10 left-4 sm:left-6 md:left-8 text-white flex items-center cursor-pointer bg-[#350366] px-3 py-1 rounded"><ChevronLeft /><span className="border-b border-transparent hover:border-white transition-all duration-300 ml-2">OTP Verification</span></Link>

        <div className="md:p-2  flex-1   hidden lg:block z-100">
          <LeftBannerText />
        </div>

        <div className=" flex-1 z-100 md:pt-10">
          <VerifyOtpForm source={source} showPaymentSuccess={showPaymentSuccess} setShowPaymentSuccess={setShowPaymentSuccess} />
        </div>

        <div className="fixed left-0 top-10">
          <Image
            src="/images/bg-images/left-rainbow.png"
            alt="Left Rainbow"
            width={600}
            height={600}
            loading="eager"
            style={{ width: 'auto', height: 'auto' }}
            className="object-contain"
          />
        </div>
      </div>

      <PaymentSucessfulModal
        showPaymentSuccess={showPaymentSuccess}
        setShowPaymentSuccess={setShowPaymentSuccess}
      />
    </div>
  )
}

export default VerifyOtp
