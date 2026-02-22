const { Op } = require('sequelize')
const { Hotel, RoomType } = require('../models')
const amapService = require('./amapService')

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1566073771259-6a8506099945'

const CITY_LIST = [
  '北京', '上海', '广州', '深圳', '杭州', '成都', '重庆', '南京',
  '武汉', '西安', '长沙', '苏州', '青岛', '厦门', '天津', '三亚'
]

const LUXURY_KEYWORDS = ['豪华', '高端', '奢华', '五星', '预算不限', '不差钱', '顶级', '宝格丽', '柏悦', '丽思卡尔顿']
const HOTEL_INTENT_KEYWORDS = ['酒店', '住宿', '住哪', '推荐', '订房', '预订', '宾馆', '民宿', '客栈']
const AROUND_INTENT_KEYWORDS = ['附近', '周边', '周围', '旁边', '景点', '景区', '美食', '餐厅', '地铁', '商场', '购物', '打卡']

const SURROUNDING_POI_TYPES = {
  scenic: '旅游景点',
  food: '餐饮服务',
  metro: '地铁站',
  mall: '购物中心'
}

const SURROUNDING_LABELS = {
  scenic: '景点',
  food: '美食',
  metro: '地铁站',
  mall: '商场'
}

const TRAVEL_PURPOSE_MAP = [
  { keyword: '商务', value: 'business' },
  { keyword: '出差', value: 'business' },
  { keyword: '亲子', value: 'family' },
  { keyword: '情侣', value: 'couple' },
  { keyword: '度假', value: 'vacation' },
  { keyword: '旅游', value: 'travel' }
]

function toPlainText(input) {
  return String(input || '').trim()
}

function normalizeCity(city) {
  return String(city || '').replace(/市$/, '').trim()
}

function mergeUnique(listA = [], listB = []) {
  return Array.from(new Set([...(listA || []), ...(listB || [])].filter(Boolean)))
}

function normalizeTags(tags) {
  if (!tags) return []
  if (Array.isArray(tags)) return tags.map(item => String(item))
  if (typeof tags !== 'string') return []
  try {
    const parsed = JSON.parse(tags)
    if (Array.isArray(parsed)) return parsed.map(item => String(item))
  } catch (e) {
    // ignore
  }
  return tags.split(/[,\s/|、]+/).filter(Boolean)
}

function detectCity(text) {
  const content = toPlainText(text)
  if (!content) return null

  for (const city of CITY_LIST) {
    if (content.includes(city) || content.includes(`${city}市`)) return city
  }

  const matched = content.match(/([\u4e00-\u9fa5]{2,8})(?:市|州|县)/)
  if (matched) return normalizeCity(matched[1])
  return null
}

function extractCityFromHistory(history = []) {
  const cloned = [...history].reverse()
  for (const item of cloned) {
    const city = detectCity(toPlainText(item.content))
    if (city) return city
  }
  return null
}

function detectBudget(text) {
  const content = toPlainText(text)
  if (!content) return { budgetIntent: null, maxPrice: null }

  const unlimited = ['预算不限', '不差钱', '预算无上限', '随便花', '贵点也行']
    .some(keyword => content.includes(keyword)) || LUXURY_KEYWORDS.some(keyword => content.includes(keyword))

  if (unlimited) {
    return { budgetIntent: 'unlimited', maxPrice: null }
  }

  const numberMatch =
    content.match(/(\d{2,5})\s*(元|块)?\s*(以内|以下|之内|封顶)/)
    || content.match(/预算\s*(\d{2,5})/)
    || content.match(/(\d{2,5})\s*(元|块)/)

  if (numberMatch) {
    return {
      budgetIntent: 'limited',
      maxPrice: Number(numberMatch[1])
    }
  }

  return { budgetIntent: null, maxPrice: null }
}

function detectPreferences(text, previousPreferences = []) {
  const content = toPlainText(text)
  const preferences = []

  if (LUXURY_KEYWORDS.some(keyword => content.includes(keyword))) preferences.push('豪华')
  if (content.includes('安静')) preferences.push('安静')
  if (/(江景|海景|景观|河景)/.test(content)) preferences.push('景观')
  if (/(近地铁|地铁|交通便利|交通方便)/.test(content)) preferences.push('交通便利')
  if (content.includes('亲子')) preferences.push('亲子')
  if (/(商务|出差)/.test(content)) preferences.push('商务')
  if (/(泳池|游泳池)/.test(content)) preferences.push('泳池')

  return mergeUnique(previousPreferences, preferences)
}

