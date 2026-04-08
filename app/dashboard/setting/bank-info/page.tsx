import ProfileInfoEditForm from "@/app/components/dashboard/myprofile/ProfileInfoEditForm"
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
          <p className="text-white text-2xl">Bank Information</p>

        </Link>

      
        {/* form edit start*/}
        {/* edit button */}
   
          {/* forms */}

          <div
            className="border border-[#5FDA78] rounded-[30px]  mt-8  mb-8"
            style={{
              background: `
      radial-gradient(38.46% 35.68% at 11.54% 13.24%, rgba(255, 235, 255, 0) 0%, rgba(230, 255, 240, 0) 70%, rgba(240, 240, 255, 0) 100%),
      linear-gradient(319.11deg, rgba(255, 255, 255, 0.044) 22.91%, rgba(255, 255, 255, 0) 62.69%, rgba(217, 235, 255, 0) 89.21%),
      linear-gradient(0deg, rgba(0, 0, 0, 0.066) 11.82%, rgba(0, 0, 0, 0.022) 39.66%, rgba(0, 0, 0, 0) 76.77%, rgba(0, 0, 0, 0) 104.6%),
      linear-gradient(0deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01))
    `,
              boxShadow: `
      0px 0px 1.5px 0px #FF264000 inset,
      0px 0px 1.5px 0px #2673FF00 inset,
      0px 1.5px 3.33px 0px #FFFFFF19 inset,
      0px 0px 8px 0px #D1E5FF00 inset,
      0px 3px 12px -3px #00000026,
      0px 10px 28px -6px #00000040,
      0px 0px 45px 0px #FFFFFF05
    `,
              backdropFilter: 'blur(25px)',
            }}
          >
            <div className="flex flex-col border-b border-b-[#F1F1F11A] py-4 px-4 ">
              <p className="font-light text-sm text-[#EEEEEE]">Account Holder Name</p>
              <p className="font-medium text-sm text-[#EEEEEE]">Sana khan</p>
            </div>
            {/* other details */}
            <div className="flex flex-col border-b  border-b-[#F1F1F11A]  py-4 px-4 ">
              <p className="font-normal text-sm text-[#EEEEEE]">Account Number</p>
              <p className="font-bold text-sm text-[#EEEEEE]">0998 0987 8888 2288</p>
            </div>
            {/* Event date */}
            <div className="flex flex-col border-b  border-b-[#F1F1F11A]  py-4 px-4 ">
              <p className="font-normal text-sm text-[#EEEEEE]">IBAN</p>
              <p className="font-bold text-sm text-[#EEEEEE]">PKST0998 0987 8888 2288</p>
            </div>
            {/* Email */}
            <div className="flex flex-col border-b  border-b-[#F1F1F11A]  py-4 px-4 ">
              <p className="font-normal text-sm text-[#EEEEEE]">Address</p>
              <p className="font-bold text-sm text-[#EEEEEE]">UK Street 23 House No. 3425</p>
            </div>
            {/* Contact Number */}
            <div className="flex flex-col   py-4 px-4 ">
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