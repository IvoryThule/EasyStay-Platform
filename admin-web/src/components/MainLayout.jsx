// components/MainLayout.jsx
import React from 'react';
import { Layout, Menu, Button, message, Typography, Space, Divider } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LogoutOutlined, DesktopOutlined, FileSearchOutlined, 
  EditOutlined, RiseOutlined, SettingOutlined, UserOutlined 
} from '@ant-design/icons';
import { ROUTE_PATHS, STORAGE_KEYS } from '../utils/constants';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
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
    { type: 'group', label: '核心业务', children: [
      { key: ROUTE_PATHS.DASHBOARD, icon: <DesktopOutlined />, label: '经营看板' },
      ...(role === 'admin' ? [{ key: ROUTE_PATHS.HOTEL_AUDIT, icon: <FileSearchOutlined />, label: '酒店审核' }] : []),
      ...(role === 
'merchant'
 ? [
      { 
key: ROUTE_PATHS.HOTEL_EDIT, icon: <EditOutlined />, label: '房源录入'
 },
      { 
key: '/hotel/status', icon: <FileSearchOutlined />, label: '房源状态' } // 新增入口
    ] : []),
    ]},
    { type: 'group', label: '数据报表', children: [
      { key: 'report_1', icon: <RiseOutlined />, label: '营收统计' },
    ]},
    { type: 'group', label: '系统管理', children: [
      { key: 'user_center', icon: <UserOutlined />, label: '个人中心' },
      { key: 'setting', icon: <SettingOutlined />, label: '系统设置' },
    ]}
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={240} theme="dark" breakpoint="lg" collapsedWidth="0">
        <div style={{ height: 64, margin: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#002140', borderRadius: '8px' }}>
          <RiseOutlined style={{ color: '#1890ff', fontSize: 24, marginRight: 8 }} />
          <span style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>易宿 eBooking</span>
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
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <Text strong>当前模块：{menuItems.flatMap(g => g.children).find(i => i?.key === location.pathname)?.label || '概览'}</Text>
          <Space>
            <Text type="secondary">欢迎，{userInfo.username} ({role === 'admin' ? '总管' : '合作伙伴'})</Text>
            <Divider type="vertical" />
            <Button type="link" danger icon={<LogoutOutlined />} onClick={handleLogout}>退出</Button>
          </Space>
        </Header>
        <Content style={{ margin: '24px', overflow: 'initial' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;