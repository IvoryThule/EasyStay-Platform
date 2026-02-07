import React, { useState, useMemo } from 'react';
import { 
  Row, Col, Card, Statistic, Button, Typography, Space, 
  Tag, Progress, Segmented, List, Avatar, Divider, Badge
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

// --- 丰富的数据源 ---
const TREND_DATA = [
  { name: '02-01', revenue: 4500, orders: 120, satisfaction: 85 },
  { name: '02-02', revenue: 5200, orders: 150, satisfaction: 88 },
  { name: '02-03', revenue: 3800, orders: 100, satisfaction: 82 },
  { name: '02-04', revenue: 6500, orders: 220, satisfaction: 90 },
  { name: '02-05', revenue: 4800, orders: 140, satisfaction: 86 },
  { name: '02-06', revenue: 5900, orders: 180, satisfaction: 92 },
  { name: '02-07', revenue: 7200, orders: 250, satisfaction: 95 },
];

const CHANNEL_DISTRIBUTION = [
  { name: '携程分销', value: 400 },
  { name: '美团直连', value: 300 },
  { name: '易宿直营', value: 200 },
  { name: '飞猪官网', value: 100 },
];

const PERFORMANCE_RADAR = [
  { subject: '卫生', A: 120, full: 150 },
  { subject: '服务', A: 98, full: 150 },
  { subject: '设施', A: 86, full: 150 },
  { subject: '性价比', A: 99, full: 150 },
  { subject: '位置', A: 85, full: 150 },
];

const Dashboard = () => {
  return (
    <div style={{ background: THEME.bg, minHeight: '100vh', padding: '24px' }}>
      
      {/* 顶部专业筛选栏 */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <Space size="large">
          <Title level={4} style={{ margin: 0, color: THEME.text }}>经营数据报告</Title>
          <Segmented 
            options={['概要', '销售数据', '流量数据', '下载中心']} 
            defaultValue="概要"
            style={{ padding: '4px' }}
          />
        </Space>
        <Space>
          <Button icon={<DownloadOutlined />}>导出报告</Button>
          <Button type="primary" icon={<FilterOutlined />}>高级筛选</Button>
        </Space>
      </div>

      {/* 核心指标卡片  */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { label: '预订订单数', value: '1,640', trend: '+12.5%', color: THEME.primary },
          { label: '间夜量', value: '1,914', trend: '+5.2%', color: THEME.success },
          { label: '销售额 (RMB)', value: '19.70万', trend: '+8.1%', color: THEME.text },
          { label: '平均转化率', value: '14.2%', trend: '-1.2%', color: THEME.warning },
        ].map((item, i) => (
          <Col xs={24} sm={12} lg={6} key={i}>
            <Card variant="borderless" style={{ borderRadius: 12 }}>
              <Statistic 
                title={<Text type="secondary">{item.label}</Text>}
                value={item.value}
                valueStyle={{ fontWeight: 700, color: THEME.text }}
                suffix={<Text style={{ fontSize: 12, color: item.trend.startsWith('+') ? '#10b981' : '#ef4444' }}>{item.trend}</Text>}
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
                <ComposedChart data={TREND_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
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

        {/* 右侧：雷达图表 (专业表现分析) */}
        <Col xs={24} xl={8}>
          <Card title="服务表现维度" variant="borderless" style={{ borderRadius: 12, height: '100%' }}>
            <div style={{ width: '100%', height: 400, minHeight: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={PERFORMANCE_RADAR}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} axisLine={false} tick={false} />
                  <Radar name="当前评分" dataKey="A" stroke={THEME.primary} fill={THEME.primary} fillOpacity={0.5} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {/* 底部左侧：渠道占比 (高级环形图) */}
        <Col xs={24} lg={8}>
          <Card title="流量获取渠道" variant="borderless" style={{ borderRadius: 12 }}>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CHANNEL_DISTRIBUTION}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {CHANNEL_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* 底部中间：实时服务监控 */}
        <Col xs={24} lg={8}>
          <Card title="平台服务健康度" variant="borderless" style={{ borderRadius: 12 }}>
             <Space direction="vertical" style={{ width: '100%' }} size={24}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text type="secondary" style={{ fontSize: 13 }}>API 响应可用性</Text>
                    <Text strong style={{ color: THEME.success }}>99.98%</Text>
                  </div>
                  <Progress percent={99.9} showInfo={false} status="active" strokeColor={THEME.success} size={[, 8]} />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text type="secondary" style={{ fontSize: 13 }}>商家平均响应时效</Text>
                    <Text strong>1.2h / 2h</Text>
                  </div>
                  <Progress percent={85} showInfo={false} strokeColor={THEME.primary} size={[, 8]} />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text type="secondary" style={{ fontSize: 13 }}>用户纠纷处理率</Text>
                    <Text strong>92%</Text>
                  </div>
                  <Progress percent={92} showInfo={false} strokeColor={THEME.warning} size={[, 8]} />
                </div>
             </Space>
          </Card>
        </Col>

        {/* 底部右侧：动态预警  */}
        <Col xs={24} lg={8}>
          <Card title="异常与动态预警" variant="borderless" style={{ borderRadius: 12 }}>
            <List
              split={false}
              dataSource={[
                { title: '库存预警：大床房余量 < 2', type: 'error', time: '3分钟前' },
                { title: '新审核申请：静安希尔顿酒店', type: 'processing', time: '12分钟前' },
                { title: '系统更新：V2.4 版本已上线', type: 'success', time: '1小时前' },
                { title: '结算通知：1月账单已生成', type: 'warning', time: '2小时前' },
              ]}
              renderItem={item => (
                <List.Item style={{ padding: '12px 0' }}>
                  <Space align="start">
                    <Badge status={item.type} style={{ marginTop: 8 }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text style={{ fontSize: 13, fontWeight: 500 }}>{item.title}</Text>
                      <Text type="secondary" style={{ fontSize: 11 }}>{item.time}</Text>
                    </div>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;