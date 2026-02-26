from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from .models import User, NewsFeed, Mosque, Skill, VolunteerPosting, VolunteerApplication, ZakatContributionHead, ZakatLedgerEntry
from .serializers import (
    UserSerializer, NewsFeedSerializer, MosqueSerializer, SkillSerializer,
    VolunteerPostingSerializer, VolunteerApplicationSerializer,
    ZakatContributionHeadSerializer, ZakatLedgerEntrySerializer
)

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data=request.data,
                                             context={'request': request})
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'])
    def me(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def request_verification(self, request):
        try:
            user = request.user
            # Simulate basic doc check or update some field
            user.is_verified = False # ensure it requires manual admin review
            user.save()
            return Response({"status": "Verification request received. Admin will audit your documents shortly."}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': f'Failed to process verification request: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class NewsFeedViewSet(viewsets.ModelViewSet):
    queryset = NewsFeed.objects.all().order_by('-timestamp')
    serializer_class = NewsFeedSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(poster=self.request.user)
        except Exception as e:
            raise serializers.ValidationError({'error': f'Poster assignment failed: {str(e)}'})

    @action(detail=False, methods=['get'])
    def mosque_notices(self, request):
        try:
            notices = self.queryset.filter(is_mosque_notice=True)
            serializer = self.get_serializer(notices, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': f'Could not fetch notices: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
        try:
            query = request.query_params.get('q', '')
            skills = self.queryset.filter(name__icontains=query)
            serializer = self.get_serializer(skills, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': f'Skill search failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VolunteerPostingViewSet(viewsets.ModelViewSet):
    queryset = VolunteerPosting.objects.all().order_by('-created_at')
    serializer_class = VolunteerPostingSerializer

class VolunteerApplicationViewSet(viewsets.ModelViewSet):
    queryset = VolunteerApplication.objects.all()
    serializer_class = VolunteerApplicationSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except Exception as e:
            raise serializers.ValidationError({'error': 'Failed to submit application.'})

class ZakatContributionHeadViewSet(viewsets.ModelViewSet):
    queryset = ZakatContributionHead.objects.all()
    serializer_class = ZakatContributionHeadSerializer

class ZakatLedgerEntryViewSet(viewsets.ModelViewSet):
    queryset = ZakatLedgerEntry.objects.all().order_by('-date')
    serializer_class = ZakatLedgerEntrySerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
