"use client"

import ProfileInfoEditForm from "@/app/features/dashboard/myprofile/ProfileInfoEditForm"
import { ProfileEditIcon } from "@/app/components/icons/Icons"
import { Trash2, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { useCoupleProfileDetails } from "@/app/features/dashboard/hooks/useCoupleProfile"
import { useUpdateCouplePhoto } from "@/app/features/dashboard/hooks/useUpdateCouplePhoto"
import { useDeleteCouplePhoto } from "@/app/features/dashboard/hooks/useDeleteCoupleProfile"

import ShowProfileInfo from "@/app/features/dashboard/myprofile/ShowProfileInfo"
import ProfileInfoNavigation from "@/app/features/dashboard/myprofile/ProfileInfoNavigation"
import UploadImageModal from "@/app/features/dashboard/myprofile/UploadImageModal"
import Skeleton from "@/app/components/ui/Skeleton"

const Page = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const galleryInputRef = useRef<HTMLInputElement | null>(null)
  const cameraInputRef = useRef<HTMLInputElement | null>(null)

  const { data, isLoading, refetch } = useCoupleProfileDetails()
  const { updateProfilePhoto } = useUpdateCouplePhoto()
  const { deleteProfilePhoto } = useDeleteCouplePhoto()
  console.log("data is herE:", data);

  const imageSrc = previewImage || data?.profileImageUrl || ""

  // cleanup blob
  useEffect(() => {
    return () => {
      if (previewImage?.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage)
      }
    }
  }, [previewImage])

  // upload trigger
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Invalid image")
      return
    }

    setPreviewImage(URL.createObjectURL(file))
    setSelectedFile(file)
    setIsUploadModalOpen(true)
  }

  // DELETE REAL PROFILE IMAGE (API)
  const handleDeleteImage = async () => {
    try {
      await deleteProfilePhoto()   // 🔥 API CALL

      setPreviewImage(null)
      setSelectedFile(null)

      await refetch?.()
    } catch (err) {
      console.error("Delete failed:", err)
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#330065]">
      <div className="w-full max-w-200 py-8 px-5">

        <ProfileInfoNavigation
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
        />

        {/* PROFILE IMAGE */}
        {/* PROFILE IMAGE */}
        <div className="flex justify-center mt-12">
          <div className="relative w-30 h-30">  {/* ✅ removed overflow-hidden and border from here */}

            {/* inputs */}
            <input
              type="file"
              accept="image/*"
              ref={galleryInputRef}
              onChange={handleSelectImage}
              className="hidden"
            />
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={cameraInputRef}
              onChange={handleSelectImage}
              className="hidden"
            />

            {/* image with border and overflow-hidden only on image wrapper */}
            <div className="w-30 h-30 rounded-full border border-[#5FDA78] overflow-hidden">
              {isLoading ? (
                <Skeleton className="w-full h-full rounded-full" />
              ) : imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="profile"
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                  unoptimized={imageSrc.startsWith("blob:")}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#5FDA7833]">
                  <p className="text-white text-xs">No Image</p>
                </div>
              )}
            </div>

            {/* DELETE BUTTON — now outside overflow-hidden ✅ */}
            {data?.profileImageUrl && (
              <button
                onClick={handleDeleteImage}
                className="absolute cursor-pointer top-0 right-0 z-50 bg-red-500 text-white p-1 rounded-full shadow-md"
              >
                <X size={14} />
              </button>
            )}

            {/* UPLOAD BUTTON — now outside overflow-hidden ✅ */}
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="absolute -bottom-1 -right-1 z-50 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: `
                  radial-gradient(38.46% 38.46% at 11.54% 19.23%, rgba(255, 235, 255, 0) 0%, rgba(230, 255, 240, 0) 70%, rgba(240, 240, 255, 0) 100%),
                  linear-gradient(316.97deg, rgba(255, 255, 255, 0.044) 17.24%, rgba(255, 255, 255, 0) 58.62%, rgba(217, 235, 255, 0) 86.21%),
                  linear-gradient(0deg, rgba(0, 0, 0, 0.066) 0%, rgba(0, 0, 0, 0.022) 30%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0) 100%),
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
                backdropFilter: "blur(25px)",
              }}
            >
              <ProfileEditIcon />
            </button>

          </div>
        </div>

        {/* MODAL */}
        <UploadImageModal
          isOpen={isUploadModalOpen}
          setIsOpen={setIsUploadModalOpen}
          galleryInputRef={galleryInputRef}
          cameraInputRef={cameraInputRef}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          updateProfilePhoto={updateProfilePhoto}
          refetch={refetch}
        />

        {/* CONTENT */}
        {/* CONTENT */}
        {isFormOpen ? (

          <div className="  ">

            {/* CLOSE BUTTON */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsFormOpen(false)}
                className="
       
        text-white
        hover:text-red-500
        transition-all duration-200
        cursor-pointer
        z-10
        bg-red-500
        rounded-full
      
       
        flex justify-end
      "
              >
                <X className="w-2 h-2" />
              </button>
            </div>

            {/* FORM */}
            <ProfileInfoEditForm profileInfoData={data} setIsFormOpen={setIsFormOpen} refetch={refetch} />

          </div>

        ) : (

          <>
            {/* EDIT BUTTON */}
            <div className="flex justify-end mt-10">
              <button
                onClick={() => setIsFormOpen(true)}
                className="cursor-pointer"
              >
                <ProfileEditIcon />
              </button>
            </div>

            {/* PROFILE INFO */}
            {isLoading ? (
              <div className="border glass-card border-[#5FDA78] rounded-[30px] mt-4 mb-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`flex flex-col gap-2 py-2 sm:py-4 px-5 md:px-4 ${i < 5 ? "border-b border-b-[#F1F1F11A]" : ""}`}
                  >
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                ))}
              </div>
            ) : (
              <ShowProfileInfo data={data ?? undefined} />
            )}
          </>

        )}

      </div>
    </div>
  )
}

export default Page