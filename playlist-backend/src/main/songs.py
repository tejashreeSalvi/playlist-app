from .service_base import ServiceBase
from flask import jsonify

class Songs(ServiceBase):

    def get_all_songs(self):
        """
        Retrieve all songs from the database.

        Returns:
            list: A list of all songs.
        """
        try:
            songs = self.collection.find()
            if songs:
                self.logger.info(f"Retrieved songs from the database.: {songs}")
                return {"items": list(songs)}, 200
            else:
                self.logger.info("No songs found in the database.")
                return {"items": []}, 200

        except Exception as e:
            self.logger.error(f"Error retrieving songs: {e}")
            return {"error": "An error occurred while retrieving songs."}, 503
        
    def get_song_by_title(self, song_title):
        """
        Retrieve a song by its title.

        Args:
            song_title (str): The title of the song to retrieve.

        Returns:
            dict: The song details if found, otherwise an error message.
        """
        try:
            song = self.collection.find_one({"title": song_title})
            if song:
                return {"item": song}, 200
            else:
                return {"error": "Song not found."}, 404

        except Exception as e:
            self.logger.error(f"Error retrieving song: {e}")
            return {"error": "An error occurred while retrieving the song."}
        
    
    def bulk_songs_addition(self, data):
        """
        Add a new song to the database.
        Args:
            data (list of object): The song data to add.
        Returns:
            dict: A message indicating success or failure.
        """
        try:
            
            # Insert the new song into the database
            self.logger.info(f"Adding songs to the database")
            if isinstance(data, list):
                result = self.collection.insert_many(data)
            
            if result.inserted_ids:
                self.logger.info(f"Inserted {len(result.inserted_ids)} songs into the database.")
                return {"message": f"{len(result.inserted_ids)} songs created successfully."}, 201
            else:
                return {"error": "Failed to create song."}, 500
            
        except Exception as e:
            self.logger.error(f"Error creating song: {e}")
            return {"error": "An error occurred while creating the song."}, 500
        
        
    def add_song(self, data):
        """
        Add a new song to the database.
        Args:
            data (dict): The song data to add.
        Returns:
            dict: A message indicating success or failure.
        """
        try:
            # Check if the song already exists
            existing_song = self.collection.find_one({"title": data["title"]})
            
            if existing_song:
                self.logger.info(f"Song already exists: {data['title']}")
                return {"error": "Song already exists."}, 409

            # Insert the new song into the database
            result = self.collection.insert_one(data)
            
            if result.inserted_id:
                return {"message": "Song created successfully."}, 201
            else:
                return {"error": "Failed to create song."}, 500
            
        except Exception as e:
            self.logger.error(f"Error creating song: {e}")
            return {"error": "An error occurred while creating the song."}, 500
        
    def rate_song(self, song_title, rating):
        """
        Rate a song by its title.

        Args:
            song_title (str): The title of the song to rate.
            rating (int): The rating to assign to the song.

        Returns:
            dict: A message indicating success or failure.
        """
        try:
            # Update the song's rating in the database
            result = self.collection.update_one(
                {"title": song_title},
                {"$set": {"rating": rating}}
            )
            
            if result.modified_count > 0:
                self.logger.info(f"Rated song successfully: {song_title} with rating {rating}")
                return {"message": "Song rated successfully."}, 200
            else:
                self.logger.error(f"Song not found or rating unchanged: {song_title}")
                return {"error": "Failed to rate song."}, 500
            
        except Exception as e:
            self.logger.error(f"Error rating song: {e}")
            return {"error": "An error occurred while rating the song."}, 500
        
    def normalize_data(self, playlist_data):
        """
        Normalize data by combining IDs and titles with placeholder values for other attributes.

        Args:
            ids (dict): A dictionary mapping keys to IDs.
            titles (dict): A dictionary mapping keys to titles.

        Returns:
            list: A list of dictionaries containing normalized data.
        """

        # Extract all keys
        keys = list(playlist_data.keys())

        # Find the number of records (assuming the keys' values have the same length)
        record_count = len(playlist_data[keys[0]])

        # Create an array of objects
        records = []
        for i in range(record_count):
            record = {}
            for key in keys:
                # For each record, map its attributes from keys
                if key == 'id':
                    record['_id'] = playlist_data[key][
                        str(i)
                    ]
                else:
                    record[key] = playlist_data[key][
                        str(i)
                    ]  # Access by index using string keys
            records.append(record)

        # Save the transformed data as an array of objects
        self.bulk_songs_addition(records)

        return {
            "message": "Data normalized successfully.",
            "items": records,
        }, 200

    