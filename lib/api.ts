// API URL ni olish
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Helper function to create a fetch request with timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 8000) {
  try {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    console.log(`So'rov yuborilmoqda: ${url}`)
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(id)

    console.log(`Javob holati: ${response.status}`)
    return response
  } catch (error) {
    console.error(`So'rov xatosi ${url}:`, error)
    throw error
  }
}

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// Kurslar ro'yxatini olish
export async function fetchCourses(page = 1, difficulty?: string) {
  try {
    let endpoint = `/courses/?page=${page}`
    if (difficulty) endpoint += `&difficulty=${difficulty}`

    console.log(`Kurslar yuklanmoqda: ${API_URL}${endpoint}`)

    const res = await fetchWithTimeout(`${API_URL}${endpoint}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`API xatosi: ${res.status} ${res.statusText}`)
      throw new Error(`API xatosi: ${res.status}`)
    }

    const data: PaginatedResponse<any> = await res.json()
    console.log("API javob (kurslar):", data)

    return {
      results: data.results || [],
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
        currentPage: page,
        totalPages: Math.ceil(data.count / 10), // Django REST Framework default page size
      },
    }
  } catch (error) {
    console.error("Kurslarni yuklashda xatolik:", error)
    return {
      results: [],
      pagination: {
        count: 0,
        next: null,
        previous: null,
        currentPage: page,
        totalPages: 0,
      },
    }
  }
}

// Kurs tafsilotlarini olish
export async function fetchCourse(id: string) {
  try {
    console.log(`Fetching course ${id} from: ${API_URL}/courses/${id}/`)
    const res = await fetchWithTimeout(`${API_URL}/courses/${id}/`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    const data = await res.json()
    console.log(`Course ${id} data:`, data)
    return data
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error)
    // Return null instead of mock data
    return null
  }
}

// Ro'yxatdan o'tish
export async function submitEnrollment(data: any) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/enrollments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error("Error submitting enrollment:", error)
    // Return error object instead of mock response
    throw error
  }
}

// Loyihalar ro'yxatini olish
export async function fetchProjects(page = 1, difficulty?: string, tag?: string) {
  try {
    let endpoint = `/projects/?page=${page}`
    if (difficulty) endpoint += `&difficulty=${difficulty}`
    if (tag) endpoint += `&tag=${tag}`

    console.log(`Loyihalar yuklanmoqda: ${API_URL}${endpoint}`)
    const res = await fetchWithTimeout(`${API_URL}${endpoint}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`API xatosi: ${res.status}`)
    }

    const data: PaginatedResponse<any> = await res.json()
    console.log("API javob (loyihalar):", data)

    return {
      results: data.results || [],
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
        currentPage: page,
        totalPages: Math.ceil(data.count / 10),
      },
    }
  } catch (error) {
    console.error("Loyihalarni yuklashda xatolik:", error)
    return {
      results: [],
      pagination: {
        count: 0,
        next: null,
        previous: null,
        currentPage: page,
        totalPages: 0,
      },
    }
  }
}

// Loyiha tafsilotlarini olish
export async function fetchProject(id: string) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/projects/${id}/`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error)
    // Return null instead of mock data
    return null
  }
}

// Topshiriqlar ro'yxatini olish
export async function fetchTasks(difficulty?: string, courseId?: string, status?: string) {
  try {
    let endpoint = "/tasks/"
    const params = []

    if (difficulty) params.push(`difficulty=${difficulty}`)
    if (courseId) params.push(`course=${courseId}`)
    if (status) params.push(`status=${status}`)

    if (params.length > 0) {
      endpoint += `?${params.join("&")}`
    }

    console.log(`Fetching tasks from: ${API_URL}${endpoint}`)
    const res = await fetchWithTimeout(`${API_URL}${endpoint}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`API error: ${res.status} ${res.statusText}`)
      throw new Error(`API error: ${res.status}`)
    }

    const data = await res.json()
    console.log("API response for tasks:", data)

    // Return the data directly - the TaskViewSet returns a list
    if (Array.isArray(data)) {
      console.log(`Returning array of ${data.length} tasks`)
      return data
    }
    // If it's paginated, return the results array
    else if (data && data.results && Array.isArray(data.results)) {
      console.log(`Returning paginated results with ${data.results.length} tasks`)
      return data.results
    }
    // If it's a single object (not expected for list endpoint)
    else if (data && typeof data === "object") {
      console.log("Returning single task object as array")
      return [data]
    }

    // Fallback to empty array
    console.warn("No valid task data found, returning empty array")
    return []
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return []
  }
}

// Topshiriq tafsilotlarini olish
export async function fetchTask(id: string) {
  try {
    console.log(`Fetching task ${id} from: ${API_URL}/tasks/${id}/`)
    const res = await fetchWithTimeout(`${API_URL}/tasks/${id}/`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    const data = await res.json()
    console.log(`Task ${id} data:`, data)
    return data
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error)
    // Return null instead of mock data
    return null
  }
}

