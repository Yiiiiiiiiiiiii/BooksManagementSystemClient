import React from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Form, Input, InputNumber,message } from 'antd';
import Style from './Addbook.module.css';
import http from "../../../Lib/http"
export default function Addbook() {

  let Navigate = useNavigate();
  let [messageApi, contextHolder] = message.useMessage();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '请输入${label} ',
    types: {
      number: '请输入${label}',
    },
    number: {
      range: '${label} 必须大于${min}',
    },
  };


  const onFinish = (values: any) => {
    http.post('/addbook', {
     data:values
    })
      .then(function (response) {
        console.log(response);
        
        if (response.data.code == 1) {
          // 跳转到个人借阅情况
          messageApi.info('添加成功');
          let timer = setTimeout(() => {
            Navigate({ pathname: '/adminindex/bookmange'  });//添加成功2s后跳转至图书管页面
          }, 2000);

        } 

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={Style.bigbox}>

      <div className={Style.center}>
        <Form {...layout} name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          labelCol={{
            span: 9,
          }}
          wrapperCol={{
            span: 8,
          }}

        >
          <div className={Style.form}>
            <Form.Item name={['admin', 'book_name']} label="书名" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['admin', 'category']} label="分类" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['admin', 'writer']} label="作者/出版社" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['admin', 'bookID']} label="图书编号" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['admin', 'number']} label="数量" rules={[{ type: 'number', min: 0, max: 9999, required: true }]}>
              <InputNumber />
            </Form.Item>

          </div>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
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
