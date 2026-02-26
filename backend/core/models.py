from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_verified = models.BooleanField(default=False)
    # Replaced PointField for local without PostGIS
    location = models.CharField(max_length=255, null=True, blank=True)
    privacy_mode = models.BooleanField(default=False) # Purdah mode

class Mahalla(models.Model):
    name = models.CharField(max_length=100)
    # Replaced PolygonField for local without PostGIS
    boundary = models.TextField(help_text="WKT format or JSON")
    assigned_mosque = models.ForeignKey('Mosque', on_delete=models.SET_NULL, null=True)

class Mosque(models.Model):
    name = models.CharField(max_length=150)
    location = models.CharField(max_length=255)
    imam = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='mosques_led')

class Skill(models.Model):
    name = models.CharField(max_length=50) # e.g., "Electrician", "Tutor"
    user = models.ForeignKey(User, related_name='skills', on_delete=models.CASCADE)
    is_barter_enabled = models.BooleanField(default=True)

class Alert(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    responders = models.ManyToManyField(User, related_name='responded_alerts')

class NewsFeed(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_mosque_notice = models.BooleanField(default=False)

class VolunteerPosting(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    roles = models.CharField(max_length=255, help_text="Comma separated roles")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
class VolunteerApplication(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected')
    ]
    posting = models.ForeignKey(VolunteerPosting, related_name="applications", on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name="volunteer_applications", on_delete=models.CASCADE)
    role = models.CharField(max_length=100)
    experience = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    applied_at = models.DateTimeField(auto_now_add=True)

class ZakatContributionHead(models.Model):
    name = models.CharField(max_length=150)
    created_at = models.DateTimeField(auto_now_add=True)
    
class ZakatLedgerEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    head = models.ForeignKey(ZakatContributionHead, related_name="entries", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

