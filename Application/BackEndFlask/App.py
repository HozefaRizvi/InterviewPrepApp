from flask import Flask ,jsonify
import firebase_admin
from firebase_admin import credentials , firestore

app = Flask(__name__)

#initilising my firestore to this application

cred = credentials.Certificate(r'E:\7th Semester\Final Year Project\InterviewPrepApp\Application\BackEndFlask\FireBase-SDK.json')

firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/',methods = ['POST'])
def get_data():
    data = {"Name": "HozefaRizvi"}
    db.collection('Candidates').add(data)

    return jsonify({"Message": "Data Added Successfully"})


@app.route('/get_candidiatedata', methods=['GET'])
def retrieve_data():
    users_ref = db.collection('Admin')
    docs = users_ref.get()
    data = []
    for doc in docs:
        data.append(doc.to_dict())
    return jsonify(data)
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)