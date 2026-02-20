import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

export default function AiFloatBall() {
  const handleOpenChat = () => {
    Taro.navigateTo({ url: '/pages/ai-chat/index' });
  };

  return (
    <View className="ai-float-ball" onClick={handleOpenChat}>
      <Text className="ai-float-ball__icon">🤖</Text>
    </View>
  );
}
