import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { AiFillSound } from "react-icons/ai";
import './Page.css';
import axios from 'axios';

function Page7() {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const mediaStream = useRef(null);
    const audioChunks = useRef([]);
    const [texttranscription, setTextTranscription] = useState('');
    const [audioURL, setAudioURL] = useState(null);

    const handleConfirm = () => {
        console.log(texttranscription); 
        axios.post('http://127.0.0.1:5000/answer', {
            ans5: texttranscription
        })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleCancel = () => {
    }
    const handleback = () => {  
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
    
            // ส่ง AudioBuffer ไปยัง API หรือทำประมวลผลเพิ่มเติมตามที่ต้องการ
            // ตัวอย่างเช่น ส่งข้อมูลผ่าน axios.post()
            const channelData = audioBuffer.getChannelData(0); // ดึงข้อมูลของช่องเสียงที่ 0
            console.log(channelData); // แสดงข้อมูลของช่องเสียงที่ 0 ทั้งหมด
            const response = await axios.post('http://127.0.0.1:5000/transcription', { audioData: channelData });
            setTextTranscription(response.data.transcribedText)
            console.log('Successfully sent audio data to server:', response.data.transcribedText);
        } catch (error) {
            console.error('Error converting audioBlob to audioBuffer:', error);
        }
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
                params: { key: 5 }
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
                            <div style={{ position: 'relative', left: '15px' }}>คำตอบ: {texttranscription}</div>
                        </div>
                        <div style={{ color: '#062D62' }}>มีกิจกรรมการออกกำลังกายอยู่ไหมคะ?</div>
                        <span className="button-gap"></span>
                        <span className="button-gap"></span>
                        <button onClick={playAudio}><AiFillSound  /></button>
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
                                <Link to="/page6"><button onClick={handleback} >ย้อนหลับ</button></Link>
                                <span className="button-gap"></span>
                                <span className="button-gap"></span>
                                <button onClick={handleCancel} style={{ background: '#ff5b5b'  }}>ยกเลิก</button>
                                <span className="button-gap"></span>
                                <span className="button-gap"></span>
                                <Link to="/choosepage7"><button>เลือกคำตอบ</button></Link>
                                <span className="button-gap"></span>
                                <span className="button-gap"></span>
                                <Link to="/page8"><button onClick={handleConfirm} style={{ background: '#C1FF72'  }}>ยืนยัน</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default Page7;
