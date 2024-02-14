import React, { useState } from 'react';
import './Page.css';

function Pagechoose4() {
    // Define state to store selected symptom
    const [SelectedDay, setSelectedDay] = useState('');

    // Function to handle symptom selection
    const handleDaySelect = (symptom) => {
        // Update the state with the selected symptom
        setSelectedDay(symptom);
    };

    // Function to handle confirmation
    const handleConfirm = () => {
        // Do something with the selected symptom
        console.log(SelectedDay);
    };

    // Function to handle cancellation
    const handleCancel = () => {
        // Clear the selected symptom
        setSelectedDay('');
    };

    return (
        <div>
            <header>เป็นมากี่วันแล้วคะ มีอาการตั้งแต่เมื่อไหร่คะ?</header>
            <div>
                <button onClick={() => handleDaySelect("แสดงอาการน้อยกว่า 7 วัน")} className={SelectedDay === "แสดงอาการน้อยกว่า 7 วัน" ? "selected" : ""}>แสดงอาการน้อยกว่า 7 วัน</button>
                <button onClick={() => handleDaySelect("แสดงอาการมากกว่า 7 วัน")} className={SelectedDay === "แสดงอาการมากกว่า 7 วัน" ? "selected" : ""}>แสดงอาการมากกว่า 7 วัน</button>
            </div>
            <div className="button-container">
                <button onClick={handleConfirm}>ยืนยัน</button>
                <span className="button-gap"></span> {/* Adding a space between buttons */}
                <button onClick={handleCancel}>ยกเลิก</button>
            </div>
        </div>
    );
}

export default Pagechoose4;
