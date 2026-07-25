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
    image: string
    titleParts: TitlePart[]
    description: string
}

const steps: HowItWorksStep[] = [
    {
        image: "/images/share-gift-link.png",
        titleParts: [{ text: "Share ", highlight: true }, { text: "Your Gift Link" }],
        description:
            "Share your personalized gift link or QR code with family and friends through invitations, WhatsApp, Email, or social media.",
    },
    {
        image: "/images/send-gift.png",
        titleParts: [{ text: "Choose & Send " }, { text: "Gifts", highlight: true }],
        description:
            "Guests select a greeting card or video, enter the gift amount, and add a personal message to make their gift more meaningful.",
    },
    {
        image: "/images/pay-online.png",
        titleParts: [{ text: "Pay ", highlight: true }, { text: "Securely Online" }],
        description:
            "Guests complete their payment securely through Stripe using their preferred payment method. No account or registration is required.",
    },
    {
        image: "/images/received-gift.png",
        titleParts: [{ text: "Receive ", highlight: true }, { text: "Gift Instantly" }],
        description:
            "As soon as a payment is successful, the funds are securely transferred to your linked account in real time, and you can track every gift and message from your dashboard.",
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
            <div className="w-full h-full max-w-200 py-6 sm:py-8 relative flex flex-col px-4 sm:px-3">
                {/* back navigation */}
                <Link href="/dashboard/setting" className="flex w-fit items-center gap-2">
                    <ChevronLeft className="text-white" />
                    <p className="text-white text-lg sm:text-xl md:text-2xl font-medium border-b border-transparent hover:border-white transition-all duration-300">
                        How It Works
                    </p>
                </Link>

                {/* step illustration */}
                <div className="flex justify-center mt-10 sm:mt-14">
                    <div className="relative w-56 h-56 sm:w-72 sm:h-72">
                        <Image
                            src={current.image}
                            alt={current.titleParts.map((part) => part.text).join("")}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* title */}
                <h2 className="text-center text-4xl sm:text-3xl font-bold mt-6">
                    {current.titleParts.map((part, index) => (
                        <span key={index} className={part.highlight ? "text-[#5FDA78]" : "text-white"}>
                            {part.text}
                        </span>
                    ))}
                </h2>

                {/* description */}
                <p className="text-white  font-figtree text-base text-center font-light mt-3 max-w-125 mx-auto">
                    {current.description}
                </p>

                {/* powered by stripe */}
                <div className="flex items-center justify-center gap-1.5 mt-4">
                    <span className="font-figtree text-white text-[17px] font-bold leading-5 tracking-[0%] text-center">Powered by :</span>
                    <Image src="/images/stripe-step.png" alt="Stripe" width={50} height={20} className="object-contain" />
                </div>

                {/* next / got it button */}
                <div className="flex justify-center mt-8 mb-6">
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

                {/* step indicator */}
                <div className="flex justify-center gap-2 mb-4">
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
    )
}

export default page
