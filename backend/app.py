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
    import nltk
    nltk.download('punkt_tab')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
