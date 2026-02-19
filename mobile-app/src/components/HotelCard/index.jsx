// [组件] 酒店列表卡片逻辑
// 待实现。
import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import './index.scss'; 

const HotelCard = ({ data, onClick }) => {
  if (!data) return null;

  return (
    <View className="hotel-card" onClick={onClick}>
      {/* 左侧图片区域 */}
      <View className="hotel-card__media">
        <Image src={data.imageUrl} className="hotel-card__img" mode="aspectFill" />
        {/* 模拟右下角播放图标 */}
        <View className="video-badge">
          <Text className="icon">▶</Text>
        </View>
      </View>
      
      {/* 右侧内容区域 */}
      <View className="hotel-card__content">
        <View>
          {/* 标题与星级 */}
          <View className="hotel-card__title-row">
            <Text className="hotel-card__name">{data.name}</Text>
            <Text className="hotel-card__diamonds"> ●●●●●</Text>
          </View>
          
          {/* 评分与评论 */}
          {data.score && (
            <View className="hotel-card__stats">
              <View className="score-badge">
                <Text className="score-num">{data.score}</Text>
                <Text className="score-text">{data.scoreDesc || '好评'}</Text>
              </View>
              {data.commentCount > 0 && (
                <Text className="comment-text">
                  {data.commentCount}点评{data.collectionCount ? ` · ${Math.floor(data.collectionCount / 10000)}万收藏` : ''}
                </Text>
              )}
            </View>
          )}

          {/* 位置与推荐语 */}
          <Text className="hotel-card__location">{data.locationDesc}</Text>
          {/* 模拟 BOSS 推荐语 */}
          <View className="hotel-card__highlight">
            <Text className="highlight-content">BOSS:25楼是沪上知名米其林新荣记</Text>
          </View>

          {/* 标签组 */}
          <View className="hotel-card__tags">
            {data.tags && data.tags.map((tag, i) => (
               <View key={i} className={`tag-item ${i === 0 ? 'tag-blue' : ''}`}>
                 <Text className="tag-text">{tag}</Text>
               </View>
            ))}
          </View>

          {/* 榜单信息 */}
          {data.ranking && (
            <View className="hotel-card__ranking">
              <Text className="rank-icon">🏆</Text>
              <Text className="rank-text">{data.ranking.text}</Text>
            </View>
          )}
        </View>

        {/* 价格底部 */}
        <View className="hotel-card__footer">
           <Text className="promo-text">钻石贵宾价 &gt;</Text>
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