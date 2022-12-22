import React, { useState, useEffect } from 'react'
import './userinfo.css'
import http from '../../Lib/http'
import { Space, Table, Form, Input, message, Button, Modal, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';


export default function Userinfo() {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  // 总表
  const columns: ColumnsType<DataType> = [
    {
      title: '账号',
      dataIndex: 'student_number',
      key: 'student_number',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      // render: (text) => <a>{text}</a>,
    },

    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      key: 'sex',
      dataIndex: 'sex',
    },
    {
      title: '是否失信',
      key: 'credit',
      dataIndex: 'credit',
    },
    {
      title: '操作',
      key: 'action',
      width: '20%',
      render: (text) => (
        <Space size="middle">
          <button><a onClick={del.bind(this, text)}>删除</a> </button>
          <button><a onClick={updata.bind(this, text)}>修改</a></button>
        </Space>
      ),
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // data赋值,数据渲染
  let [data, setData] = useState([])

  let [isModalOpen, setIsModalOpen] = useState(false);

  // 请求数据
  let shuaxin = () => {
    http
      .get("/userinfo",)
      .then((response) => {
        console.log(response.data);
        // 循环添加key
        response.data.forEach((r, i) => {
          r.key = r.ID;
        })
        let data2 = response.data
        for (let i = 0; i < data2.length; i++) {
          if (data2[i].credit == 0) {
            data2[i].credit = "守信";
          }
          if (data2[i].credit == 1) {
            data2[i].credit = "失信";
          }
          if (data2[i].isadministrator == 0) {
            data2.splice(i, 1)
            i--
          }
        }
        console.log(data2);
        setData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // 组件挂载时请求数据
  useEffect(() => {
    shuaxin()
  }, [])

  // 删除
  let del = (el) => {
    console.log(el);
    http
      .post(`/userdelect`, {
        data: el
      })
      .then((response) => {
        console.log(response.data);
        // 弹窗
        message.success(response.data.data);
        // 刷新数据
        shuaxin();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // 批量删除
  let delectmore = () => {
    http
      .post(`/delectmore`, {
        data: selectedRowKeys
      })
      .then((response) => {
        console.log(response.data);
        // 弹窗
        message.success(response.data.data);
        // 刷新数据
        shuaxin();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // 修改
  let [isModalOpen2, setIsModalOpen2] = useState(false);
  let [userdata, setUserdata] = useState({});
  let [data3, setdata3] = useState({});
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  // let updataid = null;
  let handleCancel2 = (el) => {
    setIsModalOpen2(false);
    // 清空输入框
    form2.resetFields();
  };

  let updata = (r) => {
    setUserdata(r)
    console.log(r);
    // userdata = r;
    // console.log(userdata);
    setIsModalOpen2(true);
  };
  let handleOk2 = (v) => {
    setIsModalOpen2(false);
    console.log(v);
    // setUserdata(v);
    (userdata as any).username = v.username;
    (userdata as any).password = v.password;
    (userdata as any).age = v.age;
    (userdata as any).sex = v.sex;
    // console.log(userdata);
    http
      .post(`/userupdata`, {
        data: userdata
      })
      .then((response) => {
        // console.log(response.data);
        message.success(response.data.data);
        // 刷新数据
        shuaxin();
        // 清空输入框
        form2.resetFields();
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  // 添加
  let add = () => {
    // console.log("add");
    setIsModalOpen(true);
  }
  let handleCancel = () => {
    setIsModalOpen(false);
    // 清空输入框
    form.resetFields();
  };
  let handleOk = (v) => {
    setIsModalOpen(false);
    console.log(v);
    // console.log(userdata);
      http
        .post(`/useradd`, {
          data: v
        })
        .then((response) => {
          console.log(response.data);
          message.success(response.data.data);
          // 刷新数据
          shuaxin();
          // 清空输入框
          form.resetFields();
        })
        .catch(function (error) {
          console.log(error);
        });
  };
  let reg = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字
  let numberchange = (v) => {
    console.log(v);

    if (v.target.value.length > 8) {
      message.warning("超出长度，请输入正确账号格式")
    }
    if (!reg.test(v.target.value)) {
      message.warning("账号只能为数字，请输入正确账号格式")
    }
  }
  let namechange = (v) => {
    let reg2 = /^[\u4e00-\u9fa5_a-zA-Z]+$/
    if (!reg2.test(v.target.value)) {
      message.warning("名字只能为中文或者英文，请输入正确的格式")
    }
  }
  let agechange = (v) => {
    if (v.target.value.length >= 4) {
      message.warning("超出长度，请输入正确年龄")
    }
    if (!reg.test(v.target.value)) {
      message.warning("年龄只能为数字，请输入正确年龄")
    }
  }


  // 搜索
  let inpuevalue = null;
  let inputChange = (el) => {
    console.log(el.target.value);
    inpuevalue = el.target.value;
    if (el.target.value) {
      http
        .post(`/userquery`, {
          data: inpuevalue
        })
        .then((response) => {
          console.log(response.data);
          setData(response.data)
          // 循环添加key
          response.data.forEach((r, i) => {
            r.key = i;
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (el.target.value.length == 0) {
      console.log(el.target.value.length);

      shuaxin()
    }

  }
  let query = (el) => {
    // console.log(el.target.value);
    // http
    //     .post(`/userquery`, {
    //       data: el.target.value
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //       message.success(response.data.data);
    //       shuaxin();
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //       // 刷新数据
    //       shuaxin();
    //       // 清空输入框
    //       form.resetFields();
    //     });
  }



  return (
    <div className='userinfo'>
      <Input onChange={inputChange} className="inputstyle" placeholder="请输入账号查询" />
      <div className='addbutton'>
        <Button type="primary" onClick={add} className="adduser">新增用户</Button><br />
        <Button type="primary" onClick={delectmore} >批量删除</Button><br />
      </div>
      <Table columns={columns} dataSource={data} rowSelection={rowSelection} id="tableclass" pagination={{ pageSize: 8 }} />
      <Modal title="新增用户" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} className="addbuttonstyle">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleOk}
          // onFinishFailed={onFinishFailed}
          form={form}
          autoComplete="off"
          
        >
          <Form.Item
            label="账号"
            name="student_number"
            rules={[{ required: true, message: '请输入账号!' }]}
          >
            <Input onChange={numberchange} />
          </Form.Item>

          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input onChange={namechange} />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="年龄"
            name="age"
            rules={[{ required: true, message: '请输入年龄!' }]}
          >
            <Input onChange={agechange} />
          </Form.Item>

          <Form.Item
            label="性别"
            name="sex"
            rules={[{ required: true, message: '请输入性别!' }]}
          >
            <select className='sex'>
              <option>女</option>
              <option>男</option>
            </select>
            {/* <Input/> */}

          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className='bottonbox'>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
              <Button type="primary" onClick={handleCancel}>
                取消
              </Button>
            </div>

          </Form.Item>
        </Form>
      </Modal>

                    
      <Modal title="信息修改" open={isModalOpen2} onCancel={handleCancel2} footer={null} onOk={handleOk2} >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleOk2}
          // onFinishFailed={onFinishFailed}
          form={form2}
          autoComplete="off"
          
        >
          {/* <Form.Item
            label="账号"
            name="student_number"
            rules={[{ required: true, message: '请输入账号!' }]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input onChange={namechange} />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="年龄"
            name="age"
            rules={[{ required: true, message: '请输入年龄!' }]}
          >
            <Input onChange={agechange} />
          </Form.Item>

          <Form.Item
            label="性别"
            name="sex"
            rules={[{ required: true, message: '请输入性别!' }]}
          >
            {/* <select className='sex'>
                <option>女</option>
                <option>男</option>
              </select> */}
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className='bottonbox'>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
              <Button type="primary" onClick={handleCancel2}>
                取消
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
