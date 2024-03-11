from flask import Flask

from BluePrints.CandidateBluePrint.candidateroutes import candidate_bp
from BluePrints.QuestionBankBluePrints.QuestionBankRoutes import questionbank_bp
from BluePrints.NewsBluePrints.NewsRoute import news_bp
from BluePrints.ExpertBluePrints.experttorutes import expert_bp
from BluePrints.ChatsBluePrints.ChatsRoutes import chats_bp
from BluePrints.CustomerSupport.CustomerSupportRoutes import customersupport_bp
app = Flask(__name__)

app.register_blueprint(candidate_bp)
app.register_blueprint(questionbank_bp)
app.register_blueprint(news_bp)
app.register_blueprint(expert_bp)
app.register_blueprint(chats_bp, url_prefix='/chats') 
app.register_blueprint(customersupport_bp)
@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
