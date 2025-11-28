import json
from flask import Flask, request, jsonify

app = Flask(__name__)

data_file = "data.json"

@app.route("/api", methods=["GET"])
def api():
    # Ambil parameter action
    action = request.args.get("action")

    # Baca file JSON
    with open(data_file, "r") as f:
        data = json.load(f)

    # Tambah view
    if action == "view":
        data["views"] += 1

    # Tambah like
    if action == "like":
        data["likes"] += 1

    # Simpan kembali
    with open(data_file, "w") as f:
        json.dump(data, f, indent=4)

    # Kembalikan JSON
    return jsonify(data)

if __name__ == "__main__":
    app.run()
