// src/pages/detail/index.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import { useRouter } from '@tarojs/taro'; // 引入 useRouter 钩子
import Taro from '@tarojs/taro';
import './index.scss';

const HotelDetail = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hotelInfo, setHotelInfo] = useState(null);
  const [rooms, setRooms] = useState([]);

  // 页面加载时执行
  useEffect(() => {
    const { id } = router.params;
    if (id) {
      fetchHotelDetail(id);
    }
  }, [router.params]);

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

  const handleBack = () => Taro.navigateBack();

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

        {/* 4. 日历卡片 */}
        <View className='calendar-bar'>
          <View className='inner'>
            <View className='date-item'>
              <View className='label'>入住</View>
              <View className='date'>2月7日</View>
            </View>
            <View className='night-count'>1晚</View>
            <View className='date-item' style={{textAlign: 'right'}}>
              <View className='label'>离店</View>
              <View className='date'>2月8日</View>
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
    </View>
  );
};

export default HotelDetail;