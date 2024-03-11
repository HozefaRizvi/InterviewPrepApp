from flask import Blueprint, jsonify, request
import requests

news_bp = Blueprint("NewsBluePrint", __name__)
NEWS_API_KEY = "519d6e6eb3734c34af6b6502754bd015"

@news_bp.route('/news', methods=['GET'])  # 'GET' should be in uppercase
def get_news():
    # Make a request to the News API to get the tech news
    url = f"https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=519d6e6eb3734c34af6b6502754bd015"
    response = requests.get(url)  # Corrected from request.get to requests.get
    data = response.json()

    # Check if the request was successful
    if data["status"] == "ok":
        # Return the news data as JSON
        return jsonify(data)
    else:
        return "Error fetching news data"
