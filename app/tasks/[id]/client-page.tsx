"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Award, ArrowLeft, FileText, Code, Upload } from "lucide-react"
import Link from "next/link"
import { fetchTask } from "@/lib/api"

// AlertCircle komponentini import qilish
import { AlertCircle } from "lucide-react"

// Ma'lumotlarni to'g'ri ko'rsatish uchun o'zgartirishlar
export default function ClientTaskPage({ task: initialTask }) {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("description")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [codeValue, setCodeValue] = useState("")
  const [fileUploaded, setFileUploaded] = useState(false)
  const [fileName, setFileName] = useState("")
  const [task, setTask] = useState(initialTask)
  const { id } = useParams()

  useEffect(() => {
    // Agar task props orqali kelgan bo'lsa, uni ishlatamiz
    if (initialTask) {
      setTask(initialTask)
      return
    }

    // Aks holda, API dan yuklab olamiz
    const loadTask = async () => {
      try {
        const taskData = await fetchTask(id)
        if (taskData) {
          setTask(taskData)
          console.log("Task loaded from API:", taskData)
        }
      } catch (error) {
        console.error("Error loading task:", error)
      }
    }

    if (id) {
      loadTask()
    }
  }, [id, initialTask])

  console.log("Task data in client component:", task)

  // Agar task undefined bo'lsa, xatolik xabarini ko'rsatish
  if (!task) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-medium mb-2">
              {language === "en" ? "Task not found" : language === "ru" ? "Задание не найдено" : "Topshiriq topilmadi"}
            </h2>
            <Button asChild className="mt-4">
              <Link href="/tasks">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "en"
                  ? "Back to Tasks"
                  : language === "ru"
                    ? "Назад к заданиям"
                    : "Topshiriqlarga qaytish"}
              </Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // API ga yechimni yuborish
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task-submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          task: task.id,
          code: codeValue,
          file_name: fileName,
          comments: "",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("API Error:", errorData)
        throw new Error(errorData.message || "Yechimni yuborishda xatolik yuz berdi")
      }

      // Muvaffaqiyatli yuborildi
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting solution:", error)
      alert(error instanceof Error ? error.message : "Yechimni yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setFileUploaded(true)
    }
  }

  // Ma'lumotlarni xavfsiz olish
  const taskTitle = task[`title_${language}`] || task.title || "Task"
  const taskDescription = task[`description_${language}`] || task.description || ""
  const taskDetailedDescription = task[`detailed_description_${language}`] || task.detailed_description || ""
  const taskPoints = task.points || 0
  const taskEstimatedTime = task[`estimated_time_${language}`] || task.estimated_time || ""
  const taskDifficulty = task.difficulty || "beginner"
  const taskRelatedCourse = task.related_course || ""
  const taskStatus = task.status || "not_started"
  const taskRequirements = Array.isArray(task.requirements) ? task.requirements : []
  const taskHints = Array.isArray(task.hints) ? task.hints : []
  const taskSampleCode = task.sample_code || "// No sample code available"

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button variant="outline" asChild className="mb-4">
              <Link href="/tasks">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "en" && "Back to Tasks"}
                {language === "ru" && "Назад к заданиям"}
                {language === "uz" && "Topshiriqlarga qaytish"}
              </Link>
            </Button>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{taskTitle}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getDifficultyColor(taskDifficulty)}`}>
                    {taskDifficulty === "beginner"
                      ? language === "en"
                        ? "Beginner"
                        : language === "ru"
                          ? "Начальный"
                          : "Boshlang'ich"
                      : taskDifficulty === "intermediate"
                        ? language === "en"
                          ? "Intermediate"
                          : language === "ru"
                            ? "Средний"
                            : "O'rta"
                        : language === "en"
                          ? "Advanced"
                          : language === "ru"
                            ? "Продвинутый"
                            : "Yuqori"}
                  </span>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span>
                      {language === "en" && `${taskPoints} points`}
                      {language === "ru" && `${taskPoints} баллов`}
                      {language === "uz" && `${taskPoints} ball`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>{taskEstimatedTime}</span>
                  </div>
                </div>
              </div>
              {!submitted && (
                <Button onClick={() => setActiveTab("submit")} className="md:self-start">
                  {language === "en" && "Submit Solution"}
                  {language === "ru" && "Отправить решение"}
                  {language === "uz" && "Yechimni yuborish"}
                </Button>
              )}
            </div>
          </div>

          {submitted ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-center text-green-600">
                  {language === "en" && "Solution Submitted Successfully!"}
                  {language === "ru" && "Решение успешно отправлено!"}
                  {language === "uz" && "Yechim muvaffaqiyatli yuborildi!"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <p className="text-lg mb-4">
                  {language === "en" && "Your solution has been submitted and will be reviewed soon."}
                  {language === "ru" && "Ваше решение было отправлено и будет рассмотрено в ближайшее время."}
                  {language === "uz" && "Sizning yechimingiz yuborildi va tez orada ko'rib chiqiladi."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/tasks">
                      {language === "en" && "Back to Tasks"}
                      {language === "ru" && "Назад к заданиям"}
                      {language === "uz" && "Topshiriqlarga qaytish"}
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/courses/${taskRelatedCourse}`}>
                      {language === "en" && "Go to Related Course"}
                      {language === "ru" && "Перейти к связанному курсу"}
                      {language === "uz" && "Bog'liq kursga o'tish"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="description" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {language === "en" && "Description"}
                  {language === "ru" && "Описание"}
                  {language === "uz" && "Tavsif"}
                </TabsTrigger>
                <TabsTrigger value="hints" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  {language === "en" && "Hints & Code"}
                  {language === "ru" && "Подсказки и код"}
                  {language === "uz" && "Maslahatlar va kod"}
                </TabsTrigger>
                <TabsTrigger value="submit" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  {language === "en" && "Submit"}
                  {language === "ru" && "Отправить"}
                  {language === "uz" && "Yuborish"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "en" && "Task Description"}
                      {language === "ru" && "Описание задания"}
                      {language === "uz" && "Topshiriq tavsifi"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        {language === "en" && "Overview"}
                        {language === "ru" && "Обзор"}
                        {language === "uz" && "Umumiy ma'lumot"}
                      </h3>
                      <p className="whitespace-pre-line">{taskDetailedDescription}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        {language === "en" && "Requirements"}
                        {language === "ru" && "Требования"}
                        {language === "uz" && "Talablar"}
                      </h3>
                      {taskRequirements.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {taskRequirements.map((req, index) => (
                            <li key={req.id || index}>{req[`requirement_${language}`] || req.requirement || ""}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">
                          {language === "en" && "No specific requirements listed."}
                          {language === "ru" && "Конкретные требования не указаны."}
                          {language === "uz" && "Aniq talablar ko'rsatilmagan."}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hints">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "en" && "Hints & Sample Code"}
                      {language === "ru" && "Подсказки и пример кода"}
                      {language === "uz" && "Maslahatlar va namuna kod"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        {language === "en" && "Helpful Hints"}
                        {language === "ru" && "Полезные подсказки"}
                        {language === "uz" && "Foydali maslahatlar"}
                      </h3>
                      {taskHints.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {taskHints.map((hint, index) => (
                            <li key={hint.id || index}>{hint[`hint_${language}`] || hint.hint || ""}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">
                          {language === "en" && "No hints available for this task."}
                          {language === "ru" && "Для этого задания нет подсказок."}
                          {language === "uz" && "Bu topshiriq uchun maslahatlar mavjud emas."}
                        </p>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        {language === "en" && "Sample Code"}
                        {language === "ru" && "Пример кода"}
                        {language === "uz" && "Namuna kod"}
                      </h3>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
                        <pre className="text-sm">
                          <code>{taskSampleCode}</code>
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="submit">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "en" && "Submit Your Solution"}
                      {language === "ru" && "Отправить ваше решение"}
                      {language === "uz" && "Yechimingizni yuboring"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="solution-method">
                          {language === "en" && "Choose submission method"}
                          {language === "ru" && "Выберите метод отправки"}
                          {language === "uz" && "Yuborish usulini tanlang"}
                        </Label>
                        <Tabs defaultValue="code" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="code">
                              {language === "en" && "Write Code"}
                              {language === "ru" && "Написать код"}
                              {language === "uz" && "Kod yozish"}
                            </TabsTrigger>
                            <TabsTrigger value="file">
                              {language === "en" && "Upload File"}
                              {language === "ru" && "Загрузить файл"}
                              {language === "uz" && "Fayl yuklash"}
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="code" className="mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="code">
                                {language === "en" && "Your Code"}
                                {language === "ru" && "Ваш код"}
                                {language === "uz" && "Kodingiz"}
                              </Label>
                              <Textarea
                                id="code"
                                placeholder={
                                  language === "en"
                                    ? "Paste or write your code here..."
                                    : language === "ru"
                                      ? "Вставьте или напишите свой код здесь..."
                                      : "Kodingizni shu yerga joylashtiring yoki yozing..."
                                }
                                className="font-mono min-h-[300px]"
                                value={codeValue}
                                onChange={(e) => setCodeValue(e.target.value)}
                                required
                              />
                            </div>
                          </TabsContent>
                          <TabsContent value="file" className="mt-4">
                            <div className="space-y-4">
                              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                                <Input
                                  id="file-upload"
                                  type="file"
                                  className="hidden"
                                  accept=".c,.cpp,.ino,.py,.js"
                                  onChange={handleFileChange}
                                />
                                {fileUploaded ? (
                                  <div className="flex flex-col items-center">
                                    <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                                    <p className="text-sm font-medium">{fileName}</p>
                                    <p className="text-xs text-muted-foreground mb-2">
                                      {language === "en" && "File uploaded successfully"}
                                      {language === "ru" && "Файл успешно загружен"}
                                      {language === "uz" && "Fayl muvaffaqiyatli yuklandi"}
                                    </p>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setFileUploaded(false)
                                        setFileName("")
                                      }}
                                    >
                                      {language === "en" && "Remove"}
                                      {language === "ru" && "Удалить"}
                                      {language === "uz" && "O'chirish"}
                                    </Button>
                                  </div>
                                ) : (
                                  <label htmlFor="file-upload" className="cursor-pointer">
                                    <div className="flex flex-col items-center">
                                      <Upload className="h-12 w-12 text-gray-400 mb-2" />
                                      <p className="text-sm font-medium">
                                        {language === "en" && "Click to upload or drag and drop"}
                                        {language === "ru" && "Нажмите для загрузки или перетащите файл"}
                                        {language === "uz" && "Yuklash uchun bosing yoki faylni tashlang"}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {language === "en" && "C, C++, Arduino (.ino), Python, or JavaScript files"}
                                        {language === "ru" && "Файлы C, C++, Arduino (.ino), Python или JavaScript"}
                                        {language === "uz" && "C, C++, Arduino (.ino), Python yoki JavaScript fayllari"}
                                      </p>
                                    </div>
                                  </label>
                                )}
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="comments">
                          {language === "en" && "Comments (optional)"}
                          {language === "ru" && "Комментарии (необязательно)"}
                          {language === "uz" && "Izohlar (ixtiyoriy)"}
                        </Label>
                        <Textarea
                          id="comments"
                          placeholder={
                            language === "en"
                              ? "Add any comments or notes about your solution..."
                              : language === "ru"
                                ? "Добавьте любые комментарии или заметки о вашем решении..."
                                : "Yechimingiz haqida izohlar yoki eslatmalar qo'shing..."
                          }
                          className="min-h-[100px]"
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={submitting || (!codeValue && !fileUploaded)}>
                        {submitting ? (
                          <>
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                            {language === "en" && "Submitting..."}
                            {language === "ru" && "Отправка..."}
                            {language === "uz" && "Yuborilmoqda..."}
                          </>
                        ) : (
                          <>
                            {language === "en" && "Submit Solution"}
                            {language === "ru" && "Отправить решение"}
                            {language === "uz" && "Yechimni yuborish"}
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  )
}
