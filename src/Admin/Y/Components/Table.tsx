import React from 'react'
import { useState } from 'react';
import { useEffect } from "react";
import http from "../../../Lib/http"
import './Table.css'
import { Form, Input, InputNumber, Popconfirm, Table, Typography, message, Button, Space } from 'antd';
export default function Mytable(props) {

    let [book_arr, setbook_arr] = useState([])
    let [messageApi, contextHolder] = message.useMessage();

    const { msg, setmsg } = props; //解构赋值

    //元素类型
    interface Item {
        id: number
        book_name: string;
        category: string;
        writer: string;
        bookID: string;
        book_number: number;

    }

    const originData: Item[] = [];


    const [form] = Form.useForm();


    const [data, setData] = useState(originData);


    const [editingKey, setEditingKey] = useState('');

    let [mykey, setmykey] = useState(0)

    useEffect(() => {
        http.get('/yxgetallbooks')
            .then(function (response) {
                setbook_arr(response.data.data);

            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        book_arr.forEach((el, index) => {
            originData.push({
                id: el.id,
                book_name: el.book_name.toString(),
                category: el.category.toString(),
                writer: el.writer.toString(),
                bookID: el.bookID.toString(),
                book_number: el.number,
            });

            setData(originData)


        });

    }, [book_arr])

    useEffect(() => {
        setData(msg)
        console.log(msg);
        
    }, [msg])

    interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
        editing: boolean;
        dataIndex: string;
        title: any;
        inputType: 'number' | 'text';
        record: Item;
        index: number;
        children: React.ReactNode;
        pagination: false
    }


    const EditableCell: React.FC<EditableCellProps> = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };



    const isEditing = (record: Item) => record.book_name === editingKey;

    const edit = (record: Item) => {


        form.setFieldsValue({ book_name: '', category: '', writer: '', bookID: '', book_number: 0, ...record })

        setEditingKey(record.book_name);
    };


    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        console.log(key);

        try {

            const row = (await form.validateFields()) as Item;
            console.log(typeof row.book_number);

            //向数据库中更行修改的数据
            http.post('/yxeditBook', {
                data: row
            })
                .then(function (response) {
                    // console.log(response);
                    if (response.data.code == 1) {

                        messageApi.info(response.data.data);
                        window.location.reload()
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.id);
            if (index > -1) {
                console.log(key);

                const item = newData[index];

                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);


                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
  
    let mydelete=[]
    const Mydelete = (record: Item) => {
        mydelete.push(record.id)
        console.log(mydelete);
        
        // 向数据库中更行修改的数据
        http.post('/deleteBook', {
            data: mydelete
        })
            .then(function (response) {
                // console.log(response);
                if (response.data.code == 1) {
                    messageApi.info(response.data.data);
                    window.location.reload()
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    };


    const columns = [
        {
            title: '书名',
            dataIndex: 'book_name',
            width: '22%',
            editable: true,
            ellipsis: true,
        },
        {
            title: '分类',
            dataIndex: 'category',
            width: '22%',
            editable: true,
            ellipsis: true,
        },
        {
            title: '作者/出版社',
            dataIndex: 'writer',
            width: '20%',
            editable: true,
            ellipsis: true,
        },
        {
            title: '图书编号',
            dataIndex: 'bookID',
            width: '15%',
            editable: true,
            ellipsis: true,
        },
        {
            title: '数量',
            dataIndex: 'book_number',
            width: '8%',
            editable: true,
            ellipsis: true,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.book_name)} style={{ marginRight: 5 }}>
                            保存
                        </Typography.Link>
                        <Popconfirm title="是否取消?" onConfirm={cancel}
                            okText="确定"
                            cancelText="取消">
                            <a>取消</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <div className='operation'>
                        <div className='edit'>
                            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                编辑
                            </Typography.Link>
                        </div>
                        <div className='delete'>
                            <Typography.Link disabled={editingKey !== ''} onClick={() => Mydelete(record)}>
                                删除
                            </Typography.Link>
                        </div>


                    </div>

                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const deleteall = () => {
        console.log(selectedRowKeys);
        http.post('/deleteBook', {
            data: selectedRowKeys
        })
            .then(function (response) {
                // console.log(response);
                if (response.data.code == 1) {
                    messageApi.info(response.data.data);
                    window.location.reload()
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    rowKey='id'
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    /*  pagination={{
                         // pageSizeOptions:[9]
                     }} */
                    pagination={{ pageSize: 9 }}
                    rowSelection={rowSelection}
                />
                {contextHolder}

            </Form>
            <Space wrap >
                <Button type="primary" onClick={deleteall} className='selectAll'>删除</Button>

            </Space>
        </>
    )

}
