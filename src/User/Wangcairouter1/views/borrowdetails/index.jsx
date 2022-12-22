import React, { useEffect, useState } from 'react';
import http from "../../../../Lib/http"
import { Space, Table, Tag } from 'antd';
const columns = [
    {
        title: '图书编号',
        dataIndex: 'bookID',
        key: 'name',
        render: (text) => <span>{text}</span>,
    },
    {
        title: '书名',
        dataIndex: 'bookname',
        key: 'age',
    },
    {
        title: '借阅人',
        dataIndex: 'borrow_name',
        key: 'borrower',
    },
    {
        title: '借阅状态',
        dataIndex: 'return1',
        key: 'return1',
        render: (text) => {
            switch (text) {
                case '0':
                    return (
                        <span>未还</span>
                    )
                    break;
                case '1':
                    return (
                        <span>已还</span>
                    )
                    break;
                case '2':
                    return (
                        <span>逾期</span>
                    )
                    break;
                default:
                    break;
            }
        }
    },

    {
        title: '操作',
        key: 'tags',
        dataIndex: 'tags',
        render: () => {
            return (
                <>
                    <a>还书</a>
                </>
            )

        }

    },

];
export default function App() {
    let [data, setdata] = useState([])


    useEffect(() => {
        http.get("/getstudentownbook", {
            params: {
                student_number: sessionStorage.getItem("student_number")
            }
        }).then((res) => {
            let serverData = res.data;
            serverData.forEach((element, index) => {
                element.key = index + 1;

            });
            console.log(serverData, "借阅中心后端数据");

            console.log(data, "操作后得到的data");
            setdata(serverData);

        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <Table
            columns={columns}
            dataSource={data}
            onRow={record => {
                return {
                    onClick: event => {
                        console.log(record, "9999999999999999")
                        console.log(event.target.text, "666666888888888666");
                        if (event.target.text == "还书") {
                            console.log(1111111111111111);
                            window.location.reload()
                            http.post("/updateborrowinfo", {
                                bookID: record.bookID,
                                return1: record.return1
                            }).then((res) => {
                                console.log(res)
                            }).then((error) => {
                                console.log(error)
                            })
                        }
                    },
                };
            }}
        />
    )

};


