import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Card, Col, Row, Spin, Statistic, Typography } from 'antd'
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
  0: 'Pending',
  1: 'Booked',
  2: 'Canceled'
}

const COLORS = ['#1677ff', '#13c2c2', '#faad14', '#ff7875', '#722ed1']

const RevenueStats = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [warning, setWarning] = useState('')
  const [dashboardData, setDashboardData] = useState(null)
  const [platformStats, setPlatformStats] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError('')
    setWarning('')

    let dashData = null
    let statsData = null
    let dashboardError = null

    try {
      const dashboardRes = await request.get('/admin/dashboard')
      if (dashboardRes.code === 200) {
        dashData = dashboardRes.data
      } else {
        throw new Error(dashboardRes.msg || 'Failed to fetch dashboard data')
      }
    } catch (e) {
      dashboardError = e
    }

    try {
      const statsRes = await request.get('/admin/stats')
      if (statsRes.code === 200) {
        statsData = statsRes.data
      }
    } catch {
      statsData = null
    }

    if (!dashData && statsData) {
      dashData = {
        overview: {
          totalOrders: statsData.orders || 0,
          totalNights: statsData.paidOrders || 0,
          totalRevenue: 0,
          avgConversionRate: '0%'
        },
        hotelStats: {
          published: statsData.hotels || 0,
          pending: statsData.pendingHotels || 0,
          rejected: 0,
          offline: 0
        },
        trend: [],
        channelDist: [],
        orderStatusDist: [
          { status: 0, count: Math.max((statsData.orders || 0) - (statsData.paidOrders || 0), 0) },
          { status: 1, count: statsData.paidOrders || 0 }
        ]
      }
      setWarning('Dashboard API failed. Showing fallback data from platform stats.')
    }

    if (!dashData) {
      setError(dashboardError?.message || 'Failed to fetch revenue stats')
      setDashboardData(null)
    } else {
      setDashboardData(dashData)
    }

    setPlatformStats(statsData)
    setLoading(false)
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
      name: ORDER_STATUS_MAP[item.status] || `Status ${item.status}`,
      value: Number(item.count || 0)
    }))
  }, [dashboardData])

  if (loading) {
    return (
      <div style={{ minHeight: 420, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size='large' tip='Loading revenue stats...' />
      </div>
    )
  }

  if (error) {
    return <Alert type='error' message='Load failed' description={error} showIcon />
  }

  return (
    <div>
      <Title level={4} style={{ marginBottom: 16 }}>Revenue Stats</Title>
      {warning ? <Alert type='warning' showIcon message={warning} style={{ marginBottom: 16 }} /> : null}

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='Total Orders' value={dashboardData?.overview?.totalOrders || 0} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='Total Nights' value={dashboardData?.overview?.totalNights || 0} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='Total Revenue (RMB)' value={Number(dashboardData?.overview?.totalRevenue || 0)} precision={2} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='Avg Conversion' value={dashboardData?.overview?.avgConversionRate || '0%'} />
          </Card>
        </Col>
      </Row>

      {platformStats ? (
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card><Statistic title='Users' value={platformStats.users || 0} /></Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card><Statistic title='Merchants' value={platformStats.merchants || 0} /></Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card><Statistic title='Published Hotels' value={platformStats.hotels || 0} /></Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card><Statistic title='Pending Hotels' value={platformStats.pendingHotels || 0} /></Card>
          </Col>
        </Row>
      ) : null}

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={14}>
          <Card title='7-Day Trend'>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  {/* Left Axis: Revenue */}
                  <YAxis yAxisId="left" label={{ value: 'Revenue', angle: -90, position: 'insideLeft' }} />
                  {/* Right Axis: Orders & Nights */}
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Count', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type='monotone' dataKey='revenue' name='Revenue' stroke='#1677ff' strokeWidth={2} />
                  <Line yAxisId="right" type='monotone' dataKey='orders' name='Orders' stroke='#13c2c2' strokeWidth={2} />
                  <Line yAxisId="right" type='monotone' dataKey='nights' name='Room Nights' stroke='#52c41a' strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col xs={24} xl={10}>
          <Card title='Hotel City Distribution'>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={channelData} dataKey='value' nameKey='name' outerRadius={100} label>
                    {channelData.map((entry, index) => (
                       <Cell key={`status-${index}`} fill={COLORS[index % COLORS.length]} />
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
          <Card title='Order Status Distribution'>
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
