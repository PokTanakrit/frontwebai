import React, { useState } from 'react';
import './Page.css';

function Pagechoose5() {
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
            <header>ได้ทานยาอะไรมาบ้างคะ?</header>
            <div>
                <button onClick={() => handleSelect("ได้ทานมา")} className={Selected === "ได้ทานมา" ? "selected" : ""}>ได้ทานมา</button>
                <button onClick={() => handleSelect("ไม่ได้ทานมา")} className={Selected === "ไม่ได้ทานมา" ? "selected" : ""}>ไม่ได้ทานมา</button>
            </div>
            <div className="button-container">
                <button onClick={handleConfirm}>ยืนยัน</button>
                <span className="button-gap"></span> {/* Adding a space between buttons */}
                <button onClick={handleCancel}>ยกเลิก</button>
            </div>
        </div>
    );
}

export default Pagechoose5;
