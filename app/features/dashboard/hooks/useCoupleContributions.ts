import { useEffect, useState } from "react"
import type { ContributionItem } from "../types/coupleContributions"
import { getContributions } from "../services/coupleContributionsServices"

export const useCoupleContributions = () => {
  const [items, setItems] = useState<ContributionItem[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getContributions(search.trim())
        setItems(res.items)
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(fetchData, 300)
    return () => clearTimeout(timeoutId)
  }, [search])

  return {
    items,
    loading,
    search,
    setSearch,
  }
}
