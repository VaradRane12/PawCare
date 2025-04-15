from flask import jsonify, request
from . import main_bp
from models import db,Volunteer
from models import Volunteer


@main_bp.route('/getvolunteers', methods=['GET'])
def get_volunteers():
    try:
        volunteers = Volunteer.query.all()
        print(volunteers)
        volunteer_list = []

        for v in volunteers:
            volunteer_list.append({
                'id': v.id,
                'full_name': v.full_name,
                'email': v.email,
                'phone_number': v.phone_number,
                'city': v.city,
                'motivation': v.motivation,
                'preferred_roles': v.preferred_roles.split(',') if v.preferred_roles else [],
                'availability': v.availability.split(',') if v.availability else []
            })

        return jsonify(volunteer_list[0:3]), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@main_bp.route('/setvolunteers', methods=['POST'])
def add_volunteer():
    try:
        data = request.get_json()
        print("Received data:", data)  # Log incoming data to check if it's correct
        
        # Ensure roles and availability are strings (comma-separated)
        preferred_roles = ",".join(data.get('preferred_roles', []))  # Convert list to comma-separated string
        availability = ",".join(data.get('availability', []))  # Convert list to comma-separated string
        
        # Create a new Volunteer object
        new_volunteer = Volunteer(
            full_name=data.get('full_name'),
            email=data.get('email'),
            phone_number=data.get('phone_number'),
            city=data.get('city'),
            motivation=data.get('motivation'),
            preferred_roles=preferred_roles,  # Save as comma-separated string
            availability=availability,  # Save as comma-separated string
        )

        # Add to the database
        db.session.add(new_volunteer)
        db.session.commit()
        return jsonify({"message": "Volunteer added successfully!"}), 201
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Failed to add volunteer"}), 400

