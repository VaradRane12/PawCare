

from flask import jsonify
from . import main_bp

@main_bp.route("/home-data")
def home_data():
    return jsonify({
        "banner_image": "https://i.ibb.co/xqxwGyjw/y.jpg",  # Make sure this image exists in /static/images/
        "amount_donated": 10,
        "total_amount": 1000
    })