import React, { useEffect, useState } from 'react'
import Style from "./Index.module.css"
import "./indexlmf.css"
import { Input, Space, Table } from 'antd';
import { useNavigate } from "react-router-dom"
import http from "../../../Lib/http"
export default function Index() {
    let Navigate = useNavigate();
    const { Search } = Input;
    const columns = [
        {
            title: '编号',
            dataIndex: 'bookID',
            key: 'bookID',
            render: (text) => <a>{text}</a>,
            width: 150
        },
        {
            title: '书名',
            dataIndex: 'book_name',
            key: 'book_name',
            width: 280,
            ellipsis: true,
        },
        {
            title: '类别',
            dataIndex: 'category',
            key: 'category',
            width: 280,
            ellipsis: true,
        },
        {
            title: '作者',
            key: 'writer',
            dataIndex: 'writer',
            width: 300,
            ellipsis: true,
        },

        {
            title: '数量',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={(e) => {
                        // 跳转到借阅信息界面，并传相关的id
                        Navigate({ pathname: "/userindex/borrow" }, { state: { "id": record.id } });
                    }}>借阅</a>
                </Space >
            ),
        },
    ];


    let [data, setdata] = useState();
    // 首次加载, 发起请求拿到书所有的数据
    useEffect(() => {
        console.log(2222222222);
        http.get('/lmfgetbookinfo')
            .then(function (response) {
                setdata(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    // 搜索功能：点击按钮或回车进行搜索
    const onSearch = (value, event) => {
        http.get("/lmfsearch", {
            params: {
                keywords: value
            }
        })
            .then(function (response) {
                setdata(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    // 搜索框清除了关键字进行重新渲染整个数据列表
    let onChange = (e) => {
        if (!e.target.value) {
            http.get('/lmfgetbookinfo')
                .then(function (response) {
                    setdata(response.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


    return (
        <div className={Style.box}>
            {/* 搜索框 */}
            <Space direction="vertical" className={Style.search}>
                <Search placeholder="输入书名查询" onSearch={onSearch} onChange={onChange} enterButton className={Style.searchson} />
            </Space>


            {/* 表格显示书的基本信息*/}
            <Table
                columns={columns}
                dataSource={data}
                bordered={true}
                pagination={{ pageSize: 9 }}
                rowKey="id"
                className={Style.tablesize}
            />


        </div >
    )
}
