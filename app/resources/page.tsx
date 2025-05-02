"use client"

import { useState, useEffect } from "react"
import { fetchResources } from "@/lib/api"
import ClientResourcesPage from "./client-page"
import ApiConnectionError from "@/components/api-connection-error"
import { Skeleton } from "@/components/ui/skeleton"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Resource {
  id: number
  title: string
  title_en?: string
  title_ru?: string
  title_uz?: string
  description: string
  description_en?: string
  description_ru?: string
  description_uz?: string
  content: string
  content_en?: string
  content_ru?: string
  content_uz?: string
  image: string
  category: string
  file: string
  external_link: string
  is_external: boolean
  is_downloadable: boolean
  created_at: string
  updated_at: string
}

interface ApiResponse {
  results?: Resource[]
  resources?: Resource[]
  [key: string]: any
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      const resourcesData = (await fetchResources()) as ApiResponse

      if (!resourcesData) {
        throw new Error("No data received from server")
      }

      let resourcesArray: Resource[] = []

      if (resourcesData.results && Array.isArray(resourcesData.results)) {
        resourcesArray = resourcesData.results
      } else if (Array.isArray(resourcesData)) {
        resourcesArray = resourcesData
      } else if (resourcesData.resources && Array.isArray(resourcesData.resources)) {
        resourcesArray = resourcesData.resources
      } else {
        console.warn("Unexpected data format:", resourcesData)
        resourcesArray = []
      }

      // Validate and clean the data
      const validatedResources = resourcesArray.map((resource) => ({
        id: resource.id || 0,
        title: resource.title || "Resurs",
        title_en: resource.title_en || resource.title || "Resource",
        title_ru: resource.title_ru || resource.title || "Ресурс",
        title_uz: resource.title_uz || resource.title || "Resurs",
        description: resource.description || "",
        description_en: resource.description_en || resource.description || "",
        description_ru: resource.description_ru || resource.description || "",
        description_uz: resource.description_uz || resource.description || "",
        content: resource.content || "",
        content_en: resource.content_en || resource.content || "",
        content_ru: resource.content_ru || resource.content || "",
        content_uz: resource.content_uz || resource.content || "",
        image: resource.image || "/placeholder.svg?height=200&width=300",
        category: resource.category || "tutorials",
        file: resource.file || "",
        external_link: resource.external_link || "",
        is_external: resource.is_external || false,
        is_downloadable: resource.is_downloadable || false,
        created_at: resource.created_at || new Date().toISOString(),
        updated_at: resource.updated_at || new Date().toISOString(),
      }))

      setResources(validatedResources)
    } catch (error) {
      console.error("Error fetching resources:", error)
      setHasError(true)
      setResources([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="flex-1">
      {hasError ? <ApiConnectionError onRetry={fetchData} /> : <ClientResourcesPage initialResources={resources} />}
    </main>
  )
}
