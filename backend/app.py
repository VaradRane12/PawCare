from flask import Flask
from config import Config
from extensions import db, migrate  # ✅ import from extensions
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    from routes import main_bp
    app.register_blueprint(main_bp)

    from chat_routes import chat_bp  # ✅ NEW
    app.register_blueprint(chat_bp)  # ✅ NEW

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
