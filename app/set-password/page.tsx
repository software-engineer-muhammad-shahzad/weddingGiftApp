"use client"
import Image from "next/image"

import SignupLeft from "../components/auth/signup/SignupLeft"
import SetPasswordForm from "../components/auth/setpassword/SetPasswordForm"
import { useState } from "react"
import ModalLayer from "../components/ui/ModalLayer"
import Button from "../components/elements/Button"
import Link from "next/link"

const page = () => {

    const [isModalOpen,setIsModalOpen]=useState(false);
  return (
    <div className="bg-[#350366] min-h-screen w-full py-15.5 px-20  overflow-auto">
        {isModalOpen && (
          <ModalLayer onClose={() => setIsModalOpen(false)}  className=" z-50 rounded-4xl  border border-[#5FDA78]">
            <div className="p-4 rounded-4xl bg-[#330065B2]
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
      <div className="flex w-full h-full">
        <div className="flex-1">
          <SignupLeft />
        </div>
        <div className="flex-1 ps-20">
          <SetPasswordForm setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
        </div>
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
  )
}

export default page