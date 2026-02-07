"use strict";
const taro = require("./taro.js");
require("./babelHelpers.js");
const app = "";
function App$1({
  children
}) {
  taro.taroExports.useLaunch(() => {
    console.log("App launched.");
  });
  return children;
}
var config = {
  "pages": [
    "pages/index/index",
    "pages/list/index",
    "pages/detail/index",
    "pages/login/index",
    "pages/user/index"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "EasyStay",
    "navigationBarTextStyle": "black"
  },
  "tabBar": {
    "color": "#999999",
    "selectedColor": "#2F86F6",
    "backgroundColor": "#ffffff",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "assets/tabbar/home.png",
        "selectedIconPath": "assets/tabbar/home-active.png"
      },
      {
        "pagePath": "pages/list/index",
        "text": "目的地",
        "iconPath": "assets/tabbar/map.png",
        "selectedIconPath": "assets/tabbar/map-active.png"
      },
      {
        "pagePath": "pages/login/index",
        "text": "订单",
        "iconPath": "assets/tabbar/order.png",
        "selectedIconPath": "assets/tabbar/order-active.png"
      },
      {
        "pagePath": "pages/user/index",
        "text": "我的",
        "iconPath": "assets/tabbar/user.png",
        "selectedIconPath": "assets/tabbar/user-active.png"
      }
    ]
  }
};
taro.taroWindowProvider.__taroAppConfig = config;
App(taro.createReactApp(App$1, taro.React, taro.index, config));
taro.taroExports.initPxTransform({
  designWidth: 750,
  deviceRatio: { "375": 2, "640": 1.17, "750": 1, "828": 0.905 }
});
//# sourceMappingURL=app.js.map
