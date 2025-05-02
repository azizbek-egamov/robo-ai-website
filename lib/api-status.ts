"use client"

import { useState, useEffect } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export function useApiStatus() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">("loading")

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/health-check/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // Set a timeout to avoid long waiting times
          signal: AbortSignal.timeout(5000),
        })

        if (response.ok) {
          setStatus("connected")
        } else {
          setStatus("error")
        }
      } catch (error) {
        console.error("API health check failed:", error)
        setStatus("error")
      }
    }

    checkApiStatus()
  }, [])

  const retryConnection = async () => {
    setStatus("loading")
    try {
      const response = await fetch(`${API_URL}/health-check/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Set a timeout to avoid long waiting times
        signal: AbortSignal.timeout(5000),
      })

      if (response.ok) {
        setStatus("connected")
        return true
      } else {
        setStatus("error")
        return false
      }
    } catch (error) {
      console.error("API health check failed:", error)
      setStatus("error")
      return false
    }
  }

  return { status, retryConnection }
}

