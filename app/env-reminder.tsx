"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function EnvReminder() {
  const [show, setShow] = useState(false)
  const [apiUrl, setApiUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    // Check if the API URL is set and display the value
    const url = process.env.NEXT_PUBLIC_API_URL
    setApiUrl(url)

    // Show the reminder if the environment variable is not set or empty
    if (!url || url.trim() === "") {
      setShow(true)
    }
  }, [])

  if (!show) return null

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>API URL Not Configured</AlertTitle>
      <AlertDescription>
        <p>The application is trying to connect to the backend API, but the API URL is not configured.</p>
        <p className="mt-2">Please set the NEXT_PUBLIC_API_URL environment variable to connect to your API server:</p>
        <code className="bg-muted px-1 py-0.5 rounded text-sm block mt-1 mb-2">
          NEXT_PUBLIC_API_URL=http://localhost:8000/api
        </code>
        <p>Current value: {apiUrl || "Not set"}</p>
        <p className="mt-2 text-sm">
          <strong>Note:</strong> Make sure your API server is running and accessible at the configured URL.
        </p>
      </AlertDescription>
    </Alert>
  )
}

