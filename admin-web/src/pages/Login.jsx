// [页面] 登录页
import React from 'react';
import { Form, Input, Button, Card, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import request from '../utils/request';
import { STORAGE_KEYS, ROUTE_PATHS } from '../utils/constants';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await request.post('/auth/login', values);
      
      if (response.success) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
        localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(response.data.user));
        
        message.success('登录成功！');
        
        // 根据角色自动跳转
        if (response.data.user.role === 'admin') {
          navigate(ROUTE_PATHS.HOTEL_AUDIT);
        } else {
          navigate(ROUTE_PATHS.HOTEL_EDIT);
        }
      }
    } catch (error) {
      message.error(error.response?.data?.message || '登录失败，请检查账号密码');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate(ROUTE_PATHS.REGISTER);
  };

  return (
    <div className="login-wrapper">
      {/* 1. 顶部 Hero 区域 */}
      <div className="login-hero">
        <div className="login-card-container">
          <div className="login-slogan">
            <h1>登录并管理您的住宿房源</h1>
            <p>您的住宿房源将在易宿平台旗下的多个频道进行售卖</p>
          </div>

          <Card className="custom-login-card" title="账号登录">
            <Form form={form} onFinish={onFinish} size="large">
              <Form.Item name="username" rules={[{ required: true, message: '请输入账号!' }]}>
                <Input prefix={<UserOutlined />} placeholder="用户名 / 手机号" />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block className="ctrip-blue-btn">
                  登录
                </Button>
              </Form.Item>
              
              <div style={{ textAlign: 'center' }}>
                <Button type="link" onClick={() => navigate('/register')}>
                  创建合作伙伴账户 (立即注册)
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>

      {/* 2. 中间介绍区域 */}
      <div className="info-section">
        <h2>欢迎使用 易宿 eBooking</h2>
        <p style={{ color: '#999' }}>高效的酒店后台管理系统，助力商家提升经营效率</p>
        
        <div className="feature-grid">
          <div className="feature-item">
            <img src="https://cdn-icons-png.flaticon.com/512/854/854878.png" alt="吸引客人" />
            <p>吸引目标客人</p>
          </div>
          <div className="feature-item">
            <img src="https://cdn-icons-png.flaticon.com/512/2529/2529396.png" alt="价格" />
            <p>设定房间价格</p>
          </div>
          <div className="feature-item">
            <img src="https://cdn-icons-png.flaticon.com/512/2666/2666469.png" alt="订单" />
            <p>随时管理订单</p>
          </div>
          <div className="feature-item">
            <img src="https://cdn-icons-png.flaticon.com/512/404/404617.png" alt="分析" />
            <p>查看业务分析</p>
          </div>
        </div>
      </div>

      {/* 3. 页脚区域 */}
      <div className="footer-info">
        <div className="footer-content">
          <div>
            <h4>联系我们</h4>
            <p>客服热线：400-123-4567</p>
            <p>邮箱：support@yisu.com</p>
          </div>
          <div>
            <h4>关于易宿</h4>
            <p>隐私政策</p>
            <p>常见问题</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px', opacity: 0.6 }}>
          Copyright © 2026 易宿酒店管理系统. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;