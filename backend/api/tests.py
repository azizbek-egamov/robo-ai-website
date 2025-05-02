from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Course, Enrollment

class CourseAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.course = Course.objects.create(
            title_en="Test Course",
            title_ru="Тестовый курс",
            title_uz="Test kursi",
            description_en="Test description",
            description_ru="Тестовое описание",
            description_uz="Test tavsifi",
            detailed_description_en="Detailed test description",
            detailed_description_ru="Подробное тестовое описание",
            detailed_description_uz="Batafsil test tavsifi",
            difficulty="beginner",
            duration_en="4 weeks",
            duration_ru="4 недели",
            duration_uz="4 hafta",
            schedule_en="Mon, Wed",
            schedule_ru="Пн, Ср",
            schedule_uz="Du, Chor",
            start_date_en="January 1, 2024",
            start_date_ru="1 января 2024",
            start_date_uz="2024-yil 1-yanvar",
            max_students=20,
            price_en="$199",
            price_ru="199$",
            price_uz="199$"
        )
        self.url = reverse('course-list')
        self.detail_url = reverse('course-detail', kwargs={'pk': self.course.pk})

    def test_get_courses(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_get_course_detail(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title_en'], 'Test Course')

class EnrollmentAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.course = Course.objects.create(
            title_en="Test Course",
            title_ru="Тестовый курс",
            title_uz="Test kursi",
            description_en="Test description",
            description_ru="Тестовое описание",
            description_uz="Test tavsifi",
            detailed_description_en="Detailed test description",
            detailed_description_ru="Подробное тестовое описание",
            detailed_description_uz="Batafsil test tavsifi",
            difficulty="beginner",
            duration_en="4 weeks",
            duration_ru="4 недели",
            duration_uz="4 hafta",
            schedule_en="Mon, Wed",
            schedule_ru="Пн, Ср",
            schedule_uz="Du, Chor",
            start_date_en="January 1, 2024",
            start_date_ru="1 января 2024",
            start_date_uz="2024-yil 1-yanvar",
            max_students=20,
            price_en="$199",
            price_ru="199$",
            price_uz="199$"
        )
        self.url = reverse('enrollment-list')
        self.valid_payload = {
            'first_name': 'John',
            'last_name': 'Doe',
            'phone': '+998 90 123 45 67',
            'course': self.course.pk,
            'comments': 'Test comment'
        }

    def test_create_enrollment(self):
        response = self.client.post(
            self.url,
            self.valid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Enrollment.objects.count(), 1)
        self.assertEqual(Enrollment.objects.get().first_name, 'John')

