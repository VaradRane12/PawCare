from flask import jsonify
from . import main_bp
from models import Volunteer

@main_bp.route("/volunteers")
def get_volunteers():
    sample_data = [
        {"id": 1, "name": "John Doe", "email": "john@example.com", "location": "Pune"},
        {"id": 2, "name": "Jane Smith", "email": "jane@example.com", "location": "Mumbai"},
        {"id": 3, "name": "Alice Johnson", "email": "alice@example.com", "location": "Delhi"}
    ]
    return jsonify(sample_data)
