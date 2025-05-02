// Mock data for when API is unavailable
export const mockData = {
  courses: [
    {
      id: 1,
      title_en: "Introduction to Robotics",
      title_ru: "Введение в робототехнику",
      title_uz: "Robototexnikaga kirish",
      description_en: "Learn the basics of robotics and build your first robot",
      description_ru: "Изучите основы робототехники и соберите своего первого робота",
      description_uz: "Robototexnika asoslarini o'rganing va birinchi robotingizni yarating",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "beginner",
      duration_en: "4 weeks",
      duration_ru: "4 недели",
      duration_uz: "4 hafta",
      schedule_en: "Mon, Wed, Fri",
      schedule_ru: "Пн, Ср, Пт",
      schedule_uz: "Du, Chor, Ju",
      start_date_en: "January 15, 2024",
      start_date_ru: "15 января 2024",
      start_date_uz: "2024-yil 15-yanvar",
      max_students: 20,
      price_en: "$199",
      price_ru: "199$",
      price_uz: "199$",
      instructors: [
        {
          id: 1,
          name: "John Smith",
          title_en: "Robotics Engineer",
          title_ru: "Инженер-робототехник",
          title_uz: "Robototexnika muhandisi",
          bio_en: "10+ years of experience in robotics and education",
          bio_ru: "Более 10 лет опыта в робототехнике и образовании",
          bio_uz: "Robototexnika va ta'lim sohasida 10+ yillik tajriba",
          photo: "/placeholder.svg?height=100&width=100",
        },
      ],
      syllabus_items: [
        {
          id: 1,
          week: 1,
          title_en: "Introduction to Robotics",
          title_ru: "Введение в робототехнику",
          title_uz: "Robototexnikaga kirish",
          topics: [
            {
              id: 1,
              topic_en: "History of robotics",
              topic_ru: "История робототехники",
              topic_uz: "Robototexnika tarixi",
            },
            {
              id: 2,
              topic_en: "Basic components",
              topic_ru: "Основные компоненты",
              topic_uz: "Asosiy komponentlar",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title_en: "AI Fundamentals",
      title_ru: "Основы искусственного интеллекта",
      title_uz: "Sun'iy intellekt asoslari",
      description_en: "Understand the core concepts of artificial intelligence",
      description_ru: "Поймите основные концепции искусственного интеллекта",
      description_uz: "Sun'iy intellektning asosiy tushunchalarini tushunish",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "beginner",
      duration_en: "6 weeks",
      duration_ru: "6 недель",
      duration_uz: "6 hafta",
      schedule_en: "Tue, Thu",
      schedule_ru: "Вт, Чт",
      schedule_uz: "Se, Pay",
      start_date_en: "February 1, 2024",
      start_date_ru: "1 февраля 2024",
      start_date_uz: "2024-yil 1-fevral",
      max_students: 15,
      price_en: "$249",
      price_ru: "249$",
      price_uz: "249$",
      instructors: [
        {
          id: 2,
          name: "Maria Rodriguez",
          title_en: "AI Specialist",
          title_ru: "Специалист по ИИ",
          title_uz: "Sun'iy intellekt mutaxassisi",
          bio_en: "PhD in Computer Science with focus on machine learning",
          bio_ru: "Кандидат наук в области компьютерных наук с фокусом на машинное обучение",
          bio_uz: "Kompyuter fanlari bo'yicha PhD, mashinali o'rganishga ixtisoslashgan",
          photo: "/placeholder.svg?height=100&width=100",
        },
      ],
      syllabus_items: [
        {
          id: 2,
          week: 1,
          title_en: "Introduction to AI",
          title_ru: "Введение в ИИ",
          title_uz: "Sun'iy intellektga kirish",
          topics: [
            {
              id: 3,
              topic_en: "What is AI?",
              topic_ru: "Что такое ИИ?",
              topic_uz: "Sun'iy intellekt nima?",
            },
            {
              id: 4,
              topic_en: "History of AI",
              topic_ru: "История ИИ",
              topic_uz: "Sun'iy intellekt tarixi",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title_en: "Advanced Robotics Programming",
      title_ru: "Продвинутое программирование роботов",
      title_uz: "Ilg'or robototexnika dasturlash",
      description_en: "Learn advanced programming techniques for robotics",
      description_ru: "Изучите продвинутые методы программирования для робототехники",
      description_uz: "Robototexnika uchun ilg'or dasturlash usullarini o'rganing",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "advanced",
      duration_en: "8 weeks",
      duration_ru: "8 недель",
      duration_uz: "8 hafta",
      schedule_en: "Mon, Wed, Fri",
      schedule_ru: "Пн, Ср, Пт",
      schedule_uz: "Du, Chor, Ju",
      start_date_en: "March 1, 2024",
      start_date_ru: "1 марта 2024",
      start_date_uz: "2024-yil 1-mart",
      max_students: 12,
      price_en: "$349",
      price_ru: "349$",
      price_uz: "349$",
      instructors: [
        {
          id: 3,
          name: "David Chen",
          title_en: "Senior Robotics Engineer",
          title_ru: "Старший инженер-робототехник",
          title_uz: "Katta robototexnika muhandisi",
          bio_en: "15+ years in industrial robotics and automation",
          bio_ru: "Более 15 лет в промышленной робототехнике и автоматизации",
          bio_uz: "Sanoat robototexnikasi va avtomatlashtirish sohasida 15+ yillik tajriba",
          photo: "/placeholder.svg?height=100&width=100",
        },
      ],
      syllabus_items: [],
    },
  ],
  projects: [
    {
      id: 1,
      title_en: "Line Following Robot",
      title_ru: "Робот, следующий по линии",
      title_uz: "Chiziq bo'ylab harakatlanuvchi robot",
      description_en: "Build a robot that can follow a line using sensors",
      description_ru: "Создайте робота, который может следовать по линии с помощью датчиков",
      description_uz: "Sensorlar yordamida chiziq bo'ylab harakatlanadigan robot yarating",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "beginner",
      tags_list: ["Arduino", "Sensors", "Motors"],
      title: {
        en: "Line Following Robot",
        ru: "Робот, следующий по линии",
        uz: "Chiziq bo'ylab harakatlanuvchi robot",
      },
      difficulty: {
        en: "Beginner",
        ru: "Начальный",
        uz: "Boshlang'ich",
      },
      detailedDescription: {
        en: "In this project, you will build a robot that can follow a black line on a white surface using infrared sensors. You will learn about sensor calibration, motor control, and basic programming concepts.",
        ru: "В этом проекте вы создадите робота, который может следовать по черной линии на белой поверхности с помощью инфракрасных датчиков. Вы узнаете о калибровке датчиков, управлении двигателями и основных концепциях программирования.",
        uz: "Ushbu loyihada siz infraqizil sensorlar yordamida oq sirtda qora chiziq bo'ylab harakatlanadigan robot yaratishni o'rganasiz. Siz sensorlarni kalibrlash, motorlarni boshqarish va dasturlashning asosiy tushunchalari haqida bilib olasiz.",
      },
      steps: {
        en: [
          {
            title: "Gather Materials",
            description: "Collect all the necessary components for the project.",
          },
          {
            title: "Assemble the Chassis",
            description: "Build the robot chassis and attach the motors.",
          },
        ],
        ru: [
          {
            title: "Соберите материалы",
            description: "Соберите все необходимые компоненты для проекта.",
          },
          {
            title: "Соберите шасси",
            description: "Постройте шасси робота и прикрепите двигатели.",
          },
        ],
        uz: [
          {
            title: "Materiallarni to'plang",
            description: "Loyiha uchun barcha kerakli komponentlarni to'plang.",
          },
          {
            title: "Shassi yig'ing",
            description: "Robot shassisini yig'ing va motorlarni o'rnating.",
          },
        ],
      },
      materials: {
        en: ["Arduino Uno", "IR Sensors (2)", "DC Motors (2)", "Motor Driver", "Wheels", "Battery"],
        ru: ["Arduino Uno", "ИК-датчики (2)", "DC моторы (2)", "Драйвер двигателя", "Колеса", "Батарея"],
        uz: ["Arduino Uno", "IR sensorlar (2)", "DC motorlar (2)", "Motor drayveri", "G'ildiraklar", "Batareya"],
      },
      codeSnippet: `
void setup() {
  pinMode(leftSensor, INPUT);
  pinMode(rightSensor, INPUT);
  pinMode(leftMotor, OUTPUT);
  pinMode(rightMotor, OUTPUT);
}

void loop() {
  int leftValue = digitalRead(leftSensor);
  int rightValue = digitalRead(rightSensor);
  
  if (leftValue == HIGH && rightValue == HIGH) {
    // Both sensors on the line, move forward
    moveForward();
  } else if (leftValue == HIGH && rightValue == LOW) {
    // Left sensor on the line, turn left
    turnLeft();
  } else if (leftValue == LOW && rightValue == HIGH) {
    // Right sensor on the line, turn right
    turnRight();
  } else {
    // Both sensors off the line, stop
    stop();
  }
}
`,
    },
    {
      id: 2,
      title_en: "Voice Controlled Robot",
      title_ru: "Робот с голосовым управлением",
      title_uz: "Ovoz bilan boshqariladigan robot",
      description_en: "Create a robot that responds to voice commands",
      description_ru: "Создайте робота, который реагирует на голосовые команды",
      description_uz: "Ovozli buyruqlarga javob beradigan robot yarating",
      image: "/placeholder.svg?height=200&width=300",
      difficulty: "intermediate",
      tags_list: ["Raspberry Pi", "Speech Recognition", "Python"],
      title: {
        en: "Voice Controlled Robot",
        ru: "Робот с голосовым управлением",
        uz: "Ovoz bilan boshqariladigan robot",
      },
      difficulty: {
        en: "Intermediate",
        ru: "Средний",
        uz: "O'rta",
      },
      detailedDescription: {
        en: "Build a robot that can understand and respond to voice commands using a Raspberry Pi and speech recognition libraries.",
        ru: "Создайте робота, который может понимать голосовые команды и реагировать на них, используя Raspberry Pi и библиотеки распознавания речи.",
        uz: "Raspberry Pi va nutqni tanish kutubxonalaridan foydalanib, ovozli buyruqlarni tushunadigan va ularga javob beradigan robot yarating.",
      },
      steps: {
        en: [],
        ru: [],
        uz: [],
      },
      materials: {
        en: [],
        ru: [],
        uz: [],
      },
      codeSnippet: "",
    },
  ],
  news: [
    {
      id: 1,
      title_en: "New Robotics Course Available",
      title_ru: "Доступен новый курс по робототехнике",
      title_uz: "Yangi robototexnika kursi mavjud",
      date: "2023-12-15",
    },
    {
      id: 2,
      title_en: "Robotics Competition Announcement",
      title_ru: "Объявление о соревновании по робототехнике",
      title_uz: "Robototexnika musobaqasi e'loni",
      date: "2023-12-10",
    },
    {
      id: 3,
      title_en: "Workshop on AI in Robotics",
      title_ru: "Семинар по ИИ в робототехнике",
      title_uz: "Robototexnikada sun'iy intellekt bo'yicha seminar",
      date: "2023-12-05",
    },
  ],
  tasks: [
    {
      id: 1,
      title: {
        en: "Build a Line Following Robot",
        ru: "Создайте робота, следующего по линии",
        uz: "Chiziq bo'ylab harakatlanuvchi robot yarating",
      },
      description: {
        en: "Create a robot that can follow a black line on a white surface",
        ru: "Создайте робота, который может следовать по черной линии на белой поверхности",
        uz: "Oq sirtda qora chiziq bo'ylab harakatlanadigan robot yarating",
      },
      detailed_description: {
        en: "In this task, you will build a simple line following robot using Arduino and IR sensors. The robot should be able to detect and follow a black line on a white surface.",
        ru: "В этом задании вы создадите простого робота, следующего по линии, используя Arduino и ИК-датчики. Робот должен уметь обнаруживать черную линию на белой поверхности и следовать по ней.",
        uz: "Ushbu topshiriqda siz Arduino va IR sensorlardan foydalanib, oddiy chiziq bo'ylab harakatlanuvchi robot yaratishni o'rganasiz. Robot oq sirtda qora chiziqni aniqlay olishi va uning bo'ylab harakatlanishi kerak.",
      },
      points: 100,
      estimated_time: {
        en: "2-3 hours",
        ru: "2-3 часа",
        uz: "2-3 soat",
      },
      difficulty: "beginner", // Make sure this is a string, not an object
      related_course: 1,
      status: "not_started",
      requirements: [
        {
          id: 1,
          requirement_en: "The robot must follow a black line on a white surface",
          requirement_ru: "Робот должен следовать по черной линии на белой поверхности",
          requirement_uz: "Robot oq sirtda qora chiziq bo'ylab harakatlanishi kerak",
        },
        {
          id: 2,
          requirement_en: "The robot must be able to handle curves in the line",
          requirement_ru: "Робот должен уметь обрабатывать изгибы линии",
          requirement_uz: "Robot chiziqdagi burilishlarni bajara olishi kerak",
        },
      ],
      hints: [
        {
          id: 1,
          hint_en: "Use IR sensors to detect the contrast between the black line and white surface",
          hint_ru: "Используйте ИК-датчики для обнаружения контраста между черной линией и белой поверхностью",
          hint_uz: "Qora chiziq va oq sirt o'rtasidagi kontrastni aniqlash uchun IR sensorlardan foydalaning",
        },
      ],
      sample_code: `
void setup() {
  pinMode(leftSensor, INPUT);
  pinMode(rightSensor, INPUT);
  pinMode(leftMotor, OUTPUT);
  pinMode(rightMotor, OUTPUT);
}

void loop() {
  // Your code here
}
`,
    },
    {
      id: 2,
      title: {
        en: "Program a Servo Motor Controller",
        ru: "Запрограммируйте контроллер сервопривода",
        uz: "Servo motor kontrollerini dasturlang",
      },
      description: {
        en: "Write code to control a servo motor using Arduino",
        ru: "Напишите код для управления сервоприводом с помощью Arduino",
        uz: "Arduino yordamida servo motorni boshqarish uchun kod yozing",
      },
      detailed_description: {
        en: "In this task, you will learn how to control servo motors using Arduino. You will write code to make the servo move to specific positions.",
        ru: "В этом задании вы научитесь управлять сервоприводами с помощью Arduino. Вы напишете код, чтобы заставить сервопривод перемещаться в определенные положения.",
        uz: "Ushbu topshiriqda siz Arduino yordamida servo motorlarni boshqarishni o'rganasiz. Siz servoni ma'lum pozitsiyalarga harakatlantirish uchun kod yozasiz.",
      },
      points: 75,
      estimated_time: {
        en: "1-2 hours",
        ru: "1-2 часа",
        uz: "1-2 soat",
      },
      difficulty: "beginner",
      related_course: 1,
      status: "not_started",
      requirements: [],
      hints: [],
      sample_code: "",
    },
  ],
  resources: [
    {
      id: 1,
      title_en: "Introduction to Arduino Programming",
      title_ru: "Введение в программирование Arduino",
      title_uz: "Arduino dasturlashga kirish",
      description_en: "Learn the basics of programming Arduino microcontrollers",
      description_ru: "Изучите основы программирования микроконтроллеров Arduino",
      description_uz: "Arduino mikrokontrollerlarini dasturlashning asoslarini o'rganing",
      category: "tutorials",
    },
  ],
  resources: [
    {
      id: 1,
      title_en: "Introduction to Arduino Programming",
      title_ru: "Введение в программирование Arduino",
      title_uz: "Arduino dasturlashga kirish",
      description_en: "Learn the basics of programming Arduino microcontrollers",
      description_ru: "Изучите основы программирования микроконтроллеров Arduino",
      description_uz: "Arduino mikrokontrollerlarini dasturlashning asoslarini o'rganing",
      content_en:
        "Arduino is an open-source electronics platform based on easy-to-use hardware and software. In this tutorial, you'll learn the basics of Arduino programming, including how to set up your development environment, write your first sketch, and control basic components like LEDs and sensors.",
      content_ru:
        "Arduino - это платформа с открытым исходным кодом, основанная на простом в использовании оборудовании и программном обеспечении. В этом руководстве вы изучите основы программирования Arduino, включая настройку среды разработки, написание первого скетча и управление базовыми компонентами, такими как светодиоды и датчики.",
      content_uz:
        "Arduino - bu oson ishlatiladigan apparat va dasturiy ta'minotga asoslangan ochiq manbali elektronika platformasi. Ushbu qo'llanmada siz Arduino dasturlashning asoslarini, jumladan, rivojlanish muhitini qanday sozlash, birinchi eskizni yozish va LED va sensorlar kabi asosiy komponentlarni boshqarishni o'rganasiz.",
      category: "tutorials",
      image: "/placeholder.svg?height=300&width=500",
      external_link: "",
      is_external: false,
      is_downloadable: false,
    },
    {
      id: 2,
      title_en: "Building Your First Robot",
      title_ru: "Создание вашего первого робота",
      title_uz: "Birinchi robotingizni yaratish",
      description_en: "A step-by-step video tutorial on building a simple robot from scratch",
      description_ru: "Пошаговый видеоурок по созданию простого робота с нуля",
      description_uz: "Oddiy robotni noldan yaratish bo'yicha bosqichma-bosqich video qo'llanma",
      content_en: "",
      content_ru: "",
      content_uz: "",
      category: "videos",
      image: "/placeholder.svg?height=300&width=500",
      external_link: "https://www.youtube.com/watch?v=example1",
      is_external: true,
      is_downloadable: false,
    },
    {
      id: 3,
      title_en: "Robotics: A Beginner's Guide",
      title_ru: "Робототехника: руководство для начинающих",
      title_uz: "Robototexnika: boshlang'ich qo'llanma",
      description_en: "A comprehensive introduction to robotics for beginners",
      description_ru: "Всестороннее введение в робототехнику для начинающих",
      description_uz: "Boshlang'ichlar uchun robototexnikaga keng qamrovli kirish",
      content_en:
        "This book covers all the fundamental concepts of robotics, from mechanical design to electronics and programming. Perfect for beginners who want to understand the field of robotics.",
      content_ru:
        "Эта книга охватывает все фундаментальные концепции робототехники, от механического проектирования до электроники и программирования. Идеально подходит для начинающих, которые хотят понять область робототехники.",
      content_uz:
        "Ushbu kitob robototexnikaning barcha asosiy tushunchalarini, mexanik dizayndan elektronika va dasturlashgacha qamrab oladi. Robototexnika sohasini tushunmoqchi bo'lgan boshlang'ichlar uchun ideal.",
      category: "books",
      image: "/placeholder.svg?height=300&width=500",
      external_link: "",
      is_external: false,
      is_downloadable: false,
    },
    {
      id: 4,
      title_en: "Arduino Project Templates",
      title_ru: "Шаблоны проектов Arduino",
      title_uz: "Arduino loyiha shablonlari",
      description_en: "A collection of template code for common Arduino projects",
      description_ru: "Коллекция шаблонного кода для распространенных проектов Arduino",
      description_uz: "Keng tarqalgan Arduino loyihalari uchun shablon kodlar to'plami",
      content_en: "",
      content_ru: "",
      content_uz: "",
      category: "downloads",
      image: "",
      external_link: "/downloads/arduino-templates.zip",
      is_external: false,
      is_downloadable: true,
    },
  ],
}

