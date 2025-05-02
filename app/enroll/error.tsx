"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { language } = useLanguage()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const content = {
    en: {
      title: "Something went wrong!",
      description: "An error occurred while loading the enrollment form.",
      tryAgain: "Try again",
      backToCourses: "Back to Courses",
    },
    ru: {
      title: "Что-то пошло не так!",
      description: "Произошла ошибка при загрузке формы записи.",
      tryAgain: "Попробовать снова",
      backToCourses: "Назад к курсам",
    },
    uz: {
      title: "Nimadir noto'g'ri bajarildi!",
      description: "Ro'yxatdan o'tish formasini yuklashda xatolik yuz berdi.",
      tryAgain: "Qayta urinib ko'ring",
      backToCourses: "Kurslarga qaytish",
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
          <h2 className="text-2xl font-bold mb-4">{content[language as keyof typeof content].title}</h2>
          <p className="text-muted-foreground mb-6">{content[language as keyof typeof content].description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={reset} variant="outline">
              {content[language as keyof typeof content].tryAgain}
            </Button>
            <Button asChild>
              <Link href="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {content[language as keyof typeof content].backToCourses}
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

