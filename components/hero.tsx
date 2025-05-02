"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useEffect, useState } from "react"

export default function Hero() {
  const { t } = useLanguage()
  const [api, setApi] = useState<any>()

  // Set up auto-rotation every 2 seconds
  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 2000)

    return () => clearInterval(interval)
  }, [api])

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 dark:from-blue-900/30 dark:to-green-900/30" />
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t("heroTitle")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("heroSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/courses">{t("getStarted")}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">{t("learnMore")}</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Carousel className="w-full h-full" setApi={setApi}>
              <CarouselContent>
                <CarouselItem>
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vSQKuhTzAHIxhbMEbfz8zOuEtarVPo.png"
                      alt="Children designing robots on interactive screen"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RuNzhtZSBkyV2Bp3xnzD87YsnpWz4A.png"
                      alt="Child building robot car with electronics"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Xz6oEnLgf1mfU7eCveTjzFftpQlCXV.png"
                      alt="Child programming educational robots with tablet"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FPDRzNRDxYK5EfofdrJbewYQKsyxTW.png"
                      alt="Students collaborating on robotics project"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dAO9ZoFGp1Bvo7q5nzMLnPjfik1hlO.png"
                      alt="Students working with educational robots in classroom"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-[300px] md:h-[400px] w-full">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4qnq7gNkvm5D6BNyDkYWjbGOAvNzxD.png"
                      alt="Robotics competition with student teams"
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

