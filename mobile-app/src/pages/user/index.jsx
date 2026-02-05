import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import CustomTabBar from '../../custom-tab-bar'
import './index.scss'

export default function Page() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text>我的内容</Text>
      <CustomTabBar currentIndex={4} />
    </View>
  )
}
