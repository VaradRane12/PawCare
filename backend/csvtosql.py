import pandas as pd
from app import create_app, db
from models import AdoptableAnimal  # adjust if models are in a different file

# Create the Flask app instance
app = create_app()

# Load your CSV
df = pd.read_csv('data.csv')
df = df.dropna(subset=['name', 'amount_donated', 'total_amount'])

df['amount_donated'] = pd.to_numeric(df['amount_donated'], errors='coerce')
df['total_amount'] = pd.to_numeric(df['total_amount'], errors='coerce')
df = df.dropna(subset=['amount_donated', 'total_amount'])

# Use app context to access db.session
with app.app_context():
    for _, row in df.iterrows():
        animal = AdoptableAnimal(
            name=row['name'],
            image_url=row['image_url'],
            amount_donated=row['amount_donated'],
            total_amount=row['total_amount'],
            species=row['Species'],
            age=row['Age'],
            behavior=row['Behavior'],
            potty_trained=row['Potty_Trained']
        )
        db.session.add(animal)



    db.session.commit()

print("✅ Data inserted successfully!")
