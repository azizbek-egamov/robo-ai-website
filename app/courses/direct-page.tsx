"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AlertCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// API URL ni olish
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export default function DirectCoursesPage() {
  const { t, language } = useLanguage()
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true)
        console.log(`Fetching courses from: ${API_URL}/courses/`)

        const response = await fetch(`${API_URL}/courses/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        console.log("API response:", data)

        // Ma'lumotlarni to'g'ri formatda olish
        let coursesData = []
        if (Array.isArray(data)) {
          coursesData = data
        } else if (data && data.results) {
          coursesData = data.results
        } else if (data && typeof data === "object") {
          coursesData = [data]
        }

        console.log("Processed courses:", coursesData)
        setCourses(coursesData)
      } catch (err) {
        console.error("Error fetching courses:", err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const courseCategories = {
    en: [
      { id: "all", name: "All Courses" },
      { id: "beginner", name: "Beginner" },
      { id: "intermediate", name: "Intermediate" },
      { id: "advanced", name: "Advanced" },
    ],
    ru: [
      { id: "all", name: "Все курсы" },
      { id: "beginner", name: "Начальный" },
      { id: "intermediate", name: "Средний" },
      { id: "advanced", name: "Продвинутый" },
    ],
    uz: [
      { id: "all", name: "Barcha kurslar" },
      { id: "beginner", name: "Boshlang'ich" },
      { id: "intermediate", name: "O'rta" },
      { id: "advanced", name: "Yuqori" },
    ],
  }

  const pageTitle = {
    en: "Courses",
    ru: "Курсы",
    uz: "Kurslar",
  }

  const pageDescription = {
    en: "Explore our comprehensive range of robotics and AI courses designed for students of all levels.",
    ru: "Изучите наш комплексный набор курсов по робототехнике и ИИ, разработанных для студентов всех уровней.",
    uz: "Barcha darajadagi o'quvchilar uchun mo'ljallangan robototexnika va sun'iy intellekt kurslarimizning keng doirasini o'rganing.",
  }

  const noDataMessage = {
    en: "No courses available. Please check back later.",
    ru: "Курсы недоступны. Пожалуйста, проверьте позже.",
    uz: "Kurslar mavjud emas. Iltimos, keyinroq tekshiring.",
  }

  // Kurslarni kategoriya bo'yicha filtrlash
  const filterByCategory = (category) => {
    console.log(`Filtering by category: "${category}"`)

    if (!courses || courses.length === 0) {
      return []
    }


    return courses.filter((course) => {
      if (!course.difficulty) {
        return false
      }

      return course.difficulty.toLowerCase() === category.toLowerCase()
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="space-y-4 text-center">
              <Skeleton className="h-12 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
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
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{pageTitle[language]}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{pageDescription[language]}</p>
          </div>

          {error ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-medium mb-2">Error loading courses</h2>
              <p className="text-muted-foreground">{error}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Retry
              </Button>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-medium mb-2">{noDataMessage[language]}</h2>
              <p className="text-muted-foreground">
                {language === "en" && "The courses data could not be loaded from the server."}
                {language === "ru" && "Данные о курсах не могут быть загружены с сервера."}
                {language === "uz" && "Kurslar ma'lumotlari serverdan yuklab olinmadi."}
              </p>
            </div>
          ) : (
            <>
              {/* Tabbed interface for filtered courses */}
              <Tabs defaultValue="all" className="mb-12">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  {courseCategories[language].map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {courseCategories[language].map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filterByCategory(category.id).map((course) => (
                        <Card key={course.id} className="overflow-hidden">
                          <div className="relative h-48">
                            <Image
                              src={course.image || "/placeholder.svg?height=200&width=300"}
                              alt={course[`title_${language}`] || "Course"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardHeader>
                            <CardTitle>{course[`title_${language}`] || "Course Title"}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">
                              {course[`description_${language}`] || "No description available"}
                            </p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary">
                                {course[`duration_${language}`] || "N/A"}
                              </span>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button asChild className="w-full">
                              <Link href={`/courses/${course.id}`}>
                                {language === "en" && "Enroll Now"}
                                {language === "ru" && "Записаться"}
                                {language === "uz" && "Ro'yxatdan o'tish"}
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}

                      {filterByCategory(category.id).length === 0 && (
                        <div className="col-span-full text-center py-8">
                          <p className="text-muted-foreground">
                            {language === "en" && `No ${category.name.toLowerCase()} courses available.`}
                            {language === "ru" && `Нет доступных курсов уровня "${category.name}".`}
                            {language === "uz" && `${category.name} darajasidagi kurslar mavjud emas.`}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

