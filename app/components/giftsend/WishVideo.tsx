import Image from "next/image"
import { useRef, useState } from "react"
import { X, Upload, RotateCcw } from "lucide-react"

interface VideoUpload {
  video: any;
  setVideo: (video: any) => void;
}

const WishVideo = ({ video, setVideo }: VideoUpload) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (25MB = 25 * 1024 * 1024 bytes)
      const maxSize = 25 * 1024 * 1024
      if (file.size > maxSize) {
        alert('Video must not exceed 25MB')
        return
      }
      setVideo(file)
      
      // Create preview URL
      const videoUrl = URL.createObjectURL(file)
      setVideoPreview(videoUrl)
    }
  }

  const handleLabelClick = () => {
    fileInputRef.current?.click()
  }

  const handleClosePreview = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
      setVideoPreview(null)
    }
    // Keep video in state, just close the preview
  }

  const handleRemoveVideo = () => {
    setVideo(null)
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
      setVideoPreview(null)
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleChangeVideo = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex gap-4 glass-card flex-col pt-8 border border-[#5FDA78] rounded-[20px]">
      <div className="relative px-8">
        <p className="text-white text-start text-[16px] pb-6">
          Add wishing video for just £ 1.00
        </p>

        <div className="absolute bottom-0 left-0 w-full h-px 
        bg-linear-to-r from-[#30114E] via-white to-[#30114E]" />
      </div>

      {/* Video upload div */}
      {!videoPreview && !video ? (
        <div className="flex flex-col items-center justify-center gap-6 px-4 glass-card py-8 border border-[#5FDA78] rounded-[20px] cursor-pointer"
             onClick={handleLabelClick}>
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />

          {/* Video icon */}
          <Image 
            src="/images/video-upload.svg" 
            alt="add-video" 
            width={27} 
            height={27} 
          />

          {/* Upload text */}
          <p className="text-white font-light text-sm text-center">
            Video must not exceed 25MB
          </p>
        </div>
      ) : videoPreview ? (
        /* Video preview */
        <div className="relative px-4">
          <div className="relative rounded-[20px] overflow-hidden border border-[#5FDA78]">
            <video
              src={videoPreview}
              controls
              className="w-full h-auto max-h-64 object-cover"
            />
            
            {/* Close preview button */}
            <button
              onClick={handleClosePreview}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80 transition-colors"
              title="Close preview"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Video info and action buttons */}
          <div className="mt-4 text-center">
            <p className="text-[#5FDA78] font-medium text-sm mb-4">
              Selected: {video?.name}
            </p>
            
            {/* Action buttons */}
            <div className="flex justify-center gap-3">
              {/* Remove video button */}
              <button
                onClick={handleRemoveVideo}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition-colors"
              >
                <X size={16} />
                Remove
              </button>
              
              {/* Change video button */}
              <button
                onClick={handleChangeVideo}
                className="flex items-center gap-2 bg-[#5FDA78] text-white px-4 py-2 rounded-full text-sm hover:bg-[#4fc866] transition-colors"
              >
                <RotateCcw size={16} />
                Change
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Video uploaded but preview closed - show change button */
        <div className="relative px-4">
          <div className="flex flex-col items-center justify-center gap-6 px-4 glass-card py-8 border border-[#5FDA78] rounded-[20px]">
            <div className="flex items-center gap-3">
              <Image 
                src="/images/video-upload.svg" 
                alt="video-uploaded" 
                width={24} 
                height={24} 
              />
              <div className="text-center">
                <p className="text-[#5FDA78] font-medium text-sm">
                  Video uploaded: {video?.name}
                </p>
                <button
                  onClick={handleChangeVideo}
                  className="mt-2 text-[#5FDA78] text-sm underline hover:no-underline"
                >
                  Change video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for change video */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        className="hidden"
      />
    </div>
  )
}

export default WishVideo