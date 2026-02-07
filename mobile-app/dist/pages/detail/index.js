"use strict";
const taro = require("../../taro.js");
require("../../babelHelpers.js");
const index = "";
function Page$1() {
  taro.taroExports.useLoad(() => {
    console.log("Page loaded.");
  });
  return /* @__PURE__ */ taro.jsx(taro.View, { className: "index", children: /* @__PURE__ */ taro.jsx(taro.Text, { children: "Page Content" }) });
}
var config = {
  "navigationBarTitleText": "Page",
  "usingComponents": {
    "comp": "../../comp"
  }
};
Page(taro.createPageConfig(Page$1, "pages/detail/index", { root: { cn: [] } }, config || {}));
//# sourceMappingURL=index.js.map
