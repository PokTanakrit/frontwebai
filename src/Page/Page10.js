import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Page.css';

function Page10() {
    // Define functions for handling speaking and typing actions
    const handleSpeak = () => {
        // Implement speech functionality
    };

    const handleType = () => {
        // Implement typing functionality
    };

    return (
        <div>
            <header>เคยมีประวัติเจ็บป่วยมาก่อนหรือไม่?</header>
            <div className="button-container">
                <button onClick={handleSpeak}>พูด</button>
                <span className="button-gap"></span> {/* Adding a space between buttons */}
                <Link to="/choosepage10"><button>เลือกคำตอบ</button></Link>
            </div>
        </div>
    );
}

export default Page10;
