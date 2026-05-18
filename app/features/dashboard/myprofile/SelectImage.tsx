"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Camera, X, RefreshCcw, ChevronLeft, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

interface SelectImageProps {
    setIsImageOpen: (value: boolean) => void
}

const SelectImage = ({ setIsImageOpen }: SelectImageProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const [isCameraActive, setIsCameraActive] = useState(false)
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')
    const [showGallery, setShowGallery] = useState(false)

    // Auto-start camera when component mounts
    useEffect(() => {
        startCamera()
        return () => {
            stopCamera()
        }
    }, [])

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: facingMode }
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
        }
    }

    const handleGallerySelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const switchCamera = () => {
        stopCamera()
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user')
        setTimeout(() => startCamera(), 100)
    }

    useEffect(() => {
        if (isCameraActive) {
            startCamera()
        } else {
            stopCamera()
        }
    }, [isCameraActive, facingMode])

    return (
        <div className="h-screen overflow-auto w-full max-w-382.5 flex justify-center mx-auto">
            <div className="w-full h-full relative flex justify-center bg-[#330065] max-w-200 px-3 py-10">

                {/* Selected Image Preview */}
                {selectedImage && (
                    <div className="absolute top-4 right-4 z-10">
                        <div className="relative">
                            <Image 
                                src={selectedImage} 
                                alt="Selected" 
                                width={100} 
                                height={100} 
                                className="rounded-lg border-2 border-white"
                            />
                            <button 
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Camera View */}
                {isCameraActive && (
                    <div className="relative">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="rounded-lg w-full max-w-sm"
                        />
                        <canvas ref={canvasRef} className="hidden" />
                        
                        {/* Camera Controls */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
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

                {/* Main Controls */}
                <div className="absolute top-4 left-2 right-2 flex justify-between">
                    <button 
                        className="flex w-fit items-center cursor-pointer gap-2" 
                        onClick={() => setIsImageOpen(false)}
                    >
                        <ChevronLeft className='text-white' />
                        <p className="text-white text-2xl ">Back</p>
                    </button>

                    {/* Gallery Button */}
                    <button 
                        className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full"
                        onClick={() => setShowGallery(!showGallery)}
                    >
                        <ImageIcon size={20} />
                    </button>
                </div>

                {/* Gallery Modal */}
                {showGallery && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-[#330065] rounded-lg p-6 max-w-sm w-full mx-4">
                            <h3 className="text-white text-lg font-semibold mb-4">Select from Gallery</h3>
                            
                            {/* Gallery Input */}
                            <div className="mb-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleGallerySelect}
                                    className="hidden"
                                    id="gallery-input"
                                />
                                <label 
                                    htmlFor="gallery-input"
                                    className="bg-[#5FDA78] text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-[#4fc866] transition-colors flex items-center gap-2"
                                >
                                    <ImageIcon size={20} />
                                    <span>Choose from Gallery</span>
                                </label>
                            </div>
                            
                            {/* Gallery Actions */}
                            <div className="flex gap-3">
                                <button 
                                    className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                                    onClick={() => setShowGallery(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Camera Button (shown when camera is not active) */}
                {!isCameraActive && !selectedImage && (
                    <button 
                        className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full absolute bottom-4 right-4"
                        onClick={startCamera}
                    >
                        <Camera size={24} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SelectImage