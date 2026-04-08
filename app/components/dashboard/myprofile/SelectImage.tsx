"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Camera, X, RefreshCcw, ChevronLeft } from "lucide-react"
import Link from "next/link"

const SelectImage = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const [isCameraActive, setIsCameraActive] = useState(false)
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')

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

                <Image src="/images/profile-image-edit.png" alt="error" width={290} height={100} />
                {/* back link */}
                <div className="absolute top-4 left-2">
                    <Link href="/dashboard/setting" className="flex w-fit items-center gap-2">
                        <ChevronLeft className='text-white' />
                        <p className="text-white text-2xl">Capture</p>

                    </Link>
                </div>


            </div>
        </div>
    )
}

export default SelectImage