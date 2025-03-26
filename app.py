from flask import Flask, render_template
from home import home_bp 
from foodBank import foodBank_bp
from donate_food import food_donate
from Faq import bp_faq

app = Flask(__name__,template_folder= "templates")

app.config['UPLOAD_FOLDER'] = 'static/uploads'

app.register_blueprint(home_bp)
app.register_blueprint(foodBank_bp)

app.register_blueprint(food_donate)
app.register_blueprint(bp_faq)



@app.route('/adoption')
def adoption():
    return render_template('Adoption.html')

@app.route('/volunteering')
def volunteering():
    return render_template('volunteering.html')

@app.route('/medical-records')
def medical_records():
    return render_template('medical_records.html')

@app.route('/donation')
def donation():
    return render_template('donation.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

@app.route('/awareness')
def awareness():
    return render_template('awareness.html')

@app.route('/rescue-cases')
def rescue_cases():
    return render_template('rescue_cases.html')

if __name__ == '__main__':
    app.run(debug=True)
