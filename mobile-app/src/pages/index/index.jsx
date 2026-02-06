import React, { useState, useRef } from 'react'
import { 
  View, 
  Image, 
  Input, 
  Button, 
  ScrollView, 
  Text,
  Swiper,
  SwiperItem
} from '@tarojs/components'
import Taro,{ 
  getCurrentInstance,
  useLoad,
  useReady,
  usePullDownRefresh,
  useReachBottom,
  navigateTo
} from '@tarojs/taro'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import './index.scss'
import { Calendar,Popup } from '@nutui/nutui-react-taro';
import CustomTabBar from '../../custom-tab-bar';


// 设置dayjs本地化
dayjs.locale('zh-cn')

// 快速标签数据
const QUICK_TAGS = [
  { id: 1, icon: '⭐', label: '五星级', type: 'star' },
  { id: 2, icon: '📱', label: '网红博主推荐', type: 'influencer' },
  { id: 3, icon: '👨‍👩‍👧‍👦', label: '亲子乐园', type: 'family' },
  { id: 4, icon: '🎨', label: '设计精品', type: 'design' },
  { id: 5, icon: '🏊', label: '无边泳池', type: 'pool' },
  { id: 6, icon: '🍽️', label: '米其林餐厅', type: 'restaurant' }
]

const PRICE_OPTIONS = [
  { label: '不限', value: 'all' },
  { label: '¥0-150', value: '0-150' },
  { label: '¥150-300', value: '150-300' },
  { label: '¥300-600', value: '300-600' },
  { label: '¥600+', value: '600-up' }
]
const STAR_OPTIONS = [
  { label: '不限', value: 'all' },
  { label: '二星及以下/经济型', value: '2' },
  { label: '三星/舒适', value: '3' },
  { label: '四星/高档', value: '4' },
  { label: '五星/豪华', value: '5' }
]

// 最近浏览数据
const RECENT_HOTELS = [
  {
    id: 1,
    name: '上海中心J酒店',
    price: 2880,
    rating: 4.9,
    reviews: 1280,
    image: 'https://modao.cc/agent-py/media/generated_images/2026-02-04/a55fae9d04fa47b383be512902d9f2b1.jpg',
    tags: ['五星级', '江景房', '行政酒廊']
  },
  {
    id: 2,
    name: '和平饭店',
    price: 1920,
    rating: 4.8,
    reviews: 2456,
    image: 'https://modao.cc/agent-py/media/generated_images/2026-02-04/f3b3ec4f3810412ca44d6a60c5ae0652.jpg',
    tags: ['历史建筑', '外滩景观', '老上海风情']
  },
  {
    id: 3,
    name: '养云安缦',
    price: 4500,
    rating: 4.9,
    reviews: 892,
    image: 'https://modao.cc/agent-py/media/generated_images/2026-02-04/d6da6cead0c74fa3bb26f2f684f5386a.jpg',
    tags: ['奢华度假', '园林景观', '私密性佳']
  },
  {
    id: 4,
    name: '宝格丽酒店',
    price: 3800,
    rating: 4.9,
    reviews: 1567,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80',
    tags: ['奢华品牌', '城市景观', '高端服务']
  }
]

// 热门城市数据
const POPULAR_CITIES = [
  { id: 1, name: '上海', hotels: 1280 },
  { id: 2, name: '北京', hotels: 980 },
  { id: 3, name: '广州', hotels: 760 },
  { id: 4, name: '深圳', hotels: 820 },
  { id: 5, name: '杭州', hotels: 540 },
  { id: 6, name: '成都', hotels: 630 }
]

