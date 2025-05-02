import { fetchCourse } from "@/lib/api"
import { notFound } from "next/navigation"
import ClientCoursePage from "./client-page"

// Server Component
export default async function CoursePage({ params }) {
  try {
    // API dan kurs ma'lumotlarini olish
    const course = await fetchCourse(params.id)

    // If no course is returned, show 404
    if (!course) {
      return notFound()
    }

    return <ClientCoursePage course={course} />
  } catch (error) {
    console.error("Error fetching course:", error)
    notFound()
  }
}

