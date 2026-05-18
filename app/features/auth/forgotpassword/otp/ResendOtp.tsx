"use client"

import { useEffect, useState } from "react"
import { useResendOtp } from "../../hooks/useResendOtp"

const ResendOtp = () => {
  const [timeLeft, setTimeLeft] = useState(58)
  const { resendOtp, isLoading: isResending } = useResendOtp()

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = window.setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleResendOtp = async () => {
    if (timeLeft > 0 || isResending) {
      return
    }

    const didResend = await resendOtp()
    if (didResend) {
      setTimeLeft(58)
    }
  }

  return (
    <div className="w-fit text-[#DDDDDD]">
      {timeLeft > 0 ? (
        <>
          <span>Resend OTP in</span>
          <span className="text-white ms-1">{formatTime(timeLeft)}</span>
        </>
      ) : (
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={isResending}
          className="border-b border-transparent hover:border-white transition-all duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isResending ? "Resending..." : "Resend OTP"}
        </button>
      )}
    </div>
  )
}

export default ResendOtp
