import React, { useState } from 'react';
import { 
  Form, Input, InputNumber, Button, Card, message, Upload, 
  Row, Col, Select, DatePicker, Divider, TimePicker 
} from 'antd';
import { PlusOutlined, BookOutlined, EnvironmentOutlined, MinusCircleOutlined, ShopOutlined, CarOutlined, RocketOutlined, GiftOutlined } from '@ant-design/icons';
import request from '../utils/request';

const { TextArea } = Input;
const { Option } = Select;

const HotelEdit = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

const onFinish = async (values) => {
  setLoading(true);
  try {
    // 处理 payload 以匹配 hotelController.js 的 create 接口
    const payload = {
      name: values.name,
      address: values.address,
      city: values.city || "上海", // 后端必填项，如果表单没写则给个默认值
      star: values.star,
      // 这里的 price 取房型列表中的最低价，或者根据业务逻辑设定
      price: values.room_types?.[0]?.price || 0, 
      opening_date: values.opening_date ? values.opening_date.format('YYYY-MM-DD') : null,
      // 将表单扩展字段转为后端 tags 或其他字段
      tags: [values.nearby_attractions, values.traffic_mall].filter(Boolean),
      // 房型数据处理
      room_types: values.room_types?.map(room => ({
        ...room,
        available_time: room.time_range ? 
          [room.time_range[0].format('HH:mm'), room.time_range[1].format('HH:mm')] : null
      })),
      status: 0 // 后端定义：0 为审核中
    };

    const res = await request.post('/hotel/create', payload); 
    if (res.success || res.status === 200) {
      message.success('酒店及房型资料已成功提交审核');
      form.resetFields();
    }
  } catch (error) {
    message.error('提交失败：' + (error.response?.data?.message || '网络异常'));
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ padding: '24px', background: '#f5f7fa' }}>
      <Card 
        title={<span><BookOutlined /> 录入酒店详细资料</span>} 
        variant="borderless"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ star: 3 }}
        >
          {/* --- 基础信息 --- */}
          <Divider orientation="left">基础信息</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="酒店中文名" name="name" rules={[{ required: true, message: '请输入酒店名称' }]}>
                <Input placeholder="如：上海陆家嘴禧酒店" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="酒店英文名" name="name_en">
                <Input placeholder="Hotel English Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="星级评分" name="star" rules={[{ required: true }]}>
                <Select>
                  {[1, 2, 3, 4, 5].map(s => <Option key={s} value={s}>{s} 星级</Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="开业年份" name="opening_date" rules={[{ required: true }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="联系电话" name="phone" rules={[{ required: true, message: '请输入联系电话' }]}>
                <Input placeholder="酒店前台或经理电话" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="地理位置" name="address" rules={[{ required: true }]}>
            <Input prefix={<EnvironmentOutlined />} placeholder="请输入酒店详细街道地址" />
          </Form.Item>

          {/* --- 房型配置 (重点要求) --- */}
          <Divider orientation="left">房型与具体价格/时间</Divider>
          <Form.List 
            name="room_types" 
            rules={[{ validator: async (_, names) => (!names || names.length < 1) && Promise.reject(new Error('请至少添加一种房型')) }]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key} gutter={12} align="bottom" style={{ marginBottom: 16, background: '#f9f9f9', padding: '12px', borderRadius: '4px' }}>
                    <Col span={7}>
                      <Form.Item {...restField} label="房型名称" name={[name, 'type_name']} rules={[{ required: true, message: '房型' }]}>
                        <Input placeholder="例如：行政大床房" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item {...restField} label="每晚价格" name={[name, 'price']} rules={[{ required: true, message: '价格' }]}>
                        <InputNumber min={0} prefix="￥" style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={9}>
                      <Form.Item {...restField} label="退房办理时间范围" name={[name, 'time_range']} rules={[{ required: true }]}>
                        <TimePicker.RangePicker format="HH:mm" style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Form.Item label=" ">
                        <Button type="text" danger icon={<MinusCircleOutlined />} onClick={() => remove(name)} />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>添加房型</Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

          {/* --- 补充信息 (新增要求) --- */}
          <Divider orientation="left">补充信息</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={<span><RocketOutlined /> 热门景点/周边设施</span>} name="nearby_attractions">
                <TextArea rows={3} placeholder="例如：东方明珠 (1.2km), 外滩 (步行5分钟)..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span><CarOutlined /> 交通出行/商场</span>} name="traffic_mall">
                <TextArea rows={3} placeholder="例如：地铁2号线南京东路站, 恒隆广场..." />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label={<span><GiftOutlined /> 价格折扣/优惠场景方案</span>} name="discount_desc">
            <TextArea rows={2} placeholder="例如：连住3晚享受8折, 周末特惠, 包含早晚餐套餐等..." />
          </Form.Item>

          {/* --- 图片上传 --- */}
          <Divider orientation="left">酒店图片</Divider>
          <Form.Item name="images">
            <Upload listType="picture-card" maxCount={5} beforeUpload={() => false}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={loading} size="large" block>
              确认并提交审核
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default HotelEdit;