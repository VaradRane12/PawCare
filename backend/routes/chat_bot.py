from flask import jsonify, request, current_app
from . import main_bp
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from dotenv import load_dotenv
import os
from openai import OpenAI

# Load environment variables
load_dotenv()

# Ensure required NLTK data is downloaded
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

# Initialize NLP tools
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# FAQ Knowledge Base
faqs = {
    "adoption": {
        "answer": "You can visit the 'Adopt' section on our website and browse animals available for adoption...",
        "questions": ["how can I adopt a pet?", "adoption process", "want to adopt a cat"]
    },
    "donation": {
        "answer": "You can donate through our 'Donate' page...",
        "questions": ["how do I donate?", "ways to contribute", "donation options"]
    },
    # Add the rest of your categories similarly...
}

# Preprocess text (lowercase, remove punctuation, lemmatize, remove stopwords)
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    words = nltk.word_tokenize(text)
    return ' '.join(lemmatizer.lemmatize(word) for word in words if word not in stop_words)

# Prepare the corpus
all_questions = []
question_to_category = {}

for category, data in faqs.items():
    for question in data["questions"]:
        processed = preprocess_text(question)
        all_questions.append(processed)
        question_to_category[processed] = category

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(all_questions)

# OpenAI Client Setup (should only be initialized once)
def get_openai_client():
    api_key = current_app.config.get("OPENAI_API_KEY") or os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("Missing OpenAI API key")
    return OpenAI(api_key=api_key)

# AI Chat Response Handler
def get_ai_response(user_message):
    if not user_message.strip():
        return "Can you please ask a question?"

    try:
        client = get_openai_client()
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant for an animal shelter."},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7,
            max_tokens=400
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Oops! Something went wrong: {e}"

# Greeting Generator
def generate_greeting():
    greetings = [
        "Hello! How can I help you with your animal-related questions today?",
        "Hi there! I'm the Animal Shelter Assistant. What can I help you with?",
        "Welcome! I'm here to answer your questions about our animal shelter services."
    ]
    return np.random.choice(greetings)

# Start chat endpoint
@main_bp.route('/start_chat', methods=['GET'])
def start_chat():
    session_id = str(np.random.randint(10000, 99999))
    return jsonify({
        'session_id': session_id,
        'reply': generate_greeting()
    })

# Chat endpoint
@main_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"reply": "Hey! Ask me anything about animal welfare, adoption, or rescue."})

    try:
        reply = get_ai_response(user_message)
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({
            "reply": "Something went wrong while processing your request.",
            "error": str(e)
        })
