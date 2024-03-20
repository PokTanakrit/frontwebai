import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import './Page.css';


function Page3() {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);

    const startRecording = () => {
        setIsRecording(true);
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(handleAudioStream)
            .catch((error) => {
                console.error('Error accessing microphone:', error);
                setIsRecording(false);
            });
    };

    const stopRecording = () => {
        setIsRecording(false);
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
    };

    const handleAudioStream = (stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        const audioChunks = [];
        recorder.addEventListener("dataavailable", (event) => {
            audioChunks.push(event.data);
        });

        recorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            setAudioBlob(audioBlob);
        });

        recorder.start();

        setTimeout(() => {
            recorder.stop();
        }, 10000);
    };




    const handleConfirm = async () => {
        if (!audioBlob) {
            console.error('No audio recorded.');
            return;
        }
    
        try {
            const reader = new FileReader();
            reader.readAsArrayBuffer(audioBlob);
            reader.onloadend = async () => {
                // Convert ArrayBuffer to Uint8Array
                const arrayBuffer = reader.result;
                const uint8Array = new Uint8Array(arrayBuffer);
                // Convert Uint8Array to base64 string
                const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
                // Post the Base64 string to the server
                const response = await axios.post('http://127.0.0.1:5000/audio', { audio: base64String, key: 'audio1' });
                console.log('Response:', response.data);
            };
        } catch (error) {
            console.error('Error:', error);
        }
    };
    




    return (
        <div>
            <header>ไม่ทราบว่าเป็นอะไรมา มีอาการอะไรบ้างคะ?</header>

            <div className="button-container">
                <div>
                    <FontAwesomeIcon
                        icon={isRecording ? faStopCircle : faMicrophone}
                        style={{ cursor: 'pointer' }}
                        size="6x" // เพิ่มขนาดไอคอนที่นี่
                        onClick={isRecording ? stopRecording : startRecording}
                    />
                </div>
                <span className="button-gap"></span>
                
                {/* <button onClick={playAudio} disabled={!audioBlob}>เล่นเสียงที่บันทึกไว้</button> */}
                <span className="button-gap"></span>
                <Link to="/choosepage3">
                    <button>เลือกคำตอบ</button>
                </Link>
                <span className="button-gap"></span>
                <button onClick={handleConfirm}>ยืนยัน</button>
                <span className="button-gap"></span>
                <Link to="/page4">
                    <button>ถัดไป</button>
                </Link>
                <span className="button-gap"></span>
            </div>
        </div>
    );
}

export default Page3;
