"use client"

import { useState, useEffect } from "react"
import { fetchTasks } from "@/lib/api"
import ClientTasksPage from "./client-page"
import ApiConnectionError from "@/components/api-connection-error"
import { Skeleton } from "@/components/ui/skeleton"

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      console.log("Fetching tasks data...")
      const tasksData = await fetchTasks()
      console.log("Received tasks data:", tasksData)

      if (tasksData && Array.isArray(tasksData)) {
        console.log("Setting tasks array directly:", tasksData.length, "items")
        setTasks(tasksData)
      } else if (tasksData && tasksData.results && Array.isArray(tasksData.results)) {
        console.log("Setting tasks from results property:", tasksData.results.length, "items")
        setTasks(tasksData.results)
      } else {
        console.error("Unexpected tasks data format:", tasksData)
        setTasks([])
      }
    } catch (error) {
      console.error("Error fetching tasks:", error)
      setHasError(true)
      setTasks([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (hasError) {
    return <ApiConnectionError />
  }

  return <ClientTasksPage tasks={tasks} />
}
