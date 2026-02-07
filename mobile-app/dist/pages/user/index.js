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
    /* @__PURE__ */ taro.jsx(taro.Text, { children: "我的内容" }),
    false
  ] });
}
var config = {
  "usingComponents": {
    "comp": "../../comp"
  }
};
Page(taro.createPageConfig(Page$1, "pages/user/index", { root: { cn: [] } }, config || {}));
//# sourceMappingURL=index.js.map
