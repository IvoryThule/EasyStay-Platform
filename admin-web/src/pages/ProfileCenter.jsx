import React, { useEffect, useMemo, useState } from 'react'
import { Card, Row, Col, Typography, Tag, Form, Input, Button, message, Statistic } from 'antd'
import { UserOutlined, SaveOutlined, SyncOutlined } from '@ant-design/icons'
import request from '../utils/request'
import { STORAGE_KEYS } from '../utils/constants'

const { Title, Text } = Typography

const ROLE_LABEL = {
  admin: '管理员',
  merchant: '商家',
  user: '普通用户'
}

const ProfileCenter = () => {
  const [form] = Form.useForm()
  const [saving, setSaving] = useState(false)
  const [metrics, setMetrics] = useState({ totalOrders: 0, totalRevenue: 0, totalNights: 0 })

  const userInfo = useMemo(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_INFO) || '{}')
  }, [])

  const roleText = ROLE_LABEL[userInfo.role] || '未知角色'

  useEffect(() => {
    form.setFieldsValue({
      username: userInfo.username || '',
      avatar: userInfo.avatar || ''
    })
    loadMetrics()
  }, [])

  const loadMetrics = async () => {
    try {
      const res = await request.get('/admin/dashboard')
      if (res.code === 200) {
        setMetrics({
          totalOrders: res.data?.overview?.totalOrders || 0,
          totalRevenue: Number(res.data?.overview?.totalRevenue || 0),
          totalNights: res.data?.overview?.totalNights || 0
        })
      }
    } catch {
      // 忽略，仅影响展示卡片
    }
  }

  const handleSave = async (values) => {
    setSaving(true)
    try {
      const next = {
        ...userInfo,
        username: values.username?.trim() || userInfo.username,
        avatar: values.avatar?.trim() || userInfo.avatar
      }
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(next))
      message.success('个人资料已保存到本地')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <Title level={4} style={{ marginBottom: 16 }}>个人中心</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={10}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  background: '#e6f4ff',
                  color: '#1677ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24
                }}
              >
                <UserOutlined />
              </div>
              <div>
                <Text strong style={{ fontSize: 16 }}>{userInfo.username || '未命名用户'}</Text>
                <div>
                  <Tag color='blue' style={{ marginTop: 4 }}>{roleText}</Tag>
                </div>
              </div>
            </div>
            <Text type='secondary'>账号 ID: {userInfo.id || '-'}</Text>
          </Card>
        </Col>

        <Col xs={24} xl={14}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card><Statistic title='订单总数' value={metrics.totalOrders} /></Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card><Statistic title='间夜量' value={metrics.totalNights} /></Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card><Statistic title='累计营收' value={metrics.totalRevenue} precision={2} /></Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }} title='资料设置'>
        <Form layout='vertical' form={form} onFinish={handleSave}>
          <Form.Item
            name='username'
            label='显示名称'
            rules={[{ required: true, message: '请输入显示名称' }]}
          >
            <Input placeholder='请输入显示名称' maxLength={30} />
          </Form.Item>
          <Form.Item name='avatar' label='头像地址'>
            <Input placeholder='可选：输入头像 URL' />
          </Form.Item>
          <Row gutter={12}>
            <Col>
              <Button type='primary' htmlType='submit' icon={<SaveOutlined />} loading={saving}>保存资料</Button>
            </Col>
            <Col>
              <Button icon={<SyncOutlined />} onClick={loadMetrics}>刷新经营数据</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}

export default ProfileCenter
