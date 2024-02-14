import React, { useState } from 'react';
import './Page.css';

function Pagechoose9() {
    // Define state to store selected symptom
    const [Selected, setSelected] = useState('');

    // Function to handle symptom selection
    const handleSelect = (symptom) => {
        // Update the state with the selected symptom
        setSelected(symptom);
    };

    // Function to handle confirmation
    const handleConfirm = () => {
        // Do something with the selected symptom
        console.log(Selected);
    };

    // Function to handle cancellation
    const handleCancel = () => {
        // Clear the selected symptom
        setSelected('');
    };

    return (
        <div>
            <header>มีอาการรุนแรงหรือส่งผลต่อชีวิตประจำวันหรือไม่?</header>
            <div>
                <button onClick={() => handleSelect("ส่งผลต่อชีวิตประจำวัน")} className={Selected === "ส่งผลต่อชีวิตประจำวัน" ? "selected" : ""}>ส่งผลต่อชีวิตประจำวัน</button>
                <button onClick={() => handleSelect("ไม่ส่งผลต่อชีวิตประจำวัน")} className={Selected === "ไม่ส่งผลต่อชีวิตประจำวัน" ? "selected" : ""}>ไม่ส่งผลต่อชีวิตประจำวัน</button>
            </div>
            <div className="button-container">
                <button onClick={handleConfirm}>ยืนยัน</button>
                <span className="button-gap"></span> {/* Adding a space between buttons */}
                <button onClick={handleCancel}>ยกเลิก</button>
            </div>
        </div>
    );
}

export default Pagechoose9;
