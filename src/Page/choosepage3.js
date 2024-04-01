import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillSound } from "react-icons/ai";
import './Page.css';
import Keyboard from './Keyboard'; // Import Keyboard component
import axios from 'axios'; 

function Pagechoose3() {
    // Define state to store selected symptoms
    const [selectedSymptoms, setSelectedSymptoms] = useState(new Set());
    const [otherSymptom, setOtherSymptom] = useState('');
    const [showKeyboard, setShowKeyboard] = useState(false);
    const keyboardRef = useRef(null);
    const [audioURL, setAudioURL] = useState(null);

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

    // Function to handle symptom selection
    const handleSymptomSelect = (symptom) => {
        // Create a new Set based on the current selected symptoms
        const updatedSymptoms = new Set(selectedSymptoms);

        // Toggle selection status
        if (updatedSymptoms.has(symptom)) {
            updatedSymptoms.delete(symptom); // Remove symptom if already selected
            updatedSymptoms.delete(symptom);
        } else {
            updatedSymptoms.add(symptom); // Add symptom if not selected
            updatedSymptoms.add(symptom);
        }

        // Update the state with the new set of selected symptoms
        const updatedSymptomsString = Array.from(updatedSymptoms).join(", ");
        setOtherSymptom(updatedSymptomsString);

        setSelectedSymptoms(updatedSymptoms);

        if (symptom === "อื่นๆ,") {
            setShowKeyboard(true);
        } else {
            setShowKeyboard(false);
        }
    };



    //API
    // Function to handle confirmation
    const handleConfirm = () => {
        hideKeyboard(); 
        // Do something with selected symptoms
        console.log(otherSymptom); 
        
        // ส่งคำตอบ otherSymptom ไปยัง URL http://localhost:5000/answer
        axios.post('http://127.0.0.1:5000/answer', {
            ans1: otherSymptom
        })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };


    // Function to handle cancellation
    const handleCancel = () => {
        // Clear all selected symptoms
        setSelectedSymptoms(new Set());
        setOtherSymptom("");
    };

    const handleInputChange = (input) => {
        if (input === 'Backspace') {
            setOtherSymptom(prevSymptom => prevSymptom.slice(0, -1));
        } else {
            setOtherSymptom(prevSymptom => prevSymptom + input);
        }
    };

    const hideKeyboard = () => {
        setShowKeyboard(false);
    };

    const playAudio = async () => {
        if (!audioURL) {
            await handleFetchAudio();
        }
        if (audioURL) {
            const audio = new Audio(audioURL);
            audio.volume = 0.35; // กำหนดระดับเสียงเป็น 80%
            audio.play();
        }
    };

    const base64ToBlob = (base64, contentType) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    };

    const handleFetchAudio = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/data');
            const audioData = response.data.question[1].audio;
            console.log(audioData);
            // Create a Blob object from the base64 string
            const blob = base64ToBlob(audioData, 'audio/wav');

            // Create a URL for the Blob object
            const audioURL = URL.createObjectURL(blob);

            // Set the audio URL to state
            setAudioURL(audioURL);
        } catch (error) {
            console.error('Error fetching audio:', error);
        }
    };

    return (
        <div>
            <header className="flex-container">
                <div className="circle grey"><span>1</span></div> 
                <div className="circle blue"><span>2</span></div> 
                <div className="circle white"><span>3</span></div> 
            </header>
            <body>
                <div className='panelmain'>
                    <div className="panelcontainer"> 
                        
                        <div className="paneldisplay">
                            <div style={{ position: 'relative', left: '15px' }}>คำตอบ: {otherSymptom}</div>
                        </div>
                        <div style={{ color: '#062D62' }}>ไม่ทราบว่าเป็นอะไรมา มีอาการอะไรบ้างคะ?</div>
                        <span className="button-gap"></span>
                        <span className="button-gap"></span>
                        <button onClick={playAudio}><AiFillSound  /></button>
                        <div className="center-container">
                            <div className="button-container" >
                                <button onClick={() => handleSymptomSelect("ปวดหัว")} className={selectedSymptoms.has("ปวดหัว") ? "selected" : ""}>ปวดหัว</button>
                                <span className="button-gap"></span>
                                <button onClick={() => handleSymptomSelect("ปวดท้อง")} className={selectedSymptoms.has("ปวดท้อง") ? "selected" : ""}>ปวดท้อง</button>
                                <span className="button-gap"></span>
                                <button onClick={() => handleSymptomSelect("ปวดตา")} className={selectedSymptoms.has("ปวดตา") ? "selected" : ""}>ปวดตา</button>
                                <span className="button-gap"></span>
                                <button onClick={() => handleSymptomSelect("ปวดหลัง")} className={selectedSymptoms.has("ปวดหลัง") ? "selected" : ""}>ปวดหลัง</button>
                                <span className="button-gap"></span>
                                <button onClick={() => handleSymptomSelect("เจ็บเข่า")} className={selectedSymptoms.has("เจ็บเข่า") ? "selected" : ""}>เจ็บเข่า</button>
                                <span className="button-gap"></span>
                                <button onClick={() => handleSymptomSelect("เป็นหวัด")} className={selectedSymptoms.has("เป็นหวัด") ? "selected" : ""}>เป็นหวัด</button>
                                <span className="button-gap"></span>
                                <button onClick={() => handleSymptomSelect("เกี่ยวกับหัวใจ")} className={selectedSymptoms.has("เกี่ยวกับหัวใจ") ? "selected" : ""}>เกี่ยวกับหัวใจ</button>
                                <span className="button-gap"></span>
                                <button onClick={() => handleSymptomSelect("อื่นๆ,")} className={selectedSymptoms.has("อื่นๆ,") ? "selected" : ""}>อื่นๆ</button>
                                {showKeyboard && <button onClick={hideKeyboard}>ปิดคีย์บอร์ด</button>}
                                {showKeyboard && <Keyboard handleKeyClick={handleInputChange} ref={keyboardRef} />}
                                
                            </div>
                            <div style={{ margin: '20px' }}>
                                <button onClick={handleCancel} style={{ background: '#ff5b5b'  }}>ยกเลิก</button>
                                <span className="button-gap"></span>
                                <span className="button-gap"></span>
                                <Link to="/page3"><button>พูดคำตอบ</button></Link>
                                <span className="button-gap"></span>
                                <span className="button-gap"></span>
                                <Link to="/page4"><button onClick={handleConfirm} style={{ background: '#C1FF72'  }}>ยืนยัน</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default Pagechoose3;
