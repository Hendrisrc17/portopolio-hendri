from flask import Flask, request
from api.handler import handler

app = Flask(__name__)

@app.route("/api/handler", methods=["GET"])
def handle():
    return handler(request)

@app.route("/")
def home():
    return "API is running!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
