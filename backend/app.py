import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__)))  # ✅ Ensure the backend folder is in path

from backend import create_app  # ✅ Import properly

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
