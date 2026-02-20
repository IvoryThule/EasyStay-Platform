import React, { useState, useRef, useEffect } from 'react'
import { View, Text, Input, Button, ScrollView, MovableArea, MovableView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import request from '../../utils/request'
import './index.scss'

export default function AiFloatBall() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState([
    { role: 'ai', content: '您好！我是 EasyStay 智能管家，很高兴为您服务。' }
  ])
  const [loading, setLoading] = useState(false)
  const [scrollId, setScrollId] = useState('')

  // 获取屏幕信息用于定位初始位置
  // 初始值给一个大概的右侧位置，防止useEffect延迟导致先闪现到左边
  const [initPos, setInitPos] = useState({ x: 300, y: 500 })

  useEffect(() => {
    try {
      const sys = Taro.getSystemInfoSync()
      // 确保获取到了有效的宽高
      if (sys.windowWidth && sys.windowHeight) {
        setInitPos({
          x: sys.windowWidth - 80, // 靠右，留 80px 边距 (60px球体+20px间隙)
          y: sys.windowHeight - 160 // 靠下且避开 TabBar
        })
      }
    } catch (e) {
      console.error('获取系统信息失败', e)
    }
  }, [])

  const handleSend = async () => {
    if (!inputValue.trim() || loading) return

    const userMsg = { role: 'user', content: inputValue }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInputValue('')
    setLoading(true)
    setScrollId(`msg-${newMessages.length - 1}`)

    try {
      const res = await request({
        url: '/ai/chat',
        method: 'POST',
        data: { prompt: userMsg.content }
      })
      if (res.code === 200) {
        const aiMsg = { role: 'ai', content: res.data.content }
        setMessages(prev => [...prev, aiMsg])
        setScrollId(`msg-${messages.length + 1}`)
      }
    } catch (err) {
      Taro.showToast({ title: '网络异常', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <MovableArea className="ai-movable-area">
      <MovableView 
        className="float-ball-wrapper" 
        direction="all"
        x={initPos.x}
        y={initPos.y}
        outOfBounds={false}
      >
        {/* 聊天窗口 - 放在球体内部，随球移动 */}
        {isOpen && (
          <View className="chat-window" onClick={(e) => e.stopPropagation()}>
            <View className="chat-header">
              <Text className="title">AI 智能助理</Text>
              <View className="close" onClick={() => setIsOpen(false)}>✕</View>
            </View>

            <ScrollView 
              className="message-list" 
              scrollY 
              scrollIntoView={scrollId}
              scrollWithAnimation
            >
              {messages.map((msg, index) => (
                <View key={index} id={`msg-${index}`} className={`msg-item ${msg.role}`}>
                  <View className="msg-bubble">{msg.content}</View>
                </View>
              ))}
              {loading && <View className="msg-item ai"><View className="msg-bubble">思考中...</View></View>}
            </ScrollView>

            <View className="chat-input-area">
              <Input
                className="input"
                value={inputValue}
                onInput={(e) => setInputValue(e.detail.value)}
                placeholder="请输入您的问题..."
                confirmType="send"
                onConfirm={handleSend}
              />
              <Button className="send-btn" onClick={handleSend} loading={loading}>
                发送
              </Button>
            </View>
          </View>
        )}

        {/* 悬浮小球按钮 */}
        <View className="float-ball" onClick={() => setIsOpen(!isOpen)}>
          <Text>{isOpen ? '🤖' : '🤖'}</Text>
        </View>
      </MovableView>
    </MovableArea>
  )
}