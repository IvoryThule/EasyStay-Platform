import React, { useState, useEffect } from 'react';
import { 
  Form, Input, InputNumber, Button, Card, message, Upload, Space,
  Row, Col, Select, DatePicker, Divider, Spin 
} from 'antd';
import { 
  PlusOutlined, BookOutlined, EnvironmentOutlined, 
  MinusCircleOutlined, ShopOutlined, TranslationOutlined
} from '@ant-design/icons';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import request from '../utils/request';
import { STORAGE_KEYS, API_BASE_URL } from '../utils/constants';
import dayjs from 'dayjs';
import './HotelEdit.css';

const { Option } = Select;

const HotelEdit = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [galleryFileList, setGalleryFileList] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  
  const BASE_URL = API_BASE_URL.replace(/\/api$/, '');

  const normalizeUpload = (e) => (Array.isArray(e) ? e : e?.fileList || []);

  const resolveFileUrl = (file) => {
    const rawUrl = file?.response?.data?.url || file?.response?.url || file?.url || '';
    return rawUrl ? rawUrl.replace(BASE_URL, '') : '';
  };

  const buildFileList = (urls = []) => {
    return urls.filter(Boolean).map((url, index) => {
      const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
      return {
        uid: `img-${index}`,
        name: `image-${index}.png`,
        status: 'done',
        url: fullUrl,
        thumbUrl: fullUrl
      };
    });
  };

  // 允许编辑的状态: 2(驳回), 1(已发布-需要重新审核)
  // 只有 status=0 (审核中) 或者是明确传了 readonly 参数时，才是只读
  const isReadOnly = searchParams.get('readonly') === 'true' || (id && currentStatus === 0);

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
      setCurrentStatus(data.status);

      if (data.cover_image) {
        const fullUrl = data.cover_image.startsWith('http') ? data.cover_image : `${BASE_URL}${data.cover_image}`;
        setFileList([{ uid: '-1', name: 'image.png', status: 'done', url: fullUrl, thumbUrl: fullUrl }]);
      }

      if (Array.isArray(data.images) && data.images.length > 0) {
        setGalleryFileList(buildFileList(data.images));
      } else {
        setGalleryFileList([]);
      }

      const nameEn = data.tags?.find(t => t.startsWith('EN:'))?.split(':')[1] || '';
      const openingDate = data.tags?.find(t => t.startsWith('OPENING:'))?.split(':')[1];

      form.setFieldsValue({
        name: data.name,
        name_en: nameEn,
        address: data.address,
        city: data.city ? [data.city] : [],
        star: data.star,
        price: data.price,
        opening_date: openingDate ? dayjs(openingDate) : null,
        room_types: (data.roomTypes || data.room_types || []).map(rt => ({
          id: rt.id, // 关键：保存 id 用于更新
          type_name: rt.name, 
          price: rt.price,
          stock: rt.stock,
          image: rt.image ? buildFileList([rt.image]) : []
        }))
      });
    } catch (error) {
      message.error('获取详情失败');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let coverImage = '';
      if (fileList.length > 0) {
        const file = fileList[0];
        coverImage = resolveFileUrl(file);
      }

      const galleryImages = galleryFileList
        .map(resolveFileUrl)
        .filter(Boolean);

      const tags = [
        `EN:${values.name_en || ''}`,
        `OPENING:${values.opening_date ? values.opening_date.format('YYYY-MM-DD') : ''}`
      ];

      const roomTypesJson = JSON.stringify((values.room_types || []).map(item => ({
        name: item.type_name,
        price: item.price,
        stock: item.stock
      })));

      // 构建传给后端的 room_types 数组
      const roomTypesPayload = (values.room_types || []).map(item => {
        const roomImageFile = Array.isArray(item.image) ? item.image[0] : null;
        const roomImage = roomImageFile ? resolveFileUrl(roomImageFile) : '';
        return {
          // 如果有 id 传回 id（更新），否则不传（新增）
          id: item.id, 
          name: item.type_name,
          price: item.price,
          stock: item.stock,
          image: roomImage
        };
      });

      const payload = {
        id: id,
        ...values,
        city: Array.isArray(values.city) ? values.city[0] : values.city,
        cover_image: coverImage,
        images: galleryImages,
        tags: [
          `EN:${values.name_en || ''}`,
          `OPENING:${values.opening_date ? values.opening_date.format('YYYY-MM-DD') : ''}`,
          `ROOMDATA:${roomTypesJson}` // 保留以兼容旧逻辑，但主要依靠 room_types
        ],
        room_types: roomTypesPayload, // 新增：显式传递房型数据
        status: 0 
      };

      const apiUrl = id ? '/hotel/update' : '/hotel/create';
      await request.post(apiUrl, payload);

      message.success(id ? '信息已更新，请等待重新审核' : '酒店发布成功，请等待审核');
      navigate('/hotel/status');
    } catch (error) {
      message.error(error.response?.data?.message || '提交失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hotel-edit-page">
      <Card 
        title={
          <Space>
            <ShopOutlined />
            <span>{id ? (isReadOnly ? '房源详情预览' : '修改被驳回信息') : '录入新房源'}</span>
          </Space>
        }
        bordered={false}
        extra={<Button onClick={() => navigate(-1)}>返回</Button>}
        className="hotel-edit-card"
      >
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            disabled={isReadOnly}
            initialValues={{ star: 3, city: '上海' }}
          >
            <Divider orientation="left">基本信息</Divider>

            <Row gutter={24} className="hotel-edit-upload-row">
              <Col span={8}>
                <Form.Item label="酒店主图" required>
                  <Upload
                    action={`${BASE_URL}/api/upload`}
                    name="file"
                    headers={{ Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}` }}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={({ fileList }) => setFileList(fileList)}
                    maxCount={1}
                  >
                    {fileList.length < 1 && <div><PlusOutlined /><div style={{ marginTop: 8 }}>上传</div></div>}
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="酒店相册" extra="建议上传 3-6 张高质量图片，提升展示效果">
                  <Upload
                    action={`${BASE_URL}/api/upload`}
                    name="file"
                    headers={{ Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}` }}
                    listType="picture-card"
                    fileList={galleryFileList}
                    onChange={({ fileList }) => setGalleryFileList(fileList)}
                    multiple
                    maxCount={6}
                  >
                    {galleryFileList.length < 6 && <div><PlusOutlined /><div style={{ marginTop: 8 }}>上传</div></div>}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

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
                  {/* 增加 mode="tags" 支持自定义城市输入 */}
                  <Select 
                    showSearch 
                    mode="tags" 
                    placeholder="请选择或输入城市"
                    maxCount={1}
                  >
                    <Option value="上海">上海</Option>
                    <Option value="北京">北京</Option>
                    <Option value="杭州">杭州</Option>
                    <Option value="深圳">深圳</Option>
                    <Option value="成都">成都</Option>
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
                    {[1, 2, 3, 4, 5].map(s => <Option key={s} value={s}>{s}星级</Option>)}
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
                    <Row key={key} gutter={16} align="baseline" className="roomtype-row">
                      <Col span={0}>
                         <Form.Item {...restField} name={[name, 'id']} hidden>
                           <Input />
                         </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item {...restField} name={[name, 'type_name']} label="房型名称" rules={[{ required: true }]}>
                          <Input placeholder="例：豪华大床房" />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item {...restField} name={[name, 'price']} label="价格">
                          <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item {...restField} name={[name, 'stock']} label="库存量">
                          <InputNumber min={0} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          {...restField}
                          name={[name, 'image']}
                          label="房型图片"
                          valuePropName="fileList"
                          getValueFromEvent={normalizeUpload}
                        >
                          <Upload
                            action={`${BASE_URL}/api/upload`}
                            name="file"
                            headers={{ Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}` }}
                            listType="picture-card"
                            maxCount={1}
                          >
                            {((form.getFieldValue(['room_types', name, 'image']) || []).length < 1) && (
                              <div><PlusOutlined /><div style={{ marginTop: 8 }}>上传</div></div>
                            )}
                          </Upload>
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