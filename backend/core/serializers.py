from rest_framework import serializers
from .models import User, Mahalla, Mosque, NewsFeed, Alert, Skill

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_verified', 'location', 'privacy_mode', 'is_staff']
        read_only_fields = ['is_verified', 'is_staff']

class NewsFeedSerializer(serializers.ModelSerializer):
    poster_name = serializers.ReadOnlyField(source='poster.get_full_name')
    poster_username = serializers.ReadOnlyField(source='poster.username')

    class Meta:
        model = NewsFeed
        fields = ['id', 'title', 'content', 'poster', 'poster_name', 'poster_username', 'timestamp', 'is_mosque_notice']
        read_only_fields = ['poster', 'timestamp']

class MosqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mosque
        fields = ['id', 'name', 'location', 'imam']

class VerificationRequestSerializer(serializers.Serializer):
    document_type = serializers.CharField()
    document_image = serializers.ImageField()
    # In a real app, we'd handle file uploads and save to a separate VerificationRequest model.
    # For now, we'll keep it simple for the MVP.

class SkillSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Skill
        fields = ['id', 'user', 'username', 'name', 'is_barter_enabled']
        read_only_fields = ['user']
