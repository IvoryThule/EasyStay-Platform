// [页面] 酒店录入 (商户)
import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Card, message, Upload, Space } from 'antd';
import { PlusOutlined, BookOutlined } from '@ant-design/icons';
import request from '../utils/request';

const { TextArea } = Input;

const HotelEdit = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 提交表单
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // 对接后端接口：保存酒店信息
      const res = await request.post('/hotels/save', values);
      if (res.success) {
        message.success('酒店信息已提交，请等待管理员审核');
      }
    } catch (error) {
      message.error('提交失败：' + (error.response?.data?.message || '网络异常'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card title={<span><BookOutlined /> 酒店信息录入</span>} bordered={false}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ status: 'pending' }}
        >
          <Form.Item
            label="酒店名称"
            name="name"
            rules={[{ required: true, message: '请输入酒店名称' }]}
          >
            <Input placeholder="例如：上海陆家嘴禧酒店" />
          </Form.Item>

          <Space size="large">
            <Form.Item
              label="基础价格 (每晚)"
              name="price"
              rules={[{ required: true, message: '请输入价格' }]}
            >
              <InputNumber min={1} style={{ width: '200px' }} prefix="￥" />
            </Form.Item>

            <Form.Item label="联系电话" name="phone">
              <Input placeholder="请输入联系电话" style={{ width: '200px' }} />
            </Form.Item>
          </Space>

          <Form.Item label="酒店地址" name="address">
            <Input placeholder="请输入详细地址" />
          </Form.Item>

          <Form.Item label="酒店描述" name="description">
            <TextArea rows={4} placeholder="介绍一下酒店的特色..." />
          </Form.Item>

          <Form.Item label="酒店图片">
            <Upload listType="picture-card" maxCount={3}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} size="large">
              提交审核
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default HotelEdit;
