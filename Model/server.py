# Server side (Flask application)
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from Model_speech_to_text import transcribe_audio_from_server
from Model_text_to_speech import  text_to_audio_array
import librosa
import os
import base64
import json
import requests
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
    "datetime": ""
}

dataques = {
    "question": {
        "1": {
            "text": "",
            "audio": None
        },
        "2": {
            "text": "",
            "audio": None
        },
        "3": {
            "text": "",
            "audio": None
        },
        "4": {
            "text": "",
            "audio": None
        },
        "5": {
            "text": "",
            "audio": None
        },
        "6": {
            "text": "",
            "audio": None
        },
        "7": {
            "text": "",
            "audio": None
        },
        "8": {
            "text": "",
            "audio": None
        },
    }
}

HL7 = [
    {
        "userId": "1234",
        "SYS": "120",
        "DIA": "80",
        "PUL": "70"
    },
    {
        "userId": "7890",
        "SYS": "130",
        "DIA": "85",
        "PUL": "75"
    },
    {
        "userId": "3456",
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

@app.route('/dataques',methods=['GET'])
def get_dataques():
    return jsonify(dataques)


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
    req_data = request.json
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

@app.route('/postquestion', methods=['POST'])
def set_question_texts():
    try:
        response = requests.get('http://127.0.0.1:5001/question/get')
        if response.status_code == 200:
            questions = response.json()
            for question in questions:
                question_no = question['QuestionsNo'].strip()
                message = question['Message']
                # audioarray = text_to_audio_array(message)
                # Assuming `dataques` is defined somewhere in your code
                dataques["question"][question_no]["text"] = message
                # dataques["question"][question_no]["audio"] = audioarray
        else:
            return jsonify({ "error": f"Failed to retrieve questions. Status code: {response.status_code}" }), 500

        # Return success message
        return jsonify({ "message": "Question texts set successfully" })
    except Exception as e:
        return jsonify({ "error": str(e) }), 500

@app.route('/audioques', methods=['GET'])
def get_audio():
    key = request.args.get('key')
    text = dataques["question"][key]["text"]
    print(text)
    audioarray = text_to_audio_array(text)
    print(type(audioarray))
    audio_list = audioarray.tolist()
    return json.dumps(audio_list)


# Route for adding new HL7 data
@app.route('/addhl7', methods=['POST'])
def add_hl7():
    # Extract data from the POST request body
    data = request.json
    userId = data['PID']
    SYS = data['SYS']
    DIA = data['DIA']
    PUL = data['PUL']

    # Add the new HL7 data to the list
    HL7.append({
        'userId': userId,
        'SYS': SYS,
        'DIA': DIA,
        'PUL': PUL
    })

    # Return a success message
    return jsonify({'message': 'HL7 data added successfully'})




if __name__ == '__main__':
    app.run(debug=True)
