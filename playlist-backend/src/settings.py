import os

DB_PORT = os.environ.get('DB_PORT')
DB_HOST = os.environ.get('DB_HOST')
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
CORS_DOMAIN_WHITE_LIST = ["http://localhost:3000"]

# from localsettings import *