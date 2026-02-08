import React, { useEffect, useState } from 'react';
import { 
  Table, Tag, Space, Button, Card, message, Modal, 
  Input, Descriptions, Divider, List, Typography, Image 
} from 'antd';
import { 
  HomeOutlined, InfoCircleOutlined, CheckCircleOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import request from '../utils/request';

const { Text } = Typography;

const HotelAudit = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  
  const BASE_URL = 'http://localhost:3001';

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await request.get('/hotel/list');
      const list = res.data?.list || res.data || [];
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
    return path.startsWith('http') ? path : `${BASE_URL}${path}`;
  };

  const handleShowDetail = async (record) => {
    setSelectedHotel(record);
    setIsModalOpen(true);
    setRoomTypes([]); // 重置房型
    try {
      const res = await request.get(`/hotel/detail/${record.id}`);
      const detailData = res.data?.data || res.data;
    setRoomTypes(detailData.roomTypes || detailData.room_types || []);
    } catch (error) {
      message.error('无法获取酒店房型信息');
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
    return found ? found.split(':')[1] : null;
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
          {(record.status === 3 || record.status === 2) && <Button type="link" onClick={() => handleStatusChange(record.id, 0)}>重审</Button>}
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
              renderItem={(item) => (
                <List.Item extra={<Text strong type="danger">￥{item.price}</Text>}>
                  <List.Item.Meta 
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