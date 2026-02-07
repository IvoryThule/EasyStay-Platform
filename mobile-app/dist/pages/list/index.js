"use strict";
const taro = require("../../taro.js");
require("../../vendors.js");
require("../../common.js");
require("../../babelHelpers.js");
const index = "";
function Page$1() {
  taro.taroExports.useLoad(() => {
    console.log("Page loaded.");
  });
  return /* @__PURE__ */ taro.jsxs(taro.View, { className: "index", children: [
    /* @__PURE__ */ taro.jsx(taro.Text, { children: "Page Content" }),
    false
  ] });
}
var config = {
  "navigationBarTitleText": "易宿",
  "navigationBarBackgroundColor": "#3B82F6",
  "navigationBarTextStyle": "white",
  "usingComponents": {
    "comp": "../../comp"
  },
  "enablePullDownRefresh": false,
  "backgroundColor": "#F9FAFB",
  "onReachBottomDistance": 50,
  "componentGenerics": {}
};
Page(taro.createPageConfig(Page$1, "pages/list/index", { root: { cn: [] } }, config || {}));
//# sourceMappingURL=index.js.map
