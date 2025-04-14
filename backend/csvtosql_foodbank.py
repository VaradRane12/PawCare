import pandas as pd
from app import create_app, db
from models import FoodBankItem  # Adjust if your model is located elsewhere

# Create the Flask app
app = create_app()

# Load the CSV file
df = pd.read_csv('food_bank.csv')

# Drop rows with missing required fields
df = df.dropna(subset=['name', 'quantity_needed', 'urgency'])

# Fill description or image_url with blank if not provided
df['description'] = df.get('description', '').fillna('')
df['image_url'] = df.get('image_url', '').fillna('')

# Insert into database
with app.app_context():
    for _, row in df.iterrows():
        item = FoodBankItem(
            name=row['name'],
            description=row['description'],
            image_url=row['image_url'],
            quantity_needed=row['quantity_needed'],
            urgency=row['urgency']
        )
        db.session.add(item)

    db.session.commit()

print("✅ Food items added successfully to the database!")
