import { useEffect, useMemo, useState } from "react"
import type { ContributionItem } from "../types/coupleContributions"
import { getContributions } from "../services/coupleContributionsServices"

export const useCoupleContributions = () => {
  const [allItems, setAllItems] = useState<ContributionItem[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getContributions()
        setAllItems(res.items)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const items = useMemo(() => {
    if (!search.trim()) return allItems

    return allItems.filter((item) =>
      (item.guestName ?? "").toLowerCase().includes(search.toLowerCase())
    )
  }, [allItems, search])

  return {
    items,
    loading,
    search,
    setSearch,
  }
}
