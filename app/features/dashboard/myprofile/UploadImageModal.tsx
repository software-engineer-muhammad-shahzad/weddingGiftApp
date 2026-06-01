import { showSuccess } from "@/app/lib/toast"
import { Camera, ImageIcon, Trash2, X } from "lucide-react"
import React from "react"

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void

  galleryInputRef: React.RefObject<HTMLInputElement | null>
  cameraInputRef: React.RefObject<HTMLInputElement | null>

  selectedFile: File | null
  setSelectedFile: (file: File | null) => void

  previewImage: string | null
  setPreviewImage: (url: string | null) => void

  updateProfilePhoto: (file: File) => Promise<any>
  refetch?: () => void
}

const UploadImageModal = ({
  isOpen,
  setIsOpen,
  galleryInputRef,
  cameraInputRef,
  selectedFile,
  setSelectedFile,
  previewImage,
  setPreviewImage,
  updateProfilePhoto,
  refetch,
}: Props) => {
  if (!isOpen) return null

  // upload
  const handleUpload = async () => {
    if (!selectedFile) return

    try {
      const res = await updateProfilePhoto(selectedFile)
      
        showSuccess("Image uploaded successfully");
     

      if (res?.profileImageUrl) {
        
        setPreviewImage(res.profileImageUrl)
        await refetch?.()
      }

      setSelectedFile(null)
      setIsOpen(false)
    } catch (err) {
      console.error("Upload failed:", err)
    }
  }

  // remove selected preview (before upload only)
  const handleRemoveSelected = () => {
    setSelectedFile(null)
    setPreviewImage(null)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-[#2A0052] border border-[#5FDA78] rounded-3xl p-6 w-full max-w-sm relative">

        {/* close */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white bg-red-500 cursor-pointer hover:bg-red-500  rounded-full transition-all duration-200"
        >
          <X size={22} />
        </button>
        <h2 className="text-white text-xl font-semibold text-center mb-6">
          Upload Profile Image
        </h2>

        {/* preview */}
        {previewImage && (
          <div className="flex justify-center mb-5  relative">
            <img
              src={previewImage}
              className="w-24 h-24 rounded-full object-cover border border-[#5FDA78]"
            />

            <button
              onClick={handleRemoveSelected}
              className="absolute top-1 right-12 cursor-pointer border bg-red-500 text-white p-1 rounded-full"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}

        <div className="flex flex-col gap-4">

          {/* gallery */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false)
              setTimeout(() => galleryInputRef.current?.click(), 100)
            }}
            className="flex items-center cursor-pointer justify-center gap-3 bg-[#5FDA78] text-black py-3 rounded-xl font-semibold"
          >
            <ImageIcon size={20} />
            Choose from Gallery
          </button>

          {/* camera */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false)
              setTimeout(() => cameraInputRef.current?.click(), 100)
            }}
            className="flex items-center justify-center gap-3 border border-[#5FDA78] text-white py-3 rounded-xl"
          >
            <Camera size={20} />
            Open Camera
          </button>

          {/* upload */}
          {selectedFile && (
            <button
              onClick={handleUpload}
              className="bg-white cursor-pointer  text-black py-3 rounded-xl font-bold"
            >
              Upload Image
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadImageModal