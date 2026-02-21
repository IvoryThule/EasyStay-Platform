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
 const [bookingRoomId, setBookingRoomId] = useState(null);

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

 const formatDisplayDateToISO = (displayDate, defaultOffset = 0) => {
  const fallback = dayjs().add(defaultOffset, 'day').format('YYYY-MM-DD');
  if (!displayDate || typeof displayDate !== 'string') return fallback;

  const matched = displayDate.match(/(\d{1,2})月(\d{1,2})日/);
  if (!matched) return fallback;

  const year = dayjs().year();
  const month = matched[1].padStart(2, '0');
  const day = matched[2].padStart(2, '0');
  return dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD');
 };

 const handleCreateOrder = async (room) => {
  const token = Taro.getStorageSync('token');
  if (!token) {
   Taro.navigateTo({ url: '/pages/login/index?redirect=/pages/order/index' });
   return;
  }

  if (!hotelInfo?.id || !room?.id) {
   Taro.showToast({ title: '下单参数异常', icon: 'none' });
   return;
  }

  setBookingRoomId(room.id);
  try {
   const res = await request({
    url: '/order/create',
    method: 'POST',
    data: {
     hotel_id: hotelInfo.id,
     room_type_id: room.id,
     check_in: formatDisplayDateToISO(dateRange.checkIn, 0),
     check_out: formatDisplayDateToISO(dateRange.checkOut, 1)
    }
   });

   if (res.code === 200) {
    Taro.showToast({ title: '下单成功', icon: 'success' });
    Taro.switchTab({ url: '/pages/order/index' });
   } else {
    Taro.showToast({ title: res.msg || '下单失败', icon: 'none' });
   }
  } catch (error) {
   Taro.showToast({ title: error?.msg || '下单失败', icon: 'none' });
  } finally {
   setBookingRoomId(null);
  }
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
    
    // 优先使用 images 字段 (新表结构), 其次回退到 cover_image
    if (info.images) {
     try {
       // 如果数据库返回的是 JSON 对象/数组，直接使用
       // 如果是字符串，尝试解析
       const raw = info.images;
       const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
       if (Array.isArray(parsed) && parsed.length > 0) {
         displayImages = parsed;
       }
     } catch (e) {
       console.error('Parse images failed', e);
     }
    }
    
    // 如果没有 images 或解析失败，使用 cover_image
    if (displayImages.length === 0 && info.cover_image) {
      displayImages = [info.cover_image];
    }
    
    // 再次兜底
    if (displayImages.length === 0) {
        displayImages = ['https://dummyimage.com/750x400/cccccc/ffffff&text=No+Image'];
    }

    setHotelInfo({
     ...info,
     displayImages: displayImages.map(url => url.startsWith('http') ? url : `${IMAGE_HOST}${url}`),
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
      <Swiper className='banner-swiper' 
        circular 
        indicatorDots 
        indicatorActiveColor='#2563eb' 
        autoplay 
        interval={4000}
      >
       {hotelInfo.displayImages.map((img, index) => (
        <SwiperItem key={index}>
         <Image 
          src={img} 
          mode='aspectFill' 
          className='banner-image' 
          onClick={() => {
            // 点击查看大图
            Taro.previewImage({
              urls: hotelInfo.displayImages,
              current: img
            })
          }}
         />
        </SwiperItem>
       ))}
      </Swiper>
     ) : (
      <View className='no-img'>暂无图片</View>
     )}
    </View>    <View className='info-card'>
     <Text className='name'>{hotelInfo?.name}</Text>
     {/* 新增:星级显示 */}
     {hotelInfo?.star && (
       <View className='star-bar'>
         <Text className='star-text'>{'★'.repeat(hotelInfo.star)}</Text>
         <Text className='star-label'>{hotelInfo.star}星级酒店</Text>
       </View>
     )}
     <View className='address-bar'>位置: {hotelInfo?.address}</View>

     {/* 修复点 2：设施列表 map 保护 */}
     {hotelInfo?.displayFacilities && hotelInfo.displayFacilities.length > 0 && (
       <>
         <View className='section-title'>酒店设施</View>
         <ScrollView scrollX className='facility-scroll'>
           {hotelInfo.displayFacilities.map((f, idx) => (
             <View key={idx} className='facility-item'>
               <Text className='f-name'>{typeof f === 'string' ? f : f.name}</Text>
             </View>
           ))}
         </ScrollView>
       </>
     )}
    </View>

    <View className='calendar-bar' onClick={() => setIsVisible(true)}>
     <View className='inner'>
      <View className='date-item'><View className='date'>{dateRange.checkIn}</View></View>
      <View className='night-count'>{dateRange.nightCount}晚</View>
      <View className='date-item'><View className='date'>{dateRange.checkOut}</View></View>
     </View>
    </View>

     {/* 修复点 3：房型列表 map 保护 */}
     <View className='section-title' style={{padding: '0 30px', margin: '20px 0 10px'}}>预订房型</View>
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
         <View className='btn-book' onClick={() => handleCreateOrder(room)}>
          {bookingRoomId === room.id ? '预订中...' : '预订'}
         </View>
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
