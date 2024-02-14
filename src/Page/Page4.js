import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Page.css';

function Page4() {
    // Define functions for handling speaking and typing actions
    const handleSpeak = () => {
        // Implement speech functionality
    };

    const handleType = () => {
        // Implement typing functionality
    };

    return (
        <div>
            <header>เป็นมากี่วันแล้วคะ มีอาการตั้งแต่เมื่อไหร่คะ?</header>
            <div className="button-container">
                <button onClick={handleSpeak}>พูด</button>
                <span className="button-gap"></span> {/* Adding a space between buttons */}
                <Link to="/choosepage4"><button>เลือกคำตอบ</button></Link>
            </div>
        </div>
    );
}

export default Page4;
