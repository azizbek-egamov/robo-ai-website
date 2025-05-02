import { fetchResources } from "@/lib/api"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowLeft, AlertCircle } from "lucide-react"

// Server Component
export default async function ResourceCategoryPage({ params }) {
  const { category } = params

  // Validate category
  const validCategories = ["tutorials", "videos", "books", "downloads"]
  if (!validCategories.includes(category)) {
    return notFound()
  }

  try {
    // Fetch resources for this category
    const resourcesData = await fetchResources(category)
    const resources = resourcesData.results || []

    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" asChild className="mb-6">
          <Link href="/resources">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-6 capitalize">{category}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.length > 0 ? (
            resources.map((resource) => (
              <Card key={resource.id} className="flex flex-col h-full">
                {resource.image && (
                  <div className="relative h-48">
                    <Image
                      src={resource.image || "/placeholder.svg?height=200&width=300"}
                      alt={resource.title_en || resource.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{resource.title_en || resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{resource.description_en || resource.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/resources/${category}/${resource.id}`}>View Resource</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-medium mb-2">No resources available</h2>
              <p className="text-muted-foreground">No resources found in this category. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error(`Error fetching resources for category ${category}:`, error)
    return notFound()
  }
}
