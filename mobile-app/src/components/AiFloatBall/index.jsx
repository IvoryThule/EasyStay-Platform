import React from 'react';
import { View } from '@tarojs/components';
import { FaRobot } from 'react-icons/fa';
import Taro from '@tarojs/taro';
import './index.scss';

export default function AiFloatBall() {
  const handleOpenChat = () => {
    Taro.navigateTo({ url: '/pages/ai-chat/index' });
  };

  return (
    <View className="ai-float-ball" onClick={handleOpenChat}>
      <FaRobot size={24} color="#fff" />
    </View>
  );
}
