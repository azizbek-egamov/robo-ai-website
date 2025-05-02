"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Clock, Users, BookOpen, Award, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SyllabusItem {
  week: number;
  topics: {
    title: string;
    title_en?: string;
    title_ru?: string;
    title_uz?: string;
    description: string;
    description_en?: string;
    description_ru?: string;
    description_uz?: string;
  }[];
}

interface Course {
  id: number;
  title: string;
  title_en?: string;
  title_ru?: string;
  title_uz?: string;
  description: string;
  description_en?: string;
  description_ru?: string;
  description_uz?: string;
  detailed_description: string;
  detailed_description_en?: string;
  detailed_description_ru?: string;
  detailed_description_uz?: string;
  duration: string;
  duration_en?: string;
  duration_ru?: string;
  duration_uz?: string;
  schedule: string;
  schedule_en?: string;
  schedule_ru?: string;
  schedule_uz?: string;
  start_date: string;
  start_date_en?: string;
  start_date_ru?: string;
  start_date_uz?: string;
  price: string;
  price_en?: string;
  price_ru?: string;
  price_uz?: string;
  image: string;
  difficulty: string;
  max_students: number;
  syllabus_items: SyllabusItem[];
  instructors: {
    name: string;
    name_en?: string;
    name_ru?: string;
    name_uz?: string;
    title: string;
    title_en?: string;
    title_ru?: string;
    title_uz?: string;
    bio: string;
    bio_en?: string;
    bio_ru?: string;
    bio_uz?: string;
    photo: string;
  }[];
}

interface ClientCoursePageProps {
  course: Course;
}

