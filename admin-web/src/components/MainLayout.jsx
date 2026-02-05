// components/MainLayout.jsx
import React from 'react';
import { Layout, Menu, Button, message } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LogoutOutlined, DesktopOutlined, FileSearchOutlined, EditOutlined } from '@ant-design/icons';
import { ROUTE_PATHS, STORAGE_KEYS } from '../utils/constants';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. 获取登录时存储的用户信息
  const userInfo = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_INFO) || '{}');
  const role = userInfo.role;

  // 2. 退出登录逻辑：清除缓存并跳转
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    message.success('已安全退出');
    navigate(ROUTE_PATHS.LOGIN, { replace: true });
  };

  // 3. 根据角色定义菜单项
  const menuItems = [
    {
      key: ROUTE_PATHS.DASHBOARD,
      icon: <DesktopOutlined />,
      label: '仪表盘',
    },
    // 管理员独有菜单
    ...(role === 'admin' ? [{
      key: ROUTE_PATHS.HOTEL_AUDIT,
      icon: <FileSearchOutlined />,
      label: '酒店审核',
    }] : []),
    // 商家独有菜单
    ...(role === 'merchant' ? [{
      key: ROUTE_PATHS.HOTEL_EDIT,
      icon: <EditOutlined />,
      label: '房源编辑',
    }] : []),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" style={{ height: 32, margin: 16, background: 'rgba(255,255,255,0.2)', color: '#fff', textAlign: 'center', lineHeight: '32px' }}>
          易宿管理系统
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>欢迎您，{userInfo.username} ({role === 'admin' ? '管理员' : '合作伙伴'})</span>
          <Button 
            type="link" 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
          >
            退出登录
          </Button>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          {/* 这里渲染子路由页面，如 HotelAudit 或 HotelEdit */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;