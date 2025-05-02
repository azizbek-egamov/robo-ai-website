"use client"

import { useState, useEffect } from "react"

export function useDateFormatter() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const formatDate = (dateString: string, locale: string, options?: Intl.DateTimeFormatOptions) => {
    if (!mounted || typeof window === "undefined") {
      // Return a simple format during SSR to avoid hydration mismatch
      return dateString
    }

    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat(locale, options).format(date)
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString
    }
  }

  return { formatDate, mounted }
}

