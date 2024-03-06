import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './Page.css';

function Page3() {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);

    const handleSpeak = async () => {
        alert("Recording audio...");
        startRecording();
    };

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

    const playAudio = () => {
        if (audioBlob) {
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioElement = new Audio(audioUrl);
            audioElement.play();
        }
    };

    // Function to handle confirming the answer and sending data to the server
    const handleConfirm = () => {
        if (!audioBlob) {
            console.error('No audio recorded.');
            return;
        }

        const formData = new FormData();
        formData.append('audio1', audioBlob, 'recorded_audio.wav');

        axios.post('http://localhost:5000/audio', formData)
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <header>ไม่ทราบว่าเป็นอะไรมา มีอาการอะไรบ้างคะ?</header>

            <div className="button-container">
                {isRecording ? (
                    <button onClick={stopRecording}>หยุดบันทึกเสียง</button>
                ) : (
                    <button onClick={handleSpeak}>พูด</button>
                )}
                <span className="button-gap"></span>
                <button onClick={playAudio} disabled={!audioBlob}>เล่นเสียงที่บันทึกไว้</button>
                <span className="button-gap"></span>
                <Link to="/choosepage3"><button>เลือกคำตอบ</button></Link>
                <span className="button-gap"></span>
                <button onClick={handleConfirm}>ยืนยัน</button>
                <span className="button-gap"></span>
                <Link to="/page4"><button>ถัดไป</button></Link>
                <span className="button-gap"></span>
            </div>
        </div>
    );
}

export default Page3;
