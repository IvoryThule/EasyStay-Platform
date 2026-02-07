export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/list/index',
    'pages/detail/index',
    'pages/login/index',
    'pages/user/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'EasyStay',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
      custom: true,
      color: '#666',
      selectedColor: '#ed6c00',
      backgroundColor: '#fafafa',
      borderStyle: 'black',
      
      list: [{
      pagePath: 'pages/index/index',
      text: '首页'
    }, {
      pagePath: 'pages/list/index',
      text: '目的地'
    }, {
      pagePath: 'pages/login/index',
      text: '订单'
    },{
      pagePath: 'pages/user/index',
      text: '我的'
    }]
  }
})
