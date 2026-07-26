"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import SignupLeft from "../../features/auth/signup/SignupLeft"
import SetPasswordForm from "../../features/auth/setpassword/SetPasswordForm"
import ModalLayer from "../../components/ui/ModalLayer"

import { getData } from "@/app/utils/storage/storageHelper"

const Page = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    // ✅ Get email from session storage
    const email = getData<string>("email", "local")

    return (

        <div className="relative bg-[#350366] min-h-screen w-full py-10 lg:py-15.5 px-6 lg:px-20 overflow-auto">

            {/* SUCCESS MODAL */}
            {isModalOpen && (
                <ModalLayer
                    onClose={() => setIsModalOpen(false)}
                    className="rounded-[28px] border border-white/30 overflow-hidden"
                    modalHeight="auto"
                    modalWidth="w-[90%] max-w-[400px]"
                    position="center"
                    overlayColor="bg-[#330065]/70 backdrop-blur-[8px]"
                >
                    <div className="glass-card p-5 sm:p-6 rounded-[28px] bg-[#2a0050]/55">
                        <p className="font-semibold text-2xl sm:text-3xl text-white mb-2">
                            Successful
                        </p>

                        <p className="font-light text-white/90 text-base sm:text-lg">
                            Your password has been successfully updated.
                        </p>

                        <div className="flex justify-end mt-8">
                            <Link
                                href="/login"
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2.5 text-lg text-[#330065] hover:bg-[#4ecb68] bg-[#5FDA78] rounded-full font-medium transition-colors"
                            >
                                Close
                            </Link>
                        </div>
                    </div>
                </ModalLayer>
            )}

            {/* CONTENT */}
            <div className="relative z-10 flex md:flex-row md:mt-14 flex-col w-full h-full md:items-center">

                {/* LEFT */}
                <div className="flex-1">
                    <SignupLeft />
                </div>

                {/* RIGHT */}
                <div className="flex-1 mt-9 lg:mt-0 md:ps-10 lg:ps-20 md:pt-30">

                    <SetPasswordForm
                        setIsModalOpen={setIsModalOpen}
                        isModalOpen={isModalOpen}
                        email={email}
                    />

                </div>

            </div>

            {/* BG IMAGE */}
            <div className="pointer-events-none fixed -top-22.5 right-0 z-0 md:top-10 md:left-0 md:right-auto" aria-hidden>

                <Image
                    src="/images/bg-images/left-rainbow.png"
                    alt=""
                    width={700}
                    height={700}
                    loading="eager"
                    style={{ width: 'auto', height: 'auto' }}
                    className="object-contain scale-x-[-1] md:scale-x-100"
                />

            </div>

        </div>
    )
}

export default Page