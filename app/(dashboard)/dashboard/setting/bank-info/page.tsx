"use client"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useCoupleBankDetails } from "@/app/features/dashboard/hooks/useCoupleBankDetails"

const page = () => {
  const { data, isLoading, error } = useCoupleBankDetails()

  if (isLoading) {
    return (
      <div className="h-screen overflow-auto w-full max-w-382.5 flex justify-center mx-auto">
        <div className="w-full h-full bg-[#330065] max-w-200 py-8 border border-red-400 px-5">
          <Link href="/dashboard/setting" className="flex w-fit items-center gap-2">
            <ChevronLeft className='text-white' />
            <p className="text-white text-2xl border-b border-transparent hover:border-white transition-all duration-300">Bank Information</p>
          </Link>
          <p className="text-white mt-8">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen overflow-auto w-full max-w-382.5 flex justify-center mx-auto">
        <div className="w-full h-full bg-[#330065] max-w-200 py-8 border border-red-400 px-5">
          <Link href="/dashboard/setting" className="flex w-fit items-center gap-2">
            <ChevronLeft className='text-white' />
            <p className="text-white text-2xl border-b border-transparent hover:border-white transition-all duration-300">Bank Information</p>
          </Link>
          <p className="text-red-400 mt-8">{error}</p>
        </div>
      </div>
    )
  }

  return (
   <div className="h-screen overflow-auto   w-full max-w-382.5 flex  justify-center mx-auto ">
      <div className="w-full h-full bg-[#330065] max-w-200 py-8  border border-red-400  px-5 ">
        {/* my profile back navigation */}
        <Link href="/dashboard/setting" className="flex w-fit items-center gap-2">
          <ChevronLeft className='text-white' />
          <p className="text-white text-2xl border-b border-transparent hover:border-white transition-all duration-300">Bank Information</p>

        </Link>

      
        {/* form edit start*/}
        {/* edit button */}
   
          {/* forms */}

          <div
            className="border border-[#5FDA78] rounded-[30px] glass-card  mt-14 md:mt-8  mb-8"
      
              
          >
            <div className="flex flex-col border-b border-b-[#F1F1F11A] py-2 sm:py-4 px-5 md:px-4 ">
              <p className="font-light text-sm text-[#EEEEEE]">Account Holder Name</p>
              <p className="font-medium text-sm text-[#EEEEEE]">{data?.accountHolderName || "N/A"}</p>
            </div>
            {/* other details */}
            <div className="flex flex-col border-b  border-b-[#F1F1F11A]  py-2 sm:py-4 px-5 md:px-4 ">
              <p className="font-normal text-sm text-[#EEEEEE]">BSB</p>
              <p className="font-bold text-sm text-[#EEEEEE]">{data?.bsb || "N/A"}</p>
            </div>
            {/* Event date */}
            <div className="flex flex-col border-b  border-b-[#F1F1F11A]  py-2 sm:py-4 px-5 md:px-4">
              <p className="font-normal text-sm text-[#EEEEEE]">Account Number</p>
              <p className="font-bold text-sm text-[#EEEEEE]">{data?.accountNumber || "N/A"}</p>
            </div>
            {/* Email */}
            <div className="flex flex-col  py-2 sm:py-4 px-5 md:px-4 ">
              <p className="font-normal text-sm text-[#EEEEEE]">Bank Name</p>
              <p className="font-bold text-sm text-[#EEEEEE]">{data?.bankName || "N/A"}</p>
            </div>
          </div>
        </div>
        
        {/* form end */}
        
      </div>
    
   
  )
}

export default page