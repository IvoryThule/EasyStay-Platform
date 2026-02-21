import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Card, message, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import request from '../utils/request';
import { ROUTE_PATHS } from '../utils/constants';

const { Text } = Typography;

const HotelStatus = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 
const fetchMyHotels = async () => {
  setLoading(true);
  try {
    // 传入 my_hotel=true，后端 list 函数会自动根据 req.user.id 过滤
    const res = await request.get('/hotel/list', { 
      params: { my_hotel: 'true' } 
    }); 
    
    // 根据后端 success 包装类的结构取值
    const data = res.data?.list || res.data || [];
    setList(data);
  } catch (error) {
    message.error('获取酒店列表失败');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { fetchMyHotels(); }, []);

  const columns = [
    { title: '酒店名称', dataIndex: 'name', key: 'name' },
    { title: '城市', dataIndex: 'city', key: 'city' },
    { title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status, record) => {
        const statusMap = {
          0: { color: 'gold', text: '审核中' },
          1: { color: 'green', text: '已通过 (点击修改)' },
          2: { color: 'red', text: '已驳回' },
          3: { color: 'default', text: '已下线' }
        };
        const config = statusMap[status] || { color: 'blue', text: '未知' };
        return (
          <Space direction="vertical" size={0}>
            <Tag color={config.color}>{config.text}</Tag>
            {/* 确保这里读取的是 record.reject_reason */}
            {status === 2 && record.reject_reason && (
              <div style={{ marginTop: 5, padding: '4px 8px', background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: '4px' }}>
                <Text type="danger" style={{ fontSize: '12px' }}>原因: {record.reject_reason}</Text>
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
        <Space>
          {/* 允许修改状态为 2 (驳回) 或 1 (已发布) 的酒店 */}
          {record.status === 2 || record.status === 1 ? (
            <Button type="primary" onClick={() => navigate(`${ROUTE_PATHS.HOTEL_EDIT}/${record.id}`)}>
              {record.status === 1 ? '修改信息' : '修改并重审'}
            </Button>
          ) : (
            <Button onClick={() => navigate(`${ROUTE_PATHS.HOTEL_EDIT}/${record.id}?readonly=true`)}>
              查看详情
            </Button>
          )}
        </Space>
      )
    }
  ];

  return (
    <Card title="我的酒店房源状态">
      <Table dataSource={list} columns={columns} rowKey="id" loading={loading} />
    </Card>
  );
};

export default HotelStatus;