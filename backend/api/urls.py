from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet, InstructorViewSet, EnrollmentViewSet,
    ProjectViewSet, TaskViewSet, ResourceViewSet, NewsViewSet,
    ContactViewSet, ServiceViewSet, TeamMemberViewSet,
    TestimonialViewSet, health_check, TestViewSet, TaskSubmissionViewSet  # Add this import
)

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'instructors', InstructorViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'resources', ResourceViewSet)
router.register(r'news', NewsViewSet)
router.register(r'contacts', ContactViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'team', TeamMemberViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'tests', TestViewSet)
router.register(r'task-submissions', TaskSubmissionViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('health-check/', health_check, name='health-check'),  # Add this line
]

