import { useState, useCallback, useRef, useEffect } from "react"
import { getNotifications } from "@/app/features/dashboard/services/dashboardService"
import type { NotificationItem } from "@/app/features/dashboard/types/coupleNotifications"

export const useCoupleNotification = () => {
  const [items, setItems] = useState<NotificationItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [search, setSearch] = useState("")

  const isLoadingRef = useRef(false)
  const hasMoreRef = useRef(true)
  const searchRef = useRef("")
  const isFirstRun = useRef(true)

  isLoadingRef.current = isLoading
  hasMoreRef.current = hasMore
  searchRef.current = search

  const fetchPage = useCallback(async (page: number, options?: { reset?: boolean }) => {
    if (!options?.reset && (isLoadingRef.current || !hasMoreRef.current)) return

    setIsLoading(true)
    try {
      const data = await getNotifications(page, searchRef.current)

      setItems(prev => (page === 1 ? data.items : [...prev, ...data.items]))
      setCurrentPage(page)
      setTotalCount(data.totalCount)
      setHasMore(data.items.length < data.totalCount)
    } catch (err) {
      console.error("Failed to fetch notifications:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchNotifications = useCallback((page: number = 1) => fetchPage(page), [fetchPage])

  const loadMore = useCallback(() => {
    if (!isLoadingRef.current && hasMoreRef.current) {
      setCurrentPage(prev => {
        fetchPage(prev + 1)
        return prev
      })
    }
  }, [fetchPage])

  const reset = useCallback(() => {
    setItems([])
    setCurrentPage(1)
    setHasMore(true)
    setTotalCount(0)
  }, [])

  // ✅ initial load, then refetch page 1 (debounced) whenever the search term changes
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      fetchPage(1, { reset: true })
      return
    }

    const timeoutId = setTimeout(() => {
      setItems([])
      setHasMore(true)
      setTotalCount(0)
      fetchPage(1, { reset: true })
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [search, fetchPage])

  return {
    items,
    isLoading,
    hasMore,
    totalCount,
    currentPage,
    search,
    setSearch,
    fetchNotifications,
    loadMore,
    reset,
  }
}
