from flask import Blueprint, render_template
food_donate = Blueprint('fdonate', __name__)

@food_donate.route('/foodDonate')
def foodDonate():
    return render_template("food_donate.html") 