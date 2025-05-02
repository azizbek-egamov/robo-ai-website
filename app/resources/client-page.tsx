"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle } from "lucide-react"

interface Resource {
  id: number
  title: string
  title_en?: string
  title_ru?: string
  title_uz?: string
  description: string
  description_en?: string
  description_ru?: string
  description_uz?: string
  content: string
  content_en?: string
  content_ru?: string
  content_uz?: string
  image: string
  category: string
  file: string
  external_link: string
  is_external: boolean
  is_downloadable: boolean
  created_at: string
  updated_at: string
}

interface ClientResourcesPageProps {
  initialResources: Resource[]
}

export default function ClientResourcesPage({ initialResources }: ClientResourcesPageProps) {
  const { t, language } = useLanguage()
  const [resources, setResources] = useState<Resource[]>([])

  // useEffect hook ichidagi ma'lumotlarni validatsiya qilish va o'rnatish qismini o'zgartirish
  useEffect(() => {
    // Validate and set resources
    if (initialResources && Array.isArray(initialResources)) {
      const validatedResources = initialResources.map((resource) => {
        const title =
          language === "en"
            ? resource.title_en || resource.title
            : language === "ru"
              ? resource.title_ru || resource.title
              : language === "uz"
                ? resource.title_uz || resource.title
                : resource.title

        const description =
          language === "en"
            ? resource.description_en || resource.description
            : language === "ru"
              ? resource.description_ru || resource.description
              : language === "uz"
                ? resource.description_uz || resource.description
                : resource.description

        const content =
          language === "en"
            ? resource.content_en || resource.content
            : language === "ru"
              ? resource.content_ru || resource.content
              : language === "uz"
                ? resource.content_uz || resource.content
                : resource.content

        return {
          ...resource,
          title: title || "Resurs",
          description: description || "",
          content: content || "",
          image: resource.image || "/placeholder.svg?height=200&width=300",
          category: resource.category || "tutorials",
        }
      })
      setResources(validatedResources)
    } else {
      console.warn("Invalid resources data:", initialResources)
      setResources([])
    }
  }, [initialResources, language])

  // resourceCategories o'zgaruvchisini o'zgartirish
  const resourceCategories = [
    { id: "all", name: language === "en" ? "All Resources" : language === "ru" ? "Все ресурсы" : "Barcha resurslar" },
    { id: "tutorials", name: language === "en" ? "Tutorials" : language === "ru" ? "Руководства" : "Darsliklar" },
    { id: "videos", name: language === "en" ? "Videos" : language === "ru" ? "Видео" : "Video darslar" },
    { id: "books", name: language === "en" ? "Books" : language === "ru" ? "Книги" : "Kitoblar" },
    { id: "downloads", name: language === "en" ? "Downloads" : language === "ru" ? "Загрузки" : "Yuklamalar" },
  ]

  const filterByCategory = (category: string) => {
    if (!resources || resources.length === 0) {
      return []
    }

    if (category === "all") {
      return resources
    }

    return resources.filter((resource) => {
      if (!resource.category) {
        return false
      }
      return resource.category.toLowerCase() === category.toLowerCase()
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t("resources")}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("resourceDescription")}</p>
      </div>

      {resources.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-medium mb-2">{t("noResourcesAvailable")}</h2>
          <p className="text-muted-foreground">{t("checkBackLater")}</p>
        </div>
      ) : (
        <>
          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="flex flex-wrap justify-center mb-8">
              {resourceCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="px-4 py-2">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {resourceCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterByCategory(category.id).length > 0 ? (
                    filterByCategory(category.id).map((resource) => (
                      <Card key={resource.id} className="overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={resource.image || "/placeholder.svg?height=200&width=300"}
                            alt={resource.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={false}
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>{resource.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{resource.description}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary">
                              {resource.category}
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="w-full">
                            <Link href={`/resources/${resource.category}/${resource.id}`}>{t("viewResource")}</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-muted-foreground">
                        {language === "en"
                          ? "No resources available in this category"
                          : language === "ru"
                            ? "В этой категории нет доступных ресурсов"
                            : "Bu kategoriyada resurslar mavjud emas"}
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
  )
}
