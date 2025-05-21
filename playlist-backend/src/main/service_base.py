""" Service base class for the playlist backend """

import abc
import logging

from .db_util import DBUtil
from .utils import snake_case

class ServiceBase(abc.ABC):
    
    def __init__(self):
        self.class_name = type(self).__name__
        self.logger = logging.getLogger(self.class_name)
        logging.basicConfig(level=logging.INFO)
        self.collection_name = snake_case(self.class_name)
        self.table_name = snake_case(self.class_name)
        self.collection = DBUtil().get_collection(self.collection_name)