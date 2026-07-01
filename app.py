from flask import Flask, render_template, jsonify
from manager import get_system_snapshot

app = Flask(__name__)


# ================= Dashboard =================

@app.route("/")
def dashboard():
    return render_template("index.html")


# ================= API =================

@app.route("/api/system")
def system_data():
    return jsonify(get_system_snapshot())


if __name__ == "__main__":
    app.run(debug=True)