import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillSound } from "react-icons/ai";
import './Page.css';
import Keyboard from './Keyboard'; // Import Keyboard component
import axios from 'axios'; 

function Pagechoose4() {
    // Define state to store selected symptoms
    const [selectedSymptoms, setSelectedSymptoms] = useState(new Set());
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
    
        // Check if the symptom is already selected
        const isSelected = updatedSymptoms.has(symptom);
    
        // Clear all selected symptoms
        updatedSymptoms.clear();
    
        // If the symptom was not selected before, select it
        if (!isSelected) {
            updatedSymptoms.add(symptom);
        }
    
        // Update the state with the new set of selected symptoms
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
        console.log(selectedSymptoms); 
        
        // ส่งคำตอบ otherSymptom ไปยัง URL http://localhost:5000/answer
        axios.post('http://127.0.0.1:5000/answer', {
            ans2: Array.from(selectedSymptoms).join('')
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
    };

    const handleInputChange = (input) => {
        if (input === 'Backspace') {
            selectedSymptoms(prevSymptom => prevSymptom.slice(0, -1));
        } else {
            selectedSymptoms(prevSymptom => prevSymptom + input);
        }
    };

    const hideKeyboard = () => {
        setShowKeyboard(false);
    };

    const audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
        // เล่นเสียง
    const playAudio = async () => {
        try {
            // เรียกใช้ฟังก์ชัน handleFetchAudio เพื่อรับข้อมูลเสียง
            const audioData = await handleFetchAudio();
            
            // ถ้าไม่มีข้อมูลเสียงให้หยุดฟังก์ชัน
            if (!audioData) return;

            // สร้าง AudioBuffer
            const audioBuffer = audioContext.createBuffer(1, audioData[0].length, 16000);
            const channelData = audioBuffer.getChannelData(0);
            
            // นำข้อมูลเสียงลงใน AudioBuffer
            for (let i = 0; i < audioData[0].length; i++) {
                channelData[i] = audioData[0][i];
            }
            
            // สร้าง BufferSource และเล่นเสียง
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start();
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    // รับข้อมูลเสียงจากเซิร์ฟเวอร์
    const handleFetchAudio = async () => {
        try {
            // ทำการเรียกใช้งาน API เพื่อรับข้อมูลเสียง
            const response = await axios.get('http://127.0.0.1:5000/audioques', {
                params: { key: 2 }
            });
            const audioData = response.data;
            
            // ส่งข้อมูลเสียงกลับ
            return audioData;
        } catch (error) {
            console.error('Error fetching audio:', error);
            return null;
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
                            <div style={{ position: 'relative', left: '15px' }}>คำตอบ: {selectedSymptoms}</div>
                        </div>
                        <div style={{ color: '#062D62' }}>เป็นมากี่วันแล้วคะ มีอาการตั้งแต่เมื่อไหร่คะ?</div>
                        <span className="button-gap"></span>
                        <span className="button-gap"></span>
                        <button onClick={playAudio}><AiFillSound  /></button>
                        <div className="center-container">
                            <div className="button-container" >
                                <button onClick={() => handleSymptomSelect("แสดงอาการน้อยกว่า 7 วัน")} className={selectedSymptoms.has("แสดงอาการน้อยกว่า 7 วัน") ? "selected" : ""}>แสดงอาการน้อยกว่า 7 วัน</button>
                                <span className="button-gap"></span>
                                <button onClick={() => handleSymptomSelect("แสดงอาการน้อยกว่า 14 วัน")} className={selectedSymptoms.has("แสดงอาการน้อยกว่า 14 วัน") ? "selected" : ""}>แสดงอาการน้อยกว่า 14 วัน</button>
                                <span className="button-gap"></span>
                                <button onClick={() => handleSymptomSelect("แสดงอาการน้อยกว่า 1 เดือน")} className={selectedSymptoms.has("แสดงอาการน้อยกว่า 1 เดือน") ? "selected" : ""}>แสดงอาการน้อยกว่า 1 เดือน</button>
                                <span className="button-gap"></span>
                                <button onClick={() => handleSymptomSelect("แสดงอาการมากกว่า 1 เดือน")} className={selectedSymptoms.has("แสดงอาการมากกว่า 1 เดือน") ? "selected" : ""}>แสดงอาการมากกว่า 1 เดือน</button>
                                <span className="button-gap"></span>
                                <button onClick={() => handleSymptomSelect("อื่นๆ,")} className={selectedSymptoms.has("อื่นๆ,") ? "selected" : ""}>อื่นๆ</button>
                                {showKeyboard && <button onClick={hideKeyboard}>ปิดคีย์บอร์ด</button>}
                                {showKeyboard && <Keyboard handleKeyClick={handleInputChange} ref={keyboardRef} />}
                            </div>
                            <div style={{ margin: '20px' }}>
                                <button onClick={handleCancel} style={{ background: '#ff5b5b'  }}>ยกเลิก</button>
                                <span className="button-gap"></span>
                                <span className="button-gap"></span>
                                <Link to="/page4"><button>พูดคำตอบ</button></Link>
                                <span className="button-gap"></span>
                                <span className="button-gap"></span>
                                <Link to="/page5"><button onClick={handleConfirm} style={{ background: '#C1FF72'  }}>ยืนยัน</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}
export default Pagechoose4;
