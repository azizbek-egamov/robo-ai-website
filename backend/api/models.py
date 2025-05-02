from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

class Course(models.Model):
    """Model for courses"""
    DIFFICULTY_CHOICES = [
        ('beginner', _('Boshlang\'ich')),
        ('intermediate', _('O\'rta')),
        ('advanced', _('Yuqori')),
    ]
    
    title = models.CharField(max_length=255, verbose_name=_("Sarlavha"))
    description = models.TextField(verbose_name=_("Tavsif"))
    detailed_description = models.TextField(verbose_name=_("Batafsil tavsif"))
    image = models.ImageField(upload_to='courses/', verbose_name=_("Rasm"))
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, verbose_name=_("Qiyinchilik darajasi"))
    duration = models.CharField(max_length=50, verbose_name=_("Davomiylik"))
    schedule = models.CharField(max_length=100, verbose_name=_("Jadval"))
    start_date = models.CharField(max_length=50, verbose_name=_("Boshlanish sanasi"))
    max_students = models.PositiveIntegerField(verbose_name=_("Maksimal talabalar soni"))
    price = models.CharField(max_length=50, verbose_name=_("Narx"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Yaratilgan sana"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Yangilangan sana"))
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = _("Kurs")
        verbose_name_plural = _("Kurslar")
        ordering = ['-created_at']

class Instructor(models.Model):
    """Model for instructors"""
    name = models.CharField(max_length=255, verbose_name=_("Ism"))
    title = models.CharField(max_length=255, verbose_name=_("Unvon"))
    bio = models.TextField(verbose_name=_("Biografiya"))
    photo = models.ImageField(upload_to='instructors/', verbose_name=_("Rasm"))
    courses = models.ManyToManyField(Course, related_name='instructors', verbose_name=_("Kurslar"))
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = _("O'qituvchi")
        verbose_name_plural = _("O'qituvchilar")

class CourseSyllabus(models.Model):
    """Model for course syllabus"""
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='syllabus_items', verbose_name=_("Kurs"))
    week = models.PositiveIntegerField(verbose_name=_("Hafta"))
    title = models.CharField(max_length=255, verbose_name=_("Sarlavha"))
    
    def __str__(self):
        return f"{self.course.title} - Hafta {self.week}: {self.title}"
    
    class Meta:
        verbose_name = _("Kurs dasturi")
        verbose_name_plural = _("Kurs dasturlari")
        ordering = ['course', 'week']
        unique_together = ['course', 'week']

class SyllabusTopic(models.Model):
    """Model for syllabus topics"""
    syllabus = models.ForeignKey(CourseSyllabus, on_delete=models.CASCADE, related_name='topics', verbose_name=_("Kurs dasturi"))
    topic = models.CharField(max_length=255, verbose_name=_("Mavzu"))
    
    def __str__(self):
        return self.topic
    
    class Meta:
        verbose_name = _("Kurs mavzusi")
        verbose_name_plural = _("Kurs mavzulari")

class Enrollment(models.Model):
    """Model for course enrollments"""
    STATUS_CHOICES = [
        ('pending', _('Kutilmoqda')),
        ('approved', _('Tasdiqlangan')),
        ('rejected', _('Rad etilgan')),
    ]
    
    first_name = models.CharField(max_length=255, verbose_name=_("Ism"))
    last_name = models.CharField(max_length=255, verbose_name=_("Familiya"))
    phone = models.CharField(max_length=20, verbose_name=_("Telefon raqam"))
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments', verbose_name=_("Kurs"))
    comments = models.TextField(blank=True, verbose_name=_("Izohlar"))
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name=_("Holat"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Yaratilgan sana"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Yangilangan sana"))
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.course.title}"
    
    class Meta:
        verbose_name = _("Ro'yxatdan o'tish")
        verbose_name_plural = _("Ro'yxatdan o'tishlar")
        ordering = ['-created_at']

