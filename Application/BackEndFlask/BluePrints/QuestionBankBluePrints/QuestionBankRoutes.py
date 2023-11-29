from flask import Blueprint,jsonify,request,json
from BluePrints.FirebaseInitlization.FirebaseInit import db


questionbank_bp = Blueprint("QuestionBankBluePrint",__name__)

@questionbank_bp.route("/add_crm_systembased_questions", methods=["POST"])
def add_crm_questions():
    try:
        # Load JSON data from the file
        json_file_path = r'E:\7th Semester\Final Year Project\InterviewPrepApp\Application\BackEndFlask\BluePrints\QuestionBankBluePrints\QuestionDataBase\CRMDATA.json'
        with open(json_file_path, "r") as file:
            crm_data = json.load(file)

        # Add or update CRM questions in Firestore
        doc_ref = db.collection("QuestionBank").document("CRM Project Manager")
        doc_ref.set({"systembasedquestions": crm_data}, merge=True)

        return jsonify({"success": True, "message": "CRM questions added successfully to QuestionBank"})
    except Exception as e:
        return jsonify({"success": False, "error_message": str(e)})
    
@questionbank_bp.route("/add_devops_systembased_questions", methods=["POST"])
def add_devops_questions():
    try:
        # Load JSON data from the file
        json_file_path = r'E:\7th Semester\Final Year Project\InterviewPrepApp\Application\BackEndFlask\BluePrints\QuestionBankBluePrints\QuestionDataBase\DevopsData.json'
        with open(json_file_path, "r") as file:
            crm_data = json.load(file)

        # Add or update CRM questions in Firestore
        doc_ref = db.collection("QuestionBank").document("DevOps Engineer")
        doc_ref.set({"systembasedquestions": crm_data}, merge=True)

        return jsonify({"success": True, "message": "DEVOPS questions added successfully to QuestionBank"})
    except Exception as e:
        return jsonify({"success": False, "error_message": str(e)})
    
@questionbank_bp.route("/add_quality_systembased_questions", methods=["POST"])
def add_quality_questions():
    try:
        # Load JSON data from the file
        json_file_path = r'E:\7th Semester\Final Year Project\InterviewPrepApp\Application\BackEndFlask\BluePrints\QuestionBankBluePrints\QuestionDataBase\QualityAssuranceData.json'
        with open(json_file_path, "r") as file:
            crm_data = json.load(file)

        # Add or update CRM questions in Firestore
        doc_ref = db.collection("QuestionBank").document("Quality Assurance Engineer")
        doc_ref.set({"systembasedquestions": crm_data}, merge=True)

        return jsonify({"success": True, "message": "Quality Assurance  questions added successfully to QuestionBank"})
    except Exception as e:
        return jsonify({"success": False, "error_message": str(e)})
    

@questionbank_bp.route("/add_security_systembased_questions", methods=["POST"])
def add_security_questions():
    try:
        # Load JSON data from the file
        json_file_path = r'E:\7th Semester\Final Year Project\InterviewPrepApp\Application\BackEndFlask\BluePrints\QuestionBankBluePrints\QuestionDataBase\SecurityData.json'
        with open(json_file_path, "r") as file:
            crm_data = json.load(file)

        # Add or update CRM questions in Firestore
        doc_ref = db.collection("QuestionBank").document("Security Engineer")
        doc_ref.set({"systembasedquestions": crm_data}, merge=True)

        return jsonify({"success": True, "message": "Security Engineer questions added successfully to QuestionBank"})
    except Exception as e:
        return jsonify({"success": False, "error_message": str(e)})

@questionbank_bp.route("/add_softwareintegration_systembased_questions", methods=["POST"])
def add_softwareintegration_questions():
    try:
        # Load JSON data from the file
        json_file_path = r'E:\7th Semester\Final Year Project\InterviewPrepApp\Application\BackEndFlask\BluePrints\QuestionBankBluePrints\QuestionDataBase\SoftwareIntegrationData.json'
        with open(json_file_path, "r") as file:
            crm_data = json.load(file)

        # Add or update CRM questions in Firestore
        doc_ref = db.collection("QuestionBank").document("Software Integration Engineer")
        doc_ref.set({"systembasedquestions": crm_data}, merge=True)

        return jsonify({"success": True, "message": "Software Integration Engineer questions added successfully to QuestionBank"})
    except Exception as e:
        return jsonify({"success": False, "error_message": str(e)})

@questionbank_bp.route("/get_question_set", methods=["POST"])
def get_question_set():
    try:
        # Get JSON data from the request
        data = request.json

        # Validate JSON data
        if not data or 'role' not in data or 'question_set' not in data:
            return jsonify({"success": False, "error_message": "Role and question set parameters are required."})

        # Extract parameters from the JSON data
        role = data['role']
        question_set_type = data['question_set']

        # Retrieve the specified document from the QuestionBank collection
        question_bank_ref = db.collection("QuestionBank")
        role_doc_ref = question_bank_ref.document(role)

        # Check if the specified document exists
        role_doc_snapshot = role_doc_ref.get()
        if not role_doc_snapshot.exists:
            return jsonify({"success": False, "error_message": f"Document for role '{role}' not found."})

        # Retrieve the specified question set from the document
        role_doc_data = role_doc_snapshot.to_dict()

        # Check if 'systembasedquestions' key exists in the document
        system_based_questions_data = role_doc_data.get('systembasedquestions', {})

        # Check if the specified question set type exists in the document
        question_set_data = system_based_questions_data.get(question_set_type, {})

        # Check if the specified question set exists in the document
        
        if not question_set_data:
            return jsonify({"success": False, "error_message": f"Question set type '{question_set_type}' not found for role '{role}'."})
        print(question_set_data)
        return question_set_data

    except Exception as e:
        return jsonify({"success": False, "error_message": str(e)})

    except Exception as e:
        return jsonify({"success": False, "error_message": str(e)})


@questionbank_bp.route("/add_userbased_questions", methods=["POST"])
def add_userbasedquestions_questions():
    try:
        data = request.json
        question_data = data.get('QuestionData', {})
        field = question_data.get('ChoosenField', '')
        if not field:
            raise ValueError("ChoosenField not found in request data")
        question_ref = db.collection("QuestionBank").document(field).collection("userbasedquestions").document()
        question_ref.set(question_data)
        return jsonify({"success": True, "message": "User Contributed Successfully"})
    except Exception as e:
        return jsonify({"success": False, "error_message": str(e)})

@questionbank_bp.route("/get_userbased_questions", methods=["POST"])
def get_userbased_questions():
    try:
        data = request.json
        field = data.get('ChoosenField', '')
        type = data.get('ChoosenType', '')

        if not field or not type:
            raise ValueError("ChoosenField or ChoosenType not found in request data")

        # Query the subcollection based on ChoosenField and ChoosenType
        query = db.collection("QuestionBank").document(field).collection("userbasedquestions").where("ChoosenType", "==", type)
        documents = query.stream()

        # Convert the documents to a list of dictionaries
        questions_list = [doc.to_dict() for doc in documents]

        return jsonify({"success": True, "questions": questions_list})
    except Exception as e:
        return jsonify({"success": False, "error_message": str(e)})


