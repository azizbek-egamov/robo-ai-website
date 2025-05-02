"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface LanguageContextType {
  language: string;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  // Hero Section
  heroTitle: "Robototexnika va Sun'iy Intellekt",
  heroSubtitle: "Kelajak texnologiyalarini o'rganing va loyihalarni amalga oshiring",
  getStarted: "Boshlash",
  learnMore: "Batafsil",

  // Contact Page
  contactTitle: "Biz bilan bog'laning",
  contactDescription: "Savollaringiz yoki takliflaringiz bo'lsa, bizga yozing",
  contactForm: "Xabar yuborish",
  name: "Ism",
  message: "Xabar",
  send: "Yuborish",
  sending: "Yuborilmoqda...",
  messageSent: "Xabaringiz muvaffaqiyatli yuborildi",
  errorSending: "Xabar yuborishda xatolik yuz berdi",
  map: "Xarita",
  workingHours: "Ish vaqti",
  workingDays: "Dushanbadan Jumagacha",
  contactInfo: "Aloqa ma'lumotlari",
  address: "Manzil",
  phone: "Telefon",
  email: "Elektron pochta",

  // Featured Section
  featuredCourses: "Tanlangan kurslar",
  viewAll: "Barchasini ko'rish",

  // Company Info
  company: "Robo AI",
  companyDescription: "Robototexnika va sun'iy intellekt bo'yicha yetakchi ta'lim platformasi",

  // Legal
  privacy: "Maxfiylik",
  privacyPolicy: "Maxfiylik siyosati",
  termsOfService: "Xizmat ko'rsatish shartlari",
  termsDescription: "Platformamizdan foydalanishdan oldin, iltimos, quyidagi shartlar bilan tanishib chiqing.",
  termsTitle: "Xizmat ko'rsatish shartlari",
  termsContent: "Robo AI platformasi foydalanuvchilarga sun'iy intellekt va robototexnika bo'yicha bilimlar, kurslar va resurslarni taqdim etadi. Platformadan foydalanish orqali siz quyidagi shartlarga rozilik bildirasiz:",
  
  privacyTitle: "Maxfiylik siyosati",
  privacyContent: "Robo AI foydalanuvchilarining maxfiyligini qadrlaydi va shaxsiy ma'lumotlarni himoya qilish uchun qat'iy choralar ko'radi. Quyidagi maxfiylik siyosati sizning ma'lumotlaringizni qanday to'planishi, ishlatilishi va himoyalanishini tushuntiradi:",
  
  cookiesTitle: "Cookie fayllari",
  cookiesContent: "Robo AI veb-saytida cookie fayllaridan foydalanadi. Cookie fayllari - bu veb-saytga tashrif buyurganingizda brauzeringizga saqlanadigan kichik matn fayllari. Ular quyidagi maqsadlarda ishlatiladi:",
  
  intellectualPropertyTitle: "Intellektual mulk huquqlari",
  intellectualPropertyContent: "Robo AI platformasidagi barcha kontent, jumladan kurslar, darsliklar, videolar, rasmlar va boshqa materiallar intellektual mulk huquqlari bilan himoyalangan. Quyidagi qoidalarga rioya qiling:",
  
  limitationOfLiabilityTitle: "Javobgarlik cheklovlari",
  limitationOfLiabilityContent: "Robo AI platformasi orqali taqdim etilgan ma'lumotlar faqat ma'lumot uchun beriladi. Quyidagi cheklovlar qo'llaniladi:",
  
  changesToTermsTitle: "Shartlarning o'zgarishi",
  changesToTermsContent: "Robo AI o'z xizmat ko'rsatish shartlarini va maxfiylik siyosatini vaqt-vaqti bilan yangilashi mumkin. O'zgarishlar quyidagi tartibda amalga oshiriladi:",
  
  contactUsTitle: "Biz bilan bog'laning",
  contactUsContent: "Agar sizda savollar yoki takliflar bo'lsa, quyidagi usullar orqali biz bilan bog'lanishingiz mumkin:",
  
  informationWeCollectTitle: "To'plangan ma'lumotlar",
  informationWeCollectContent: "Robo AI quyidagi ma'lumotlarni to'playdi:",
  
  howWeUseYourInformationTitle: "Ma'lumotlardan foydalanish",
  howWeUseYourInformationContent: "To'plangan ma'lumotlar quyidagi maqsadlarda ishlatiladi:",
  
  informationSharingTitle: "Ma'lumotlarni ulashish",
  informationSharingContent: "Robo AI foydalanuvchilarining ma'lumotlarini quyidagi hollarda uchinchi tomonlar bilan baham ko'radi:",
  
  dataSecurityTitle: "Ma'lumotlarni himoya qilish",
  dataSecurityContent: "Robo AI foydalanuvchilarining ma'lumotlarini himoya qilish uchun quyidagi choralarni ko'radi:",
  
  yourRightsTitle: "Foydalanuvchi huquqlari",
  yourRightsContent: "Robo AI foydalanuvchilari quyidagi huquqlarga ega:",
  
  cookiesAndTrackingTitle: "Cookie fayllari va kuzatish",
  cookiesAndTrackingContent: "Robo AI veb-saytida quyidagi turdagi cookie fayllari va kuzatish texnologiyalari ishlatiladi:",
  
  changesToPrivacyPolicyTitle: "Maxfiylik siyosatining o'zgarishi",
  changesToPrivacyPolicyContent: "Robo AI maxfiylik siyosatini quyidagi tartibda yangilaydi:",

  allRightsReserved: "Barcha huquqlar himoyalangan",

  // Navbar
  home: "Bosh sahifa",
  courses: "Kurslar",
  projects: "Loyihalar",
  resources: "Resurslar",
  news: "Yangiliklar",
  contact: "Aloqa",
  about: "Biz haqimizda",
  login: "Kirish",
  register: "Ro'yxatdan o'tish",
  logout: "Chiqish",

  // Footer
  socialMedia: "Ijtimoiy tarmoqlar",
  quickLinks: "Tezkor havolalar",
  copyright: "Barcha huquqlar himoyalangan",

  // Courses
  courseDescription: "Robototexnika va sun'iy intellekt bo'yicha kurslarimiz bilan tanishing",
  enrollNow: "Ro'yxatdan o'tish",
  noCoursesAvailable: "Kurslar mavjud emas",
  errorLoadingCourses: "Kurslarni yuklashda xatolik yuz berdi",

  // Projects
  projectDescription: "Robototexnika va sun'iy intellekt bo'yicha loyihalarimiz bilan tanishing",
  viewProject: "Loyihani ko'rish",
  noProjectsAvailable: "Loyihalar mavjud emas",
  errorLoadingProjects: "Loyihalarni yuklashda xatolik yuz berdi",

  // Resources
  resourceDescription: "Robototexnika va sun'iy intellekt bo'yicha resurslarimiz bilan tanishing",
  download: "Yuklab olish",
  noResourcesAvailable: "Resurslar mavjud emas",
  errorLoadingResources: "Resurslarni yuklashda xatolik yuz berdi",
  viewResource: "Resursni ko'rish",
  viewAllResources: "Barcha resurslarni ko'rish",
  backToResources: "Resurslarga qaytish",
  resourceNotFound: "Resurs topilmadi",
  noResourcesInCategory: "Bu kategoriyada resurslar mavjud emas",
  resourceContent: "Tarkib",
  downloadResource: "Resursni yuklab olish",
  viewAllTutorials: "Barcha darsliklarni ko'rish",
  viewAllVideos: "Barcha video darslarni ko'rish",
  viewAllBooks: "Barcha kitoblarni ko'rish",
  viewAllDownloads: "Barcha yuklamalarni ko'rish",

  // News
  newsDescription: "Robototexnika va sun'iy intellekt bo'yicha yangiliklarimiz bilan tanishing",
  readMore: "Batafsil",
  noNewsAvailable: "Yangiliklar mavjud emas",
  errorLoadingNews: "Yangiliklarni yuklashda xatolik yuz berdi",

  // Tests
  tests: "Testlar",
  takeTest: "Testni boshlash", 
  testsDescription: "Bilimlaringizni testlar orqali sinab ko'ring",
  startTest: "Testni boshlash",
  noTestsAvailable: "Testlar mavjud emas",
  errorLoadingTests: "Testlarni yuklashda xatolik yuz berdi",

  // Common
  loading: "Yuklanmoqda...",
  error: "Xatolik yuz berdi",
  retry: "Qayta urinish",
  backToHome: "Bosh sahifaga qaytish",
  notFound: "Sahifa topilmadi",
  serverError: "Server xatosi",
  apiError: "API xatosi",
  networkError: "Internet aloqasi xatosi",
  unknownError: "Noma'lum xatolik",
  checkBackLater: "Iltimos, keyinroq tekshiring",
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language] = useState("uz")

  const t = (key: string): string => {
    return translations[key as keyof typeof translations] || key
  }

  return (
    <LanguageContext.Provider value={{ language, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

