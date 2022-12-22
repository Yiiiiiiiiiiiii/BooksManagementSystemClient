import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from "axios"
import http from "../../Lib/http"

export default function Notreturned() {

/*   axios.get('/notreturned', {
        // username: username,
        // student_number: student_number,
        // tel: tel,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      }); */
      
      const [data, setData] = useState();
      useEffect(() => {
          http.get('/wylate',)
          .then(function (response) {
            setData(response.data.data);
            let arr=response.data.data.map(el=>({
                  id: el.id,
                  student_number: el.student_number,
                  name: el.borrow_name,
                  phone: el.phone,
                  bookname: el.bookname,
                  start: el.start_time.substring(0,10),
                  finish: el.finish_time.substring(0,10),
                  state: '逾期'
                }))
            setdataSource(arr)          
          })
          .catch(function (error) {
            console.log(error);
          });
      },[]);
       
/*   interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  const dataSource = [
    {
      id: '1',
      student_number: '111',
      name: '胡彦斌',
      phone: 13124141341,
      bookname: '老人与海',
      start: '',
      finish: '',
      state: '未还'
    },
    {
      id: '2',
      student_number: '111',
      name: '胡彦斌',
      phone: 13124141341,
      bookname: '老人与海',
      start: '',
      finish: '',
      state: '未还'
    },
    {
      id: '1',
      student_number: '111',
      name: '胡彦斌',
      phone: 13124141341,
      bookname: '老人与海',
      start: '',
      finish: '',
      state: '未还'
    },
  ]; */

    const [dataSource,setdataSource] = useState([])
  


  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: '5%'
    },
    {
      title: '学号',
      dataIndex: 'student_number',
      key: 'student_number',
      width: '10%'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: '10%'
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      width: '15%'
    },
    {
      title: '书名',
      dataIndex: 'bookname',
      key: 'bookname',
      width: '20%',
      ellipsis: true,
    },
    {
      title: '起止时间',
      dataIndex: 'start',
      key: 'start',
      width: '12%'
    },
    {
      title: '终止时间',
      dataIndex: 'finish',
      key: 'finish',
      width: '12%'
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      width: '10%'
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns}/>
    </div>
  )
}

