

from flask import jsonify
from . import main_bp

@main_bp.route("/dog_adopt",methods = ["GET"])
def adopt_dog():
    from models import AdoptableAnimal
    dogs = AdoptableAnimal.query.filter_by(species='Dog').all()
    dog_list = [
        {
            "id": dog.id,
            "image_url": dog.image_url,
            "name": dog.name,
            "age": dog.age,
            "is_potty_trained": dog.potty_trained,
            "vaccinated": dog.vaccinated,
            "temperament": dog.behavior
        }
        for dog in dogs
    ]

    return jsonify(dog_list)



