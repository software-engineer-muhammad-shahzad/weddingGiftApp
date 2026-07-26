const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

/**
 * Parse API date strings without UTC day-shift for date-only values (YYYY-MM-DD).
 */
export const parseLocalDate = (dateString: string): Date => {
  if (!dateString) return new Date(NaN)

  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString.trim())
  if (dateOnlyMatch) {
    const year = Number(dateOnlyMatch[1])
    const month = Number(dateOnlyMatch[2]) - 1
    const day = Number(dateOnlyMatch[3])
    return new Date(year, month, day)
  }

  return new Date(dateString)
}

export const formatDate = (dateString: string) => {
  const date = parseLocalDate(dateString)
  if (Number.isNaN(date.getTime())) return dateString

  const day = date.getDate()
  const month = MONTH_NAMES[date.getMonth()]
  const year = date.getFullYear()

  return `${day} ${month}, ${year}`
}

export const formatDateWithWeekday = (dateString: string) => {
  const date = parseLocalDate(dateString)
  if (Number.isNaN(date.getTime())) return dateString

  const weekday = date.toLocaleDateString("en-US", { weekday: "long" })
  const month = date.toLocaleDateString("en-US", { month: "long" })

  return `${weekday}, ${date.getDate()} ${month}`.toUpperCase()
}
