"use client"
import Image from "next/image"

import SignupLeft from "../components/auth/signup/SignupLeft"
import SetPasswordForm from "../components/auth/setpassword/SetPasswordForm"
import { useState } from "react"
import ModalLayer from "../components/ui/ModalLayer"
import Link from "next/link"

const page = () => {

    const [isModalOpen,setIsModalOpen]=useState(false);
  return (
    <div className="bg-[#350366] min-h-screen w-full py-10 lg:py-15.5 px-6 lg:px-20  overflow-auto">
        {isModalOpen && (
          <ModalLayer onClose={() => setIsModalOpen(false)}  className=" z-100 rounded-4xl  bg-red-500 border border-[#5FDA78]" modalHeight="auto">
            <div className="p-4 rounded-4xl bg-[#330065B2] border border-red-500
"
    >
                <p className="font-semibold text-3xl text-white mb-2">Successful</p>
                <p className="font-light text-white text-lg">Your password has been successfully updated.</p>
                <div className="flex justify-end mt-8">
                    <Link href={'/login'} type="submit" onClick={()=>{setIsModalOpen(false)}} className="px-5 py-2 text-xl text-[#330065] bg-[#5FDA78] rounded-[30px] ">Close</Link>
                </div>

            </div>
          </ModalLayer>
        )}
      
          
       {/* form */}
      <div className="flex md:flex-row    md:mt-14 flex-col w-full h-full  md:items-center  relative z-100">
        <div className="flex-1  ">
           <SignupLeft />
         </div>
        <div className="flex-1 mt-9  lg:mt-0 md:ps-10 lg:ps-20  md:pt-30 ">
           <SetPasswordForm setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
         </div>
       </div>

       {/* left-center-bottom image at natural size */}
       <div className="fixed -top-22.5 right-0 md:top-10 md:left-0 md:right-auto">
              <Image
                src="/images/bg-images/left-rainbow.png"
                alt="Rainbow"
                width={700}
                height={700}
                className="object-contain scale-x-[-1] md:scale-x-100"
              />
            </div>
    </div>
  )
}

export default page