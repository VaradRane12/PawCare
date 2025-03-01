from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/adoption')
def adoption():
    return render_template('adoption.html')

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
