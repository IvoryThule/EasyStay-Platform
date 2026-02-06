import React, { useState } from 'react';

import { 

  Form, Input, InputNumber, Button, Card, message, Upload, 

  Row, Col, Select, DatePicker, Divider, TimePicker 

} from 'antd';

import { 

  PlusOutlined, BookOutlined, EnvironmentOutlined, 

  MinusCircleOutlined, ShopOutlined, TranslationOutlined

} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

import request from '../utils/request';

import { ROUTE_PATHS } from '../utils/constants';



const { Option } = Select;



const HotelEdit = () => {

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const onFinish = async (values) => {

  setLoading(true);

  try {

    // 1. 创建酒店

    const hotelPayload = {

      name: values.name,

      address: values.address,

      city: values.city || "上海",

      star: values.star,

      price: values.price,

      tags: [

        `EN:${values.name_en}`,

        `OPENING:${values.opening_date?.format('YYYY-MM-DD')}`

      ].filter(Boolean),

      cover_image: "", 

      latitude: 0,

      longitude: 0

    };



    const res = await request.post('/hotel/create', hotelPayload);

    

    // 这里要注意：如果 hotel/create 报错 403，代码会直接跳到 catch 块

    const hotelId = res.data?.id || res.id; 



    // 2. 批量添加房型

    if (values.room_types && values.room_types.length > 0) {

      const roomTypePromises = values.room_types.map(room => 

        // 请在此处核对后端真实的房型添加路径！！

        request.post('/hotel/roomtype/add', { 

          hotel_id: hotelId,

          name: room.type_name,

          price: room.price,

          stock: room.stock || 10

        })

      );

      await Promise.all(roomTypePromises);

    }



    message.success('提交成功，请等待审核');

    navigate(ROUTE_PATHS.DASHBOARD);

  } catch (error) {

    console.error('Submit Error:', error);

    // 打印出完整的错误对象辅助调试

    const status = error.response?.status;

    const msg = error.response?.data?.msg || "系统错误";

    

    if (status === 403) {

      message.error(`提交失败(403)：您的账号没有商家权限，请检查 role 字段`);

    } else if (status === 404) {

      message.error(`提交失败(404)：后端房型添加接口路径不正确`);

    } else {

      message.error(`提交失败：${msg}`);

    }

  } finally {

    setLoading(false);

  }

};





  return (

    <div style={{ padding: '24px', background: '#f5f7fa' }}>

      <Card 

        title={<span><BookOutlined /> 录入酒店详细资料</span>} 

        bordered={false}

        style={{ maxWidth: 900, margin: '0 auto' }}

      >

        <Form

          form={form}

          layout="vertical"

          onFinish={onFinish}

          initialValues={{ star: 3, room_types: [{}] }}

        >

          {/* --- 基础信息 --- */}

          <Divider orientation="left">基础信息</Divider>

          <Row gutter={16}>

            <Col span={12}>

              <Form.Item label="酒店中文名" name="name" rules={[{ required: true, message: '请输入中文名称' }]}>

                <Input prefix={<ShopOutlined />} placeholder="如：上海陆家嘴禧酒店" />

              </Form.Item>

            </Col>

            <Col span={12}>

              <Form.Item label="酒店英文名" name="name_en" rules={[{ required: true, message: '请输入英文名称' }]}>

                <Input prefix={<TranslationOutlined />} placeholder="Hotel English Name" />

              </Form.Item>

            </Col>

          </Row>



          <Row gutter={16}>

            <Col span={6}>

              <Form.Item label="所在城市" name="city" rules={[{ required: true }]}>

                <Input placeholder="上海" />

              </Form.Item>

            </Col>

            <Col span={6}>

              <Form.Item label="星级评分" name="star" rules={[{ required: true }]}>

                <Select>

                  {[1, 2, 3, 4, 5].map(s => <Option key={s} value={s}>{s} 星级</Option>)}

                </Select>

              </Form.Item>

            </Col>

            <Col span={6}>

              <Form.Item label="开业日期" name="opening_date" rules={[{ required: true }]}>

                <DatePicker style={{ width: '100%' }} />

              </Form.Item>

            </Col>

            <Col span={6}>

              <Form.Item label="起步价 (展示用)" name="price" rules={[{ required: true }]}>

                <InputNumber prefix="￥" style={{ width: '100%' }} min={0} />

              </Form.Item>

            </Col>

          </Row>



          <Form.Item label="详细地址" name="address" rules={[{ required: true }]}>

            <Input prefix={<EnvironmentOutlined />} placeholder="请输入酒店详细街道地址" />

          </Form.Item>



          {/* --- 房型配置 --- */}

          <Divider orientation="left">房型与具体价格</Divider>

          <Form.List 

            name="room_types" 

            rules={[{ validator: async (_, names) => (!names || names.length < 1) && Promise.reject(new Error('请至少添加一种房型')) }]}

          >

            {(fields, { add, remove }, { errors }) => (

              <>

                {fields.map(({ key, name, ...restField }) => (

                  <Row key={key} gutter={12} align="bottom" style={{ marginBottom: 16, background: '#f9f9f9', padding: '12px', borderRadius: '4px' }}>

                    <Col span={7}>

                      <Form.Item {...restField} label="房型名称" name={[name, 'type_name']} rules={[{ required: true, message: '必填' }]}>

                        <Input placeholder="例如：行政大床房" />

                      </Form.Item>

                    </Col>

                    <Col span={5}>

                      <Form.Item {...restField} label="价格" name={[name, 'price']} rules={[{ required: true, message: '必填' }]}>

                        <InputNumber min={0} prefix="￥" style={{ width: '100%' }} />

                      </Form.Item>

                    </Col>

                    <Col span={4}>

                      <Form.Item {...restField} label="库存" name={[name, 'stock']} rules={[{ required: true, message: '必填' }]}>

                        <InputNumber min={0} style={{ width: '100%' }} placeholder="10" />

                      </Form.Item>

                    </Col>

                    <Col span={6}>

                      <Form.Item {...restField} label="退房时间" name={[name, 'time_range']}>

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



          {/* --- 图片上传占位 --- */}

          <Form.Item 

  label="酒店图片" 

  name="images" 

  valuePropName="fileList" 

  getValueFromEvent={(e) =>

 Array.isArray(e) ? e : e?.fileList}

>

  <Upload listType="picture-card" beforeUpload={() =>

 false}>

    <div><PlusOutlined /><div style={{ marginTop: 8 }}>上传</div></div>

  </Upload>

</Form.Item>



          <Form.Item style={{ marginTop: 32 }}>

            <Button type="primary" htmlType="submit" loading={loading} size="large" block>

              保存酒店并提交审核

            </Button>

          </Form.Item>

        </Form>

      </Card>

    </div>

  );

};



export default HotelEdit;