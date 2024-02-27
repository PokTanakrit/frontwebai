import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Page.css';

function Page10() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const handleSpeak = async () => {
        alert("Recording audio...");
        startRecording();
    };

    const startRecording = () => {
        setIsRecording(true);
        console.log("isRecording state:", isRecording);
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(handleAudioStream)
            .catch((error) => {
                console.error('Error accessing microphone:', error);
                setIsRecording(false);
            });
    };

    const stopRecording = () => {
        setIsRecording(false);
        console.log("isRecording state:", isRecording);
    };
    

    const handleAudioStream = (stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", (event) => {
            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            setAudioBlob(audioBlob);
        });

        mediaRecorder.start();

        setTimeout(() => {
            mediaRecorder.stop();
        }, 2000); // Adjust recording time as needed
    };

    const playAudio = () => {
        if (audioBlob) {
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioElement = new Audio(audioUrl);
            audioElement.autoplay = true; // Autoplay audio
            audioElement.controls = true; // Show audio controls
            document.body.appendChild(audioElement); // Append audio element to DOM
        }
    };
    

    const handleDownload = () => {
        if (audioBlob) {
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioElement = document.createElement('a');
            audioElement.href = audioUrl;
            audioElement.download = 'recorded_audio.wav';
            audioElement.click();
        }
    };

    return (
        <div>
            <header>เคยมีประวัติเจ็บป่วยมาก่อนหรือไม่?</header>
            <div className="button-container">
                {isRecording ? (
                    <button onClick={stopRecording}>หยุดบันทึกเสียง</button>
                ) : (
                    <button onClick={handleSpeak}>พูด</button>
                )}
                <span className="button-gap"></span>
                <button onClick={playAudio} >เล่นเสียงที่บันทึกไว้</button>
                <span className="button-gap"></span>
                <button onClick={handleDownload} >ดาวน์โหลดเสียงที่บันทึกไว้</button>
                <span className="button-gap"></span>
                <Link to="/choosepage10"><button>เลือกคำตอบ</button></Link>
            </div>
        </div>
    );
}

export default Page10;
