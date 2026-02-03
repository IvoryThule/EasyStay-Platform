// [布局] 侧边栏(Sider) + 头部(Header)
import React from 'react'
import { Layout, Menu } from 'antd'
import { Outlet } from 'react-router-dom'

const { Header, Content, Sider } = Layout

export default function AppLayout({ children }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
        EasyStay 管理后台
      </Header>
      <Layout>
        <Sider width={200} theme="light">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              { key: '1', label: '仪表板' },
              { key: '2', label: '酒店管理' },
              { key: '3', label: '订单管理' },
              { key: '4', label: '用户管理' },
            ]}
          />
        </Sider>
        <Content style={{ padding: '24px' }}>
          {children || <Outlet />}
        </Content>
      </Layout>
    </Layout>
  )
}
