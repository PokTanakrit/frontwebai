import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import './Page.css';

function Page11() {
    const [symptoms, setSymptoms] = useState('');
    const [history, setHistory] = useState('');
    const [medication, setMedication] = useState('');
    const [drugAllergies, setDrugAllergies] = useState('');
    const [exercise, setExercise] = useState('');
    const [otherSymptoms, setOtherSymptoms] = useState('');
    const [impactOnDailyLife, setImpactOnDailyLife] = useState('');
    const [pastMedicalHistory, setPastMedicalHistory] = useState('');
    const [userId, setUserId] = useState(''); // Add userId state

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/data');
            const { ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8 } = response.data.answer;
            setSymptoms(ans1);
            setHistory(ans2);
            setMedication(ans3);
            setDrugAllergies(ans4);
            setExercise(ans5);
            setOtherSymptoms(ans6);
            setImpactOnDailyLife(ans7);
            setPastMedicalHistory(ans8);
            setUserId(response.data.userId); // Set userId state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleConfirm = () => {
    };
    const handleback = () => {
    };
    const handleCancel = () => {
    }

    return (
        <div>
            <header className="flex-container">
                <div className="circle grey"><span>1</span></div> 
                <div className="circle grey"><span>2</span></div> 
                <div className="circle blue"><span>3</span></div> 
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
                            <div style={{ position: 'relative', left: '15px' }}>อาการ: {symptoms}</div>
                            <div style={{ position: 'relative', left: '15px' }}>เป็นมา: {history}</div>
                            <div style={{ position: 'relative', left: '15px' }}>ทานยา: {medication}</div>
                            <div style={{ position: 'relative', left: '15px' }}>แพ้ยา: {drugAllergies}</div>
                            <div style={{ position: 'relative', left: '15px' }}>ออกกำลังกาย: {exercise}</div>
                            <div style={{ position: 'relative', left: '15px' }}>อาการอื่นๆ: {otherSymptoms}</div>
                            <div style={{ position: 'relative', left: '15px' }}>ส่งผลต่อชีวิตประจำวัน: {impactOnDailyLife}</div>
                        </div>
                        <div style={{ margin: '20px' }}>
                            <Link to="/page10"><button onClick={handleback} >ย้อนหลับ</button></Link>
                            <span className="button-gap"></span>
                            <span className="button-gap"></span>
                            <button onClick={handleCancel} style={{ background: '#ff5b5b'  }}>ยกเลิก</button>
                            <span className="button-gap"></span>
                            <span className="button-gap"></span>
                            <Link to="/page12"><button onClick={handleConfirm} style={{ background: '#C1FF72'  }}>ยืนยัน</button></Link>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default Page11;
