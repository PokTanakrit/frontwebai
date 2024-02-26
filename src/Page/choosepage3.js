import React, { useState, useRef, useEffect } from 'react';
import './Page.css';
import Keyboard from './Keyboard'; // Import Keyboard component

function Pagechoose3() {
    const [selectedSymptoms, setSelectedSymptoms] = useState(new Set());
    const [otherSymptom, setOtherSymptom] = useState('');
    const [showKeyboard, setShowKeyboard] = useState(false);
    const keyboardRef = useRef(null);

    useEffect(() => {
        // Add event listener to handle clicks outside the keyboard
        const handleClickOutside = (event) => {
            if (keyboardRef.current && !keyboardRef.current.contains(event.target)) {
                setShowKeyboard(false);
            }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSymptomSelect = (symptom) => {
        const updatedSymptoms = new Set(selectedSymptoms);

        if (updatedSymptoms.has(symptom)) {
            updatedSymptoms.delete(symptom);
        } else {
            updatedSymptoms.add(symptom);
        }

        const updatedSymptomsString = Array.from(updatedSymptoms).join(", ");
        setOtherSymptom(updatedSymptomsString);

        setSelectedSymptoms(updatedSymptoms);

        if (symptom === "อื่นๆ") {
            setShowKeyboard(true);
        } else {
            setShowKeyboard(false);
        }
    };

    const handleConfirm = () => {
        const selectedSymptomsString = Array.from(selectedSymptoms).join(", ");
        console.log(selectedSymptomsString);
        setOtherSymptom(selectedSymptomsString);
    };

    const handleCancel = () => {
        setSelectedSymptoms(new Set());
        setOtherSymptom("");
    };

    const handleInputChange = (input) => {
        if (input === 'Backspace') {
            setOtherSymptom(prevUserId => prevUserId.slice(0, -1));
        } else {
            setOtherSymptom(prevUserId => prevUserId + input);
        }
    };

    const hideKeyboard = () => {
        setShowKeyboard(false);
    };

    return (
        <div>
            <header>ไม่ทราบว่าเป็นอะไรมา มีอาการอะไรบ้างคะ?</header>

            <div>
                <input type="text" value={otherSymptom} onChange={(event) => handleInputChange(event.target.value)} />
            </div>
            <div>
                {!selectedSymptoms.has("อื่นๆ") && (
                    <>
                        <button onClick={() => handleSymptomSelect("ปวดหัว")} className={selectedSymptoms.has("ปวดหัว") ? "selected" : ""}>ปวดหัว</button>
                        <button onClick={() => handleSymptomSelect("ปวดท้อง")} className={selectedSymptoms.has("ปวดท้อง") ? "selected" : ""}>ปวดท้อง</button>
                        <button onClick={() => handleSymptomSelect("ปวดตา")} className={selectedSymptoms.has("ปวดตา") ? "selected" : ""}>ปวดตา</button>
                        <button onClick={() => handleSymptomSelect("ปวดหลัง")} className={selectedSymptoms.has("ปวดหลัง") ? "selected" : ""}>ปวดหลัง</button>
                        <button onClick={() => handleSymptomSelect("เจ็บเข่า")} className={selectedSymptoms.has("เจ็บเข่า") ? "selected" : ""}>เจ็บเข่า</button>
                        <button onClick={() => handleSymptomSelect("เป็นหวัด")} className={selectedSymptoms.has("เป็นหวัด") ? "selected" : ""}>เป็นหวัด</button>
                        <button onClick={() => handleSymptomSelect("เกี่ยวกับหัวใจ")} className={selectedSymptoms.has("เกี่ยวกับหัวใจ") ? "selected" : ""}>เกี่ยวกับหัวใจ</button>
                        <button onClick={() => handleSymptomSelect("อื่นๆ")} className={selectedSymptoms.has("อื่นๆ") ? "selected" : ""}>อื่นๆ</button>
                    </>
                )}
                <button onClick={handleConfirm}>ยืนยัน</button>
                {showKeyboard && <Keyboard handleKeyClick={handleInputChange} ref={keyboardRef} />}
                {showKeyboard && <button onClick={hideKeyboard}>ปิดคีย์บอร์ด</button>}
            </div>
            <div className="button-container">
                <button onClick={handleConfirm}>ยืนยัน</button>
                <span className="button-gap"></span>
                <button onClick={handleCancel}>ยกเลิก</button>
            </div>
        </div>
    );
}

export default Pagechoose3;
