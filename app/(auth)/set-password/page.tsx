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
    const email = getData("email", "session")

    return (

        <div className="bg-[#350366] min-h-screen w-full py-10 lg:py-15.5 px-6 lg:px-20 overflow-auto">

            {/* SUCCESS MODAL */}
            {isModalOpen && (
                <ModalLayer
                    onClose={() => setIsModalOpen(false)}
                    className="z-9999 rounded-4xl border border-[#5FDA78]"
                    modalHeight="auto"
                >
                    <div
                        className="p-4 rounded-4xl"
                        style={{
                            background: `
                              radial-gradient(38.46% 38.46% at 11.54% 19.23%, 
                                rgba(255, 235, 255, 0) 0%, 
                                rgba(230, 255, 240, 0) 70%, 
                                rgba(240, 240, 255, 0) 100%
                              ),
                              linear-gradient(316.97deg, 
                                rgba(255, 255, 255, 0.044) 17.24%, 
                                rgba(255, 255, 255, 0) 58.62%, 
                                rgba(217, 235, 255, 0) 86.21%
                              ),
                              linear-gradient(0deg, 
                                rgba(0, 0, 0, 0.066) 0%, 
                                rgba(0, 0, 0, 0.022) 30%, 
                                rgba(0, 0, 0, 0) 70%, 
                                rgba(0, 0, 0, 0) 100%
                              ),
                              linear-gradient(0deg, 
                                rgba(255, 255, 255, 0.01), 
                                rgba(255, 255, 255, 0.01)
                              )
                            `,
                            backdropFilter: "blur(25px)",
                            WebkitBackdropFilter: "blur(25px)",
                        }}
                    >

                        <p className="font-semibold text-3xl text-white mb-2">
                            Successful
                        </p>

                        <p className="font-light text-white text-lg">
                            Your password has been successfully updated.
                        </p>

                        <div className="flex justify-end mt-8">
                            <Link
                                href="/login"
                                onClick={() => setIsModalOpen(false)}
                                className="px-5 py-2 text-xl text-[#330065] hover:bg-[#4ecb68] bg-[#5FDA78] rounded-[38px]"
                            >
                                Close
                            </Link>
                        </div>

                    </div>
                </ModalLayer>
            )}

            {/* CONTENT */}
            <div className="flex md:flex-row md:mt-14 flex-col w-full h-full md:items-center relative">

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
            <div className="fixed -top-22.5 right-0 md:top-10 md:left-0 md:right-auto">

                <Image
                    src="/images/bg-images/left-rainbow.png"
                    alt="Rainbow"
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