import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Page.css';

function Page3() {
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
            
            // Save audio file to src/audio folder
            const audioUrl = URL.createObjectURL(audioBlob);
            const link = document.createElement('a');
            link.href = audioUrl;
            link.setAttribute('download', 'recorded_audio.wav');
            link.innerHTML = 'download';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        mediaRecorder.start();

        setTimeout(() => {
            mediaRecorder.stop();
        }, 10000); 
    };

    const playAudio = () => {
        if (audioBlob) {
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioElement = new Audio(audioUrl);
            audioElement.play();
        }
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
            </div>
        </div>
    );
}

export default Page3;