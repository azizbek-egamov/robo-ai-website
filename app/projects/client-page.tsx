"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle } from "lucide-react"

interface Project {
  id: number
  title: string
  title_en?: string
  title_ru?: string
  title_uz?: string
  description: string
  description_en?: string
  description_ru?: string
  description_uz?: string
  image: string
  difficulty: string
  materials: {
    id: number
    title: string
    description: string
    quantity: number
    unit: string
  }[]
  steps: {
    id: number
    step_number: number
    title: string
    description: string
    image: string
  }[]
  created_at: string
  updated_at: string
}

interface ClientProjectsPageProps {
  initialProjects: Project[]
}

export default function ClientProjectsPage({ initialProjects }: ClientProjectsPageProps) {
  const { t, language } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // Validate and set projects
    if (initialProjects && Array.isArray(initialProjects)) {
      const validatedProjects = initialProjects.map((project) => {
        const titleField = `title_${language}` as keyof Project;
        const descriptionField = `description_${language}` as keyof Project;
        
        return {
          id: project.id || 0,
          title: String(project[titleField] || project.title || "Loyiha"),
          description: String(project[descriptionField] || project.description || ""),
          image: String(project.image || "/robotics-project.png"),
          difficulty: String(project.difficulty || "beginner"),
          materials: (project.materials || []).map((material) => ({
            id: material.id || 0,
            title: String(material.title || ""),
            description: String(material.description || ""),
            quantity: Number(material.quantity || 0),
            unit: String(material.unit || ""),
          })),
          steps: (project.steps || []).map((step) => ({
            id: step.id || 0,
            step_number: Number(step.step_number || 0),
            title: String(step.title || ""),
            description: String(step.description || ""),
            image: String(step.image || "/robotics-step.png"),
          })),
          created_at: String(project.created_at || new Date().toISOString()),
          updated_at: String(project.updated_at || new Date().toISOString()),
        } as Project
      })
      setProjects(validatedProjects)
    }
  }, [initialProjects, language])

  const projectCategories = [
    { id: "all", name: language === "en" ? "All Projects" : language === "ru" ? "Все проекты" : "Barcha loyihalar" },
    { id: "beginner", name: language === "en" ? "Beginner" : language === "ru" ? "Начальный" : "Boshlang'ich" },
    { id: "intermediate", name: language === "en" ? "Intermediate" : language === "ru" ? "Средний" : "O'rta" },
    { id: "advanced", name: language === "en" ? "Advanced" : language === "ru" ? "Продвинутый" : "Yuqori" },
  ]

  const filterByCategory = (category: string) => {
    if (!projects || projects.length === 0) {
      return []
    }

    if (category === "all") {
      return projects
    }

    return projects.filter((project) => {
      if (!project.difficulty) {
        return false
      }
      return project.difficulty.toLowerCase() === category.toLowerCase()
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t("projects")}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("projectDescription")}</p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-medium mb-2">{t("noProjectsAvailable")}</h2>
              <p className="text-muted-foreground">{t("checkBackLater")}</p>
            </div>
          ) : (
            <>
              <Tabs defaultValue="all" className="mb-12">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  {projectCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {projectCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filterByCategory(category.id).map((project) => (
                        <Card key={project.id} className="overflow-hidden">
                          <div className="relative h-48">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority={false}
                            />
                          </div>
                          <CardHeader>
                            <CardTitle>{project.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">{project.description}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary">
                                {project.difficulty}
                              </span>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button asChild className="w-full">
                              <Link href={`/projects/${project.id}`}>{t("viewProject")}</Link>
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
