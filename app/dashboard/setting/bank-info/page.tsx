import ProfileInfoEditForm from "@/app/components/dashboard/myprofile/ProfileInfoEditForm"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


const page = () => {
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
              <p className="font-medium text-sm text-[#EEEEEE]">Sana khan</p>
            </div>
            {/* other details */}
            <div className="flex flex-col border-b  border-b-[#F1F1F11A]  py-2 sm:py-4 px-5 md:px-4 ">
              <p className="font-normal text-sm text-[#EEEEEE]">Account Number</p>
              <p className="font-bold text-sm text-[#EEEEEE]">0998 0987 8888 2288</p>
            </div>
            {/* Event date */}
            <div className="flex flex-col border-b  border-b-[#F1F1F11A]  py-2 sm:py-4 px-5 md:px-4">
              <p className="font-normal text-sm text-[#EEEEEE]">IBAN</p>
              <p className="font-bold text-sm text-[#EEEEEE]">PKST0998 0987 8888 2288</p>
            </div>
            {/* Email */}
            <div className="flex flex-col border-b  border-b-[#F1F1F11A]  py-2 sm:py-4 px-5 md:px-4 ">
              <p className="font-normal text-sm text-[#EEEEEE]">Address</p>
              <p className="font-bold text-sm text-[#EEEEEE]">UK Street 23 House No. 3425</p>
            </div>
            {/* Contact Number */}
            <div className="flex flex-col  py-2 sm:py-4 px-5 md:px-4 ">
              <p className="font-normal text-sm text-[#EEEEEE]">Currency</p>
              <p className="font-bold text-sm text-[#EEEEEE]">Ponds</p>
            </div>
          </div>
        </div>
        
        {/* form end */}
        
      </div>
    
   
  )
}

export default page