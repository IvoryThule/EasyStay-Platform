// src/pages/detail/index.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import { useRouter } from '@tarojs/taro'; // 引入 useRouter 钩子
import Taro from '@tarojs/taro';
import { Calendar } from '@nutui/nutui-react-taro';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import './index.scss';
import request from '../../utils/request';

const HotelDetail = () => {
   const router = useRouter();
   const [loading, setLoading] = useState(true);
   const [hotelInfo, setHotelInfo] = useState(null);
 const [rooms, setRooms] = useState([]);

 // 图片地址前缀 (针对本地服务器)
 const IMAGE_HOST = 'http://localhost:3000';

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
  const { id, checkIn, checkOut } = router.params;
  
  // 初始化日期逻辑 ( decodeURIComponent 处理中文/特殊字符)
  const cIn = checkIn ? decodeURIComponent(checkIn) : dayjs().format('M月D日');
  const cOut = checkOut ? decodeURIComponent(checkOut) : dayjs().add(1, 'day').format('M月D日');
  
  setDateRange({
   checkIn: cIn,
   checkOut: cOut,
   nightCount: calculateNights(cIn, cOut)
  });

  if (id) {
   fetchHotelData(id);
  }
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

 // --- 【关键修改】接入真实 API ---
 const fetchHotelData = async (id) => {
  setLoading(true);
  try {
   // 1. 获取酒店详情 (API 2.3)
   const hotelRes = await request({ url: `/hotel/detail/${id}` });
   
   // 2. 获取房型列表 (API 2.6)
   const roomRes = await request({ 
    url: '/hotel/roomtype/list', 
    data: { hotel_id: id } 
   });

   if (hotelRes.code === 200 && hotelRes.data) {
    const info = hotelRes.data;
    // 处理图片数组
    let displayImages = [];
    // --- 核心修复：确保 displayImages 永远是一个数组 ---
    let imgs = [];
    if (info.images) {
     try {
      const parsed = typeof info.images === 'string' ? JSON.parse(info.images) : info.images;
      imgs = Array.isArray(parsed) ? parsed : [];
     } catch (e) { imgs = []; }
    }

    setHotelInfo({
     ...info,
     displayImages: imgs.map(url => url.startsWith('http') ? url : `${IMAGE_HOST}${url}`),
     // --- 核心修复：确保 facilities 永远是一个数组 ---
     displayFacilities: info.facilities ? (typeof info.facilities === 'string' ? JSON.parse(info.facilities) : info.facilities) : []
    });
   }

   if (roomRes.code === 200 && Array.isArray(roomRes.data)) {
    setRooms(roomRes.data);
   }
  } catch (error) {
   Taro.showToast({ title: '获取详情失败', icon: 'none' });
  } finally {
   setLoading(false);
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
   <View className='custom-nav'>
    <View className='back-icon' onClick={handleBack}>←</View>
    <Text className='nav-title'>{hotelInfo?.name || '酒店详情'}</Text>
   </View>

   <ScrollView scrollY className='scroll-content' style={{ height: '100vh' }}>
    {/* 修复点 1：使用可选链 + 空数组兜底 */}
    <View className='banner-area'>
     {hotelInfo?.displayImages && hotelInfo.displayImages.length > 0 ? (
      <Swiper className='banner-swiper' circular indicatorDots indicatorActiveColor='#2563eb'>
       {hotelInfo.displayImages.map((img, index) => (
        <SwiperItem key={index}>
         <Image src={img} mode='aspectFill' className='banner-image' />
        </SwiperItem>
       ))}
      </Swiper>
     ) : (
      <View className='no-img'>暂无图片</View>
     )}
    </View>

    <View className='info-card'>
     <Text className='name'>{hotelInfo?.name}</Text>
     <View className='address-bar'>📍 {hotelInfo?.address}</View>

     {/* 修复点 2：设施列表 map 保护 */}
     <ScrollView scrollX className='facility-scroll'>
      {(hotelInfo?.displayFacilities || []).map((f, idx) => (
       <View key={idx} className='facility-item'>
        <Text className='f-name'>{typeof f === 'string' ? f : f.name}</Text>
       </View>
      ))}
     </ScrollView>
    </View>

    <View className='calendar-bar' onClick={() => setIsVisible(true)}>
     <View className='inner'>
      <View className='date-item'><View className='date'>{dateRange.checkIn}</View></View>
      <View className='night-count'>{dateRange.nightCount}晚</View>
      <View className='date-item'><View className='date'>{dateRange.checkOut}</View></View>
     </View>
    </View>

    {/* 修复点 3：房型列表 map 保护 */}
    <View className='room-list'>
     {(rooms || []).map(room => (
      <View key={room.id} className='room-card'>
       <Image 
        src={room.image ? (room.image.startsWith('http') ? room.image : `${IMAGE_HOST}${room.image}`) : ''} 
        className='room-img' 
        mode='aspectFill' 
       />
       <View className='room-info'>
        <Text className='r-name'>{room.name}</Text>
        <View className='r-bottom'>
         <Text className='price'>¥{parseFloat(room.price).toFixed(0)}</Text>
         <View className='btn-book' onClick={() => Taro.showToast({title:'预订中'})}>预订</View>
        </View>
       </View>
      </View>
     ))}
    </View>
   </ScrollView>

   <Calendar visible={isVisible} type="range" onClose={() => setIsVisible(false)} onConfirm={(p) => {
    const cIn = `${parseInt(p[0][1])}月${parseInt(p[0][2])}日`;
    const cOut = `${parseInt(p[1][1])}月${parseInt(p[1][2])}日`;
    setDateRange({ checkIn: cIn, checkOut: cOut, nightCount: calculateNights(cIn, cOut) });
    setIsVisible(false);
   }} />
  </View>
 );
};

export default HotelDetail;