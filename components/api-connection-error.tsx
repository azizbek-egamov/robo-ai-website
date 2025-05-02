"use client"

import { useLanguage } from "@/components/language-provider"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ApiConnectionError({ onRetry }: { onRetry?: () => void }) {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "API Connection Error",
      message:
        "We're having trouble connecting to our servers. This could be due to network issues or the API server might be down.",
      apiMessage: "The application is trying to connect to:",
      checkServer: "Please make sure the server is running and accessible.",
      retry: "Retry Connection",
    },
    ru: {
      title: "Ошибка подключения к API",
      message:
        "У нас возникли проблемы с подключением к нашим серверам. Это может быть связано с проблемами сети или сервер API может быть недоступен.",
      apiMessage: "Приложение пытается подключиться к:",
      checkServer: "Пожалуйста, убедитесь, что сервер запущен и доступен.",
      retry: "Повторить подключение",
    },
    uz: {
      title: "API ulanish xatosi",
      message:
        "Serverlarimizga ulanishda muammo yuz berdi. Bu tarmoq muammolari tufayli bo'lishi mumkin yoki API server ishlamayotgan bo'lishi mumkin.",
      apiMessage: "Ilova ulanishga harakat qilmoqda:",
      checkServer: "Iltimos, server ishga tushirilganligini va unga kirish mumkinligini tekshiring.",
      retry: "Ulanishni qayta sinab ko'rish",
    },
  }

  return (
    <Card className="p-6 mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
      <div className="flex items-start gap-4">
        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
        <div>
          <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">{content[language].title}</h3>
          <p className="text-amber-700 dark:text-amber-400 mb-2">{content[language].message}</p>
          <p className="text-amber-700 dark:text-amber-400 mb-1">{content[language].apiMessage}</p>
          <code className="bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded text-amber-800 dark:text-amber-300 text-sm block mb-2">
            {process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}
          </code>
          <p className="text-amber-700 dark:text-amber-400 text-sm">{content[language].checkServer}</p>

          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              className="mt-4 bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300 dark:bg-amber-900 dark:hover:bg-amber-800 dark:text-amber-300 dark:border-amber-700"
            >
              {content[language].retry}
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

