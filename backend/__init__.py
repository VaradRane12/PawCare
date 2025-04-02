from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for frontend requests
    app.config.from_object("config.Config")

    db.init_app(app)

    from backend.routes.volunteer import volunteer_bp
    app.register_blueprint(volunteer_bp, url_prefix="/api/volunteers")

    return app
