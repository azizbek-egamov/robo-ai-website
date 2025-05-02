"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Clock, Award } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Task {
  id: number
  title: string
  title_en?: string
  title_ru?: string
  title_uz?: string
  description: string
  description_en?: string
  description_ru?: string
  description_uz?: string
  detailed_description?: string
  difficulty: string
  status: string
  points: number
  estimated_time: string
  estimated_time_en?: string
  estimated_time_ru?: string
  estimated_time_uz?: string
  related_course?: number
  related_course_title?: string
  sample_code?: string
  requirements?: Array<{ id: number; requirement: string }>
  hints?: Array<{ id: number; hint: string }>
  created_at: string
  updated_at: string
}

interface ClientTasksPageProps {
  tasks: Task[]
}

export default function ClientTasksPage({ tasks = [] }: ClientTasksPageProps) {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  console.log("ClientTasksPage received tasks:", tasks)

  // pageTitle va pageDescription o'zgaruvchilarini o'zgartirish
  const pageTitle = {
    en: "Practical Tasks",
    ru: "Практические задания",
    uz: "Amaliy topshiriqlar",
  } as const

  const pageDescription = {
    en: "Complete these hands-on tasks to apply your knowledge and earn points.",
    ru: "Выполните эти практические задания, чтобы применить свои знания и заработать баллы.",
    uz: "Bilimlaringizni qo'llash va ball to'plash uchun ushbu amaliy topshiriqlarni bajaring.",
  } as const

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    const statusTexts = {
      en: {
        completed: "Completed",
        in_progress: "In Progress",
        not_started: "Not Started",
      },
      ru: {
        completed: "Завершено",
        in_progress: "В процессе",
        not_started: "Не начато",
      },
      uz: {
        completed: "Bajarilgan",
        in_progress: "Jarayonda",
        not_started: "Boshlanmagan",
      },
    }

    return statusTexts[language as keyof typeof statusTexts][status as keyof typeof statusTexts.en] || status
  }

  const getDifficultyText = (difficulty: string) => {
    if (!difficulty) return ""

    if (language === "en") {
      return difficulty === "beginner" ? "Beginner" : difficulty === "intermediate" ? "Intermediate" : "Advanced"
    } else if (language === "ru") {
      return difficulty === "beginner" ? "Начальный" : difficulty === "intermediate" ? "Средний" : "Продвинутый"
    } else {
      return difficulty === "beginner" ? "Boshlang'ich" : difficulty === "intermediate" ? "O'rta" : "Yuqori"
    }
  }

  const filteredTasks = tasks.filter((task: Task) => {
    // Safely access title with fallbacks
    const title =
      language === "en"
        ? task.title_en || task.title
        : language === "ru"
          ? task.title_ru || task.title
          : language === "uz"
            ? task.title_uz || task.title
            : task.title

    if (!title) {
      console.warn("Task missing title:", task)
      return false
    }

    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || (task.difficulty || "") === difficultyFilter

    return matchesSearch && matchesDifficulty
  })

  console.log("Filtered tasks:", filteredTasks.length)

  const renderTaskCard = (task: Task) => {
    // Safely access properties with fallbacks
    const title =
      language === "en"
        ? task.title_en || task.title
        : language === "ru"
          ? task.title_ru || task.title
          : language === "uz"
            ? task.title_uz || task.title
            : task.title

    const description =
      language === "en"
        ? task.description_en || task.description
        : language === "ru"
          ? task.description_ru || task.description
          : language === "uz"
            ? task.description_uz || task.description
            : task.description

    const estimatedTime =
      language === "en"
        ? task.estimated_time_en || task.estimated_time
        : language === "ru"
          ? task.estimated_time_ru || task.estimated_time
          : language === "uz"
            ? task.estimated_time_uz || task.estimated_time
            : task.estimated_time

    // Safely access related course title
    const courseTitle = task.related_course_title || (task.related_course ? task.related_course.title : null)

    return (
      <Card key={task.id} className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{title}</CardTitle>
            <div className="flex items-center gap-2">
              {getStatusIcon(task.status || "not_started")}
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status || "not_started")}`}>
                {getStatusText(task.status || "not_started")}
              </span>
            </div>
          </div>
          {courseTitle && (
            <p className="text-sm text-muted-foreground">
              {language === "en" ? "Related Course: " : language === "ru" ? "Связанный курс: " : "Bog'liq kurs: "}
              {courseTitle}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{description}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span>
                {task.points} {language === "en" ? "points" : language === "ru" ? "баллов" : "ball"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(task.difficulty || "beginner")}`}>
                {getDifficultyText(task.difficulty || "beginner")}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href={`/tasks/${task.id}`}>
              {language === "en" ? "View Details" : language === "ru" ? "Подробнее" : "Batafsil"}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{pageTitle[language as keyof typeof pageTitle]}</h1>
          <p className="text-muted-foreground">{pageDescription[language as keyof typeof pageDescription]}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder={
              language === "en"
                ? "Search tasks..."
                : language === "ru"
                  ? "Поиск заданий..."
                  : "Topshiriqlarni qidirish..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={
                  language === "en" ? "All difficulties" : language === "ru" ? "Все уровни" : "Barcha darajalar"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === "en" ? "All difficulties" : language === "ru" ? "Все уровни" : "Barcha darajalar"}
              </SelectItem>
              <SelectItem value="beginner">
                {language === "en" ? "Beginner" : language === "ru" ? "Начальный" : "Boshlang'ich"}
              </SelectItem>
              <SelectItem value="intermediate">
                {language === "en" ? "Intermediate" : language === "ru" ? "Средний" : "O'rta"}
              </SelectItem>
              <SelectItem value="advanced">
                {language === "en" ? "Advanced" : language === "ru" ? "Продвинутый" : "Yuqori"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{filteredTasks.map(renderTaskCard)}</div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              {language === "en"
                ? "No tasks found. Try changing your filters."
                : language === "ru"
                  ? "Задания не найдены. Попробуйте изменить фильтры."
                  : "Topshiriqlar topilmadi. Filtrlarni o'zgartirib ko'ring."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
