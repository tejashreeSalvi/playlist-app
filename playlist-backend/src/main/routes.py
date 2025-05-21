from flask import request, jsonify, send_file
from .songs import Songs
from flask_restx import Namespace, Resource, fields
from . import main  # Import the "main" instance from the Flask application
import json
# Define the API namespace
api = Namespace('playlist', description='Playlist normalization operations')

# Define the model for the request body

@api.route('normalize')
class Normalize(Resource):
    @api.doc(
        description="Normalize playlist data and optionally paginate results.",
        params={
            'page': 'Page number for pagination (default: 1)',
            'per_page': 'Number of items per page (default: 10)'
        }
    )
    def get(self):
        
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))
        
        # Load and normalize the JSON data
        with open('resources/playlist.json', 'r') as file:
            playlist_data = json.load(file)
            
            return Songs().normalize_data(playlist_data)
        
# api for get entire playlist 
@api.route('songs')
class SongsResource(Resource):
    @api.doc(
        description="Get all songs from the database.",
        responses={
            200: 'Success',
            503: 'Service Unavailable'
        }
    )
    def get(self):
        """
        Retrieve all songs from the database.
        """
        return Songs().get_all_songs()
    
    
# api for get song by title
@api.route('songs/<string:title>')
class SongResource(Resource):
    @api.doc(
        description="Get a song by its title.",
        params={'title': 'Title of the song to retrieve'},
        responses={
            200: 'Success',
            404: 'Song not found'
        }
    )
    def get(self, title):
        """
        Retrieve a song by its title.
        """
        return Songs().get_song_by_title(title)
        
    # api for rate the song
    # user can give rating to songs put call to existing song.
    @api.doc(
        description="Rate a song by its title.",
        params={
            'rating': 'Rating value (1-5)'
        },
        responses={
            200: 'Success',
            404: 'Song not found'
        }
    )
    def put(self, title):
        """
        Rate a song by its title.
        """
        # Get the rating from the request body
        rating = int(request.args.get('rating', 1))
        
        # Update the song rating
        return Songs().rate_song(title, rating)
