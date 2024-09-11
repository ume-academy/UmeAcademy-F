import { CloseOutlined, FileOutlined, HomeOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { useState } from 'react';

const { Sider, Content } = Layout;

const Sidebar_Content_Course = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleSidebar}
        className="site-layout-background"
      >
        <Button
          type="text"
          onClick={toggleSidebar}
          style={{
            margin: '16px',
            display: collapsed ? 'block' : 'none'
          }}
        >
          {collapsed ? <MenuOutlined /> : <CloseOutlined />}
        </Button>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="3" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px', minHeight: 280 }}>
        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
          {/* Nội dung chính của bạn */}
          <h1>Main Content Area</h1>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar_Content_Course;
