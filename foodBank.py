from flask import Blueprint, render_template
foodBank_bp = Blueprint('bank', __name__)

@foodBank_bp.route('/foodBank')
def foodBank():
    print("in foodbank")
    return render_template("foodBank.html") 