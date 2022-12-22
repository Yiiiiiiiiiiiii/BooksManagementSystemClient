import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import Style from "./Borrow.module.css"
import { Button, Form, Input, message } from 'antd';
import http from "../../../../Lib/http"
import { formatYMDHMS } from "../../../../Lib/formatTime";

export default function Borrow() {
    let Navigate = useNavigate();
    let info = useLocation();
    let [messageApi, contextHolder] = message.useMessage();
    let [bookID, setbookId] = useState("");
    let [book_name, setbook_name] = useState("");

    // 获取时间
    let nowDate = new Date();
    let [nowTime, setnowTime] = useState(formatYMDHMS(nowDate));// 现在的时间
    let [nowfiftTime, setnowfiftTime] = useState(formatYMDHMS(new Date().setDate(nowDate.getDate() + 15))); // 15天后的时间

    // 首次加载渲染书的名字和编号
    useEffect(() => {
        // console.log(info.state.id);//接收到书的id
        // 拿到id去查询书的名字和编号
        http.get(`/lmfgetbook?id=${info.state.id}`)
            .then(function (response) {
                setbookId(response.data.data.bookID);
                setbook_name(response.data.data.book_name);
            })
            .catch(function (error) {
                console.log(error);
            });
    })

    // 提交，发起请求向数据库插入借阅信息的数据
    const onFinish = (values) => {
        if (!/^1[3-9]\d{9}$/.test(values.usertel)) {
            messageApi.info("手机号格式不正确！");
            return false;
        } else {
            // 发起请求，给借阅表添加记录
            http.post('/lmfborrow', {
                student_number: sessionStorage.getItem("student_number"),
                bookID: bookID,
                borrow_name: values.username,
                phone: values.usertel,
                bookname: book_name,
                start_time: nowTime,
                finish_time: nowfiftTime
            })
                .then(function (response) {
                    if (response.data.code == 1) {
                        // 跳转到个人借阅情况
                        messageApi.info('借阅成功，将跳到个人借阅情况路由');
                        let timer = setTimeout(() => {
                            Navigate({ pathname: "/userindex/borrowdetails" });//现在暂时跳到首页
                        }, 2000);

                    } else if (response.data.code == 0) {
                        messageApi.info('库存不够啦');
                    } else {
                        messageApi.info('借阅失败');
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    // 关闭按钮操作
    let srcimg = "./guanbi.png"
    let guanbi = () => {
        Navigate({ pathname: "/userindex/home" });
    }

    return (
        <div className={Style.bigbox}>
            <div className={Style.center}>
                <img src={require(`${srcimg}`)} alt="" className={Style.srcimg} onClick={guanbi} />
                <p className={Style.msg}>书编号:</p><label className={Style.label1}>{bookID}</label>
                <br></br>
                <p className={Style.msg2}>书名:</p><label className={Style.label1}>{book_name}</label>
                <Form
                    name="basic"
                    labelCol={{
                        span: 9,
                    }}
                    wrapperCol={{
                        span: 8,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="姓名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="电话"
                        name="usertel"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your telnumber!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 9,
                            span: 16,
                        }}
                    >
                        {contextHolder}
                        <Button type="primary" htmlType="submit" className={Style.btn}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>



            </div>
        </div>
    )
}
