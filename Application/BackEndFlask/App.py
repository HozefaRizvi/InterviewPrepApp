from flask import Flask ,jsonify

from BluePrints.CandidateBluePrint.candidateroutes import candidate_bp
from BluePrints.QuestionBankBluePrints.QuestionBankRoutes import questionbank_bp

app = Flask(__name__)

app.register_blueprint(candidate_bp)
app.register_blueprint(questionbank_bp)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)

    