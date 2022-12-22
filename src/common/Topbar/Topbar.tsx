import React, { useEffect, useState } from 'react'
import "../../common/common.css"
import './Topbar.css'
import http from "../../Lib/http"
import { useNavigate } from "react-router-dom"
export default function Topbar() {
    let navigate = useNavigate();
    let [headimg, setheadimg] = useState("");
    let student_number = sessionStorage.getItem("student_number");

    // 显示头像操作
    useEffect(() => {
        // 发起请求拿用户所有的数据
        http.get(`/lmfgetuserinfo?student_number=${student_number}`)
            .then(function (response) {
                setheadimg(response.data.data.avater);//设置头像
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    // 退出登录操作
    let exit = () => {
        sessionStorage.removeItem("student_number");
        sessionStorage.removeItem("isadministrator");
        // 发起请求清除后端存储的账号
        http.get("/lmfexit")
            .then(function (response) {
                console.log(response.data.code);
                if (response.data.code == 1) {
                    navigate({ pathname: '/' });//清除成功后跳转到登录页面
                }
            })
            .catch(function (error) {
            });

    }
    let fn=()=>{
        let num=window.sessionStorage.getItem("isadministrator")
        if(num =="1"){
            navigate('/userindex/map')
        }else if(num =="0")
            navigate('/adminindex/map')
    }
    return (
        <div id='top'>
            <div className='topbarleft'>
                <span className='name'>
                    高校图书管理系统
                </span>
            </div>
            <div className='topbarright'>
                <div className='map'>

                    <svg className="icon" aria-hidden="true" onClick={fn}>
                        <use xlinkHref="#icon-ditu" ></use>
                    </svg>

                </div>
                <div className='headImg' >
                    <img src={headimg} alt="" />
                </div>

                <div className='outofLogin'>
                    <p onClick={exit}>退出登录</p>
                </div>
            </div>

        </div>


    )
}

