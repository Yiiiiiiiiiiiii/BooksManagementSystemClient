import React, { useState } from 'react';
import "../../common/common.css"
import "./idebar.css"
import { Router, useNavigate } from 'react-router-dom'
import Index from "../../Admin/wy/router/index"
import axios from "axios"
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
  getItem('用户管理', '2', <DesktopOutlined />),
  getItem('图书管理', '3', <ContainerOutlined />),

  getItem('借阅管理', 'sub1', <MailOutlined />, [
    getItem('未还', '5'),
    getItem('逾期', '6'),
  ]),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  let navigate = useNavigate()

  const select = ({ item, key }) => {
    // console.log(key);
    if(key == '1'){
      navigate({ pathname: '/adminindex/home' })
    }else if(key == '2'){
      navigate({ pathname: '/adminindex/userinfo' })
    }else if(key == '3'){
      navigate({ pathname: '/adminindex/bookmange' })
    }else if(key == '5') {
      navigate({ pathname: '/adminindex/notreturned' })
    }else if(key == '6'){
      navigate({ pathname: '/adminindex/late' })
    }
  }
  
  return (
    <div className="bigbox">
      <div style={{ width: 256 }}>
        {/* <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */}
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
          onSelect={select}
        />
      </div>
      <div className='centerbox'><Index></Index></div>
    </div>

  );
};

export default App;
