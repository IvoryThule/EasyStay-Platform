import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import CustomTabBar from '../../custom-tab-bar'

export default function Page() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text>Page Content</Text>
      {process.env.TARO_ENV === 'h5' && <CustomTabBar />}
    </View>
  )
}
