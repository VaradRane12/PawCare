from flask import Blueprint, jsonify, request
from backend.models import db, Volunteer

volunteer_bp = Blueprint("volunteers", __name__)

@volunteer_bp.route("/", methods=["GET"])
def get_volunteers():
    volunteers = Volunteer.query.all()
    return jsonify([{"id": v.id, "name": v.name, "email": v.email} for v in volunteers])

@volunteer_bp.route("/add", methods=["POST"])
def add_volunteer():
    data = request.json
    new_volunteer = Volunteer(name=data["name"], email=data["email"])
    db.session.add(new_volunteer)
    db.session.commit()
    return jsonify({"message": "Volunteer added"}), 201