class Project(models.Model):
    DIFFICULTY_CHOICES = [
        ('beginner', _('Boshlang\'ich')),
        ('intermediate', _('O\'rta')),
        ('advanced', _('Yuqori')),
    ]
    
    title = models.CharField(max_length=255, verbose_name=_("Sarlavha"))
    description = models.TextField(verbose_name=_("Tavsif"))
    image = models.ImageField(upload_to='projects/', verbose_name=_("Rasm"))
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, verbose_name=_("Qiyinchilik darajasi"))
    sample_code = models.TextField(blank=True, null=True, verbose_name=_("Namuna kod"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Yaratilgan sana"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Yangilangan sana"))

    class Meta:
        verbose_name = _("Loyiha")
        verbose_name_plural = _("Loyihalar")
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class ProjectMaterial(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='materials')
    title = models.CharField(max_length=200, verbose_name="Material nomi")
    description = models.TextField(verbose_name="Material tavsifi")
    quantity = models.PositiveIntegerField(default=1, verbose_name="Miqdori")
    unit = models.CharField(max_length=50, verbose_name="O'lchov birligi")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    class Meta:
        verbose_name = "Loyiha materialii"
        verbose_name_plural = "Loyiha materiallari"

    def __str__(self):
        return self.title

class ProjectStep(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='steps')
    step_number = models.PositiveIntegerField(verbose_name="Qadam raqami")
    title = models.CharField(max_length=200, verbose_name="Qadam nomi")
    description = models.TextField(verbose_name="Qadam tavsifi")
    image = models.ImageField(upload_to='project_steps/', null=True, blank=True, verbose_name="Rasm")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Loyiha qadami"
        verbose_name_plural = "Loyiha qadamlari"
        ordering = ['step_number']

    def __str__(self):
        return f"{self.step_number}. {self.title}"

class Task(models.Model):
    """Model for tasks"""
    DIFFICULTY_CHOICES = [
        ('beginner', _('Boshlang\'ich')),
        ('intermediate', _('O\'rta')),
        ('advanced', _('Yuqori')),
    ]
    
    STATUS_CHOICES = [
        ('not_started', _('Boshlanmagan')),
        ('in_progress', _('Jarayonda')),
        ('completed', _('Tugallangan')),
    ]
    
    title = models.CharField(max_length=255, verbose_name=_("Sarlavha"))
    description = models.TextField(verbose_name=_("Tavsif"))
    detailed_description = models.TextField(verbose_name=_("Batafsil tavsif"))
    points = models.PositiveIntegerField(verbose_name=_("Ballar"))
    estimated_time = models.CharField(max_length=50, verbose_name=_("Taxminiy vaqt"))
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, verbose_name=_("Qiyinchilik darajasi"))
    related_course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='tasks', verbose_name=_("Bog'liq kurs"))
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started', verbose_name=_("Holat"))
    sample_code = models.TextField(blank=True, verbose_name=_("Namuna kod"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Yaratilgan sana"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Yangilangan sana"))
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = _("Vazifa")
        verbose_name_plural = _("Vazifalar")
        ordering = ['-created_at']

class TaskRequirement(models.Model):
    """Model for task requirements"""
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='requirements', verbose_name=_("Vazifa"))
    requirement = models.CharField(max_length=255, verbose_name=_("Talab"))
    
    def __str__(self):
        return f"{self.task.title} - {self.requirement[:50]}"
    
    class Meta:
        verbose_name = _("Vazifa talabi")
        verbose_name_plural = _("Vazifa talablari")

class TaskHint(models.Model):
    """Model for task hints"""
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='hints', verbose_name=_("Vazifa"))
    hint = models.TextField(verbose_name=_("Maslahat"))
    
    def __str__(self):
        return f"{self.task.title} - {self.hint[:50]}"
    
    class Meta:
        verbose_name = _("Vazifa maslahati")
        verbose_name_plural = _("Vazifa maslahatlari")

class Resource(models.Model):
    """Model for resources"""
    CATEGORY_CHOICES = [
        ('tutorials', _('Qo\'llanmalar')),
        ('videos', _('Videolar')),
        ('books', _('Kitoblar')),
        ('downloads', _('Yuklamalar')),
    ]
    
    title = models.CharField(max_length=255, verbose_name=_("Sarlavha"))
    description = models.TextField(verbose_name=_("Tavsif"))
    content = models.TextField(blank=True, verbose_name=_("Mazmun"))
    image = models.ImageField(upload_to='resources/', blank=True, verbose_name=_("Rasm"))
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, verbose_name=_("Kategoriya"))
    file = models.FileField(upload_to='resources/files/', blank=True, verbose_name=_("Fayl"))
    external_link = models.URLField(blank=True, verbose_name=_("Tashqi havola"))
    is_external = models.BooleanField(default=False, verbose_name=_("Tashqi manba"))
    is_downloadable = models.BooleanField(default=False, verbose_name=_("Yuklab olinadimi"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Yaratilgan sana"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Yangilangan sana"))
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = _("Resurs")
        verbose_name_plural = _("Resurslar")
        ordering = ['-created_at']