// Resurslar ro'yxatini olish funksiyasini yangilash
export async function fetchResources(category?: string) {
  try {
    // API URL manzilini to'g'ri shakllantirish
    const baseUrl = API_URL.endsWith("/api") ? API_URL : `${API_URL}/api`
    const endpoint = category ? `/resources/?category=${category}` : "/resources/"
    const url = `${baseUrl}${endpoint}`

    console.log(`Resurslarni yuklash: ${url}`)
    const res = await fetchWithTimeout(url, {
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`API xatosi: ${res.status} ${res.statusText}`)
      throw new Error(`API xatosi: ${res.status}`)
    }

    const data = await res.json()
    console.log("API javob (resurslar):", data)

    // Ma'lumotlarni qayta ishlash
    let results = []
    if (Array.isArray(data)) {
      results = data
    } else if (data && typeof data === "object") {
      if (data.results && Array.isArray(data.results)) {
        results = data.results
      } else {
        // Agar ma'lumotlar obyekt bo'lsa va results maydoni bo'lmasa
        results = [data]
      }
    }

    console.log(`${results.length} ta resurs qayta ishlandi`)
    return {
      results: results,
      pagination: data.count
        ? {
            count: data.count,
            next: data.next,
            previous: data.previous,
            currentPage: 1,
            totalPages: Math.ceil(data.count / 10),
          }
        : null,
    }
  } catch (error) {
    console.error("Resurslarni yuklashda xatolik:", error)
    return { results: [], pagination: null }
  }
}

// Resurs tafsilotlarini olish funksiyasini yangilash
export async function fetchResource(id: string) {
  try {
    // API URL manzilini to'g'ri shakllantirish
    const baseUrl = API_URL.endsWith("/api") ? API_URL : `${API_URL}/api`
    const url = `${baseUrl}/resources/${id}/`

    console.log(`Resurs ma'lumotlarini yuklash: ${url}`)
    const res = await fetchWithTimeout(url, {
      cache: "no-store",
    })

    if (!res.ok) {
      console.error(`API xatosi: ${res.status} ${res.statusText}`)
      throw new Error(`API xatosi: ${res.status}`)
    }

    const data = await res.json()
    console.log(`Resurs ${id} ma'lumotlari:`, data)
    return data
  } catch (error) {
    console.error(`Resurs ${id} ma'lumotlarini yuklashda xatolik:`, error)
    return null
  }
}

// Yangiliklar ro'yxatini olish
export async function fetchNews(page = 1) {
  try {
    const endpoint = `/news/?page=${page}`
    console.log(`Yangiliklar yuklanmoqda: ${API_URL}${endpoint}`)

    const res = await fetchWithTimeout(`${API_URL}${endpoint}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error(`API xatosi: ${res.status}`)
    }

    const data: PaginatedResponse<any> = await res.json()
    console.log("API javob (yangiliklar):", data)

    return {
      results: data.results || [],
      pagination: {
        count: data.count,
        next: data.next,
        previous: data.previous,
        currentPage: page,
        totalPages: Math.ceil(data.count / 10),
      },
    }
  } catch (error) {
    console.error("Yangiliklarni yuklashda xatolik:", error)
    return {
      results: [],
      pagination: {
        count: 0,
        next: null,
        previous: null,
        currentPage: page,
        totalPages: 0,
      },
    }
  }
}

// Yangilik tafsilotlarini olish
export async function fetchNewsItem(id: string) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/news/${id}/`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error(`Error fetching news item ${id}:`, error)
    return null
  }
}

// O'qituvchilar ro'yxatini olish
export async function fetchInstructors() {
  try {
    const res = await fetchWithTimeout(`${API_URL}/instructors/`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error("Error fetching instructors:", error)
    // Return empty results instead of mock data
    return { results: [] }
  }
}

// O'qituvchi tafsilotlarini olish
export async function fetchInstructor(id: string) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/instructors/${id}/`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error(`Error fetching instructor ${id}:`, error)
    // Return null instead of mock data
    return null
  }
}

export async function fetchTeamMembers() {
  try {
    const response = await fetch(`${API_URL}/team/`)
    if (!response.ok) {
      throw new Error("Failed to fetch team members")
    }
    const data = await response.json()

    // Process data similar to fetchCourses
    let results = []
    if (Array.isArray(data)) {
      results = data
    } else if (data && typeof data === "object") {
      if (data.results) {
        results = data.results
      } else {
        results = [data]
      }
    }

    return results
  } catch (error) {
    console.error("Error fetching team members:", error)
    return []
  }
}

export async function fetchTestimonials() {
  try {
    const response = await fetch(`${API_URL}/testimonials/`)
    if (!response.ok) {
      throw new Error("Failed to fetch testimonials")
    }
    const data = await response.json()

    // Process data similar to fetchCourses
    let results = []
    if (Array.isArray(data)) {
      results = data
    } else if (data && typeof data === "object") {
      if (data.results) {
        results = data.results
      } else {
        results = [data]
      }
    }

    return results
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }
}

export const sendContactMessage = async (data: {
  name: string
  email: string
  phone: string
  message: string
}) => {
  try {
    const response = await fetch(`${API_URL}/contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to send message")
    }

    return await response.json()
  } catch (error) {
    console.error("Error sending contact message:", error)
    throw error
  }
}

// Task submission function
export async function submitTaskSolution(data: {
  task: string
  code: string
  file_name?: string
  comments?: string
}) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/task-submissions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error("Error submitting task solution:", error)
    throw error
  }
}
