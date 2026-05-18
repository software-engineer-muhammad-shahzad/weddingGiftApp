"use client"
import VerifyOtp from "@/app/features/auth/verify-otp/VerifyOtp"
import { Suspense } from "react"

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="bg-[#350366] min-h-screen flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <VerifyOtp />
    </Suspense>
  )
}

export default page