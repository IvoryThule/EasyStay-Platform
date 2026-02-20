const { Op } = require('sequelize');
const { Hotel, RoomType } = require('../models');
const GLMService = require('./GLMService');

const CITY_LIST = [
  '北京', '上海', '广州', '深圳', '杭州', '成都', '重庆', '南京',
  '武汉', '西安', '长沙', '苏州', '青岛', '厦门', '天津', '三亚'
];

const LUXURY_KEYWORDS = ['豪华', '奢华', '高端', '五星', '不差钱', '预算不限', '顶级', '宝格丽'];
const BUDGET_UNLIMITED_KEYWORDS = ['预算不限', '不差钱', '预算无上限', '随便花', '贵点也行'];
const TRAVEL_PURPOSE_MAP = [
  { keyword: '商务', value: 'business' },
  { keyword: '出差', value: 'business' },
  { keyword: '亲子', value: 'family' },
  { keyword: '情侣', value: 'couple' },
  { keyword: '度假', value: 'vacation' },
  { keyword: '旅游', value: 'travel' }
];

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1566073771259-6a8506099945';

function toPlainText(input) {
  return String(input || '').trim();
}

function mergeUnique(listA = [], listB = []) {
  return Array.from(new Set([...(listA || []), ...(listB || [])].filter(Boolean)));
}

function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map(item => String(item));
  if (typeof tags === 'string') return tags.split(/[,\s/|、]+/).filter(Boolean);
  return [];
}

function detectCity(text) {
  if (!text) return null;
  for (const city of CITY_LIST) {
    if (text.includes(city)) return city;
    if (text.includes(`${city}市`)) return city;
  }
  return null;
}

function extractCityFromHistory(history = []) {
  const cloned = [...history].reverse();
  for (const item of cloned) {
    const city = detectCity(toPlainText(item.content));
    if (city) return city;
  }
  return null;
}

function detectBudget(text) {
  const content = toPlainText(text);
  if (!content) return { budgetIntent: null, maxPrice: null };

  const unlimited = BUDGET_UNLIMITED_KEYWORDS.some(keyword => content.includes(keyword))
    || LUXURY_KEYWORDS.some(keyword => content.includes(keyword));
  if (unlimited) {
    return { budgetIntent: 'unlimited', maxPrice: null };
  }

  const numberMatch =
    content.match(/(\d{2,5})\s*(元|块)?\s*(以内|以下|之内|封顶)/)
    || content.match(/预算\s*(\d{2,5})/)
    || content.match(/(\d{2,5})\s*(元|块)/);

  if (numberMatch) {
    return {
      budgetIntent: 'limited',
      maxPrice: Number(numberMatch[1])
    };
  }

  return { budgetIntent: null, maxPrice: null };
}

function detectPreferences(text, sessionPreferences = []) {
  const content = toPlainText(text);
  const preferences = [];

  for (const keyword of LUXURY_KEYWORDS) {
    if (content.includes(keyword)) {
      preferences.push('豪华');
      break;
    }
  }
  if (content.includes('安静')) preferences.push('安静');
  if (content.includes('江景') || content.includes('海景')) preferences.push('景观');
  if (content.includes('近地铁') || content.includes('地铁')) preferences.push('交通便利');
  if (content.includes('亲子')) preferences.push('亲子');
  if (content.includes('商务') || content.includes('出差')) preferences.push('商务');

  return mergeUnique(sessionPreferences, preferences);
}

function detectTravelPurpose(text, fallbackPurpose = null) {
  const content = toPlainText(text);
  for (const item of TRAVEL_PURPOSE_MAP) {
    if (content.includes(item.keyword)) return item.value;
  }
  return fallbackPurpose || null;
}

function shouldRecommendHotels(text) {
  const content = toPlainText(text);
  if (!content) return false;
  return /(酒店|住宿|住哪|推荐|订房|预订|旅店|宾馆)/.test(content) || /(去|到).+(玩|旅游|出差)/.test(content);
}

function isLuxuryIntent(intent) {
  return intent.budgetIntent === 'unlimited' || (intent.preferences || []).includes('豪华');
}

function getHotelPrice(hotel) {
  return Number(hotel.price || 0);
}

function isLuxuryHotel(hotel) {
  const price = getHotelPrice(hotel);
  const star = Number(hotel.star || 0);
  const tags = normalizeTags(hotel.tags).join('|');
  return star >= 5 || price >= 800 || /豪华|奢华|高端|五星/.test(tags);
}

function buildDetailPath(hotel) {
  return `/pages/detail/index?id=${hotel.id}`;
}

function toCard(hotel, reason) {
  const tags = normalizeTags(hotel.tags).slice(0, 4);
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
  };
}

function buildStructuredText(cards = []) {
  return cards.map((card, index) => `${index + 1}. ${card.name}（${card.city}） - 亮点：${card.recommend_reason}`);
}

