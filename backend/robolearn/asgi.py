"""
ASGI config for robolearn project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'robolearn.settings')

application = get_asgi_application()

