import { Layout, theme } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import Sidebar_Teacher from '../components/teacher/Sidebar/Sidebar_Teacher';
import Header_Teacher from '../components/teacher/Header/Header_Teacher';
import { Outlet } from 'react-router-dom';

const Layout_Teacher = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>

                {/* Side bar Teacher */}
                <Sidebar_Teacher />

                <Layout>
                    {/* Header Teacher */}
                    <Header_Teacher />

                    <Content style={{ margin: '0 16px' }}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb> */}
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                margin: '16px 0',
                                backgroundColor: '#F5F6FA',
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                        </div>
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default Layout_Teacher