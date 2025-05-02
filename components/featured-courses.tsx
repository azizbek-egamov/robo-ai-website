"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import NoDataMessage from "@/components/no-data-message"

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  price: number;
}

interface FeaturedCoursesProps {
  courses: Course[];
}

const difficultyColors = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
}

const difficultyLabels = {
  beginner: "Boshlang'ich",
  intermediate: "O'rta",
  advanced: "Yuqori",
}

export default function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  // Qo'shimcha debug ma'lumotlarini qo'shish
  console.log("FeaturedCourses received courses:", courses)

  // Ensure courses is never undefined
  const coursesToDisplay = courses || []

  const { t, language } = useLanguage()

  // Har bir kurs uchun qo'shimcha tekshirish
  coursesToDisplay.forEach((course, index) => {
    console.log(`Course ${index + 1}:`, {
      id: course.id,
      title: course[`title_${language}`],
      difficulty: course.difficulty,
    })
  })

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t("featuredCourses")}</h2>
        <Button variant="ghost" asChild>
          <Link href="/courses">{t("viewAll")}</Link>
        </Button>
      </div>

      {!coursesToDisplay || coursesToDisplay.length === 0 ? (
        <NoDataMessage type="courses" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesToDisplay.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 group">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title || "Kurs rasmi"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className={difficultyColors[course.difficulty]}>
                    {difficultyLabels[course.difficulty]}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {course.description}
                </p>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Davomiyligi: {course.duration}</span>
                  <span>Narxi: {course.price.toLocaleString()} so'm</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/courses/${course.id}`}>Batafsil ma'lumot</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}