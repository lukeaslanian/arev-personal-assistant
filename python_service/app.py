from flask import Flask, request, jsonify
from predict import predict_priority
from nlu import get_answer
from chat import chat

app = Flask(__name__)

chat_history = {}

@app.route('/predict', methods=['POST'])
def predict_route():
    data = request.get_json()
    features = data['features']
    priority = predict_priority(features)
    return jsonify({'priority': priority})

@app.route('/nlu', methods=['POST'])
def nlu_route():
    data = request.get_json()
    question = data['question']
    context = data['context']
    answer = get_answer(question, context)
    return jsonify({'answer': answer})

@app.route('/chat', methods=['POST'])
def chat_route():
    user_id = request.remote_addr  # Simple user identification
    data = request.get_json()
    user_input = data['message']
    chat_history_ids = chat_history.get(user_id)

    response, chat_history_ids = chat(user_input, chat_history_ids)
    chat_history[user_id] = chat_history_ids

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
