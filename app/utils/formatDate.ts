export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  const day = date.getDate()

  const monthNames = [
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
  ]

  const month = monthNames[date.getMonth()]

  const year = date.getFullYear()

  return `${day} ${month}, ${year}`
}

export const formatDateWithWeekday = (dateString: string) => {
  const date = new Date(dateString)

  const weekday = date.toLocaleDateString("en-US", { weekday: "long" })
  const month = date.toLocaleDateString("en-US", { month: "long" })

  return `${weekday}, ${date.getDate()} ${month}`.toUpperCase()
}