import React, { useState, useMemo, useEffect } from 'react';
import { 
  Row, Col, Card, Statistic, Button, Typography, Space, 
  Tag, Progress, Segmented, List, Avatar, Divider, Badge, Spin
} from 'antd'; // 已补全 Badge
import { 
  RiseOutlined, ThunderboltOutlined, CheckCircleOutlined, 
  UserOutlined, GlobalOutlined, RadarChartOutlined,
  DownloadOutlined, InfoCircleOutlined, FilterOutlined
} from '@ant-design/icons';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Bar, PieChart, Pie, Cell, Legend, ComposedChart, Line, Radar, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import request from '../utils/request';

const { Title, Text } = Typography;

// --- 高级 B端 色板 (Graphite & Tech Blue) ---
const THEME = {
  primary: '#0ea5e9',     // 科技青
  secondary: '#64748b',   // 石墨灰
  success: '#10b981',     // 翡翠绿
  warning: '#f59e0b',     // 琥珀金
  bg: '#f1f5f9',          // 极淡灰背景
  text: '#0f172a'         // 深蓝黑字体
};

const CHART_COLORS = ['#0ea5e9', '#6366f1', '#10b981', '#f59e0b', '#ec4899'];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await request.get('/admin/dashboard');
      setDashboardData(res.data);
    } catch (error) {
      console.error('获取看板数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ background: THEME.bg, minHeight: '100vh', padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" tip="加载数据中..." />
      </div>
    );
  }

  const { overview, trend, channelDist, hotelStats } = dashboardData || { 
    overview: {}, 
    trend: [], 
    channelDist: [],
    hotelStats: {}
  };

  // 格式化趋势数据 - 使用后端真实数据
  const trendDataFormatted = trend || [];

  // 格式化渠道分布数据 - 使用后端真实数据
  const channelDataFormatted = channelDist || [];

  return (
    <div style={{ background: THEME.bg, minHeight: '100vh', padding: '24px' }}>
      
      {/* 顶部专业筛选栏 */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <Space size="large">
          <Title level={4} style={{ margin: 0, color: THEME.text }}>经营数据报告</Title>
        </Space>
        <Space>
          <Button icon={<DownloadOutlined />}>导出报告</Button>
          <Button type="primary" icon={<FilterOutlined />} onClick={fetchDashboardData}>刷新数据</Button>
        </Space>
      </div>

      {/* 核心指标卡片  */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { label: '预订订单数', value: overview.totalOrders || 0, color: THEME.primary },
          { label: '间夜量', value: overview.totalNights || 0, color: THEME.success },
          { label: '销售额 (RMB)', value: `${(parseFloat(overview.totalRevenue || 0) / 10000).toFixed(2)}万`, color: THEME.text },
          { label: '平均转化率', value: overview.avgConversionRate || '0%', color: THEME.warning },
        ].map((item, i) => (
          <Col xs={24} sm={12} lg={6} key={i}>
            <Card variant="borderless" style={{ borderRadius: 12 }}>
              <Statistic 
                title={<Text type="secondary">{item.label}</Text>}
                value={item.value}
                valueStyle={{ fontWeight: 700, color: THEME.text }}
              />
              <div style={{ marginTop: 12 }}>
                <Progress 
                  percent={70 + i * 5} 
                  size={['100%', 6]} 
                  showInfo={false} 
                  strokeColor={item.color} 
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* 左侧：复合趋势分析 (折线 + 柱状) */}
        <Col xs={24} xl={16}>
          <Card 
            title="多维业务趋势" 
            variant="borderless" 
            style={{ borderRadius: 12 }}
            extra={<Segmented options={['实时', '按日', '按周', '按月']} defaultValue="按日" />}
          >
            {/* 设定了具体高度的容器*/}
            <div style={{ width: '100%', height: 400, minHeight: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trendDataFormatted} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                  <Bar dataKey="orders" name="预订量" fill={THEME.primary} radius={[4, 4, 0, 0]} barSize={24} />
                  <Area type="monotone" dataKey="revenue" name="营收额" fill="#e0f2fe" stroke={THEME.primary} strokeWidth={2} fillOpacity={0.6} />
                  <Line type="monotone" dataKey="satisfaction" name="满意度" stroke={THEME.success} strokeWidth={2} dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* 右侧:酒店状态分布 */}
        <Col xs={24} xl={8}>
          <Card title="酒店状态统计" variant="borderless" style={{ borderRadius: 12, height: '100%' }}>
            <div style={{ padding: '20px 0' }}>
              <Row gutter={[16, 24]}>
                <Col span={12}>
                  <Statistic 
                    title="已发布" 
                    value={hotelStats?.published || 0} 
                    valueStyle={{ color: THEME.success, fontSize: 32 }} 
                    prefix="🟢"
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="审核中" 
                    value={hotelStats?.pending || 0} 
                    valueStyle={{ color: THEME.warning, fontSize: 32 }}
                    prefix="🟡"
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="已驳回" 
                    value={hotelStats?.rejected || 0} 
                    valueStyle={{ color: THEME.error, fontSize: 32 }}
                    prefix="🔴"
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="已下线" 
                    value={hotelStats?.offline || 0} 
                    valueStyle={{ color: '#94a3b8', fontSize: 32 }}
                    prefix="⚫"
                  />
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>


    </div>
  );
};

export default Dashboard;