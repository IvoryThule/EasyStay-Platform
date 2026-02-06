// pages/list/index.jsx
import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import Taro, { getCurrentInstance, navigateBack, useLoad, useDidShow,switchTab } from '@tarojs/taro'
import { Popup } from '@nutui/nutui-react-taro'
import HotelCard from '../../components/HotelCard' // 引入卡片组件
import './index.scss'
import { IoIosSearch } from "react-icons/io";

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
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // 搜索条件状态 (初始化时从路由获取)
  const [queryParams, setQueryParams] = useState({
    city: '上海',
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
  // 2. 页面加载：从缓存获取参数并请求数据
  useLoad(() => {
    console.log('列表页加载')
    loadSearchParams()
  })
  // 3. 每次显示页面时也检查参数（可选）
  useDidShow(() => {
    console.log('列表页显示')
    // 如果是从首页跳转回来，可能需要重新加载数据
    const cachedParams = Taro.getStorageSync('hotelSearchParams')
    if (cachedParams) {
      console.log('从缓存获取到参数:', cachedParams)
      // 可以在这里更新参数或重新加载数据
    }
  })

   // 加载搜索参数的函数
  const loadSearchParams = () => {
    let initialParams = {
      city: '上海',
      checkInDate: '',
      checkOutDate: '',
      keyword: '',
      priceType: 'all',
      starType: 'all'
    }
    
    // 方式1：优先从缓存获取参数
    const cachedParams = Taro.getStorageSync('hotelSearchParams')
    if (cachedParams) {
      console.log('从缓存获取参数:', cachedParams)
      initialParams = {
        ...initialParams,
        ...cachedParams,
        // 确保所有字段都有值
        city: cachedParams.city || '上海',
        checkInDate: cachedParams.checkInDate || '',
        checkOutDate: cachedParams.checkOutDate || '',
        keyword: cachedParams.keyword || '',
        priceType: cachedParams.priceType || 'all',
        starType: cachedParams.starType || 'all'
      }
      
      // 可选：清除缓存，避免下次进入时重复使用
      // Taro.removeStorageSync('hotelSearchParams')
    } 
    // 方式2：如果缓存没有，再尝试从路由参数获取（兼容其他跳转方式）
    else {
      const routerParams = getCurrentInstance().router?.params || {}
      console.log('从路由参数获取:', routerParams)
      
      if (Object.keys(routerParams).length > 0) {
        initialParams = {
          ...initialParams,
          city: decodeURIComponent(routerParams.city || '上海'),
          checkInDate: decodeURIComponent(routerParams.checkInDate || ''),
          checkOutDate: decodeURIComponent(routerParams.checkOutDate || ''),
          keyword: decodeURIComponent(routerParams.keyword || ''),
          priceType: routerParams.priceType || 'all',
          starType: routerParams.starType || 'all'
        }
      }
    }
    
    console.log('最终使用的参数:', initialParams)
    
    // 更新状态
    setQueryParams(initialParams)
    setTempFilter({
      price: initialParams.priceType,
      star: initialParams.starType
    })
    
    // 发起首次请求
    fetchHotelData(initialParams, 1)
  }
  
  // 3. 模拟 API 请求方法
  const fetchHotelData = (params, pageNo = 1) => {
    setLoading(true)
    console.log('调用API参数:', { ...params, page: pageNo })

    // 显示当前搜索条件
    console.log('搜索条件:', {
      城市: params.city,
      关键词: params.keyword,
      价格范围: params.priceType,
      星级: params.starType
    })

    // 模拟网络延迟
    setTimeout(() => {
      // 模拟返回数据
      const mockResult = generateMockData(pageNo, params)
      
      if (pageNo === 1) {
        setHotelList(mockResult)
      } else {
        setHotelList(prev => [...prev, ...mockResult])
      }

      setLoading(false)
      setHasMore(mockResult.length === 10) // 假设每页10条
    }, 800)
  }

  // 生成模拟数据 (实际开发中删除此函数)
  const generateMockData = (pageNo, params) => {
    // 根据筛选条件简单过滤模拟
    const basePrice = params.priceType === '600-up' ? 800 : 300
    
    return Array.from({ length: 10 }).map((_, index) => ({
      id: `${pageNo}-${index}`,
      name: `${params.city}模拟酒店-${pageNo}-${index + 1}`,
      imageUrl: 'https://modao.cc/agent-py/media/generated_images/2026-02-04/354e4c83e3b445bba8a31a4d2d7c0700.jpg',
      score: 4.8,
      scoreDesc: '超棒',
      commentCount: 1000 + index * 5,
      collectionCount: 5000,
      locationDesc: `距市中心 ${index + 1}.5km`,
      tags: ['免费取消', '近地铁'],
      price: basePrice + index * 50,
      originalPrice: basePrice + index * 50 + 200,
      ranking: index === 0 ? { text: '人气榜 No.1', type: 'gold' } : null
    }))
  }

  // 4. 事件处理
  // 加载更多
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchHotelData(queryParams, nextPage)
    }
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
    fetchHotelData(newParams, 1) // 重新请求
  }


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
  // 移除中文字符，转换为标准格式
  const cleanDate = dateStr.replace(/[月日]/g, '-').replace(/-$/, '');
  const parts = cleanDate.split('-');
  if (parts.length < 2) return dateStr;
  
  if (format === 'MM-DD') {
    const month = parts[0].padStart(2, '0');
    const day = parts[1].padStart(2, '0');
    return `${month}-${day}`;
  }
  return dateStr;
};

