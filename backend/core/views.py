from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .models import User, NewsFeed, Mosque, Skill
from .serializers import UserSerializer, NewsFeedSerializer, MosqueSerializer, SkillSerializer

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def request_verification(self, request):
        # UC-01: Resident Verification Logic
        # For simulation: the user sends a dummy document and the admin verifies.
        # Here we'll just mark the user as 'verification_pending' if we had that field.
        # For now, let's say the admin manually sets is_verified.
        user = request.user
        # We assume some document processing happens here
        return Response({"status": "Verification request received. Admin will audit your documents shortly."}, status=status.HTTP_201_CREATED)

class NewsFeedViewSet(viewsets.ModelViewSet):
    queryset = NewsFeed.objects.all().order_by('-timestamp')
    serializer_class = NewsFeedSerializer

    def perform_create(self, serializer):
        serializer.save(poster=self.request.user)

    @action(detail=False, methods=['get'])
    def mosque_notices(self, request):
        # UC-03: Mosque Notice Board Filter
        notices = self.queryset.filter(is_mosque_notice=True)
        serializer = self.get_serializer(notices, many=True)
        return Response(serializer.data)

class MosqueViewSet(viewsets.ModelViewSet):
    queryset = Mosque.objects.all()
    serializer_class = MosqueSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.filter(is_barter_enabled=True)
    serializer_class = SkillSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def search_skills(self, request):
        query = request.query_params.get('q', '')
        # UC-04: Match exact or partial skills in the neighborhood
        skills = self.queryset.filter(name__icontains=query)
        serializer = self.get_serializer(skills, many=True)
        return Response(serializer.data)
