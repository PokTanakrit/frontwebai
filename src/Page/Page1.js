import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Page.css';

function Page1() {
    // Define state for user ID
    const [userId, setUserId] = useState('');

    // Event handler for input change
    const handleInputChange = (event) => {
        setUserId(event.target.value); // Update the user ID state
    };

    return (
        <div>
            <header>หมายเลขบัตรประชาชน</header>
            
            <input
                type="text"
                value={userId}
                onChange={handleInputChange}
            />
            <body><Link to="/page2"><button>ยืนยัน</button></Link></body>
        </div>
    );
}

export default Page1;
