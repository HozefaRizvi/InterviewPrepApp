from flask import Blueprint,jsonify,request
from BluePrints.FirebaseInitlization.FirebaseInit import db

expert_bp = Blueprint("ExpertBluePrints",__name__)

@expert_bp.route("/add_expert_post", methods=["POST"])
def add_expert_post():
    try:
        data = request.get_json()

        # Extracting data from the request
        post_content = data.get("post_content")
        image_url = data.get("image_url")  # Assuming the image is stored and accessible via a URL
        publisher_name = data.get("publisher_name")
        post_date = data.get("post_date")  # Assuming the post_date is sent in ISO format
        publisher_pic = data.get("user_pic")
        post_likes = data.get("likes")
        # Creating a unique ID for the post
        post_id = db.collection("Experts").document("ExpertPosts").collection("Posts").document().id

        # Creating a dictionary to store in Firestore
        post_data = {
            "post_id": post_id,
            "post_content": post_content,
            "image_url": image_url,
            "publisher_name": publisher_name,
            "post_date": post_date,
            "user_pic":publisher_pic,
            "post_likes":post_likes
        }

        # Adding the post to Firestore
        db.collection("Experts").document("ExpertPosts").collection("Posts").document(post_id).set(post_data)

        return jsonify({"message": "Post added successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@expert_bp.route("/get_expert_posts", methods=["GET"])
def get_expert_posts():
    try:
        # Fetch posts from Firestore and convert to list
        posts = [
            {
                "post_id": doc.id,
                **doc.to_dict(),
            }
            for doc in db.collection("Experts").document("ExpertPosts").collection("Posts").stream()
        ]

        # Sort posts by post_date in descending order
        posts.sort(key=lambda x: x["post_date"], reverse=True)

        return jsonify({"posts": posts}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@expert_bp.route("/like_post/<post_id>", methods=["POST"])
def like_post(post_id):
    try:
        # Assuming "Experts" is your Firestore collection and "ExpertPosts" is the document
        post_ref = db.collection("Experts").document("ExpertPosts").collection("Posts").document(post_id)

        # Get the current likes count
        post_data = post_ref.get().to_dict()
        current_likes = post_data.get("post_likes", 0)

        # Increment the likes count
        new_likes = current_likes + 1

        # Update the post_likes field in Firestore
        post_ref.update({"post_likes": new_likes})

        return jsonify({"success": True, "message": "Post liked successfully", "new_likes": new_likes})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@expert_bp.route("/report_post/<post_id>", methods=["POST"])
def report_post(post_id):
    try:
        # Assuming "Experts" is your Firestore collection and "ExpertPosts" is the document
        post_ref = db.collection("Experts").document("ExpertPosts").collection("Posts").document(post_id)

        # Get the current report count
        post_data = post_ref.get().to_dict()
        current_reports = post_data.get("post_reports", 0)

        # Increment the report count
        new_reports = current_reports + 1

        # Update the post_reports field in Firestore
        post_ref.update({"post_reports": new_reports})

        return jsonify({"success": True, "message": "Post reported successfully", "new_reports": new_reports})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})