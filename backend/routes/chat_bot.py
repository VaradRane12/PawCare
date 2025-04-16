from flask import jsonify, request
from . import main_bp
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Download necessary NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')
try:
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('wordnet')

# Initialize preprocessing tools
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Enhanced FAQ dictionary with multiple question variations for each answer
faqs = {
    "adoption": {
        "answer": "You can visit the 'Adopt' section on our website and browse animals available for adoption. We have cats, dogs, and occasionally other pets looking for loving homes. The adoption process includes filling out an application, a home visit, and an adoption fee that covers vaccinations and sterilization.",
        "questions": [
            "how can I adopt a pet?",
            "how do I adopt an animal?",
            "adoption process",
            "want to adopt a cat",
            "looking to adopt a dog",
            "pet adoption procedure",
            "how to bring a pet home"
        ]
    },
    "donation": {
        "answer": "You can donate through our 'Donate' page using any major payment method. We accept one-time and recurring donations. Your contribution helps us provide food, shelter, and medical care for rescued animals. We also accept donations of pet supplies and food at our physical location.",
        "questions": [
            "how do I donate?",
            "ways to contribute",
            "can I donate money",
            "donation options",
            "how to give money",
            "make a contribution"
        ]
    },
    "volunteer": {
        "answer": "Absolutely! Head to the 'Volunteer' section to sign up and see how you can help. We need volunteers for animal care, adoption events, transport, fostering, and administrative tasks. You can choose flexible hours based on your availability.",
        "questions": [
            "can I volunteer?",
            "volunteer opportunities",
            "how to become a volunteer",
            "ways to help out",
            "looking to volunteer",
            "volunteer program"
        ]
    },
    "rescue": {
        "answer": "If you find an injured animal, please go to the 'Rescue' section and fill out the report form to notify our team. Include the animal's location, condition, and photos if possible. For urgent cases, call our 24/7 rescue hotline. Please don't attempt to handle injured wildlife without proper training.",
        "questions": [
            "how to report an injured animal?",
            "found a hurt animal",
            "animal rescue",
            "report abandoned pets",
            "injured stray cat",
            "report animal abuse",
            "emergency animal rescue"
        ]
    },
    "sterilization": {
        "answer": "Use our 'Sterilization' form to schedule a procedure for your pet. We offer low-cost spay and neuter services for cats and dogs. The procedure includes pre-surgery assessment, anesthesia, the operation, and post-operative care. We also provide free sterilization for community cats through our TNR program.",
        "questions": [
            "how do I schedule sterilization?",
            "spay and neuter",
            "getting my pet fixed",
            "sterilization services",
            "spay cat",
            "neuter dog",
            "low cost spay"
        ]
    },
    "mission": {
        "answer": "Our mission is to promote animal welfare through rescue, adoption, sterilization, and community awareness. We believe every animal deserves a loving home and proper care. We work to reduce pet overpopulation, prevent animal suffering, and educate the public about responsible pet ownership.",
        "questions": [
            "what is your mission?",
            "organization goals",
            "what do you do",
            "about your organization",
            "your purpose",
            "what's your mission statement"
        ]
    },
    "opening_hours": {
        "answer": "Our shelter is open for visits Monday to Friday from 10 AM to 6 PM, and weekends from 9 AM to 5 PM. Adoption appointments are recommended but not required. Our administrative office hours are Monday to Friday from 9 AM to 5 PM.",
        "questions": [
            "when are you open?",
            "opening hours",
            "visiting hours",
            "shelter hours",
            "when can I visit",
            "are you open on weekends"
        ]
    },
    "contact": {
        "answer": "You can reach us at help@animalshelter.org or call us at (555) 123-4567. For emergencies involving injured animals, please use our 24/7 hotline at (555) 987-6543. Our physical address is 123 Animal Lane, Petville, CA 90210.",
        "questions": [
            "how can I contact you?",
            "contact information",
            "email address",
            "phone number",
            "where are you located",
            "address"
        ]
    }
}

def preprocess_text(text):
    """Preprocess text by converting to lowercase, removing punctuation, lemmatizing, and removing stopwords"""
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    words = nltk.word_tokenize(text)
    words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words]
    return ' '.join(words)

# Prepare the corpus
all_questions = []
question_to_category = {}

for category, data in faqs.items():
    for question in data["questions"]:
        processed_question = preprocess_text(question)
        all_questions.append(processed_question)
        question_to_category[processed_question] = category

# Train the TF-IDF vectorizer
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(all_questions)

def get_ai_response(user_message):
    """Get the most relevant answer using NLP techniques"""
    # Preprocess the user message
    processed_message = preprocess_text(user_message)
    
    # If message is too short or empty after preprocessing
    if len(processed_message.split()) < 1:
        return "I didn't understand your question. Could you please provide more details?"
    
    # Convert user message to vector using the trained vectorizer
    user_vector = vectorizer.transform([processed_message])
    
    # Calculate cosine similarity between user message and all questions
    similarities = cosine_similarity(user_vector, tfidf_matrix)[0]
    
    # If the highest similarity is too low, return a default message
    if max(similarities) < 0.2:
        return "I'm not sure I understand your question. Could you try rephrasing it or provide more details? You can ask about adoption, donations, volunteering, animal rescue, sterilization, our mission, hours, or contact information."
    
    # Find the most similar question
    most_similar_idx = np.argmax(similarities)
    most_similar_question = all_questions[most_similar_idx]
    category = question_to_category[most_similar_question]
    
    # Return the answer
    return faqs[category]["answer"]

def generate_greeting():
    """Generate a random greeting message"""
    greetings = [
        "Hello! How can I help you with your animal-related questions today?",
        "Hi there! I'm the Animal Shelter Assistant. What can I help you with?",
        "Welcome! I'm here to answer your questions about our animal shelter services.",
        "Greetings! How can I assist you with your pet-related inquiries today?"
    ]
    return np.random.choice(greetings)

@main_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get("message", "").strip()
    session_id = data.get("session_id", "")
    
    # If this is the first message or an empty message, return a greeting
    if not message:
        return jsonify({'reply': generate_greeting()})
    
    # Process the message and get a response
    reply = get_ai_response(message)
    
    return jsonify({
        'reply': reply,
        'session_id': session_id
    })

# Add an endpoint for initializing the chat
@main_bp.route('/start_chat', methods=['GET'])
def start_chat():
    # Generate a session ID (in a real app, use something more secure)
    session_id = str(np.random.randint(10000, 99999))
    
    return jsonify({
        'session_id': session_id,
        'reply': generate_greeting()
    })