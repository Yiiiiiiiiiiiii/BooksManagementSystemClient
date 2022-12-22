import React, { useEffect } from 'react'
import Topbar from "../common/Topbar/Topbar";
import Sidebar from "../common/Sidebar/idebar1"
import { useLocation } from 'react-router-dom';
export default function User() {
    let info = useLocation();
    useEffect(() => {
        // console.log(info.state.student_number);//登录页传过来的学号
        console.log(33333333333);
        
    }, [])
    return (
        <div>
            <Topbar></Topbar>
            <Sidebar></Sidebar>
        </div >
    )
}
