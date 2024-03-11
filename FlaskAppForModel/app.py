from flask import Flask
from RoutesForModel.VideoModelRoutes import VideoModel_bp
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
# Registering BluePrints
app.register_blueprint(VideoModel_bp)
@app.route('/')
def hello_world():
    return '''
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Testing Application</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <div style="max-width: 800px; margin: 50px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1 style="color: #333;">Hello World</h1>
                <p style="color: #555;">This is a testing application.</p>
            </div>
        </body>
        </html>
    '''


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002, debug=True)