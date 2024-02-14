import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Page.css';

function Page2() {
    // Define state for user ID

    return (
        // <div class="container">
        //     <div class="square">
        //         <div class="circle">10</div>
        //     </div>
        // </div>

        <div>
            <p>กรุณาเตรียมตอบคำถามต่อไปนี้ผ่านการพูดผ่านไมโครโฟนหรือแป้นพิมพ์</p>
            <Link to="/page3">
                <button>เริ่ม</button>
            </Link>
        </div>
    );
}

export default Page2;
