from flask import Blueprint, jsonify, request
import cv2
from deepface import DeepFace
import os
from functions import get_recommendation , get_additional_notes 

VideoModel_bp = Blueprint("VideoModelBluePrint", __name__)
from ChatBot import get_openai_response

@VideoModel_bp.route('/VideoModel', methods=['OPTIONS', 'POST'])
def VideoModelAnalysis():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({'status': 'success'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'OPTIONS, POST')
        return response
    # Assuming the video file is sent as a POST request
    data = request.json 
    # Extract the video link from the JSON data
    video_link = data['Video']
    print(video_link)

    if not video_link:
        return jsonify({"error": "Video link not provided"}), 400
    # Load the video
    cap = cv2.VideoCapture(video_link)

    # Load the face cascade
    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    font = cv2.FONT_HERSHEY_SIMPLEX

    emotions_weights = {
        "angry": 0.4,
        "disgust": 0.8,
        "fear": 1.1,
        "happy": 1.7,
        "sad": 0.2,
        "surprise": 1.3,
        "neutral": 0.3
    }
    emotions_count = {}
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect faces in the grayscale frame
       
        faces = faceCascade.detectMultiScale(gray_frame, scaleFactor=1.3, minNeighbors=5, minSize=(50, 50))
        if len(faces) == 1:
            (x, y, w, h) = faces[0]
            face_img = frame[y:y + h, x:x + w]
            # Check if the face_img is not empty
            if face_img.size == 0:
                print("Empty face_img detected. Skipping this frame.")
                continue  # Skip this iteration if face not detected

            # Analyze emotion for the single face
            try:
                predictions = DeepFace.analyze(face_img, actions=["emotion"],enforce_detection=False)
            except ValueError as e:
                print(f"Error analyzing face: {e}")
                continue
            # Get dominant emotion
            dominant_emotion = predictions[0]['dominant_emotion']

            # Update emotions_count dictionary with weighted count
            emotions_count[dominant_emotion] = emotions_count.get(dominant_emotion, 0) + emotions_weights.get(dominant_emotion, 1)
            print(f'Dominant Emotion: {dominant_emotion} ({emotions_count[dominant_emotion]} times)')

    # Release video capture
    cap.release()

    # Calculate confidence level
    total_weights = sum(emotions_count.values())
    confidence_level = 100 * (1 - emotions_count.get('neutral', 0) / total_weights)

    # Prepare the response
    response = {
        "dominant_emotions": emotions_count,
        "confidence_level": confidence_level,
        "Tips": get_openai_response(confidence_level,emotions_count),
        "Additional Notes": get_additional_notes(emotions_count) ,
    }
    return jsonify({"ConfidenceData":response}), 200

