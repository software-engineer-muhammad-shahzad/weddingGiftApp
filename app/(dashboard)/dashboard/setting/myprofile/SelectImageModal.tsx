"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Camera, X, RefreshCcw, Image as ImageIcon } from "lucide-react"
import ModalLayer from "@/app/components/ui/ModalLayer"

interface SelectImageModalProps {
    isOpen: boolean
    onClose: () => void
    onImageSelect: (imageData: string) => void
    currentImage?: string
}

const SelectImageModal = ({ isOpen, onClose, onImageSelect, currentImage }: SelectImageModalProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(currentImage || null)
    const [isCameraActive, setIsCameraActive] = useState(false)
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true
            })

            streamRef.current = stream
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                videoRef.current.play()
                setIsCameraActive(true)
            }
        } catch (error) {
            console.error('Camera access denied:', error)
            alert('Camera access denied. Please allow camera permissions to use this feature.')
            setIsCameraActive(false)
        }
    }

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null
        }
        setIsCameraActive(false)
    }

    const handleCapture = () => {
        const video = videoRef.current
        const canvas = canvasRef.current
        if (video && canvas) {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const context = canvas.getContext('2d')
            context?.drawImage(video, 0, 0, canvas.width, canvas.height)
            const imageData = canvas.toDataURL('image/jpeg')
            setSelectedImage(imageData)
            stopCamera()
        }
    }

    const handleGallerySelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const imageData = e.target?.result as string
                setSelectedImage(imageData)
            }
            reader.readAsDataURL(file)
        }
    }

    const switchCamera = () => {
        stopCamera()
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user')
        setTimeout(() => startCamera(), 100)
    }

    const handleDone = () => {
        if (selectedImage) {
            onImageSelect(selectedImage)
            onClose()
        }
    }

    useEffect(() => {
        return () => {
            stopCamera()
        }
    }, [])

    useEffect(() => {
        if (isCameraActive) {
            startCamera()
        }
    }, [facingMode])

    return (
        isOpen && (
            <ModalLayer
                onClose={onClose}
                modalWidth="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[500px]"
                modalHeight="500px sm:h-[550px] md:h-[600px]"
                position="responsive"
                className="bg-clip-padding"
                overlayColor="bg-[#171515EB]"
            >
                <div className="bg-[#330065] w-full rounded-t-md md:rounded-md h-full flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-[#5FDA78]/20">
                        <button 
                            className="text-white hover:text-gray-300 transition-colors"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <h2 className="text-white text-lg font-semibold">Change Photo</h2>
                        <button 
                            className={`text-[#5FDA78] hover:text-[#4fc866] transition-colors ${!selectedImage ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleDone}
                            disabled={!selectedImage}
                        >
                            Done
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-4 flex flex-col items-center justify-center">
                        {/* Current/Selected Image Preview */}
                        <div className="w-32 h-32 rounded-full border-4 border-[#5FDA78] overflow-hidden mb-6">
                            {selectedImage ? (
                                <Image 
                                    src={selectedImage} 
                                    alt="Selected" 
                                    width={128} 
                                    height={128} 
                                    className="w-full h-full object-cover"
                                />
                            ) : currentImage ? (
                                <Image 
                                    src={currentImage} 
                                    alt="Current" 
                                    width={128} 
                                    height={128} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                                    <ImageIcon size={40} className="text-gray-400" />
                                </div>
                            )}
                        </div>

                        {/* Camera View */}
                        {isCameraActive && (
                            <div className="relative w-full max-w-sm">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="rounded-lg w-full"
                                />
                                <canvas ref={canvasRef} className="hidden" />
                                
                                {/* Camera Controls */}
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                                    <button 
                                        className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full"
                                        onClick={handleCapture}
                                    >
                                        <Camera size={20} />
                                    </button>
                                    
                                    <button 
                                        className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full"
                                        onClick={switchCamera}
                                    >
                                        <RefreshCcw size={20} />
                                    </button>
                                    
                                    <button 
                                        className="bg-red-500 text-white p-3 rounded-full"
                                        onClick={stopCamera}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4 border-t border-[#5FDA78]/20 space-y-3">
                        {/* Hidden file input */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleGallerySelect}
                            className="hidden"
                            id="gallery-input"
                            ref={fileInputRef}
                        />
                        
                        {/* Gallery Button */}
                        <button 
                            className="w-full bg-[#5FDA78] text-white py-3 rounded-lg hover:bg-[#4fc866] transition-colors flex items-center justify-center gap-2"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <ImageIcon size={20} />
                            <span>Select from Gallery</span>
                        </button>

                        {/* Camera Button */}
                        {!isCameraActive && (
                            <button 
                                className="w-full bg-white/20 backdrop-blur-sm text-white py-3 rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
                                onClick={startCamera}
                            >
                                <Camera size={20} />
                                <span>Take Photo</span>
                            </button>
                        )}

                        {/* Remove Photo (if image selected) */}
                        {selectedImage && (
                            <button 
                                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
                                onClick={() => setSelectedImage(null)}
                            >
                                Remove Photo
                            </button>
                        )}
                    </div>
                </div>
            </ModalLayer>
        )
    )
}

export default SelectImageModal