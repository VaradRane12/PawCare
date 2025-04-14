from extensions import db

class Volunteer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
class AdoptableAnimal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(300), nullable=False)
    amount_donated = db.Column(db.Integer, nullable=False, default=0)
    total_amount = db.Column(db.Integer, nullable=False)
    species = db.Column(db.String(50), nullable=False)
    age = db.Column(db.String(20), nullable=True)  # Example: "5 Years"
    behavior = db.Column(db.String(50), nullable=True)
    potty_trained = db.Column(db.String(10), nullable=True)
    vaccinated = db.Column(db.Boolean,nullable = True)
    def __repr__(self):
        return f"<AdoptableAnimal {self.name} ({self.species})>"
class FoodBankItem(db.Model):
    __tablename__ = 'food_bank_items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    quantity_needed = db.Column(db.String(50))  # e.g., "20 Bags", "50 Cans"
    urgency = db.Column(db.String(20))  # High, Medium, Low