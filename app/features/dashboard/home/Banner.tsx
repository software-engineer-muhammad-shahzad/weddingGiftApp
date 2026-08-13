"use client"

import { useRef, useState } from "react"
import { X, Download, Loader2 } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"
import html2canvas from "html2canvas-pro"
import type { Invite } from "@/app/features/dashboard/types/coupleDashboard"
import { ShagunLogo, WelcomeLogo } from "@/app/components/icons/Icons"
import { handleShare } from "@/app/utils/handleShareQr"
import ModalLayer from "@/app/components/ui/ModalLayer"
import Button from "@/app/components/elements/Button"
import { formatDateWithWeekday } from "@/app/utils/formatDate"

const QR_CANVAS_ID = "banner-qr-code-canvas"

interface BannerProps {
    inviteData: Invite | undefined
    coupleName?: string
    eventDate?: string
}

const Banner = ({ inviteData, coupleName = "OUR WEDDING", eventDate = "" }: BannerProps) => {
    const [isQrModalOpen, setIsQrModalOpen] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const inviteCardRef = useRef<HTMLDivElement>(null)

    const saveCanvasAsPng = (canvas: HTMLCanvasElement, fileName: string) =>
        new Promise<void>((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error("Failed to create invite card image"))
                    return
                }

                const objectUrl = URL.createObjectURL(blob)
                const link = document.createElement("a")
                link.href = objectUrl
                link.download = fileName
                link.rel = "noopener"
                link.style.display = "none"
                document.body.appendChild(link)

                // iOS Safari ignores data: URLs and needs the <a> to stay mounted
                // until the download actually starts.
                requestAnimationFrame(() => {
                    link.click()
                    window.setTimeout(() => {
                        link.remove()
                        URL.revokeObjectURL(objectUrl)
                        resolve()
                    }, 2000)
                })
            }, "image/png")
        })

    const handleDownload = async () => {
        if (!inviteCardRef.current || isDownloading) return

        try {
            setIsDownloading(true)

            const canvas = await html2canvas(inviteCardRef.current, {
                backgroundColor: "#2a0050",
                scale: 2,
                useCORS: true,
                allowTaint: true,
            })

            await saveCanvasAsPng(canvas, `${coupleName}-invite-card.png`)
        } catch (err) {
            console.error("Failed to download invite card:", err)
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <>
            <div className="mt-[clamp(0.5rem,2.5vw,4rem)] w-full max-w-full overflow-x-clip">
                {/* Shared fluid height — both images fill it exactly */}
                <div
                    className="mx-auto flex w-full items-stretch justify-center overflow-hidden"
                    style={{ height: "clamp(8.5rem, 46vw, 15.5rem)" }}
                >
                    {/* LEFT - QR */}
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setIsQrModalOpen(true)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault()
                                setIsQrModalOpen(true)
                            }
                        }}
                        className="relative z-10 mt-2.5 flex h-full shrink-0 cursor-pointer items-stretch -mr-[clamp(0.75rem,4vw,2.5rem)]"
                        aria-label="Open QR download"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/qr-code.png"
                            alt="QR Download"
                            className="pointer-events-none h-full w-auto max-h-full select-none"
                            draggable={false}
                        />
                    </div>

                    {/* RIGHT - Invite card */}
                    <div className="relative z-0 ml-[30px] flex h-full min-w-0 flex-1 items-stretch">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/send-card.png"
                            alt="Invite Guest"
                            className="h-full w-auto max-h-full max-w-full object-contain object-left select-none"
                            draggable={false}
                        />

                        {/* Invisible hit-area over the "Send" pill baked into the card image */}
                        <button
                            type="button"
                            onClick={() => {
                                if (!inviteData?.inviteUrl) return
                                handleShare(coupleName, inviteData.inviteUrl)
                            }}
                            aria-label="Share invite"
                            className="absolute right-[4%] bottom-[8%] z-10 h-[18%] min-h-10 w-[30%] min-w-10 cursor-pointer border-0 bg-transparent p-0 sm:right-[5%] sm:bottom-[9%] sm:h-[16%] sm:w-[28%]"
                        />
                    </div>
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
                            <div ref={inviteCardRef} className="bg-[#2a0050] rounded-2xl">
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

                                <p className="text-center text-white/70 text-sm pb-4">{formatDateWithWeekday(eventDate)}</p>
                            </div>

                            {/* Download button */}
                            <div className="flex justify-center pb-6">
                                <Button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="w-12 h-12 sm:w-10 sm:h-10 p-2 rounded-full! bg-[#2a0050]! text-white! border-[#5FDA78]! disabled:opacity-50"
                                    aria-label="Download invite card"
                                >
                                    {isDownloading ? (
                                        <Loader2 className="w-5 h-5 sm:w-4.5 sm:h-4.5 animate-spin" />
                                    ) : (
                                        <>
                                            <Download size={22} className="sm:hidden" />
                                            <Download size={18} className="hidden sm:block" />
                                        </>
                                    )}
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