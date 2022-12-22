import React from 'react'
import StyleSheet from "./Login.module.css"
import { Button, Form, Input, message } from 'antd';
import http from "../../../Lib/http"
import { useNavigate } from "react-router-dom"

export default function Register() {
    let navigate = useNavigate();
    let [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values) => {
        if (values.student_number.length < 6) {
            messageApi.info('学号/工号长度至少6位!');
            return false;
        } else if (values.password.length < 6) {
            messageApi.info('密码长度至少6位!');
            return false;
        } else {
            // 拿到账号密码发起请求
            http.post('/lmflogin', {
                student_number: values.student_number,
                password: values.password,
            })
                .then(function (response) {
                    if (response.data.code == -1) {
                        messageApi.info('学号/工号不存在!');
                    } else if (response.data.code == -2) {
                        messageApi.info('密码错误!');
                    } else {
                        if (response.data.data.isadministrator == "1") {
                            messageApi.info('登录成功，即将进入学生系统!');
                            setTimeout(() => {
                                // 进入学生系统，路由的跳转,将学号传过去
                                navigate({ pathname: "/userindex" }, { state: { "student_number": values.student_number,
                                "isadministrator": response.data.data.isadministrator} });
                                sessionStorage.setItem("student_number", values.student_number);
                                sessionStorage.setItem("isadministrator", response.data.data.isadministrator);
                            }, 2000)
                        } else {
                            messageApi.info('登录成功，即将进入管理员系统!');
                            setTimeout(() => {
                                // 进入管理员系统
                                navigate({ pathname: "/adminindex" }, { state: { "student_number": values.student_number,
                                "isadministrator": response.data.data.isadministrator } });
                                sessionStorage.setItem("student_number", values.student_number);
                                sessionStorage.setItem("isadministrator", response.data.data.isadministrator);
                            }, 2000)
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    return (
        <div className={StyleSheet.box}>
            <div className={StyleSheet.log}>
                <div className={StyleSheet.little}>
                    <h3>登录</h3>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"

                    >
                        <Form.Item
                            label="账号"
                            name="student_number"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入账号！',
                                },
                            ]}

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 6,
                                span: 14,
                            }}
                        >
                            {contextHolder}
                            <Button type="primary" htmlType="submit" className={StyleSheet.but}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div >
    )
}
