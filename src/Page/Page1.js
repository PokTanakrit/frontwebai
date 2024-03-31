import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { downloadWav } from 'webm-to-wav-converter';
import './form.css';
import './Page.css';
import axios from 'axios'; 

function Page1() {
    const [userId, setUserId] = useState(''); // สร้าง state สำหรับเก็บข้อมูลผู้ใช้
    const [SYS , setSYS] = useState('') //ความดันสูงสุด
    const [DIA , setDIA] = useState('') //ความดันต่ำสุด
    const [PUL , setPUL] = useState('') //อัตราการเต้นของหัวใจ
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const mediaStream = useRef(null);
    const audioChunks = useRef([]);
    const [texttranscription, setTextTranscription] = useState('');
    const [audioURL, setAudioURL] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const handleConfirm = () => {
        console.log(userId); 
    
        axios.post('http://127.0.0.1:5000/PID', {
            PID: userId,
        })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleCancel = () => {
        setUserId('');
        setSYS('');
        setDIA('');
        setPUL('');
    }

    const startRecording = async () => {
        try {
            mediaStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(mediaStream.current);
            mediaRecorder.ondataavailable = (e) => {
                audioChunks.current.push(e.data);
            };
            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
                sendAudioToAPI(audioBlob);
                audioChunks.current = [];
            };
            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = () => {
        setIsRecording(false);
        if (mediaStream.current) {
            mediaStream.current.getTracks().forEach(track => track.stop());
        }
    };

    const sendAudioToAPI = async (audioBlob) => {
        try {
            // สร้าง FileReader เพื่ออ่านข้อมูลจาก AudioBlob เป็น ArrayBuffer
            const arrayBuffer = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsArrayBuffer(audioBlob);
            });
    
            // สร้าง AudioContext เพื่อใช้ในการแปลง ArrayBuffer เป็น AudioBuffer
            const audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
            const audioBuffer = await new Promise((resolve, reject) => {
                // ใช้ decodeAudioData เพื่อแปลง ArrayBuffer เป็น AudioBuffer
                audioContext.decodeAudioData(arrayBuffer, resolve, reject);
            });
            // console.log('Successfully converted audioBlob to audioBuffer:', audioBuffer);
            // ส่ง AudioBuffer ไปยัง API หรือทำประมวลผลเพิ่มเติมตามที่ต้องการ
            // ตัวอย่างเช่น ส่งข้อมูลผ่าน axios.post()
            const channelData = audioBuffer.getChannelData(0); // ดึงข้อมูลของช่องเสียงที่ 0
            console.log(channelData); // แสดงข้อมูลของช่องเสียงที่ 0 ทั้งหมด
            const response = await axios.post('http://127.0.0.1:5000/transcription', { audioData: channelData });

            const responseText = response.data.transcribedText; // สมมติว่า response.data เป็น { transcribedText: "หนึ่ง สอง สาม" }

            // แยกข้อความเป็นคำๆ โดยใช้ช่องว่างเป็นตัวแยก
            const words = responseText.split(' ');

            // วนลูปผ่านคำแต่ละคำในข้อความ
            let convertedNumbers = [];
            for (let i = 0; i < words.length; i++) {
                // แปลงคำให้เป็นตัวเลข
                const number = convertWordToNumber(words[i]);
                // ทำสิ่งที่ต้องการกับตัวเลขที่ได้
                // เก็บตัวเลขในอาร์เรย์ convertedNumbers
                convertedNumbers.push(number);
            }

            // แปลงอาร์เรย์ของตัวเลขเป็นข้อความแล้วรวมกันเป็น string
            const userIdString = convertedNumbers.join('');
            
            // อัพเดท state userId ด้วยข้อความที่ได้จากการแปลง
            setUserId(userIdString);
            console.log('Successfully sent audio data to server:', userIdString);
        } catch (error) {
            console.error('Error converting audioBlob to audioBuffer:', error);
        }
    };
    

    // ฟังก์ชันสำหรับแปลงคำเป็นตัวเลข
    function convertWordToNumber(word) {
        switch (word) {
            case "ศูนย์":
                return 0;
            case "หนึ่ง":
                return 1;
            case "สอง":
                return 2;
            case "สาม":
                return 3;
            case "สี่":
                return 4;
            case "ห้า":
                return 5;
            case "หก":
                return 6;
            case "เจ็ด":
                return 7;
            case "แปด":
                return 8;
            case "เก้า":
                return 9;
            // สามารถเพิ่ม case ของคำอื่นๆ ตามต้องการ
            default:
                return -1; // ค่าเริ่มต้นเป็น -1 หรืออื่นๆ ตามต้องการ
        }
    }

    
    
    
    
    return (
        <div>
            <header className="flex-container">
                <div className="circle blue"><span>1</span></div> 
                <div className="circle white"><span>2</span></div> 
                <div className="circle white"><span>3</span></div> 
            </header>
            <body>
                <div className='panelmain'>
                    <div className="panelcontainer"> 
                        <div style={{ color: '#062D62' }}>หมายเลขบัตรประจำตัวโรงพยาบาล</div>
                        <div className="paneldisplay">
                            <div style={{ position: 'relative', left: '15px' }}>PID: {userId}</div>
                            <div style={{ position: 'relative', left: '15px' }}>ความดันสูงสุด:</div>
                            <div style={{ position: 'relative', left: '15px' }}>ความดันต่ำสุด:</div>
                            <div style={{ position: 'relative', left: '15px' }}>อัตราการเต้นของหัวใจ:</div>
                        </div>
                        <div className="center-container">
                            <div className="button-container">
                                <div>
                                    <FontAwesomeIcon
                                        icon={isRecording ? faStopCircle : faMicrophone}
                                        style={{ cursor: 'pointer' }}
                                        size="6x"
                                        onClick={isRecording ? stopRecording : startRecording}
                                    />
                                </div>
                            </div>
                            <div style={{ margin: '20px' }}>
                                <button onClick={handleCancel} style={{ background: '#ff5b5b'  }}>ยกเลิก</button>
                                <span className="button-gap"></span>
                                <span className="button-gap"></span>
                                <Link to="/page2"><button onClick={handleConfirm} style={{ background: '#C1FF72'  }}>ยืนยัน</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default Page1;