function buildNextSessionContext(intent, previousContext = {}) {
  return {
    city: intent.city || previousContext.city || null,
    budgetIntent: intent.budgetIntent || previousContext.budgetIntent || null,
    travelPurpose: intent.travelPurpose || previousContext.travelPurpose || null,
    preferences: mergeUnique(previousContext.preferences || [], intent.preferences || [])
  };
}

function buildTextResponse(text, sessionContext, debugInfo) {
  const payload = {
    reply: text,
    content: text,
    message: {
      type: 'text',
      text,
      structured: [],
      cards: []
    },
    sessionContext
  };
  if (debugInfo) payload.debug = debugInfo;
  return payload;
}

async function maybePolishText(text, cards = []) {
  if (process.env.AI_ENABLE_POLISH !== 'true' || !process.env.GLM_API_KEY) {
    return text;
  }

  const cardBrief = cards.map((card, idx) => `${idx + 1}. ${card.name}(${card.city}) ¥${card.price}`).join('\n');
  const prompt = `请润色下面这段酒店推荐文案，保持事实不变，不要编造信息，控制在150字以内：\n原文：${text}\n候选酒店：\n${cardBrief}`;
  try {
    const polished = await GLMService.generateText(prompt, 'GENERAL_ASSISTANT', {
      temperature: 0.3,
      maxTokens: 200
    });
    return toPlainText(polished) || text;
  } catch (error) {
    return text;
  }
}

function parseIntent(message, history = [], sessionContext = {}) {
  const text = toPlainText(message);
  const historyCity = extractCityFromHistory(history);
  const contextCity = sessionContext.city ? String(sessionContext.city).replace(/市$/, '') : null;
  const city = detectCity(text) || contextCity || historyCity || null;

  const budget = detectBudget(text);
  const preferences = detectPreferences(text, sessionContext.preferences || []);
  const travelPurpose = detectTravelPurpose(text, sessionContext.travelPurpose || null);
  const recommendCue = /(预算|豪华|高端|便宜|推荐|价格|五星|以内|以下)/.test(text);
  const cityMentionedInCurrentMessage = Boolean(detectCity(text));
  const recommendHotels = shouldRecommendHotels(text) || recommendCue || cityMentionedInCurrentMessage;

  return {
    rawMessage: text,
    city,
    budgetIntent: budget.budgetIntent || sessionContext.budgetIntent || null,
    maxPrice: budget.maxPrice || null,
    travelPurpose,
    preferences,
    recommendHotels
  };
}

function buildQueryPlan(intent) {
  const where = { status: 1 };
  if (intent.city) {
    where.city = { [Op.like]: `%${intent.city}%` };
  }
  if (intent.maxPrice) {
    where.price = { [Op.lte]: intent.maxPrice };
  }

  const sortDesc = isLuxuryIntent(intent);
  const primaryOrder = sortDesc ? [['price', 'DESC']] : [['price', 'ASC']];
  const fallbackWhere = { status: 1 };
  if (intent.city) fallbackWhere.city = { [Op.notLike]: `%${intent.city}%` };

  return {
    intent,
    primaryWhere: where,
    primaryOrder,
    fallbackWhere,
    fallbackOrder: [['price', 'DESC']]
  };
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
  });
}

async function retrieveHotels(plan) {
  const primaryHotels = await queryHotels(plan.primaryWhere, plan.primaryOrder, 5);
  const fallbackHotels = await queryHotels(plan.fallbackWhere, plan.fallbackOrder, 5);
  return { primaryHotels, fallbackHotels };
}

