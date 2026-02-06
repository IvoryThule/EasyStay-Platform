// [页面] 酒店审核 (管理员)
import React, { useEffect, useState } from 'react';
import { 
  Table, Tag, Space, Button, Card, message, Modal, 
  Input, Descriptions, Divider, List, Typography 
} from 'antd';
import { 
  CalendarOutlined, HomeOutlined, TranslationOutlined, 
  InfoCircleOutlined, CheckCircleOutlined, CloseCircleOutlined 
} from '@ant-design/icons';
import request from '../utils/request';

const { Text } = Typography;

const HotelAudit = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rejectReason, setRejectReason] = useState('');

  // 1. 获取酒店列表
  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await request.get('/hotel/list');
      // 兼容后端不同的返回结构
      if (res.data && Array.isArray(res.data.list)) {
        setData(res.data.list);
      } else if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch (error) {
      message.error('加载列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchList(); }, []);

  // 2. 获取酒店详情（含房型）
  const handleShowDetail = async (record) => {
    setSelectedHotel(record);
    setIsModalOpen(true);
    try {
      const res = await request.get(`/hotel/detail/${record.id}`);
      if (res.success && res.data) {
        // 根据 models/index.js 中的 as: 'roomTypes' 取值
        setRoomTypes(res.data.roomTypes || []);
      }
    } catch (error) {
      console.error("获取详情失败:", error);
      message.error('无法获取酒店房型信息');
    }
  };

  // 3. 更改状态逻辑（通过/驳回/下线/恢复）
  const handleStatusChange = async (id, newStatus, reason = '') => {
    try {
      await request.post('/hotel/update', { 
        id, 
        status: newStatus, 
        audit_remark: reason 
      });
      message.success('操作成功');
      setRejectReason('');
      setIsModalOpen(false);
      fetchList(); // 刷新列表
    } catch (error) {
      message.error('操作失败');
    }
  };

  // 辅助函数：解析 Tags 数组中的特殊信息
  const getTagValue = (tags, prefix) => {
    if (!Array.isArray(tags)) return null;
    const found = tags.find(t => t.startsWith(prefix));
    return found ? found.split(':')[1] : null;
  };

  const columns = [
    { 
      title: '酒店名称', 
      key: 'name_info',
      render: (_, record) => {
        const enName = getTagValue(record.tags, 'EN:');
        return (
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            {enName && <Text type="secondary" style={{ fontSize: '12px' }}>{enName}</Text>}
          </div>
        );
      }
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
            {status === 2 && record.audit_remark && (
              <div style={{ color: '#ff4d4f', fontSize: '11px', marginTop: 4, maxWidth: 150 }}>
                原因: {record.audit_remark}
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
          
          {/* 审核逻辑 */}
          {record.status === 0 && (
            <>
              <Button type="link" onClick={() => handleStatusChange(record.id, 1)}>通过</Button>
              <Button type="link" danger onClick={() => {
                Modal.confirm({
                  title: '拒绝审核',
                  content: <Input.TextArea 
                    placeholder="请输入驳回具体理由..." 
                    onChange={e => setRejectReason(e.target.value)}
                    style={{ marginTop: 15 }}
                  />,
                  onOk: () => handleStatusChange(record.id, 2, rejectReason)
                });
              }}>驳回</Button>
            </>
          )}

          {/* 下线逻辑 */}
          {record.status === 1 && (
            <Button type="link" danger onClick={() => handleStatusChange(record.id, 3)}>下线</Button>
          )}

          {/* 恢复逻辑 */}
          {(record.status === 3 || record.status === 2) && (
            <Button type="link" onClick={() => handleStatusChange(record.id, 0)}>重新审核</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card title="酒店审核与管理中心" variant="borderless">
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id" 
        loading={loading} 
        pagination={{ pageSize: 8 }}
      />
      
      {/* 详情弹窗 */}
      <Modal 
        title="酒店资料详情" 
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)} 
        footer={null}
        width={750}
      >
        {selectedHotel && (
          <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="中文名称" span={1}>{selectedHotel.name}</Descriptions.Item>
              <Descriptions.Item label={<><TranslationOutlined /> 英文名称</>} span={1}>
                {getTagValue(selectedHotel.tags, 'EN:') || '未填写'}
              </Descriptions.Item>
              <Descriptions.Item label={<><CalendarOutlined /> 开业时间</>} span={1}>
                {getTagValue(selectedHotel.tags, 'OPENING:') || '未设置'}
              </Descriptions.Item>
              <Descriptions.Item label="城市">{selectedHotel.city}</Descriptions.Item>
              <Descriptions.Item label="详细地址" span={2}>{selectedHotel.address}</Descriptions.Item>
              <Descriptions.Item label="星级">{selectedHotel.star} 星</Descriptions.Item>
              <Descriptions.Item label="起步价">￥{selectedHotel.price}</Descriptions.Item>
            </Descriptions>

            <Divider orientation="left" style={{ marginTop: 24 }}>
              <HomeOutlined /> 商家上传房型
            </Divider>

            <List
              dataSource={roomTypes}
              locale={{ emptyText: '该酒店尚未上传任何房型数据' }}
              renderItem={(item) => (
                <List.Item extra={<Text strong type="danger">￥{item.price}</Text>}>
                  <List.Item.Meta
                    title={item.name}
                    description={`房型ID: ${item.id} | 库存: ${item.stock || 0} 间`}
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default HotelAudit;