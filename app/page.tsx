"use client"

import { useState, useEffect } from "react"
import { fetchCourses, fetchProjects, fetchNews } from "@/lib/api"
import Hero from "@/components/hero"
import FeaturedCourses from "@/components/featured-courses"
import LatestProjects from "@/components/latest-projects"
import NewsSidebar from "@/components/news-sidebar"
import ApiConnectionError from "@/components/api-connection-error"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

interface PaginationState {
  currentPage: number;
  totalPages: number;
  count: number;
}

export default function Home() {
  const [courses, setCourses] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [news, setNews] = useState<any[]>([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [coursesPagination, setCoursesPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    count: 0
  })
  const [projectsPagination, setProjectsPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    count: 0
  })
  const [newsPagination, setNewsPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    count: 0
  })

  const fetchData = async (coursesPage = 1, projectsPage = 1, newsPage = 1) => {
    setIsLoading(true)
    setHasError(false)

    try {
      console.log("Ma'lumotlar yuklanmoqda...")

      // API dan ma'lumotlarni olish
      const [coursesData, projectsData, newsData] = await Promise.all([
        fetchCourses(coursesPage),
        fetchProjects(projectsPage),
        fetchNews(newsPage)
      ])

      console.log("API dan ma'lumotlar olindi")

      // Kurslarni qayta ishlash
      if (coursesData?.results) {
        setCourses(coursesData.results)
        setCoursesPagination({
          currentPage: coursesPage,
          totalPages: coursesData.pagination.totalPages,
          count: coursesData.pagination.count
        })
      }

      // Loyihalarni qayta ishlash
      if (projectsData?.results) {
        setProjects(projectsData.results)
        setProjectsPagination({
          currentPage: projectsPage,
          totalPages: projectsData.pagination.totalPages,
          count: projectsData.pagination.count
        })
      }

      // Yangiliklar qayta ishlash
      if (newsData?.results) {
        setNews(newsData.results)
        setNewsPagination({
          currentPage: newsPage,
          totalPages: newsData.pagination.totalPages,
          count: newsData.pagination.count
        })
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handlePageChange = (type: 'courses' | 'projects' | 'news', page: number) => {
    const coursesPage = type === 'courses' ? page : coursesPagination.currentPage
    const projectsPage = type === 'projects' ? page : projectsPagination.currentPage
    const newsPage = type === 'news' ? page : newsPagination.currentPage
    fetchData(coursesPage, projectsPage, newsPage)
  }

  const renderPagination = (type: 'courses' | 'projects' | 'news') => {
    const pagination = type === 'courses' ? coursesPagination :
                      type === 'projects' ? projectsPagination :
                      newsPagination

    return (
      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.currentPage === 1}
          onClick={() => handlePageChange(type, pagination.currentPage - 1)}
        >
          Oldingi
        </Button>
        <span className="px-4 py-2">
          {pagination.currentPage} / {pagination.totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={pagination.currentPage === pagination.totalPages}
          onClick={() => handlePageChange(type, pagination.currentPage + 1)}
        >
          Keyingi
        </Button>
      </div>
    )
  }

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {hasError && <ApiConnectionError onRetry={() => fetchData()} />}

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-40 w-full" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-40 w-full" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-16 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-[400px] w-full" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <FeaturedCourses courses={courses} />
                {coursesPagination.totalPages > 1 && renderPagination('courses')}
              </div>
              <div className="mb-8">
                <LatestProjects projects={projects} />
                {projectsPagination.totalPages > 1 && renderPagination('projects')}
              </div>
            </div>
            <div className="lg:col-span-1">
              <NewsSidebar news={news} />
              {newsPagination.totalPages > 1 && renderPagination('news')}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

