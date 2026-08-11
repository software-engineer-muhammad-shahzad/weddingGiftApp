"use client"

import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Button from "@/app/components/elements/Button"

interface TitlePart {
    text: string
    highlight?: boolean
}

interface HowItWorksStep {
    titleParts: TitlePart[]
    description: string
}

const steps: HowItWorksStep[] = [
    {
        titleParts: [{ text: "Create ", highlight: true }, { text: "Your Shagun Page" }],
        description:
            "Share your personalized wedding page and share your link with family and friends through invitations, WhatsApp, Email, or social media.",
    },
    {
        titleParts: [{ text: "Guest ", highlight: true }, { text: "Send Their Shagun" }],
        description:
            "Guests choose an amount, leave a message and send their shagun with love.",
    },
    {
        titleParts: [{ text: "Pay ", highlight: true }, { text: "Securely Online" }],
        description:
            "Pay securely using Credit/Debit Card",
    },
    {
        titleParts: [{ text: "Receive ", highlight: true }, { text: "Your Shagun Instantly" }],
        description:
            "Get notified instantly for every contribution. Track your total and read heartfelt messages.",
    },
]

const page = () => {
    const [step, setStep] = useState(0)
    const current = steps[step]
    const isLastStep = step === steps.length - 1

    const handleNext = () => {
        if (!isLastStep) setStep((prev) => prev + 1)
    }

    return (
        <div className="min-h-screen overflow-x-hidden overflow-y-auto bg-[#330065] w-full max-w-382.5 flex justify-center mx-auto">
            <div className="w-full min-h-screen max-w-200 py-6 sm:py-8 relative flex flex-col px-4 sm:px-3">
                {/* back navigation */}
                <Link href="/dashboard/setting" className="flex w-fit items-center gap-2">
                    <ChevronLeft className="text-white" />
                    <p className="text-white text-lg sm:text-xl md:text-2xl font-medium border-b border-transparent hover:border-white transition-all duration-300">
                        How It Works
                    </p>
                </Link>

                {/* title + description centered on screen */}
                <div className="flex-1 flex flex-col items-center justify-center px-2">
                    <h2 className="text-center text-4xl sm:text-3xl font-bold">
                        {current.titleParts.map((part, index) => (
                            <span
                                key={index}
                                className={`block ${part.highlight ? "text-[#5FDA78]" : "text-white"}`}
                            >
                                {part.text.trim()}
                            </span>
                        ))}
                    </h2>

                    <p className="text-white font-figtree text-base text-center font-light font-size-16 mt-3 max-w-125 mx-auto">
                        {current.description}
                    </p>

                    <div className="flex items-center justify-center gap-1.5 mt-4">
                        <span className="font-figtree text-white text-[17px] font-bold leading-5 tracking-[0%] text-center">Powered by :</span>
                        <Image src="/images/stripe-step.png" alt="Stripe" width={50} height={20} className="object-contain" />
                    </div>
                </div>

                {/* next / got it button + steps pinned to screen bottom */}
                <div className="mt-auto pt-8 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <div className="flex justify-center mb-6">
                        {isLastStep ? (
                            <Link href="/dashboard/setting" className="w-full max-w-80">
                                <Button className="w-full py-3!">Got it</Button>
                            </Link>
                        ) : (
                            <Button onClick={handleNext} className="w-full max-w-80 py-3!">
                                Next
                            </Button>
                        )}
                    </div>

                    <div className="flex justify-center gap-2">
                        {steps.map((_, index) => (
                            <span
                                key={index}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === step ? "w-6 bg-[#5FDA78]" : "w-1.5 bg-white/30"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
