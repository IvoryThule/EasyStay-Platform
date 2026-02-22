import React, { useState } from 'react'
import { View, Text, ScrollView, Input, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import request from '../../utils/request'
import './index.scss'

const QUICK_QUESTIONS = [
  '我想去北京玩，预算不限，推荐豪华酒店',
  '北京 400 元以内有什么酒店？',
  '这个酒店附近有什么景点？'
]

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1566073771259-6a8506099945'

function normalizeImage(url) {
  if (!url) return DEFAULT_COVER
  if (url.startsWith('http')) return url
  return `http://1.14.207.212:8848${url}`
}

function toMessageId() {
  return `msg-${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

function buildUserMessage(text) {
  return {
    id: toMessageId(),
    role: 'user',
    type: 'text',
    text,
    structured: [],
    cards: [],
    createdAt: Date.now()
  }
}

function buildAssistantMessage(payload) {
  const messagePayload = payload?.message || {}
  const type = messagePayload.type || 'text'
  const text = messagePayload.text || payload?.content || payload?.reply || '抱歉，暂时无法回答。'
  const structured = Array.isArray(messagePayload.structured) ? messagePayload.structured : []
  const cards = Array.isArray(messagePayload.cards)
    ? messagePayload.cards.map(card => ({
      ...card,
      cover_image: normalizeImage(card.cover_image)
    }))
    : []

  return {
    id: toMessageId(),
    role: 'assistant',
    type,
    text,
    structured,
    cards,
    createdAt: Date.now()
  }
}

function toHistory(messages = []) {
  return messages.slice(-10).map(msg => ({
    role: msg.role === 'assistant' ? 'assistant' : 'user',
    content: msg.text
  }))
}

export default function AiChatPage() {
  const [messages, setMessages] = useState([
    {
      id: toMessageId(),
      role: 'assistant',
      type: 'text',
      text: '您好，我是 EasyStay 智能助手。告诉我城市、预算和偏好，我会基于真实酒店数据推荐；也可以继续问“这个酒店附近有什么景点/美食/地铁”。',
      structured: [],
      cards: [],
      createdAt: Date.now()
    }
  ])
  const [sessionContext, setSessionContext] = useState({
    city: null,
    budgetIntent: null,
    travelPurpose: null,
    preferences: [],
    lastHotel: null,
    lastTool: null
  })
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [scrollIntoView, setScrollIntoView] = useState('')

  const appendMessage = (msg) => {
    setMessages(prev => [...prev, msg])
    setScrollIntoView(msg.id)
  }

  const handleOpenHotelDetail = (card) => {
    const url = card.detail_path || `/pages/detail/index?id=${card.id}`
    Taro.navigateTo({ url })
  }

  const handleBack = () => {
    Taro.navigateBack({
      fail: () => {
        Taro.switchTab({ url: '/pages/index/index' })
      }
    })
  }

  const sendMessage = async (rawText) => {
    const text = String(rawText || '').trim()
    if (!text || loading) return

    const userMsg = buildUserMessage(text)
    const nextMessages = [...messages, userMsg]
    appendMessage(userMsg)
    setInputValue('')
    setLoading(true)

    try {
      const res = await request({
        url: '/ai/chat',
        method: 'POST',
        data: {
          message: text,
          history: toHistory(nextMessages),
          sessionContext
        }
      })

      if (res.code !== 200) {
        throw new Error(res.msg || '请求失败')
      }

      const aiMsg = buildAssistantMessage(res.data || {})
      appendMessage(aiMsg)
      if (res.data?.sessionContext) {
        setSessionContext(res.data.sessionContext)
      }
    } catch (error) {
      Taro.showToast({ title: '服务异常，请稍后再试', icon: 'none' })
      appendMessage({
        id: toMessageId(),
        role: 'assistant',
        type: 'text',
        text: '服务暂时不可用，请稍后重试。',
        structured: [],
        cards: [],
        createdAt: Date.now()
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="ai-chat-page">
      <View className="chat-header">
        <Text className="back-btn" onClick={handleBack}>‹</Text>
        <Text className="title">EasyStay 智能助手</Text>
      </View>

      <ScrollView
        className="chat-content"
        scrollY
        scrollIntoView={scrollIntoView}
        scrollWithAnimation
      >
        {messages.map(msg => (
          <View key={msg.id} id={msg.id} className={`msg-row ${msg.role}`}>
            <View className="bubble">{msg.text}</View>

            {msg.structured && msg.structured.length > 0 && (
              <View className="structured-list">
                {msg.structured.map((line, index) => (
                  <Text key={`${msg.id}-${index}`} className="structured-line">{line}</Text>
                ))}
              </View>
            )}

            {msg.type === 'hotel_cards' && msg.cards && msg.cards.length > 0 && (
              <View className="card-list">
                {msg.cards.map(card => (
                  <View key={`${msg.id}-${card.id}-${card.name}`} className="hotel-card">
                    <Image className="cover" src={card.cover_image} mode="aspectFill" />
                    <View className="card-body">
                      <Text className="name">{card.name}</Text>
                      <Text className="meta">{card.city} · {card.star}星 · 评分 {card.score}</Text>
                      <Text className="price">¥{card.price} 起/晚</Text>
                      <View className="tags">
                        {(card.tags || []).slice(0, 4).map(tag => (
                          <Text key={`${card.id}-${tag}`} className="tag">{tag}</Text>
                        ))}
                      </View>
                      <Text className="reason">亮点：{card.recommend_reason}</Text>
                      <Button className="detail-btn" onClick={() => handleOpenHotelDetail(card)}>
                        查看详情
                      </Button>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {loading && (
          <View className="msg-row assistant">
            <View className="bubble">正在为您查询中...</View>
          </View>
        )}
      </ScrollView>

      <View className="quick-questions">
        {QUICK_QUESTIONS.map(question => (
          <View key={question} className="quick-item" onClick={() => sendMessage(question)}>
            <Text>{question}</Text>
          </View>
        ))}
      </View>

      <View className="input-bar">
        <Input
          className="input"
          value={inputValue}
          onInput={(e) => setInputValue(e.detail.value)}
          placeholder="告诉我：城市 + 预算 + 偏好，或问附近信息"
          confirmType="send"
          onConfirm={() => sendMessage(inputValue)}
        />
        <Button className="send-btn" onClick={() => sendMessage(inputValue)} loading={loading}>
          发送
        </Button>
      </View>
    </View>
  )
}
