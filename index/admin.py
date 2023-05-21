from django.contrib import admin
from .models import Question


@admin.action(description='make active')
def make_active(modeladmin, request, queryset):
    queryset.update(active=True)


@admin.action(description='make unactive')
def make_unactive(modeladmin, request, queryset):
    queryset.update(active=False)


@admin.register(Question)
class Question(admin.ModelAdmin):
    list_display = ("title", "author")
    search_fields = ("title", "answer")
    actions = [make_active, make_unactive]


admin.site.site_header = "admin"
