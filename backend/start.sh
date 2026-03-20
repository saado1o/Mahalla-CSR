#!/usr/bin/env bash
set -e

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py makemigrations core
python manage.py migrate

# Start the Daphne server on the Render-provided $PORT
exec daphne -b 0.0.0.0 -p ${PORT:-8000} server.asgi:application
