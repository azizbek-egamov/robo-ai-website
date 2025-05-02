"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CalendarDays, Tag, ExternalLink } from "lucide-react"
import NoDataMessage from "@/components/no-data-message"

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: string;
  tags: string[];
  external_link?: string;
}

interface NewsSidebarProps {
  news: NewsItem[];
}

const categoryColors = {
  event: "bg-blue-100 text-blue-800",
  announcement: "bg-green-100 text-green-800",
  update: "bg-yellow-100 text-yellow-800",
  competition: "bg-purple-100 text-purple-800",
  default: "bg-gray-100 text-gray-800",
}

const categoryLabels = {
  event: "Tadbir",
  announcement: "E'lon",
  update: "Yangilanish",
  competition: "Musobaqa",
}

export default function NewsSidebar({ news }: NewsSidebarProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return "Sana mavjud emas"
      }
      return new Intl.DateTimeFormat("uz-UZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    } catch (error) {
      return "Sana mavjud emas"
    }
  }

  const newsToDisplay = news || []

  if (!newsToDisplay || newsToDisplay.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Yangiliklar</CardTitle>
        </CardHeader>
        <CardContent>
          <NoDataMessage type="news" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>So'nggi yangiliklar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {newsToDisplay.map((item) => (
          <div key={item.id} className="space-y-3 pb-4 border-b last:border-0">
            <div className="flex items-center justify-between">
              <Badge 
                className={categoryColors[item.category as keyof typeof categoryColors] || categoryColors.default}
              >
                {categoryLabels[item.category as keyof typeof categoryLabels] || item.category}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>{formatDate(item.date)}</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium hover:text-primary transition-colors">
                <Link href={`/news/${item.id}`}>{item.title}</Link>
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {item.summary}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between pt-2">
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href={`/news/${item.id}`}>Batafsil</Link>
              </Button>
              {item.external_link && (
                <Button variant="ghost" size="sm" className="gap-2" asChild>
                  <a href={item.external_link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Manba
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/news">Barcha yangiliklar</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

