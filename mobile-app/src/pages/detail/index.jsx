// src/pages/detail/index.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import { useRouter } from '@tarojs/taro'; // 引入 useRouter 钩子
import Taro from '@tarojs/taro';
import { Calendar } from '@nutui/nutui-react-taro';
import './index.scss';

const HotelDetail = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hotelInfo, setHotelInfo] = useState(null);
  const [rooms, setRooms] = useState([]);

  // 【新增】日期相关状态
  const [isVisible, setIsVisible] = useState(false); // 控制日历显示
  const [dateRange, setDateRange] = useState({
    checkIn: '',
    checkOut: '',
    nightCount: 1
  });

  // 【核心修复】更加健壮的日期计算函数
  const calculateNights = (start, end) => {
    const currentYear = new Date().getFullYear();
    const todayStr = `${currentYear}/${new Date().getMonth() + 1}/${new Date().getDate()}`;

    const formatToStandard = (dateStr) => {
      // 1. 防御：如果 dateStr 是 undefined 或不是字符串，返回今天
      if (!dateStr || typeof dateStr !== 'string' || !dateStr.includes('月')) {
        return todayStr;
      }

      try {
        const cleanStr = dateStr.replace('月', '/').replace('日', '').trim();
        const parts = cleanStr.split('/');
        
        // 2. 防御：确保 split 后的结果符合预期
        if (parts.length < 2) return todayStr;

        const m = parts[0].padStart(2, '0');
        const d = parts[1].padStart(2, '0');
        return `${currentYear}/${m}/${d}`;
      } catch (e) {
        return todayStr;
      }
    };

    const sDate = new Date(formatToStandard(start));
    const eDate = new Date(formatToStandard(end));

    if (isNaN(sDate.getTime()) || isNaN(eDate.getTime())) return 1;

    const diff = Math.ceil((eDate - sDate) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  useEffect(() => {
    // 获取参数
    const { id, checkIn, checkOut } = router.params;
    
    // 初始化日期逻辑：带默认值兜底
    const cIn = checkIn ? decodeURIComponent(checkIn) : '2月7日';
    const cOut = checkOut ? decodeURIComponent(checkOut) : '2月8日';
    
    setDateRange({
      checkIn: cIn,
      checkOut: cOut,
      nightCount: calculateNights(cIn, cOut)
    });

    // 获取酒店数据
    const hotelId = id || '0-0'; // 兜底 ID
    fetchHotelDetail(hotelId);
  }, [router.params]);

  const onSelectDate = (param) => {
    const [start, end] = param;
    // NutUI 返回的是数组 ["2026", "02", "07"]
    const checkIn = `${parseInt(start[1])}月${parseInt(start[2])}日`;
    const checkOut = `${parseInt(end[1])}月${parseInt(end[2])}日`;
    
    setDateRange({
      checkIn,
      checkOut,
      nightCount: calculateNights(checkIn, checkOut)
    });
    setIsVisible(false);
  };

  // 模拟 API 请求函数
  const fetchHotelDetail = async (id) => {
    setLoading(true);
    try {
      // 实际开发时替换为: const res = await Taro.request({ url: `YOUR_API/${id}` });
      // 这里模拟返回数据
      setTimeout(() => {
        const mockData = {
          baseInfo: {
            id: id,
            name: id === '0-0' ? '上海陆家嘴禧玥酒店' : '模拟连锁酒店',
            score: '4.8',
            scoreDesc: '“中式风格，舒适”',
            stars: 5,
            address: '浦东新区浦明路868弄3号楼 (近世博园区, 距离14号线陆家嘴站步行约1.2km)',
            images: [
              'https://modao.cc/agent-py/media/generated_images/2026-02-04/354e4c83e3b445bba8a31a4d2d7c0700.jpg',
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'
            ],
            facilities: [
              { id: 1, name: '免费停车', icon: 'parking' },
              { id: 2, name: '健身房', icon: 'gym' },
              { id: 3, name: '餐厅', icon: 'restaurant' }
            ]
          },
          roomList: [
            { id: 101, name: '高级大床房', desc: '35m² | 大床 | 不含早', price: 880, img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=200' },
            { id: 102, name: '经典双床房', desc: '40m² | 2张1.2米床 | 含双早', price: 936, img: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=200' },
            { id: 103, name: '禧玥江景套房', desc: '65m² | 特大床 | 行政礼遇', price: 1580, img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200' }
          ]
        };

        setHotelInfo(mockData.baseInfo);
        // 关键逻辑：对房型按价格从低到高排序
        setRooms(mockData.roomList.sort((a, b) => a.price - b.price));
        setLoading(false);
      }, 600);
    } catch (error) {
      Taro.showToast({ title: '数据加载失败', icon: 'none' });
    }
  };

  const handleBack = () => {
  const pages = Taro.getCurrentPages(); // 获取当前页面栈
  
  if (pages.length > 1) {
    // 如果页面栈大于 1，说明有上一页，正常回退
    Taro.navigateBack();
  } else {
    // 如果是直接刷新进入的，没有上一页，则强制跳转回列表页
    // 注意：如果你的 list 页面在 tabBar 中，请使用 switchTab
    Taro.switchTab({
      url: '/pages/list/index' 
    }).catch(() => {
      // 如果 list 不是 tabBar 页面，则使用 reLaunch 或 navigateTo
      Taro.reLaunch({
        url: '/pages/list/index'
      });
    });
  }
};
  if (loading) {
    return (
      <View className='loading-container'>
        <Text>正在加载酒店详情...</Text>
      </View>
    );
  }

  return (
    <View className='detail-page'>
      {/* 1. 顶部导航 */}
      <View className='custom-nav'>
        <View className='back-icon' onClick={handleBack}>←</View>
        <Text className='nav-title'>{hotelInfo?.name}</Text>
      </View>

      <ScrollView scrollY className='scroll-content' style={{ height: '100vh' }}>
        {/* 2. 大图 Banner */}
        <Swiper className='banner-swiper' circular indicatorDots indicatorActiveColor='#2563eb'>
          {hotelInfo?.images.map((img, index) => (
            <SwiperItem key={index}>
              <Image src={img} mode='aspectFill' className='banner-image' />
            </SwiperItem>
          ))}
        </Swiper>

        {/* 3. 酒店基础信息 */}
        <View className='info-card'>
          <View className='header-row'>
            <View className='name'>{hotelInfo?.name}</View>
            <View className='score-box'>
              <View className='score'>{hotelInfo?.score}分</View>
              <Text className='score-desc'>{hotelInfo?.scoreDesc}</Text>
            </View>
          </View>
          
          <View className='stars'>
            {'●'.repeat(hotelInfo?.stars || 0)} 
            <Text style={{color:'#999', fontSize:'22rpx', marginLeft:'10rpx'}}>高档型酒店</Text>
          </View>

          <ScrollView scrollX className='facility-scroll'>
            {hotelInfo?.facilities.map(f => (
              <View key={f.id} className='facility-item'>
                <View className='at-icon'>◈</View>
                <Text className='f-name'>{f.name}</Text>
              </View>
            ))}
          </ScrollView>

          <View className='address-bar'>
            <Text className='addr-icon'>📍</Text>
            <Text>{hotelInfo?.address}</Text>
          </View>
        </View>

        {/* 【修改】日历卡片：增加点击事件 */}
        <View className='calendar-bar' onClick={() => setIsVisible(true)}>
          <View className='inner'>
            <View className='date-item'>
              <View className='label'>入住</View>
              <View className='date'>{dateRange.checkIn || '选择日期'}</View>
            </View>
            <View className='night-count'>{dateRange.nightCount}晚</View>
            <View className='date-item' style={{ textAlign: 'right' }}>
              <View className='label'>离店</View>
              <View className='date'>{dateRange.checkOut || '选择日期'}</View>
            </View>
          </View>
        </View>

        {/* 5. 动态房型列表 */}
        <View className='room-list'>
          {rooms.map(room => (
            <View key={room.id} className='room-card'>
              <Image src={room.img} className='room-img' mode='aspectFill' />
              <View className='room-info'>
                <View>
                  <View className='r-name'>{room.name}</View>
                  <View className='r-desc'>{room.desc}</View>
                </View>
                <View className='r-bottom'>
                  <View className='price'>
                    ¥{room.price}<Text className='unit'>起</Text>
                  </View>
                  <View className='btn-book' onClick={() => Taro.showToast({title: '进入预订流程'})}>预订</View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 【新增】NutUI 日历组件 */}
      <Calendar
        visible={isVisible}
        type="range"
        startDate="2026-02-07" // 建议使用动态当前日期
        endDate="2026-05-07"
        onClose={() => setIsVisible(false)}
        onConfirm={onSelectDate}
      />

    </View>
  );
};

export default HotelDetail;