async function buildAssistantResponse(intent, retrievalResult, previousSessionContext = {}, debug = false) {
  const { primaryHotels = [], fallbackHotels = [] } = retrievalResult || {};
  const nextSessionContext = buildNextSessionContext(intent, previousSessionContext);
  const debugInfo = debug ? {
    intent,
    primaryCount: primaryHotels.length,
    fallbackCount: fallbackHotels.length
  } : null;

  if (!intent.recommendHotels) {
    const text = '我可以帮您推荐酒店。您可以告诉我目的地城市、预算和偏好（如商务/亲子/豪华）。';
    return buildTextResponse(text, nextSessionContext, debugInfo);
  }

  if (!intent.city) {
    const text = '已收到需求。为了精准推荐，请告诉我您想去哪个城市。';
    return buildTextResponse(text, nextSessionContext, debugInfo);
  }

  if (primaryHotels.length === 0) {
    if (fallbackHotels.length === 0) {
      const text = `当前库内没有${intent.city}及周边可推荐酒店。建议您放宽预算或更换城市，我可以继续帮您筛选。`;
      return buildTextResponse(text, nextSessionContext, debugInfo);
    }

    const cards = fallbackHotels.slice(0, 3).map(hotel => toCard(hotel, '跨城兜底推荐，适合当前需求'));
    const text = `目前${intent.city}暂无符合条件的酒店。我为您先推荐其他城市可选高质量酒店，供您兜底参考。`;
    const polishedText = await maybePolishText(text, cards);
    return {
      reply: polishedText,
      content: polishedText,
      message: {
        type: 'hotel_cards',
        text: polishedText,
        structured: buildStructuredText(cards),
        cards
      },
      sessionContext: nextSessionContext,
      ...(debugInfo ? { debug: debugInfo } : {})
    };
  }

  const luxuryIntent = isLuxuryIntent(intent);
  const primaryLuxuryHotels = primaryHotels.filter(isLuxuryHotel);
  const hasLuxuryInPrimary = primaryLuxuryHotels.length > 0;

  if (luxuryIntent && !hasLuxuryInPrimary) {
    const localHotel = primaryHotels[0];
    const fallbackLuxury = fallbackHotels.filter(isLuxuryHotel).slice(0, 2);
    const cards = [
      toCard(localHotel, '同城可选项，价格友好，适合先落地'),
      ...fallbackLuxury.map(hotel => toCard(hotel, '跨城高端兜底，满足豪华体验'))
    ];
    const localPrice = getHotelPrice(localHotel);
    const text =
      `目前${intent.city}库内以商务/经济型为主，当前可选「${localHotel.name}」¥${localPrice}起。` +
      '您提到预算不限/豪华体验，我补充了跨城高端酒店作为兜底。';
    const polishedText = await maybePolishText(text, cards);
    return {
      reply: polishedText,
      content: polishedText,
      message: {
        type: 'hotel_cards',
        text: polishedText,
        structured: buildStructuredText(cards),
        cards
      },
      sessionContext: nextSessionContext,
      ...(debugInfo ? { debug: debugInfo } : {})
    };
  }

  const selectedHotels = (luxuryIntent ? primaryLuxuryHotels : primaryHotels).slice(0, 3);
  const cards = selectedHotels.map(hotel => {
    const reason = luxuryIntent
      ? '同城高品质选择，优先豪华体验'
      : '同城匹配推荐，满足当前预算与出行需求';
    return toCard(hotel, reason);
  });
  const text = `已根据您的需求在${intent.city}筛选出${cards.length}家酒店，以下按${luxuryIntent ? '价格从高到低' : '价格从低到高'}推荐。`;
  const polishedText = await maybePolishText(text, cards);

  return {
    reply: polishedText,
    content: polishedText,
    message: {
      type: 'hotel_cards',
      text: polishedText,
      structured: buildStructuredText(cards),
      cards
    },
    sessionContext: nextSessionContext,
    ...(debugInfo ? { debug: debugInfo } : {})
  };
}

function filterMockHotels(hotels, where = {}) {
  return hotels.filter(hotel => {
    if (where.status !== undefined && hotel.status !== where.status) return false;
    if (where.city && where.city[Op.like]) {
      const cityToken = String(where.city[Op.like]).replace(/%/g, '');
      if (!String(hotel.city).includes(cityToken)) return false;
    }
    if (where.city && where.city[Op.notLike]) {
      const cityToken = String(where.city[Op.notLike]).replace(/%/g, '');
      if (String(hotel.city).includes(cityToken)) return false;
    }
    if (where.price && where.price[Op.lte] && getHotelPrice(hotel) > where.price[Op.lte]) return false;
    return true;
  });
}

function sortMockHotels(hotels, order = []) {
  const [first] = order;
  if (!first) return hotels;
  const [field, direction] = first;
  const desc = String(direction || 'ASC').toUpperCase() === 'DESC';
  return [...hotels].sort((a, b) => {
    const valueA = Number(a[field] || 0);
    const valueB = Number(b[field] || 0);
    return desc ? valueB - valueA : valueA - valueB;
  });
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
      status: 1
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
      status: 1
    }
  ];

  const intent = parseIntent(message, history, sessionContext);
  const plan = buildQueryPlan(intent);
  const primaryHotels = sortMockHotels(filterMockHotels(mockHotels, plan.primaryWhere), plan.primaryOrder).slice(0, 5);
  const fallbackHotels = sortMockHotels(filterMockHotels(mockHotels, plan.fallbackWhere), plan.fallbackOrder).slice(0, 5);
  return buildAssistantResponse(intent, { primaryHotels, fallbackHotels }, sessionContext, false);
}

async function handleChat({ message, history = [], sessionContext = {}, debug = false }) {
  const intent = parseIntent(message, history, sessionContext);
  const plan = buildQueryPlan(intent);
  const retrievalResult = await retrieveHotels(plan);
  return buildAssistantResponse(intent, retrievalResult, sessionContext, debug);
}

module.exports = {
  parseIntent,
  buildQueryPlan,
  retrieveHotels,
  buildAssistantResponse,
  simulateAssistantReply,
  handleChat
};
