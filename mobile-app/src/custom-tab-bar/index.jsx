import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { CoverView, CoverImage } from '@tarojs/components'
import { Home, Category, Order, User } from '@nutui/icons-react-taro'
import { RiOpenaiLine } from 'react-icons/ri'
import './index.scss'

const CustomTabBar = () => {
  const [selected, setSelected] = useState(0)
  // Standard Theme: Grey Inactive / Blue Active
  const [color] = useState('#999999') 
  const [selectedColor] = useState('#2F86F6') 
  
  const list = [
    {
      pagePath: '/pages/index/index',
      text: '首页',
      icon: Home
    },
    {
      pagePath: '/pages/list/index',
      text: '目的地',
      icon: Category
    },
    {
      key: 'ai',
      text: 'AI助手', 
      icon: null, 
      isSpecial: true
    },
    {
      pagePath: '/pages/login/index',
      text: '订单',
      icon: Order
    },
    {
      pagePath: '/pages/user/index',
      text: '我的',
      icon: User
    }
  ]

  const switchTab = (item, index) => {
    if (item.isSpecial) {
       Taro.navigateTo({ url: '/pages/detail/index' })
       return;
    }
    setSelected(index)
    Taro.switchTab({ url: item.pagePath })
  }

  useEffect(() => {
    const pages = Taro.getCurrentPages()
    if (pages.length > 0) {
      const route = pages[pages.length - 1].route
      const currentIndex = list.findIndex(item => 
        item.pagePath && item.pagePath.includes(route)
      )
      if (currentIndex !== -1) {
        setSelected(currentIndex)
      }
    }
  }, [list])

  return (
    <CoverView className='custom-tab-bar'>
      <CoverView className='tab-bar-container'>
        {list.map((item, index) => {
          const isSelected = selected === index
          const IconComponent = item.icon
          
          if (item.isSpecial) {
             return (
               <CoverView
                 className='tab-bar-item special-item'
                 key={index}
                 onClick={() => switchTab(item, index)}
               >
                 <CoverView className='special-bg'>
                    <RiOpenaiLine size={32} color="#2F86F6" />
                 </CoverView>
                 <CoverView className='tab-bar-text' style={{ color: isSelected ? selectedColor : color }}>
                    {item.text}
                 </CoverView>
               </CoverView>
             )
          }

          return (
            <CoverView
              className={`tab-bar-item ${isSelected ? 'active' : ''}`}
              key={index}
              onClick={() => switchTab(item, index)}
            >
               <CoverView className='icon-box'>
                  <IconComponent 
                      className='nut-icon'
                      color={isSelected ? selectedColor : color} 
                      width={20}
                      height={20}
                  />
              </CoverView>
              <CoverView className='tab-bar-text' style={{ color: isSelected ? selectedColor : color }}>
                {item.text}
              </CoverView>
            </CoverView>
          )
        })}
      </CoverView>
    </CoverView>
  )
}

CustomTabBar.options = {
  addGlobalClass: true
}

export default CustomTabBar
