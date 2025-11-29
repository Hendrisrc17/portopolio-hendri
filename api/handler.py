import json
import os

def handler(request):
    # Lokasi file data.json
    data_path = os.path.join(os.path.dirname(__file__), "../data/data.json")

    # Baca JSON
    with open(data_path, "r") as f:
        data = json.load(f)

    # Ambil query action
    action = request.query.get("action")

    # Tambah view
    if action == "view":
        data["views"] += 1

    # Tambah like
    if action == "like":
        data["likes"] += 1

    # Simpan kembali JSON
    with open(data_path, "w") as f:
        json.dump(data, f, indent=4)

    # Return JSON response
    return {
        "status": 200,
        "headers": { "Content-Type": "application/json" },
        "body": json.dumps(data)
    }
