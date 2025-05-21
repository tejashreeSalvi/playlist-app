from flask import Flask
from flask_restx import Api
from flask_cors import CORS
import re
from settings import CORS_DOMAIN_WHITE_LIST

def create_app():
    
    app = Flask(__name__)
    # Enable CORS for all routes
    
    CORS(app, resources={r"/*": {"origins": CORS_DOMAIN_WHITE_LIST}})
    app.url_map.strict_slashes = False
    
    # Initialize Flask-RESTx API
    api = Api(
        app,
        version="1.0",
        title="Playlist API",
        description="API 1 for normalizing playlists and exporting them to CSV, Create new records in playlist",
    )

    # Import and add namespaces
    from main.routes import api as main_namespace
    api.add_namespace(main_namespace)

    return app