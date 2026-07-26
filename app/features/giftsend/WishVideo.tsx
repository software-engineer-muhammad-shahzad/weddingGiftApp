"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Upload, X, RotateCcw } from "lucide-react"
import { showError, showSuccess } from "@/app/lib/toast"
import { uploadWishingVideo } from "./api/paymentApi"

interface VideoUpload {
  video: File | null
  setVideo: (video: File | null) => void
  addonAmount: number
  currency: string
  coupleId: number | null
  /** Server URL after a successful upload; null means not uploaded yet. */
  videoUrl: string | null
  onVideoUrlChange: (url: string | null) => void
  disabled?: boolean
}

const WishVideo = ({
  video,
  setVideo,
  addonAmount,
  currency,
  coupleId,
  videoUrl,
  onVideoUrlChange,
  disabled = false,
}: VideoUpload) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const isUploaded = Boolean(videoUrl)
  const hasPendingUpload = Boolean(video) && !isUploaded

  // A wishing card and a wishing video are mutually exclusive — clear any
  // video already picked when a card gets selected elsewhere on the page.
  useEffect(() => {
    if (!disabled) return

    setVideo(null)
    onVideoUrlChange(null)
    setVideoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled])

  const openFilePicker = () => {
    if (disabled || isUploading) return
    const input = fileInputRef.current
    if (!input) return

    // Reset so selecting the same file again still fires onChange.
    input.value = ""
    input.click()
  }

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const maxSize = 25 * 1024 * 1024
    if (file.size > maxSize) {
      showError("Video must not exceed 25MB")
      e.target.value = ""
      return
    }

    setVideoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
    setVideo(file)
    // Selecting/changing a file clears any previous upload until user taps Upload.
    onVideoUrlChange(null)
  }

  const handleUploadToServer = async () => {
    if (!video || isUploading) return

    if (!coupleId) {
      showError("Missing recipient details. Please refresh and try again.")
      return
    }

    try {
      setIsUploading(true)
      const res = await uploadWishingVideo(coupleId, video)
      const uploadedUrl = res.data.profileImageUrl
      if (!uploadedUrl) {
        throw new Error("Upload succeeded but no video URL was returned.")
      }
      onVideoUrlChange(uploadedUrl)
      showSuccess("Video uploaded successfully")
    } catch (err: any) {
      onVideoUrlChange(null)
      showError(err?.response?.data?.statusMessage || err?.message || "Video upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleClosePreview = () => {
    setVideoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
  }

  const handleRemoveVideo = () => {
    setVideo(null)
    onVideoUrlChange(null)
    setVideoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex gap-4 glass-card flex-col pt-8 pb-[10px] border border-[#5FDA78] rounded-[20px]">
      <div className="relative px-8">
        <p className="text-white text-start text-[16px] pb-6">
          Add wishing video for just {currency} {addonAmount.toFixed(2)}
        </p>

        <div
          className="absolute bottom-0 left-0 w-full h-px 
        bg-linear-to-r from-[#00114E] via-white to-[#00114E]"
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleVideoSelect}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {!videoPreview && !video ? (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          className={`flex flex-col items-center justify-center gap-6 px-4 glass-card py-8 rounded-[20px] ${
            disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={openFilePicker}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              openFilePicker()
            }
          }}
        >
          <Image src="/images/video-upload.svg" alt="add-video" width={27} height={27} />

          <p className="text-white font-light text-sm text-center">
            {disabled
              ? "Remove the selected wishing card to upload a video instead"
              : "Video must not exceed 25MB"}
          </p>
        </div>
      ) : videoPreview ? (
        <div className="relative px-4 pb-[10px]">
          <div className="relative rounded-[20px] overflow-hidden border border-[#5FDA78]">
            <video
              src={videoPreview}
              controls
              className="w-full h-auto max-h-64 object-cover"
            />

            <button
              type="button"
              onClick={handleClosePreview}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80 transition-colors"
              title="Close preview"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-[#5FDA78] font-medium text-sm mb-2">
              Selected: {video?.name}
            </p>
            <p className="text-white/70 text-xs mb-4">
              {isUploaded
                ? "Video uploaded. You can continue to payment."
                : "Upload this video before continuing to payment."}
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleRemoveVideo}
                disabled={isUploading}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                <X size={16} />
                Remove
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  openFilePicker()
                }}
                disabled={isUploading}
                className="flex items-center gap-2 bg-transparent border border-[#5FDA78] text-[#5FDA78] px-4 py-2 rounded-full text-sm hover:bg-[#5FDA78]/10 transition-colors disabled:opacity-50"
              >
                <RotateCcw size={16} />
                Change
              </button>

              <button
                type="button"
                onClick={handleUploadToServer}
                disabled={isUploading || isUploaded || !video}
                className="flex items-center gap-2 bg-[#5FDA78] text-[#330065] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#4fc866] transition-colors disabled:opacity-50"
              >
                <Upload size={16} />
                {isUploading ? "Uploading..." : isUploaded ? "Uploaded" : "Upload"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative px-4 pb-[10px]">
          <div className="flex flex-col items-center justify-center gap-4 px-4 glass-card py-8 border border-[#5FDA78] rounded-[20px]">
            <Image
              src="/images/video-upload.svg"
              alt="video-selected"
              width={24}
              height={24}
            />
            <div className="text-center">
              <p className="text-[#5FDA78] font-medium text-sm">
                {isUploaded ? "Video uploaded:" : "Video selected:"} {video?.name}
              </p>
              {hasPendingUpload && (
                <p className="text-white/70 text-xs mt-1">
                  Upload this video before continuing to payment.
                </p>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleRemoveVideo}
                disabled={isUploading}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                <X size={16} />
                Remove
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  openFilePicker()
                }}
                disabled={isUploading}
                className="flex items-center gap-2 bg-transparent border border-[#5FDA78] text-[#5FDA78] px-4 py-2 rounded-full text-sm hover:bg-[#5FDA78]/10 transition-colors disabled:opacity-50"
              >
                <RotateCcw size={16} />
                Change
              </button>

              <button
                type="button"
                onClick={handleUploadToServer}
                disabled={isUploading || isUploaded || !video}
                className="flex items-center gap-2 bg-[#5FDA78] text-[#330065] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#4fc866] transition-colors disabled:opacity-50"
              >
                <Upload size={16} />
                {isUploading ? "Uploading..." : isUploaded ? "Uploaded" : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WishVideo
