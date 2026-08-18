import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Button from "@/app/components/elements/Button"

const steps = [
    {
        number: "01",
        title: "Share your QR code.",
        description:
            "Download your unique code to add to your paper invitations, wedding website, or venue signage.",
    },
    {
        number: "02",
        title: "Collect gifts & memories.",
        description:
            "Receive seamless monetary blessings alongside warm, heartfelt digital cards and video messages.",
    },
]

const HeartDivider = () => (
    <div className="flex items-center w-full max-w-80 mx-auto my-8" aria-hidden>
        <div className="h-px flex-1 bg-white/35" />
        <svg
            className="mx-3 shrink-0"
            width="42"
            height="22"
            viewBox="0 0 42 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.5 19.5C10.5 19.5 1.5 13.2 1.5 7.4C1.5 4.4 3.8 2 6.7 2C8.5 2 10.1 2.9 10.5 4.4C10.9 2.9 12.5 2 14.3 2C17.2 2 19.5 4.4 19.5 7.4C19.5 13.2 10.5 19.5 10.5 19.5Z"
                stroke="white"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />
            <path
                d="M31.5 19.5C31.5 19.5 22.5 13.2 22.5 7.4C22.5 4.4 24.8 2 27.7 2C29.5 2 31.1 2.9 31.5 4.4C31.9 2.9 33.5 2 35.3 2C38.2 2 40.5 4.4 40.5 7.4C40.5 13.2 31.5 19.5 31.5 19.5Z"
                stroke="white"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />
        </svg>
        <div className="h-px flex-1 bg-white/35" />
    </div>
)

const page = () => {
    return (
        <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-[#330065] w-full max-w-382.5 flex justify-center mx-auto">
            <div className="w-full min-h-screen max-w-200 py-6 sm:py-8 relative flex flex-col px-5 sm:px-6">
                <Link href="/dashboard/setting" className="flex w-fit items-center gap-2">
                    <ChevronLeft className="text-white" />
                    <p className="text-white text-lg sm:text-xl md:text-2xl font-medium border-b border-transparent hover:border-white transition-all duration-300">
                        How It Works
                    </p>
                </Link>

                <div className="flex-1 flex flex-col pt-10 sm:pt-14">
                    <h1 className="text-center font-bold leading-tight">
                        <span className="block text-white text-4xl sm:text-5xl">2 Steps to</span>
                        <span className="block text-[#5FDA78] text-4xl sm:text-5xl mt-1">Share & Receive</span>
                    </h1>

                    <HeartDivider />

                    <div className="relative max-w-125 w-full mx-auto">
                        {steps.map((step, index) => (
                            <div key={step.number} className="relative flex gap-4 sm:gap-6 pb-10 last:pb-0">
                                <div className="flex flex-col items-start w-16 sm:w-20 shrink-0">
                                    <p className="text-[#5FDA78] text-sm font-medium">Step</p>
                                    <p className="text-[#5FDA78] text-4xl sm:text-5xl font-bold leading-none mt-1">
                                        {step.number}
                                    </p>
                                </div>

                                <div className="relative flex-1 pt-6">
                                    {index < steps.length - 1 ? (
                                        <span className="absolute left-[5px] top-9 bottom-[-2.6rem] w-px bg-[#5FDA78]" />
                                    ) : null}
                                    <span className="absolute left-0 top-8 w-2.5 h-2.5 rounded-full bg-[#5FDA78]" />
                                    <div className="ps-6">
                                        <h2 className="text-white text-lg sm:text-xl font-semibold">
                                            {step.title}
                                        </h2>
                                        <p className="text-white/90 text-sm sm:text-base font-light mt-2 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-8 pb-[max(1rem,env(safe-area-inset-bottom))]">
                    <div className="flex items-center justify-center gap-1.5 mb-6">
                        <span className="font-figtree text-white text-[17px] font-bold leading-5">Powered by :</span>
                        <Image src="/images/stripe-step.png" alt="Stripe" width={50} height={20} className="object-contain" />
                    </div>

                    <div className="flex justify-center">
                        <Link href="/dashboard/setting" className="w-full max-w-80">
                            <Button className="w-full py-3!">Got it</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
