"use client"

import { useLanguage } from "@/components/language-provider"
import Footer from "@/components/footer"
import Link from "next/link"

export default function PrivacyPage() {
  const { language } = useLanguage()

  const pageContent = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: March 15, 2024",
      introduction: {
        title: "Introduction",
        content:
          "At Robo AI, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.",
      },
      dataCollection: {
        title: "Information We Collect",
        content:
          "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:",
        items: [
          "Identity Data includes first name, last name, username or similar identifier.",
          "Contact Data includes email address and telephone numbers.",
          "Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.",
          "Usage Data includes information about how you use our website, products and services.",
          "Marketing and Communications Data includes your preferences in receiving marketing from us and our third parties and your communication preferences.",
        ],
      },
      dataUse: {
        title: "How We Use Your Information",
        content:
          "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:",
        items: [
          "To register you as a new customer.",
          "To process and deliver your order.",
          "To manage our relationship with you.",
          "To improve our website, products/services, marketing or customer relationships.",
          "To recommend products or services which may be of interest to you.",
          "To comply with a legal or regulatory obligation.",
        ],
      },
      dataSecurity: {
        title: "Data Security",
        content:
          "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.",
      },
      dataRetention: {
        title: "Data Retention",
        content:
          "We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.",
      },
      yourRights: {
        title: "Your Legal Rights",
        content:
          "Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:",
        items: [
          "Request access to your personal data.",
          "Request correction of your personal data.",
          "Request erasure of your personal data.",
          "Object to processing of your personal data.",
          "Request restriction of processing your personal data.",
          "Request transfer of your personal data.",
          "Right to withdraw consent.",
        ],
      },
      cookies: {
        title: "Cookies",
        content:
          "Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.",
      },
      contact: {
        title: "Contact Us",
        content: "If you have any questions about this privacy policy or our privacy practices, please contact us at:",
      },
    },
    ru: {
      title: "Политика конфиденциальности",
      lastUpdated: "Последнее обновление: 15 марта 2024 г.",
      introduction: {
        title: "Введение",
        content:
          "В Robo AI мы уважаем вашу конфиденциальность и стремимся защищать ваши личные данные. Эта политика конфиденциальности расскажет вам о том, как мы заботимся о ваших личных данных, когда вы посещаете наш веб-сайт, и расскажет вам о ваших правах на конфиденциальность и о том, как закон защищает вас.",
      },
      dataCollection: {
        title: "Информация, которую мы собираем",
        content:
          "Мы можем собирать, использовать, хранить и передавать различные виды личных данных о вас, которые мы сгруппировали следующим образом:",
        items: [
          "Идентификационные данные включают имя, фамилию, имя пользователя или аналогичный идентификатор.",
          "Контактные данные включают адрес электронной почты и номера телефонов.",
          "Технические данные включают адрес интернет-протокола (IP), ваши данные для входа, тип и версию браузера, настройку часового пояса и местоположение, типы и версии плагинов браузера, операционную систему и платформу, а также другие технологии на устройствах, которые вы используете для доступа к этому веб-сайту.",
          "Данные об использовании включают информацию о том, как вы используете наш веб-сайт, продукты и услуги.",
          "Маркетинговые данные и данные о коммуникациях включают ваши предпочтения в получении маркетинговой информации от нас и наших третьих сторон, а также ваши предпочтения в коммуникациях.",
        ],
      },
      dataUse: {
        title: "Как мы используем вашу информацию",
        content:
          "Мы будем использовать ваши личные данные только тогда, когда закон позволяет нам это делать. Чаще всего мы будем использовать ваши личные данные в следующих обстоятельствах:",
        items: [
          "Для регистрации вас в качестве нового клиента.",
          "Для обработки и доставки вашего заказа.",
          "Для управления нашими отношениями с вами.",
          "Для улучшения нашего веб-сайта, продуктов/услуг, маркетинга или отношений с клиентами.",
          "Для рекомендации продуктов или услуг, которые могут вас заинтересовать.",
          "Для соблюдения юридических или нормативных обязательств.",
        ],
      },
      dataSecurity: {
        title: "Безопасность данных",
        content:
          "Мы приняли соответствующие меры безопасности для предотвращения случайной потери, использования или доступа к вашим личным данным несанкционированным способом, изменения или раскрытия. Кроме того, мы ограничиваем доступ к вашим личным данным тем сотрудникам, агентам, подрядчикам и другим третьим сторонам, которым это необходимо знать по деловым причинам.",
      },
      dataRetention: {
        title: "Хранение данных",
        content:
          "Мы будем хранить ваши личные данные только до тех пор, пока это необходимо для выполнения целей, для которых мы их собрали, включая цели удовлетворения любых юридических, бухгалтерских или отчетных требований.",
      },
      yourRights: {
        title: "Ваши законные права",
        content:
          "При определенных обстоятельствах у вас есть права в соответствии с законами о защите данных в отношении ваших личных данных, включая право на:",
        items: [
          "Запрос доступа к вашим личным данным.",
          "Запрос исправления ваших личных данных.",
          "Запрос удаления ваших личных данных.",
          "Возражение против обработки ваших личных данных.",
          "Запрос ограничения обработки ваших личных данных.",
          "Запрос передачи ваших личных данных.",
          "Право на отзыв согласия.",
        ],
      },
      cookies: {
        title: "Файлы cookie",
        content:
          "Наш веб-сайт использует файлы cookie, чтобы отличать вас от других пользователей нашего веб-сайта. Это помогает нам обеспечить вам хороший опыт при просмотре нашего веб-сайта, а также позволяет нам улучшать наш сайт.",
      },
      contact: {
        title: "Свяжитесь с нами",
        content:
          "Если у вас есть какие-либо вопросы об этой политике конфиденциальности или наших практиках конфиденциальности, пожалуйста, свяжитесь с нами по адресу:",
      },
    },
    uz: {
      title: "Maxfiylik siyosati",
      lastUpdated: "So'nggi yangilanish: 2024 yil 15 mart",
      introduction: {
        title: "Kirish",
        content:
          "Robo AI'da biz sizning maxfiyligingizni hurmat qilamiz va shaxsiy ma'lumotlaringizni himoya qilishga intilamiz. Ushbu maxfiylik siyosati sizga veb-saytimizga tashrif buyurganingizda shaxsiy ma'lumotlaringizni qanday himoya qilishimiz va sizning maxfiylik huquqlaringiz hamda qonun sizni qanday himoya qilishi haqida ma'lumot beradi.",
      },
      dataCollection: {
        title: "Biz to'playdigan ma'lumotlar",
        content:
          "Biz siz haqingizda turli xil shaxsiy ma'lumotlarni to'plashimiz, foydalanishimiz, saqlashimiz va uzatishimiz mumkin, ularni quyidagicha guruhlarga ajratganmiz:",
        items: [
          "Shaxsiy ma'lumotlar: ism, familiya, foydalanuvchi nomi yoki shunga o'xshash identifikator.",
          "Aloqa ma'lumotlari: elektron pochta manzili va telefon raqamlari.",
          "Texnik ma'lumotlar: internet protokoli (IP) manzili, kirish ma'lumotlaringiz, brauzer turi va versiyasi, vaqt mintaqasi sozlamasi va joylashuvi, brauzer plaginlari turlari va versiyalari, operatsion tizim va platforma, hamda ushbu veb-saytga kirish uchun foydalaniladigan qurilmalardagi boshqa texnologiyalar.",
          "Foydalanish ma'lumotlari: veb-saytimiz, mahsulotlarimiz va xizmatlarimizdan qanday foydalanishingiz haqidagi ma'lumotlar.",
          "Marketing va aloqa ma'lumotlari: bizdan va uchinchi tomonlarimizdan marketing xabarlarini olish bo'yicha afzalliklaringiz va aloqa afzalliklaringiz.",
        ],
      },
      dataUse: {
        title: "Ma'lumotlaringizdan qanday foydalanamiz",
        content:
          "Biz sizning shaxsiy ma'lumotlaringizdan faqat qonun ruxsat bergan hollarda foydalanamiz. Ko'pincha, biz sizning shaxsiy ma'lumotlaringizdan quyidagi holatlarda foydalanamiz:",
        items: [
          "Sizni yangi mijoz sifatida ro'yxatdan o'tkazish uchun.",
          "Buyurtmangizni qayta ishlash va yetkazib berish uchun.",
          "Siz bilan munosabatlarimizni boshqarish uchun.",
          "Veb-saytimiz, mahsulotlarimiz/xizmatlarimiz, marketingimiz yoki mijozlar bilan munosabatlarimizni yaxshilash uchun.",
          "Sizni qiziqtirishi mumkin bo'lgan mahsulot yoki xizmatlarni tavsiya qilish uchun.",
          "Qonuniy yoki tartibga solish majburiyatlariga rioya qilish uchun.",
        ],
      },
      dataSecurity: {
        title: "Ma'lumotlar xavfsizligi",
        content:
          "Biz sizning shaxsiy ma'lumotlaringizni tasodifan yo'qotilishi, ruxsatsiz foydalanilishi yoki kirilishi, o'zgartirilishi yoki oshkor qilinishining oldini olish uchun tegishli xavfsizlik choralarini ko'rdik. Bundan tashqari, biz sizning shaxsiy ma'lumotlaringizga kirishni biznes ehtiyojlari bo'lgan xodimlar, agentlar, pudratchilar va boshqa uchinchi tomonlar bilan cheklaymiz.",
      },
      dataRetention: {
        title: "Ma'lumotlarni saqlash",
        content:
          "Biz sizning shaxsiy ma'lumotlaringizni faqat biz to'plagan maqsadlarni bajarish uchun zarur bo'lgan vaqt davomida saqlaymiz, shu jumladan har qanday huquqiy, buxgalteriya yoki hisobot talablarini qondirish maqsadida.",
      },
      yourRights: {
        title: "Sizning huquqiy huquqlaringiz",
        content:
          "Ma'lum sharoitlarda, sizda ma'lumotlarni himoya qilish qonunlari bo'yicha shaxsiy ma'lumotlaringizga nisbatan huquqlar mavjud, jumladan quyidagi huquqlar:",
        items: [
          "Shaxsiy ma'lumotlaringizga kirish huquqi.",
          "Shaxsiy ma'lumotlaringizni tuzatish huquqi.",
          "Shaxsiy ma'lumotlaringizni o'chirish huquqi.",
          "Shaxsiy ma'lumotlaringizni qayta ishlashga qarshi chiqish huquqi.",
          "Shaxsiy ma'lumotlaringizni qayta ishlashni cheklash huquqi.",
          "Shaxsiy ma'lumotlaringizni uzatish huquqi.",
          "Rozilikni qaytarib olish huquqi.",
        ],
      },
      cookies: {
        title: "Cookie fayllar",
        content:
          "Bizning veb-saytimiz sizni veb-saytimizning boshqa foydalanuvchilaridan ajratib turish uchun cookie fayllaridan foydalanadi. Bu bizga veb-saytimizni ko'rib chiqayotganingizda sizga yaxshi tajriba taqdim etishga yordam beradi, shuningdek, saytimizni yaxshilash imkonini beradi.",
      },
      contact: {
        title: "Biz bilan bog'laning",
        content:
          "Agar sizda ushbu maxfiylik siyosati yoki bizning maxfiylik amaliyotlarimiz haqida savollaringiz bo'lsa, iltimos, biz bilan quyidagi manzil orqali bog'laning:",
      },
    },
  }

  const content = pageContent[language as keyof typeof pageContent]

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{content.lastUpdated}</p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2>{content.introduction.title}</h2>
          <p>{content.introduction.content}</p>

          <h2>{content.dataCollection.title}</h2>
          <p>{content.dataCollection.content}</p>
          <ul className="list-disc pl-5 space-y-2">
            {content.dataCollection.items.map((item, index) => (
              <li key={index} className="text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>

          <h2>{content.dataUse.title}</h2>
          <p>{content.dataUse.content}</p>
          <ul className="list-disc pl-5 space-y-2">
            {content.dataUse.items.map((item, index) => (
              <li key={index} className="text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>

          <h2>{content.dataSecurity.title}</h2>
          <p>{content.dataSecurity.content}</p>

          <h2>{content.dataRetention.title}</h2>
          <p>{content.dataRetention.content}</p>

          <h2>{content.yourRights.title}</h2>
          <p>{content.yourRights.content}</p>
          <ul className="list-disc pl-5 space-y-2">
            {content.yourRights.items.map((item, index) => (
              <li key={index} className="text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>

          <h2>{content.cookies.title}</h2>
          <p>{content.cookies.content}</p>

          <h2>{content.contact.title}</h2>
          <p>{content.contact.content}</p>
        </div>

        <div className="mt-12 border-t pt-6">
          <Link href="/" className="text-primary hover:underline">
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </main>
  )
}

