# MahallaHub (Mahalla App)

**MahallaHub** is an open-source Corporate Social Responsibility (CSR) initiative brought to you by **SBF-Consultancy** under the **BERP** umbrella. Building upon the success of our previously introduced *Rizq* app, MahallaHub focuses on community enablement, connection, and the betterment of the Ummah and the Pakistani nation.

## 🌟 Vision
To cultivate thriving, localized ecosystems where communities can connect, collaborate, and grow together, ensuring no individual is left behind. We envision a society deeply rooted in empathy, equity, and mutual support.

## 🎯 Mission
MahallaHub's mission is to provide an accessible, robust, and scalable platform that bridges gaps within local neighborhoods ("Mahallas"). By empowering communities with powerful digital tools, we aim to streamline resource sharing, foster local engagement, and drive meaningful grassroots change.

## 🤝 Purpose & Open Source
As a CSR project by **SBF-Consultancy**, the core purpose of MahallaHub is societal betterment. We strongly believe that technology should serve humanity. By making this project entirely open-source, we invite vast communities, developers, and organizations worldwide to benefit from, adapt, and contribute to this application. Together, we can build a more connected and supportive world.

## ✨ Key Features
- **Community & Location Based:** Built-in geospatial capabilities (PostGIS) to connect users within their local *Mahallas*.
- **Real-Time Communication:** Instant connectivity, live notifications, and interactive features powered by WebSockets.
- **Secure Authentication:** Comprehensive user management including secure login, registration, and session management.
- **Responsive & Modern UI:** A sleek, user-friendly interface optimized for all devices, designed for maximum accessibility and visual excellence.
- **Scalable Architecture:** Dockerized and ready for cloud deployment (e.g., Vercel, Render) with robust background task handling using Celery and Redis.

## 🛠️ Technical Stack

**Frontend:**
- **Framework:** Next.js (React)
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

**Backend:**
- **Framework:** Django & Django REST Framework
- **Real-Time:** Django Channels & Daphne
- **Database:** PostgreSQL with PostGIS (Geospatial data)
- **Task Queue & Caching:** Celery & Redis
- **Authentication:** Django Allauth & REST Auth

**Infrastructure & Deployment:**
- **Containerization:** Docker & Docker Compose
- **Production Hosting Strategy:** Vercel (Frontend) & Render (Backend)

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) and Docker Compose installed.
- Alternatively, Node.js (for frontend) and Python 3.10+ (for backend) if running locally without Docker.

### Running with Docker (Recommended)
You can spin up the entire application stack including the database, cache, backend, and frontend with a single command:

```bash
docker-compose up --build
```
- **Frontend** will be accessible at: `http://localhost:3000`
- **Backend API** will be accessible at: `http://localhost:8000`

### Running Locally (Without Docker)
**1. Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**2. Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🤝 Contributing
We welcome contributions from the community! Since this is an open-source initiative aimed at empowering people, your input—whether it's code, design, or documentation—is highly valued. Feel free to fork the repository, open issues, and submit pull requests.

## 📄 License
This project is open-source.

---
*A Corporate Social Responsibility project by SBF-Consultancy.*
