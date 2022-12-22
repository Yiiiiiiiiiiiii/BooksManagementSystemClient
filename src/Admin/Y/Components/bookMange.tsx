import React, { useState, useReducer } from 'react'
// import "../../common/common.css"
import './bookManage.css'
import { Router, useNavigate } from 'react-router-dom'
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Mytable from './Table'
import Addbook from './Addbook';
import http from "../../../Lib/http"



export default function BookMange() {
  let navigate = useNavigate();
  const { Search } = Input;
  let [messageApi, contextHolder] = message.useMessage();
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 30,
        color: '#000',
      }}
    />
  );

  let [msg, setmsg] = useState([])


  const onSearch = (value: string) => {
    console.log(value)

    http.post('/selectbook', {
      data: value
    })
      .then(function (response) {
        console.log(response);

        setmsg(response.data.data)

      })
      .catch(function (error) {
        console.log(error);
      });


  };
  let gotoAddBook = () => {

    navigate({ pathname: '/adminindex/addbook' })
  }


  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
 
    // setTimeout(() => {
    //   setSelectedRowKeys([]);
    //   setLoading(false);
    // }, 1000);
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (


    <div >
      <div className='bookMange_top'>
        <div className='bookMange_topsearch'>
          <Space direction="vertical">
            <Search placeholder="请输入图书名" onSearch={onSearch} enterButton />
          </Space>

        </div>
        <div className='bookMange_topadd'>

          <Space wrap>
            <Button type="primary" onClick={gotoAddBook}>添加书籍</Button>

          </Space>
        </div>
      </div>
     
      <div className='bookMange_bottom'>
        <Mytable msg={msg}  ></Mytable>

      </div>
    </div>

  )
}
