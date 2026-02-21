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
import Taro, {
  getCurrentInstance,
  useLoad,
  useReady,
  useDidShow,
  usePullDownRefresh,
  useReachBottom,
  navigateTo
} from '@tarojs/taro'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import './index.scss'
import { Calendar, Popup } from '@nutui/nutui-react-taro';
import request from '../../utils/request';
import AiFloatBall from '../../components/AiFloatBall';

// 设置dayjs本地化
dayjs.locale('zh-cn')
// 快速标签数据
const QUICK_TAGS = [
  { id: 1, label: '五星级', type: 'star' },
  { id: 2, label: '网红推荐', type: 'influencer' },
  { id: 3, label: '亲子酒店', type: 'family' },
  { id: 4, label: '设计精品', type: 'design' },
  { id: 5, label: '游泳池', type: 'pool' },
  { id: 6, label: '美食餐厅', type: 'restaurant' }
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

  // 新增:推荐酒店列表
  const [recommendHotels, setRecommendHotels] = useState([])
  const [loadingRecommend, setLoadingRecommend] = useState(false)

  // 新增:Banner酒店数据
  const [bannerHotels, setBannerHotels] = useState([])

  // 新增:热门城市动态数据
  const [popularCities, setPopularCities] = useState(POPULAR_CITIES)
  const [loadingCities, setLoadingCities] = useState(false)

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
    initPageData()
  })

  // 初始化页面数据
  const initPageData = async () => {
    setLoading(true)
    try {
      // 1. 获取IP定位
      const locationRes = await request({ url: '/system/location', method: 'GET' })
      if (locationRes.code === 200 && locationRes.data?.city) {
        const detectedCity = locationRes.data.city
        setCurrentCity(detectedCity)
        setSearchParams(prev => ({ ...prev, city: detectedCity }))
      }

      // 2. 获取城市统计数据
      await fetchCityStats()

      // 3. 获取推荐酒店(当前城市前4条)
      await fetchRecommendHotels(searchParams.city)

      // 4. 获取Banner酒店(前3条高星酒店)
      await fetchBannerHotels(searchParams.city)
    } catch (error) {
      console.error('初始化失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 获取Banner酒店
  const fetchBannerHotels = async (city) => {
    try {
      const cleanCity = city.replace(/市$/, '')
      // 优先获取5星级,如果不足3条则降级到4星
      let res = await request({
        url: '/hotel/list',
        method: 'GET',
        data: { city: cleanCity, limit: 3, star: 5 }
      })
      
      let bannerList = res.code === 200 && res.data?.list ? res.data.list : []
      
      // 如果5星级不足3条,补充4星级酒店
      if (bannerList.length < 3) {
        const res4Star = await request({
          url: '/hotel/list',
          method: 'GET',
          data: { city: cleanCity, limit: 3 - bannerList.length, star: 4 }
        })
        if (res4Star.code === 200 && res4Star.data?.list) {
          bannerList = [...bannerList, ...res4Star.data.list]
        }
      }
      
      // 如果还不足,获取所有已发布酒店补充
      if (bannerList.length < 3) {
        const resAll = await request({
          url: '/hotel/list',
          method: 'GET',
          data: { city: cleanCity, limit: 3 }
        })
        if (resAll.code === 200 && resAll.data?.list) {
          const existingIds = bannerList.map(h => h.id)
          const additional = resAll.data.list.filter(h => !existingIds.includes(h.id))
          bannerList = [...bannerList, ...additional].slice(0, 3)
        }
      }

      if (bannerList.length > 0) {
        const formatted = bannerList.map((item, index) => {
          const slogans = [
            { tag: '限时特惠', tagClass: '', title: `${item.name} · 春季大促`, subtitle: '奢华享受，超值体验' },
            { tag: '会员专享', tagClass: 'tag-premium', title: `${item.name} · 尊享升级`, subtitle: '白金会员免费升级豪华房型' },
            { tag: '闪购特价', tagClass: 'tag-flash', title: `${item.name} · 周末特惠`, subtitle: '限时抢购，手慢无' }
          ]
          return {
            id: item.id,
            // 修改为使用真实服务器地址，避免 localhost 在手机上无法访问
            image: item.cover_image?.startsWith('http') ? item.cover_image : `http://1.14.207.212:8848${item.cover_image}`,
            ...slogans[index % 3]
          }
        })
        setBannerHotels(formatted)
      }
    } catch (error) {
      console.error('获取Banner酒店失败:', error)
    }
  }

  // 获取城市统计数据
  const fetchCityStats = async () => {
    setLoadingCities(true)
    try {
      const res = await request({
        url: '/system/city-stats',
        method: 'GET'
      })
      if (res.code === 200 && res.data?.cities) {
        const formattedCities = res.data.cities.slice(0, 6).map((item, index) => ({
          id: index + 1,
          name: item.city,
          hotels: item.count
        }))
        setPopularCities(formattedCities)
      }
    } catch (error) {
      console.error('获取城市统计失败:', error)
    } finally {
      setLoadingCities(false)
    }
  }

  // 获取推荐酒店
  const fetchRecommendHotels = async (city) => {
    setLoadingRecommend(true)
    try {
      const cleanCity = city.replace(/市$/, '')
      const res = await request({
        url: '/hotel/list',
        method: 'GET',
        data: { city: cleanCity, limit: 4, sort: 'price_desc' }
      })
      if (res.code === 200 && res.data?.list) {
        const formatted = res.data.list.map(item => ({
          id: item.id,
          name: item.name,
          price: parseFloat(item.price),
          rating: item.score, // 只使用后端真实评分，没有就不显示
          reviews: item.reviews || 0, // 使用后端真实评价数
          image: item.cover_image?.startsWith('http') ? item.cover_image : `http://1.14.207.212:8848${item.cover_image}`,
          tags: Array.isArray(item.tags) ? item.tags.filter(t => !t.includes(':')).slice(0, 3) : []
        }))
        setRecommendHotels(formatted)
      }
    } catch (error) {
      console.error('获取推荐酒店失败:', error)
    } finally {
      setLoadingRecommend(false)
    }
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
  const useMyLocation = async () => {
    setLoading(true) // 开启加载状态
    try {
      // 1. 调用定位接口
      const res = await request({
        url: '/system/location',
        method: 'GET'
      })

      // 2. 处理返回结果
      if (res.code === 200 && res.data) {
        const { city, province } = res.data
        
        // 优先取 city，如果没有（某些直辖市情况）取 province
        const locationName = city || province || '上海市'

        // 3. 更新状态
        setCurrentCity(locationName)
        setSearchParams(prev => ({
          ...prev,
          city: locationName
        }))

        Taro.showToast({
          title: `已定位到: ${locationName}`,
          icon: 'success',
          duration: 1500
        })
      } else {
        throw new Error('定位解析失败')
      }
    } catch (err) {
      console.error('获取位置失败:', err)
      // request.js 里已经处理了通用报错，这里可以补充逻辑
      Taro.showToast({
        title: '定位失败，请手动选择',
        icon: 'none'
      })
    } finally {
      setLoading(false) // 关闭加载状态
    }
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
            {popularCities.map(city => (
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
          circular={bannerHotels.length >= 2}
          indicatorDots
          autoplay={bannerHotels.length >= 2}
          interval={4000}
        >
          {bannerHotels.length > 0 ? (
            bannerHotels.map((banner, index) => (
              <SwiperItem key={index}>
                <View
                  className="banner-item"
                  onClick={() => {
                    Taro.navigateTo({ 
                      url: `/pages/detail/index?id=${banner.id}&checkIn=${searchParams.checkInDate}&checkOut=${searchParams.checkOutDate}` 
                    })
                  }}
                >
                  <Image
                    className="banner-image"
                    src={banner.image}
                    mode="aspectFill"
                  />
                  <View className="banner-content">
                    <View className={`promotion-tag ${banner.tagClass}`}>
                      <Text className="tag-text">{banner.tag}</Text>
                    </View>
                    <Text className="banner-title">{banner.title}</Text>
                    <Text className="banner-subtitle">{banner.subtitle}</Text>
                  </View>
                </View>
              </SwiperItem>
            ))
          ) : (
            <SwiperItem>
              <View className="banner-item">
                <View style={{ height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5' }}>
                  <Text>加载中...</Text>
                </View>
              </View>
            </SwiperItem>
          )}
        </Swiper>



        {/* 搜索核心区域 - 取消负margin，避免覆盖banner */}
        <View className="search-section">
          <View className="search-card">
            {/* 位置选择 */}
            <View className="search-row location-row">

              <View
                className="location-left"
                onClick={() => setShowCityPicker(!showCityPicker)}
              >
                <Text className="location-label">位置: </Text>
                <Text className="location-value">{searchParams.city}</Text>
              </View>
              <View

                className="location-btn"
                onClick={useMyLocation}
              >
                <Text className="btn-icon">🎯</Text>
                <Text className="btn-text">我的位置</Text>
              </View>
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
              <Input
                className="search-input"
                placeholder="🔍 关键字/位置/品牌/酒店名"
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

            {/* 筛选行 */}
            <View
              className="search-row filter-row"
              onClick={() => {
                setTempFilter({ ...filterParams })
                setIsFilterVisible(true)
              }}
            >
              <View className="filter-left">
                <Text className="filter-icon">🏷️</Text> {/* 保持图标一致 */}
                <View className="filter-info">
                  <Text className="filter-label">价格/星级</Text>
                  <Text className={`filter-value ${(filterParams.price.value === 'all' && filterParams.star.value === 'all') ? 'placeholder' : ''}`}>
                    {filterParams.price.value === 'all' && filterParams.star.value === 'all'
                      ? '请选择价格/星级'
                      : `${filterParams.price.label} · ${filterParams.star.label}`}
                  </Text>
                </View>
              </View>
              <Text className="arrow-icon">›</Text>
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
                  <Text className="tag-label">{tag.label}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 推荐酒店 */}
        <View className="recent-section">
          <View className="section-header">
            <View className="section-title-wrapper">
              <Text className="section-title">为您推荐</Text>
              <Text className="section-badge">{recommendHotels.length}</Text>
            </View>
          </View>


          <ScrollView
            className="hotels-scroll"
            scrollX
            enhanced
            showScrollbar={false}
          >
            <View className="hotels-container">
              {loadingRecommend ? (
                <View style={{ padding: '20px', textAlign: 'center' }}>
                  <Text>加载中...</Text>
                </View>
              ) : recommendHotels.length > 0 ? (
                recommendHotels.map(hotel => (
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
                      {hotel.rating && (
                        <View className="hotel-rating">
                          <Text className="rating-value">★ {hotel.rating}</Text>
                          {hotel.reviews > 0 && (
                            <Text className="rating-reviews">({hotel.reviews}条评价)</Text>
                          )}
                        </View>
                      )}
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
                ))
              ) : (
                <View style={{ padding: '20px', textAlign: 'center' }}>
                  <Text>暂无推荐酒店</Text>
                </View>
              )}
           </View>
          </ScrollView>
        </View>
        {/* 底部留白 */}
        <View className="bottom-spacing"></View>
      </ScrollView>

      {/* ========================================== */}
      {/* 2. AI 悬浮球核心位置：放在 ScrollView 外部 */}
      {/* 这样它会相对于屏幕固定（fixed），不会随页面滚动消失 */}
      <AiFloatBall />
      {/* ========================================== */}

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
    className="home-calendar-wrapper" // 关键：添加这个类名用于 CSS 隔离
    type="range"
    startDate={dayjs().format('YYYY-MM-DD')}
    endDate={dayjs().add(12, 'month').format('YYYY-MM-DD')}
    onClose={() => setIsCalendarVisible(false)}
    onConfirm={handleConfirmDate}
    showConfirm={true}
    poppable={true}
    position="bottom"
    round
    closeable
    // safeAreaInsetBottom // 建议注释掉，我们在 CSS 中精确控制
    style={{
      height: '85%', // 统一设为 85%
      '--nutui-calendar-confirm-btn-height': '72px',
    }}
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
              {popularCities.map(city => (

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
    </View>
  )
}