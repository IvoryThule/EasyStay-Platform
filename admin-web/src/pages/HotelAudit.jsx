// [页面] 酒店审核 (管理员)
import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, Card, message, Popconfirm } from 'antd';
import request from '../utils/request';

const HotelAudit = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. 获取列表数据的方法
  const fetchList = async () => {
    setLoading(true);
    try {
      // 注意：请确保后端接口路径正确，如果 /hotel/audit-list 报错 404，请检查后端路由
      const res = await request.get('/hotel/list'); 
      if (res.success || res.status === 200) {
        setData(res.data || []);
      }
    } catch (error) {
      message.error('加载审核列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 2. 组件挂载时加载数据
  useEffect(() => {
    fetchList();
  }, []);

  // 3. 审核操作逻辑
  const handleAudit = async (id, action) => {
    try {
      const statusValue = action === 'approved' ? 1 : 2; // 1:通过, 2:驳回
      const res = await request.post('/hotel/update', { 
        id: id, 
        status: statusValue 
      });

      if (res.success || res.status === 200) {
        message.success(action === 'approved' ? '已通过审核' : '已驳回申请');
        fetchList(); // 重新加载列表
      }
    } catch (error) {
      console.error(error);
      message.error('操作失败');
    }
  };

  // 4. 表格列定义
  const columns = [
    { title: '酒店名称', dataIndex: 'name', key: 'name' },
    { title: '城市', dataIndex: 'city', key: 'city' },
    { 
      title: '基准价格', 
      dataIndex: 'price', 
      key: 'price',
      render: (text) => `￥${text}` 
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          0: { color: 'gold', text: '待审核' },
          1: { color: 'green', text: '已通过' },
          2: { color: 'red', text: '已驳回' }
        };
        const config = statusConfig[status] || { color: 'default', text: '未知' };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 0 && (
            <>
              <Popconfirm title="确定通过该酒店申请吗？" onConfirm={() => handleAudit(record.id, 'approved')}>
                <Button type="link">通过</Button>
              </Popconfirm>
              <Popconfirm title="确定驳回吗？" onConfirm={() => handleAudit(record.id, 'rejected')}>
                <Button type="link" danger>驳回</Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card title="酒店资料审核中心" variant="borderless">
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