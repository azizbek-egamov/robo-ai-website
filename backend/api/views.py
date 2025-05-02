from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from django.shortcuts import get_object_or_404
from .models import (
    Course, Instructor, Enrollment, Project, 
    Task, Resource, News, Contact, Service,
    TeamMember, Testimonial, Test, TaskSubmission
)
from .serializers import (
    CourseSerializer, InstructorSerializer, EnrollmentSerializer,
    ProjectSerializer, TaskSerializer, ResourceSerializer, NewsSerializer,
    ContactSerializer, ServiceSerializer, TeamMemberSerializer,
    TestimonialSerializer, TestSerializer, TaskSubmissionSerializer
)

class TaskSubmissionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for task submissions
    """
    queryset = TaskSubmission.objects.all()
    serializer_class = TaskSubmissionSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['get', 'post', 'head', 'options']
    
    def get_queryset(self):
        queryset = TaskSubmission.objects.all()
        task_id = self.request.query_params.get('task')
        email = self.request.query_params.get('email')
        
        if task_id:
            queryset = queryset.filter(task_id=task_id)
            
        if email:
            queryset = queryset.filter(email=email)
            
        return queryset
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for courses
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = Course.objects.all()
        difficulty = self.request.query_params.get('difficulty')
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)
        return queryset

class InstructorViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for instructors
    """
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer
    permission_classes = [permissions.AllowAny]

class EnrollmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for enrollments
    """
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['post', 'head', 'options']
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for projects
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = Project.objects.all()
        difficulty = self.request.query_params.get('difficulty', None)
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)
        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['include_materials'] = True
        context['include_steps'] = True
        return context

class TaskViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for tasks
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = Task.objects.all()
        difficulty = self.request.query_params.get('difficulty')
        course_id = self.request.query_params.get('course')
        status_param = self.request.query_params.get('status')
        
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)
        
        if course_id:
            queryset = queryset.filter(related_course_id=course_id)
            
        if status_param:
            queryset = queryset.filter(status=status_param)
            
        return queryset

class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for resources
    """
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = Resource.objects.all()
        category = self.request.query_params.get('category')
        
        if category:
            queryset = queryset.filter(category=category)
            
        return queryset

class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for news
    """
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [permissions.AllowAny]

class ContactViewSet(viewsets.ModelViewSet):
    """
    API endpoint for contacts
    """
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['post', 'head', 'options']
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for services
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]

class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for team members
    """
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.AllowAny]

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for testimonials
    """
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.AllowAny]

class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    permission_classes = [permissions.AllowAny]

@api_view(['GET'])
def health_check(request):
    """
    Simple health check endpoint to verify API connectivity
    """
    return Response({"status": "ok"})

