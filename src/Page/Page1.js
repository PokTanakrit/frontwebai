import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Keyboard from './Keyboard'; // เรียกใช้ Component ของคีย์บอร์ด
import './form.css';
import './Page.css';
import axios from 'axios'; 
function Page1() {
    const [userId, setUserId] = useState(''); // สร้าง state สำหรับเก็บข้อมูลผู้ใช้

    // เมื่อมีการเปลี่ยนแปลงใน userId ให้แสดงผลลัพธ์
    const handleInputChange = (input) => {
        if (input === 'Backspace') {
            // Remove the last character from the userId
            setUserId(userId => userId.slice(0, -1));
        } else {
            // Concatenate the input with the current userId and update the state
            setUserId(userId => userId + input);
        }
        // console.log(userId)
    };

    //API

    const handleConfirm = () => {
        // Do something with selected symptoms
        console.log(userId); 
    
        // ส่งคำตอบ otherSymptom ไปยัง URL http://localhost:5000/data
        axios.post('http://localhost:5000/PID', {
            PID: userId,
        })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };



    return (
        <div>
            <header style={{ textAlign: 'center' }}>หมายเลขบัตรประชาชน</header>
            <div className="input-container">
            <input
                type="text"
                value={userId}
            /> 
            </div>
            <div className="center-container">
               <Link to="/page2"><button onClick={handleConfirm}>ยืนยัน</button></Link>
               <Keyboard handleKeyClick={handleInputChange} />   
            </div>
        </div>
    );
}

export default Page1;
