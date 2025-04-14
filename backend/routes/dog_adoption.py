

from flask import jsonify
from . import main_bp

@main_bp.route("/dog_adopt",methods = ["GET"])
def adopt_dog():

    from models import AdoptableAnimal  # ✅ lazy import inside the route
    animal = AdoptableAnimal.query.all()

    if not animal:
        return jsonify({"error": "No animals found"}), 404
    print(animal.image_url)
    return jsonify({
animal
    })


