import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillSound } from "react-icons/ai";
import './Page.css';
import Keyboard from './Keyboard'; // Import Keyboard component
import axios from 'axios'; 

function Pagechoose10() {
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

    const handleSymptomSelect = (symptom) => {
        // Create a new Set based on the current selected symptoms
        const updatedSymptoms = new Set(selectedSymptoms);
        // Toggle selection status
        if (updatedSymptoms.has(symptom)) {
            updatedSymptoms.delete(symptom); // Remove symptom if already selected
        }else{
            updatedSymptoms.add(symptom); // Add symptom if not selected
        }
        setOtherSymptom(updatedSymptoms);


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
            ans8: otherSymptom
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
            const audioData = response.data.question[8].audio;
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
                        <div style={{ color: '#062D62' }}>เคยมีประวัติเจ็บป่วยมาก่อนหรือไม่?</div>
                        <span className="button-gap"></span>
                        <span className="button-gap"></span>
                        <button onClick={playAudio}><AiFillSound  /></button>
                        <div className="center-container">
                            <div className="button-container">
                                <button onClick={() => handleSymptomSelect("เคยเป็นมาก่อน")} className={selectedSymptoms.has("เคยเป็นมาก่อน") ? "selected" : ""}>เคยเป็นมาก่อน</button>
                                <span className="button-gap"></span>
                                <button onClick={() => handleSymptomSelect("ไม่เคยเป็นมาก่อน")} className={selectedSymptoms.has("ไม่เคยเป็นมาก่อน") ? "selected" : ""}>ไม่เคยเป็นมาก่อน</button>
                                <button onClick={() => handleSymptomSelect("อื่นๆ,")} className={selectedSymptoms.has("อื่นๆ,") ? "selected" : ""}>อื่นๆ</button>
                                {showKeyboard && <button onClick={hideKeyboard}>ปิดคีย์บอร์ด</button>}
                                {showKeyboard && <Keyboard handleKeyClick={handleInputChange} ref={keyboardRef} />}
                                
                            </div>
                            <div style={{ margin: '20px' }}>
                                <button onClick={handleCancel} style={{ background: '#ff5b5b'  }}>ยกเลิก</button>
                                <span className="button-gap"></span>
                                <span className="button-gap"></span>
                                <Link to="/page10"><button>พูดคำตอบ</button></Link>
                                <span className="button-gap"></span>
                                <span className="button-gap"></span>
                                <Link to="/page11"><button onClick={handleConfirm} style={{ background: '#C1FF72'  }}>ยืนยัน</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}
export default Pagechoose10;
