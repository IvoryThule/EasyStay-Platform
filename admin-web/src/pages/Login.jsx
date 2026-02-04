// [页面] 登录页
import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import request from '../utils/request';
import { STORAGE_KEYS, ROUTE_PATHS } from '../utils/constants';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

/* 后端
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
*/

//纯前端演示
const onFinish = async (values) => {
    setLoading(true);
    // --- 模拟后端开始 ---
    setTimeout(() => {
      const { username } = values;
      let mockUser = null;

      if (username === 'admin') {
        mockUser = { role: 'admin', name: '管理员' };
      } else {
        mockUser = { role: 'merchant', name: '酒店商户' };
      }

      // 存储模拟数据
      localStorage.setItem('admin_token', 'mock_token_123456');
      localStorage.setItem('user_info', JSON.stringify(mockUser));

      message.success(`欢迎回来, ${mockUser.name}！`);
      
      // 跳转逻辑
      if (mockUser.role === 'admin') {
        navigate('/hotel-audit');
      } else {
        navigate('/hotel-edit');
      }
      setLoading(false);
    }, 1000);
    // --- 模拟后端结束 ---
  };
//

  const handleRegister = () => {
    navigate(ROUTE_PATHS.REGISTER);
  };

  return (
    <div className="login-container">
      <Card className="login-card" title="易宿酒店管理系统 - 登录">
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入账号!' },
              { min: 3, message: '账号长度至少3个字符!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="请输入账号" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码!' },
              { min: 6, message: '密码长度至少6个字符!' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="请输入密码" 
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
            >
              登录
            </Button>
          </Form.Item>

          <Form.Item>
            <Button 
              type="link" 
              block 
              onClick={handleRegister}
            >
              没有账号？立即注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;