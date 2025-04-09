from flask import request, jsonify
from werkzeug.utils import secure_filename
from . import main_bp
import os
from PIL import Image

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@main_bp.route("/upload", methods=["POST"])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400

    file = request.files['image']
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
