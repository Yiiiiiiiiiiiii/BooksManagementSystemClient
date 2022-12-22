import React, { useState, useEffect } from 'react'
import { Radio } from 'antd';
// import UserSheet from "./ucenter.module.css"
import "./ucenter.css"
import http from "../../../../Lib/http"

export default function Registerbox(props) {
    let [username, setusername] = useState("在这里输入昵称")
    let [pwd, setpwd] = useState("请输入密码")
    let [age, setage] = useState("18282832341")
    let [bgi, setbgi] = useState("http://localhost:7001/public/2.webp")
    let [f, setf] = useState();
    // 单选框 性别
    const [value, setValue] = useState('0');
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    useEffect(() => {
        http.post("/getstudentinfo", {
            student_number: sessionStorage.getItem("student_number")
        }).then((res) => {
            console.log(res, "学生信息表");
            // console.log(res.data[0].username)
            setusername(res.data[0].username);
            setpwd(res.data[0].password);
            setage(res.data[0].age);
            setValue(res.data[0].sex)
            setbgi(res.data[0].avater);
        }).then((error) => {
            console.log(error)
        })
    }, [])


    let settouxiang = (e) => {
        let file = e.target.files[0]
        setf(file)
        let url = window.URL.createObjectURL(file)
        console.log(url)
        setbgi(url)
    }

    let goupdate = async () => {
        let fdata = new FormData()
        fdata.append("username", username)
        fdata.append("password", pwd)
        fdata.append("age", age)
        fdata.append("avater", f)
        // console.log(f, "12346667")
        let res = await http.post("/updatestudentinfo", fdata)
        console.log(res)
        window.location.reload()
    }

    return (
        <div className='wc_box'>
            <div className='registerbox'>
                {/* <span className='close' onClick={close1}>&times;</span> */}
                <label>
                    姓名:<input type="text" value={username} onInput={(e) => { setusername(e.target.value) }} />
                </label>

                <label>
                    密码:<input type="password" value={pwd} onInput={(e) => { setpwd(e.target.value) }} />
                </label>

                <label>
                    年龄:<input type="text" value={age} onInput={(e) => { setage(e.target.value) }} />
                </label>
                <label >
                    性别：
                    <Radio.Group onChange={onChange} value={value} className='sexInput'>
                        <Radio value={'男'}>男</Radio>
                        <Radio value={'女'}>女</Radio>
                    </Radio.Group>

                </label>

                <label>
                    头像:<div className='touxiang' style={{ backgroundImage: `url(${bgi})`, color: "red" }}>
                        <input type="file" onInput={settouxiang} />
                    </div>
                </label>

                <button className='wc_btn' onClick={goupdate}>修改</button>

            </div>
        </div>
    )
}




