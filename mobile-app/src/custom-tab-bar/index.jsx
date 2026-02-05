import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { CoverView, CoverImage } from '@tarojs/components'
import './index.scss'

const CustomTabBar = () => {
  // 1. 使用 useState 管理状态
  const [selected, setSelected] = useState(0)
  const [color] = useState('#666')
  const [selectedColor] = useState('#e6c98a')
  
  const [list] = useState([
    {
      pagePath: '/pages/index/index',
      iconPath: '/assets/tabbar/home.png',
      selectedIconPath: '/assets/tabbar/home-active.png',
      text: '首页查询'
    },
    {
      pagePath: '/pages/list/index',
      iconPath: '/assets/tabbar/map.png',
      selectedIconPath: '/assets/tabbar/map-active.png',
      text: '目的地'
    },
    {
      pagePath: '/pages/login/index',
      iconPath: '/assets/tabbar/order.png',
      selectedIconPath: '/assets/tabbar/order-active.png',
      text: '订单'
    },
    {
      pagePath: '/pages/user/index',
      iconPath: '/assets/tabbar/user.png',
      selectedIconPath: '/assets/tabbar/user-active.png',
      text: '我的'
    }
  ])

  // 2. 切换 Tab 逻辑
  const switchTab = (item, index) => {
    // 微信小程序自定义 TabBar 的规范建议在跳转前更新本地状态
    setSelected(index)
    Taro.switchTab({ url: item.pagePath })
  }

  // 3. 跳转到 AI 页面
  const jumpIntellect = () => {
    Taro.navigateTo({ url: '/pages/detail/index' })
  }

  // 4. 使用标准 useEffect 处理初始路由同步（替代生命周期）
  useEffect(() => {
    const pages = Taro.getCurrentPages()
    if (pages.length > 0) {
      const route = pages[pages.length - 1].route
      const currentIndex = list.findIndex(item => 
        item.pagePath.includes(route)
      )
      if (currentIndex !== -1) {
        setSelected(currentIndex)
      }
    }
  }, [list])

  return (
    <CoverView className='custom-tab-bar'>
      <CoverView className='tab-bar-wrap'>
        {list.map((item, index) => (
          <CoverView
            className={`tab-bar-item ${selected === index ? 'active' : ''}`}
            key={item.text}
            onClick={() => switchTab(item, index)}
          >
            <CoverImage
              className='tab-bar-icon'
              src={selected === index ? item.selectedIconPath : item.iconPath}
            />
            <CoverView
              className='tab-bar-text'
              style={{ color: selected === index ? selectedColor : color }}
            >
              {item.text}
            </CoverView>
          </CoverView>
        ))}
      </CoverView>
      
      {/* AI 悬浮按钮 */}
      <CoverImage
        className='ai-float-btn'
        src='/assets/tabbar/ai.png'
        onClick={jumpIntellect}
      />
    </CoverView>
  )
}

// 5. 组件配置：直接挂载到函数对象上
CustomTabBar.options = {
  addGlobalClass: true,
  styleIsolation: 'apply-shared'
}

export default CustomTabBar