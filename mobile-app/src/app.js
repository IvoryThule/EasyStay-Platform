import { useLaunch } from '@tarojs/taro'
import './app.scss'

function App({ children }) {
  useLaunch(() => {
    // H5 子路径部署兼容：历史链接 #/pages/... 自动转换为 #/mobile/pages/...
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/mobile')) {
      const { hash } = window.location
      if (hash.startsWith('#/pages/')) {
        window.location.hash = `#/mobile/${hash.slice(2)}`
        return
      }
    }

    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}

export default App
