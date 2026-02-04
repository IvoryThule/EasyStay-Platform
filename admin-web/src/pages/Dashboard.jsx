// [页面] 欢迎页/仪表盘
import React from 'react';
import { Row, Col, Card, Statistic, Button, Typography, Space, Divider } from 'antd';
import { 
  CloudUploadOutlined, 
  AuditOutlined, 
  DashboardOutlined, 
  LogoutOutlined,
  HomeOutlined,
  LineChartOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { STORAGE_KEYS, ROUTE_PATHS } from '../utils/constants';

const { Title, Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  
  // 获取当前登录用户信息
  const userInfo = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_INFO) || '{}');
  const isAdmin = userInfo.role === 'admin';

  // 退出登录逻辑
 const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <div style={{ padding: '24px', background: '#f5f7fa', minHeight: '100vh' }}>
      {/* 顶部标题栏 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Space size="middle">
          <DashboardOutlined style={{ fontSize: '24px', color: '#0086ff' }} />
          <Title level={3} style={{ margin: 0 }}>工作台 ({isAdmin ? '系统管理' : '商家版'})</Title>
        </Space>
        <Button icon={<LogoutOutlined />} onClick={handleLogout} danger>退出登录</Button>
      </div>

      {/* 欢迎语 */}
      <Card bordered={false} style={{ marginBottom: 24, borderRadius: 8 }}>
        <Text strong style={{ fontSize: 18 }}>您好，{userInfo.username}！</Text>
        <p style={{ color: '#999', marginTop: 8 }}>欢迎使用易宿 eBooking 酒店后台管理系统。您上次登录时间为：{userInfo.lastLogin}</p>
      </Card>

      {/* 数据统计栏 (携程风格统计) */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={isAdmin ? 12 : 8}>
          <Card bordered={false} hoverable>
            <Statistic title={isAdmin ? "待审核申请" : "今日预订量"} value={isAdmin ? 8 : 124} valueStyle={{ color: '#0086ff' }} />
          </Card>
        </Col>
        {!isAdmin && (
          <Col span={8}>
            <Card bordered={false} hoverable>
              <Statistic title="本月总营收" value={85600} prefix="￥" valueStyle={{ color: '#cf1322' }} />
            </Card>
          </Col>
        )}
        <Col span={isAdmin ? 12 : 8}>
          <Card bordered={false} hoverable>
            <Statistic title={isAdmin ? "在线酒店总数" : "当前酒店评分"} value={isAdmin ? 1542 : 4.8} suffix={!isAdmin && "/ 5.0"} />
          </Card>
        </Col>
      </Row>

      <Divider orientation="left">快捷操作</Divider>

      {/* 核心功能区分 */}
      <Row gutter={24}>
        {isAdmin ? (
          // 管理员专属功能
          <>
            <Col span={12}>
              <Card 
                hoverable 
                onClick={() => navigate(ROUTE_PATHS.HOTEL_AUDIT)}
                cover={<div style={{ height: 120, background: '#e6f7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AuditOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                </div>}
              >
                <Card.Meta title="酒店审核中心" description="查看并处理商家提交的酒店录入申请，进行发布或驳回操作。" />
              </Card>
            </Col>
            <Col span={12}>
              <Card 
                hoverable 
                cover={<div style={{ height: 120, background: '#f9f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LineChartOutlined style={{ fontSize: 48, color: '#722ed1' }} />
                </div>}
              >
                <Card.Meta title="全站运营分析" description="监控平台流量、交易数据及商户活跃度。" />
              </Card>
            </Col>
          </>
        ) : (
          // 酒店商家专属功能
          <>
            <Col span={12}>
              <Card 
                hoverable 
                onClick={() => navigate(ROUTE_PATHS.HOTEL_EDIT)}
                cover={<div style={{ height: 120, background: '#f6ffed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CloudUploadOutlined style={{ fontSize: 48, color: '#52c41a' }} />
                </div>}
              >
                <Card.Meta title="房源录入/编辑" description="上传酒店图片、描述，设置房型价格并提交审核。" />
              </Card>
            </Col>
            <Col span={12}>
              <Card 
                hoverable 
                cover={<div style={{ height: 120, background: '#fff7e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HomeOutlined style={{ fontSize: 48, color: '#fa8c16' }} />
                </div>}
              >
                <Card.Meta title="我的酒店管理" description="查看已发布的酒店状态，调整房态及库存信息。" />
              </Card>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default Dashboard;
