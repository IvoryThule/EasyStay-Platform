import React, { useEffect, useMemo, useState } from 'react'
import { Card, Row, Col, Statistic, Typography, Spin, Alert } from 'antd'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import request from '../utils/request'

const { Title } = Typography

const ORDER_STATUS_MAP = {
  0: '待支付',
  1: '已预订',
  2: '已取消'
}

const COLORS = ['#1677ff', '#13c2c2', '#faad14', '#ff7875', '#722ed1']

const RevenueStats = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dashboardData, setDashboardData] = useState(null)
  const [platformStats, setPlatformStats] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const dashboardRes = await request.get('/admin/dashboard')
      if (dashboardRes.code === 200) {
        setDashboardData(dashboardRes.data)
      } else {
        throw new Error(dashboardRes.msg || '获取营收数据失败')
      }

      try {
        const statsRes = await request.get('/admin/stats')
        if (statsRes.code === 200) {
          setPlatformStats(statsRes.data)
        }
      } catch {
        setPlatformStats(null)
      }
    } catch (e) {
      setError(e.message || '获取营收数据失败')
    } finally {
      setLoading(false)
    }
  }

  const trendData = useMemo(() => {
    return (dashboardData?.trend || []).map((item) => ({
      ...item,
      revenue: Number(item.revenue || 0)
    }))
  }, [dashboardData])

  const channelData = dashboardData?.channelDist || []

  const orderStatusData = useMemo(() => {
    return (dashboardData?.orderStatusDist || []).map((item) => ({
      name: ORDER_STATUS_MAP[item.status] || `状态${item.status}`,
      value: Number(item.count || 0)
    }))
  }, [dashboardData])

  if (loading) {
    return (
      <div style={{ minHeight: 420, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size='large' tip='营收数据加载中...' />
      </div>
    )
  }

  if (error) {
    return <Alert type='error' message='加载失败' description={error} showIcon />
  }

  return (
    <div>
      <Title level={4} style={{ marginBottom: 16 }}>营收统计</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='总订单数' value={dashboardData?.overview?.totalOrders || 0} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='总间夜' value={dashboardData?.overview?.totalNights || 0} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='总营收 (RMB)' value={Number(dashboardData?.overview?.totalRevenue || 0)} precision={2} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='平均转化率' value={dashboardData?.overview?.avgConversionRate || '0%'} />
          </Card>
        </Col>
      </Row>

      {platformStats ? (
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card><Statistic title='平台用户数' value={platformStats.users || 0} /></Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card><Statistic title='商家数' value={platformStats.merchants || 0} /></Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card><Statistic title='已发布酒店' value={platformStats.hotels || 0} /></Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card><Statistic title='待审核酒店' value={platformStats.pendingHotels || 0} /></Card>
          </Col>
        </Row>
      ) : null}

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={14}>
          <Card title='近7日营收与订单趋势'>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type='monotone' dataKey='revenue' name='营收' stroke='#1677ff' strokeWidth={2} />
                  <Line type='monotone' dataKey='orders' name='订单量' stroke='#13c2c2' strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} xl={10}>
          <Card title='渠道贡献分布'>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={channelData} dataKey='value' nameKey='name' outerRadius={100} label>
                    {channelData.map((_, index) => (
                      <Cell key={`channel-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title='订单状态分布'>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={orderStatusData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='value' fill='#1677ff' radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default RevenueStats
