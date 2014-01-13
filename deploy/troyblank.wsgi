import os
import sys

# put the Django project and virtual env on sys.path
sys.path.append("/home/troy/webapps/")
sys.path.append("/home/troy/webapps/troyblank_com/")
sys.path.append("/home/troy/.virtualenvs/troyblank_com/lib/python2.7/site-packages")

os.environ["DJANGO_SETTINGS_MODULE"] = "troyblank_com.settings_prod"

from django.core.handlers.wsgi import WSGIHandler
application = WSGIHandler()
