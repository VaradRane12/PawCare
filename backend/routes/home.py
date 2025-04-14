

from flask import jsonify
from . import main_bp

@main_bp.route("/home-data")
def home_data():

    from models import AdoptableAnimal 
    animal = AdoptableAnimal.query.first()

    if not animal:
        return jsonify({"error": "No animals found"}), 404
    print(animal.image_url)
    return jsonify({
        "id": animal.id,
        "banner_image": animal.image_url,
        "amount_donated": animal.amount_donated,
        "total_amount": animal.total_amount
    })

@main_bp.route("/least-donated-animal")
def least_donated_animal():
    from models import AdoptableAnimal
    
    animal = AdoptableAnimal.query.order_by(AdoptableAnimal.amount_donated.asc()).first()

    if not animal:
        return jsonify({"error": "No animals found"}), 404

    return jsonify({
        "id": animal.id,
        "banner_image": animal.image_url,
        "amount_donated": animal.amount_donated,
        "total_amount": animal.total_amount
    })

