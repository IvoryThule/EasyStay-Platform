import React, { useEffect, useState } from 'react';
import { 
  Table, Tag, Space, Button, Card, message, Modal, 
  Input, Descriptions, Divider, List, Typography, Image 
} from 'antd';
import { 
  HomeOutlined, InfoCircleOutlined, CheckCircleOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import request from '../utils/request';
import { API_BASE_URL } from '../utils/constants';

const { Text } = Typography;

const HotelAudit = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  
  const BASE_URL = API_BASE_URL.replace(/\/api$/, '');

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await request.get('/hotel/list');
      const list = res.data?.list || res.data?.data || res.data || [];
      setData(list);
    } catch (error) {
      message.error('加载列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchList(); }, []);

  // 辅助函数：补全图片地址
  const renderImageUrl = (path) => {
    if (!path) return "https://placehold.co/200x200?text=No+Img";
    if (path.startsWith('http')) return path;
    const normalizedPath = path.replace(/\\/g, '/');
    const safePath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
    return `${BASE_URL}${safePath}`;
  };

  const handleShowDetail = async (record) => {
  setSelectedHotel(record);
  setIsModalOpen(true);
  
  // 从 tags 中寻找房型数据
  const roomTag = record.tags?.find(t => t.startsWith('ROOMDATA:'));
  
  if (roomTag) {
    try {
      // 去掉前缀并解析 JSON
      const jsonStr = roomTag.replace('ROOMDATA:', '');
      const parsedRooms = JSON.parse(jsonStr);
      setRoomTypes(parsedRooms);
    } catch (e) {
      console.error("解析房型失败", e);
      setRoomTypes([]);
    }
  } else {
    // 如果没有 ROOMDATA，尝试走原来的接口逻辑（兼容老数据）
    try {
      const res = await request.get(`/hotel/detail/${record.id}`);
      const detailData = res.data?.data || res.data;
      setRoomTypes(detailData.roomTypes || detailData.room_types || []);
    } catch (error) {
      setRoomTypes([]);
    }
  }
};

  const handleStatusChange = async (id, newStatus, reason = '') => {
    try {
      await request.post('/hotel/update', { 
        id, 
        status: newStatus, 
        reject_reason: reason 
      });
      message.success('操作成功');
      setIsModalOpen(false);
      fetchList();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const getTagValue = (tags, prefix) => {
    if (!Array.isArray(tags)) return null;
    const found = tags.find(t => t.startsWith(prefix));
    return found ? found.substring(prefix.length) : null;
  };

  const columns = [
    { 
      title: '封面', 
      dataIndex: 'cover_image', 
      key: 'cover',
      render: (url) => <Image src={renderImageUrl(url)} width={50} height={50} style={{ objectFit: 'cover' }} />
    },
    { 
      title: '酒店名称', 
      key: 'name_info',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.name}</div>
          {getTagValue(record.tags, 'EN:') && <Text type="secondary" style={{ fontSize: '12px' }}>{getTagValue(record.tags, 'EN:')}</Text>}
        </div>
      )
    },
    { title: '城市', dataIndex: 'city', key: 'city' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status, record) => {
        const configs = {
          0: { color: 'gold', text: '待审核', icon: <InfoCircleOutlined /> },
          1: { color: 'green', text: '已通过', icon: <CheckCircleOutlined /> },
          2: { color: 'red', text: '已驳回', icon: <CloseCircleOutlined /> },
          3: { color: 'default', text: '已下线', icon: <InfoCircleOutlined /> }
        };
        const config = configs[status] || { color: 'blue', text: '未知' };
        return (
          <Space direction="vertical" size={0}>
            <Tag color={config.color} icon={config.icon}>{config.text}</Tag>
            {status === 2 && record.reject_reason && (
              <div style={{ color: '#ff4d4f', fontSize: '11px', marginTop: 4, maxWidth: 150 }}>
                原因: {record.reject_reason}
              </div>
            )}
          </Space>
        );
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" onClick={() => handleShowDetail(record)}>详情</Button>
          {record.status === 0 && (
            <>
              <Button type="link" onClick={() => handleStatusChange(record.id, 1)}>通过</Button>
              <Button type="link" danger onClick={() => {
                let reasonValue = '';
                Modal.confirm({
                  title: '拒绝审核',
                  content: <Input.TextArea 
                    placeholder="请输入驳回具体理由..." 
                    onChange={e => reasonValue = e.target.value}
                    style={{ marginTop: 15 }}
                  />,
                  onOk: () => {
                    if (!reasonValue.trim()) {
                      message.error('理由不能为空');
                      return Promise.reject();
                    }
                    return handleStatusChange(record.id, 2, reasonValue);
                  }
                });
              }}>驳回</Button>
            </>
          )}
          {record.status === 1 && <Button type="link" danger onClick={() => handleStatusChange(record.id, 3)}>下线</Button>}
          {record.status === 3 && (
            <>
              <Button type="link" onClick={() => {
                Modal.confirm({
                  title: '确认恢复?',
                  content: '恢复后酒店将重新上线并对用户可见',
                  onOk: async () => {
                    try {
                      await request.post('/hotel/restore', { id: record.id });
                      message.success('恢复成功');
                      fetchList();
                    } catch (error) {
                      message.error('恢复失败');
                    }
                  }
                });
              }}>恢复上线</Button>
            </>
          )}
          {record.status === 2 && <Button type="link" onClick={() => handleStatusChange(record.id, 0)}>重审</Button>}
        </Space>
      ),
    },
  ];

  return (
    <Card title="酒店审核与管理中心">
      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} pagination={{ pageSize: 8 }} />
      <Modal title="酒店资料详情" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} width={750}>
        {selectedHotel && (
          <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="酒店主图" span={2}>
                <Image src={renderImageUrl(selectedHotel.cover_image)} width={200} />
              </Descriptions.Item>
              <Descriptions.Item label="其他图片" span={2}>
                  <Space wrap size="small">
                    {/* 优先展示 images 字段中的图片 */}
                    {selectedHotel.images && Array.isArray(selectedHotel.images) && selectedHotel.images.length > 0 && 
                      selectedHotel.images.map((img, index) => (
                        <Image key={`img-${index}`} src={renderImageUrl(img)} width={100} height={100} style={{ objectFit: 'cover' }} />
                      ))
                    }
                    {/* 兼容 tags 中的 IMAGES: */}
                    {(() => {
                        const imagesTagStr = Array.isArray(selectedHotel.tags) ? selectedHotel.tags.find(t => typeof t === 'string' && t.startsWith('IMAGES:')) : null;
                        if (imagesTagStr) {
                            try {
                                const jsonStr = imagesTagStr.substring('IMAGES:'.length);
                                const parsed = JSON.parse(jsonStr);
                                if (Array.isArray(parsed) && parsed.length > 0) {
                                    return parsed.map((img, index) => (
                                        <Image key={`tag-img-${index}`} src={renderImageUrl(img)} width={100} height={100} style={{ objectFit: 'cover' }} />
                                    ));
                                }
                            } catch (e) {
                                console.error('Parsed IMAGES tag error', e);
                            }
                        }
                        return null;
                    })()}
                    {(!selectedHotel.images?.length && (!Array.isArray(selectedHotel.tags) || !selectedHotel.tags.find(t => typeof t === 'string' && t.startsWith('IMAGES:')))) && <Text type="secondary">暂无更多图片</Text>}
                  </Space>
              </Descriptions.Item>
              <Descriptions.Item label="中文名称">{selectedHotel.name}</Descriptions.Item>
              <Descriptions.Item label="英文名称">{getTagValue(selectedHotel.tags, 'EN:') || '未填写'}</Descriptions.Item>
              <Descriptions.Item label="开业时间">{getTagValue(selectedHotel.tags, 'OPENING:') || '未设置'}</Descriptions.Item>
              <Descriptions.Item label="城市">{selectedHotel.city}</Descriptions.Item>
              <Descriptions.Item label="详细地址" span={2}>{selectedHotel.address}</Descriptions.Item>
              <Descriptions.Item label="星级">{selectedHotel.star} 星</Descriptions.Item>
              <Descriptions.Item label="起步价">￥{selectedHotel.price}</Descriptions.Item>
            </Descriptions>
            <Divider orientation="left"><HomeOutlined /> 房型信息 ({roomTypes.length})</Divider>
            <List
              dataSource={roomTypes}
              itemLayout="horizontal"
              renderItem={(item) => (
                <List.Item extra={<Text strong type="danger">￥{item.price}</Text>}>
                  <List.Item.Meta 
                    avatar={
                      <Image 
                        src={renderImageUrl(item.image)} 
                        width={100} 
                        height={75} 
                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                        fallback="https://placehold.co/100x75?text=No+Img"
                      />
                    }
                    title={item.name} 
                    description={`库存: ${item.stock} 间`} 
                  />
                </List.Item>
              )}
              locale={{ emptyText: '暂无房型数据' }}
            />
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default HotelAudit;