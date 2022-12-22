import React, { useState } from 'react';
import Homerouter from "../../router/Lmfrouter/lmfrouter"
// import Userrouter from "../../User/Wangcairouter1/index"
import { useNavigate } from "react-router-dom"
import "../../common/common.css"
import "./idebar.css"
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    // icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('首页', '1', <PieChartOutlined />),
  getItem('个人借阅情况', '2', <DesktopOutlined />),
  getItem('个人信息', '3', <ContainerOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  let navigate = useNavigate()
  let change = ({ item, key }) => {
    console.log(item, "66666666666666666");
    switch (key) {
      case "1":
        navigate("/userindex/home")
        break;
      case "2":
        navigate("/userindex/borrowdetails")
        break;
      case "3":
        navigate("/userindex/usercenter")
        break;
      default:
        break;
    }
  }
 /*  const select = ({ item, key }) => {
    console.log(111111111);
    if(key == '2'){
      navigate({ pathname: '/userindex/borrowdetails' })
    }else if(key == '3'){
      navigate({ pathname: '/userindex/usercenter' })
    }else{
      navigate({ pathname: '/userindex/home' })
    }
  } */
  return (
    <div className='bigbox'>
      <div style={{ width: 256 }}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
          onClick={change}
        />
      </div>
      <div className='centerbox'><Homerouter></Homerouter></div>
    </div>
  );
};

export default App;
