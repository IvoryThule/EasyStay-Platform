import React, { useState, useRef } from 'react'
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

// 工具中英文对照
const TOOL_DISPLAY_NAMES = {
  search_hotels: '酒店搜索',
  routeplanner: '路线规划',
  attractionfinder: '景点查找',
  restaurantfinder: '餐厅查找',
  weatherreport: '天气查询',
  currencyconverter: '汇率换算',
  timezoneconverter: '时区查询'
}
const toolDisplayName = (name) => TOOL_DISPLAY_NAMES[name] || name

/**
 * 判断当前是否运行在 H5 (浏览器) 环境
 */
function isH5() {
  try {
    return Taro.getEnv() === Taro.ENV_TYPE.WEB
  } catch {
    return typeof window !== 'undefined' && typeof fetch !== 'undefined'
  }
}

/**
 * SSE 流式请求: POST body, 逐行解析 event-stream
 * 支持心跳保活注释帧 (: heartbeat)
 * @param {string} url 请求路径 (如 '/ai/chat/stream')
 * @param {object} data 请求体
 * @param {function} onEvent (eventType, parsedData) => void
 */
async function fetchSSE(url, data, onEvent) {
  const token = Taro.getStorageSync('token')
  const BASE_URL = process.env.TARO_APP_API_BASE_URL || '/api'

  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  if (!response.body) throw new Error('浏览器不支持流式响应')

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })

    // SSE 以 \n\n 分隔事件
    const parts = buffer.split('\n\n')
    buffer = parts.pop() || ''

    for (const part of parts) {
      if (!part.trim()) continue

      // 跳过 SSE 注释帧 (心跳保活)
      if (part.startsWith(':')) continue

      const lines = part.split('\n')
      let eventType = 'message'
      let eventData = ''

      for (const line of lines) {
        if (line.startsWith(':')) continue // 跳过注释行
        if (line.startsWith('event: ')) eventType = line.slice(7).trim()
        else if (line.startsWith('data: ')) eventData += line.slice(6)
      }

      if (eventData) {
        try { onEvent(eventType, JSON.parse(eventData)) } catch (e) {
          console.warn('[SSE] 解析事件数据失败:', eventType, e.message)
        }
      }
    }
  }
}

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
  const thoughtProcess = Array.isArray(payload?.thoughtProcess) ? payload.thoughtProcess : []
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
    thoughtProcess,
    cards,
    createdAt: Date.now(),
    isTyping: false
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
      thoughtProcess: [],
      cards: [],
      createdAt: Date.now(),
      isTyping: false
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
  const [loadingText, setLoadingText] = useState('✨ 深度思考中...')
  const [scrollIntoView, setScrollIntoView] = useState('')
  const [expandedThoughts, setExpandedThoughts] = useState({}) // 用于记录折叠状态
  const streamingThoughtsRef = useRef([]) // SSE 流式过程中实时收集的工具调用
  const streamingMsgIdRef = useRef(null) // 当前正在流式输出的消息 ID
  const streamingContentRef = useRef('') // 当前流式累积的文本内容

  const toggleThought = (id) => setExpandedThoughts(p => ({...p, [id]: !p[id]}))

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
    setLoadingText('✨ 深度思考中...')

    // 重置流式状态
    streamingThoughtsRef.current = []
    streamingMsgIdRef.current = null
    streamingContentRef.current = ''

    try {
      if (isH5()) {
        // ── H5 模式: SSE 流式，实时显示思考进度 + token 打字机效果 ──
        let completeReceived = false
        let errorReceived = false

        try {
          await fetchSSE('/ai/chat/stream', {
            message: text,
            history: toHistory(nextMessages),
            sessionContext
          }, (event, data) => {
            switch (event) {
              case 'thinking':
                setLoadingText(
                  data.iteration === 'final'
                    ? '📝 正在整理回复...'
                    : `🧠 思考推理中... (第${data.iteration}轮)`
                )
                break
              case 'tool_start':
                setLoadingText(`🛠️ 正在调用「${toolDisplayName(data.tool)}」...`)
                streamingThoughtsRef.current = [
                  ...streamingThoughtsRef.current,
                  { tool: data.tool, toolInput: data.args }
                ]
                break
              case 'tool_end':
                setLoadingText(
                  data.success
                    ? `✅ ${toolDisplayName(data.tool)} 完成`
                    : `⚠️ ${toolDisplayName(data.tool)} 遇到问题`
                )
                break
              case 'token': {
                // 逐 token 流式输出：实时创建/更新助手消息实现打字机效果
                streamingContentRef.current += data.content
                if (!streamingMsgIdRef.current) {
                  // 第一个 token 到达: 创建消息气泡并隐藏 loading
                  const msgId = toMessageId()
                  streamingMsgIdRef.current = msgId
                  setLoading(false)
                  setMessages(prev => [...prev, {
                    id: msgId, role: 'assistant', type: 'text',
                    text: streamingContentRef.current,
                    structured: [], thoughtProcess: streamingThoughtsRef.current,
                    cards: [], createdAt: Date.now(), isTyping: true
                  }])
                  setScrollIntoView(msgId)
                } else {
                  // 后续 token: 追加到已有消息
                  const currentId = streamingMsgIdRef.current
                  const currentText = streamingContentRef.current
                  setMessages(prev => prev.map(m =>
                    m.id === currentId ? { ...m, text: currentText } : m
                  ))
                }
                break
              }
              case 'token_reset':
                // 模型切换到工具调用，丢弃已流式的文本
                if (streamingMsgIdRef.current) {
                  const resetId = streamingMsgIdRef.current
                  setMessages(prev => prev.filter(m => m.id !== resetId))
                }
                streamingMsgIdRef.current = null
                streamingContentRef.current = ''
                setLoading(true)
                setLoadingText('🔄 正在继续处理...')
                break
              case 'complete': {
                completeReceived = true
                const aiMsg = buildAssistantMessage(data)
                if ((!data.thoughtProcess || data.thoughtProcess.length === 0) && streamingThoughtsRef.current.length > 0) {
                  aiMsg.thoughtProcess = streamingThoughtsRef.current
                }
                if (streamingMsgIdRef.current) {
                  // 用完整消息替换流式消息 (保留同一 ID 避免闪烁)
                  aiMsg.id = streamingMsgIdRef.current
                  aiMsg.isTyping = false
                  const finalId = streamingMsgIdRef.current
                  setMessages(prev => prev.map(m => m.id === finalId ? aiMsg : m))
                } else {
                  appendMessage(aiMsg)
                }
                if (data.sessionContext) setSessionContext(data.sessionContext)
                streamingMsgIdRef.current = null
                streamingContentRef.current = ''
                break
              }
              case 'error':
                errorReceived = true
                appendMessage({
                  id: toMessageId(), role: 'assistant', type: 'text',
                  text: data.message || '服务异常', structured: [],
                  thoughtProcess: streamingThoughtsRef.current, cards: [],
                  createdAt: Date.now(), isTyping: false
                })
                break
            }
          })
        } catch (sseError) {
          console.warn('[SSE] 流式连接异常，回退到普通请求:', sseError.message)
          // SSE 失败时自动回退到普通请求模式
          if (!completeReceived && !errorReceived) {
            setLoadingText('🔄 正在切换请求模式...')
            try {
              const res = await request({
                url: '/ai/chat',
                method: 'POST',
                data: { message: text, history: toHistory(nextMessages), sessionContext }
              })
              if (res.code === 200) {
                completeReceived = true
                const aiMsg = buildAssistantMessage(res.data || {})
                appendMessage(aiMsg)
                if (res.data?.sessionContext) setSessionContext(res.data.sessionContext)
              }
            } catch (fallbackErr) {
              console.error('回退请求也失败:', fallbackErr)
            }
          }
        }

        // 兜底: 如果流结束但没收到 complete 也没收到 error
        if (!completeReceived && !errorReceived) {
          if (streamingMsgIdRef.current && streamingContentRef.current) {
            // 已有流式内容，标记完成而非丢弃
            const finalizeId = streamingMsgIdRef.current
            setMessages(prev => prev.map(m =>
              m.id === finalizeId ? { ...m, isTyping: false } : m
            ))
          } else {
            appendMessage({
              id: toMessageId(), role: 'assistant', type: 'text',
              text: '连接意外中断，请重试。', structured: [],
              thoughtProcess: streamingThoughtsRef.current, cards: [],
              createdAt: Date.now(), isTyping: false
            })
          }
          streamingMsgIdRef.current = null
          streamingContentRef.current = ''
        }
      } else {
        // ── 小程序模式: 传统单次请求 ──
        // 显示模拟加载动画
        let stepCount = 0
        const loadingStates = ['✨ 深度思考中...', '✨ 深度思考中...', '🛠️ 正在调度工具查找数据...', '🛠️ 正在调度工具查找数据...', '📝 整理推荐中...']
        const fakeTimer = setInterval(() => {
          stepCount++
          if (loadingStates[stepCount]) setLoadingText(loadingStates[stepCount])
        }, 1500)

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

          if (res.code !== 200) throw new Error(res.msg || '请求失败')

          const aiMsg = buildAssistantMessage(res.data || {})
          appendMessage(aiMsg)
          if (res.data?.sessionContext) setSessionContext(res.data.sessionContext)
        } finally {
          clearInterval(fakeTimer)
        }
      }
    } catch (error) {
      console.error('AI Chat Error:', error)
      Taro.showToast({ title: '服务异常，请稍后再试', icon: 'none' })
      appendMessage({
        id: toMessageId(), role: 'assistant', type: 'text',
        text: '服务暂时不可用，请稍后重试。', structured: [],
        thoughtProcess: [], cards: [],
        createdAt: Date.now(), isTyping: false
      })
    } finally {
      setLoading(false)
      setLoadingText('✨ 深度思考中...')
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
            
            {msg.thoughtProcess && msg.thoughtProcess.length > 0 && (
              <View className="thought-process">
                <View className="thought-header" onClick={() => toggleThought(msg.id)}>
                  <Text className="thought-title">🛠️ 深度思考与调度过程</Text>
                  <Text className="thought-arrow">{expandedThoughts[msg.id] ? '▲ 收起' : '▼ 展开'}</Text>
                </View>
                {expandedThoughts[msg.id] && msg.thoughtProcess.map((step, idx) => (
                  <View key={idx} className="thought-step">
                    <Text className="thought-tool">调用工具：{step.tool}</Text>
                    <Text className="thought-args">参数：{JSON.stringify(step.toolInput)}</Text>
                  </View>
                ))}
              </View>
            )}

            <View className={`bubble${msg.isTyping ? ' streaming' : ''}`}>
              <Text style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</Text>
              {msg.isTyping && <Text className="typing-cursor">▍</Text>}
            </View>

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
            <View className="bubble loading-bubble">
              <Text className="loading-text">{loadingText}</Text>
            </View>
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
