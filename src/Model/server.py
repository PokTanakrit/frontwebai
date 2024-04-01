# Server side (Flask application)
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from Model_speech_to_text import transcribe_audio_from_server
import librosa
import os

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/transcription": {"origins": "http://localhost:3000"}}, headers="Content-Type")

# Initial data
data = {
    "PID": "",
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
            "text": "มีอาการอื่นๆ ร่วมด้วยหรือไม่?",
            "audio": None
        },
        "7": {
            "text": "มีอาการรุนแรงหรือส่งผลต่อชีวิตประจำวันหรือไม่?",
            "audio": None
        },
        "8": {
            "text": "เคยมีประวัติเจ็บป่วยมาก่อนหรือไม่?",
            "audio": None
        },
    },
    "datetime": ""
}

HL7 = [
    {
        "userId": "123456",
        "SYS": "120",
        "DIA": "80",
        "PUL": "70"
    },
    {
        "userId": "789012",
        "SYS": "130",
        "DIA": "85",
        "PUL": "75"
    },
    {
        "userId": "345678",
        "SYS": "140",
        "DIA": "90",
        "PUL": "80"
    }
]

@app.route('/')
def hello():
    return "Hello world"

@app.route('/data',methods=['GET'])
def get_data():
    return jsonify(data)

@app.route('/HL7',methods=['GET'])
def get_hl7_data():
    PID = request.args.get('PID')
    for item in HL7:
        if item['userId'] == PID:
            return jsonify(item)
    return jsonify({ "error": "Invalid PID" })

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
    req_data = request.json.get('PID')
    if req_data and "PID" in req_data:
        data["PID"] = req_data["PID"]
        return jsonify({ "message": "PID received successfully" })
    else:
        return jsonify({ "error": "Invalid data format or missing PID" })


@app.route('/transcription', methods=['POST'])
def transcribe_audio():
    try:
        # รับข้อมูลเสียงที่ส่งมาในรูปแบบของ JSON
        audio_data = request.json.get('audioData')
        audio_array = np.array(list(audio_data.values()))
        
        # แปลงเสียงเป็นข้อความ
        transcriptions = transcribe_audio_from_server(audio_array)
        
        # ส่งข้อความที่แปลงได้กลับไปยังไคลเอนต์
        return jsonify({'transcribedText': transcriptions})
    except Exception as e:
        # ส่งข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาดในการรับหรือแปลงข้อมูลเสียง
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
