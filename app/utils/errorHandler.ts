/**
 * Extract error message from various error types
 */
export const getErrorMessage = (error: any): string => {
  if (typeof error === "string") {
    return error
  }

  const data = error?.response?.data

  // Prefer nested payload message (common API shape: { statusMessage: "BadRequest", data: "..." })
  if (typeof data?.data === "string" && data.data.trim()) {
    return data.data
  }

  
  if (typeof data?.error === "string" && data.error.trim()) {
    return data.error
  }

  const statusMessage =
    typeof data?.statusMessage === "string" ? data.statusMessage.trim() : ""
  if (statusMessage && !isGenericStatusLabel(statusMessage)) {
    return statusMessage
  }

  if (typeof data?.title === "string" && data.title.trim() && !isGenericStatusLabel(data.title)) {
    return data.title
  }

  if (error?.message && !/^Request failed with status code \d+$/i.test(error.message)) {
    return error.message
  }

  return statusMessage || "An error occurred. Please try again."
}

const isGenericStatusLabel = (value: string): boolean => {
  const normalized = value.replace(/\s+/g, "").toLowerCase()
  return [
    "badrequest",
    "unauthorized",
    "forbidden",
    "notfound",
    "internalservererror",
    "error",
  ].includes(normalized)
}

/**
 * Error handler for async operations
 * Returns error object with extracted message
 */
export type ErrorResult = {
  success: false
  error: string
  /** HTTP status when the failure came from a response (undefined for network/timeout errors). */
  status?: number
}

export const handleError = (error: any): ErrorResult => {
  const message = getErrorMessage(error)
  return {
    success: false,
    error: message,
    status: error?.response?.status,
  }
}
