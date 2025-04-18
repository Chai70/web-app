export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/market/index',
    'pages/create/index',
    'pages/mine/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#1296db',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/tabbar/home.png',
        selectedIconPath: 'assets/tabbar/home-active.png'
      },
      {
        pagePath: 'pages/market/index',
        text: '市场',
        iconPath: 'assets/tabbar/market.png',
        selectedIconPath: 'assets/tabbar/market-active.png'
      },
      {
        pagePath: 'pages/create/index',
        text: '创建',
        iconPath: 'assets/tabbar/create.png',
        selectedIconPath: 'assets/tabbar/create-active.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/tabbar/mine.png',
        selectedIconPath: 'assets/tabbar/mine-active.png'
      }
    ]
  }
})
