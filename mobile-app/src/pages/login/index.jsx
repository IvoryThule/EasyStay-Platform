import React, { useMemo, useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro, { useDidShow, useRouter } from '@tarojs/taro'
import request from '../../utils/request'
import './index.scss'

const TAB_PAGES = [
  '/pages/index/index',
  '/pages/list/index',
  '/pages/order/index',
  '/pages/user/index'
]

export default function LoginPage() {
  const router = useRouter()
  const redirectUrl = useMemo(() => {
    const raw = router?.params?.redirect || '/pages/order/index'
    try {
      return decodeURIComponent(raw)
    } catch {
      return raw
    }
  }, [router?.params?.redirect])

  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const navigateAfterAuth = async (target) => {
    if (TAB_PAGES.includes(target)) {
      try {
        await Taro.switchTab({ url: target })
        return
      } catch {
        // some runtimes may still treat target as non-tab before restart
      }
    }
    Taro.redirectTo({ url: target }).catch(() => Taro.switchTab({ url: '/pages/order/index' }))
  }

  useDidShow(() => {
    const token = Taro.getStorageSync('token')
    if (token) {
      navigateAfterAuth(redirectUrl)
    }
  })

  const submit = async () => {
    if (!form.username.trim()) {
      Taro.showToast({ title: '请输入账号', icon: 'none' })
      return
    }
    if (!form.password.trim()) {
      Taro.showToast({ title: '请输入密码', icon: 'none' })
      return
    }
    if (mode === 'register' && form.password !== form.confirmPassword) {
      Taro.showToast({ title: '两次密码不一致', icon: 'none' })
      return
    }

    setLoading(true)
    try {
      if (mode === 'register') {
        const registerRes = await request({
          url: '/auth/register',
          method: 'POST',
          data: {
            username: form.username.trim(),
            password: form.password,
            role: 'user'
          }
        })
        if (registerRes.code !== 200) {
          Taro.showToast({ title: registerRes.msg || '注册失败', icon: 'none' })
          return
        }
      }

      const loginRes = await request({
        url: '/auth/login',
        method: 'POST',
        data: {
          username: form.username.trim(),
          password: form.password
        }
      })

      if (loginRes.code === 200) {
        Taro.setStorageSync('token', loginRes.data.token)
        Taro.setStorageSync('userInfo', loginRes.data.user)
        Taro.showToast({ title: mode === 'register' ? '注册并登录成功' : '登录成功', icon: 'success' })
        navigateAfterAuth(redirectUrl)
      } else {
        Taro.showToast({ title: loginRes.msg || '登录失败', icon: 'none' })
      }
    } catch (error) {
      Taro.showToast({ title: error?.msg || '请求失败，请重试', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = () => {
    setForm({
      username: mode === 'register' ? 'new_user' : 'test_user',
      password: '123456',
      confirmPassword: '123456'
    })
  }

  return (
    <View className='login-page'>
      <View className='card'>
        <View className='tabs'>
          <View className={`tab ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>
            登录
          </View>
          <View className={`tab ${mode === 'register' ? 'active' : ''}`} onClick={() => setMode('register')}>
            注册
          </View>
        </View>

        <View className='form'>
          <Input
            className='field'
            placeholder='请输入账号'
            value={form.username}
            onInput={(e) => setForm((p) => ({ ...p, username: e.detail.value }))}
          />
          <Input
            className='field'
            type='password'
            placeholder='请输入密码'
            value={form.password}
            onInput={(e) => setForm((p) => ({ ...p, password: e.detail.value }))}
          />
          {mode === 'register' ? (
            <Input
              className='field'
              type='password'
              placeholder='请再次输入密码'
              value={form.confirmPassword}
              onInput={(e) => setForm((p) => ({ ...p, confirmPassword: e.detail.value }))}
            />
          ) : null}
        </View>

        <View className='actions'>
          <View className='submit-btn' onClick={submit}>
            {loading ? '提交中...' : mode === 'register' ? '注册并登录' : '立即登录'}
          </View>
          <Text className='demo-link' onClick={fillDemo}>
            一键填充示例账号
          </Text>
        </View>
      </View>
    </View>
  )
}
