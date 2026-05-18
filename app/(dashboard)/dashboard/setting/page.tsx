"use client"
import { FaqsIcon } from "@/app/components/icons/Icons"
import { ChevronLeft, ChevronRight, Landmark, LogOut, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ModalLayer from "@/app/components/ui/ModalLayer"
import { useState } from "react"

const page = () => {
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('no');

    return (
        <div className="min-h-screen overflow-auto w-full max-w-382.5 flex justify-center mx-auto ">
            <div className="w-full bg-[#330065] max-w-200 py-8 border   border-yellow-500  px-6">
                {/* notification header */}
                <Link href="/dashboard" className="flex w-fit items-center gap-2">
                    <ChevronLeft className='text-white' />
                    <p className="text-white text-2xl border-b border-transparent hover:border-white transition-all duration-300">Settings</p>
                </Link>

                {/* personal info */}
                <div className="">
                    <p className="text-white text-lg font-semibold mt-10">Personal Information</p>

                    {/* profile-info */}
                    <Link href="/dashboard/setting/myprofile" className="flex justify-between items-center mt-10">
                        <div className="flex items-center gap-5">
                            <div className="border border-[#5FDA78] w-12 h-12 rounded-full flex justify-center items-center">
                                <User className="text-white" />
                            </div>
                            <p className="text-white text-sm font-medium ">My Profile</p>
                        </div>
                        {/* icon */}
                        <ChevronRight className="text-white" />
                    </Link>
                </div>
                {/* bank info */}
                <Link href="/dashboard/setting/bank-info" className="flex justify-between items-center mt-10">
                    <div className="flex items-center gap-5">
                        <div className="border border-[#5FDA78] w-12 h-12 rounded-full flex justify-center items-center">
                            <Landmark className="text-white" />
                        </div>
                        <p className="text-white text-sm font-medium ">Bank Information</p>
                    </div>
                    {/* icon */}
                    <ChevronRight className="text-white" />
                </Link>
                {/* faqs */}
                <Link href="/dashboard/setting/how-works" className="flex justify-between items-center mt-10 w-full">
                    <div className="flex items-center gap-5 w-full">
                        <div className="border border-[#5FDA78] w-12 h-12 rounded-full flex justify-center items-center">
                            <FaqsIcon />
                        </div>
                        {/* icon */}
                        <p className="text-white text-sm font-medium ">How It Works</p>
                    </div>
                    <ChevronRight className="text-white" />
                </Link>
                {/* logout */}
                <div className="flex justify-between items-center mt-10 w-full cursor-pointer" onClick={() => setIsLogoutOpen(true)}>
                    <div className="flex items-center gap-5 w-full">
                        <div className="border border-[#5FDA78] w-12 h-12 rounded-full flex justify-center items-center">
                            <LogOut className="text-white" />
                        </div>
                        <p className="text-white text-sm font-medium ">Logout</p>
                        {/* icon */}
                    </div>
                    <ChevronRight className="text-white" />
                </div>
                {/* logout modal */}
                {isLogoutOpen && (
                    <ModalLayer
                        onClose={() => setIsLogoutOpen(false)}
                        modalWidth="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[500px]"
                        modalHeight="300px"
                        position="responsive"
                        className="bg-clip-padding "
                        overlayColor="bg-[#171515EB]"
                    >
                        <div className="bg-[#5FDA78] w-full rounded-t-md  md:rounded-md h-full flex flex-col items-center justify-center py-3 md:py-6 px-4 overflow-hidden">
                            <div className="w-16 h-16" >
                                <Image
                                    src="/images/logout-modal-alert.png"
                                    alt="logout-modal-alert"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <p className="text-[#330065] text-sm ">Are you sure you want to logout?</p>
                            <div className="flex gap-3 md:gap-2 pb-2 mt-6 md:mt-8 ">
                                <button
                                    onClick={() => {
                                        setActiveButton('no');
                                        setIsLogoutOpen(false);
                                    }}
                                    className={`border border-[#330065] px-4 cursor-pointer py-2 h-12 w-20 rounded-[20px] transition-colors ${activeButton === 'no'
                                            ? 'bg-[#330065] text-[#5FDA78]'
                                            : 'text-[#330065] hover:bg-[#330065] hover:text-[#5FDA78]'
                                        }`}
                                >
                                    No
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveButton('yes');
                                        // Redirect to login page after logout
                                        window.location.href = '/login';
                                    }}
                                    className={`border border-[#330065] py-2 h-12 cursor-pointer rounded-[20px] w-20 px-4 transition-colors ${activeButton === 'yes'
                                            ? 'bg-[#330065] text-[#5FDA78]'
                                            : 'text-[#330065] hover:bg-[#330065] hover:text-[#5FDA78]'
                                        }`}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </ModalLayer>
                )}
            </div>
        </div>
    )
}

export default page