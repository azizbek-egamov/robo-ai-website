"use client"

import { useState, useEffect } from "react"
import { fetchNews } from "@/lib/api"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { useDateFormatter } from "@/lib/date-formatter"
import { Skeleton } from "@/components/ui/skeleton"
import ApiConnectionError from "@/components/api-connection-error"

interface NewsItem {
  id: number
  title: string
  title_uz?: string
  title_ru?: string
  title_en?: string
  summary: string
  summary_uz?: string
  summary_ru?: string
  summary_en?: string
  content: string
  content_uz?: string
  content_ru?: string
  content_en?: string
  image: string
  date: string
  created_at: string
  updated_at: string
}

export default function NewsPage() {
  const { t, language } = useLanguage()
  const { formatDate } = useDateFormatter()
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      const newsData = await fetchNews()

      if (!newsData || !newsData.results || newsData.results.length === 0) {
        setNews([])
        return
      }

      // Validate and clean the data
      const validatedNews = newsData.results.map((item: NewsItem) => {
        const titleKey = `title_${language}` as keyof NewsItem
        const summaryKey = `summary_${language}` as keyof NewsItem
        const contentKey = `content_${language}` as keyof NewsItem

        return {
          id: item.id || 0,
          title: String(item[titleKey] || item.title || "Yangilik"),
          summary: String(item[summaryKey] || item.summary || ""),
          content: String(item[contentKey] || item.content || ""),
          image: item.image || "/news-collage.png",
          date: item.date || new Date().toISOString(),
          created_at: item.created_at || new Date().toISOString(),
          updated_at: item.updated_at || new Date().toISOString(),
        } as NewsItem
      })

      setNews(validatedNews)
    } catch (error) {
      console.error("Error fetching news:", error)
      setHasError(true)
      setNews([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("news")}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("newsDescription")}</p>
        </div>

        {hasError && <ApiConnectionError onRetry={fetchData} />}

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/4 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">{t("noNewsAvailable")}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {news.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(item.date, "uz-UZ", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{item.summary || "Bu yangilik haqida ko'proq ma'lumot olish uchun bosing."}</p>
                  <Button asChild>
                    <Link href={`/news/${item.id}`}>{t("readMore")}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
