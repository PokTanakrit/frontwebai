import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Page.css';

function Page8() {
    // Define functions for handling speaking and typing actions
    const handleSpeak = () => {
        // Implement speech functionality
    };

    const handleType = () => {
        // Implement typing functionality
    };

    return (
        <div>
            <header>มีอาการอื่นๆ ร่วมด้วยหรือไม่?</header>
            <div className="button-container">
                <button onClick={handleSpeak}>พูด</button>
                <span className="button-gap"></span> {/* Adding a space between buttons */}
                <Link to="/choosepage8"><button>เลือกคำตอบ</button></Link>
            </div>
        </div>
    );
}

export default Page8;