function detectTravelPurpose(text, fallbackPurpose = null) {
  const content = toPlainText(text)
  for (const item of TRAVEL_PURPOSE_MAP) {
    if (content.includes(item.keyword)) return item.value
  }
  return fallbackPurpose || null
}

function shouldRecommendHotels(text) {
  const content = toPlainText(text)
  if (!content) return false
  return HOTEL_INTENT_KEYWORDS.some(keyword => content.includes(keyword))
}

function shouldQuerySurrounding(text) {
  const content = toPlainText(text)
  if (!content) return false
  return AROUND_INTENT_KEYWORDS.some(keyword => content.includes(keyword)) || /这个酒店|这家酒店/.test(content)
}

function detectSurroundingCategory(text) {
  const content = toPlainText(text)
  if (/(美食|吃|餐厅|饭店|小吃)/.test(content)) return 'food'
  if (/(地铁|公交|交通)/.test(content)) return 'metro'
  if (/(商场|购物|商圈)/.test(content)) return 'mall'
  return 'scenic'
}

function detectHotelName(text) {
  const content = toPlainText(text)
  const matched = content.match(/([\u4e00-\u9fa5A-Za-z0-9（）()·\-]{2,40}(酒店|宾馆|民宿|客栈|饭店)([\u4e00-\u9fa5A-Za-z0-9（）()·\-]{0,20})?)/)
  return matched ? matched[1] : null
}

function isLuxuryIntent(intent) {
  return intent.budgetIntent === 'unlimited' || (intent.preferences || []).includes('豪华')
}

function getHotelPrice(hotel) {
  return Number(hotel.price || 0)
}

function buildDetailPath(hotel) {
  return `/pages/detail/index?id=${hotel.id}`
}

function toCard(hotel, reason) {
  const tags = normalizeTags(hotel.tags).slice(0, 4)
  return {
    id: hotel.id,
    name: hotel.name,
    city: hotel.city,
    cover_image: hotel.cover_image || DEFAULT_COVER,
    star: Number(hotel.star || 0),
    price: getHotelPrice(hotel),
    score: Number(hotel.score || hotel.star || 0),
    tags,
    detail_path: buildDetailPath(hotel),
    recommend_reason: reason
  }
}

function buildStructuredText(cards = []) {
  return cards.map((card, index) => `${index + 1}. ${card.name}（${card.city}）- 亮点：${card.recommend_reason}`)
}

function buildSessionContext(intent, previousContext = {}) {
  return {
    city: intent.city || previousContext.city || null,
    budgetIntent: intent.budgetIntent || previousContext.budgetIntent || null,
    travelPurpose: intent.travelPurpose || previousContext.travelPurpose || null,
    preferences: mergeUnique(previousContext.preferences || [], intent.preferences || []),
    lastHotel: previousContext.lastHotel || null,
    lastTool: previousContext.lastTool || null
  }
}

function buildTextResponse(text, sessionContext, debugInfo = null, structured = []) {
  const payload = {
    reply: text,
    content: text,
    message: {
      type: 'text',
      text,
      structured,
      cards: []
    },
    sessionContext
  }
  if (debugInfo) payload.debug = debugInfo
  return payload
}

function parseIntent(message, history = [], sessionContext = {}) {
  const text = toPlainText(message)
  const historyCity = extractCityFromHistory(history)
  const contextCity = normalizeCity(sessionContext.city || '')
  const city = detectCity(text) || contextCity || historyCity || null

  const budget = detectBudget(text)
  const preferences = detectPreferences(text, sessionContext.preferences || [])
  const travelPurpose = detectTravelPurpose(text, sessionContext.travelPurpose || null)
  const explicitHotelName = detectHotelName(text)
  const surroundingCategory = detectSurroundingCategory(text)

  let intentType = 'chat'
  if (shouldQuerySurrounding(text)) {
    intentType = 'surrounding'
  } else if (shouldRecommendHotels(text) || city || budget.maxPrice || preferences.length > 0) {
    intentType = 'hotel_search'
  }

  return {
    rawMessage: text,
    intentType,
    city,
    budgetIntent: budget.budgetIntent || sessionContext.budgetIntent || null,
    maxPrice: budget.maxPrice || null,
    travelPurpose,
    preferences,
    surroundingCategory,
    explicitHotelName
  }
}

