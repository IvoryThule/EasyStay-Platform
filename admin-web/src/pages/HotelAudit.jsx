// [页面] 酒店审核 (管理员)
import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, Card, message, Popconfirm } from 'antd';
import request from '../utils/request';

const HotelAudit = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 获取待审核列表
  /*const fetchList = async () => {
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
*/
const fetchList = async () => {
  setLoading(true);
  try {
    const res = await request.get('/hotels/audit-list');
    console.log('响应数据:', res); // 关键调试点
    if (res.success || res.status === 200) {
      // 兼容处理：如果 res.data 是数组直接设，如果 res.data.rows 是数组则取 rows
      const list = Array.isArray(res.data) ? res.data : (res.data?.rows || []);
      setData(list);
    } else {
      message.warning('后端返回格式不匹配');
    }
  } catch (error) {
    console.error('请求发生错误:', error);
    message.error('无法连接到服务器，请检查后端是否启动');
  } finally {
    setLoading(false);
  }
};

//
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