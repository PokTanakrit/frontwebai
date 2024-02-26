import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './Page.css';

function Page3() {
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);

    const handleSpeak = () => {
        alert("กำลังบันทึกเสียง...");
        startRecording();
    };

    const startRecording = () => {
        setIsRecording(true);
        SpeechRecognition.startListening();
    };

    const stopRecording = () => {
        setIsRecording(false);
        SpeechRecognition.stopListening();
    };

    const playAudio = () => {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioElement = new Audio(audioUrl);
        audioElement.play();
    };

    const handleDownload = () => {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioElement = document.createElement('a');
        audioElement.href = audioUrl;
        audioElement.download = 'recorded_audio.wav';
        audioElement.click();
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
                <button onClick={handleDownload} disabled={!audioBlob}>ดาวน์โหลดเสียงที่บันทึกไว้</button>
                <span className="button-gap"></span>
                <Link to="/choosepage3"><button>เลือกคำตอบ</button></Link>
            </div>
            <p>{transcript}</p>
        </div>
    );
}

export default Page3;
