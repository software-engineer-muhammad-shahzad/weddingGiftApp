"use client"

import { Copy, Share2, Download } from "lucide-react"
import Link from "next/link"
import { ShagunLogo, WelcomeLogo } from "@/app/components/icons/Icons"
import { handleShare } from "@/app/utils/handleShareQr"
import { formatDateWithWeekday } from "@/app/utils/formatDate"
import { useEffect, useMemo, useRef, useState } from "react"
import { useQrCode } from "@/app/features/dashboard/qrCode/hooks/useGetQrCodeUrl"
import { getQrCodeImage } from "@/app/features/dashboard/qrCode/api/qrCodeApi"
import { showSuccess } from "@/app/lib/toast"
import QrHeaders from "@/app/features/dashboard/invite/QrHeaders"
import Skeleton from "@/app/components/ui/Skeleton"
import html2canvas from "html2canvas-pro"
import { useDashboard } from "@/app/features/dashboard/hooks/useDashboard"



const Page = () => {

    const { data, isLoading, error } = useQrCode()
    const { data: dashboardData } = useDashboard()
    const unReadNotificationCount = dashboardData?.unReadNotificationCount ?? 0
    const [qrImageUrl, setQrImageUrl] = useState<string | null>(null)
    const [isDownloading, setIsDownloading] = useState(false)
    const inviteCardRef = useRef<HTMLDivElement>(null)
    const userData = useMemo(() => {
        if (!data) return null

        const inviteUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/invite/${data.publicSlug}`

        return {
            name: data.coupleName.toUpperCase(),
            date: data.coupleEventDate,
            inviteUrl: inviteUrl,
            qrDownloadUrl: data.qrDownloadUrl,
        }
    }, [data])

    useEffect(() => {
        if (!userData) return

        let objectUrl: string | null = null
        getQrCodeImage(userData.qrDownloadUrl).then((blob) => {
            objectUrl = URL.createObjectURL(blob)
            setQrImageUrl(objectUrl)
        })

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl)
        }
    }, [userData?.qrDownloadUrl])

    const handleDownload = async () => {
        if (!userData || !inviteCardRef.current || isDownloading) return

        try {
            setIsDownloading(true)

            const canvas = await html2canvas(inviteCardRef.current, {
                backgroundColor: "#2a0050",
                scale: 2,
                useCORS: true,
                allowTaint: true,
            })

            const link = document.createElement("a")
            link.href = canvas.toDataURL("image/png")
            link.download = `${userData.name}-invite-card.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (err) {
            console.error("Failed to download invite card:", err)
        } finally {
            setIsDownloading(false)
        }
    }

    const handleCopy = () => {
        if (!userData) return
        navigator.clipboard.writeText(userData.inviteUrl)
        showSuccess("copied to clipboard");
    }

    if (isLoading) {
        return (
            <div className="flex justify-center min-h-screen bg-[#330065] px-4">
                <div className="max-w-[390px] w-full flex flex-col pt-10">
                    <QrHeaders unReadNotificationCount={unReadNotificationCount} />

                    <div className="mt-6">
                        <Skeleton className="h-11 w-full rounded-full" />
                    </div>

                    <div className="relative mt-6">
                        <div className="bg-[#2a0050] rounded-2xl border border-white/10 shadow-2xl p-4 flex flex-col items-center gap-4">
                            <div className="flex justify-between items-center w-full">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-14" />
                            </div>

                            <Skeleton className="h-12 w-12 rounded-full" />
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-4 w-36" />

                            <Skeleton className="w-40 h-40 rounded-xl" />

                            <Skeleton className="h-3 w-32 mb-4" />
                        </div>

                        <div className="flex absolute left-1/2 -translate-x-1/2 bottom-[-22px] gap-4">
                            <Skeleton className="w-11 h-11 rounded-full" />
                            <Skeleton className="w-11 h-11 rounded-full" />
                        </div>
                    </div>

                    <div className="py-6 mt-8">
                        <Skeleton className="h-13 w-full rounded-full" />
                    </div>
                </div>
            </div>
        )
    }

    if (error || !userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#330065] text-red-400">
                Failed to load QR Code
            </div>
        )
    }

    return (
        <div className="flex justify-center min-h-screen bg-[#330065] px-4">

            <div className="max-w-[390px] w-full flex flex-col pt-10">

                {/* Header */}

                <QrHeaders unReadNotificationCount={unReadNotificationCount} />
                {/* Invite URL */}
                <div className="mt-6">
                    <div className="flex items-center justify-between bg-white/10 border border-white/20 rounded-full px-4 py-2">

                        <p className="text-white/80 text-sm truncate">
                            {userData.inviteUrl}
                        </p>

                        <button
                            onClick={handleCopy}
                            className="text-white cursor-pointer hover:text-green-400"
                        >
                            <Copy size={18} />
                        </button>

                    </div>
                </div>

                {/* QR CARD */}
                {/* QR CARD */}
                <div className="relative mt-6">

                    <div
                        ref={inviteCardRef}
                        className="bg-[#2a0050] rounded-2xl border border-white/10 shadow-2xl"
                    >

                        {/* Header */}
                        <div className="flex justify-between items-center p-4">
                            <ShagunLogo />
                            <span className="text-white font-bold">stripe</span>
                        </div>

                        {/* Welcome */}
                        <div className="text-center">
                            <WelcomeLogo />
                            <p className="text-white/60 text-xs mt-1 uppercase">
                                To Our Wedding
                            </p>
                            <p className="text-white font-bold mt-1">
                                {userData.name}
                            </p>
                        </div>

                        {/* QR CODE */}
                        <div className="flex justify-center my-5">
                            <div className="bg-white p-3 rounded-xl w-40 h-40 flex items-center justify-center">
                                {qrImageUrl && (
                                    <img
                                        src={qrImageUrl}
                                        alt="QR Code"
                                        width={160}
                                        height={160}
                                    />
                                )}
                            </div>
                        </div>

                        {/* DATE — add pb-8 to make space for buttons */}
                        <p className="text-center text-white/70 text-sm pb-8">
                            {formatDateWithWeekday(userData.date)}
                        </p>

                    </div>

                    {/* ACTION BUTTONS — bottom-[-22px] = exactly half inside half outside */}
                    <div className="flex absolute left-1/2 -translate-x-1/2 bottom-[-22px] gap-4">
                        <button
                            onClick={() => handleShare(userData.name, userData.inviteUrl)}
                            className="w-11 h-11 cursor-pointer rounded-full border border-[#5FDA78] bg-[#2a0050] flex items-center justify-center"
                        >
                            <Share2 className="text-white" size={18} />
                        </button>

                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="w-11 h-11 rounded-full cursor-pointer border border-[#5FDA78] bg-[#2a0050] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download className="text-white" size={18} />
                        </button>
                    </div>

                </div>



                {/* DONE */}
                <div className="py-6 mt-8">
                    <Link
                        href="/dashboard"
                        className="block w-full bg-green-400 text-[#330065] text-center py-4 rounded-full font-semibold"
                    >
                        Done
                    </Link>
                </div>

            </div>
        </div>
    )

}

export default Page