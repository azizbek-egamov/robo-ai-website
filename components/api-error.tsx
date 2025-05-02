"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function ApiError({ onRetry }: { onRetry?: () => void }) {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "API Connection Error",
      message:
        "We're having trouble connecting to our servers. This could be due to network issues or the API server might be down.",
      retry: "Retry Connection",
      continue: "Continue with Limited Functionality",
    },
    ru: {
      title: "Ошибка подключения к API",
      message:
        "У нас возникли проблемы с подключением к нашим серверам. Это может быть связано с проблемами сети или сервер API может быть недоступен.",
      retry: "Повторить подключение",
      continue: "Продолжить с ограниченной функциональностью",
    },
    uz: {
      title: "API ulanish xatosi",
      message:
        "Serverlarimizga ulanishda muammo yuz berdi. Bu tarmoq muammolari tufayli bo'lishi mumkin yoki API server ishlamayotgan bo'lishi mumkin.",
      retry: "Ulanishni qayta sinab ko'rish",
      continue: "Cheklangan funksionallik bilan davom etish",
    },
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 max-w-md mx-auto my-8">
      <div className="flex flex-col items-center text-center gap-4">
        <AlertCircle className="h-12 w-12 text-amber-500" />
        <h3 className="text-xl font-semibold">{content[language].title}</h3>
        <p className="text-muted-foreground">{content[language].message}</p>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          {onRetry && (
            <Button onClick={onRetry} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              {content[language].retry}
            </Button>
          )}
          <Button variant="outline" onClick={() => window.location.reload()}>
            {content[language].continue}
          </Button>
        </div>
      </div>
    </div>
  )
}

