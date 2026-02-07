import React, { useState, useEffect } from 'react';
import { 
  Form, Input, InputNumber, Button, Card, message, Upload, Space,
  Row, Col, Select, DatePicker, Divider, TimePicker, Spin 
} from 'antd';
import { 
  PlusOutlined, BookOutlined, EnvironmentOutlined, 
  MinusCircleOutlined, ShopOutlined, TranslationOutlined
} from '@ant-design/icons';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import request from '../utils/request';
import { ROUTE_PATHS } from '../utils/constants';
import dayjs from 'dayjs';

const { Option } = Select;

const HotelEdit = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // 从路由获取酒店ID: /hotel/edit/:id
  const [searchParams] = useSearchParams();
  
  // 判断是否为只读模式：URL带有 readonly=true 参数时禁用表单
  const isReadOnly = searchParams.get('readonly') === 'true';

  // 1. 初始化：如果是编辑模式（有ID），则获取酒店详情
  useEffect(() => {
    if (id) {
      fetchHotelDetail(id);
    }
  }, [id]);

  const fetchHotelDetail = async (hotelId) => {
    setLoading(true);
    try {
      const res = await request.get(`/hotel/detail/${hotelId}`);
      const data = res.data;

      // 解析 tags 数组中的特殊信息（EN:英文名, OPENING:开业时间）
      const nameEn = data.tags?.find(t => t.startsWith('EN:'))?.split(':')[1] || '';
      const openingDate = data.tags?.find(t => t.startsWith('OPENING:'))?.split(':')[1];

      // 将后端数据填充到表单
      form.setFieldsValue({
        name: data.name,
        name_en: nameEn,
        address: data.address,
        city: data.city,
        star: data.star,
        price: data.price,
        opening_date: openingDate ? dayjs(openingDate) : null,
        // 回显房型数据
        room_types: data.roomTypes?.map(rt => ({
          type_name: rt.name,
          price: rt.price,
          stock: rt.stock
        }))
      });
    } catch (error) {
      console.error('Fetch Detail Error:', error);
      message.error('获取酒店详情失败');
    } finally {
      setLoading(false);
    }
  };

  // 2. 提交表单逻辑
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // 构造符合后端要求的 tags
      const tags = [
        `EN:${values.name_en || ''}`,
        `OPENING:${values.opening_date ? values.opening_date.format('YYYY-MM-DD') : ''}`
      ];

      const payload = {
        id: id, // 如果是更新，必须带上酒店ID
        name: values.name,
        address: values.address,
        city: values.city || "上海",
        star: values.star,
        price: values.price,
        tags: tags,
        room_types: values.room_types // 房型列表
      };

      // 根据是否有 ID 判断调用创建还是更新接口
      const apiUrl = id ? '/hotel/update' : '/hotel/create';
      await request.post(apiUrl, payload);

      message.success(id ? '信息已更新，请等待重新审核' : '酒店发布成功，请等待审核');
      navigate('/hotel/status'); // 跳转回状态列表页
    } catch (error) {
      message.error(error.response?.data?.message || '提交失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Card 
        title={
          <Space>
            <ShopOutlined />
            <span>{id ? (isReadOnly ? '房源详情预览' : '修改被驳回信息') : '录入新房源'}</span>
          </Space>
        }
        bordered={false}
        extra={<Button onClick={() => navigate(-1)}>返回</Button>}
      >
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            disabled={isReadOnly} // 核心：如果是查看模式，禁用所有交互
            initialValues={{ star: 3, city: '上海' }}
          >
            <Divider orientation="left">基本信息</Divider>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="name" label="酒店名称" rules={[{ required: true, message: '请输入名称' }]}>
                  <Input prefix={<BookOutlined />} placeholder="例：云端大酒店" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="name_en" label="英文名称/拼音">
                  <Input prefix={<TranslationOutlined />} placeholder="Cloud Hotel" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={8}>
                <Form.Item name="city" label="所在城市">
                  <Select placeholder="选择城市">
                    <Option value="上海">上海</Option>
                    <Option value="北京">北京</Option>
                    <Option value="杭州">杭州</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item name="address" label="详细地址" rules={[{ required: true }]}>
                  <Input prefix={<EnvironmentOutlined />} placeholder="街道、门牌号" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={8}>
                <Form.Item name="star" label="酒店星级">
                  <Select>
                    <Option value={3}>三星级</Option>
                    <Option value={4}>四星级</Option>
                    <Option value={5}>五星级</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="price" label="起步价格 (¥)" rules={[{ required: true }]}>
                  <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="opening_date" label="开业日期">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left">房型配置</Divider>
            <Form.List name="room_types">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} gutter={16} align="baseline" style={{ background: '#fafafa', padding: '16px', marginBottom: '16px', borderRadius: '8px' }}>
                      <Col span={8}>
                        <Form.Item {...restField} name={[name, 'type_name']} label="房型名称" rules={[{ required: true }]}>
                          <Input placeholder="例：豪华大床房" />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item {...restField} name={[name, 'price']} label="价格">
                          <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item {...restField} name={[name, 'stock']} label="库存量">
                          <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      {!isReadOnly && (
                        <Col span={2}>
                          <Button type="text" danger icon={<MinusCircleOutlined />} onClick={() => remove(name)} />
                        </Col>
                      )}
                    </Row>
                  ))}
                  {!isReadOnly && (
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        添加新房型
                      </Button>
                    </Form.Item>
                  )}
                </>
              )}
            </Form.List>

            {!isReadOnly && (
              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" size="large" style={{ width: '200px' }} loading={loading}>
                  {id ? '提交修改并重新审核' : '立即发布房源'}
                </Button>
              </div>
            )}
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default HotelEdit;