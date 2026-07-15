"use client"

import type { ContributionItem } from "../types/coupleContributions"

interface StatisticTableProps {
  items: ContributionItem[]
  loading: boolean
}

const StatisticTable = ({ items, loading }: StatisticTableProps) => {
  return (
    <div className="glass-card border border-[#5FDA78] rounded-2xl mt-8 overflow-x-auto">
      <table className="w-full min-w-125 text-left border-collapse">
        <thead>
          <tr className="text-[#C2C2C2] text-xs sm:text-sm border-b border-[#47038A]">
            <th className="font-medium py-4 px-4">Sr#</th>
            <th className="font-medium py-4 px-4">Names</th>
            <th className="font-medium py-4 px-4">Amount Received</th>
            <th className="font-medium py-4 px-4">Attachment</th>
            <th className="font-medium py-4 px-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-white text-center py-8">Loading...</td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-white text-center py-8">No contributions yet</td>
            </tr>
          ) : (
            items.map((item, index) => {
              const hasAttachment = item.isAttachment ?? Boolean(item.wishingCardPath || item.wishingVideoPath)

              return (
                <tr key={item.id} className="text-white text-xs sm:text-sm border-b border-[#47038A]/50 last:border-b-0">
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4">{item.guestName || "Guest"}</td>
                  <td className="py-4 px-4">£{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 px-4">{hasAttachment ? "Yes" : "No"}</td>
                  <td className="py-4 px-4">
                    {new Date(item.resourceMetadata.createdOn).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

export default StatisticTable
