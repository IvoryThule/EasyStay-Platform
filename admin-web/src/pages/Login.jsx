// [页面] 登录页
import React from 'react'
import { Card, Form, Input, Button } from 'antd'

const Login = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="EasyStay 管理后台登录" style={{ width: 400 }}>
        <Form>
          <Form.Item label="用户名">
            <Input />
          </Form.Item>
          <Form.Item label="密码">
            <Input.Password />
          </Form.Item>
          <Button type="primary" block>登录</Button>
        </Form>
      </Card>
    </div>
  )
}

export default Login
