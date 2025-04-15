from flask import Blueprint, request, jsonify

chat_bp = Blueprint('chat', __name__)

# Sample FAQs (add as many as you want!)
faqs = {
    "how can I adopt a pet?": "You can visit the 'Adopt' section on our website and browse animals available for adoption.",
    "how do i donate?": "You can donate through our 'Donate' page using any major payment method.",
    "can I volunteer?": "Absolutely! Head to the 'Volunteer' section to sign up and see how you can help.",
    "how to report an injured animal?": "Go to the 'Rescue' section and fill out the report form to notify our team.",
    "how do I schedule sterilization?": "Use our 'Sterilization' form to schedule a procedure for your pet.",
    "what is your mission?": "Our mission is to promote animal welfare through rescue, adoption, sterilization, and community awareness."
}

def get_faq_answer(user_message):
    user_message = user_message.lower().strip()

    # Try exact match
    if user_message in faqs:
        return faqs[user_message]

    # Try keyword matching (very basic fallback logic)
    for q, a in faqs.items():
        if any(word in user_message for word in q.split()):
            return a

    return "I'm not sure about that. Try rephrasing your question or check our FAQ page!"

@chat_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get("message", "")
    reply = get_faq_answer(message)
    return jsonify({'reply': reply})
