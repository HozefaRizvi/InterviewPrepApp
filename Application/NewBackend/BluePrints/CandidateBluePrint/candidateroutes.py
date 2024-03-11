from flask import Blueprint,jsonify,request
from BluePrints.FirebaseInitlization.FirebaseInit import db

candidate_bp = Blueprint("CandidateBluePrint",__name__)



@candidate_bp.route('/SignUp_Candidate', methods=['POST'])
def sign_up_candidate():
    data = request.json
    # Check if the username or email already exists
    username_exists = db.collection('Candidates').where('UserName', '==', data['UserName']).get()
    email_exists = db.collection('Candidates').where('Email', '==', data['Email']).get()

    if username_exists or email_exists:
        return jsonify({"Error": "Username or email already exists"}), 409
    
    db.collection('Candidates').add(data)
    return jsonify({"Message": "Signup"}), 200

@candidate_bp.route('/candidate')
def candidate_route():
    return 'Candidate Route'

@candidate_bp.route('/SignIn_Candidate', methods=['POST'])
def signin_candidate():
    data = request.json 
    email = data['Email']
    password = data['Password']
    
    # Check if there is a user with the provided email and password
    user_ref = db.collection('Candidates').where('Email', '==', email).where('Password', '==', password).stream()

    user_data = [doc.to_dict() for doc in user_ref]
    print(user_data)
    if not user_data:
        # If there is no user with the provided credentials, return "Invalid"
        return jsonify({"Message": "Invalid"}), 401
    
    # If the email and password are valid, return a JSON response with "Valid" and the user_data
    return jsonify({"UserData":user_data}), 200
   

@candidate_bp.route('/SetupProfile_Candidate', methods=['POST'])
def setup_candidate_profile():
    if request.method == 'POST':
        data = request.json
        email = data['Email']
        profile_data = data['ProfileData']

        # Check if the user exists
        user_ref = db.collection('Candidates').where('Email', '==', email).limit(1).stream()
        
        # Get the first document from the result
        user_docs = list(user_ref)
        if not user_docs:
            return jsonify({"Message": "User not found"}), 404

        # Update the user's profile with the provided data
        user_doc = user_docs[0]
        user_doc.reference.set({
            'Profile': {
                'ProfilePic': profile_data.get('ProfilePic', ''),
                'University': profile_data.get('University', ''),
                'Country': profile_data.get('Country', ''),
                'City': profile_data.get('City', ''),
                'CGPA': profile_data.get('CGPA', ''),
                'Expert': profile_data.get('Expert', ''),
                'GivenInterview': profile_data.get('GivenInterview', ''),
            },
            'isSetupProfile': profile_data.get('isSetupProfile', ''), 
        }, merge=True)

        return jsonify({"Message": "ProfileSetUpped"}), 200
    else:
        return jsonify({"Message": "Use POST method to set up a profile"}), 405

@candidate_bp.route('/GetCandidateData', methods=['POST'])
def get_candidate_data():
    if request.method == 'POST':
        data = {"UserName": "HozefaRizvi", "Email": "hozefa@gmail.com", "Password": "12345"}
        email = data.get('Email')

        if not email:
            return jsonify({"Message": "Email is required"}), 400
        
        candidate_docs = db.collection('Candidates').where('Email', '==', email).stream()

        candidate_data = []
        for candidate_doc in candidate_docs:
            candidate_data.append(candidate_doc.to_dict())

        return jsonify({"CandidateData": candidate_data})
    else:
        return jsonify({"Message": "Use POST method to retrieve candidate data"}), 405