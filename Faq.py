from flask import Flask, request, render_template, Blueprint, current_app
import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing import image
import numpy as np
import os

bp_faq = Blueprint('faq', __name__)
UPLOAD_FOLDER = 'static/uploads'

# Load the trained model
model = tf.keras.models.load_model("dog_breed_model.h5")  # Use your trained model

# Load class labels (dog breeds)
with open("breed_labels.txt", "r") as f:
    breed_labels = [line.strip() for line in f.readlines()]

@bp_faq.route("/faq", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files["file"]
        if file:
            upload_folder = current_app.config["UPLOAD_FOLDER"]
            filepath = os.path.join(upload_folder, file.filename)
            file.save(filepath)

            # Preprocess the image
            img = image.load_img(filepath, target_size=(224, 224))
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            img_array = preprocess_input(img_array)

            # Predict breed
            preds = model.predict(img_array)
            breed = breed_labels[np.argmax(preds)]

            return render_template("faq.html", breed=breed, image_path=filepath)

    return render_template("faq.html", breed=None, image_path=None)

# Main application file (app.py)
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Register blueprint
app.register_blueprint(bp_faq)

if __name__ == "__main__":
    app.run(debug=True) 