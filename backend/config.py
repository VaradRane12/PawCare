import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://username:password@localhost/dbname")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
