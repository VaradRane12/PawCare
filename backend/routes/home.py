

from flask import jsonify
from . import main_bp

@main_bp.route("/home-data")
def home_data():

    from models import AdoptableAnimal  # ✅ lazy import inside the route
    animal = AdoptableAnimal.query.first()

    if not animal:
        return jsonify({"error": "No animals found"}), 404
    print(animal.image_url)
    return jsonify({
        "banner_image": animal.image_url,
        "amount_donated": animal.amount_donated,
        "total_amount": animal.total_amount
    })


