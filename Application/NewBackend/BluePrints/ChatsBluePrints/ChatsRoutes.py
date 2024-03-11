from flask import Blueprint, jsonify, request
from BluePrints.FirebaseInitlization.FirebaseInit import db

chats_bp = Blueprint("ChatsBluePrints", __name__)

@chats_bp.route('/GetChatRooms', methods=['GET'])
def get_chat_rooms():
    chats_collection = db.collection("Chats")
    chat_documents = chats_collection.stream()
    chat_rooms = [doc.id for doc in chat_documents]
    return jsonify({"chat_rooms": chat_rooms})

@chats_bp.route('/AddChatRoom', methods=['POST'])
def add_chat_room():
    try:
        data = request.get_json()
        group_name = data.get('group_name')
        if not group_name:
            return jsonify({"error": "Group name is required"}), 400
        chats_collection = db.collection("Chats")
        if chats_collection.document(group_name).get().exists:
            return jsonify({"error": "Group already exists"}), 400
        chats_collection.document(group_name).set({})
        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@chats_bp.route('/SendMessage/<group_name>', methods=['POST'])
def send_message(group_name):
    try:
        data = request.get_json()
        text = data.get('text')
        user = data.get('user')
        time = data.get('time')
        print
        if not text or not user or not time:
            return jsonify({"error": "Invalid message data"}), 400

        chats_collection = db.collection("Chats")
        chat_document = chats_collection.document(group_name)

        if not chat_document.get().exists:
            return jsonify({"error": "Group does not exist"}), 404

        messages_collection = chat_document.collection("Messages")
        messages_collection.add({
            "text": text,
            "user": user,
            "time": time,
        })

        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@chats_bp.route('/GetMessages/<group_name>', methods=['GET'])
def get_messages(group_name):
    try:
        chats_collection = db.collection("Chats")
        chat_document = chats_collection.document(group_name)

        if not chat_document.get().exists:
            return jsonify({"error": "Group does not exist"}), 404

        messages_collection = chat_document.collection("Messages")
        messages = [{"text": doc.get("text"), "user": doc.get("user"), "time": doc.get("time")} for doc in messages_collection.stream()]

        # Sort messages based on time
        messages.sort(key=lambda x: x["time"])

        return jsonify({"messages": messages}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