function buildQueryPlan(intent) {
  const where = { status: 1 }
  const cityToken = normalizeCity(intent.city)
  if (cityToken) {
    where.city = { [Op.like]: `%${cityToken}%` }
  }
  if (intent.maxPrice) {
    where.price = { [Op.lte]: intent.maxPrice }
  }

  const sortDesc = isLuxuryIntent(intent)
  const primaryOrder = sortDesc ? [['price', 'DESC']] : [['price', 'ASC']]
  const fallbackWhere = { status: 1 }
  if (cityToken) fallbackWhere.city = { [Op.notLike]: `%${cityToken}%` }

  return {
    intent,
    primaryWhere: where,
    primaryOrder,
    fallbackWhere,
    fallbackOrder: [['price', 'DESC']]
  }
}

async function queryHotels(where, order, limit = 5) {
  return Hotel.findAll({
    where,
    include: [{
      model: RoomType,
      as: 'roomTypes',
      attributes: ['id', 'name', 'price', 'stock', 'image']
    }],
    order,
    limit
  })
}

async function retrieveHotels(plan) {
  const primaryHotels = await queryHotels(plan.primaryWhere, plan.primaryOrder, 5)
  const fallbackHotels = await queryHotels(plan.fallbackWhere, plan.fallbackOrder, 5)
  return { primaryHotels, fallbackHotels }
}

async function buildHotelRecommendationResponse(intent, retrievalResult, previousSessionContext = {}, debug = false) {
  const { primaryHotels = [], fallbackHotels = [] } = retrievalResult || {}
  const nextSessionContext = buildSessionContext(intent, previousSessionContext)
  const debugInfo = debug ? {
    tool: 'search_hotels',
    intent,
    primaryCount: primaryHotels.length,
    fallbackCount: fallbackHotels.length
  } : null

  if (!intent.city) {
    return buildTextResponse('已收到需求。为了准确推荐，请先告诉我您要去哪个城市。', nextSessionContext, debugInfo)
  }

  if (primaryHotels.length === 0 && fallbackHotels.length === 0) {
    return buildTextResponse(`当前库内没有${intent.city}及周边可推荐酒店。您可以放宽预算或换个城市，我继续帮您筛。`, nextSessionContext, debugInfo)
  }

  const luxuryIntent = isLuxuryIntent(intent)
  const sourceHotels = primaryHotels.length > 0 ? primaryHotels : fallbackHotels
  const sorted = [...sourceHotels].sort((a, b) => {
    if (luxuryIntent) return getHotelPrice(b) - getHotelPrice(a)
    return getHotelPrice(a) - getHotelPrice(b)
  })
  const selectedHotels = sorted.slice(0, 3)
  const cards = selectedHotels.map(hotel => {
    const reason = luxuryIntent
      ? '偏高品质和体验优先，适合本次豪华出行'
      : '结合价格与位置综合筛选，匹配本次出行需求'
    return toCard(hotel, reason)
  })

  if (selectedHotels[0]) {
    nextSessionContext.lastHotel = {
      id: selectedHotels[0].id,
      name: selectedHotels[0].name,
      city: selectedHotels[0].city,
      latitude: selectedHotels[0].latitude,
      longitude: selectedHotels[0].longitude
    }
  }
  nextSessionContext.lastTool = 'search_hotels'

  const text = `已根据您的需求在${intent.city}筛选出${cards.length}家酒店，以下按${luxuryIntent ? '价格从高到低' : '价格从低到高'}推荐。`
  return {
    reply: text,
    content: text,
    message: {
      type: 'hotel_cards',
      text,
      structured: buildStructuredText(cards),
      cards
    },
    sessionContext: nextSessionContext,
    ...(debugInfo ? { debug: debugInfo } : {})
  }
}

async function findHotelByName(hotelName, cityHint = null) {
  const cleanName = toPlainText(hotelName)
  if (!cleanName) return null

  const where = {
    status: 1,
    name: { [Op.like]: `%${cleanName}%` }
  }
  const cityToken = normalizeCity(cityHint)
  if (cityToken) {
    where.city = { [Op.like]: `%${cityToken}%` }
  }

  return Hotel.findOne({
    where,
    order: [['updatedAt', 'DESC']]
  })
}

