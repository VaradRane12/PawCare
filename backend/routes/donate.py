from flask import jsonify, request
from . import main_bp
from app import db
from models import AdoptableAnimal

@main_bp.route("/donate", methods=["POST", "GET"])
def donate():
    if request.method == "POST":

        data = request.get_json()
        print("Received donation data:", data)

        try:
            animal_id = data.get("id")
            donation_amount = int(data.get("amount"))

            # Fetch the animal from the database
            animal = AdoptableAnimal.query.get(animal_id)

            if not animal:
                return jsonify({"error": "Animal not found"}), 404

            # Update the amount_donated
            animal.amount_donated += donation_amount
            db.session.commit()

            return jsonify({
                "message": "Donation received",
                "new_amount_donated": animal.amount_donated
            }), 200

        except Exception as e:
            print("Error processing donation:", e)
            return jsonify({"error": "Failed to process donation"}), 500

    # For GET method — return list of animals
    animals = AdoptableAnimal.query.all()
    data = []

    for animal in animals:
        data.append({
            "id": animal.id,
            "name": animal.name,
            "image_url": animal.image_url,
            "amount_donated": animal.amount_donated,
            "total_amount": animal.total_amount
        })

    return jsonify(data)
