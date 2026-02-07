// [组件] 酒店列表卡片逻辑
// 待实现。
import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import './index.scss'; 

const HotelCard = ({ data, onClick }) => {
  if (!data) return null;

  return (
    <View className="hotel-card" onClick={onClick}>
      <View className="hotel-card__media">
        <Image src={data.imageUrl} className="hotel-card__img" mode="aspectFill" />
      </View>
      
      <View className="hotel-card__content">
        <Text className="hotel-card__name">{data.name}</Text>
        
        <View className="hotel-card__stats">
           <Text className="score">{data.score}分</Text>
           <Text className="desc">{data.scoreDesc}</Text>
           <Text className="comment">{data.commentCount}点评</Text>
        </View>

        <Text className="hotel-card__location">{data.locationDesc}</Text>

        <View className="hotel-card__tags">
          {data.tags && data.tags.map((tag, i) => (
             <Text key={i} className="tag">{tag}</Text>
          ))}
        </View>

        <View className="hotel-card__footer">
           <View className="price-box">
             <Text className="currency">¥</Text>
             <Text className="price">{data.price}</Text>
             <Text className="suffix">起</Text>
           </View>
        </View>
      </View>
    </View>
  );
};

export default HotelCard;