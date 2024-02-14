import React, { useState } from 'react';
import './Page.css';

function Pagechoose6() {
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
            <header>เคยแพ้ยาอะไรบ้างคะ?</header>
            <div>
                <button onClick={() => handleSelect("เคยแพ้ยา")} className={Selected === "เคยแพ้ยา" ? "selected" : ""}>เคยแพ้ยา</button>
                <button onClick={() => handleSelect("ไม่เคยแพ้ยา")} className={Selected === "ไม่เคยแพ้ยา" ? "selected" : ""}>ไม่เคยแพ้ยา</button>
            </div>
            <div className="button-container">
                <button onClick={handleConfirm}>ยืนยัน</button>
                <span className="button-gap"></span> {/* Adding a space between buttons */}
                <button onClick={handleCancel}>ยกเลิก</button>
            </div>
        </div>
    );
}

export default Pagechoose6;
