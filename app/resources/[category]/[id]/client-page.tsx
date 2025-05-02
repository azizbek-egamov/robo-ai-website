"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Download, AlertCircle } from "lucide-react"
import Image from "next/image"

// Ma'lumotlarni to'g'ri ko'rsatish uchun o'zgartirishlar
export default function ClientResourcePage({ resource, category }) {
  const { language } = useLanguage()

  // Agar resource undefined bo'lsa, xatolik xabarini ko'rsatish
  if (!resource) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-medium mb-2">
            {language === "en" ? "Resource not found" : language === "ru" ? "Ресурс не найден" : "Resurs topilmadi"}
          </h2>
          <Button asChild className="mt-4">
            <Link href="/resources">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === "en" ? "Back to Resources" : language === "ru" ? "Назад к ресурсам" : "Resurslarga qaytish"}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Ensure we have the title and description in all languages
  const title =
    language === "en"
      ? resource.title_en || resource.title
      : language === "ru"
        ? resource.title_ru || resource.title
        : resource.title_uz || resource.title || "Resource"

  const description =
    language === "en"
      ? resource.description_en || resource.description
      : language === "ru"
        ? resource.description_ru || resource.description
        : resource.description_uz || resource.description || ""

  const content =
    language === "en"
      ? resource.content_en || resource.content
      : language === "ru"
        ? resource.content_ru || resource.content
        : resource.content_uz || resource.content || ""

  const image = resource.image || "/placeholder.svg?height=400&width=600"
  const externalLink = resource.external_link || ""
  const isExternal = resource.is_external || false
  const isDownloadable = resource.is_downloadable || false

  // Kategoriya nomini o'zgartirish
  const getCategoryName = (cat) => {
    if (language === "en") {
      return cat === "tutorials" ? "Tutorials" : cat === "videos" ? "Videos" : cat === "books" ? "Books" : "Downloads"
    } else if (language === "ru") {
      return cat === "tutorials" ? "Руководства" : cat === "videos" ? "Видео" : cat === "books" ? "Книги" : "Загрузки"
    } else {
      return cat === "tutorials"
        ? "Qo'llanmalar"
        : cat === "videos"
          ? "Videolar"
          : cat === "books"
            ? "Kitoblar"
            : "Yuklamalar"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/resources">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === "en" && "Back to Resources"}
          {language === "ru" && "Назад к ресурсам"}
          {language === "uz" && "Resurslarga qaytish"}
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {image && (
            <div className="relative w-full h-64 rounded-md overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
              />
            </div>
          )}
          <p>{description}</p>
          {content && (
            <div className="mt-6">
              <h3 className="text-xl font-medium mb-2">
                {language === "en" && "Content"}
                {language === "ru" && "Содержание"}
                {language === "uz" && "Tarkib"}
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-4 mt-6">
            {externalLink && (
              <Button asChild className="flex items-center gap-2">
                <Link href={externalLink} target={isExternal ? "_blank" : "_self"} rel="noopener noreferrer">
                  {isExternal && <ExternalLink className="h-4 w-4" />}
                  {isDownloadable && <Download className="h-4 w-4" />}
                  {language === "en" && (isDownloadable ? "Download Resource" : "View Resource")}
                  {language === "ru" && (isDownloadable ? "Скачать ресурс" : "Смотреть ресурс")}
                  {language === "uz" && (isDownloadable ? "Resursni yuklab olish" : "Resursni ko'rish")}
                </Link>
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href={`/resources/${category}`}>
                {language === "en" && `View All ${getCategoryName(category)}`}
                {language === "ru" && `Смотреть все ${getCategoryName(category)}`}
                {language === "uz" && `Barcha ${getCategoryName(category)}ni ko'rish`}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