export default function ClientCoursePage({ course }: ClientCoursePageProps) {
  const { language } = useLanguage()

  // Agar course undefined bo'lsa, xatolik xabarini ko'rsatish
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-medium mb-2">
              {language === "en" ? "Course not found" : language === "ru" ? "Курс не найден" : "Kurs topilmadi"}
            </h2>
            <Button asChild className="mt-4">
              <Link href="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "en" ? "Back to Courses" : language === "ru" ? "Назад к курсам" : "Kurslarga qaytish"}
              </Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // Kurs ma'lumotlarini olish
  const titleField = `title_${language}` as keyof Course;
  const descriptionField = `description_${language}` as keyof Course;
  const detailedDescriptionField = `detailed_description_${language}` as keyof Course;
  const durationField = `duration_${language}` as keyof Course;
  const scheduleField = `schedule_${language}` as keyof Course;
  const startDateField = `start_date_${language}` as keyof Course;
  const priceField = `price_${language}` as keyof Course;

  const courseTitle = String(course[titleField] || course.title || "Course");
  const courseDescription = String(course[descriptionField] || course.description || "");
  const courseDetailedDescription = String(course[detailedDescriptionField] || course.detailed_description || "");
  const courseDuration = String(course[durationField] || course.duration || "");
  const courseSchedule = String(course[scheduleField] || course.schedule || "");
  const courseStartDate = String(course[startDateField] || course.start_date || "");
  const coursePrice = String(course[priceField] || course.price || "");
  const courseImage = String(course.image || "/robotics-course.png");
  const courseDifficulty = String(course.difficulty || "beginner");
  const courseMaxStudents = Number(course.max_students || 0);

  // Syllabus items va instructors uchun tekshirish
  const courseSyllabusItems = Array.isArray(course.syllabus_items) ? course.syllabus_items : [];
  const courseInstructors = Array.isArray(course.instructors) ? course.instructors : [];

  // Instructor ma'lumotlarini olish
  const getInstructorInfo = (instructor: Course['instructors'][0]) => {
    const nameField = `name_${language}` as keyof typeof instructor;
    const titleField = `title_${language}` as keyof typeof instructor;
    const bioField = `bio_${language}` as keyof typeof instructor;

    return {
      name: String(instructor[nameField] || instructor.name || ""),
      title: String(instructor[titleField] || instructor.title || ""),
      bio: String(instructor[bioField] || instructor.bio || ""),
      photo: String(instructor.photo || "/placeholder.svg")
    };
  };

  // Syllabus items uchun ma'lumotlarni olish
  const getSyllabusInfo = (item: SyllabusItem) => {
    const weekTitle = language === "en" ? `Week ${item.week}` : 
                     language === "ru" ? `Неделя ${item.week}` : 
                     `${item.week}-hafta`;
    
    return {
      week: item.week,
      title: weekTitle,
      topics: item.topics.map(topic => {
        const titleField = `title_${language}` as keyof typeof topic;
        const descriptionField = `description_${language}` as keyof typeof topic;
        
        return {
          title: String(topic[titleField] || topic.title || ""),
          description: String(topic[descriptionField] || topic.description || "")
        };
      })
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Button variant="outline" asChild className="mb-6">
            <Link href="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === "en" && "Back to Courses"}
              {language === "ru" && "Назад к курсам"}
              {language === "uz" && "Kurslarga qaytish"}
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6">
                <Image src={courseImage || "/placeholder.svg"} alt={courseTitle} fill className="object-cover" />
              </div>

              <h1 className="text-3xl font-bold mb-4">{courseTitle}</h1>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">
                  {language === "en" && courseDifficulty === "beginner" && "Beginner"}
                  {language === "ru" && courseDifficulty === "beginner" && "Начальный"}
                  {language === "uz" && courseDifficulty === "beginner" && "Boshlang'ich"}

                  {language === "en" && courseDifficulty === "intermediate" && "Intermediate"}
                  {language === "ru" && courseDifficulty === "intermediate" && "Средний"}
                  {language === "uz" && courseDifficulty === "intermediate" && "O'rta"}

                  {language === "en" && courseDifficulty === "advanced" && "Advanced"}
                  {language === "ru" && courseDifficulty === "advanced" && "Продвинутый"}
                  {language === "uz" && courseDifficulty === "advanced" && "Yuqori"}
                </Badge>
                <Badge variant="outline">{courseDuration}</Badge>
              </div>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <p className="text-lg">{courseDetailedDescription}</p>
              </div>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {language === "en" && "Course Details"}
                    {language === "ru" && "Детали курса"}
                    {language === "uz" && "Kurs tafsilotlari"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium text-sm">
                          {language === "en" && "Start Date"}
                          {language === "ru" && "Дата начала"}
                          {language === "uz" && "Boshlanish sanasi"}
                        </h3>
                        <p>{courseStartDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium text-sm">
                          {language === "en" && "Schedule"}
                          {language === "ru" && "Расписание"}
                          {language === "uz" && "Jadval"}
                        </h3>
                        <p>{courseSchedule}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium text-sm">
                          {language === "en" && "Class Size"}
                          {language === "ru" && "Размер класса"}
                          {language === "uz" && "Sinf hajmi"}
                        </h3>
                        <p>
                          {language === "en" && `${courseMaxStudents} students max`}
                          {language === "ru" && `Максимум ${courseMaxStudents} студентов`}
                          {language === "uz" && `Maksimum ${courseMaxStudents} o'quvchi`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium text-sm">
                          {language === "en" && "Duration"}
                          {language === "ru" && "Продолжительность"}
                          {language === "uz" && "Davomiyligi"}
                        </h3>
                        <p>{courseDuration}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium text-sm">
                          {language === "en" && "Certificate"}
                          {language === "ru" && "Сертификат"}
                          {language === "uz" && "Sertifikat"}
                        </h3>
                        <p>
                          {language === "en" && "Certificate of Completion"}
                          {language === "ru" && "Сертификат об окончании"}
                          {language === "uz" && "Tugatish sertifikati"}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-center mb-2">
                        <span className="text-2xl font-bold">{coursePrice}</span>
                      </div>
                      <Button asChild className="w-full">
                        <Link href={`/enroll?course=${course.id}`}>
                          {language === "en" && "Enroll Now"}
                          {language === "ru" && "Записаться"}
                          {language === "uz" && "Ro'yxatdan o'tish"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {courseInstructors.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "en" && "Instructor"}
                      {language === "ru" && "Преподаватель"}
                      {language === "uz" && "O'qituvchi"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-muted mb-4 overflow-hidden relative">
                        <Image
                          src={getInstructorInfo(courseInstructors[0]).photo || "/placeholder.svg?height=96&width=96&query=instructor"}
                          alt={getInstructorInfo(courseInstructors[0]).name || "Instructor"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-lg">{getInstructorInfo(courseInstructors[0]).name || "Instructor"}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {getInstructorInfo(courseInstructors[0]).title || ""}
                      </p>
                      <p className="text-sm">
                        {getInstructorInfo(courseInstructors[0]).bio || ""}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <Tabs defaultValue="syllabus" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="syllabus">
                {language === "en" && "Course Syllabus"}
                {language === "ru" && "Программа курса"}
                {language === "uz" && "Kurs dasturi"}
              </TabsTrigger>
              <TabsTrigger value="requirements">
                {language === "en" && "Requirements"}
                {language === "ru" && "Требования"}
                {language === "uz" && "Talablar"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="syllabus">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "en" && "Course Syllabus"}
                    {language === "ru" && "Программа курса"}
                    {language === "uz" && "Kurs dasturi"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {courseSyllabusItems.map((item) => {
                      const syllabusInfo = getSyllabusInfo(item);
                      return (
                        <div key={syllabusInfo.week} className="mb-6">
                          <h3 className="text-lg font-semibold mb-2">{syllabusInfo.title}</h3>
                          <ul className="space-y-2">
                            {syllabusInfo.topics.map((topic, index) => (
                              <li key={index} className="flex items-start">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
                                  {index + 1}
                                </div>
                                <div>
                                  <h4 className="font-medium">{topic.title}</h4>
                                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "en" && "Course Requirements"}
                    {language === "ru" && "Требования к курсу"}
                    {language === "uz" && "Kurs talablari"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {language === "en" && (
                      <>
                        <li>No prior robotics experience required</li>
                        <li>Basic computer skills</li>
                        <li>Laptop with internet connection</li>
                        <li>Interest in robotics and willingness to learn</li>
                        <li>All materials and components will be provided during the course</li>
                      </>
                    )}
                    {language === "ru" && (
                      <>
                        <li>Предварительный опыт в робототехнике не требуется</li>
                        <li>Базовые компьютерные навыки</li>
                        <li>Ноутбук с подключением к интернету</li>
                        <li>Интерес к робототехнике и желание учиться</li>
                        <li>Все материалы и компоненты будут предоставлены во время курса</li>
                      </>
                    )}
                    {language === "uz" && (
                      <>
                        <li>Oldingi robototexnika tajribasi talab qilinmaydi</li>
                        <li>Asosiy kompyuter ko'nikmalari</li>
                        <li>Internet ulanishiga ega noutbuk</li>
                        <li>Robototexnikaga qiziqish va o'rganish istagi</li>
                        <li>Barcha materiallar va komponentlar kurs davomida taqdim etiladi</li>
                      </>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
