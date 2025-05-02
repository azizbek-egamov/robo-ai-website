"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Clock, Users, BookOpen, Tag } from "lucide-react"
import NoDataMessage from "@/components/no-data-message"

interface Project {
  id: number;
  title: string;
  summary: string;
  estimated_time: string;
  max_participants: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  status: 'active' | 'completed' | 'upcoming';
}

interface LatestProjectsProps {
  projects: Project[];
}

const difficultyColors = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
}

const statusColors = {
  active: "bg-blue-100 text-blue-800",
  completed: "bg-gray-100 text-gray-800",
  upcoming: "bg-purple-100 text-purple-800",
}

const statusLabels = {
  active: "Faol",
  completed: "Yakunlangan",
  upcoming: "Kutilayotgan",
}

export default function LatestProjects({ projects }: LatestProjectsProps) {
  const getDifficultyText = (difficulty: string) => {
    return difficulty === "beginner" ? "Boshlang'ich" : 
           difficulty === "intermediate" ? "O'rta" : 
           "Yuqori"
  }

  const projectsToDisplay = projects || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">So'nggi loyihalar</h2>
        <Button variant="outline" asChild>
          <Link href="/projects">Barcha loyihalar</Link>
        </Button>
      </div>

      {!projectsToDisplay || projectsToDisplay.length === 0 ? (
        <NoDataMessage type="projects" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsToDisplay.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="space-y-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <Badge className={statusColors[project.status]}>
                    {statusLabels[project.status]}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags && project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground line-clamp-3">{project.summary}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{project.estimated_time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{project.max_participants} o'quvchi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <Badge className={difficultyColors[project.difficulty]}>
                      {getDifficultyText(project.difficulty)}
                    </Badge>
                  </div>
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link href={`/projects/${project.id}`}>
                    {project.status === 'active' ? 'Loyihani boshlash' :
                     project.status === 'upcoming' ? 'Eslatma qo\'yish' :
                     'Batafsil ma\'lumot'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

