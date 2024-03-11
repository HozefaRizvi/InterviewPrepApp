from flask import Blueprint, jsonify, request
from BluePrints.FirebaseInitlization.FirebaseInit import db

customersupport_bp = Blueprint("CustomerSupportBluePrints", __name__)

# Replace 'your_collection_name' with your actual collection name
COLLECTION_NAME = "Admin"

@customersupport_bp.route("/sendquery", methods=["POST"])
def send_query():
    try:
        data = request.get_json()
        user_query = data.get("userQuery")
        
        # Assume you have a 'customer_support' collection inside the 'Admin' document
        collection_ref = db.collection(COLLECTION_NAME).document("CustomerSupport")
        doc_ref = collection_ref.get()
        
        if doc_ref.exists:
            customer_support_data = doc_ref.to_dict()
            user_replies = customer_support_data.get("userReplies", [])
            
            new_query = {
                "id": len(user_replies) + 1,
                "userQuery": user_query,
                "adminResponse": "",
            }
            
            user_replies.append(new_query)
            
            # Update the document with the new user query
            collection_ref.update({"userReplies": user_replies})
            
            return jsonify({"message": "Query sent successfully"})
        else:
            return jsonify({"error": "Document not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@customersupport_bp.route("/fetchcustomerqueries", methods=["GET"])
def fetch_customer_queries():
    try:
        # Fetch customer queries from the 'CustomerSupport' document
        collection_ref = db.collection(COLLECTION_NAME).document("CustomerSupport")
        doc_ref = collection_ref.get()
        
        if doc_ref.exists:
            customer_support_data = doc_ref.to_dict()
            user_replies = customer_support_data.get("userReplies", [])
            
            return jsonify({"userReplies": user_replies})
        else:
            return jsonify({"error": "Document not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@customersupport_bp.route("/respondtoquery", methods=["POST"])
def respond_to_query():
    try:
        data = request.get_json()
        query_id = data.get("queryId")
        admin_response = data.get("adminResponse")
        
        # Assume you have a 'customer_support' collection inside the 'Admin' document
        collection_ref = db.collection(COLLECTION_NAME).document("CustomerSupport")
        doc_ref = collection_ref.get()
        
        if doc_ref.exists:
            customer_support_data = doc_ref.to_dict()
            user_replies = customer_support_data.get("userReplies", [])
            
            for reply in user_replies:
                if reply["id"] == query_id:
                    reply["adminResponse"] = admin_response
                    break
            
            # Update the document with the admin response
            collection_ref.update({"userReplies": user_replies})
            
            return jsonify({"message": "Response sent successfully"})
        else:
            return jsonify({"error": "Document not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@customersupport_bp.route("/deletequery", methods=["POST"])
def delete_query():
    try:
        data = request.get_json()
        query_id = data.get("queryId")

        # Assume you have a 'customer_support' collection inside the 'Admin' document
        collection_ref = db.collection(COLLECTION_NAME).document("CustomerSupport")
        doc_ref = collection_ref.get()

        if doc_ref.exists:
            customer_support_data = doc_ref.to_dict()
            user_replies = customer_support_data.get("userReplies", [])

            # Remove the query with the specified queryId
            updated_replies = [reply for reply in user_replies if reply["id"] != query_id]

            # Update the document with the modified user replies
            collection_ref.update({"userReplies": updated_replies})

            return jsonify({"message": "Query deleted successfully"})
        else:
            return jsonify({"error": "Document not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
