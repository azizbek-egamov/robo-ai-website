from rest_framework import serializers
from .models import (
    Course, Instructor, CourseSyllabus, SyllabusTopic, 
    Enrollment, Project, ProjectMaterial, ProjectStep,
    Task, TaskRequirement, TaskHint, Resource, News,
    Contact, Service, TeamMember, Testimonial, Test, TaskSubmission
)

class TaskSubmissionSerializer(serializers.ModelSerializer):
    task_title = serializers.SerializerMethodField()
    
    class Meta:
        model = TaskSubmission
        fields = [
            'id', 'task', 'task_title', 'user_name', 'email',
            'code', 'comments', 'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['status']
    
    def get_task_title(self, obj):
        return obj.task.title

class SyllabusTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = SyllabusTopic
        fields = ['id', 'topic']

class CourseSyllabusSerializer(serializers.ModelSerializer):
    topics = SyllabusTopicSerializer(many=True, read_only=True)
    
    class Meta:
        model = CourseSyllabus
        fields = ['id', 'week', 'title', 'topics']

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['id', 'name', 'title', 'bio', 'photo']

class CourseSerializer(serializers.ModelSerializer):
    instructors = InstructorSerializer(many=True, read_only=True)
    syllabus_items = CourseSyllabusSerializer(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = [
            'id', 'title', 'description', 'detailed_description',
            'image', 'difficulty', 'duration', 'schedule',
            'start_date', 'max_students', 'price',
            'instructors', 'syllabus_items',
            'created_at', 'updated_at'
        ]

class EnrollmentSerializer(serializers.ModelSerializer):
    course_title = serializers.SerializerMethodField()
    
    class Meta:
        model = Enrollment
        fields = [
            'id', 'first_name', 'last_name', 'phone',
            'course', 'course_title', 'comments', 'status',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['status']
    
    def get_course_title(self, obj):
        return obj.course.title

class ProjectMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMaterial
        fields = ['id', 'title', 'description', 'quantity', 'unit', 'created_at', 'updated_at']

class ProjectStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectStep
        fields = ['id', 'step_number', 'title', 'description', 'image', 'created_at', 'updated_at']

class ProjectSerializer(serializers.ModelSerializer):
    materials = ProjectMaterialSerializer(many=True, read_only=True)
    steps = ProjectStepSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'image', 'difficulty', 'sample_code', 'materials', 'steps', 'created_at', 'updated_at']

class TaskRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = TaskRequirement
        fields = ['id', 'requirement']

class TaskHintSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskHint
        fields = ['id', 'hint']

class TaskSerializer(serializers.ModelSerializer):
    requirements = TaskRequirementSerializer(many=True, read_only=True)
    hints = TaskHintSerializer(many=True, read_only=True)
    related_course_title = serializers.SerializerMethodField()
    
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'detailed_description',
            'points', 'estimated_time', 'difficulty',
            'related_course', 'related_course_title', 'status',
            'sample_code', 'requirements', 'hints',
            'created_at', 'updated_at'
        ]
    
    def get_related_course_title(self, obj):
        return obj.related_course.title

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = [
            'id', 'title', 'description', 'content',
            'image', 'category', 'file', 'external_link',
            'is_external', 'is_downloadable',
            'created_at', 'updated_at'
        ]

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = [
            'id', 'title', 'content', 'image',
            'created_at', 'updated_at'
        ]

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = [
            'id', 'name', 'email', 'phone',
            'message', 'created_at'
        ]

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id', 'title', 'description', 'icon',
            'created_at', 'updated_at'
        ]

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = [
            'id', 'name', 'position', 'bio',
            'image', 'created_at', 'updated_at'
        ]

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id', 'name', 'position', 'content',
            'image', 'created_at', 'updated_at'
        ]

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ['id', 'name', 'image', 'description', 'google_form_link', 'created_at', 'updated_at']

