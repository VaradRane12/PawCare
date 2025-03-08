from flask import Blueprint, render_template
home_bp = Blueprint('home', __name__)

@home_bp.route('/')
def home():
    total_goal = 2000  # Example goal amount
    amount_raised = 800  # Example donated amount

    # Avoid division by zero & ensure progress is always a valid number
    progress = (amount_raised / total_goal) * 100 if total_goal > 0 else 0  

    return render_template(
        "home.html",
        amount_raised=amount_raised,
        total_goal=total_goal,
        progress=round(progress, 1))  # Ensure rounding is done in Python