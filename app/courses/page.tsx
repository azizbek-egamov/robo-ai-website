"use client"

import { useState, useEffect } from "react"
import { fetchCourses } from "@/lib/api"
import ClientCoursesPage from "./client-page"
import ApiConnectionError from "@/components/api-connection-error"
import { Skeleton } from "@/components/ui/skeleton"

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  image: string;
  difficulty: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  results?: Course[];
  courses?: Course[];
  [key: string]: any;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      const coursesData = await fetchCourses() as ApiResponse
      
      if (!coursesData) {
        throw new Error('No data received from server')
      }

      let coursesArray: Course[] = []
      
      if (Array.isArray(coursesData)) {
        coursesArray = coursesData
      } else if (coursesData.results) {
        coursesArray = coursesData.results
      } else if (coursesData.courses) {
        coursesArray = coursesData.courses
      } else {
        coursesArray = Object.values(coursesData)
      }

      if (!Array.isArray(coursesArray)) {
        throw new Error('Invalid data format received from server')
      }

      // Validate and clean the data
      const validatedCourses = coursesArray.map(course => ({
        id: course.id || 0,
        title: course.title || 'Kurs',
        description: course.description || '',
        duration: course.duration || '',
        image: course.image || '/placeholder.svg',
        difficulty: course.difficulty || 'boshlang\'ich',
        created_at: course.created_at || new Date().toISOString(),
        updated_at: course.updated_at || new Date().toISOString()
      }))

      setCourses(validatedCourses)
    } catch (error) {
      console.error("Error fetching courses:", error)
      setHasError(true)
      setCourses([])
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[1, 2, 3].map((i) => (
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
          <ClientCoursesPage initialCourses={courses} />
        )}
      </main>
    </div>
  )
}

