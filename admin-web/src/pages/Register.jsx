// [页面] 注册页
import React from 'react';
import { Form, Input, Button, Card, message, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import request from '../utils/request';
import { ROUTE_PATHS } from '../utils/constants';
import './Register.css';

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
    <div className="register-container">
      <Card className="register-card" title="易宿酒店管理系统 - 注册">
        <Form
          form={form}
          name="register"
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

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致!'));
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="请确认密码" 
            />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[{ required: true, message: '请选择角色!' }]}
          >
            <Select placeholder="请选择角色">
              <Option value="merchant">商户</Option>
              <Option value="admin">管理员</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
            >
              注册
            </Button>
          </Form.Item>

          <Form.Item>
            <Button 
              type="link" 
              block 
              onClick={handleLogin}
            >
              已有账号？立即登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