async function resolveHotelForSurrounding(intent, sessionContext = {}) {
  const cityHint = intent.city || sessionContext.city || null

  if (intent.explicitHotelName) {
    const hotelByName = await findHotelByName(intent.explicitHotelName, cityHint)
    if (hotelByName) return hotelByName
  }

  if (sessionContext.lastHotel?.id) {
    const hotelById = await Hotel.findOne({
      where: { id: sessionContext.lastHotel.id, status: 1 }
    })
    if (hotelById) return hotelById
  }

  if (sessionContext.lastHotel?.name) {
    const hotelBySessionName = await findHotelByName(sessionContext.lastHotel.name, cityHint)
    if (hotelBySessionName) return hotelBySessionName
  }

  return null
}

function formatDistance(distance) {
  const number = Number(distance || 0)
  if (!number || Number.isNaN(number)) return '距离未知'
  if (number < 1000) return `${number}米`
  return `${(number / 1000).toFixed(1)}公里`
}

async function querySurroundingByHotel(hotel, category) {
  let longitude = Number(hotel?.longitude)
  let latitude = Number(hotel?.latitude)

  if ((!longitude || !latitude) && (hotel?.address || hotel?.city)) {
    const geocode = await amapService.getLocationByAddress(hotel.address || '', hotel.city || '')
    if (geocode?.longitude && geocode?.latitude) {
      longitude = Number(geocode.longitude)
      latitude = Number(geocode.latitude)
    }
  }

  if (!longitude || !latitude) return []

  const poiTypes = SURROUNDING_POI_TYPES[category] || SURROUNDING_POI_TYPES.scenic
  const pois = await amapService.getNearbyPOI(longitude, latitude, poiTypes, 2500)
  return (pois || []).sort((a, b) => Number(a.distance || 0) - Number(b.distance || 0)).slice(0, 5)
}

async function buildSurroundingResponse(intent, previousSessionContext = {}, debug = false) {
  const nextSessionContext = buildSessionContext(intent, previousSessionContext)
  const debugInfo = debug ? {
    tool: 'get_surrounding_info',
    intent
  } : null

  const hotel = await resolveHotelForSurrounding(intent, previousSessionContext)
  if (!hotel) {
    return buildTextResponse('我还不知道您指的是哪家酒店。请先让我推荐酒店，或直接告诉我酒店名称。', nextSessionContext, debugInfo)
  }

  const category = intent.surroundingCategory || 'scenic'
  const pois = await querySurroundingByHotel(hotel, category)
  nextSessionContext.lastHotel = {
    id: hotel.id,
    name: hotel.name,
    city: hotel.city,
    latitude: hotel.latitude,
    longitude: hotel.longitude
  }
  nextSessionContext.lastTool = 'get_surrounding_info'

  if (!pois.length) {
    const missingLocationHint = (!hotel.latitude || !hotel.longitude)
      ? '（该酒店缺少经纬度）'
      : ''
    return buildTextResponse(`暂时查不到“${hotel.name}”附近的${SURROUNDING_LABELS[category]}数据${missingLocationHint}。您可以换一个类别继续问我。`, nextSessionContext, debugInfo)
  }

  const structured = pois.map((poi, index) => {
    const address = poi.address ? ` · ${poi.address}` : ''
    return `${index + 1}. ${poi.name} · ${formatDistance(poi.distance)}${address}`
  })

  const text = `已为您查询${hotel.name}附近${SURROUNDING_LABELS[category]}，优先推荐以下${structured.length}个地点。`
  return buildTextResponse(text, nextSessionContext, debugInfo, structured)
}

async function buildAssistantResponse(intent, retrievalResult, previousSessionContext = {}, debug = false) {
  return buildHotelRecommendationResponse(intent, retrievalResult, previousSessionContext, debug)
}

async function handleChat({ message, history = [], sessionContext = {}, debug = false }) {
  const intent = parseIntent(message, history, sessionContext)

  if (intent.intentType === 'surrounding') {
    return buildSurroundingResponse(intent, sessionContext, debug)
  }

  if (intent.intentType === 'hotel_search') {
    const plan = buildQueryPlan(intent)
    const retrievalResult = await retrieveHotels(plan)
    return buildHotelRecommendationResponse(intent, retrievalResult, sessionContext, debug)
  }

  const nextSessionContext = buildSessionContext(intent, sessionContext)
  return buildTextResponse(
    '我可以帮您推荐酒店，也可以查询某家酒店附近的景点/美食/地铁。告诉我城市和预算即可开始。',
    nextSessionContext,
    debug ? { intent } : null
  )
}

