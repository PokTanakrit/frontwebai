import React from 'react';
import { Link } from 'react-router-dom';
import './Page.css';
import axios from 'axios';
function Page2() {

    const handlestart = () => {
        axios.post('http://127.0.0.1:5000/postquestion', {
        })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    return (
        <div className="center-container">
            <p className="center-text">กรุณาเตรียมตอบคำถามต่อไปนี้ผ่านการพูดผ่านไมโครโฟนหรือแป้นพิมพ์</p>
                <Link to="/page3"><button onClick={handlestart}>เริ่ม</button></Link>
        </div>
    );
}

export default Page2;
