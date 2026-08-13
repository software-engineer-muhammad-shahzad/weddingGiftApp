"use client"

import { useState } from "react"
import { Loader2, Search } from "lucide-react"
import Button from "@/app/components/elements/Button"
import Header from "@/app/features/dashboard/gifts/Header"
import StatisticTable from "@/app/features/dashboard/statistic/StatisticTable"
import { useCoupleContributions } from "@/app/features/dashboard/hooks/useCoupleContributions"
import { useDashboard } from "@/app/features/dashboard/hooks/useDashboard"

const Page = () => {
  const { items, loading, search, setSearch } = useCoupleContributions()
  const { data: dashboardData } = useDashboard()
  const [isDownloading, setIsDownloading] = useState(false)

  const saveBlobFile = (blob: Blob, fileName: string) =>
    new Promise<void>((resolve) => {
      const objectUrl = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = objectUrl
      link.download = fileName
      link.rel = "noopener"
      link.style.display = "none"
      document.body.appendChild(link)

      // iOS Safari needs the <a> to stay mounted until the download starts.
      requestAnimationFrame(() => {
        link.click()
        window.setTimeout(() => {
          link.remove()
          URL.revokeObjectURL(objectUrl)
          resolve()
        }, 2000)
      })
    })

  const handleDownload = async () => {
    if (isDownloading) return

    const header = ["Sr#", "Names", "Amount Received", "Attachment", "Date"]
    const rows = items.map((item, index) => {
      const hasAttachment = item.isAttachment ?? Boolean(item.wishingCardPath || item.wishingVideoPath)
      const date = new Date(item.resourceMetadata.createdOn).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })

      return [index + 1, item.guestName || "Guest", item.amount.toFixed(2), hasAttachment ? "Yes" : "No", date]
    })

    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

    try {
      setIsDownloading(true)
      await saveBlobFile(blob, "statistic.csv")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="flex justify-center bg-[#330065] min-h-screen overflow-auto w-full mx-auto pt-10 pb-24 px-5 md:px-10 max-w-382.5">
      <div className="max-w-150 w-full">
        {/* header */}
        <Header
          title="Statistic"
          unReadNotificationCount={dashboardData?.unReadNotificationCount ?? 0}
        />

        {/* search */}
        <div className="border border-[#5FDA78] glass-card rounded-[50px] h-14.5 mt-8 px-5 py-3 flex items-center">
          <Search className="text-white" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full outline-none ps-4 font-light text-sm text-white placeholder:text-white"
          />
        </div>

        {/* table */}
        <StatisticTable items={items} loading={loading} />

        { items.length > 0 && (
        <Button onClick={handleDownload} disabled={isDownloading} className="w-full mt-8 py-3.5">
          {isDownloading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Downloading...
            </>
          ) : (
            "Download"
          )}
        </Button>
        )}
      </div>
    </div>
  )
}

export default Page
