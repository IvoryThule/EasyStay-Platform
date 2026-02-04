// [页面] 注册页
import React from 'react';
import { Form, Input, Button, Card, message, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import './Login.css'; // 复用登录页的部分介绍区样式

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  
   const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await request.post('/auth/register', values);
      
      if (response.success) {
        message.success('注册成功！请登录');
        navigate(ROUTE_PATHS.LOGIN);
      }
    } catch (error) {
      message.error(error.response?.data?.message || '注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate(ROUTE_PATHS.LOGIN);
  };
  return (
    <div className="login-wrapper">
      {/* 1. 顶部 Hero 区域 - 注册框显著占据 1/3 屏幕感 */}
      <div className="register-hero">
        <div className="register-card-container">
          <div className="register-slogan">
            <h1>加入易宿合作伙伴</h1>
            <p>
              在全球范围内展示您的酒店房源，<br />
              借助专业的 eBooking 系统轻松管理库存与定价。
            </p>
          </div>

          <Card className="custom-register-card" title="创建新账户">
            <Form form={form} onFinish={onFinish} size="large" layout="vertical">
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入账号!' }, { min: 3, message: '账号长度至少3个字符!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="请输入账号" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }, { min: 6, message: '密码长度至少6个字符!' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: '请确认密码!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) return Promise.resolve();
                      return Promise.reject(new Error('两次输入的密码不一致!'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="请确认密码" />
              </Form.Item>

              <Form.Item name="role" rules={[{ required: true, message: '请选择角色!' }]}>
                <Select placeholder="请选择您的角色">
                  <Option value="merchant">商户 (管理酒店)</Option>
                  <Option value="admin">管理员 (系统维护)</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block className="ctrip-blue-btn">
                  立即注册
                </Button>
              </Form.Item>

              <div style={{ textAlign: 'center' }}>
                <Button type="link" onClick={() => navigate('/login')}>
                  已有账号？直接登录
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>

      {/* 2. 下方介绍区域 (复用登录页样式) */}
      <div className="info-section">
        <h2>欢迎成为我们的合作伙伴</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <img src="https://cdn-icons-png.flaticon.com/512/3210/3210195.png" alt="流量" />
            <p>海量用户流量</p>
          </div>
          <div className="feature-item">
            <img src="https://cdn-icons-png.flaticon.com/512/3159/3159066.png" alt="技术" />
            <p>专业后台支持</p>
          </div>
          <div className="feature-item">
            <img src="https://cdn-icons-png.flaticon.com/512/950/950581.png" alt="结算" />
            <p>快速结算周期</p>
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

export default Register;