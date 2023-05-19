from django.contrib import admin
# from .models import


@admin.action(description='make active')
def make_active(modeladmin, request, queryset):
    queryset.update(active=True)


@admin.action(description='make unactive')
def make_unactive(modeladmin, request, queryset):
    queryset.update(active=False)


# @admin.register(Subject)
# class Subject(admin.ModelAdmin):
#     list_display = ("title", "author")
#     search_fields = ("title", "description")
#     actions = [make_active, make_unactive]


admin.site.site_header = "admin"
