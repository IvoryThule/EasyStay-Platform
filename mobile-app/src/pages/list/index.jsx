// pages/list/index.jsx
import React, { useState, useRef } from 'react'
import { View, Text, ScrollView, Image, Input } from '@tarojs/components'
import Taro, { useLoad, useDidShow, switchTab } from '@tarojs/taro'
import { Popup } from '@nutui/nutui-react-taro'
import HotelCard from '../../components/HotelCard' // 引入卡片组件
import './index.scss'
import request from '../../utils/request'

const IMAGE_HOST = 'http://1.14.207.212:8848';

// 静态筛选项配置（与首页保持一致，实际可提取为常量文件）
const PRICE_OPTIONS = [
  { label: '不限', value: 'all' },
  { label: '¥0-150', value: '0-150' },
  { label: '¥150-300', value: '150-300' },
  { label: '¥300-600', value: '300-600' },
  { label: '¥600+', value: '600-up' }
]
const STAR_OPTIONS = [
  { label: '不限', value: 'all' },
  { label: '二星/经济', value: '2' },
  { label: '三星/舒适', value: '3' },
  { label: '四星/高档', value: '4' },
  { label: '五星/豪华', value: '5' }
]

export default function HotelList() {
  // 1. 核心状态管理
  const [hotelList, setHotelList] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  
  // 搜索条件状态 (初始化时从路由获取)
  const [queryParams, setQueryParams] = useState({
    city: '',
    checkInDate: '',
    checkOutDate: '',
    keyword: '',
    priceType: 'all',
    starType: 'all'
  })

  // 筛选弹窗状态
  const [showFilterPopup, setShowFilterPopup] = useState(false)
  const [tempFilter, setTempFilter] = useState({
    price: 'all',
    star: 'all'
  })

  // --- 新增：价格转换逻辑 ---
  const getPriceRange = (type) => {
    const map = {
      '0-150': { min: 0, max: 150 },
      '150-300': { min: 150, max: 300 },
      '300-600': { min: 300, max: 600 },
      '600-up': { min: 600, max: 99999 }
    };
    return map[type] || { min: undefined, max: undefined };
  };
  // 2. 页面加载：从缓存获取参数并请求数据
  // --- 修改点 1: 生命周期调整 ---
  // 将 loadSearchParams 从 useLoad 移出，放入 useDidShow
  // --- 初始化标识，只加载一次 ---
  const hasInitialized = useRef(false)
  const lastSearchSignature = useRef('')

  useLoad(() => {
    console.log('列表页加载（仅在页面销毁后重新进入时触发）')
  })

  useDidShow(() => {
    console.log('列表页显示（每次切回或进入该页都会触发）')
    const cachedParams = Taro.getStorageSync('hotelSearchParams') || {}
    const signature = JSON.stringify(cachedParams)
    if (!hasInitialized.current || (signature && signature !== lastSearchSignature.current)) {
      hasInitialized.current = true
      lastSearchSignature.current = signature
      loadSearchParams(cachedParams)
    }
  })

  // --- 修改点 2: 完善 loadSearchParams 逻辑 ---
  const loadSearchParams = (incomingParams) => {
    const cachedParams = incomingParams || Taro.getStorageSync('hotelSearchParams') || {}
    console.log('【检测缓存同步】:', cachedParams)

    const normalizedCity = String(cachedParams.city || '').replace(/市$/, '').trim()
    let newParams = {
      city: normalizedCity,
      checkInDate: cachedParams?.checkInDate || '',
      checkOutDate: cachedParams?.checkOutDate || '',
      keyword: cachedParams?.keyword || '',
      priceType: cachedParams?.priceType || 'all',
      starType: cachedParams?.starType || 'all'
    };

    // 3. 更新 React 状态 (用于 UI 显示)
    setQueryParams(newParams);
    setTempFilter({
      price: newParams.priceType,
      star: newParams.starType
    });

    setSelectedTags([])
    setHasMore(true)
    // 4. 重要：重置列表并使用 newParams 直接请求数据
    setPage(1); 
    setHotelList([]); 
    fetchHotelData(newParams, 1, sortType, [])
  }
  
  // 3. 模拟 API 请求方法
  
  // --- 1. 核心数据请求方法 ---
  const fetchHotelData = async (params, pageNo = 1, currentSort = sortType, tags = selectedTags) => {
  if (loading) return; // 必须在这里拦截，防止重复请求
  setLoading(true);

  const { min, max } = getPriceRange(params.priceType);
  const selectedTagKeywords = (tags || [])
    .filter(tag => tag !== '五星级')
    .map(tag => TAG_KEYWORD_MAP[tag] || tag)
  const mergedKeyword = [params.keyword, ...selectedTagKeywords].filter(Boolean).join(' ')
  
  const apiQuery = {
    page: pageNo,
    limit: 10
  };

  if (params.city) apiQuery.city = String(params.city).replace(/市$/, '').trim()
  
  if (mergedKeyword) apiQuery.keyword = mergedKeyword;
  if (params.starType && params.starType !== 'all') apiQuery.star = params.starType;
  if ((!params.starType || params.starType === 'all') && (tags || []).includes('五星级')) {
    apiQuery.star = '5'
  }
  if (min !== undefined) apiQuery.min_price = min;
  if (max !== undefined) apiQuery.max_price = max;
  
  if (currentSort === 'price_low') apiQuery.sort = 'price_asc';
  if (currentSort === 'rating') apiQuery.sort = 'price_desc';

  try {
    const res = await request({
      url: '/hotel/list',
      method: 'GET',
      data: apiQuery
    });

    if (res.code === 200) {
      const { list: rawList, total } = res.data;
      
      let formatted = rawList.map(item => {
        let parsedTags = item.tags || []
        if (typeof item.tags === 'string') {
          try {
            parsedTags = JSON.parse(item.tags)
          } catch (e) {
            parsedTags = item.tags.split(/[、,|/ ]+/).filter(Boolean)
          }
        }
        return {
          ...item,
          imageUrl: item.cover_image?.startsWith('http')
            ? item.cover_image
            : `${IMAGE_HOST}${item.cover_image}`,
          tags: parsedTags,
          locationDesc: item.address,
          score: item.score // 只使用后端真实评分
        }
      })

      if (currentSort === 'rating') {
        formatted = [...formatted].sort((a, b) => Number(b.score || 0) - Number(a.score || 0))
      }
      if (currentSort === 'distance' && params.city) {
        const cityToken = String(params.city).replace(/市$/, '').trim()
        formatted = [...formatted].sort((a, b) => {
          const aScore = String(a.city || '').includes(cityToken) ? 0 : 1
          const bScore = String(b.city || '').includes(cityToken) ? 0 : 1
          return aScore - bScore
        })
      }

      // --- 【修改点】分页拼接逻辑 ---
      if (pageNo === 1) {
        setHotelList(formatted);
      } else {
        // 函数式更新，确保拿到最新的列表进行合并
        setHotelList(prev => [...prev, ...formatted]);
      }
      
      // --- 【修改点】判断是否还有更多 ---
      // 计算：当前已显示的条数 + 本次新加载条数 < 总条数
      setHasMore((pageNo - 1) * 10 + rawList.length < total);
    }
  } catch (err) {
    console.error('列表加载失败:', err);
    Taro.showToast({ title: '加载失败', icon: 'none' });
  } finally {
    setLoading(false);
  }
};

  // 4. 事件处理
  // 加载更多
  const handleLoadMore = () => {
  console.log('--- 触底事件成功触发 ---'); // 如果打印了这一行，说明成功了
  
  if (loading) {
    console.log('当前正在加载，拦截请求');
    return;
  }
  if (!hasMore) {
    console.log('没有更多数据，拦截请求');
    return;
  }

  const nextPage = page + 1;
  setPage(nextPage);
  fetchHotelData(queryParams, nextPage, sortType, selectedTags);
};

  // 处理关键词搜索
  const handleKeywordSearch = (keyword) => {
    const newParams = {
      ...queryParams,
      keyword: keyword.trim()
    }
    setQueryParams(newParams)
    setPage(1)
    setHotelList([])
    fetchHotelData(newParams, 1, sortType, selectedTags)
  }

  // 确认筛选
  const handleFilterConfirm = () => {
    const newParams = {
      ...queryParams,
      priceType: tempFilter.price,
      starType: tempFilter.star
    }
    setQueryParams(newParams) // 更新主状态
    setPage(1) // 重置页码
    setHotelList([]) // 清空列表
    setShowFilterPopup(false) // 关闭弹窗
    fetchHotelData(newParams, 1, sortType, selectedTags) // 重新请求
  }

  const handleSelectSort = (val) => {
    setSortType(val);
    setActiveTab('');
    setPage(1);
    // 注意：这里要直接传入最新的 val，因为 setSortType 是异步的
    fetchHotelData(queryParams, 1, val, selectedTags);
  };


  // 返回到首页函数 - 重点新增函数
  const handleBackToHome = () => {
    console.log('返回到酒店搜索首页')
    // 使用 switchTab 返回到首页（tabbar页面）
    switchTab({
      url: '/pages/index/index',
      success: () => {
        console.log('成功返回到首页')
      },
      fail: (err) => {
        console.error('返回失败:', err)
        Taro.showToast({
          title: '返回失败',
          icon: 'error'
        })
      }
    })
  }

    // 辅助函数：获取价格标签
  const getPriceLabel = (value) => {
    const option = PRICE_OPTIONS.find(opt => opt.value === value)
    return option ? option.label : '不限'
  }

  // 辅助函数：获取星级标签
  const getStarLabel = (value) => {
    const option = STAR_OPTIONS.find(opt => opt.value === value)
    return option ? option.label : '不限'
  }

  // 在组件内添加日期格式化函数
const formatDate = (dateStr, format = 'MM-DD') => {
  if (!dateStr) return '';
  
  // 1. 如果包含中文 "月" 或 "日"，先替换为 "-"
  let normalized = dateStr.replace('月', '-').replace('日', '').trim();
  
  // 2. 切割字符串
  const parts = normalized.split('-');
  
  // 3. 处理不同长度的数组 (考虑到可能传入 2026-02-18 或 02-18)
  let month = '';
  let day = '';
  
  if (parts.length >= 2) {
    // 总是取最后两位（适配 YYYY-MM-DD 和 MM-DD）
    month = parts[parts.length - 2].padStart(2, '0');
    day = parts[parts.length - 1].padStart(2, '0');
  } else {
    return dateStr; // 实在格式不对就原样返回
  }
  
  if (format === 'MM-DD') {
    return `${month}-${day}`;
  }
  return normalized;
};

// 1. 在组件内部定义标签数据（或放在外部常量）
const QUICK_FILTERS = ['双床房', '含早餐', '免费取消', '亲子优选', '智能家居', '江景房', '地铁周边', '五星级', '泳池']
const TAG_KEYWORD_MAP = {
  双床房: '双床',
  含早餐: '早餐',
  免费取消: '免费取消',
  亲子优选: '亲子',
  智能家居: '智能',
  江景房: '江景',
  地铁周边: '地铁',
  泳池: '泳池'
}

// 2. 在 Index 或 List 组件内
const [selectedTags, setSelectedTags] = useState([]); // 选中的标签数组

const toggleTag = (tag) => {
  let nextSelected = []
  setSelectedTags(prev => {
    nextSelected = prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    return nextSelected
  })

  const nextParams = {
    ...queryParams,
    starType: nextSelected.includes('五星级') ? '5' : (queryParams.starType === '5' ? 'all' : queryParams.starType)
  }
  setQueryParams(nextParams)
  setPage(1)
  setHotelList([])
  fetchHotelData(nextParams, 1, sortType, nextSelected)
}

// 1. 定义状态
const [activeTab, setActiveTab] = useState(''); // 当前点击的分类：'welcome' | 'distance' | 'price'
const [sortType, setSortType] = useState('welcome'); // 实际生效的排序值

// 2. 排序选项数据
const welcomeOptions = [
  { label: '欢迎度排序', value: 'welcome' },
  { label: '好评优先', value: 'rating' },
  { label: '低价优先', value: 'price_low' }
];

// 3. 点击处理
const handleTabClick = (tabName) => {
  if (tabName === 'distance') {
    handleSelectSort('distance')
    return
  }
  if (activeTab === tabName) {
    setActiveTab(''); // 再次点击关闭
  } else {
    setActiveTab(tabName);
  }
};





  return (
  <View className="list-page">
    {/* 1. 顶部 Sticky 区域 - 按照HTML设计优化 */}
    <View className="sticky-header">
      {/* 搜索胶囊 - 完全重新设计 */}
      <View className="search-bar">
        <View className="search-capsule-container">
          <View className="search-capsule">
            {/* 返回箭头 */}
            <View className="back-btn" onClick={handleBackToHome}>
              <Text className="back-icon">⬅</Text>
            </View>
            
            {/* 城市部分 */}
            <View className="capsule-section city-section">
              <Text className="city-name">{queryParams.city || '不限城市'}</Text>
              <View className="section-divider"></View>
            </View>
            
            {/* 日期部分 - 上下结构 + 右侧竖线 */}
            <View className="capsule-section date-section">
              {/* 日期内容包裹层 */}
              <View className="date-content">
                {/* 上：住 + 日期 */}
                <View className="date-container">
                  <Text className="date-label">住</Text>
                  <Text className="date-value">
                    {/* 删掉 || '02-06'，避免它在数据还没加载完时闪现错误日期 */}
                    {formatDate(queryParams.checkInDate) || '--'} 
                  </Text>
                </View>
                
                {/* 下：离 + 日期 */}
                <View className="date-container">
                  <Text className="date-label">离</Text>
                  <Text className="date-value">
                    {formatDate(queryParams.checkOutDate) || '--'}
                  </Text>
                </View>
              </View>
              
              {/* 保留：右侧竖线 */}
              <View className="section-divider right-vertical-line"></View>
            </View>

            {/* 关键词搜索区域 - 内联输入框 */}
            <View className="capsule-section keyword-section">
              <Text className="search-prefix-icon">&#xe8b6;</Text>
              <Input
                className="keyword-input"
                placeholder="城市/位置/品牌/酒店名"
                placeholderClass="keyword-placeholder"
                value={queryParams.keyword}
                onInput={(e) => setQueryParams(p => ({ ...p, keyword: e.detail.value }))}
                onConfirm={(e) => handleKeywordSearch(e.detail.value)}
                confirmType="search"
              />
              {queryParams.keyword ? (
                <View
                  className="keyword-clear"
                  onClick={() => handleKeywordSearch('')}
                >
                  <Text>×</Text>
                </View>
              ) : null}
            </View>
            
            {/* 搜索按鈕 */}
            <View
              className="search-icon-section"
              onClick={() => handleKeywordSearch(queryParams.keyword)}
            >
              <Text className="search-icon">搜索</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 快速筛选标签行 - 字体放大，可横向滚动 */}
      <ScrollView 
        className="quick-filter-tags" 
        scrollX 
        showsHorizontalScrollIndicator={false}
        enhanced
        scrollWithAnimation
      >
        <View className="tags-container">
          {QUICK_FILTERS.map(tag => (
            <View 
              key={tag}
              // 关键点1：动态类名切换选中效果
              className={`filter-tag ${selectedTags.includes(tag) ? 'active' : ''}`}
              // 关键点2：指定点击态样式类
              hoverClass="filter-tag--hover"
              // 关键点3：点击反馈时长
              hoverStayTime={80}
              onClick={() => toggleTag(tag)}
            >
              <Text className="tag-text">{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 排序栏 */}
      <View className="sort-bar">
        {/* 欢迎度排序 */}
        <View 
          className={`sort-item ${sortType === 'welcome' || activeTab === 'welcome' ? 'active' : ''}`}
          hoverClass="sort-item--hover"
          onClick={() => handleTabClick('welcome')}
        >
          <Text className="sort-text">
            {welcomeOptions.find(o => o.value === sortType)?.label || '欢迎度'}
          </Text>
          <View className="sort-icon">▼</View>
        </View>

        {/* 位置距离 */}
        <View 
          className={`sort-item ${sortType === 'distance' ? 'active' : ''}`}
          hoverClass="sort-item--hover"
          onClick={() => handleTabClick('distance')}
        >
          <Text className="sort-text">位置距离</Text>
          <View className="sort-icon">▼</View>
        </View>

        {/* 价格/星级 - 保持你原有的逻辑 */}
        <View 
          className={`sort-item ${queryParams.priceType !== 'all' || queryParams.starType !== 'all' ? 'active' : ''}`}
          hoverClass="sort-item--hover"
          onClick={() => setShowFilterPopup(true)}
        >
          <Text className="sort-text">价格/星级</Text>
          <View className="sort-icon">▼</View>
          {(queryParams.priceType !== 'all' || queryParams.starType !== 'all') && (
            <View className="filter-indicator"></View>
          )}
        </View>

        <View className="sort-item" hoverClass="sort-item--hover">
          <Text className="sort-text">筛选</Text>
          <View className="sort-icon">≡</View>
        </View>
      </View>

      {/* 【核心修改】将当前筛选条件摘要移入 sticky-header 内部，确保它不随列表滑走 */}
      {(queryParams.city || queryParams.keyword || queryParams.priceType !== 'all' || queryParams.starType !== 'all') && (
        <View className="filter-summary">
          <Text className="summary-text">
            当前筛选:
            {queryParams.city && ` 城市:${queryParams.city}`}
            {queryParams.keyword && ` "${queryParams.keyword}"`}
            {queryParams.priceType !== 'all' && ` 价格:${getPriceLabel(queryParams.priceType)}`}
            {queryParams.starType !== 'all' && ` 星级:${getStarLabel(queryParams.starType)}`}
          </Text>
        </View>
      )}
    </View>

    {/* 2. 列表滚动区域 */}
    <ScrollView
      scrollY
      className="list-scroll"
      onScrollToLower={handleLoadMore} // 绑定触底事件
      lowerThreshold={200}           // 距离底部 150px 时提前加载，提升体验
      enhanced
      // 【核心修改】移除写死的 1000rpx，依靠 SCSS 中的 flex: 1 自动计算高度
    >
      <View className="list-content">
        {hotelList.map(hotel => (
          <HotelCard 
            key={hotel.id} 
            data={hotel} 
            // 修改列表页中的跳转代码
            onClick={() => {
              Taro.navigateTo({
                // 将已有的日期状态传递给详情页
                url: `/pages/detail/index?id=${hotel.id}&checkIn=${queryParams.checkInDate}&checkOut=${queryParams.checkOutDate}`
              });
            }}
          />
        ))}

        {/* --- 修改开始：优化后的加载状态栏 --- */}
        <View className="loading-status-bar">
          {loading ? (
            <Text className="status-loading">正在努力加载中...</Text>
          ) : !hasMore ? (
            <View className="no-more-container">
              <View className="divider-line"></View>
              <Text className="no-more-text">已经到底啦</Text>
              <View className="divider-line"></View>
            </View>
          ) : (
            <Text className="status-loading">上滑加载更多</Text>
          )}
        </View>
      </View>
    </ScrollView>

    {/* 下拉弹窗容器 - 针对“欢迎度排序” - 保持逻辑 */}
    <Popup
      visible={activeTab === 'welcome'}
      position="top"
      onClose={() => setActiveTab('')}
      style={{ top: '100px' }} // 根据你 header 的高度调整偏移
    >
      <View className="sort-dropdown">
        {welcomeOptions.map(opt => (
          <View 
            key={opt.value} 
            className={`dropdown-item ${sortType === opt.value ? 'active' : ''}`}
            onClick={() => handleSelectSort(opt.value)}
          >
            {opt.label}
          </View>
        ))}
      </View>
    </Popup>

    {/* 3. 价格/星级 筛选弹窗 */}
    <Popup
      visible={showFilterPopup}
      position="bottom"
      round
      onClose={() => setShowFilterPopup(false)}
    >
      <View className="filter-popup">
        <View className="popup-header">
          <Text className="title">价格/星级筛选</Text>
          <Text className="close" onClick={() => setShowFilterPopup(false)}>✕</Text>
        </View>
        
        <ScrollView scrollY className="popup-body">
          {/* 价格块 */}
          <View className="section">
            <Text className="section-title">价格预算</Text>
            <View className="tags-grid">
              {PRICE_OPTIONS.map(opt => (
                <View 
                  key={opt.value}
                  className={`tag ${tempFilter.price === opt.value ? 'active' : ''}`}
                  onClick={() => setTempFilter(p => ({ ...p, price: opt.value }))}
                >
                  {opt.label}
                </View>
              ))}
            </View>
          </View>

          {/* 星级块 */}
          <View className="section">
            <Text className="section-title">星级标准</Text>
            <View className="tags-grid">
              {STAR_OPTIONS.map(opt => (
                <View 
                  key={opt.value}
                  className={`tag ${tempFilter.star === opt.value ? 'active' : ''}`}
                  onClick={() => setTempFilter(p => ({ ...p, star: opt.value }))}
                >
                  {opt.label}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View className="popup-footer">
          <View className="btn reset" onClick={() => setTempFilter({ price: 'all', star: 'all' })}>重置</View>
          <View className="btn confirm" onClick={handleFilterConfirm}>查看酒店</View>
        </View>
      </View>
    </Popup>
  </View>
)
}
