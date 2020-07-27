from django.db import models

# Create your models here.
class Icon(models.Model):
    icon_name = models.CharField(max_length=30, help_text="請輸入icon名稱")
    icon_file = models.FileField()

    class Meta:
        ordering = ['icon_name']


    def __str__(self):
        return self.icon_name