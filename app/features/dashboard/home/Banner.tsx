"use client"

import { useState } from "react"
import { X, Download } from "lucide-react"
import Image from "next/image"
import { QRCodeCanvas } from "qrcode.react"
import type { Invite } from "@/app/features/dashboard/types/coupleDashboard"
import { ShagunLogo, ShareIcon, WelcomeLogo } from "@/app/components/icons/Icons"
import { downloadQRCode } from "@/app/utils/handleDownloadQr"
import ModalLayer from "@/app/components/ui/ModalLayer"
import Button from "@/app/components/elements/Button"

const QR_CANVAS_ID = "banner-qr-code-canvas"

interface BannerProps {
    inviteData: Invite | undefined
    coupleName?: string
    eventDate?: string
}

const Banner = ({ inviteData, coupleName = "OUR WEDDING", eventDate = "" }: BannerProps) => {
    const [isQrModalOpen, setIsQrModalOpen] = useState(false)

    const handleDownload = () => {
        downloadQRCode(QR_CANVAS_ID, coupleName)
    }

    return (
        <>
            <div className="flex w-full max-w-full items-center justify-start gap-2 xs:gap-3 xs2:gap-4 sm:gap-5 mt-2 sm:mt-6 md:mt-10 lg:mt-16">

                {/* LEFT - QR Download */}
                <div className="h-36 xs:h-44 xs2:h-52 sm:h-55 md:h-55 shrink-0 -mr-2 xs:-mr-3 xs2:-mr-4 sm:-mr-5">
                    <button
                        onClick={() => setIsQrModalOpen(true)}
                        className="cursor-pointer h-full block leading-none"
                        aria-label="Open QR download"
                    >
                        <Image
                            src="/images/qr-code.png"
                            alt="QR Download"
                            width={584}
                            height={1152}
                            className="h-full w-auto object-contain object-right"
                            sizes="(max-width: 370px) 72px, (max-width: 400px) 80px, (max-width: 640px) 88px, 96px"
                            priority
                        />
                    </button>
                </div>

                {/* RIGHT - Invite Guest */}
                <div className="relative flex-1 min-w-0 h-28 xs:h-32 xs2:h-36 sm:h-40 md:h-44 -ml-2 xs:-ml-4 xs2:-ml-6 sm:-ml-8 md:-ml-10">
                    <Image
                        src="/images/send-card.png"
                        alt="Invite Guest"
                        width={1320}
                        height={820}
                        className="h-full w-full object-contain object-left block"
                        sizes="(max-width: 370px) 220px, (max-width: 400px) 260px, (max-width: 640px) 300px, 340px"
                    />

                    {/* Invisible hit-area over the "Send" pill baked into the card image */}
                    <a
                        href={inviteData?.inviteUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Send invite"
                        className="absolute right-[5%] bottom-[9%] w-[28%] h-[15%] z-10 cursor-pointer"
                    />
                </div>
            </div>

            {/* QR Code Modal */}
            {isQrModalOpen && (
                <ModalLayer
                    onClose={() => setIsQrModalOpen(false)}
                    overlayColor="bg-black/60"
                    position="center"
                    modalHeight="auto"
                    modalWidth="w-full md:max-w-[390px] mx-4"
                >
                    <div className="w-full">
                        {/* Close button */}
                        <div className="flex justify-end mb-2">
                            <Button
                                onClick={() => setIsQrModalOpen(false)}
                                className="w-8 h-8 p-2 rounded-full! bg-white/10! hover:bg-white/20! text-white! border-0! text-base! transition-colors duration-200"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        {/* QR CARD */}
                        <div className="bg-[#2a0050] rounded-2xl border border-white/10 shadow-2xl">
                            <div className="flex justify-between items-center p-4">
                                <ShagunLogo />
                                <span className="text-white font-bold">stripe</span>
                            </div>

                            <div className="text-center">
                                <WelcomeLogo />
                                <p className="text-white/60 text-xs mt-1 uppercase">To Our Wedding</p>
                                <p className="text-white font-bold mt-1">{coupleName}</p>
                            </div>

                            <div className="flex justify-center my-5">
                                <div className="bg-white p-3 rounded-xl">
                                    <QRCodeCanvas
                                        id={QR_CANVAS_ID}
                                        value={inviteData?.inviteUrl || " "}
                                        size={160}
                                        bgColor="#ffffff"
                                        fgColor="#330065"
                                        level="H"
                                    />
                                </div>
                            </div>

                            <p className="text-center text-white/70 text-sm pb-4">{eventDate}</p>

                            {/* Download button */}
                            <div className="flex justify-center pb-6">
                                <Button
                                    onClick={handleDownload}
                                    className="w-12 h-12 sm:w-10 sm:h-10 p-2 rounded-full! bg-[#2a0050]! text-white! border-[#5FDA78]!"
                                >
                                    <Download size={22} className="sm:hidden" />
                                    <Download size={18} className="hidden sm:block" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </ModalLayer>
            )}
        </>
    )
}

export default Banner