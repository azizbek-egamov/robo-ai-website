"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function NoDataMessage({
  type = "generic",
}: { type?: "generic" | "courses" | "projects" | "tasks" | "resources" | "news" }) {
  const messages = {
    generic: "Ma'lumotlar mavjud emas",
    courses: "Kurslar mavjud emas",
    projects: "Loyihalar mavjud emas",
    tasks: "Topshiriqlar mavjud emas",
    resources: "Resurslar mavjud emas",
    news: "Yangiliklar mavjud emas",
  }

  const description = "So'ralgan ma'lumotlarni serverdan yuklab bo'lmadi. Iltimos, keyinroq qayta urinib ko'ring."

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-4">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <div>
            <h3 className="font-medium">{messages[type]}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