// 1. 在组件内部定义标签数据（或放在外部常量）
const QUICK_FILTERS = ['双床房', '含早餐', '免费取消', '亲子优选', '智能家居', '江景房', '地铁周边', '五星级', '泳池'];

// 2. 在 Index 或 List 组件内
const [selectedTags, setSelectedTags] = useState([]); // 选中的标签数组

const toggleTag = (tag) => {
  // 实现多选逻辑：如果已选则移除，未选则加入
  setSelectedTags(prev => 
    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
  );
  // 这里后续可以调用 API 重新加载数据
};

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
  if (activeTab === tabName) {
    setActiveTab(''); // 再次点击关闭
  } else {
    setActiveTab(tabName);
  }
};

const handleSelectSort = (val) => {
  setSortType(val);
  setActiveTab(''); // 关闭弹窗
  // 这里执行你的查询逻辑：queryParams.update({ sort: val })
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
              <Text className="city-name">{queryParams.city}</Text>
              <View className="section-divider"></View>
            </View>
            
            {/* 日期部分 - 上下结构 + 右侧竖线 */}
            <View className="capsule-section date-section">
              {/* 日期内容包裹层 */}
              <View className="date-content">
                {/* 上：住 + 日期 */}
                <View className="date-container">
                  <Text className="date-label">住</Text>
                  <Text className="date-value">{formatDate(queryParams.checkInDate, 'MM-DD') || '02-06'}</Text>
                </View>
                
                {/* 下：离 + 日期 */}
                <View className="date-container">
                  <Text className="date-label">离</Text>
                  <Text className="date-value">{formatDate(queryParams.checkOutDate, 'MM-DD') || '02-07'}</Text>
                </View>
              </View>
              
              {/* 保留：右侧竖线 */}
              <View className="section-divider right-vertical-line"></View>
            </View>

            {/* 关键词部分 */}
            <View className="capsule-section keyword-section">
              <Text className="keyword-text">
                {queryParams.keyword || '位置/品牌/酒店'}
              </Text>
            </View>
            
            {/* 搜索图标 */}
            <View className="search-icon-section">
              <Text className="search-icon">🔍</Text>
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
        className={`sort-item ${activeTab === 'distance' ? 'active' : ''}`}
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

    {/* 下拉弹窗容器 - 针对“欢迎度排序” */}
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
    </View>

    {/* 当前筛选条件摘要 - 保持不变 */}
    {(queryParams.keyword || queryParams.priceType !== 'all' || queryParams.starType !== 'all') && (
      <View className="filter-summary">
        <Text className="summary-text">
          当前筛选:
          {queryParams.keyword && ` "${queryParams.keyword}"`}
          {queryParams.priceType !== 'all' && ` 价格:${getPriceLabel(queryParams.priceType)}`}
          {queryParams.starType !== 'all' && ` 星级:${getStarLabel(queryParams.starType)}`}
        </Text>
      </View>
    )}

      {/* 2. 列表滚动区域 */}
      <ScrollView
        scrollY
        className="list-scroll"
        onScrollToLower={handleLoadMore}
        lowerThreshold={100}
      >
        <View className="list-content">
          {hotelList.map(hotel => (
            <HotelCard 
              key={hotel.id} 
              data={hotel} 
              onClick={() => console.log('点击详情', hotel.id)} 
            />
          ))}

          {/* 状态提示 */}
          <View className="loading-tip">
            {loading ? '加载中...' : (hasMore ? '上拉加载更多' : '没有更多了')}
          </View>
        </View>
      </ScrollView>

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