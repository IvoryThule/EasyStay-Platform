// [页面] 酒店审核 (管理员)
import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, Card, message, Popconfirm } from 'antd';
import request from '../utils/request';

// 修改 handleAudit 逻辑
const handleAudit = async (id, action) => {
  try {
    // 假设后端审核接口为 /hotel/update 或专门的 /hotel/audit
    // 根据 controller 逻辑，管理员可以直接 update 状态
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

// 修改 Table 的 columns 状态渲染
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
        {record.status === 0 && ( // 仅待审核状态显示操作
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

export default HotelAudit;