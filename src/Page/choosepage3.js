import React, { useState } from 'react';
import './Page.css';

function Pagechoose3() {
    // Define state to store selected symptoms
    const [selectedSymptoms, setSelectedSymptoms] = useState(new Set());

    // Function to handle symptom selection
    const handleSymptomSelect = (symptom) => {
        // Create a new Set based on the current selected symptoms
        const updatedSymptoms = new Set(selectedSymptoms);

        // Toggle selection status
        if (updatedSymptoms.has(symptom)) {
            updatedSymptoms.delete(symptom); // Remove symptom if already selected
        } else {
            updatedSymptoms.add(symptom); // Add symptom if not selected
        }

        // Update the state with the new set of selected symptoms
        setSelectedSymptoms(updatedSymptoms);
    };

    // Function to handle confirmation
    const handleConfirm = () => {
        // Convert Set to array and join into a single string
        const selectedSymptomsString = Array.from(selectedSymptoms).join(", ");
        console.log(selectedSymptomsString);
        // Do something with selected symptoms
    };

    // Function to handle cancellation
    const handleCancel = () => {
        // Clear all selected symptoms
        setSelectedSymptoms(new Set());
    };

    return (
        <div>
            <header>ไม่ทราบว่าเป็นอะไรมา มีอาการอะไรบ้างคะ?</header>
            <div>
                <button onClick={() => handleSymptomSelect("ปวดหัว")} className={selectedSymptoms.has("ปวดหัว") ? "selected" : ""}>ปวดหัว</button>
                <button onClick={() => handleSymptomSelect("ปวดท้อง")} className={selectedSymptoms.has("ปวดท้อง") ? "selected" : ""}>ปวดท้อง</button>
                <button onClick={() => handleSymptomSelect("ปวดตา")} className={selectedSymptoms.has("ปวดตา") ? "selected" : ""}>ปวดตา</button>
                <button onClick={() => handleSymptomSelect("ปวดหลัง")} className={selectedSymptoms.has("ปวดหลัง") ? "selected" : ""}>ปวดหลัง</button>
                <button onClick={() => handleSymptomSelect("เจ็บเข่า")} className={selectedSymptoms.has("เจ็บเข่า") ? "selected" : ""}>เจ็บเข่า</button>
                <button onClick={() => handleSymptomSelect("เป็นหวัด")} className={selectedSymptoms.has("เป็นหวัด") ? "selected" : ""}>เป็นหวัด</button>
                <button onClick={() => handleSymptomSelect("เกี่ยวกับหัวใจ")} className={selectedSymptoms.has("เกี่ยวกับหัวใจ") ? "selected" : ""}>เกี่ยวกับหัวใจ</button>
                <button onClick={() => handleSymptomSelect("อื่นๆ")} className={selectedSymptoms.has("อื่นๆ") ? "selected" : ""}>อื่นๆ</button>
            </div>
            <div className="button-container">
                <button onClick={handleConfirm}>ยืนยัน</button>
                <span className="button-gap"></span> {/* Adding a space between buttons */}
                <button onClick={handleCancel}>ยกเลิก</button>
            </div>
        </div>
    );
}

export default Pagechoose3;
