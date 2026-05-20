import { useState, useCallback, useRef } from "react"
import { getContributorList } from "@/app/features/dashboard/services/dashboardService"
import type { ContributorItem } from "@/app/features/dashboard/types/coupleContributorList"

export const useCoupleContributorList = () => {
  const [items, setItems] = useState<ContributorItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  
  const isLoadingRef = useRef(false)
  const hasMoreRef = useRef(true)

  isLoadingRef.current = isLoading
  hasMoreRef.current = hasMore

  const fetchContributors = useCallback(async (page: number = 1) => {
    if (isLoadingRef.current || !hasMoreRef.current) return

    setIsLoading(true)
    try {
      const data = await getContributorList(page)
      
      if (page === 1) {
        setItems(data.items)
      } else {
        setItems(prev => [...prev, ...data.items])
      }
      
      setCurrentPage(page)
      setTotalCount(data.totalCount)
      setHasMore(data.items.length < data.totalCount)
    } catch (err) {
      console.error("Failed to fetch contributors:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadMore = useCallback(() => {
    if (!isLoadingRef.current && hasMoreRef.current) {
      setCurrentPage(prev => {
        const nextPage = prev + 1
        fetchContributors(nextPage)
        return prev
      })
    }
  }, [fetchContributors])

  const reset = useCallback(() => {
    setItems([])
    setCurrentPage(1)
    setHasMore(true)
    setTotalCount(0)
  }, [])

  return {
    items,
    isLoading,
    hasMore,
    totalCount,
    currentPage,
    fetchContributors,
    loadMore,
    reset,
  }
}
