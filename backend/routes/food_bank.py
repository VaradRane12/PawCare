# routes.py or wherever your routes are defined
from flask import jsonify
from models import FoodBankItem
from . import main_bp
@main_bp.route("/food-bank-items", methods=["GET"])
def get_food_bank_items():
    items = FoodBankItem.query.all()
    return jsonify([
        {
            "itemName": item.name,
            "description": item.description,
            "image": item.image_url,
            "quantityNeeded": item.quantity_needed,
            "urgencyLevel": item.urgency
        } for item in items
    ])
