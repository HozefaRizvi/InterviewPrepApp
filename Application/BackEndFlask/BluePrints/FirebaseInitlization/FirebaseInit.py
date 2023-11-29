
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app

# Initializing Firebase Firestore
cred = credentials.Certificate(r'E:\7th Semester\Final Year Project\InterviewPrepApp\Application\BackEndFlask\FireBase-SDK.json')
firebase_app = initialize_app(cred)
db = firestore.client()
