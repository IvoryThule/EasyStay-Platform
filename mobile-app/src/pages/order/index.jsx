import React, { useCallback, useState } from 'react'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro'
import request from '../../utils/request'
import './index.scss'

const STATUS_TABS = [
  { label: '全部', value: 'all' },
  { label: '待支付', value: 0 },
  { label: '已预订', value: 1 },
  { label: '已取消', value: 2 }
]

const STATUS_LABEL = {
  0: '待支付',
  1: '已预订',
  2: '已取消'
}

const IMAGE_HOST = 'http://localhost:3000'

export default function OrderPage() {
  const [loggedIn, setLoggedIn] = useState(!!Taro.getStorageSync('token'))
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('all')
  const [actionOrderId, setActionOrderId] = useState(null)

  const getCoverImage = (order) => {
    const raw = order?.Hotel?.cover_image || ''
    if (!raw) return ''
    return raw.startsWith('http') ? raw : `${IMAGE_HOST}${raw}`
  }

  const fetchOrders = useCallback(async (tabValue = activeTab) => {
    const token = Taro.getStorageSync('token')
    const hasToken = !!token
    setLoggedIn(hasToken)

    if (!hasToken) {
      setOrders([])
      Taro.stopPullDownRefresh()
      return
    }

    setLoading(true)
    try {
      const query = tabValue === 'all' ? {} : { status: tabValue }
      const res = await request({
        url: '/order/list',
        method: 'GET',
        data: query
      })

      if (res.code === 200) {
        setOrders(Array.isArray(res.data) ? res.data : [])
      } else {
        Taro.showToast({ title: res.msg || '获取订单失败', icon: 'none' })
      }
    } catch (error) {
      Taro.showToast({ title: error?.msg || '获取订单失败', icon: 'none' })
    } finally {
      setLoading(false)
      Taro.stopPullDownRefresh()
    }
  }, [activeTab])

  useDidShow(() => {
    fetchOrders(activeTab)
  })

  usePullDownRefresh(() => {
    fetchOrders(activeTab)
  })

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue)
    fetchOrders(tabValue)
  }

  const handleOrderAction = async (type, orderId) => {
    setActionOrderId(orderId)
    try {
      const api = type === 'pay' ? '/order/pay' : '/order/cancel'
      const actionText = type === 'pay' ? '支付' : '取消'
      const res = await request({
        url: api,
        method: 'POST',
        data: { orderId }
      })

      if (res.code === 200) {
        Taro.showToast({ title: res.msg || `${actionText}成功`, icon: 'success' })
        fetchOrders(activeTab)
      } else {
        Taro.showToast({ title: res.msg || `${actionText}失败`, icon: 'none' })
      }
    } catch (error) {
      Taro.showToast({ title: error?.msg || '操作失败', icon: 'none' })
    } finally {
      setActionOrderId(null)
    }
  }

  if (!loggedIn) {
    return (
      <View className='order-page empty-login'>
        <Text className='tip-title'>请先登录后查看订单</Text>
        <Text className='tip-subtitle'>登录后可查看支付状态、入住信息并完成支付/取消</Text>
        <View
          className='login-btn'
          onClick={() => Taro.navigateTo({ url: '/pages/login/index?redirect=/pages/order/index' })}
        >
          去登录
        </View>
      </View>
    )
  }

  return (
    <View className='order-page'>
      <ScrollView className='tab-scroll' scrollX showScrollbar={false}>
        <View className='tab-row'>
          {STATUS_TABS.map((tab) => (
            <View
              key={String(tab.value)}
              className={`tab-item ${activeTab === tab.value ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.value)}
            >
              {tab.label}
            </View>
          ))}
        </View>
      </ScrollView>

      <ScrollView className='order-list' scrollY>
        {loading ? <Text className='placeholder'>订单加载中...</Text> : null}
        {!loading && orders.length === 0 ? <Text className='placeholder'>暂无订单记录</Text> : null}

        {orders.map((order) => (
          <View key={order.id} className='order-card'>
            <View className='card-header'>
              <Text className='hotel-name'>{order?.Hotel?.name || '酒店信息'}</Text>
              <Text className={`status-tag status-${order.status}`}>{STATUS_LABEL[order.status] || '未知状态'}</Text>
            </View>

            <View className='card-body'>
              {getCoverImage(order) ? (
                <Image className='hotel-image' src={getCoverImage(order)} mode='aspectFill' />
              ) : (
                <View className='hotel-image placeholder-img'>无图</View>
              )}

              <View className='order-info'>
                <Text className='room-name'>{order?.RoomType?.name || '标准房型'}</Text>
                <Text className='date-text'>入住: {order.check_in}</Text>
                <Text className='date-text'>离店: {order.check_out}</Text>
                <Text className='price-text'>¥{Number(order?.RoomType?.price || 0).toFixed(0)} / 晚</Text>
              </View>
            </View>

            {order.status === 0 ? (
              <View className='card-actions'>
                <View
                  className='action-btn secondary'
                  onClick={() => handleOrderAction('cancel', order.id)}
                >
                  {actionOrderId === order.id ? '处理中...' : '取消订单'}
                </View>
                <View
                  className='action-btn primary'
                  onClick={() => handleOrderAction('pay', order.id)}
                >
                  {actionOrderId === order.id ? '处理中...' : '立即支付'}
                </View>
              </View>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
