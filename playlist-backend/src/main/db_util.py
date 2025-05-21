from pymongo import MongoClient

import settings


class DBUtil:
    """
    Handles all database interactions
    """

    db_host = settings.DB_HOST
    db_user = settings.DB_USER
    db_password = settings.DB_PASSWORD
    db_port = settings.DB_PORT
    db_auth_mech = "SCRAM-SHA-1"

    def __init__(self, db_name="playlist"):
        self.client = MongoClient(
            self.db_host,
            port=self.db_port,
            username=self.db_user,
            password=self.db_password,
            authMechanism=self.db_auth_mech,
        )
        self.db_client = self.client[db_name]

    def get_collection(self, collection_name):
        """
        Returns the collection object for the specified collection name.
        """
        return self.db_client[collection_name]

    def get_db(self):
        """
        Returns a database client
        """
        return self.db_client
