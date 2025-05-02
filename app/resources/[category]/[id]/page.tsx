import { fetchResource } from "@/lib/api"
import { notFound } from "next/navigation"
import ClientResourcePage from "./client-page"

// Server Component
export default async function ResourcePage({ params }) {
  try {
    // API dan resurs ma'lumotlarini olish
    const resource = await fetchResource(params.id)

    // If no resource is returned, show 404
    if (!resource) {
      return notFound()
    }

    return <ClientResourcePage resource={resource} category={params.category} />
  } catch (error) {
    console.error("Error fetching resource:", error)
    notFound()
  }
}
