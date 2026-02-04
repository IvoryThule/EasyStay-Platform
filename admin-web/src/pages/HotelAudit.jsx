// [页面] 酒店审核 (管理员)
import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, Card, message, Popconfirm } from 'antd';
import request from '../utils/request';

const HotelAudit = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 获取待审核列表
  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await request.get('/hotels/audit-list');
      if (res.success) {
        setData(res.data);
      }
    } catch (error) {
      message.error('获取列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // 审核操作
  const handleAudit = async (id, status) => {
    try {
      const res = await request.post('/hotels/audit', { id, status });
      if (res.success) {
        message.success(status === 'approved' ? '已通过审核' : '已驳回申请');
        fetchList(); // 刷新列表
      }
    } catch (error) {
      message.error('操作失败');
    }
  };

  const columns = [
    { title: '酒店名称', dataIndex: 'name', key: 'name' },
    { title: '申请人', dataIndex: 'ownerName', key: 'ownerName' },
    { 
      title: '价格', 
      dataIndex: 'price', 
      key: 'price',
      render: (text) => `￥${text}` 
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'pending' ? 'gold' : 'green'}>
          {status === 'pending' ? '待审核' : '已通过'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm title="确定通过该酒店申请吗？" onConfirm={() => handleAudit(record.id, 'approved')}>
            <Button type="link">通过</Button>
          </Popconfirm>
          <Popconfirm title="确定驳回吗？" onConfirm={() => handleAudit(record.id, 'rejected')}>
            <Button type="link" danger>驳回</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card title="酒店准入审核列表" bordered={false}>
        <Table 
          columns={columns} 
          dataSource={data} 
          rowKey="id" 
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default HotelAudit;