class News(models.Model):
    title = models.CharField(max_length=255, verbose_name=_("Sarlavha"))
    content = models.TextField(verbose_name=_("Mazmuni"))
    image = models.ImageField(upload_to='news/', verbose_name=_("Rasm"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Yaratilgan sana"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Yangilangan sana"))

    class Meta:
        verbose_name = _("Yangilik")
        verbose_name_plural = _("Yangiliklar")
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Contact(models.Model):
    name = models.CharField(max_length=255, verbose_name=_("Ism"))
    email = models.EmailField(verbose_name=_("Elektron pochta"))
    phone = models.CharField(max_length=20, verbose_name=_("Telefon raqam"))
    message = models.TextField(verbose_name=_("Xabar"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Yaratilgan sana"))

    class Meta:
        verbose_name = _("Aloqa")
        verbose_name_plural = _("Aloqalar")
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.email}"

class Service(models.Model):
    title = models.CharField(max_length=255, verbose_name=_("Sarlavha"))
    description = models.TextField(verbose_name=_("Tavsif"))
    icon = models.CharField(max_length=50, verbose_name=_("Ikonka"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Yaratilgan sana"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Yangilangan sana"))

    class Meta:
        verbose_name = _("Xizmat")
        verbose_name_plural = _("Xizmatlar")
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class TeamMember(models.Model):
    name = models.CharField(max_length=255, verbose_name=_("Ism"))
    position = models.CharField(max_length=255, verbose_name=_("Lavozim"))
    bio = models.TextField(verbose_name=_("Biografiya"))
    image = models.ImageField(upload_to='team/', verbose_name=_("Rasm"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Yaratilgan sana"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Yangilangan sana"))

    class Meta:
        verbose_name = _("Jamoa a'zosi")
        verbose_name_plural = _("Jamoa a'zolari")
        ordering = ['-created_at']

    def __str__(self):
        return self.name

class Testimonial(models.Model):
    name = models.CharField(max_length=255, verbose_name=_("Ism"))
    position = models.CharField(max_length=255, verbose_name=_("Lavozim"))
    content = models.TextField(verbose_name=_("Izoh"))
    image = models.ImageField(upload_to='testimonials/', verbose_name=_("Rasm"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Yaratilgan sana"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Yangilangan sana"))

    class Meta:
        verbose_name = _("Izoh")
        verbose_name_plural = _("Izohlar")
        ordering = ['-created_at']

    def __str__(self):
        return self.name

class Test(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='tests/')
    description = models.TextField()
    google_form_link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Test'
        verbose_name_plural = 'Testlar'


class TaskSubmission(models.Model):
    """Model for task submissions"""
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='submissions', verbose_name=_("Vazifa"))
    user_name = models.CharField(max_length=255, verbose_name=_("Foydalanuvchi ismi"))
    email = models.EmailField(verbose_name=_("Elektron pochta"))
    code = models.TextField(verbose_name=_("Yechim kodi"))
    comments = models.TextField(blank=True, null=True, verbose_name=_("Izohlar"))
    status = models.CharField(
        max_length=20, 
        choices=[
            ('pending', _('Ko\'rib chiqilmoqda')),
            ('approved', _('Tasdiqlangan')),
            ('rejected', _('Rad etilgan')),
        ],
        default='pending',
        verbose_name=_("Holat")
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Yuborilgan sana"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Yangilangan sana"))
    
    def __str__(self):
        return f"{self.user_name} - {self.task.title}"
    
    class Meta:
        verbose_name = _("Vazifa yechimi")
        verbose_name_plural = _("Vazifa yechimlari")
        ordering = ['-created_at']
