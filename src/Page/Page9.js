import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Page.css';

function Page9() {
    // Define functions for handling speaking and typing actions
    const handleSpeak = () => {
        // Implement speech functionality
    };

    const handleType = () => {
        // Implement typing functionality
    };

    return (
        <div>
            <header>มีอาการรุนแรงหรือส่งผลต่อชีวิตประจำวันหรือไม่?</header>
            <div className="button-container">
                <button onClick={handleSpeak}>พูด</button>
                <span className="button-gap"></span> {/* Adding a space between buttons */}
                <Link to="/choosepage9"><button>เลือกคำตอบ</button></Link>
            </div>
        </div>
    );
}

export default Page9;
