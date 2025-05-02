"use client"

import { useState, useEffect } from "react"
import { fetchTeamMembers, fetchTestimonials } from "@/lib/api"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import ApiConnectionError from "@/components/api-connection-error"
import { useLanguage } from "@/components/language-provider"

interface TeamMember {
  id: number
  name: string
  title: string
  bio: string
  photo: string
}

interface Testimonial {
  id: number
  content: string
  author: string
  photo: string
}

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()

  const fetchData = async () => {
    setIsLoading(true)
    setHasError(false)

    try {
      const teamData = await fetchTeamMembers()
      const testimonialsData = await fetchTestimonials()

      if (teamData && teamData.results) {
        setTeamMembers(teamData.results)
      }

      if (testimonialsData && testimonialsData.results) {
        setTestimonials(testimonialsData.results)
      }
    } catch (error) {
      console.error("Error in About page:", error)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          {hasError && <ApiConnectionError onRetry={fetchData} />}

          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t("aboutTitle")}</h1>
            <p className="text-xl text-muted-foreground">
              {t("aboutDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-[150px]" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                      </CardContent>
                    </Card>
                  ))
              : teamMembers.map((member) => (
                  <Card key={member.id}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={member.photo} alt={member.name} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{member.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{member.title}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{t("testimonials")}</h2>
            <div className="space-y-6">
              {isLoading
                ? Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <Card key={i}>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <div className="flex items-center space-x-4">
                              <Skeleton className="h-12 w-12 rounded-full" />
                              <div>
                                <Skeleton className="h-4 w-[150px]" />
                                <Skeleton className="h-4 w-[100px]" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                : testimonials.map((testimonial) => (
                    <Card key={testimonial.id}>
                      <CardContent className="pt-6">
                        <p className="text-lg mb-4">{testimonial.content}</p>
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={testimonial.photo} alt={testimonial.author} />
                            <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{testimonial.author}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
