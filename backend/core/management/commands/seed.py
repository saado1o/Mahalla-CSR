import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from core.models import Mahalla, Mosque, ZakatContributionHead, ZakatLedgerEntry, VolunteerPosting, VolunteerApplication

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with initial Mahalla data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database...')

        # Create Admin
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@mahalla.com', 'adminpass', is_verified=True)
            self.stdout.write('Created superuser: admin')

        # Create standard user
        if not User.objects.filter(username='citizen1').exists():
            User.objects.create_user('citizen1', 'citizen@mahalla.com', 'citizenpass', is_verified=True)
            self.stdout.write('Created user: citizen1')

        admin = User.objects.get(username='admin')
        citizen = User.objects.get(username='citizen1')

        # Mahalla & Mosque
        if not Mosque.objects.exists():
            mosque = Mosque.objects.create(name='Central Jamia Mosque', location='Block 4', imam=admin)
            Mahalla.objects.create(name='Sector G Mahalla', boundary='POLYGON((...))', assigned_mosque=mosque)
            self.stdout.write('Created Mosque & Mahalla')

        # Zakat Heads
        if not ZakatContributionHead.objects.exists():
            h1 = ZakatContributionHead.objects.create(name='General Welfare Fund')
            h2 = ZakatContributionHead.objects.create(name='Widows & Orphans Support')
            h3 = ZakatContributionHead.objects.create(name='Mosque Maintenance')
            h4 = ZakatContributionHead.objects.create(name='Ration Distribution Drive')
            
            # Add some ledger entries
            ZakatLedgerEntry.objects.create(user=citizen, head=h1, amount=5000)
            ZakatLedgerEntry.objects.create(user=admin, head=h2, amount=15000)
            self.stdout.write('Created Zakat Heads and Ledger Entries')

        # Volunteer Postings
        if not VolunteerPosting.objects.exists():
            vp = VolunteerPosting.objects.create(
                title='Ramadan Iftar Setup',
                description='Need volunteers to help array dastarkhwan for Iftar at Central Jamia Mosque.',
                roles='Food Server, Cleanup Crew, Usher',
                created_by=admin
            )
            
            # Apply standard user to it
            VolunteerApplication.objects.create(
                posting=vp,
                user=citizen,
                role='Food Server',
                experience='Served last year at the community center',
                status='Pending'
            )
            self.stdout.write('Created Volunteer Posting & Application')

        self.stdout.write(self.style.SUCCESS('Database seeding completed!'))