export default function Index() {
  // 页面状态管理
  const [searchParams, setSearchParams] = useState({
    city: '上海市',
    checkInDate: dayjs().format('MM月DD日'),
    checkInWeekday: dayjs().format('dddd'),
    checkOutDate: dayjs().add(1, 'day').format('MM月DD日'),
    checkOutWeekday: dayjs().add(1, 'day').format('dddd'),
    nights: 1,
    keyword: '',
    guests: 2,
    rooms: 1
  })

  const [activeTag, setActiveTag] = useState(null)
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
  const [showCityPicker, setShowCityPicker] = useState(false)
  const [currentCity, setCurrentCity] = useState('上海市')
  const [loading, setLoading] = useState(false)
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)

  
  // 2. 增加状态管理
  const [filterParams, setFilterParams] = useState({
    price: PRICE_OPTIONS[0],
    star: STAR_OPTIONS[0]
  })
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  // 临时状态，用于弹窗内选择，点击确定后再同步到 filterParams
  const [tempFilter, setTempFilter] = useState({ ...filterParams })

  // 3. 处理筛选确认
  const handleFilterConfirm = () => {
    setFilterParams({ ...tempFilter })
    setIsFilterVisible(false)
  }


  // 页面生命周期
  useLoad(() => {
    console.log('页面加载完成')
    // 这里可以初始化数据，如获取用户位置、热门推荐等
    initPageData()
  })

  // 初始化页面数据
  const initPageData = () => {
    // 模拟API调用
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const handleConfirmDate = (param) => {
    // param 返回的是一个数组，例如 [[2026, 02, 05], [2026, 02, 07]]
    const [start, end] = param
    const startDate = dayjs(`${start[0]}-${start[1]}-${start[2]}`)
    const endDate = dayjs(`${end[0]}-${end[1]}-${end[2]}`)
    
    setSearchParams(prev => ({
      ...prev,
      checkInDate: startDate.format('MM月DD日'),
      checkInWeekday: startDate.format('dddd'),
      checkOutDate: endDate.format('MM月DD日'),
      checkOutWeekday: endDate.format('dddd'),
      nights: endDate.diff(startDate, 'day') // 计算差值
    }))
    setIsCalendarVisible(false)
  }

 // 1. 修改 handleSearch 方法
  const handleSearch = () => {
    // 基础验证
    if (!searchParams.keyword.trim() && searchParams.city === '请选择') {
      Taro.showToast({ title: '请选择目的地或输入关键词', icon: 'none' })
      return
    }

    // 2. 构造查询参数对象
    const queryObj = {
      city: searchParams.city,
      keyword: searchParams.keyword || '',
      checkInDate: searchParams.checkInDate, // 实际开发建议传 'YYYY-MM-DD' 格式
      checkOutDate: searchParams.checkOutDate,
      days: searchParams.nights,
      // 传递筛选条件的值 (value)，而不是 label
      priceType: filterParams.price.value, 
      starType: filterParams.star.value
    }
    console.log('搜索参数:', queryObj)
    // 将参数存储到全局或缓存中（因为 switchTab 不能直接传参）
    Taro.setStorageSync('hotelSearchParams', queryObj)

    console.log('跳转到 list 页面，参数:', queryObj)

   // 使用 switchTab 跳转到列表页（tabbar页面）
    Taro.switchTab({
      url: '/pages/list/index',
      success: () => {
        console.log('跳转到列表页成功')
      },
      fail: (err) => {
        console.error('跳转失败:', err)
        Taro.showToast({
          title: '跳转失败，请重试',
          icon: 'error'
        })
      }
    })
  }
  // 处理城市选择
  const handleCitySelect = (city) => {
    setCurrentCity(city)
    setSearchParams(prev => ({
      ...prev,
      city: city
    }))
    setShowCityPicker(false)
  }
  const openCalendar = (e) => {
  console.log('点击了日期区域'); // 调试用
  setIsCalendarVisible(true);
};
 const handleDateSelect = () => {
    // 在实际项目中，这里会弹出日期选择器组件
    Taro.showToast({
      title: '日期选择功能开发中',
      icon: 'none',
      duration: 2000
    })
  }
  // 处理快速标签点击
  const handleTagClick = (tag) => {
    setActiveTag(tag.id)
    console.log('选中标签:', tag)
    
    // 根据标签类型执行不同操作
    switch (tag.type) {
      case 'star':
        navigateTo({
          url: '/pages/filter/index?type=star&value=5'
        })
        break
      case 'family':
        navigateTo({
          url: '/pages/filter/index?type=facility&value=family'
        })
        break
      default:
        // 在搜索框中添加标签关键词
        setSearchParams(prev => ({
          ...prev,
          keyword: tag.label
        }))
    }
  }

  // 处理酒店点击
  const handleHotelClick = (hotel) => {
    console.log('点击酒店:', hotel.name)
    navigateTo({
      url: `/pages/hotel-detail/index?id=${hotel.id}`
    })
  }

  // 清空历史记录
  const clearHistory = () => {
    Taro.showModal({
      title: '确认清空',
      content: '确定要清空浏览历史吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({
            title: '已清空历史记录',
            icon: 'success',
            duration: 1500
          })
          // 在实际项目中，这里会调用API清空历史记录
        }
      }
    })
  }

  // 使用我的位置
  const useMyLocation = () => {
    // 获取当前位置
    Taro.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log('当前位置:', res)
        
        // 在实际项目中，这里会调用逆地理编码API获取城市信息
        const city = '上海市' // 模拟获取到的城市
        setCurrentCity(city)
        setSearchParams(prev => ({
          ...prev,
          city: city
        }))
        
        Taro.showToast({
          title: '已获取当前位置',
          icon: 'success',
          duration: 1500
        })
      },
      fail: (err) => {
        console.error('获取位置失败:', err)
        Taro.showToast({
          title: '获取位置失败，请检查权限',
          icon: 'error',
          duration: 2000
        })
      }
    })
  }

  // 渲染热门城市
  const renderPopularCities = () => {
    return (
      <View className="popular-cities">
        <View className="section-title">
          <Text className="title">热门城市</Text>
          <Text className="subtitle">探索更多目的地</Text>
        </View>
        <ScrollView 
          className="cities-scroll" 
          scrollX 
          enhanced 
          showScrollbar={false}
        >
          <View className="cities-container">
            {POPULAR_CITIES.map(city => (
              <View 
                key={city.id} 
                className={`city-item ${currentCity.includes(city.name) ? 'active' : ''}`}
                onClick={() => handleCitySelect(city.name)}
              >
                <Text className="city-name">{city.name}</Text>
                <Text className="city-count">{city.hotels}家酒店</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }

  return (
    <View className="page-container">
      {/* 页面主要内容区域 */}
      <ScrollView 
        className="main-content"
        scrollY
        enhanced
        showScrollbar={false}
      >
        {/* 顶部横幅轮播 */}
        <Swiper
          className="banner-swiper"
          indicatorColor="#999"
          indicatorActiveColor="#3B82F6"
          circular
          indicatorDots
          autoplay
          interval={4000}
        >
          <SwiperItem>
            <View 
              className="banner-item"
              onClick={() => navigateTo({ url: '/pages/promotion/index?id=1' })}
            >
              <Image
                className="banner-image"
                src="https://miaobi-lite.bj.bcebos.com/miaobi/5mao/b%275LiJ5LqaMTgw5bqm5rW35pmv6YWS5bqXXzE3MzA3NTcyOTkuMTk3MDIzNA%3D%3D%27/0.png"
                mode="aspectFill"
              />
              <View className="banner-content">
                {/* 修改：减小促销标签高度 */}
                <View className="promotion-tag">
                  <Text className="tag-text">限时特惠</Text>
                </View>
                <Text className="banner-title">2026春季大促：海景房5折起</Text>
                <Text className="banner-subtitle">感受呼吸间的海滨浪漫</Text>
              </View>
            </View>
          </SwiperItem>
          
          <SwiperItem>
            <View 
              className="banner-item"
              onClick={() => navigateTo({ url: '/pages/promotion/index?id=2' })}
            >
              <Image
                className="banner-image"
                src="https://digital.ihg.com.cn/is/image/ihg/crowne-plaza-lanzhou-7876381686-4x3"
                mode="aspectFill"
              />
              <View className="banner-content">
                <View className="promotion-tag tag-premium">
                  <Text className="tag-text">会员专享</Text>
                </View>
                <Text className="banner-title">白金会员专享：房型免费升级</Text>
                <Text className="banner-subtitle">尊享奢华住宿体验</Text>
              </View>
            </View>
          </SwiperItem>
          
          <SwiperItem>
            <View 
              className="banner-item"
              onClick={() => navigateTo({ url: '/pages/promotion/index?id=3' })}
            >
              <Image
                className="banner-image"
                src="https://plus.unsplash.com/premium_photo-1661963123153-5471a95b7042?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                mode="aspectFill"
              />
              <View className="banner-content">
                <View className="promotion-tag tag-flash">
                  <Text className="tag-text">闪购</Text>
                </View>
                <Text className="banner-title">周末闪购：精品酒店299元起</Text>
                <Text className="banner-subtitle">限时抢购，手慢无</Text>
              </View>
            </View>
          </SwiperItem>
        </Swiper>

        {/* 搜索核心区域 - 取消负margin，避免覆盖banner */}
        <View className="search-section">
          <View className="search-card">
            {/* 位置选择 */}
            <View className="search-row location-row">
              <View 
                className="location-select"
                onClick={() => setShowCityPicker(!showCityPicker)}
              >
                <Text className="location-icon">📍</Text>
                <View className="location-info">
                  <Text className="location-label">目的地</Text>
                  <Text className="location-value">{searchParams.city}</Text>
                </View>
                <Text className="arrow-icon">›</Text>
              </View>
              
              <Button 
                className="location-btn"
                onClick={useMyLocation}
              >
                <Text className="btn-icon">📍</Text>
                <Text className="btn-text">我的位置</Text>
              </Button>
            </View>

            {/* 修改：点击整个 date-row 触发日历 */}
            <View className="search-row date-row" onClick={openCalendar}
  // 增加 hover-class 方便视觉确认是否点击到
  hoverClass="date-row-hover">
              <View className="date-item checkin">
                <Text className="date-label">入住日期</Text>
                <View className="date-info">
                  <Text className="date-value">{searchParams.checkInDate}</Text>
                  <Text className="date-weekday">{searchParams.checkInWeekday}</Text>
                </View>
              </View>
              
              <View className="night-count">
                <Text className="night-text">{searchParams.nights}晚</Text>
              </View>
              
              <View 
                className="date-item checkout"
                
              >
                <Text className="date-label">离店日期</Text>
                <View className="date-info">
                  <Text className="date-value">{searchParams.checkOutDate}</Text>
                  <Text className="date-weekday">{searchParams.checkOutWeekday}</Text>
                </View>
              </View>
            </View>

            {/* 关键词搜索 */}
            <View className="search-row keyword-row">
              <Text className="search-icon">🔍</Text>
              <Input
                className="search-input"
                placeholder="关键字/位置/品牌/酒店名"
                placeholderClass="placeholder"
                value={searchParams.keyword}
                onInput={(e) => setSearchParams(prev => ({
                  ...prev,
                  keyword: e.detail.value
                }))}
                confirmType="search"
                onConfirm={handleSearch}
              />
              {searchParams.keyword && (
                <Text 
                  className="clear-icon"
                  onClick={() => setSearchParams(prev => ({ ...prev, keyword: '' }))}
                >
                  ✕
                </Text>
              )}
            </View>

            {/* 房间数量 */}
            <View className="search-row rooms-row">
              <Text className="rooms-label">房间数量</Text>
              <View className="rooms-controls">
                <Button 
                  className="control-btn minus"
                  onClick={() => setSearchParams(prev => ({
                    ...prev,
                    rooms: Math.max(1, prev.rooms - 1)
                  }))}
                >
                  -
                </Button>
                <Text className="rooms-count">{searchParams.rooms}间</Text>
                <Button 
                  className="control-btn plus"
                  onClick={() => setSearchParams(prev => ({
                    ...prev,
                    rooms: prev.rooms + 1
                  }))}
                >
                  +
                </Button>
            </View>
          </View>
          
          {/* 4. 新增：价格/星级筛选行 */}
            <View 
              className="search-row filter-row" 
              onClick={() => {
                setTempFilter({ ...filterParams })
                setIsFilterVisible(true)
              }}
              hoverClass="row-hover"
            >
              <Text className="filter-label">价格/星级</Text>
              <View className="filter-display">
                <Text className={`filter-value ${(filterParams.price.value === 'all' && filterParams.star.value === 'all') ? 'placeholder' : ''}`}>
                  {filterParams.price.value === 'all' && filterParams.star.value === 'all' 
                    ? '请选择价格/星级' 
                    : `${filterParams.price.label} · ${filterParams.star.label}`}
                </Text>
                <Text className="arrow-icon">›</Text>
              </View>
            </View>

            {/* 搜索按钮 */}
            <Button 
              className="search-button"
              onClick={handleSearch}
              loading={loading}
              disabled={loading}
            >
              <Text className="button-text">
                {loading ? '搜索中...' : '开始搜索'}
              </Text>
            </Button>
          </View>
        </View>

        {/* 热门城市推荐 */}
        {renderPopularCities()}

        {/* 快速标签 */}
        <View className="quick-tags-section">
          <View className="section-header">
            <Text className="section-title">为您推荐</Text>
            <Text className="section-subtitle">智能推荐热门筛选</Text>
          </View>
          
          <ScrollView 
            className="tags-scroll" 
            scrollX 
            enhanced 
            showScrollbar={false}
          >
            <View className="tags-container">
              {QUICK_TAGS.map(tag => (
                <View 
                  key={tag.id}
                  className={`tag-item ${activeTag === tag.id ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  <Text className="tag-icon">{tag.icon}</Text>
                  <Text className="tag-label">{tag.label}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 最近浏览 */}
        <View className="recent-section">
          <View className="section-header">
            <View className="section-title-wrapper">
              <Text className="section-title">最近看过</Text>
              <Text className="section-badge">{RECENT_HOTELS.length}</Text>
            </View>
            <Text 
              className="clear-history"
              onClick={clearHistory}
            >
              清空历史
            </Text>
          </View>
          
          <ScrollView 
            className="hotels-scroll" 
            scrollX 
            enhanced 
            showScrollbar={false}
          >
            <View className="hotels-container">
              {RECENT_HOTELS.map(hotel => (
                <View 
                  key={hotel.id}
                  className="hotel-card"
                  onClick={() => handleHotelClick(hotel)}
                >
                  <Image
                    className="hotel-image"
                    src={hotel.image}
                    mode="aspectFill"
                  />
                  <View className="hotel-info">
                    <Text className="hotel-name">{hotel.name}</Text>
                    <View className="hotel-rating">
                      <Text className="rating-star">⭐</Text>
                      <Text className="rating-value">{hotel.rating}</Text>
                      <Text className="rating-reviews">({hotel.reviews}条评价)</Text>
                    </View>
                    <View className="hotel-tags">
                      {hotel.tags.slice(0, 2).map((tag, index) => (
                        <Text key={index} className="hotel-tag">{tag}</Text>
                      ))}
                    </View>
                    <View className="hotel-price">
                      <Text className="price-symbol">¥</Text>
                      <Text className="price-value">{hotel.price.toLocaleString()}</Text>
                      <Text className="price-unit">起/晚</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 底部留白 */}
        <View className="bottom-spacing"></View>
      </ScrollView>

      {/* 5. 新增：价格星级筛选弹窗 */}
      <Popup
        visible={isFilterVisible}
        position="bottom"
        round
        onClose={() => setIsFilterVisible(false)}
      >
        <View className="filter-popup-content">
          <View className="popup-header">
            <Text className="popup-title">价格/星级筛选</Text>
            <Text className="popup-close" onClick={() => setIsFilterVisible(false)}>✕</Text>
          </View>
          
          <ScrollView className="popup-body" scrollY>
            <View className="filter-group">
              <Text className="group-title">价格预算</Text>
              <View className="options-grid">
                {PRICE_OPTIONS.map(opt => (
                  <View 
                    key={opt.value}
                    className={`option-item ${tempFilter.price.value === opt.value ? 'active' : ''}`}
                    onClick={() => setTempFilter(p => ({ ...p, price: opt }))}
                  >
                    {opt.label}
                  </View>
                ))}
              </View>
            </View>

            <View className="filter-group">
              <Text className="group-title">星级标准</Text>
              <View className="options-grid">
                {STAR_OPTIONS.map(opt => (
                  <View 
                    key={opt.value}
                    className={`option-item ${tempFilter.star.value === opt.value ? 'active' : ''}`}
                    onClick={() => setTempFilter(p => ({ ...p, star: opt }))}
                  >
                    {opt.label}
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <View className="popup-footer">
            <Button className="reset-btn" onClick={() => setTempFilter({ price: PRICE_OPTIONS[0], star: STAR_OPTIONS[0] })}>重置</Button>
            <Button className="confirm-btn" onClick={handleFilterConfirm}>完成</Button>
          </View>
        </View>
      </Popup>


     {isCalendarVisible && (
      <Calendar
        visible={isCalendarVisible}
        type="range"
        startDate={dayjs().format('YYYY-MM-DD')}
        endDate={dayjs().add(6, 'month').format('YYYY-MM-DD')}
        onClose={() => setIsCalendarVisible(false)}
        onConfirm={handleConfirmDate}
      />
)}
      {/* 加载状态 */}
      {loading && (
        <View className="loading-overlay">
          <View className="loading-content">
            <View className="loading-spinner"></View>
            <Text className="loading-text">加载中...</Text>
          </View>
        </View>
      )}

      {/* 城市选择器（简化版） */}
      {showCityPicker && (
        <View className="city-picker-overlay" onClick={() => setShowCityPicker(false)}>
          <View className="city-picker" onClick={(e) => e.stopPropagation()}>
            <View className="picker-header">
              <Text className="picker-title">选择城市</Text>
              <Text 
                className="picker-close"
                onClick={() => setShowCityPicker(false)}
              >
                ✕
              </Text>
            </View>
            <ScrollView className="picker-list" scrollY>
              {POPULAR_CITIES.map(city => (
                <View 
                  key={city.id}
                  className={`picker-item ${currentCity.includes(city.name) ? 'selected' : ''}`}
                  onClick={() => handleCitySelect(city.name)}
                >
                  <Text className="picker-item-name">{city.name}</Text>
                  <Text className="picker-item-count">{city.hotels}家酒店</Text>
                </View>
              ))}
            </ScrollView>
            
          </View>
        </View>
      )}
      {process.env.TARO_ENV === 'h5' && <CustomTabBar />}
    </View>
  )
}