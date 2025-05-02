import { fetchCourses } from "@/lib/api"
import ClientEnrollPage from "./client-page"

// Server Component
export default async function EnrollPage({ searchParams }) {
  try {
    // API dan kurslar ro'yxatini olish
    const coursesData = await fetchCourses()
    const courses = coursesData.results || []

    return <ClientEnrollPage courses={courses} initialCourseId={searchParams?.course} />
  } catch (error) {
    console.error("Error fetching courses:", error)
    return <ClientEnrollPage courses={[]} initialCourseId={searchParams?.course} />
  }
}

