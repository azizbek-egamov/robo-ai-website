from django.contrib import admin
from .models import (
    Course, Instructor, CourseSyllabus, SyllabusTopic, 
    Enrollment, Project, ProjectMaterial, ProjectStep,
    Task, TaskRequirement, TaskHint, Resource, News,
    Contact, Service, TeamMember, Testimonial, Test, TaskSubmission
)

from django.contrib.admin import ModelAdmin, TabularInline

class SyllabusTopicInline(TabularInline):
    model = SyllabusTopic
    extra = 3

class CourseSyllabusInline(TabularInline):
    model = CourseSyllabus
    extra = 4
    show_change_link = True

class InstructorInline(TabularInline):
    model = Instructor.courses.through
    extra = 1

@admin.register(Course)
class CourseAdmin(ModelAdmin):
    list_display = ('title', 'difficulty', 'max_students', 'created_at')
    list_filter = ('difficulty', 'created_at')
    search_fields = ('title', 'description')
    inlines = [CourseSyllabusInline, InstructorInline]
    fieldsets = (
        (None, {
            'fields': ('difficulty', 'max_students', 'image')
        }),
        ('Asosiy ma\'lumotlar', {
            'fields': ('title', 'description', 'detailed_description', 
                      'duration', 'schedule', 'start_date', 'price')
        }),
    )

@admin.register(CourseSyllabus)
class CourseSyllabusAdmin(ModelAdmin):
    list_display = ('course', 'week', 'title')
    list_filter = ('course',)
    search_fields = ('title',)
    inlines = [SyllabusTopicInline]

@admin.register(Instructor)
class InstructorAdmin(ModelAdmin):
    list_display = ('name', 'title')
    search_fields = ('name', 'title')
    filter_horizontal = ('courses',)
    exclude = ('courses',)

class ProjectMaterialInline(TabularInline):
    model = ProjectMaterial
    extra = 3
    fields = ['title', 'description', 'quantity', 'unit']

class ProjectStepInline(TabularInline):
    model = ProjectStep
    extra = 3
    fields = ['step_number', 'title', 'description', 'image']

@admin.register(Project)
class ProjectAdmin(ModelAdmin):
    list_display = ('title', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('title', 'description')
    inlines = [ProjectMaterialInline, ProjectStepInline]
    fieldsets = (
        (None, {
            'fields': ('image',)
        }),
        ('Asosiy ma\'lumotlar', {
            'fields': ('title', 'description', 'sample_code')
        }),
    )

class TaskRequirementInline(TabularInline):
    model = TaskRequirement
    extra = 3

class TaskHintInline(TabularInline):
    model = TaskHint
    extra = 2

@admin.register(Task)
class TaskAdmin(ModelAdmin):
    list_display = ('title', 'difficulty', 'points', 'related_course', 'status')
    list_filter = ('difficulty', 'status', 'related_course')
    search_fields = ('title', 'description')
    inlines = [TaskRequirementInline, TaskHintInline]
    fieldsets = (
        (None, {
            'fields': ('difficulty', 'points', 'related_course', 'status', 'sample_code')
        }),
        ('Asosiy ma\'lumotlar', {
            'fields': ('title', 'description', 'detailed_description', 'estimated_time')
        }),
    )

@admin.register(Resource)
class ResourceAdmin(ModelAdmin):
    list_display = ('title', 'category', 'is_external', 'is_downloadable')
    list_filter = ('category', 'is_external', 'is_downloadable', 'created_at')
    search_fields = ('title', 'description')
    fieldsets = (
        (None, {
            'fields': ('category', 'image', 'file', 'external_link', 'is_external', 'is_downloadable')
        }),
        ('Asosiy ma\'lumotlar', {
            'fields': ('title', 'description', 'content')
        }),
    )

@admin.register(News)
class NewsAdmin(ModelAdmin):
    list_display = ('title', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('title', 'content')
    fieldsets = (
        (None, {
            'fields': ('image',)
        }),
        ('Asosiy ma\'lumotlar', {
            'fields': ('title', 'content')
        }),
    )

@admin.register(Enrollment)
class EnrollmentAdmin(ModelAdmin):
    list_display = ('first_name', 'last_name', 'phone', 'course', 'status', 'created_at')
    list_filter = ('status', 'course', 'created_at')
    search_fields = ('first_name', 'last_name', 'phone')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('first_name', 'last_name', 'phone', 'course', 'comments', 'status')
        }),
        ('Vaqt belgilari', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Contact)
class ContactAdmin(ModelAdmin):
    list_display = ('name', 'email', 'phone', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'phone')
    readonly_fields = ('created_at',)
    fieldsets = (
        (None, {
            'fields': ('name', 'email', 'phone', 'message')
        }),
        ('Vaqt belgilari', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

@admin.register(Service)
class ServiceAdmin(ModelAdmin):
    list_display = ('title', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('title', 'description')
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'icon')
        }),
    )

@admin.register(TeamMember)
class TeamMemberAdmin(ModelAdmin):
    list_display = ('name', 'position', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'position')
    fieldsets = (
        (None, {
            'fields': ('name', 'position', 'bio', 'image')
        }),
    )

@admin.register(Testimonial)
class TestimonialAdmin(ModelAdmin):
    list_display = ('name', 'position', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'position')
    fieldsets = (
        (None, {
            'fields': ('name', 'position', 'content', 'image')
        }),
    )

@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name', 'description')

# Register remaining models
admin.site.register(SyllabusTopic)
admin.site.register(ProjectMaterial)
admin.site.register(ProjectStep)
admin.site.register(TaskRequirement)
admin.site.register(TaskHint)


@admin.register(TaskSubmission)
class TaskSubmissionAdmin(ModelAdmin):
    list_display = ('user_name', 'email', 'task', 'status', 'created_at')
    list_filter = ('status', 'task', 'created_at')
    search_fields = ('user_name', 'email', 'code', 'comments')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('task', 'user_name', 'email', 'status')
        }),
        ('Yechim', {
            'fields': ('code', 'comments')
        }),
        ('Vaqt belgilari', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )