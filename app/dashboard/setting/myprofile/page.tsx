"use client"
import ProfileInfoEditForm from "@/app/components/dashboard/myprofile/ProfileInfoEditForm"
import SelectImageModal from "@/app/dashboard/setting/myprofile/SelectImageModal"
import { ProfileEditIcon } from "@/app/components/icons/Icons"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const page = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const handleImageSelect = (imageData: string) => {
    setSelectedImage(imageData);
    // Here you can also save the image to your backend or state
  };

  return (
    <>
      {/* Image Selection Modal */}
      <SelectImageModal 
        isOpen={isImageOpen} 
        onClose={() => setIsImageOpen(false)}
        onImageSelect={handleImageSelect}
        currentImage={selectedImage}
      />
      
      {/* Main Profile Page */}
      <div className="min-h-screen overflow-auto  w-full max-w-382.5 flex  justify-center mx-auto ">
        <div className="w-full h-full bg-[#330065] max-w-200 py-8  border border-red-400 px-5   ">
          {/* my profile back navigation */}
          <Link href="/dashboard/setting" className="flex w-fit items-center gap-2">
            <ChevronLeft className='text-white' />
            <p className="text-white text-xl md:text-2xl  border-b border-transparent hover:border-white transition-all duration-300">My Profile</p>
          </Link>

          {/* Profile Image */}
          <div className="flex justify-center mt-12  md:mt-15  ">
            <div className="relative flex justify-center border w-30 h-30 border-[#5FDA78] rounded-full">
              {/* Show selected image if available */}
              {selectedImage && (
                <Image 
                  src={selectedImage} 
                  alt="Profile" 
                  width={120} 
                  height={120} 
                  className="w-full h-full rounded-full object-cover"
                />
              )}
              
              <div
                onClick={() => setIsImageOpen(true)}
                className="absolute -bottom-3.5 right-[-10px] glass-card rounded-[100px] border-[0.5px] border-[#5FDA78] cursor-pointer right-2 w-12 h-12 flex justify-center items-center"
              >
                <ProfileEditIcon />
              </div>
            </div>
          </div>
            {/* form edit start*/}
            {/* edit button */}
            {isFormOpen ? <ProfileInfoEditForm /> : <div>
              <div className=" mt-10 md:mt-15">
                <div className="flex justify-end">
                  <button className="cursor-pointer" onClick={() => setIsFormOpen(true)} >
                    <ProfileEditIcon />
                  </button>

                </div>
              </div>
              {/* forms */}
              <div
                className="border glass-card border-[#5FDA78] rounded-[30px]  mt-4  mb-8"

              >
                <div className="flex flex-col border-b border-b-[#F1F1F11A] py-2 sm:py-4 px-5 md:px-4">
                  <p className="font-light text-sm text-[#EEEEEE]">Name</p>
                  <p className="font-medium text-sm text-[#EEEEEE]">Sana khan</p>
                </div>
                {/* other details */}
                <div className="flex flex-col border-b  border-b-[#F1F1F11A]  py-2 sm:py-4 px-5 md:px-4 ">
                  <p className="font-normal text-sm text-[#EEEEEE]">Partner Name</p>
                  <p className="font-bold text-sm text-[#EEEEEE]">Ahmad Ali</p>
                </div>
                {/* Event date */}
                <div className="flex flex-col border-b  border-b-[#F1F1F11A] py-2 sm:py-4 px-5 md:px-4 ">
                  <p className="font-normal text-sm text-[#EEEEEE]">Email</p>
                  <p className="font-bold text-sm text-[#EEEEEE]">xyz@xyz.com</p>
                </div>
                {/* Email */}
                <div className="flex flex-col border-b  border-b-[#F1F1F11A]  py-2 sm:py-4 px-5 md:px-4 ">
                  <p className="font-normal text-sm text-[#EEEEEE]">Contact Number</p>
                  <p className="font-bold text-sm text-[#EEEEEE]">+1-333-9898987</p>
                </div>
                {/* Contact Number */}
                <div className="flex flex-col   py-2 sm:py-4 px-5 md:px-4 ">
                  <p className="font-normal text-sm text-[#EEEEEE]">Contact Number</p>
                  <p className="font-bold text-sm text-[#EEEEEE]">+1-333-9898987</p>
                </div>
              </div>
            </div>
            }
            {/* form end */}

          </div>
        </div>

    </>
  )
}

export default page