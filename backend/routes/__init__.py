from flask import Blueprint

main_bp = Blueprint("main", __name__)

# Import all routes BEFORE registering the blueprint to the app
from . import volunteer
from . import home
from . import faq