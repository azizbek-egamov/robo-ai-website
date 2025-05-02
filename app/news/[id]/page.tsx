import { fetchNewsItem } from "@/lib/api"
import { notFound } from "next/navigation"
import ClientNewsPage from "./client-page"

// Server Component
export default async function NewsItemPage({ params }) {
  try {
    // API dan yangilik ma'lumotlarini olish
    const newsItem = await fetchNewsItem(params.id)

    // If no news item is returned, show 404
    if (!newsItem) {
      return notFound()
    }

    return <ClientNewsPage newsItem={newsItem} />
  } catch (error) {
    console.error("Error fetching news item:", error)
    notFound()
  }
}

