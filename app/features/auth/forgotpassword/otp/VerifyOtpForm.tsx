"use client"
import Button from "../../../../components/elements/Button"
import { useState, useEffect } from 'react'
import Input from "../../../../components/elements/Input"
import { Delete } from "lucide-react"
import { useRouter } from "next/navigation"
import { useVerifyOtp } from "@/app/features/auth/hooks/useVerifyOtp"
import { showError } from "@/app/lib/toast"
import ResendOtp from "./ResendOtp"

interface VerifyOtpFormProps {

    source: string,
    showPaymentSuccess: boolean,
    setShowPaymentSuccess: (value: boolean) => void

}
const VerifyOtpForm = ({ source, showPaymentSuccess, setShowPaymentSuccess }: VerifyOtpFormProps) => {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])

    const router = useRouter()
    const { verifyOtp, isLoading: isVerifying } = useVerifyOtp()

    const handleVerifyOtp = async () => {
        const code = otp.join("")

        if (code.length !== 6) {
            showError("Please enter the 6-digit OTP.")
            return
        }

        const isSuccess = await verifyOtp(code)
        if (!isSuccess) return

        if (source === "payment") {
            setShowPaymentSuccess(true)
        } else if (source === "forgot-password") {
            router.push("/set-password")
        } else {
            router.push("/dashboard")
        }
    }

    useEffect(() => {
        if (otp.every(d => d !== '')) {
            console.log('OTP complete:', otp.join(''))
        }
    }, [otp])
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()

        const pastedData = e.clipboardData.getData('text').trim()

        // Only allow numbers
        if (!/^\d+$/.test(pastedData)) return

        const digits = pastedData.slice(0, 6).split('') // limit to 6 digits
        const newOtp = [...otp]

        digits.forEach((digit, index) => {
            newOtp[index] = digit
        })

        setOtp(newOtp)

        // Focus last filled input
        const lastIndex = digits.length - 1
        const input = document.getElementById(`otp-${lastIndex}`) as HTMLInputElement
        input?.focus()
    }
    const handleOtpChange = (index: number, value: string) => {
        if (value !== '' && !/^\d$/.test(value)) return

        if (value.length <= 1) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            // Auto-focus next input
            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
                nextInput?.focus()
            }
        }
    }

    const handleKeyPress = (key: string) => {
        const emptyIndex = otp.findIndex(digit => digit === '')
        if (emptyIndex !== -1 && key >= '0' && key <= '9') {
            handleOtpChange(emptyIndex, key)
        }
    }

    const handleBackspace = () => {
        const lastFilledIndex = otp.map((digit, index) => digit !== '' ? index : -1).filter(index => index !== -1).pop()
        if (lastFilledIndex !== undefined && lastFilledIndex >= 0) {
            handleOtpChange(lastFilledIndex, '')
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        const key = e.key

        // 👉 Move Right
        if (key === 'ArrowRight' && index < 5) {
            const next = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
            next?.focus()
        }

        // 👉 Move Left
        if (key === 'ArrowLeft' && index > 0) {
            const prev = document.getElementById(`otp-${index - 1}`) as HTMLInputElement
            prev?.focus()
        }

        // 👉 Backspace behavior
        if (key === 'Backspace') {
            if (otp[index]) {
                // just clear current
                handleOtpChange(index, '')
            } else if (index > 0) {
                // move to previous
                const prev = document.getElementById(`otp-${index - 1}`) as HTMLInputElement
                prev?.focus()
                handleOtpChange(index - 1, '')
            }
        }
    }

    return (
        <div className="flex flex-col  lg:items-end   ">


            {/* OTP Content */}
            <div className="flex-1 flex flex-col">
                <div className="flex flex-col mb-8">
                    <p className="font-light text-4xl text-white mb-2">Verify <span className="font-medium">OTP</span></p>
                    <p className="text-white font-light text-xl">Please enter the OTP we just sent to email</p>
                </div>

                {/* OTP Input Fields */}
                <div className="grid grid-cols-6 gap-2 md:gap-2 mb-8 ">
                    {otp.map((digit, index) => (
                        <Input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            inputMode="none"
                            pattern="[0-9]*"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onPaste={handlePaste}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            containerClassName={` w-11 sm:w-12 md:w-14 h-11 sm:h-12 md:h-14  p-0 rounded-full flex items-center justify-center ${digit ? 'bg-white ' : 'text-black! bg-[#2C2C2C6E]'}`}
                            className={`w-full h-full text-center  outline-0  bg-transparent ${digit ? 'text-black!' : 'text-white!'}`}
                            maxLength={1}
                            paddingClass="px-0!"
                        />
                    ))}
                </div>

                {/* Resend OTP Timer */}
                <div className="flex justify-center mb-8">
                    <ResendOtp />
                </div>

                {/* Continue Button */}
                <div className="mb-8 w-full">
                    <Button type="button" onClick={handleVerifyOtp} disabled={isVerifying} className="w-full px-10 py-3!   ">
                        {isVerifying ? "Verifying..." : "Continue"}
                    </Button>
                </div>

                {/* Numeric Keypad */}
                <div className="mt-auto md:hidden">
                    <div className="grid grid-cols-3 place-items-center gap-1 max-w-xs mx-auto ">
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', ''].map((key, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (key === '') {
                                        handleBackspace()
                                    } else if (key !== '.') {
                                        handleKeyPress(key)
                                    }
                                }}
                                className={`w-23 h-12 rounded-[36px] ${key === '' ? 'bg-white text-black!' : 'bg-[#2C2C2C6E]'} cursor-pointer text-white text-lg font-light hover:bg-[#3C3C3C8E] transition-colors flex items-center justify-center`}
                            >
                                {key === '' ? <Delete size={20} /> : key}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default VerifyOtpForm