import React, { useCallback, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import request from '../../utils/request'
import './index.scss'

const ROLE_LABEL = {
  user: '普通用户',
  merchant: '商家',
  admin: '管理员'
}

export default function UserPage() {
  const [loggedIn, setLoggedIn] = useState(!!Taro.getStorageSync('token'))
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [orderStats, setOrderStats] = useState({
    total: 0,
    pending: 0,
    booked: 0,
    canceled: 0
  })

  const loadData = useCallback(async () => {
    const token = Taro.getStorageSync('token')
    const hasToken = !!token
    setLoggedIn(hasToken)

    if (!hasToken) {
      setUserInfo({})
      setOrderStats({ total: 0, pending: 0, booked: 0, canceled: 0 })
      return
    }

    const cached = Taro.getStorageSync('userInfo')
    setUserInfo(cached || {})

    setLoading(true)
    try {
      const res = await request({ url: '/order/list', method: 'GET' })
      if (res.code === 200 && Array.isArray(res.data)) {
        const stats = res.data.reduce((acc, item) => {
          acc.total += 1
          if (item.status === 0) acc.pending += 1
          if (item.status === 1) acc.booked += 1
          if (item.status === 2) acc.canceled += 1
          return acc
        }, { total: 0, pending: 0, booked: 0, canceled: 0 })
        setOrderStats(stats)
      }
    } catch {
      // 已由 request 层处理 toast，这里仅避免页面中断
    } finally {
      setLoading(false)
    }
  }, [])

  useDidShow(() => {
    loadData()
  })

  const goLogin = () => {
    Taro.navigateTo({ url: '/pages/login/index?redirect=/pages/user/index' })
  }

  const logout = () => {
    Taro.removeStorageSync('token')
    Taro.removeStorageSync('userInfo')
    setLoggedIn(false)
    setUserInfo({})
    setOrderStats({ total: 0, pending: 0, booked: 0, canceled: 0 })
    Taro.showToast({ title: '已退出登录', icon: 'success' })
  }

  if (!loggedIn) {
    return (
      <View className='user-page empty-state'>
        <Text className='title'>登录后解锁完整服务</Text>
        <Text className='desc'>查看订单、管理支付状态、同步个人中心信息</Text>
        <View className='primary-btn' onClick={goLogin}>立即登录</View>
      </View>
    )
  }

  return (
    <View className='user-page'>
      <View className='profile-card'>
        <View className='avatar'>{(userInfo?.username || 'U').slice(0, 1).toUpperCase()}</View>
        <View className='profile-text'>
          <Text className='name'>{userInfo?.username || '未命名用户'}</Text>
          <Text className='sub'>{ROLE_LABEL[userInfo?.role] || '普通用户'} · EasyStay</Text>
        </View>
      </View>

      <View className='stats-grid'>
        <View className='stat-item'>
          <Text className='num'>{loading ? '--' : orderStats.total}</Text>
          <Text className='label'>全部订单</Text>
        </View>
        <View className='stat-item'>
          <Text className='num'>{loading ? '--' : orderStats.pending}</Text>
          <Text className='label'>待支付</Text>
        </View>
        <View className='stat-item'>
          <Text className='num'>{loading ? '--' : orderStats.booked}</Text>
          <Text className='label'>已预订</Text>
        </View>
        <View className='stat-item'>
          <Text className='num'>{loading ? '--' : orderStats.canceled}</Text>
          <Text className='label'>已取消</Text>
        </View>
      </View>

      <View className='action-list'>
        <View className='action-item' onClick={() => Taro.switchTab({ url: '/pages/order/index' })}>
          <Text>我的订单</Text>
          <Text className='arrow'>›</Text>
        </View>
        <View className='action-item' onClick={loadData}>
          <Text>刷新数据</Text>
          <Text className='arrow'>›</Text>
        </View>
        <View className='action-item' onClick={() => Taro.navigateTo({ url: '/pages/ai-chat/index' })}>
          <Text>AI 旅行助手</Text>
          <Text className='arrow'>›</Text>
        </View>
        <View className='action-item danger' onClick={logout}>
          <Text>退出登录</Text>
          <Text className='arrow'>›</Text>
        </View>
      </View>
    </View>
  )
}
