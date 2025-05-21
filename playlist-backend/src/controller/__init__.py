from flask import Flask
from flask_restx import Api

def create_app():
    app = Flask(__name__)

    # Initialize Flask-RESTx API
    api = Api(
        app,
        version="1.0",
        title="Playlist API",
        description="API 1 for normalizing playlists and exporting them to CSV, Create new records in playlist",
    )

    # Import and add namespaces
    from main.routes import api as main_namespace
    api.add_namespace(main_namespace, path="/")

    return app