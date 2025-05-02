import { fetchProject } from "@/lib/api"
import ClientProjectPage from "./client-page"

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const projectId = params.id

  try {
    // API dan loyiha ma'lumotlarini olish
    const project = await fetchProject(projectId)

    return <ClientProjectPage project={project} />
  } catch (error) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Xatolik yuz berdi</h1>
        <p className="text-muted-foreground">
          Loyiha ma'lumotlarini yuklab bo'lmadi. Iltimos, keyinroq qayta urinib ko'ring.
        </p>
      </div>
    )
  }
}

