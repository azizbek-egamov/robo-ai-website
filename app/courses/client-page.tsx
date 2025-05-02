"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle } from "lucide-react"

interface Course {
  id: number
  title: string
  title_en?: string
  title_ru?: string
  title_uz?: string
  description: string
  description_en?: string
  description_ru?: string
  description_uz?: string
  duration: string
  duration_en?: string
  duration_ru?: string
  duration_uz?: string
  image: string
  difficulty: string
  created_at: string
  updated_at: string
}

interface ClientCoursesPageProps {
  initialCourses: Course[]
}

export default function ClientCoursesPage({ initialCourses }: ClientCoursesPageProps) {
  const { t, language } = useLanguage()
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    // Validate and set courses
    if (initialCourses && Array.isArray(initialCourses)) {
      const validatedCourses = initialCourses.map((course) => {
        const title = language === 'en' ? course.title_en : 
                     language === 'ru' ? course.title_ru : 
                     language === 'uz' ? course.title_uz : 
                     course.title;
        
        const description = language === 'en' ? course.description_en : 
                          language === 'ru' ? course.description_ru : 
                          language === 'uz' ? course.description_uz : 
                          course.description;
        
        const duration = language === 'en' ? course.duration_en : 
                        language === 'ru' ? course.duration_ru : 
                        language === 'uz' ? course.duration_uz : 
                        course.duration;

        return {
          id: course.id || 0,
          title: title || "Kurs",
          description: description || "",
          duration: duration || "",
          image: course.image || "/robotics-course.png",
          difficulty: course.difficulty || "beginner",
          created_at: course.created_at || new Date().toISOString(),
          updated_at: course.updated_at || new Date().toISOString(),
        }
      })
      setCourses(validatedCourses)
    }
  }, [initialCourses, language])

  const courseCategories = [
    { id: "all", name: language === "en" ? "All Courses" : language === "ru" ? "Все курсы" : "Barcha kurslar" },
    { id: "beginner", name: language === "en" ? "Beginner" : language === "ru" ? "Начальный" : "Boshlang'ich" },
    { id: "intermediate", name: language === "en" ? "Intermediate" : language === "ru" ? "Средний" : "O'rta" },
    { id: "advanced", name: language === "en" ? "Advanced" : language === "ru" ? "Продвинутый" : "Yuqori" },
  ]

  const filterByCategory = (category: string) => {
    if (!courses || courses.length === 0) {
      return []
    }

    if (category === "all") {
      return courses
    }

    return courses.filter((course) => {
      if (!course.difficulty) {
        return false
      }
      return course.difficulty.toLowerCase() === category.toLowerCase()
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t("courses")}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("courseDescription")}</p>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-medium mb-2">{t("noCoursesAvailable")}</h2>
              <p className="text-muted-foreground">{t("checkBackLater")}</p>
            </div>
          ) : (
            <>
              <Tabs defaultValue="all" className="mb-12">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  {courseCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {courseCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filterByCategory(category.id).map((course) => (
                        <Card key={course.id} className="overflow-hidden">
                          <div className="relative h-48">
                            <Image
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority={false}
                            />
                          </div>
                          <CardHeader>
                            <CardTitle>{course.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">{course.description}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary">
                                {course.duration}
                              </span>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button asChild className="w-full">
                              <Link href={`/courses/${course.id}`}>{t("enrollNow")}</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