async function simulateAssistantReply(message, sessionContext = {}, history = []) {
  const mockHotels = [
    {
      id: 1,
      name: '上海宝格丽酒店',
      city: '上海',
      price: 4800,
      star: 5,
      score: 5,
      tags: ['豪华', '江景', 'SPA'],
      cover_image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      latitude: 31.240665,
      longitude: 121.490317
    },
    {
      id: 2,
      name: '全季酒店(北京国贸店)',
      city: '北京',
      price: 350,
      star: 3,
      score: 4,
      tags: ['商务', '近地铁', '免费停车'],
      cover_image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
      latitude: 39.909968,
      longitude: 116.461034
    }
  ]

  const intent = parseIntent(message, history, sessionContext)
  const nextSessionContext = buildSessionContext(intent, sessionContext)

  if (intent.intentType === 'surrounding') {
    const hotel = sessionContext.lastHotel
      ? mockHotels.find(item => item.id === sessionContext.lastHotel.id) || mockHotels[0]
      : mockHotels[0]

    const samples = {
      scenic: ['CCTV大楼', '日坛公园', '世贸天阶'],
      food: ['四季民福烤鸭店', '局气', '新荣记'],
      metro: ['国贸地铁站', '金台夕照站', '永安里站'],
      mall: ['国贸商城', '侨福芳草地', '世贸天阶']
    }

    const category = intent.surroundingCategory || 'scenic'
    const structured = (samples[category] || samples.scenic).map((name, index) => `${index + 1}. ${name}`)
    nextSessionContext.lastHotel = {
      id: hotel.id,
      name: hotel.name,
      city: hotel.city,
      latitude: hotel.latitude,
      longitude: hotel.longitude
    }
    nextSessionContext.lastTool = 'get_surrounding_info'
    return buildTextResponse(
      `已为您查询${hotel.name}附近${SURROUNDING_LABELS[category]}，以下是模拟环境下的示例结果。`,
      nextSessionContext,
      { mode: 'simulate', tool: 'get_surrounding_info' },
      structured
    )
  }

  if (intent.intentType === 'hotel_search') {
    const cityToken = normalizeCity(intent.city)
    const filtered = mockHotels.filter((hotel) => {
      if (cityToken && !String(hotel.city).includes(cityToken)) return false
      if (intent.maxPrice && getHotelPrice(hotel) > intent.maxPrice) return false
      return true
    })

    const luxuryIntent = isLuxuryIntent(intent)
    const sorted = [...filtered].sort((a, b) => {
      if (luxuryIntent) return getHotelPrice(b) - getHotelPrice(a)
      return getHotelPrice(a) - getHotelPrice(b)
    })
    const selected = sorted.slice(0, 3)
    const cards = selected.map(hotel => toCard(
      hotel,
      luxuryIntent ? '高预算偏好匹配' : '城市与预算匹配'
    ))

    if (selected[0]) {
      nextSessionContext.lastHotel = {
        id: selected[0].id,
        name: selected[0].name,
        city: selected[0].city,
        latitude: selected[0].latitude,
        longitude: selected[0].longitude
      }
    }
    nextSessionContext.lastTool = 'search_hotels'

    const text = selected.length > 0
      ? `已根据您的需求筛选出${selected.length}家酒店（模拟数据）。`
      : '模拟库中暂无符合条件的酒店，请调整城市或预算后重试。'

    return {
      reply: text,
      content: text,
      message: {
        type: 'hotel_cards',
        text,
        structured: buildStructuredText(cards),
        cards
      },
      sessionContext: nextSessionContext,
      debug: { mode: 'simulate', tool: 'search_hotels' }
    }
  }

  return buildTextResponse(
    '模拟模式已开启。您可以说“推荐北京酒店”或“这个酒店附近有什么景点”。',
    nextSessionContext,
    { mode: 'simulate' }
  )
}

module.exports = {
  parseIntent,
  buildQueryPlan,
  retrieveHotels,
  buildAssistantResponse,
  simulateAssistantReply,
  handleChat
}
