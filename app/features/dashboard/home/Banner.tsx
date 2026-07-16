"use client"

import { useState } from "react"
import { MoveRight, X, Download } from "lucide-react"
import Image from "next/image"
import { QRCodeCanvas } from "qrcode.react"
import type { Invite } from "@/app/features/dashboard/types/coupleDashboard"
import { DownloadLogo, InviteNowBadge, ShagunLogo, ShareIcon, WelcomeLogo } from "@/app/components/icons/Icons"
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
            <div className="flex overflow-hidden justify-between items-center  md:gap-1 mt-10 md:mt-16">

                {/* LEFT IMAGE */}
                <div className="h-46 sm:h-55 md:h-55 shrink-0">

                    <button onClick={() => setIsQrModalOpen(true)} className="cursor-pointer block h-full">

                        <DownloadLogo className="h-full w-auto" />
                    </button>

                </div>

                {/* RIGHT BANNER */}
                <div className="relative h-32 sm:h-28 md:h-36 shrink-0">
                    <InviteNowBadge className="h-full w-auto block" />
                    <div className="absolute left-[5%] bottom-[8%] right-[27%] z-10">
                        <p className="text-xs sm:text-sm md:text-md text-[#330065] font-normal">Invite Now</p>
                        <p className="text-lg sm:text-xl md:text-2xl text-[#330065] font-semibold leading-tight">Invite<br />
                            Guest</p>
                    </div>

                    <div className="absolute w-[11%] aspect-square top-[16%] left-[5%] cursor-pointer z-10">
                        <ShareIcon className="w-full h-full" />
                    </div>

                    <a href={inviteData?.inviteUrl || "#"} target="_blank" rel="noopener noreferrer">
                        <button
                            className="group absolute right-[4%] bottom-[10%] z-10 cursor-pointer border-white gap-1 text-white px-3 py-1.5 flex justify-center items-center rounded-[30px] text-xs sm:text-sm md:text-sm font-light backdrop-blur-[25px] transition-all duration-300"
                            style={{
                                background: `
      radial-gradient(38.46% 38.46% at 11.54% 19.23%, rgba(255, 235, 255, 0) 0%, rgba(230, 255, 240, 0) 70%, rgba(240, 240, 255, 0) 100%),
      linear-gradient(316.97deg, rgba(255, 255, 255, 0.044) 17.24%, rgba(255, 255, 255, 0) 58.62%, rgba(217, 235, 255, 0) 86.21%),
      linear-gradient(0deg, rgba(0, 0, 0, 0.066) 0%, rgba(0, 0, 0, 0.022) 30%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0) 100%),
      linear-gradient(0deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01))
    `,
                                boxShadow: `
      0px 0px 1.5px 0px #FF264000 inset,
      0px 0px 1.5px 0px #2673FF00 inset,
      0px 0px 8px 0px #D1E5FF00 inset,
      0px 3px 12px -3px #00000026
    `,
                            }}
                        >
                            Send
                            <MoveRight className="text-white ml-0 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </a>
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