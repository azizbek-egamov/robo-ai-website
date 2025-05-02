"use client"

import { useState, useEffect } from "react"
import { fetchProjects } from "@/lib/api"
import ClientProjectsPage from "./client-page"
import ApiConnectionError from "@/components/api-connection-error"
import { Skeleton } from "@/components/ui/skeleton"

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  difficulty: string;
  materials: {
    id: number;
    title: string;
    description: string;
    quantity: number;
    unit: string;
  }[];
  steps: {
    id: number;
    step_number: number;
    title: string;
    description: string;
    image: string;
  }[];
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  results?: Project[];
  projects?: Project[];
  [key: string]: any;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      const projectsData = await fetchProjects() as ApiResponse
      
      if (!projectsData) {
        throw new Error('No data received from server')
      }

      let projectsArray: Project[] = []
      
      if (Array.isArray(projectsData)) {
        projectsArray = projectsData
      } else if (projectsData.results) {
        projectsArray = projectsData.results
      } else if (projectsData.projects) {
        projectsArray = projectsData.projects
      } else {
        projectsArray = Object.values(projectsData)
      }

      if (!Array.isArray(projectsArray)) {
        throw new Error('Invalid data format received from server')
      }

      // Validate and clean the data
      const validatedProjects = projectsArray.map(project => ({
        id: project.id || 0,
        title: project.title || 'Loyiha',
        description: project.description || '',
        image: project.image || '/placeholder.svg',
        difficulty: project.difficulty || 'boshlang\'ich',
        materials: (project.materials || []).map(material => ({
          id: material.id || 0,
          title: material.title || '',
          description: material.description || '',
          quantity: material.quantity || 0,
          unit: material.unit || ''
        })),
        steps: (project.steps || []).map(step => ({
          id: step.id || 0,
          step_number: step.step_number || 0,
          title: step.title || '',
          description: step.description || '',
          image: step.image || '/placeholder.svg'
        })),
        created_at: project.created_at || new Date().toISOString(),
        updated_at: project.updated_at || new Date().toISOString()
      }))

      setProjects(validatedProjects)
    } catch (error) {
      console.error("Error fetching projects:", error)
      setHasError(true)
      setProjects([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {[1, 2, 3, 4].map((i) => (
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
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {hasError ? (
          <ApiConnectionError onRetry={fetchData} />
        ) : (
          <ClientProjectsPage initialProjects={projects} />
        )}
      </main>
    </div>
  )
}

