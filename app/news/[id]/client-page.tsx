"use client"

import { useLanguage } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useDateFormatter } from "@/lib/date-formatter"
import { AlertCircle } from "lucide-react"

// Xavfsiz ma'lumot olish uchun yordamchi funksiya
function getSafeValue(obj, path, defaultValue = "") {
  if (!obj) return defaultValue

  const keys = path.split(".")
  let result = obj

  for (const key of keys) {
    if (result === undefined || result === null) return defaultValue
    result = result[key]
  }

  return result !== undefined && result !== null ? result : defaultValue
}

export default function ClientNewsPage({ newsItem }) {
  const { language } = useLanguage()
  const { formatDate, mounted } = useDateFormatter()

  // Agar newsItem undefined bo'lsa, xatolik xabarini ko'rsatish
  if (!newsItem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-medium mb-2">
            {language === "en"
              ? "News item not found"
              : language === "ru"
                ? "Новость не найдена"
                : "Yangilik topilmadi"}
          </h2>
          <Button asChild className="mt-4">
            <Link href="/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === "en" ? "Back to News" : language === "ru" ? "Назад к новостям" : "Yangiliklariga qaytish"}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Ma'lumotlarni xavfsiz olish
  const newsTitle = newsItem[`title_${language}`] || newsItem.title || "News"
  const newsContent = newsItem[`content_${language}`] || newsItem.content || ""
  const newsDate = newsItem.date || newsItem.created_at || new Date().toISOString()
  const newsImage = newsItem.image || "/news-collage.png"
  const newsAuthor = newsItem.author || ""

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/news">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === "en" && "Back to News"}
          {language === "ru" && "Назад к новостям"}
          {language === "uz" && "Yangiliklariga qaytish"}
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">{newsTitle}</CardTitle>
          <div className="flex items-center gap-2 text-muted-foreground mt-2">
            <Calendar className="h-4 w-4" />
            <span>
              {mounted
                ? formatDate(newsDate, language === "en" ? "en-US" : language === "ru" ? "ru-RU" : "uz-UZ", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : newsDate}
            </span>
            {newsAuthor && (
              <>
                <span>•</span>
                <span>{newsAuthor}</span>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {newsImage && (
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6">
              <Image src={newsImage || "/placeholder.svg"} alt={newsTitle} fill className="object-cover" />
            </div>
          )}

          <div className="prose dark:prose-invert max-w-none">
            {newsContent ? (
              <div dangerouslySetInnerHTML={{ __html: newsContent }} />
            ) : (
              <p>
                {language === "en" && "No content available for this news item."}
                {language === "ru" && "Содержание для этой новости недоступно."}
                {language === "uz" && "Bu yangilik uchun tarkib mavjud emas."}
              </p>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              {language === "en" && "Share"}
              {language === "ru" && "Поделиться"}
              {language === "uz" && "Ulashish"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
