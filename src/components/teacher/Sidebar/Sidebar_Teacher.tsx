import { AppstoreOutlined, DesktopOutlined, HistoryOutlined, PieChartOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { logoTeacher } from '../../../contants/client';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<NavLink to={'/teacher'}>Dashboard</NavLink>, '1', <PieChartOutlined />),
  getItem('Khóa học của tôi', '2', <DesktopOutlined />, [
    getItem(<NavLink to={'/teacher/courses'}>Danh sách khóa học</NavLink>, '3'),
    getItem(<NavLink to={'/teacher/form_course_add'}>Thêm mới khóa học</NavLink>, '4'),
    getItem('Bài học của tôi', '5', <AppstoreOutlined />, [
      getItem(<NavLink to={'/teacher/add_lesson'}>Thêm mới bài học</NavLink>, '5'),

    ]),
  ]),
  getItem(<NavLink to={'/teacher/histories_transaction'}>Lịch sử thanh toán</NavLink>, '6', <HistoryOutlined />,),
  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  // getItem('Files', '9', <FileOutlined />),
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme='dark'
      width={250}
    >
      <div className="text-center py-2 flex justify-center">
        <img src={logoTeacher} alt="logo_teacher" width={50}/>
      </div>

      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
  );
}

export default Sidebar