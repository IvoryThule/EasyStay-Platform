import React, { useMemo, useState } from 'react'
import { Card, Typography, Form, Switch, InputNumber, Select, Button, Row, Col, message, Alert } from 'antd'
import { SaveOutlined, ReloadOutlined, ApiOutlined, PoweroffOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import request from '../utils/request'
import { ROUTE_PATHS, STORAGE_KEYS } from '../utils/constants'

const { Title } = Typography

const STORAGE_KEY = 'easystay_system_settings'

const DEFAULT_SETTINGS = {
  language: 'zh-CN',
  autoRefreshMinutes: 5,
  notifyOrder: true,
  notifyAudit: true,
  compactMenu: false
}

const SystemSettings = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [saving, setSaving] = useState(false)
  const [checking, setChecking] = useState(false)

  const initialValues = useMemo(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      return { ...DEFAULT_SETTINGS, ...cached }
    } catch {
      return DEFAULT_SETTINGS
    }
  }, [])

  const saveSettings = async (values) => {
    setSaving(true)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values))
      message.success('系统设置已保存')
    } finally {
      setSaving(false)
    }
  }

  const resetSettings = () => {
    form.setFieldsValue(DEFAULT_SETTINGS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS))
    message.success('已恢复默认设置')
  }

  const checkApi = async () => {
    setChecking(true)
    try {
      const res = await request.get('/admin/dashboard')
      if (res.code === 200) {
        message.success('API 连接正常')
      } else {
        message.error(res.msg || 'API 连接异常')
      }
    } catch {
      message.error('API 连接失败，请检查服务状态')
    } finally {
      setChecking(false)
    }
  }

  const logoutNow = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER_INFO)
    message.success('已退出登录')
    navigate(ROUTE_PATHS.LOGIN, { replace: true })
  }

  return (
    <div>
      <Title level={4} style={{ marginBottom: 16 }}>系统设置</Title>

      <Alert
        style={{ marginBottom: 16 }}
        type='info'
        showIcon
        message='本页设置保存在当前浏览器，用于后台操作偏好，不影响服务端业务数据。'
      />

      <Card title='偏好设置'>
        <Form layout='vertical' form={form} initialValues={initialValues} onFinish={saveSettings}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label='系统语言' name='language'>
                <Select
                  options={[
                    { label: '简体中文', value: 'zh-CN' },
                    { label: 'English', value: 'en-US' }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label='自动刷新间隔 (分钟)' name='autoRefreshMinutes'>
                <InputNumber min={1} max={60} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item label='订单提醒' name='notifyOrder' valuePropName='checked'>
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label='审核提醒' name='notifyAudit' valuePropName='checked'>
                <Switch />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label='紧凑菜单' name='compactMenu' valuePropName='checked'>
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col>
              <Button type='primary' htmlType='submit' icon={<SaveOutlined />} loading={saving}>保存设置</Button>
            </Col>
            <Col>
              <Button icon={<ReloadOutlined />} onClick={resetSettings}>恢复默认</Button>
            </Col>
            <Col>
              <Button icon={<ApiOutlined />} onClick={checkApi} loading={checking}>检查 API</Button>
            </Col>
            <Col>
              <Button danger icon={<PoweroffOutlined />} onClick={logoutNow}>退出登录</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}

export default SystemSettings
