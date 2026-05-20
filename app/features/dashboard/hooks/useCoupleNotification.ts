import { useState, useCallback, useRef } from "react"
import { getNotifications } from "@/app/features/dashboard/services/dashboardService"
import type { NotificationItem } from "@/app/features/dashboard/types/coupleNotifications"

export const useCoupleNotification = () => {
  const [items, setItems] = useState<NotificationItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  
  const isLoadingRef = useRef(false)
  const hasMoreRef = useRef(true)

  isLoadingRef.current = isLoading
  hasMoreRef.current = hasMore

  const fetchNotifications = useCallback(async (page: number = 1) => {
    if (isLoadingRef.current || !hasMoreRef.current) return

    setIsLoading(true)
    try {
      const data = await getNotifications(page)
      
      if (page === 1) {
        setItems(data.items)
      } else {
        setItems(prev => [...prev, ...data.items])
      }
      
      setCurrentPage(page)
      setTotalCount(data.totalCount)
      setHasMore(data.items.length < data.totalCount)
    } catch (err) {
      console.error("Failed to fetch notifications:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadMore = useCallback(() => {
    if (!isLoadingRef.current && hasMoreRef.current) {
      setCurrentPage(prev => {
        const nextPage = prev + 1
        fetchNotifications(nextPage)
        return prev
      })
    }
  }, [fetchNotifications])

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
    fetchNotifications,
    loadMore,
    reset,
  }
}
