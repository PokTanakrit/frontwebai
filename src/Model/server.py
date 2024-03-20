# Server side (Flask application)
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename  # Add this import statement

app = Flask(__name__)
CORS(app)

# Initial data
data = {
    "PID": "8888",
    "answer": {
        "ans1": None,
        "ans2": None,
        "ans3": None,
        "ans4": None,
        "ans5": None,
        "ans6": None,
        "ans7": None,
        "ans8": None
    },
    "audio": {
        "audio1": None,
        "audio2": None,
        "audio3": None,
        "audio4": None,
        "audio5": None,
        "audio6": None,
        "audio7": None,
        "audio8": None
    },
    "question": {
        "1": {
            "text": "ไม่ทราบว่าเป็นอะไรมา มีอาการอะไรบ้างคะ?",
            "audio": None
        },
        "2": {
            "text": "เป็นมากี่วันแล้วคะ มีอาการตั้งแต่เมื่อไหร่คะ?",
            "audio": None
        },
        "3": {
            "text": "ได้ทานยาอะไรมาบ้างคะ?",
            "audio": None
        },
        "4": {
            "text": "มีอาการแพ้ยาอะไรบ้าง?",
            "audio": None
        },
        "5": {
            "text": "มีกิจกรรมการออกกำลังกายอยู่ไหมคะ?",
            "audio": None
        },
        "6": {
            "text": "มีอาการแพ้ยาอะไรบ้าง?",
            "audio": None
        },
        "7": {
            "text": "มีอาการอื่นๆ ร่วมด้วยหรือไม่?",
            "audio": None
        },
        "8": {
            "text": "เคยมีประวัติเจ็บป่วยมาก่อนหรือไม่?",
            "audio": None
        },
    },
    "datetime": ""
}

@app.route('/')
def hello():
    return "Hello world"

@app.route('/data')
def get_data():
    return jsonify(data)

@app.route('/audio', methods=['GET'])
def get_audio():
    key = request.args.get('key')
    if key in data["audio"]:
        return jsonify(data["audio"][key])
    else:
        return jsonify({ "error": "Invalid key" })

@app.route('/answer', methods=['POST'])
def receive_answer():
    req_data = request.get_json()
    if req_data and len(req_data) == 1:
        key = list(req_data.keys())[0]
        if key in data["answer"]:
            data["answer"][key] = req_data[key]
            return jsonify({ "message": "Answer received successfully" })
        else:
            return jsonify({ "error": "Invalid key" })
    else:
        return jsonify({ "error": "Invalid data format" })

@app.route('/PID', methods=['POST'])
def receive_pid():
    req_data = request.get_json()
    if req_data and "PID" in req_data:
        data["PID"] = req_data["PID"]
        return jsonify({ "message": "PID received successfully" })
    else:
        return jsonify({ "error": "Invalid data format or missing PID" })

@app.route('/audio', methods=['POST'])
def post_audio():
    try:
        # Get base64 audio data and key from JSON payload
        audio_base64 = request.json.get('audio')
        key = request.json.get('key')
        
        # Check if audio data exists
        if not audio_base64:
            return jsonify({ "error": "No audio data sent" }), 400
        
        data["audio"][key] = audio_base64
        
        # Return success message
        return jsonify({ "message": "Audio received and saved successfully" }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 500

    
@app.route('/audioques', methods=['POST'])
def post_audioques():
    try:
        # Get base64 audio data and key from JSON payload
        audio_base64 = request.json.get('audioBase64')
        key = request.json.get('key')
        
        # Check if audio data and key exist
        if not audio_base64:
            return jsonify({ "error": "No audio data sent" }), 400
        if key not in data["question"]:
            return jsonify({ "error": "Invalid key" }), 400
        
        # Update data with audio data for the specified key
        data["question"][key]['audio'] = audio_base64
        
        # Return success message
        return jsonify({ "message": "Audio received and saved successfully" }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 500



if __name__ == '__main__':
    app.run(debug=True)
