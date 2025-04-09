from flask import request, jsonify
import tensorflow as tf
from werkzeug.utils import secure_filename
from . import main_bp
import os
from PIL import Image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing import image
import numpy as np

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



UPLOAD_FOLDER = 'uploads'

# Load the trained model
model = tf.keras.models.load_model("dog_breed_model.h5")  # Use your trained model

# Load class labels (dog breeds)
with open("breed_labels.txt", "r") as f:
    breed_labels = [line.strip() for line in f.readlines()]




@main_bp.route("/upload", methods=["POST","GET"])
def upload_image():

    
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400

    file = request.files['image']
    if file:
        # upload_folder = main_bp.config["UPLOAD_FOLDER"]
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        # Preprocess the image
        img = image.load_img(filepath, target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)

        # Predict breed
        preds = model.predict(img_array)
        breed = breed_labels[np.argmax(preds)]
        return jsonify({"message":"sucess ",'breed': breed}),200
    # img = Image.open(file) # Replace "your_image.jpg" with the actual path to your image file
    # img.show()
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        return jsonify({'message': 'Image uploaded successfully', 'filename': filename}), 200

    return jsonify({'error': 'Invalid file type'}), 400

@main_bp.route("/data", methods=["GET"])
def get_dummy_data():
    return jsonify({
        "status": "success",
        "data": {
            "info": "This is some mock data returned from the backend."
        }
    })
