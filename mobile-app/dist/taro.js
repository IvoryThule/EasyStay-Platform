"use strict";
const babelHelpers = require("./babelHelpers.js");
function _mergeNamespaces(n2, m2) {
  for (var i = 0; i < m2.length; i++) {
    const e = m2[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k2 in e) {
        if (k2 !== "default" && !(k2 in n2)) {
          const d = Object.getOwnPropertyDescriptor(e, k2);
          if (d) {
            Object.defineProperty(n2, k2, d.get ? d : {
              enumerable: true,
              get: () => e[k2]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
const DEFAULT_EMPTY_ARRAY = "[]";
const NO_DEFAULT_VALUE = "";
const DEFAULT_TRUE = "!0";
const DEFAULT_FALSE = "!1";
const touchEvents = {
  bindTouchStart: NO_DEFAULT_VALUE,
  bindTouchMove: NO_DEFAULT_VALUE,
  bindTouchEnd: NO_DEFAULT_VALUE,
  bindTouchCancel: NO_DEFAULT_VALUE,
  bindLongTap: NO_DEFAULT_VALUE
};
const animation = {
  animation: NO_DEFAULT_VALUE,
  bindAnimationStart: NO_DEFAULT_VALUE,
  bindAnimationIteration: NO_DEFAULT_VALUE,
  bindAnimationEnd: NO_DEFAULT_VALUE,
  bindTransitionEnd: NO_DEFAULT_VALUE
};
function singleQuote(s) {
  return `'${s}'`;
}
const View$1 = Object.assign(Object.assign({
  "hover-class": singleQuote("none"),
  "hover-stop-propagation": DEFAULT_FALSE,
  "hover-start-time": "50",
  "hover-stay-time": "400"
}, touchEvents), animation);
const Icon = {
  type: NO_DEFAULT_VALUE,
  size: "23",
  color: NO_DEFAULT_VALUE
};
const MapComp = Object.assign({
  longitude: NO_DEFAULT_VALUE,
  latitude: NO_DEFAULT_VALUE,
  scale: "16",
  markers: DEFAULT_EMPTY_ARRAY,
  covers: NO_DEFAULT_VALUE,
  polyline: DEFAULT_EMPTY_ARRAY,
  circles: DEFAULT_EMPTY_ARRAY,
  controls: DEFAULT_EMPTY_ARRAY,
  "include-points": DEFAULT_EMPTY_ARRAY,
  "show-location": NO_DEFAULT_VALUE,
  "layer-style": "1",
  bindMarkerTap: NO_DEFAULT_VALUE,
  bindControlTap: NO_DEFAULT_VALUE,
  bindCalloutTap: NO_DEFAULT_VALUE,
  bindUpdated: NO_DEFAULT_VALUE
}, touchEvents);
const Progress = {
  percent: NO_DEFAULT_VALUE,
  "stroke-width": "6",
  color: singleQuote("#09BB07"),
  activeColor: singleQuote("#09BB07"),
  backgroundColor: singleQuote("#EBEBEB"),
  active: DEFAULT_FALSE,
  "active-mode": singleQuote("backwards"),
  "show-info": DEFAULT_FALSE
};
const RichText = {
  nodes: DEFAULT_EMPTY_ARRAY
};
const Text$1 = Object.assign({
  selectable: DEFAULT_FALSE,
  space: NO_DEFAULT_VALUE,
  decode: DEFAULT_FALSE
}, touchEvents);
const Button$1 = Object.assign({
  size: singleQuote("default"),
  type: NO_DEFAULT_VALUE,
  plain: DEFAULT_FALSE,
  disabled: NO_DEFAULT_VALUE,
  loading: DEFAULT_FALSE,
  "form-type": NO_DEFAULT_VALUE,
  "open-type": NO_DEFAULT_VALUE,
  "hover-class": singleQuote("button-hover"),
  "hover-stop-propagation": DEFAULT_FALSE,
  "hover-start-time": "20",
  "hover-stay-time": "70",
  name: NO_DEFAULT_VALUE,
  bindagreeprivacyauthorization: NO_DEFAULT_VALUE
}, touchEvents);
const Checkbox = {
  value: NO_DEFAULT_VALUE,
  disabled: NO_DEFAULT_VALUE,
  checked: DEFAULT_FALSE,
  color: singleQuote("#09BB07"),
  name: NO_DEFAULT_VALUE
};
const CheckboxGroup = {
  bindChange: NO_DEFAULT_VALUE,
  name: NO_DEFAULT_VALUE
};
const Form = {
  "report-submit": DEFAULT_FALSE,
  bindSubmit: NO_DEFAULT_VALUE,
  bindReset: NO_DEFAULT_VALUE,
  name: NO_DEFAULT_VALUE
};
const Input$1 = {
  value: NO_DEFAULT_VALUE,
  type: singleQuote(NO_DEFAULT_VALUE),
  password: DEFAULT_FALSE,
  placeholder: NO_DEFAULT_VALUE,
  "placeholder-style": NO_DEFAULT_VALUE,
  "placeholder-class": singleQuote("input-placeholder"),
  disabled: NO_DEFAULT_VALUE,
  maxlength: "140",
  "cursor-spacing": "0",
  focus: DEFAULT_FALSE,
  "confirm-type": singleQuote("done"),
  "confirm-hold": DEFAULT_FALSE,
  cursor: "-1",
  "selection-start": "-1",
  "selection-end": "-1",
  bindInput: NO_DEFAULT_VALUE,
  bindFocus: NO_DEFAULT_VALUE,
  bindBlur: NO_DEFAULT_VALUE,
  bindConfirm: NO_DEFAULT_VALUE,
  name: NO_DEFAULT_VALUE
};
const Label = Object.assign({
  for: NO_DEFAULT_VALUE,
  name: NO_DEFAULT_VALUE
}, touchEvents);
const Picker = {
  mode: singleQuote("selector"),
  disabled: NO_DEFAULT_VALUE,
  range: NO_DEFAULT_VALUE,
  "range-key": NO_DEFAULT_VALUE,
  value: NO_DEFAULT_VALUE,
  start: NO_DEFAULT_VALUE,
  end: NO_DEFAULT_VALUE,
  fields: singleQuote("day"),
  "custom-item": NO_DEFAULT_VALUE,
  name: NO_DEFAULT_VALUE,
  bindCancel: NO_DEFAULT_VALUE,
  bindChange: NO_DEFAULT_VALUE,
  bindColumnChange: NO_DEFAULT_VALUE
};
const PickerView = {
  value: NO_DEFAULT_VALUE,
  "indicator-style": NO_DEFAULT_VALUE,
  "indicator-class": NO_DEFAULT_VALUE,
  "mask-style": NO_DEFAULT_VALUE,
  "mask-class": NO_DEFAULT_VALUE,
  bindChange: NO_DEFAULT_VALUE,
  name: NO_DEFAULT_VALUE
};
const PickerViewColumn = {
  name: NO_DEFAULT_VALUE
};
const Radio = {
  value: NO_DEFAULT_VALUE,
  checked: DEFAULT_FALSE,
  disabled: NO_DEFAULT_VALUE,
  color: singleQuote("#09BB07"),
  name: NO_DEFAULT_VALUE
};
const RadioGroup = {
  bindChange: NO_DEFAULT_VALUE,
  name: NO_DEFAULT_VALUE
};
const Slider = {
  min: "0",
  max: "100",
  step: "1",
  disabled: NO_DEFAULT_VALUE,
  value: "0",
  activeColor: singleQuote("#1aad19"),
  backgroundColor: singleQuote("#e9e9e9"),
  "block-size": "28",
  "block-color": singleQuote("#ffffff"),
  "show-value": DEFAULT_FALSE,
  bindChange: NO_DEFAULT_VALUE,
  bindChanging: NO_DEFAULT_VALUE,
  name: NO_DEFAULT_VALUE
};
const Switch = {
  checked: DEFAULT_FALSE,
  disabled: NO_DEFAULT_VALUE,
  type: singleQuote("switch"),
  color: singleQuote("#04BE02"),
  bindChange: NO_DEFAULT_VALUE,
  name: NO_DEFAULT_VALUE
};
const Textarea = {
  value: NO_DEFAULT_VALUE,
  placeholder: NO_DEFAULT_VALUE,
  "placeholder-style": NO_DEFAULT_VALUE,
  "placeholder-class": singleQuote("textarea-placeholder"),
  disabled: NO_DEFAULT_VALUE,
  maxlength: "140",
  "auto-focus": DEFAULT_FALSE,
  focus: DEFAULT_FALSE,
  "auto-height": DEFAULT_FALSE,
  fixed: DEFAULT_FALSE,
  "cursor-spacing": "0",
  cursor: "-1",
  "selection-start": "-1",
  "selection-end": "-1",
  bindFocus: NO_DEFAULT_VALUE,
  bindBlur: NO_DEFAULT_VALUE,
  bindLineChange: NO_DEFAULT_VALUE,
  bindInput: NO_DEFAULT_VALUE,
  bindConfirm: NO_DEFAULT_VALUE,
  name: NO_DEFAULT_VALUE
};
const CoverImage = {
  src: NO_DEFAULT_VALUE,
  bindLoad: "eh",
  bindError: "eh"
};
const CoverView = Object.assign({
  "scroll-top": DEFAULT_FALSE
}, touchEvents);
const MovableArea = {
  "scale-area": DEFAULT_FALSE
};
const MovableView = Object.assign(Object.assign({
  direction: "none",
  inertia: DEFAULT_FALSE,
  "out-of-bounds": DEFAULT_FALSE,
  x: NO_DEFAULT_VALUE,
  y: NO_DEFAULT_VALUE,
  damping: "20",
  friction: "2",
  disabled: NO_DEFAULT_VALUE,
  scale: DEFAULT_FALSE,
  "scale-min": "0.5",
  "scale-max": "10",
  "scale-value": "1",
  bindChange: NO_DEFAULT_VALUE,
  bindScale: NO_DEFAULT_VALUE,
  bindHTouchMove: NO_DEFAULT_VALUE,
  bindVTouchMove: NO_DEFAULT_VALUE,
  width: singleQuote("10px"),
  height: singleQuote("10px")
}, touchEvents), animation);
const ScrollView$1 = Object.assign(Object.assign({
  "scroll-x": DEFAULT_FALSE,
  "scroll-y": DEFAULT_FALSE,
  "upper-threshold": "50",
  "lower-threshold": "50",
  "scroll-top": NO_DEFAULT_VALUE,
  "scroll-left": NO_DEFAULT_VALUE,
  "scroll-into-view": NO_DEFAULT_VALUE,
  "scroll-with-animation": DEFAULT_FALSE,
  "enable-back-to-top": DEFAULT_FALSE,
  bindScrollToUpper: NO_DEFAULT_VALUE,
  bindScrollToLower: NO_DEFAULT_VALUE,
  bindScroll: NO_DEFAULT_VALUE
}, touchEvents), animation);
const Swiper$1 = Object.assign({
  "indicator-dots": DEFAULT_FALSE,
  "indicator-color": singleQuote("rgba(0, 0, 0, .3)"),
  "indicator-active-color": singleQuote("#000000"),
  autoplay: DEFAULT_FALSE,
  current: "0",
  interval: "5000",
  duration: "500",
  circular: DEFAULT_FALSE,
  vertical: DEFAULT_FALSE,
  "previous-margin": singleQuote("0px"),
  "next-margin": singleQuote("0px"),
  "display-multiple-items": "1",
  bindChange: NO_DEFAULT_VALUE,
  bindTransition: NO_DEFAULT_VALUE,
  bindAnimationFinish: NO_DEFAULT_VALUE
}, touchEvents);
const SwiperItem$1 = {
  "item-id": NO_DEFAULT_VALUE
};
const Navigator = {
  url: NO_DEFAULT_VALUE,
  "open-type": singleQuote("navigate"),
  delta: "1",
  "hover-class": singleQuote("navigator-hover"),
  "hover-stop-propagation": DEFAULT_FALSE,
  "hover-start-time": "50",
  "hover-stay-time": "600",
  bindSuccess: NO_DEFAULT_VALUE,
  bindFail: NO_DEFAULT_VALUE,
  bindComplete: NO_DEFAULT_VALUE
};
const Audio = {
  id: NO_DEFAULT_VALUE,
  src: NO_DEFAULT_VALUE,
  loop: DEFAULT_FALSE,
  controls: DEFAULT_FALSE,
  poster: NO_DEFAULT_VALUE,
  name: NO_DEFAULT_VALUE,
  author: NO_DEFAULT_VALUE,
  bindError: NO_DEFAULT_VALUE,
  bindPlay: NO_DEFAULT_VALUE,
  bindPause: NO_DEFAULT_VALUE,
  bindTimeUpdate: NO_DEFAULT_VALUE,
  bindEnded: NO_DEFAULT_VALUE
};
const Camera = {
  "device-position": singleQuote("back"),
  flash: singleQuote("auto"),
  bindStop: NO_DEFAULT_VALUE,
  bindError: NO_DEFAULT_VALUE
};
const Image$1 = Object.assign({
  src: NO_DEFAULT_VALUE,
  mode: singleQuote("scaleToFill"),
  "lazy-load": DEFAULT_FALSE,
  bindError: NO_DEFAULT_VALUE,
  bindLoad: NO_DEFAULT_VALUE
}, touchEvents);
const LivePlayer = Object.assign({
  src: NO_DEFAULT_VALUE,
  autoplay: DEFAULT_FALSE,
  muted: DEFAULT_FALSE,
  orientation: singleQuote("vertical"),
  "object-fit": singleQuote("contain"),
  "background-mute": DEFAULT_FALSE,
  "min-cache": "1",
  "max-cache": "3",
  bindStateChange: NO_DEFAULT_VALUE,
  bindFullScreenChange: NO_DEFAULT_VALUE,
  bindNetStatus: NO_DEFAULT_VALUE
}, animation);
const Video = Object.assign({
  src: NO_DEFAULT_VALUE,
  duration: NO_DEFAULT_VALUE,
  controls: DEFAULT_TRUE,
  "danmu-list": NO_DEFAULT_VALUE,
  "danmu-btn": NO_DEFAULT_VALUE,
  "enable-danmu": NO_DEFAULT_VALUE,
  autoplay: DEFAULT_FALSE,
  loop: DEFAULT_FALSE,
  muted: DEFAULT_FALSE,
  "initial-time": "0",
  "page-gesture": DEFAULT_FALSE,
  direction: NO_DEFAULT_VALUE,
  "show-progress": DEFAULT_TRUE,
  "show-fullscreen-btn": DEFAULT_TRUE,
  "show-play-btn": DEFAULT_TRUE,
  "show-center-play-btn": DEFAULT_TRUE,
  "enable-progress-gesture": DEFAULT_TRUE,
  "object-fit": singleQuote("contain"),
  poster: NO_DEFAULT_VALUE,
  "show-mute-btn": DEFAULT_FALSE,
  bindPlay: NO_DEFAULT_VALUE,
  bindPause: NO_DEFAULT_VALUE,
  bindEnded: NO_DEFAULT_VALUE,
  bindTimeUpdate: NO_DEFAULT_VALUE,
  bindFullScreenChange: NO_DEFAULT_VALUE,
  bindWaiting: NO_DEFAULT_VALUE,
  bindError: NO_DEFAULT_VALUE
}, animation);
const Canvas = Object.assign({
  "canvas-id": NO_DEFAULT_VALUE,
  "disable-scroll": DEFAULT_FALSE,
  bindError: NO_DEFAULT_VALUE
}, touchEvents);
const Ad = {
  "unit-id": NO_DEFAULT_VALUE,
  "ad-intervals": NO_DEFAULT_VALUE,
  bindLoad: NO_DEFAULT_VALUE,
  bindError: NO_DEFAULT_VALUE,
  bindClose: NO_DEFAULT_VALUE
};
const WebView = {
  src: NO_DEFAULT_VALUE,
  bindMessage: NO_DEFAULT_VALUE,
  bindLoad: NO_DEFAULT_VALUE,
  bindError: NO_DEFAULT_VALUE
};
const Block = {};
const SlotView = {
  name: NO_DEFAULT_VALUE
};
const Slot = {
  name: NO_DEFAULT_VALUE
};
const NativeSlot = {
  name: NO_DEFAULT_VALUE
};
const Script = {};
const internalComponents = {
  View: View$1,
  Icon,
  Progress,
  RichText,
  Text: Text$1,
  Button: Button$1,
  Checkbox,
  CheckboxGroup,
  Form,
  Input: Input$1,
  Label,
  Picker,
  PickerView,
  PickerViewColumn,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  CoverImage,
  Textarea,
  CoverView,
  MovableArea,
  MovableView,
  ScrollView: ScrollView$1,
  Swiper: Swiper$1,
  SwiperItem: SwiperItem$1,
  Navigator,
  Audio,
  Camera,
  Image: Image$1,
  LivePlayer,
  Video,
  Canvas,
  Ad,
  WebView,
  Block,
  Map: MapComp,
  Slot,
  SlotView,
  NativeSlot,
  Script
};
const controlledComponent = /* @__PURE__ */ new Set(["input", "checkbox", "picker", "picker-view", "radio", "slider", "switch", "textarea"]);
var PLATFORM_TYPE;
(function(PLATFORM_TYPE2) {
  PLATFORM_TYPE2["MINI"] = "mini";
  PLATFORM_TYPE2["ASCF"] = "ascf";
  PLATFORM_TYPE2["WEB"] = "web";
  PLATFORM_TYPE2["RN"] = "rn";
  PLATFORM_TYPE2["HARMONY"] = "harmony";
  PLATFORM_TYPE2["QUICK"] = "quickapp";
})(PLATFORM_TYPE || (PLATFORM_TYPE = {}));
({
  h5: {
    type: PLATFORM_TYPE.WEB
  },
  harmony: {
    type: PLATFORM_TYPE.HARMONY
  },
  ascf: {
    type: PLATFORM_TYPE.ASCF
  },
  mini: {
    type: PLATFORM_TYPE.MINI
  },
  rn: {
    type: PLATFORM_TYPE.RN
  },
  quickapp: {
    type: PLATFORM_TYPE.QUICK
  }
});
class Events {
  constructor(opts) {
    var _a2;
    this.callbacks = (_a2 = opts === null || opts === void 0 ? void 0 : opts.callbacks) !== null && _a2 !== void 0 ? _a2 : {};
  }
  on(eventName, callback, context) {
    let event, tail, _eventName;
    if (!callback) {
      return this;
    }
    if (typeof eventName === "symbol") {
      _eventName = [eventName];
    } else {
      _eventName = eventName.split(Events.eventSplitter);
    }
    this.callbacks || (this.callbacks = {});
    const calls = this.callbacks;
    while (event = _eventName.shift()) {
      const list = calls[event];
      const node = list ? list.tail : {};
      node.next = tail = {};
      node.context = context;
      node.callback = callback;
      calls[event] = {
        tail,
        next: list ? list.next : node
      };
    }
    return this;
  }
  once(events, callback, context) {
    const wrapper = (...args) => {
      callback.apply(this, args);
      this.off(events, wrapper, context);
    };
    this.on(events, wrapper, context);
    return this;
  }
  off(events, callback, context) {
    let event, calls, _events;
    if (!(calls = this.callbacks)) {
      return this;
    }
    if (!(events || callback || context)) {
      delete this.callbacks;
      return this;
    }
    if (typeof events === "symbol") {
      _events = [events];
    } else {
      _events = events ? events.split(Events.eventSplitter) : Object.keys(calls);
    }
    while (event = _events.shift()) {
      let node = calls[event];
      delete calls[event];
      if (!node || !(callback || context)) {
        continue;
      }
      const tail = node.tail;
      while ((node = node.next) !== tail) {
        const cb = node.callback;
        const ctx = node.context;
        if (callback && cb !== callback || context && ctx !== context) {
          this.on(event, cb, ctx);
        }
      }
    }
    return this;
  }
  trigger(events, ...args) {
    let event, node, calls, _events;
    if (!(calls = this.callbacks)) {
      return this;
    }
    if (typeof events === "symbol") {
      _events = [events];
    } else {
      _events = events.split(Events.eventSplitter);
    }
    while (event = _events.shift()) {
      if (node = calls[event]) {
        const tail = node.tail;
        while ((node = node.next) !== tail) {
          node.callback.apply(node.context || this, args);
        }
      }
    }
    return this;
  }
}
Events.eventSplitter = ",";
class PageEvts extends Events {
  constructor() {
    super(...arguments);
    this.exeList = [];
  }
  on(eventName, callback) {
    super.on(eventName, callback, this);
    this.exeList = this.exeList.reduce((prev, item) => {
      if (item.eventName === eventName) {
        super.trigger(item.eventName, item.data);
      } else {
        prev.push(item);
      }
      return prev;
    }, []);
    return this;
  }
  emit(events, data) {
    routeChannel.trigger(events, data);
  }
}
const pageChannel = new PageEvts();
class RouteEvts extends Events {
  emit(events, data) {
    pageChannel.off(events);
    pageChannel.exeList.push({
      eventName: events,
      data
    });
  }
  addEvents(events) {
    if (!events || typeof events !== "object")
      return;
    Object.keys(events).forEach((key) => {
      this.off(key);
      this.on(key, events[key], this);
    });
  }
}
const routeChannel = new RouteEvts();
function isString(o) {
  return typeof o === "string";
}
function isUndefined(o) {
  return typeof o === "undefined";
}
function isNull(o) {
  return o === null;
}
function isObject(o) {
  return o !== null && typeof o === "object";
}
function isBoolean(o) {
  return o === true || o === false;
}
function isFunction(o) {
  return typeof o === "function";
}
function isNumber(o) {
  if (Number.isFinite)
    return Number.isFinite(o);
  return typeof o === "number";
}
const isArray = Array.isArray;
var HOOK_TYPE;
(function(HOOK_TYPE2) {
  HOOK_TYPE2[HOOK_TYPE2["SINGLE"] = 0] = "SINGLE";
  HOOK_TYPE2[HOOK_TYPE2["MULTI"] = 1] = "MULTI";
  HOOK_TYPE2[HOOK_TYPE2["WATERFALL"] = 2] = "WATERFALL";
})(HOOK_TYPE || (HOOK_TYPE = {}));
const defaultMiniLifecycle = {
  app: ["onLaunch", "onShow", "onHide"],
  page: ["onLoad", "onUnload", "onReady", "onShow", "onHide", [
    "onPullDownRefresh",
    "onReachBottom",
    "onPageScroll",
    "onResize",
    "defer:onTabItemTap",
    // defer: 需要等页面组件挂载后再调用
    "onTitleClick",
    "onOptionMenuClick",
    "events:onKeyboardHeight",
    // events: 支付宝平台需要挂载到 config.events 上
    "onPopMenuClick",
    "onPullIntercept",
    "onAddToFavorites"
  ], ["onShareAppMessage", "onShareTimeline"]],
  component: ["attached", "detached"]
};
function TaroHook(type, initial) {
  return {
    type,
    initial: initial || null
  };
}
class TaroHooks extends Events {
  constructor(hooks2, opts) {
    super(opts);
    this.hooks = hooks2;
    for (const hookName in hooks2) {
      const {
        initial
      } = hooks2[hookName];
      if (isFunction(initial)) {
        this.on(hookName, initial);
      }
    }
  }
  tapOneOrMany(hookName, callback) {
    const list = isFunction(callback) ? [callback] : callback;
    list.forEach((cb) => this.on(hookName, cb));
  }
  tap(hookName, callback) {
    const hooks2 = this.hooks;
    const {
      type,
      initial
    } = hooks2[hookName];
    if (type === HOOK_TYPE.SINGLE) {
      this.off(hookName);
      this.on(hookName, isFunction(callback) ? callback : callback[callback.length - 1]);
    } else {
      initial && this.off(hookName, initial);
      this.tapOneOrMany(hookName, callback);
    }
  }
  call(hookName, ...rest) {
    var _a2;
    const hook = this.hooks[hookName];
    if (!hook)
      return;
    const {
      type
    } = hook;
    const calls = this.callbacks;
    if (!calls)
      return;
    const list = calls[hookName];
    if (list) {
      const tail = list.tail;
      let node = list.next;
      let args = rest;
      let res;
      while (node !== tail) {
        res = (_a2 = node.callback) === null || _a2 === void 0 ? void 0 : _a2.apply(node.context || this, args);
        if (type === HOOK_TYPE.WATERFALL) {
          const params = [res];
          args = params;
        }
        node = node.next;
      }
      return res;
    }
  }
  isExist(hookName) {
    var _a2;
    return Boolean((_a2 = this.callbacks) === null || _a2 === void 0 ? void 0 : _a2[hookName]);
  }
}
const hooks = new TaroHooks({
  getMiniLifecycle: TaroHook(HOOK_TYPE.SINGLE, (defaultConfig) => defaultConfig),
  getMiniLifecycleImpl: TaroHook(HOOK_TYPE.SINGLE, function() {
    return this.call("getMiniLifecycle", defaultMiniLifecycle);
  }),
  getLifecycle: TaroHook(HOOK_TYPE.SINGLE, (instance, lifecycle) => instance[lifecycle]),
  modifyRecursiveComponentConfig: TaroHook(HOOK_TYPE.SINGLE, (defaultConfig) => defaultConfig),
  getPathIndex: TaroHook(HOOK_TYPE.SINGLE, (indexOfNode) => `[${indexOfNode}]`),
  getEventCenter: TaroHook(HOOK_TYPE.SINGLE, (Events2) => new Events2()),
  isBubbleEvents: TaroHook(HOOK_TYPE.SINGLE, (eventName) => {
    const BUBBLE_EVENTS = /* @__PURE__ */ new Set(["touchstart", "touchmove", "touchcancel", "touchend", "touchforcechange", "tap", "longpress", "longtap", "transitionend", "animationstart", "animationiteration", "animationend"]);
    return BUBBLE_EVENTS.has(eventName);
  }),
  getSpecialNodes: TaroHook(HOOK_TYPE.SINGLE, () => ["view", "text", "image"]),
  onRemoveAttribute: TaroHook(HOOK_TYPE.SINGLE),
  batchedEventUpdates: TaroHook(HOOK_TYPE.SINGLE),
  mergePageInstance: TaroHook(HOOK_TYPE.SINGLE),
  modifyPageObject: TaroHook(HOOK_TYPE.SINGLE),
  createPullDownComponent: TaroHook(HOOK_TYPE.SINGLE),
  getDOMNode: TaroHook(HOOK_TYPE.SINGLE),
  modifyHydrateData: TaroHook(HOOK_TYPE.SINGLE),
  transferHydrateData: TaroHook(HOOK_TYPE.SINGLE),
  modifySetAttrPayload: TaroHook(HOOK_TYPE.SINGLE),
  modifyRmAttrPayload: TaroHook(HOOK_TYPE.SINGLE),
  onAddEvent: TaroHook(HOOK_TYPE.SINGLE),
  proxyToRaw: TaroHook(HOOK_TYPE.SINGLE, function(proxyObj) {
    return proxyObj;
  }),
  modifyMpEvent: TaroHook(HOOK_TYPE.MULTI),
  modifyMpEventImpl: TaroHook(HOOK_TYPE.SINGLE, function(e) {
    try {
      this.call("modifyMpEvent", e);
    } catch (error) {
      console.warn("[Taro modifyMpEvent hook Error]: " + (error === null || error === void 0 ? void 0 : error.message));
    }
  }),
  injectNewStyleProperties: TaroHook(HOOK_TYPE.SINGLE),
  modifyTaroEvent: TaroHook(HOOK_TYPE.MULTI),
  dispatchTaroEvent: TaroHook(HOOK_TYPE.SINGLE, (e, node) => {
    node.dispatchEvent(e);
  }),
  dispatchTaroEventFinish: TaroHook(HOOK_TYPE.MULTI),
  modifyTaroEventReturn: TaroHook(HOOK_TYPE.SINGLE, () => void 0),
  modifyDispatchEvent: TaroHook(HOOK_TYPE.MULTI),
  initNativeApi: TaroHook(HOOK_TYPE.MULTI),
  patchElement: TaroHook(HOOK_TYPE.MULTI),
  modifyAddEventListener: TaroHook(HOOK_TYPE.SINGLE),
  modifyRemoveEventListener: TaroHook(HOOK_TYPE.SINGLE),
  getMemoryLevel: TaroHook(HOOK_TYPE.SINGLE)
});
const EMPTY_OBJ = {};
const noop = (..._) => {
};
function toDashed(s) {
  return s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function toCamelCase(s) {
  let camel = "";
  let nextCap = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== "-") {
      camel += nextCap ? s[i].toUpperCase() : s[i];
      nextCap = false;
    } else {
      nextCap = true;
    }
  }
  return camel;
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function ensure(condition, msg2) {
  if (!condition) {
    {
      const reportIssue = "\n如有疑问，请提交 issue 至：https://github.com/nervjs/taro/issues";
      throw new Error(msg2 + reportIssue);
    }
  }
}
function warn(condition, msg2) {
  {
    if (condition) {
      console.warn(`[taro warn] ${msg2}`);
    }
  }
}
let _uniqueId = 1;
const _loadTime = (/* @__PURE__ */ new Date()).getTime().toString();
function getUniqueKey() {
  return _loadTime + _uniqueId++;
}
function mergeInternalComponents(components2) {
  Object.keys(components2).forEach((name) => {
    if (name in internalComponents) {
      Object.assign(internalComponents[name], components2[name]);
    } else {
      internalComponents[name] = components2[name];
    }
  });
  return internalComponents;
}
function getComponentsAlias$1(origin) {
  const mapping = {};
  const viewAttrs = origin.View;
  const extraList = {
    "#text": {},
    StaticView: viewAttrs,
    StaticImage: origin.Image,
    StaticText: origin.Text,
    PureView: viewAttrs,
    CatchView: viewAttrs,
    ClickView: viewAttrs
  };
  origin = Object.assign(Object.assign({}, origin), extraList);
  Object.keys(origin).sort((a, b) => {
    const reg = /^(Static|Pure|Catch|Click)*(View|Image|Text)$/;
    const isACommonly = reg.test(a);
    const isBCommonly = reg.test(b);
    if (isACommonly && isBCommonly) {
      return a > b ? 1 : -1;
    } else if (isACommonly) {
      return -1;
    } else if (isBCommonly) {
      return 1;
    } else {
      return a >= b ? 1 : -1;
    }
  }).forEach((key, num) => {
    const obj = {
      _num: String(num)
    };
    Object.keys(origin[key]).filter((attr) => !/^bind/.test(attr) && !["focus", "blur", "$duplicateFromComponent"].includes(attr)).sort().forEach((attr, index2) => {
      obj[toCamelCase(attr)] = "p" + index2;
    });
    mapping[toDashed(key)] = obj;
  });
  return mapping;
}
function mergeReconciler(hostConfig2, hooksForTest) {
  const obj = hooksForTest || hooks;
  const keys = Object.keys(hostConfig2);
  keys.forEach((key) => {
    obj.tap(key, hostConfig2[key]);
  });
}
function nonsupport(api) {
  return function() {
    console.warn(`小程序暂不支持 ${api}`);
  };
}
function setUniqueKeyToRoute(key, obj) {
  const routerParamsPrivateKey = "__key_";
  const useDataCacheApis = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  if (useDataCacheApis.indexOf(key) > -1) {
    const url = obj.url = obj.url || "";
    const hasMark = url.indexOf("?") > -1;
    const cacheKey = getUniqueKey();
    obj.url += (hasMark ? "&" : "?") + `${routerParamsPrivateKey}=${cacheKey}`;
  }
}
const needPromiseApis$1 = /* @__PURE__ */ new Set(["addPhoneContact", "authorize", "canvasGetImageData", "canvasPutImageData", "canvasToTempFilePath", "checkSession", "chooseAddress", "chooseImage", "chooseInvoiceTitle", "chooseLocation", "chooseVideo", "clearStorage", "closeBLEConnection", "closeBluetoothAdapter", "closeSocket", "compressImage", "connectSocket", "createBLEConnection", "downloadFile", "exitMiniProgram", "getAvailableAudioSources", "getBLEDeviceCharacteristics", "getBLEDeviceServices", "getBatteryInfo", "getBeacons", "getBluetoothAdapterState", "getBluetoothDevices", "getClipboardData", "getConnectedBluetoothDevices", "getConnectedWifi", "getExtConfig", "getFileInfo", "getImageInfo", "getLocation", "getNetworkType", "getSavedFileInfo", "getSavedFileList", "getScreenBrightness", "getSetting", "getStorage", "getStorageInfo", "getSystemInfo", "getUserInfo", "getWifiList", "hideHomeButton", "hideShareMenu", "hideTabBar", "hideTabBarRedDot", "loadFontFace", "login", "makePhoneCall", "navigateBack", "navigateBackMiniProgram", "navigateTo", "navigateToBookshelf", "navigateToMiniProgram", "notifyBLECharacteristicValueChange", "hideKeyboard", "hideLoading", "hideNavigationBarLoading", "hideToast", "openBluetoothAdapter", "openDocument", "openLocation", "openSetting", "pageScrollTo", "previewImage", "queryBookshelf", "reLaunch", "readBLECharacteristicValue", "redirectTo", "removeSavedFile", "removeStorage", "removeTabBarBadge", "requestSubscribeMessage", "saveFile", "saveImageToPhotosAlbum", "saveVideoToPhotosAlbum", "scanCode", "sendSocketMessage", "setBackgroundColor", "setBackgroundTextStyle", "setClipboardData", "setEnableDebug", "setInnerAudioOption", "setKeepScreenOn", "setNavigationBarColor", "setNavigationBarTitle", "setScreenBrightness", "setStorage", "setTabBarBadge", "setTabBarItem", "setTabBarStyle", "showActionSheet", "showFavoriteGuide", "showLoading", "showModal", "showShareMenu", "showTabBar", "showTabBarRedDot", "showToast", "startBeaconDiscovery", "startBluetoothDevicesDiscovery", "startDeviceMotionListening", "startPullDownRefresh", "stopBeaconDiscovery", "stopBluetoothDevicesDiscovery", "stopCompass", "startCompass", "startAccelerometer", "stopAccelerometer", "showNavigationBarLoading", "stopDeviceMotionListening", "stopPullDownRefresh", "switchTab", "uploadFile", "vibrateLong", "vibrateShort", "writeBLECharacteristicValue"]);
function getCanIUseWebp(taro2) {
  return function() {
    var _a2;
    const res = (_a2 = taro2.getSystemInfoSync) === null || _a2 === void 0 ? void 0 : _a2.call(taro2);
    if (!res) {
      {
        console.error("不支持 API canIUseWebp");
      }
      return false;
    }
    const {
      platform
    } = res;
    const platformLower = platform.toLowerCase();
    if (platformLower === "android" || platformLower === "devtools") {
      return true;
    }
    return false;
  };
}
function getNormalRequest(global2) {
  return function request(options2) {
    options2 = options2 ? isString(options2) ? {
      url: options2
    } : options2 : {};
    const originSuccess = options2.success;
    const originFail = options2.fail;
    const originComplete = options2.complete;
    let requestTask;
    const p2 = new Promise((resolve, reject) => {
      options2.success = (res) => {
        originSuccess && originSuccess(res);
        resolve(res);
      };
      options2.fail = (res) => {
        originFail && originFail(res);
        reject(res);
      };
      options2.complete = (res) => {
        originComplete && originComplete(res);
      };
      requestTask = global2.request(options2);
    });
    equipTaskMethodsIntoPromise(requestTask, p2);
    p2.abort = (cb) => {
      cb && cb();
      if (requestTask) {
        requestTask.abort();
      }
      return p2;
    };
    return p2;
  };
}
function processApis(taro2, global2, config = {}) {
  const patchNeedPromiseApis = config.needPromiseApis || [];
  const _needPromiseApis = /* @__PURE__ */ new Set([...patchNeedPromiseApis, ...needPromiseApis$1]);
  const preserved = ["getEnv", "interceptors", "Current", "getCurrentInstance", "options", "nextTick", "eventCenter", "Events", "preload", "webpackJsonp"];
  const apis = new Set(!config.isOnlyPromisify ? Object.keys(global2).filter((api) => preserved.indexOf(api) === -1) : patchNeedPromiseApis);
  if (config.modifyApis) {
    config.modifyApis(apis);
  }
  apis.forEach((key) => {
    if (_needPromiseApis.has(key)) {
      const originKey = key;
      taro2[originKey] = (options2 = {}, ...args) => {
        let key2 = originKey;
        if (typeof options2 === "string") {
          if (args.length) {
            return global2[key2](options2, ...args);
          }
          return global2[key2](options2);
        }
        if (config.transformMeta) {
          const transformResult = config.transformMeta(key2, options2);
          key2 = transformResult.key;
          options2 = transformResult.options;
          if (!global2.hasOwnProperty(key2)) {
            return nonsupport(key2)();
          }
        }
        let task = null;
        const obj = Object.assign({}, options2);
        setUniqueKeyToRoute(key2, options2);
        const p2 = new Promise((resolve, reject) => {
          obj.success = (res) => {
            var _a2, _b;
            (_a2 = config.modifyAsyncResult) === null || _a2 === void 0 ? void 0 : _a2.call(config, key2, res);
            (_b = options2.success) === null || _b === void 0 ? void 0 : _b.call(options2, res);
            if (key2 === "connectSocket") {
              resolve(Promise.resolve().then(() => task ? Object.assign(task, res) : res));
            } else {
              resolve(res);
            }
          };
          obj.fail = (res) => {
            var _a2;
            (_a2 = options2.fail) === null || _a2 === void 0 ? void 0 : _a2.call(options2, res);
            reject(res);
          };
          obj.complete = (res) => {
            var _a2;
            (_a2 = options2.complete) === null || _a2 === void 0 ? void 0 : _a2.call(options2, res);
          };
          if (args.length) {
            task = global2[key2](obj, ...args);
          } else {
            task = global2[key2](obj);
          }
        });
        if (["uploadFile", "downloadFile"].includes(key2)) {
          equipTaskMethodsIntoPromise(task, p2);
          p2.progress = (cb) => {
            task === null || task === void 0 ? void 0 : task.onProgressUpdate(cb);
            return p2;
          };
          p2.abort = (cb) => {
            cb === null || cb === void 0 ? void 0 : cb();
            task === null || task === void 0 ? void 0 : task.abort();
            return p2;
          };
        }
        return p2;
      };
    } else {
      let platformKey = key;
      if (config.transformMeta) {
        platformKey = config.transformMeta(key, {}).key;
      }
      if (!global2.hasOwnProperty(platformKey)) {
        taro2[key] = nonsupport(key);
        return;
      }
      if (isFunction(global2[key])) {
        taro2[key] = (...args) => {
          if (config.handleSyncApis) {
            return config.handleSyncApis(key, global2, args);
          } else {
            return global2[platformKey].apply(global2, args);
          }
        };
      } else {
        taro2[key] = global2[platformKey];
      }
    }
  });
  !config.isOnlyPromisify && equipCommonApis(taro2, global2, config);
}
function equipCommonApis(taro2, global2, apis = {}) {
  taro2.canIUseWebp = getCanIUseWebp(taro2);
  taro2.getCurrentPages = getCurrentPages || nonsupport("getCurrentPages");
  taro2.getApp = getApp || nonsupport("getApp");
  taro2.env = global2.env || {};
  try {
    taro2.requirePlugin = requirePlugin || nonsupport("requirePlugin");
  } catch (error) {
    taro2.requirePlugin = nonsupport("requirePlugin");
  }
  const request = apis.request || getNormalRequest(global2);
  function taroInterceptor(chain) {
    return request(chain.requestParams);
  }
  const link = new taro2.Link(taroInterceptor);
  taro2.request = link.request.bind(link);
  taro2.addInterceptor = link.addInterceptor.bind(link);
  taro2.cleanInterceptors = link.cleanInterceptors.bind(link);
  taro2.miniGlobal = taro2.options.miniGlobal = global2;
  taro2.getAppInfo = function() {
    return {
      platform: "mini",
      taroVersion: "4.1.11",
      designWidth: taro2.config.designWidth
    };
  };
  taro2.createSelectorQuery = delayRef(taro2, global2, "createSelectorQuery", "exec");
  taro2.createIntersectionObserver = delayRef(taro2, global2, "createIntersectionObserver", "observe");
}
function equipTaskMethodsIntoPromise(task, promise) {
  if (!task || !promise)
    return;
  const taskMethods = ["abort", "onHeadersReceived", "offHeadersReceived", "onProgressUpdate", "offProgressUpdate", "onChunkReceived", "offChunkReceived"];
  task && taskMethods.forEach((method) => {
    if (method in task) {
      promise[method] = task[method].bind(task);
    }
  });
}
function delayRef(taro2, global2, name, method) {
  return function(...args) {
    const res = global2[name](...args);
    const raw = res[method].bind(res);
    res[method] = function(...methodArgs) {
      taro2.nextTick(() => raw(...methodArgs));
    };
    return res;
  };
}
var Shortcuts;
(function(Shortcuts2) {
  Shortcuts2["Container"] = "container";
  Shortcuts2["Childnodes"] = "cn";
  Shortcuts2["Text"] = "v";
  Shortcuts2["NodeType"] = "nt";
  Shortcuts2["NodeName"] = "nn";
  Shortcuts2["Sid"] = "sid";
  Shortcuts2["Style"] = "st";
  Shortcuts2["Class"] = "cl";
  Shortcuts2["Src"] = "src";
})(Shortcuts || (Shortcuts = {}));
const needPromiseApis = /* @__PURE__ */ new Set(["addFileToFavorites", "addVideoToFavorites", "authPrivateMessage", "checkIsAddedToMyMiniProgram", "chooseContact", "cropImage", "disableAlertBeforeUnload", "editImage", "enableAlertBeforeUnload", "getBackgroundFetchData", "getChannelsLiveInfo", "getChannelsLiveNoticeInfo", "getFuzzyLocation", "getGroupEnterInfo", "getLocalIPAddress", "getShareInfo", "getUserProfile", "getWeRunData", "join1v1Chat", "openChannelsActivity", "openChannelsEvent", "openChannelsLive", "openChannelsUserProfile", "openCustomerServiceChat", "openVideoEditor", "saveFileToDisk", "scanItem", "setEnable1v1Chat", "setWindowSize", "sendBizRedPacket", "startFacialRecognitionVerify"]);
function initNativeApi(taro2) {
  processApis(taro2, wx, {
    needPromiseApis,
    modifyApis(apis) {
      apis.delete("lanDebug");
    },
    transformMeta(api, options2) {
      var _a2;
      if (api === "showShareMenu") {
        options2.menus = (_a2 = options2.showShareItems) === null || _a2 === void 0 ? void 0 : _a2.map((item) => item === "wechatFriends" ? "shareAppMessage" : item === "wechatMoment" ? "shareTimeline" : item);
      }
      return {
        key: api,
        options: options2
      };
    }
  });
  taro2.cloud = wx.cloud;
  taro2.getTabBar = function(pageCtx) {
    var _a2;
    if (typeof (pageCtx === null || pageCtx === void 0 ? void 0 : pageCtx.getTabBar) === "function") {
      return (_a2 = pageCtx.getTabBar()) === null || _a2 === void 0 ? void 0 : _a2.$taroInstances;
    }
  };
  taro2.getRenderer = function() {
    var _a2, _b, _c;
    return (_c = (_b = (_a2 = taro2.getCurrentInstance()) === null || _a2 === void 0 ? void 0 : _a2.page) === null || _b === void 0 ? void 0 : _b.renderer) !== null && _c !== void 0 ? _c : "webview";
  };
}
const _true = "true";
const _false = "false";
const _empty = "";
const _zero = "0";
const _object = "{}";
const components = {
  // ======== 调整属性 ========
  Progress: {
    "border-radius": _zero,
    "font-size": "16",
    duration: "30",
    bindActiveEnd: _empty
  },
  RichText: {
    space: _empty,
    "user-select": _false,
    mode: "'default'"
  },
  Text: {
    "user-select": _false,
    overflow: "visible",
    "max-lines": ""
  },
  Map: {
    polygons: "[]",
    subkey: _empty,
    rotate: _zero,
    skew: _zero,
    "max-scale": "20",
    "min-scale": "3",
    "enable-3D": _false,
    "show-compass": _false,
    "show-scale": _false,
    "enable-overlooking": _false,
    "enable-auto-max-overlooking": _false,
    "enable-zoom": _true,
    "enable-scroll": _true,
    "enable-rotate": _false,
    "enable-satellite": _false,
    "enable-traffic": _false,
    "enable-poi": _true,
    "enable-building": _true,
    setting: _object,
    bindLabelTap: _empty,
    bindRegionChange: _empty,
    bindPoiTap: _empty,
    bindPolylineTap: _empty,
    bindAbilitySuccess: _empty,
    bindAbilityFailed: _empty,
    bindAuthSuccess: _empty,
    bindInterpolatePoint: _empty,
    bindError: _empty,
    bindAnchorPointTap: _empty
  },
  Button: {
    lang: "en",
    "session-from": _empty,
    "send-message-title": _empty,
    "send-message-path": _empty,
    "send-message-img": _empty,
    "app-parameter": _empty,
    "show-message-card": _false,
    "business-id": _empty,
    bindGetUserInfo: _empty,
    bindContact: _empty,
    bindGetPhoneNumber: _empty,
    bindGetRealTimePhoneNumber: _empty,
    bindChooseAvatar: _empty,
    bindError: _empty,
    bindOpenSetting: _empty,
    bindLaunchApp: _empty,
    bindAgreePrivacyAuthorization: _empty
  },
  Form: {
    "report-submit-timeout": _zero
  },
  Input: {
    "always-embed": _false,
    "adjust-position": _true,
    "hold-keyboard": _false,
    "safe-password-cert-path": "",
    "safe-password-length": "",
    "safe-password-time-stamp": "",
    "safe-password-nonce": "",
    "safe-password-salt": "",
    "safe-password-custom-hash": "",
    "auto-fill": _empty,
    "cursor-color": "",
    bindKeyboardHeightChange: _empty,
    bindNicknameReview: _empty,
    bindSelectionChange: _empty,
    bindKeyboardCompositionStart: _empty,
    bindKeyboardCompositionUpdate: _empty,
    bindKeyboardCompositionEnd: _empty
  },
  Picker: {
    "header-text": _empty,
    level: "region"
  },
  PickerView: {
    "immediate-change": _false,
    bindPickStart: _empty,
    bindPickEnd: _empty
  },
  Slider: {
    color: "'#e9e9e9'",
    "selected-color": "'#1aad19'"
  },
  Textarea: {
    "show-confirm-bar": _true,
    "adjust-position": _true,
    "hold-keyboard": _false,
    "disable-default-padding": _false,
    "confirm-type": "'return'",
    "confirm-hold": _false,
    "adjust-keyboard-to": "'cursor'",
    bindKeyboardHeightChange: _empty,
    bindSelectionChange: _empty,
    bindKeyboardCompositionStart: _empty,
    bindKeyboardCompositionUpdate: _empty,
    bindKeyboardCompositionEnd: _empty
  },
  ScrollView: {
    "enable-flex": _false,
    "scroll-anchoring": _false,
    enhanced: _false,
    "using-sticky": _false,
    "paging-enabled": _false,
    "enable-passive": _false,
    "refresher-enabled": _false,
    "refresher-threshold": "45",
    "refresher-default-style": "'black'",
    "refresher-background": "'#FFF'",
    "refresher-triggered": _false,
    bounces: _true,
    "show-scrollbar": _true,
    "fast-deceleration": _false,
    type: "'list'",
    "associative-container": "''",
    reverse: _false,
    clip: _true,
    "enable-back-to-top": _false,
    "cache-extent": _empty,
    "min-drag-distance": "18",
    "scroll-into-view-within-extent": _false,
    "scroll-into-view-alignment": "'start'",
    padding: "[0,0,0,0]",
    "refresher-two-level-enabled": _false,
    "refresher-two-level-triggered": _false,
    "refresher-two-level-threshold": "150",
    "refresher-two-level-close-threshold": "80",
    "refresher-two-level-scroll-enabled": _false,
    "refresher-ballistic-refresh-enabled": _false,
    "refresher-two-level-pinned": _false,
    bindDragStart: _empty,
    bindDragging: _empty,
    bindDragEnd: _empty,
    bindRefresherPulling: _empty,
    bindRefresherRefresh: _empty,
    bindRefresherRestore: _empty,
    bindRefresherAbort: _empty,
    bindScrollStart: _empty,
    bindScrollEnd: _empty,
    bindRefresherWillRefresh: _empty,
    bindRefresherStatusChange: _empty
  },
  StickySection: {
    "push-pinned-header": _true,
    padding: "[0, 0, 0, 0]"
  },
  GridView: {
    type: "'aligned'",
    "cross-axis-count": "2",
    "max-cross-axis-extent": _zero,
    "main-axis-gap": _zero,
    "cross-axis-gap": _zero,
    padding: "[0, 0, 0, 0]"
  },
  GridBuilder: {
    type: "'aligned'",
    list: "[]",
    "cross-axis-count": "2",
    "max-cross-axis-extent": _zero,
    "main-axis-gap": _zero,
    "cross-axis-gap": _zero,
    padding: "[0, 0, 0, 0]",
    bindItemBuild: _empty,
    bindItemDispose: _empty
  },
  ListView: {
    padding: "[0, 0, 0, 0]"
  },
  ListBuilder: {
    list: "[]",
    type: "static",
    padding: "[0, 0, 0, 0]",
    "child-count": _empty,
    "child-height": _empty,
    bindItemBuild: _empty,
    bindItemDispose: _empty
  },
  StickyHeader: {
    "offset-top": "0",
    padding: "[0, 0, 0, 0]"
  },
  Swiper: {
    "snap-to-edge": _false,
    "easing-function": "'default'",
    "layout-type": "'normal'",
    "transformer-type": "'scaleAndFade'",
    "indicator-type": "'normal'",
    "indicator-margin": "10",
    "indicator-spacing": "4",
    "indicator-radius": "4",
    "indicator-width": "8",
    "indicator-height": "8",
    "indicator-alignment": "'auto'",
    "indicator-offset": "[0, 0]",
    "scroll-with-animation": _true,
    "cache-extent": "0"
  },
  SwiperItem: {
    "skip-hidden-item-layout": _false
  },
  Navigator: {
    target: "'self'",
    "app-id": _empty,
    path: _empty,
    "extra-data": _empty,
    version: "'version'"
  },
  Camera: {
    mode: "'normal'",
    resolution: "'medium'",
    "frame-size": "'medium'",
    bindInitDone: _empty,
    bindScanCode: _empty
  },
  Image: {
    webp: _false,
    "show-menu-by-longpress": _false,
    "fade-in": _false
  },
  LivePlayer: {
    mode: "'live'",
    "sound-mode": "'speaker'",
    "auto-pause-if-navigate": _true,
    "auto-pause-if-open-native": _true,
    "picture-in-picture-mode": "[]",
    "enable-auto-rotation": _false,
    "referrer-policy": "'no-referrer'",
    "enable-casting": _false,
    bindstatechange: _empty,
    bindfullscreenchange: _empty,
    bindnetstatus: _empty,
    bindAudioVolumeNotify: _empty,
    bindEnterPictureInPicture: _empty,
    bindLeavePictureInPicture: _empty,
    bindCastingUserSelect: _empty,
    bindCastingStateChange: _empty,
    bindCastingInterrupt: _empty
  },
  Video: {
    title: _empty,
    "play-btn-position": "'bottom'",
    "enable-play-gesture": _false,
    "auto-pause-if-navigate": _true,
    "auto-pause-if-open-native": _true,
    "vslide-gesture": _false,
    "vslide-gesture-in-fullscreen": _true,
    "show-bottom-progress": _true,
    "ad-unit-id": _empty,
    "poster-for-crawler": _empty,
    "show-casting-button": _false,
    "picture-in-picture-mode": "[]",
    // picture-in-picture-show-progress 属性先注释掉的原因如下：
    // 该属性超过了 wxml 属性的长度限制，实际无法使用且导致编译报错。可等微信官方修复后再放开。
    // 参考1：https://developers.weixin.qq.com/community/develop/doc/000a429beb87f0eac07acc0fc5b400
    // 参考2: https://developers.weixin.qq.com/community/develop/doc/0006883619c48054286a4308258c00?_at=vyxqpllafi
    // 'picture-in-picture-show-progress': 'false',
    "enable-auto-rotation": _false,
    "show-screen-lock-button": _false,
    "show-snapshot-button": _false,
    "show-background-playback-button": _false,
    "background-poster": _empty,
    "referrer-policy": "'no-referrer'",
    "is-drm": _false,
    "is-live": _false,
    "provision-url": _empty,
    "certificate-url": _empty,
    "license-url": _empty,
    "preferred-peak-bit-rate": _empty,
    bindProgress: _empty,
    bindLoadedMetadata: _empty,
    bindControlsToggle: _empty,
    bindEnterPictureInPicture: _empty,
    bindLeavePictureInPicture: _empty,
    bindSeekComplete: _empty,
    bindCastingUserSelect: _empty,
    bindCastingStateChange: _empty,
    bindCastingInterrupt: _empty,
    bindAdLoad: _empty,
    bindAdError: _empty,
    bindAdClose: _empty,
    bindAdPlay: _empty
  },
  Canvas: {
    type: _empty
  },
  Ad: {
    "ad-type": "'banner'",
    "ad-theme": "'white'"
  },
  CoverView: {
    "marker-id": _empty,
    slot: _empty
  },
  // ======== 额外组件 ========
  Editor: {
    "read-only": _false,
    placeholder: _empty,
    "show-img-size": _false,
    "show-img-toolbar": _false,
    "show-img-resize": _false,
    focus: _false,
    bindReady: _empty,
    bindFocus: _empty,
    bindBlur: _empty,
    bindInput: _empty,
    bindStatusChange: _empty,
    name: _empty
  },
  MatchMedia: {
    "min-width": _empty,
    "max-width": _empty,
    width: _empty,
    "min-height": _empty,
    "max-height": _empty,
    height: _empty,
    orientation: _empty
  },
  FunctionalPageNavigator: {
    version: "'release'",
    name: _empty,
    args: _empty,
    bindSuccess: _empty,
    bindFail: _empty,
    bindCancel: _empty
  },
  LivePusher: {
    url: _empty,
    mode: "'RTC'",
    autopush: _false,
    muted: _false,
    "enable-camera": _true,
    "auto-focus": _true,
    orientation: "'vertical'",
    beauty: _zero,
    whiteness: _zero,
    aspect: "'9:16'",
    "min-bitrate": "200",
    "max-bitrate": "1000",
    "audio-quality": "'high'",
    "waiting-image": _empty,
    "waiting-image-hash": _empty,
    zoom: _false,
    "device-position": "'front'",
    "background-mute": _false,
    mirror: _false,
    "remote-mirror": _false,
    "local-mirror": _false,
    "audio-reverb-type": _zero,
    "enable-mic": _true,
    "enable-agc": _false,
    "enable-ans": _false,
    "audio-volume-type": "'voicecall'",
    "video-width": "360",
    "video-height": "640",
    "beauty-style": "'smooth'",
    filter: "'standard'",
    "picture-in-picture-mode": "[]",
    animation: _empty,
    bindStateChange: _empty,
    bindNetStatus: _empty,
    bindBgmStart: _empty,
    bindBgmProgress: _empty,
    bindBgmComplete: _empty,
    bindAudioVolumeNotify: _empty
  },
  OfficialAccount: {
    bindLoad: _empty,
    bindError: _empty
  },
  OpenData: {
    type: _empty,
    "open-gid": _empty,
    lang: "'en'",
    "default-text": _empty,
    "default-avatar": _empty,
    bindError: _empty
  },
  NavigationBar: {
    title: _empty,
    loading: _false,
    "front-color": "'#000000'",
    "background-color": _empty,
    "color-animation-duration": _zero,
    "color-animation-timing-func": "'linear'"
  },
  PageMeta: {
    "background-text-style": _empty,
    "background-color": _empty,
    "background-color-top": _empty,
    "background-color-bottom": _empty,
    "root-background-color": _empty,
    "scroll-top": "''",
    "scroll-duration": "300",
    "page-style": "''",
    "root-font-size": "''",
    "page-orientation": "''",
    bindResize: _empty,
    bindScroll: _empty,
    bindScrollDone: _empty
  },
  VoipRoom: {
    openid: _empty,
    mode: "'camera'",
    "device-position": "'front'",
    bindError: _empty
  },
  AdCustom: {
    "unit-id": _empty,
    "ad-intervals": _empty,
    bindLoad: _empty,
    bindError: _empty
  },
  PageContainer: {
    show: _false,
    duration: "300",
    "z-index": "100",
    overlay: _true,
    position: "'bottom'",
    round: _false,
    "close-on-slide-down": _false,
    "overlay-style": _empty,
    "custom-style": _empty,
    bindBeforeEnter: _empty,
    bindEnter: _empty,
    bindAfterEnter: _empty,
    bindBeforeLeave: _empty,
    bindLeave: _empty,
    bindAfterLeave: _empty,
    bindClickOverlay: _empty
  },
  ShareElement: {
    mapkey: _empty,
    transform: _false,
    duration: "300",
    "easing-function": "'ease-out'",
    "transition-on-gesture": _false,
    "shuttle-on-push": "'to'",
    "shuttle-on-pop": "'to'",
    "rect-tween-type": "'materialRectArc'"
  },
  KeyboardAccessory: {},
  RootPortal: {
    enable: _true
  },
  ChannelLive: {
    "feed-id": _empty,
    "finder-user-name": _empty
  },
  ChannelVideo: {
    "feed-id": _empty,
    "finder-user-name": _empty,
    "feed-token": _empty,
    autoplay: _false,
    loop: _false,
    muted: _false,
    "object-fit": "'contain'",
    bindError: _empty
  },
  Snapshot: {
    mode: "'view'"
  },
  Span: {},
  OpenContainer: {
    transitionType: "'fade'",
    transitionDuration: "300",
    closedColor: "'white'",
    closedElevation: _zero,
    closeBorderRadius: _zero,
    middleColor: _empty,
    openColor: "'white'",
    openElevation: _zero,
    openBorderRadius: _zero
  },
  DraggableSheet: {
    initialChildSize: "0.5",
    minChildSize: "0.25",
    maxChildSize: "1.0",
    snap: _false,
    snapSizes: "[]"
  },
  NestedScrollHeader: {},
  NestedScrollBody: {},
  // skyline手势组件
  DoubleTapGestureHandler: {},
  ForcePressGestureHandler: {},
  HorizontalDragGestureHandler: {},
  LongPressGestureHandler: {},
  PanGestureHandler: {},
  ScaleGestureHandler: {},
  TapGestureHandler: {},
  VerticalDragGestureHandler: {}
};
const hostConfig$1 = {
  initNativeApi,
  getMiniLifecycle(config) {
    const methods = config.page[5];
    if (methods.indexOf("onSaveExitState") === -1) {
      methods.push("onSaveExitState");
    }
    return config;
  },
  transferHydrateData(data, element, componentsAlias2) {
    var _a2;
    if (element.isTransferElement) {
      const pages = getCurrentPages();
      const page = pages[pages.length - 1];
      data[
        "nn"
        /* Shortcuts.NodeName */
      ] = element.dataName;
      page.setData({
        [toCamelCase(data.nn)]: data
      });
      return {
        sid: element.sid,
        [
          "v"
          /* Shortcuts.Text */
        ]: "",
        [
          "nn"
          /* Shortcuts.NodeName */
        ]: ((_a2 = componentsAlias2["#text"]) === null || _a2 === void 0 ? void 0 : _a2._num) || "8"
      };
    }
  }
};
mergeReconciler(hostConfig$1);
mergeInternalComponents(components);
const PROPERTY_THRESHOLD = 2046;
const TARO_RUNTIME = "Taro runtime";
const HOOKS_APP_ID$1 = "taro-app";
const SET_DATA = "小程序 setData";
const PAGE_INIT = "页面初始化";
const ROOT_STR = "root";
const HTML = "html";
const HEAD = "head";
const BODY = "body";
const APP = "app";
const CONTAINER = "container";
const DOCUMENT_ELEMENT_NAME = "#document";
const DOCUMENT_FRAGMENT = "document-fragment";
const ID = "id";
const UID = "uid";
const CLASS = "class";
const STYLE = "style";
const FOCUS = "focus";
const VIEW = "view";
const STATIC_VIEW = "static-view";
const PURE_VIEW = "pure-view";
const CLICK_VIEW = "click-view";
const PROPS = "props";
const DATASET = "dataset";
const OBJECT = "object";
const VALUE = "value";
const INPUT = "input";
const CHANGE = "change";
const CUSTOM_WRAPPER = "custom-wrapper";
const TARGET = "target";
const CURRENT_TARGET = "currentTarget";
const TYPE = "type";
const CONFIRM = "confirm";
const TIME_STAMP = "timeStamp";
const KEY_CODE = "keyCode";
const TOUCHMOVE = "touchmove";
const DATE = "Date";
const SET_TIMEOUT = "setTimeout";
const COMPILE_MODE = "compileMode";
const CATCHMOVE = "catchMove";
const CATCH_VIEW = "catch-view";
const COMMENT = "comment";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const OPTIONS = "options";
const EXTERNAL_CLASSES = "externalClasses";
const EVENT_CALLBACK_RESULT = "e_result";
const BEHAVIORS = "behaviors";
const A$1 = "a";
var CONTEXT_ACTIONS;
(function(CONTEXT_ACTIONS2) {
  CONTEXT_ACTIONS2["INIT"] = "0";
  CONTEXT_ACTIONS2["RESTORE"] = "1";
  CONTEXT_ACTIONS2["RECOVER"] = "2";
  CONTEXT_ACTIONS2["DESTROY"] = "3";
})(CONTEXT_ACTIONS || (CONTEXT_ACTIONS = {}));
const observers = [];
const sidMatches = (observerTarget, target) => {
  return !!observerTarget && observerTarget.sid === (target === null || target === void 0 ? void 0 : target.sid);
};
const isConcerned = (record, options2) => {
  const {
    characterData,
    characterDataOldValue,
    attributes,
    attributeOldValue,
    childList
  } = options2;
  switch (record.type) {
    case "characterData":
      if (characterData) {
        if (!characterDataOldValue)
          record.oldValue = null;
        return true;
      }
      return false;
    case "attributes":
      if (attributes) {
        if (!attributeOldValue)
          record.oldValue = null;
        return true;
      }
      return false;
    case "childList":
      if (childList) {
        return true;
      }
      return false;
  }
};
let pendingMuatations = false;
function logMutation(observer, record) {
  observer.records.push(record);
  if (!pendingMuatations) {
    pendingMuatations = true;
    Promise.resolve().then(() => {
      pendingMuatations = false;
      observers.forEach((observer2) => {
        return observer2.callback(observer2.takeRecords());
      });
    });
  }
}
function recordMutation(record) {
  observers.forEach((observer) => {
    const {
      options: options2
    } = observer;
    for (let t2 = record.target; t2; t2 = t2.parentNode) {
      if (sidMatches(observer.target, t2) && isConcerned(record, options2)) {
        logMutation(observer, record);
        break;
      }
      if (!options2.subtree)
        break;
    }
  });
}
class MutationObserver {
  constructor(callback) {
    {
      {
        console.warn("[Taro Warning] 若要使用 MutationObserver，请在 Taro 编译配置中设置 'mini.runtime.enableMutationObserver: true'");
      }
      this.core = {
        observe: noop,
        disconnect: noop,
        takeRecords: noop
      };
    }
  }
  observe(...args) {
    this.core.observe(...args);
  }
  disconnect() {
    this.core.disconnect();
  }
  takeRecords() {
    return this.core.takeRecords();
  }
  static record(record) {
    recordMutation(record);
  }
}
const eventCenter = hooks.call("getEventCenter", Events);
const env = {
  window: EMPTY_OBJ,
  document: EMPTY_OBJ
};
const taroGetComputedStyleProvider = function(element) {
  return element.style;
};
function __classPrivateFieldGet(receiver, state, kind, f2) {
  if (kind === "a" && !f2)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f2 : kind === "a" ? f2.call(receiver) : f2 ? f2.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f2) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f2)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f2 : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f2.call(receiver, value) : f2 ? f2.value = value : state.set(receiver, value), value;
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
class RuntimeCache {
  constructor(name) {
    this.cache = /* @__PURE__ */ new Map();
    this.name = name;
  }
  has(identifier) {
    return this.cache.has(identifier);
  }
  set(identifier, ctx) {
    if (identifier && ctx) {
      this.cache.set(identifier, ctx);
    }
  }
  get(identifier) {
    if (this.has(identifier))
      return this.cache.get(identifier);
  }
  delete(identifier) {
    this.cache.delete(identifier);
  }
}
var _TaroHistory_instances, _TaroHistory_location, _TaroHistory_stack, _TaroHistory_cur, _TaroHistory_window, _TaroHistory_reset;
const cache$1 = new RuntimeCache("history");
class TaroHistory extends Events {
  constructor(location, options2) {
    super();
    _TaroHistory_instances.add(this);
    _TaroHistory_location.set(this, void 0);
    _TaroHistory_stack.set(this, []);
    _TaroHistory_cur.set(this, 0);
    _TaroHistory_window.set(this, void 0);
    __classPrivateFieldSet(this, _TaroHistory_window, options2.window, "f");
    __classPrivateFieldSet(this, _TaroHistory_location, location, "f");
    __classPrivateFieldGet(this, _TaroHistory_location, "f").on("__record_history__", (href) => {
      var _a2;
      __classPrivateFieldSet(this, _TaroHistory_cur, (_a2 = __classPrivateFieldGet(this, _TaroHistory_cur, "f"), _a2++, _a2), "f");
      __classPrivateFieldSet(this, _TaroHistory_stack, __classPrivateFieldGet(this, _TaroHistory_stack, "f").slice(0, __classPrivateFieldGet(this, _TaroHistory_cur, "f")), "f");
      __classPrivateFieldGet(this, _TaroHistory_stack, "f").push({
        state: null,
        title: "",
        url: href
      });
    }, null);
    __classPrivateFieldGet(this, _TaroHistory_location, "f").on("__reset_history__", (href) => {
      __classPrivateFieldGet(this, _TaroHistory_instances, "m", _TaroHistory_reset).call(this, href);
    }, null);
    this.on(CONTEXT_ACTIONS.INIT, () => {
      __classPrivateFieldGet(this, _TaroHistory_instances, "m", _TaroHistory_reset).call(this);
    }, null);
    this.on(CONTEXT_ACTIONS.RESTORE, (pageId2) => {
      cache$1.set(pageId2, {
        location: __classPrivateFieldGet(this, _TaroHistory_location, "f"),
        stack: __classPrivateFieldGet(this, _TaroHistory_stack, "f").slice(),
        cur: __classPrivateFieldGet(this, _TaroHistory_cur, "f")
      });
    }, null);
    this.on(CONTEXT_ACTIONS.RECOVER, (pageId2) => {
      if (cache$1.has(pageId2)) {
        const ctx = cache$1.get(pageId2);
        __classPrivateFieldSet(this, _TaroHistory_location, ctx.location, "f");
        __classPrivateFieldSet(this, _TaroHistory_stack, ctx.stack, "f");
        __classPrivateFieldSet(this, _TaroHistory_cur, ctx.cur, "f");
      }
    }, null);
    this.on(CONTEXT_ACTIONS.DESTROY, (pageId2) => {
      cache$1.delete(pageId2);
    }, null);
    __classPrivateFieldGet(this, _TaroHistory_instances, "m", _TaroHistory_reset).call(this);
  }
  /* public property */
  get length() {
    return __classPrivateFieldGet(this, _TaroHistory_stack, "f").length;
  }
  get state() {
    return __classPrivateFieldGet(this, _TaroHistory_stack, "f")[__classPrivateFieldGet(this, _TaroHistory_cur, "f")].state;
  }
  /* public method */
  go(delta) {
    if (!isNumber(delta) || isNaN(delta))
      return;
    let targetIdx = __classPrivateFieldGet(this, _TaroHistory_cur, "f") + delta;
    targetIdx = Math.min(Math.max(targetIdx, 0), this.length - 1);
    __classPrivateFieldSet(this, _TaroHistory_cur, targetIdx, "f");
    __classPrivateFieldGet(this, _TaroHistory_location, "f").trigger("__set_href_without_history__", __classPrivateFieldGet(this, _TaroHistory_stack, "f")[__classPrivateFieldGet(this, _TaroHistory_cur, "f")].url);
    __classPrivateFieldGet(this, _TaroHistory_window, "f").trigger("popstate", __classPrivateFieldGet(this, _TaroHistory_stack, "f")[__classPrivateFieldGet(this, _TaroHistory_cur, "f")]);
  }
  back() {
    this.go(-1);
  }
  forward() {
    this.go(1);
  }
  pushState(state, title, url) {
    if (!url || !isString(url))
      return;
    __classPrivateFieldSet(this, _TaroHistory_stack, __classPrivateFieldGet(this, _TaroHistory_stack, "f").slice(0, __classPrivateFieldGet(this, _TaroHistory_cur, "f") + 1), "f");
    __classPrivateFieldGet(this, _TaroHistory_stack, "f").push({
      state,
      title,
      url
    });
    __classPrivateFieldSet(this, _TaroHistory_cur, this.length - 1, "f");
    __classPrivateFieldGet(this, _TaroHistory_location, "f").trigger("__set_href_without_history__", url);
  }
  replaceState(state, title, url) {
    if (!url || !isString(url))
      return;
    __classPrivateFieldGet(this, _TaroHistory_stack, "f")[__classPrivateFieldGet(this, _TaroHistory_cur, "f")] = {
      state,
      title,
      url
    };
    __classPrivateFieldGet(this, _TaroHistory_location, "f").trigger("__set_href_without_history__", url);
  }
  // For debug
  get cache() {
    return cache$1;
  }
}
_TaroHistory_location = /* @__PURE__ */ new WeakMap(), _TaroHistory_stack = /* @__PURE__ */ new WeakMap(), _TaroHistory_cur = /* @__PURE__ */ new WeakMap(), _TaroHistory_window = /* @__PURE__ */ new WeakMap(), _TaroHistory_instances = /* @__PURE__ */ new WeakSet(), _TaroHistory_reset = function _TaroHistory_reset2(href = "") {
  __classPrivateFieldSet(this, _TaroHistory_stack, [{
    state: null,
    title: "",
    url: href || __classPrivateFieldGet(this, _TaroHistory_location, "f").href
  }], "f");
  __classPrivateFieldSet(this, _TaroHistory_cur, 0, "f");
};
const History = TaroHistory;
const Current = {
  app: null,
  router: null,
  page: null
};
const getCurrentInstance = () => Current;
var _dict, _a;
const findReg = /[!'()~]|%20|%00/g;
const plusReg = /\+/g;
const replaceCharMap = {
  "!": "%21",
  "'": "%27",
  "(": "%28",
  ")": "%29",
  "~": "%7E",
  "%20": "+",
  "%00": "\0"
};
function replacer(match) {
  return replaceCharMap[match];
}
function appendTo(dict, name, value) {
  const res = isArray(value) ? value.join(",") : value;
  if (name in dict)
    dict[name].push(res);
  else
    dict[name] = [res];
}
function addEach(value, key) {
  appendTo(this, key, value);
}
function decode(str) {
  return decodeURIComponent(str.replace(plusReg, " "));
}
function encode(str) {
  return encodeURIComponent(str).replace(findReg, replacer);
}
const URLSearchParams = (_a = class {
  constructor(query) {
    _dict.set(this, /* @__PURE__ */ Object.create(null));
    query !== null && query !== void 0 ? query : query = "";
    const dict = __classPrivateFieldGet(this, _dict, "f");
    if (typeof query === "string") {
      if (query.charAt(0) === "?") {
        query = query.slice(1);
      }
      for (let pairs = query.split("&"), i = 0, length = pairs.length; i < length; i++) {
        const value = pairs[i];
        const index2 = value.indexOf("=");
        try {
          if (index2 > -1) {
            appendTo(dict, decode(value.slice(0, index2)), decode(value.slice(index2 + 1)));
          } else if (value.length) {
            appendTo(dict, decode(value), "");
          }
        } catch (err) {
          {
            console.warn(`[Taro warn] URL 参数 ${value} decode 异常`);
          }
        }
      }
    } else {
      if (isArray(query)) {
        for (let i = 0, length = query.length; i < length; i++) {
          const value = query[i];
          appendTo(dict, value[0], value[1]);
        }
      } else if (query.forEach) {
        query.forEach(addEach, dict);
      } else {
        for (const key in query) {
          appendTo(dict, key, query[key]);
        }
      }
    }
  }
  append(name, value) {
    appendTo(__classPrivateFieldGet(this, _dict, "f"), name, value);
  }
  delete(name) {
    delete __classPrivateFieldGet(this, _dict, "f")[name];
  }
  get(name) {
    const dict = __classPrivateFieldGet(this, _dict, "f");
    return name in dict ? dict[name][0] : null;
  }
  getAll(name) {
    const dict = __classPrivateFieldGet(this, _dict, "f");
    return name in dict ? dict[name].slice(0) : [];
  }
  has(name) {
    return name in __classPrivateFieldGet(this, _dict, "f");
  }
  keys() {
    return Object.keys(__classPrivateFieldGet(this, _dict, "f"));
  }
  set(name, value) {
    __classPrivateFieldGet(this, _dict, "f")[name] = ["" + value];
  }
  forEach(callback, thisArg) {
    const dict = __classPrivateFieldGet(this, _dict, "f");
    Object.getOwnPropertyNames(dict).forEach(function(name) {
      dict[name].forEach(function(value) {
        callback.call(thisArg, value, name, this);
      }, this);
    }, this);
  }
  toJSON() {
    return {};
  }
  toString() {
    const dict = __classPrivateFieldGet(this, _dict, "f");
    const query = [];
    for (const key in dict) {
      const name = encode(key);
      for (let i = 0, value = dict[key]; i < value.length; i++) {
        query.push(name + "=" + encode(value[i]));
      }
    }
    return query.join("&");
  }
}, _dict = /* @__PURE__ */ new WeakMap(), _a);
var _TaroURL_hash, _TaroURL_hostname, _TaroURL_pathname, _TaroURL_port, _TaroURL_protocol, _TaroURL_search;
class TaroURL {
  static createObjectURL() {
    throw new Error("Oops, not support URL.createObjectURL() in miniprogram.");
  }
  static revokeObjectURL() {
    throw new Error("Oops, not support URL.revokeObjectURL() in miniprogram.");
  }
  constructor(url, base) {
    _TaroURL_hash.set(this, "");
    _TaroURL_hostname.set(this, "");
    _TaroURL_pathname.set(this, "");
    _TaroURL_port.set(this, "");
    _TaroURL_protocol.set(this, "");
    _TaroURL_search.set(this, void 0);
    if (!isString(url))
      url = String(url);
    const parseResult = parseUrlBase(url, base);
    const {
      hash,
      hostname,
      pathname,
      port,
      protocol,
      search
    } = parseResult;
    __classPrivateFieldSet(this, _TaroURL_hash, hash, "f");
    __classPrivateFieldSet(this, _TaroURL_hostname, hostname, "f");
    __classPrivateFieldSet(this, _TaroURL_pathname, pathname || "/", "f");
    __classPrivateFieldSet(this, _TaroURL_port, port, "f");
    __classPrivateFieldSet(this, _TaroURL_protocol, protocol, "f");
    __classPrivateFieldSet(this, _TaroURL_search, new URLSearchParams(search), "f");
  }
  /* public property */
  get protocol() {
    return __classPrivateFieldGet(this, _TaroURL_protocol, "f");
  }
  set protocol(val) {
    isString(val) && __classPrivateFieldSet(this, _TaroURL_protocol, val.trim(), "f");
  }
  get host() {
    return this.hostname + (this.port ? ":" + this.port : "");
  }
  set host(val) {
    if (val && isString(val)) {
      val = val.trim();
      const {
        hostname,
        port
      } = parseUrl(`//${val}`);
      this.hostname = hostname;
      this.port = port;
    }
  }
  get hostname() {
    return __classPrivateFieldGet(this, _TaroURL_hostname, "f");
  }
  set hostname(val) {
    val && isString(val) && __classPrivateFieldSet(this, _TaroURL_hostname, val.trim(), "f");
  }
  get port() {
    return __classPrivateFieldGet(this, _TaroURL_port, "f");
  }
  set port(val) {
    isString(val) && __classPrivateFieldSet(this, _TaroURL_port, val.trim(), "f");
  }
  get pathname() {
    return __classPrivateFieldGet(this, _TaroURL_pathname, "f");
  }
  set pathname(val) {
    if (isString(val)) {
      val = val.trim();
      const HEAD_REG = /^(\/|\.\/|\.\.\/)/;
      let temp = val;
      while (HEAD_REG.test(temp)) {
        temp = temp.replace(HEAD_REG, "");
      }
      if (temp)
        __classPrivateFieldSet(this, _TaroURL_pathname, "/" + temp, "f");
      else
        __classPrivateFieldSet(this, _TaroURL_pathname, "/", "f");
    }
  }
  get search() {
    const val = __classPrivateFieldGet(this, _TaroURL_search, "f").toString();
    return val.length === 0 || val.startsWith("?") ? val : `?${val}`;
  }
  set search(val) {
    if (isString(val)) {
      val = val.trim();
      __classPrivateFieldSet(this, _TaroURL_search, new URLSearchParams(val), "f");
    }
  }
  get hash() {
    return __classPrivateFieldGet(this, _TaroURL_hash, "f");
  }
  set hash(val) {
    if (isString(val)) {
      val = val.trim();
      if (val)
        __classPrivateFieldSet(this, _TaroURL_hash, val.startsWith("#") ? val : `#${val}`, "f");
      else
        __classPrivateFieldSet(this, _TaroURL_hash, "", "f");
    }
  }
  get href() {
    return `${this.protocol}//${this.host}${this.pathname}${this.search}${this.hash}`;
  }
  set href(val) {
    if (val && isString(val)) {
      val = val.trim();
      const {
        protocol,
        hostname,
        port,
        hash,
        search,
        pathname
      } = parseUrl(val);
      this.protocol = protocol;
      this.hostname = hostname;
      this.pathname = pathname;
      this.port = port;
      this.hash = hash;
      this.search = search;
    }
  }
  get origin() {
    return `${this.protocol}//${this.host}`;
  }
  set origin(val) {
    if (val && isString(val)) {
      val = val.trim();
      const {
        protocol,
        hostname,
        port
      } = parseUrl(val);
      this.protocol = protocol;
      this.hostname = hostname;
      this.port = port;
    }
  }
  get searchParams() {
    return __classPrivateFieldGet(this, _TaroURL_search, "f");
  }
  // public method
  toString() {
    return this.href;
  }
  toJSON() {
    return this.toString();
  }
  // convenient for deconstructor
  _toRaw() {
    return {
      protocol: this.protocol,
      port: this.port,
      host: this.host,
      hostname: this.hostname,
      pathname: this.pathname,
      hash: this.hash,
      search: this.search,
      origin: this.origin,
      href: this.href
    };
  }
}
_TaroURL_hash = /* @__PURE__ */ new WeakMap(), _TaroURL_hostname = /* @__PURE__ */ new WeakMap(), _TaroURL_pathname = /* @__PURE__ */ new WeakMap(), _TaroURL_port = /* @__PURE__ */ new WeakMap(), _TaroURL_protocol = /* @__PURE__ */ new WeakMap(), _TaroURL_search = /* @__PURE__ */ new WeakMap();
const TaroURLProvider = TaroURL;
function parseUrl(url = "") {
  const result = {
    href: "",
    origin: "",
    protocol: "",
    hostname: "",
    host: "",
    port: "",
    pathname: "",
    search: "",
    hash: ""
  };
  if (!url || !isString(url))
    return result;
  url = url.trim();
  const PATTERN = /^(([^:/?#]+):)?\/\/(([^/?#]+):(.+)@)?([^/?#:]*)(:(\d+))?([^?#]*)(\?([^#]*))?(#(.*))?/;
  const matches = url.match(PATTERN);
  if (!matches)
    return result;
  result.protocol = matches[1] || "https:";
  result.hostname = matches[6] || "taro.com";
  result.port = matches[8] || "";
  result.pathname = matches[9] || "/";
  result.search = matches[10] || "";
  result.hash = matches[12] || "";
  result.href = url;
  result.origin = result.protocol + "//" + result.hostname + (result.port ? `:${result.port}` : "");
  result.host = result.hostname + (result.port ? `:${result.port}` : "");
  return result;
}
function parseUrlBase(url, base) {
  const VALID_URL = /^(https?:)\/\//i;
  let fullUrl = "";
  let parsedBase = null;
  if (!isUndefined(base)) {
    base = String(base).trim();
    if (!VALID_URL.test(base))
      throw new TypeError(`Failed to construct 'URL': Invalid base URL`);
    parsedBase = parseUrl(base);
  }
  url = String(url).trim();
  if (VALID_URL.test(url)) {
    fullUrl = url;
  } else if (parsedBase) {
    if (url) {
      if (url.startsWith("//")) {
        fullUrl = parsedBase.protocol + url;
      } else {
        fullUrl = parsedBase.origin + (url.startsWith("/") ? url : `/${url}`);
      }
    } else {
      fullUrl = parsedBase.href;
    }
  } else {
    throw new TypeError(`Failed to construct 'URL': Invalid URL`);
  }
  return parseUrl(fullUrl);
}
var _TaroLocation_instances, _TaroLocation_url, _TaroLocation_noCheckUrl, _TaroLocation_window, _TaroLocation_reset, _TaroLocation_getPreValue, _TaroLocation_rollBack, _TaroLocation_recordHistory, _TaroLocation_checkUrlChange;
const INIT_URL = "https://taro.com";
const cache = new RuntimeCache("location");
class TaroLocation extends Events {
  constructor(options2) {
    super();
    _TaroLocation_instances.add(this);
    _TaroLocation_url.set(this, new TaroURLProvider(INIT_URL));
    _TaroLocation_noCheckUrl.set(this, false);
    _TaroLocation_window.set(this, void 0);
    __classPrivateFieldSet(this, _TaroLocation_window, options2.window, "f");
    __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_reset).call(this);
    this.on("__set_href_without_history__", (href) => {
      __classPrivateFieldSet(this, _TaroLocation_noCheckUrl, true, "f");
      const lastHash = __classPrivateFieldGet(this, _TaroLocation_url, "f").hash;
      __classPrivateFieldGet(this, _TaroLocation_url, "f").href = generateFullUrl(href);
      if (lastHash !== __classPrivateFieldGet(this, _TaroLocation_url, "f").hash) {
        __classPrivateFieldGet(this, _TaroLocation_window, "f").trigger("hashchange");
      }
      __classPrivateFieldSet(this, _TaroLocation_noCheckUrl, false, "f");
    }, null);
    this.on(CONTEXT_ACTIONS.INIT, () => {
      __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_reset).call(this);
    }, null);
    this.on(CONTEXT_ACTIONS.RESTORE, (pageId2) => {
      cache.set(pageId2, {
        lastHref: this.href
      });
    }, null);
    this.on(CONTEXT_ACTIONS.RECOVER, (pageId2) => {
      if (cache.has(pageId2)) {
        const ctx = cache.get(pageId2);
        __classPrivateFieldSet(this, _TaroLocation_noCheckUrl, true, "f");
        __classPrivateFieldGet(this, _TaroLocation_url, "f").href = ctx.lastHref;
        __classPrivateFieldSet(this, _TaroLocation_noCheckUrl, false, "f");
      }
    }, null);
    this.on(CONTEXT_ACTIONS.DESTROY, (pageId2) => {
      cache.delete(pageId2);
    }, null);
  }
  /* public property */
  get protocol() {
    return __classPrivateFieldGet(this, _TaroLocation_url, "f").protocol;
  }
  set protocol(val) {
    const REG = /^(http|https):$/i;
    if (!val || !isString(val) || !REG.test(val.trim()))
      return;
    val = val.trim();
    const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
    __classPrivateFieldGet(this, _TaroLocation_url, "f").protocol = val;
    if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
      __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
  }
  get host() {
    return __classPrivateFieldGet(this, _TaroLocation_url, "f").host;
  }
  set host(val) {
    if (!val || !isString(val))
      return;
    val = val.trim();
    const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
    __classPrivateFieldGet(this, _TaroLocation_url, "f").host = val;
    if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
      __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
  }
  get hostname() {
    return __classPrivateFieldGet(this, _TaroLocation_url, "f").hostname;
  }
  set hostname(val) {
    if (!val || !isString(val))
      return;
    val = val.trim();
    const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
    __classPrivateFieldGet(this, _TaroLocation_url, "f").hostname = val;
    if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
      __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
  }
  get port() {
    return __classPrivateFieldGet(this, _TaroLocation_url, "f").port;
  }
  set port(val) {
    const xVal = Number(val = val.trim());
    if (!isNumber(xVal) || xVal <= 0)
      return;
    const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
    __classPrivateFieldGet(this, _TaroLocation_url, "f").port = val;
    if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
      __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
  }
  get pathname() {
    return __classPrivateFieldGet(this, _TaroLocation_url, "f").pathname;
  }
  set pathname(val) {
    if (!val || !isString(val))
      return;
    val = val.trim();
    const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
    __classPrivateFieldGet(this, _TaroLocation_url, "f").pathname = val;
    if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
      __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
  }
  get search() {
    return __classPrivateFieldGet(this, _TaroLocation_url, "f").search;
  }
  set search(val) {
    if (!val || !isString(val))
      return;
    val = val.trim();
    val = val.startsWith("?") ? val : `?${val}`;
    const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
    __classPrivateFieldGet(this, _TaroLocation_url, "f").search = val;
    if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
      __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
  }
  get hash() {
    return __classPrivateFieldGet(this, _TaroLocation_url, "f").hash;
  }
  // 小程序的navigateTo存在截断hash字符串的问题
  set hash(val) {
    if (!val || !isString(val))
      return;
    val = val.trim();
    val = val.startsWith("#") ? val : `#${val}`;
    const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
    __classPrivateFieldGet(this, _TaroLocation_url, "f").hash = val;
    if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
      __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
  }
  get href() {
    return __classPrivateFieldGet(this, _TaroLocation_url, "f").href;
  }
  set href(val) {
    const REG = /^(http:|https:)?\/\/.+/;
    if (!val || !isString(val) || !REG.test(val = val.trim()))
      return;
    const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
    __classPrivateFieldGet(this, _TaroLocation_url, "f").href = val;
    if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
      __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
  }
  get origin() {
    return __classPrivateFieldGet(this, _TaroLocation_url, "f").origin;
  }
  set origin(val) {
    const REG = /^(http:|https:)?\/\/.+/;
    if (!val || !isString(val) || !REG.test(val = val.trim()))
      return;
    const preValue = __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_getPreValue).call(this);
    __classPrivateFieldGet(this, _TaroLocation_url, "f").origin = val;
    if (__classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_checkUrlChange).call(this, preValue))
      __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_recordHistory).call(this);
  }
  /* public method */
  assign() {
    warn(true, "小程序环境中调用location.assign()无效.");
  }
  reload() {
    warn(true, "小程序环境中调用location.reload()无效.");
  }
  replace(url) {
    this.trigger("__set_href_without_history__", url);
  }
  toString() {
    return this.href;
  }
  // For debug
  get cache() {
    return cache;
  }
}
_TaroLocation_url = /* @__PURE__ */ new WeakMap(), _TaroLocation_noCheckUrl = /* @__PURE__ */ new WeakMap(), _TaroLocation_window = /* @__PURE__ */ new WeakMap(), _TaroLocation_instances = /* @__PURE__ */ new WeakSet(), _TaroLocation_reset = function _TaroLocation_reset2() {
  const Current2 = getCurrentInstance();
  const router = Current2.router;
  if (router) {
    const {
      path,
      params
    } = router;
    const searchArr = Object.keys(params).map((key) => {
      return `${key}=${params[key]}`;
    });
    const searchStr = searchArr.length > 0 ? "?" + searchArr.join("&") : "";
    const url = `${INIT_URL}${path.startsWith("/") ? path : "/" + path}${searchStr}`;
    __classPrivateFieldSet(this, _TaroLocation_url, new TaroURLProvider(url), "f");
    this.trigger("__reset_history__", this.href);
  }
}, _TaroLocation_getPreValue = function _TaroLocation_getPreValue2() {
  return __classPrivateFieldGet(this, _TaroLocation_url, "f")._toRaw();
}, _TaroLocation_rollBack = function _TaroLocation_rollBack2(href) {
  __classPrivateFieldGet(this, _TaroLocation_url, "f").href = href;
}, _TaroLocation_recordHistory = function _TaroLocation_recordHistory2() {
  this.trigger("__record_history__", this.href);
}, _TaroLocation_checkUrlChange = function _TaroLocation_checkUrlChange2(preValue) {
  if (__classPrivateFieldGet(this, _TaroLocation_noCheckUrl, "f")) {
    return false;
  }
  const {
    protocol,
    hostname,
    port,
    pathname,
    search,
    hash
  } = __classPrivateFieldGet(this, _TaroLocation_url, "f")._toRaw();
  if (protocol !== preValue.protocol || hostname !== preValue.hostname || port !== preValue.port) {
    __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_rollBack).call(this, preValue.href);
    return false;
  }
  if (pathname !== preValue.pathname) {
    return true;
  }
  if (search !== preValue.search) {
    return true;
  }
  if (hash !== preValue.hash) {
    __classPrivateFieldGet(this, _TaroLocation_window, "f").trigger("hashchange");
    return true;
  }
  __classPrivateFieldGet(this, _TaroLocation_instances, "m", _TaroLocation_rollBack).call(this, preValue.href);
  return false;
};
const Location = TaroLocation;
function generateFullUrl(val = "") {
  const origin = INIT_URL;
  if (/^[/?#]/.test(val)) {
    return origin + val;
  }
  return val;
}
const machine = "Macintosh";
const arch = "Intel Mac OS X 10_14_5";
const engine = "AppleWebKit/534.36 (KHTML, like Gecko) NodeJS/v4.1.0 Chrome/76.0.3809.132 Safari/534.36";
const msg = "(" + machine + "; " + arch + ") " + engine;
const nav = {
  appCodeName: "Mozilla",
  appName: "Netscape",
  appVersion: "5.0 " + msg,
  cookieEnabled: true,
  mimeTypes: [],
  onLine: true,
  platform: "MacIntel",
  plugins: [],
  product: "Taro",
  productSub: "20030107",
  userAgent: "Mozilla/5.0 " + msg,
  vendor: "Joyent",
  vendorSub: ""
};
let now;
(function() {
  let loadTime;
  if (typeof performance !== "undefined" && performance !== null && performance.now) {
    now = () => performance.now();
  } else if (Date.now) {
    loadTime = Date.now();
    now = () => Date.now() - loadTime;
  } else {
    loadTime = (/* @__PURE__ */ new Date()).getTime();
    now = () => (/* @__PURE__ */ new Date()).getTime() - loadTime;
  }
})();
let lastTime = 0;
const _raf = function(callback) {
  const _now = now();
  const nextTime = Math.max(lastTime + 16, _now);
  return setTimeout(function() {
    callback(lastTime = nextTime);
  }, nextTime - _now);
};
const _caf = function(seed) {
  clearTimeout(seed);
};
class TaroWindow extends Events {
  constructor() {
    super();
    this.navigator = nav;
    this.requestAnimationFrame = _raf;
    this.cancelAnimationFrame = _caf;
    this.getComputedStyle = taroGetComputedStyleProvider;
    const globalProperties = [...Object.getOwnPropertyNames(global || {}), ...Object.getOwnPropertySymbols(global || {})];
    globalProperties.forEach((property) => {
      if (property === "atob" || property === "document")
        return;
      if (!Object.prototype.hasOwnProperty.call(this, property)) {
        try {
          this[property] = global[property];
        } catch (e) {
          {
            console.warn(`[Taro warn] window.${String(property)} 在赋值到 window 时报错`);
          }
        }
      }
    });
    this.Date || (this.Date = Date);
    this.location = new Location({
      window: this
    });
    this.history = new History(this.location, {
      window: this
    });
    this.initEvent();
  }
  initEvent() {
    const _location = this.location;
    const _history = this.history;
    this.on(CONTEXT_ACTIONS.INIT, (pageId2) => {
      _location.trigger(CONTEXT_ACTIONS.INIT, pageId2);
    }, null);
    this.on(CONTEXT_ACTIONS.RECOVER, (pageId2) => {
      _location.trigger(CONTEXT_ACTIONS.RECOVER, pageId2);
      _history.trigger(CONTEXT_ACTIONS.RECOVER, pageId2);
    }, null);
    this.on(CONTEXT_ACTIONS.RESTORE, (pageId2) => {
      _location.trigger(CONTEXT_ACTIONS.RESTORE, pageId2);
      _history.trigger(CONTEXT_ACTIONS.RESTORE, pageId2);
    }, null);
    this.on(CONTEXT_ACTIONS.DESTROY, (pageId2) => {
      _location.trigger(CONTEXT_ACTIONS.DESTROY, pageId2);
      _history.trigger(CONTEXT_ACTIONS.DESTROY, pageId2);
    }, null);
  }
  get document() {
    return env.document;
  }
  addEventListener(event, callback) {
    if (!isString(event))
      return;
    this.on(event, callback, null);
  }
  removeEventListener(event, callback) {
    if (!isString(event))
      return;
    this.off(event, callback, null);
  }
  setTimeout(...args) {
    return setTimeout(...args);
  }
  clearTimeout(...args) {
    return clearTimeout(...args);
  }
}
const taroWindowProvider = env.window = new TaroWindow();
const taroLocationProvider = taroWindowProvider.location;
const taroHistoryProvider = taroWindowProvider.history;
const incrementId = () => {
  const chatCodes = [];
  for (let i = 65; i <= 90; i++) {
    chatCodes.push(i);
  }
  for (let i = 97; i <= 122; i++) {
    chatCodes.push(i);
  }
  const chatCodesLen = chatCodes.length - 1;
  const list = [0, 0];
  return () => {
    const target = list.map((item) => chatCodes[item]);
    const res = String.fromCharCode(...target);
    let tailIdx = list.length - 1;
    list[tailIdx]++;
    while (list[tailIdx] > chatCodesLen) {
      list[tailIdx] = 0;
      tailIdx = tailIdx - 1;
      if (tailIdx < 0) {
        list.push(0);
        break;
      }
      list[tailIdx]++;
    }
    return res;
  };
};
function isElement(node) {
  return node.nodeType === 1;
}
function isText(node) {
  return node.nodeType === 3;
}
function isComment(node) {
  return node.nodeName === COMMENT;
}
function isHasExtractProp(el) {
  const res = Object.keys(el.props).find((prop) => {
    return !(/^(class|style|id)$/.test(prop) || prop.startsWith("data-"));
  });
  return Boolean(res);
}
function isParentBound(node, type) {
  var _a2;
  while (node = (node === null || node === void 0 ? void 0 : node.parentElement) || null) {
    if (!node || node.nodeName === ROOT_STR || node.nodeName === "root-portal") {
      return false;
    } else if ((_a2 = node.__handlers[type]) === null || _a2 === void 0 ? void 0 : _a2.length) {
      return true;
    }
  }
  return false;
}
function shortcutAttr(key) {
  switch (key) {
    case STYLE:
      return "st";
    case ID:
      return UID;
    case CLASS:
      return "cl";
    default:
      return key;
  }
}
const customWrapperCache = /* @__PURE__ */ new Map();
function extend(ctor, methodName, options2) {
  if (isFunction(options2)) {
    options2 = {
      value: options2
    };
  }
  Object.defineProperty(ctor.prototype, methodName, Object.assign({
    configurable: true,
    enumerable: true
  }, options2));
}
let componentsAlias$1;
function getComponentsAlias() {
  if (!componentsAlias$1) {
    componentsAlias$1 = getComponentsAlias$1(internalComponents);
  }
  return componentsAlias$1;
}
function convertNumber2PX(value) {
  return value + "px";
}
class ClassList {
  constructor(className, el) {
    this.tokenList = [];
    this.el = el;
    className.trim().split(/\s+/).forEach((token) => this.tokenList.push(token));
  }
  get value() {
    return this.toString();
  }
  get length() {
    return this.tokenList.length;
  }
  add() {
    let index2 = 0;
    let updated = false;
    const tokens = arguments;
    const length = tokens.length;
    const tokenList = this.tokenList;
    do {
      const token = tokens[index2];
      if (this.checkTokenIsValid(token) && !~tokenList.indexOf(token)) {
        tokenList.push(token);
        updated = true;
      }
    } while (++index2 < length);
    if (updated) {
      this._update();
    }
  }
  remove() {
    let i = 0;
    let updated = false;
    const tokens = arguments;
    const length = tokens.length;
    const tokenList = this.tokenList;
    do {
      const token = tokens[i] + "";
      if (!this.checkTokenIsValid(token))
        continue;
      const index2 = tokenList.indexOf(token);
      if (~tokenList.indexOf(token)) {
        tokenList.splice(index2, 1);
        updated = true;
      }
    } while (++i < length);
    if (updated) {
      this._update();
    }
  }
  contains(token) {
    if (!this.checkTokenIsValid(token))
      return false;
    return !!~this.tokenList.indexOf(token);
  }
  toggle(token, force) {
    const result = this.contains(token);
    const method = result ? force !== true && "remove" : force !== false && "add";
    if (method) {
      this[method](token);
    }
    if (force === true || force === false) {
      return force;
    } else {
      return !result;
    }
  }
  replace(token, replacement_token) {
    if (!this.checkTokenIsValid(token) || !this.checkTokenIsValid(replacement_token))
      return;
    const index2 = this.tokenList.indexOf(token);
    if (~index2) {
      this.tokenList.splice(index2, 1, replacement_token);
      this._update();
    }
  }
  toString() {
    return this.tokenList.filter((v2) => v2 !== "").join(" ");
  }
  checkTokenIsValid(token) {
    if (token === "" || /\s/.test(token))
      return false;
    return true;
  }
  _update() {
    this.el.className = this.value;
  }
}
class EventSource extends Map {
  removeNode(child) {
    const {
      sid,
      uid
    } = child;
    this.delete(sid);
    if (uid !== sid && uid)
      this.delete(uid);
  }
  removeNodeTree(child) {
    this.removeNode(child);
    const {
      childNodes
    } = child;
    childNodes.forEach((node) => this.removeNodeTree(node));
  }
}
const eventSource = new EventSource();
let SPECIAL_NODES;
let componentsAlias;
function hydrate(node) {
  var _a2;
  componentsAlias || (componentsAlias = getComponentsAlias());
  SPECIAL_NODES || (SPECIAL_NODES = hooks.call("getSpecialNodes"));
  const nodeName = node.nodeName;
  let compileModeName = null;
  if (isText(node)) {
    return {
      sid: node.sid,
      [
        "v"
        /* Shortcuts.Text */
      ]: node.nodeValue,
      [
        "nn"
        /* Shortcuts.NodeName */
      ]: ((_a2 = componentsAlias[nodeName]) === null || _a2 === void 0 ? void 0 : _a2._num) || "8"
    };
  }
  const data = {
    [
      "nn"
      /* Shortcuts.NodeName */
    ]: nodeName,
    sid: node.sid
  };
  if (node.uid !== node.sid) {
    data.uid = node.uid;
  }
  if (SPECIAL_NODES.indexOf(nodeName) > -1) {
    if (!node.isAnyEventBinded()) {
      data[
        "nn"
        /* Shortcuts.NodeName */
      ] = `static-${nodeName}`;
      if (nodeName === VIEW && !isHasExtractProp(node)) {
        data[
          "nn"
          /* Shortcuts.NodeName */
        ] = PURE_VIEW;
      }
    }
    if (nodeName === VIEW && node.isOnlyClickBinded() && !isHasExtractProp(node)) {
      data[
        "nn"
        /* Shortcuts.NodeName */
      ] = CLICK_VIEW;
    }
  }
  const {
    props
  } = node;
  for (const prop in props) {
    const propInCamelCase = toCamelCase(prop);
    if (!prop.startsWith("data-") && // 在 node.dataset 的数据
    prop !== CLASS && prop !== STYLE && prop !== ID && propInCamelCase !== CATCHMOVE && propInCamelCase !== COMPILE_MODE) {
      data[propInCamelCase] = props[prop];
    }
    if (nodeName === VIEW && propInCamelCase === CATCHMOVE && props[prop] !== false) {
      data[
        "nn"
        /* Shortcuts.NodeName */
      ] = CATCH_VIEW;
    }
    if (propInCamelCase === COMPILE_MODE) {
      compileModeName = props[prop];
    }
  }
  data[
    "cn"
    /* Shortcuts.Childnodes */
  ] = node.childNodes.filter((node2) => !isComment(node2)).map(hydrate);
  if (node.className !== "") {
    data[
      "cl"
      /* Shortcuts.Class */
    ] = node.className;
  }
  const cssText = node.cssText;
  if (cssText !== "" && nodeName !== "swiper-item") {
    data[
      "st"
      /* Shortcuts.Style */
    ] = cssText;
  }
  hooks.call("modifyHydrateData", data, node);
  const nn = data[
    "nn"
    /* Shortcuts.NodeName */
  ];
  const componentAlias = componentsAlias[nn];
  if (componentAlias) {
    data[
      "nn"
      /* Shortcuts.NodeName */
    ] = componentAlias._num;
    for (const prop in data) {
      if (prop in componentAlias) {
        data[componentAlias[prop]] = data[prop];
        delete data[prop];
      }
    }
  }
  if (compileModeName !== null) {
    data[
      "nn"
      /* Shortcuts.NodeName */
    ] = compileModeName;
  }
  const resData = hooks.call("transferHydrateData", data, node, componentAlias);
  return resData || data;
}
class TaroEventTarget {
  constructor() {
    this.__handlers = {};
  }
  addEventListener(type, handler, options2) {
    type = type.toLowerCase();
    hooks.call("onAddEvent", type, handler, options2, this);
    if (type === "regionchange") {
      this.addEventListener("begin", handler, options2);
      this.addEventListener("end", handler, options2);
      return;
    }
    let isCapture = Boolean(options2);
    let isOnce = false;
    if (isObject(options2)) {
      isCapture = Boolean(options2.capture);
      isOnce = Boolean(options2.once);
    }
    if (isOnce) {
      const wrapper = function() {
        handler.apply(this, arguments);
        this.removeEventListener(type, wrapper);
      };
      this.addEventListener(type, wrapper, Object.assign(Object.assign({}, options2), {
        once: false
      }));
      return;
    }
    warn(isCapture, "Taro 暂未实现 event 的 capture 特性。");
    const oldHandler = handler;
    handler = function() {
      return oldHandler.apply(this, arguments);
    };
    handler.oldHandler = oldHandler;
    const handlers = this.__handlers[type];
    if (isArray(handlers)) {
      handlers.push(handler);
    } else {
      this.__handlers[type] = [handler];
    }
  }
  removeEventListener(type, handler) {
    type = type.toLowerCase();
    if (type === "regionchange") {
      this.removeEventListener("begin", handler);
      this.removeEventListener("end", handler);
      return;
    }
    if (!handler) {
      return;
    }
    const handlers = this.__handlers[type];
    if (!isArray(handlers)) {
      return;
    }
    const index2 = handlers.findIndex((item) => {
      if (item === handler || item.oldHandler === handler)
        return true;
    });
    warn(index2 === -1, `事件: '${type}' 没有注册在 DOM 中，因此不会被移除。`);
    handlers.splice(index2, 1);
  }
  isAnyEventBinded() {
    const handlers = this.__handlers;
    const isAnyEventBinded = Object.keys(handlers).find((key) => handlers[key].length);
    return Boolean(isAnyEventBinded);
  }
  isOnlyClickBinded() {
    const handlers = this.__handlers;
    const isOnlyClickBinded = handlers.tap && Object.keys(handlers).length === 1;
    return Boolean(isOnlyClickBinded);
  }
}
const CHILDNODES = "cn";
const nodeId = incrementId();
class TaroNode extends TaroEventTarget {
  constructor() {
    super();
    this.parentNode = null;
    this.childNodes = [];
    this.hydrate = (node) => () => hydrate(node);
    this.uid = "_" + nodeId();
    this.sid = this.uid;
    eventSource.set(this.sid, this);
  }
  updateChildNodes(isClean) {
    const cleanChildNodes = () => [];
    const rerenderChildNodes = () => {
      const childNodes = this.childNodes.filter((node) => !isComment(node));
      return childNodes.map(hydrate);
    };
    this.enqueueUpdate({
      path: `${this._path}.${CHILDNODES}`,
      value: isClean ? cleanChildNodes : rerenderChildNodes
    });
  }
  updateSingleChild(index2) {
    this.childNodes.forEach((child, childIndex) => {
      if (isComment(child))
        return;
      if (index2 && childIndex < index2)
        return;
      this.enqueueUpdate({
        path: child._path,
        value: this.hydrate(child)
      });
    });
  }
  get _root() {
    var _a2;
    return ((_a2 = this.parentNode) === null || _a2 === void 0 ? void 0 : _a2._root) || null;
  }
  findIndex(refChild) {
    const index2 = this.childNodes.indexOf(refChild);
    ensure(index2 !== -1, "The node to be replaced is not a child of this node.");
    return index2;
  }
  get _path() {
    const parentNode = this.parentNode;
    if (parentNode) {
      const list = parentNode.childNodes.filter((node) => !isComment(node));
      const indexOfNode = list.indexOf(this);
      const index2 = hooks.call("getPathIndex", indexOfNode);
      return `${parentNode._path}.${CHILDNODES}.${index2}`;
    }
    return "";
  }
  get nextSibling() {
    const parentNode = this.parentNode;
    return (parentNode === null || parentNode === void 0 ? void 0 : parentNode.childNodes[parentNode.findIndex(this) + 1]) || null;
  }
  get previousSibling() {
    const parentNode = this.parentNode;
    return (parentNode === null || parentNode === void 0 ? void 0 : parentNode.childNodes[parentNode.findIndex(this) - 1]) || null;
  }
  get parentElement() {
    const parentNode = this.parentNode;
    if ((parentNode === null || parentNode === void 0 ? void 0 : parentNode.nodeType) === 1) {
      return parentNode;
    }
    return null;
  }
  get firstChild() {
    return this.childNodes[0] || null;
  }
  get lastChild() {
    const childNodes = this.childNodes;
    return childNodes[childNodes.length - 1] || null;
  }
  /**
   * @textContent 目前只能置空子元素
   * @TODO 等待完整 innerHTML 实现
   */
  // eslint-disable-next-line accessor-pairs
  set textContent(text) {
    const removedNodes = this.childNodes.slice();
    const addedNodes = [];
    while (this.firstChild) {
      this.removeChild(this.firstChild, {
        doUpdate: false
      });
    }
    if (text === "") {
      this.updateChildNodes(true);
    } else {
      const newText = env.document.createTextNode(text);
      addedNodes.push(newText);
      this.appendChild(newText);
      this.updateChildNodes();
    }
    MutationObserver.record({
      type: "childList",
      target: this,
      removedNodes,
      addedNodes
    });
  }
  /**
   * @doc https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore
   * @scenario
   * [A,B,C]
   *   1. insert D before C, D has no parent
   *   2. insert D before C, D has the same parent of C
   *   3. insert D before C, D has the different parent of C
   */
  insertBefore(newChild, refChild, isReplace) {
    if (newChild.nodeName === DOCUMENT_FRAGMENT) {
      newChild.childNodes.reduceRight((previousValue, currentValue) => {
        this.insertBefore(currentValue, previousValue);
        return currentValue;
      }, refChild);
      return newChild;
    }
    newChild.remove({
      cleanRef: false
    });
    let index2 = 0;
    newChild.parentNode = this;
    if (refChild) {
      index2 = this.findIndex(refChild);
      this.childNodes.splice(index2, 0, newChild);
    } else {
      this.childNodes.push(newChild);
    }
    const childNodesLength = this.childNodes.length;
    if (this._root) {
      if (!refChild) {
        const isOnlyChild = childNodesLength === 1;
        if (isOnlyChild) {
          this.updateChildNodes();
        } else {
          this.enqueueUpdate({
            path: newChild._path,
            value: this.hydrate(newChild)
          });
        }
      } else if (isReplace) {
        this.enqueueUpdate({
          path: newChild._path,
          value: this.hydrate(newChild)
        });
      } else {
        const mark = childNodesLength * 2 / 3;
        if (mark > index2) {
          this.updateChildNodes();
        } else {
          this.updateSingleChild(index2);
        }
      }
    }
    MutationObserver.record({
      type: "childList",
      target: this,
      addedNodes: [newChild],
      removedNodes: isReplace ? [refChild] : [],
      nextSibling: isReplace ? refChild.nextSibling : refChild || null,
      /** insertBefore & appendChild */
      previousSibling: newChild.previousSibling
    });
    return newChild;
  }
  /**
   * @doc https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild
   * @scenario
   * [A,B,C]
   *   1. append C, C has no parent
   *   2. append C, C has the same parent of B
   *   3. append C, C has the different parent of B
   */
  appendChild(newChild) {
    return this.insertBefore(newChild);
  }
  /**
   * @doc https://developer.mozilla.org/zh-CN/docs/Web/API/Node/replaceChild
   * @scenario
   * [A,B,C]
   *   1. replace B with C, C has no parent
   *   2. replace B with C, C has no parent, C has the same parent of B
   *   3. replace B with C, C has no parent, C has the different parent of B
   */
  replaceChild(newChild, oldChild) {
    if (oldChild.parentNode !== this)
      return;
    this.insertBefore(newChild, oldChild, true);
    oldChild.remove({
      doUpdate: false
    });
    return oldChild;
  }
  /**
   * @doc https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild
   * @scenario
   * [A,B,C]
   *   1. remove A or B
   *   2. remove C
   */
  removeChild(child, options2 = {}) {
    const {
      cleanRef,
      doUpdate
    } = options2;
    if (cleanRef !== false && doUpdate !== false) {
      MutationObserver.record({
        type: "childList",
        target: this,
        removedNodes: [child],
        nextSibling: child.nextSibling,
        previousSibling: child.previousSibling
      });
    }
    const index2 = this.findIndex(child);
    this.childNodes.splice(index2, 1);
    child.parentNode = null;
    if (cleanRef !== false) {
      eventSource.removeNodeTree(child);
    }
    if (this._root && doUpdate !== false) {
      this.updateChildNodes();
    }
    return child;
  }
  remove(options2) {
    var _a2;
    (_a2 = this.parentNode) === null || _a2 === void 0 ? void 0 : _a2.removeChild(this, options2);
  }
  hasChildNodes() {
    return this.childNodes.length > 0;
  }
  enqueueUpdate(payload) {
    var _a2;
    (_a2 = this._root) === null || _a2 === void 0 ? void 0 : _a2.enqueueUpdate(payload);
  }
  get ownerDocument() {
    return env.document;
  }
  static extend(methodName, options2) {
    extend(TaroNode, methodName, options2);
  }
}
const WEBKIT = "webkit";
const styleProperties = [
  "all",
  "appearance",
  "backdropFilter",
  "blockOverflow",
  "blockSize",
  "bottom",
  "clear",
  "contain",
  "content",
  "continue",
  "cursor",
  "direction",
  "display",
  "filter",
  "float",
  "gap",
  "height",
  "inset",
  "isolation",
  "left",
  "letterSpacing",
  "lightingColor",
  "markerSide",
  "mixBlendMode",
  "opacity",
  "order",
  "position",
  "quotes",
  "resize",
  "right",
  "rowGap",
  "tabSize",
  "tableLayout",
  "top",
  "userSelect",
  "verticalAlign",
  "visibility",
  "voiceFamily",
  "volume",
  "whiteSpace",
  "widows",
  "width",
  "zIndex",
  "pointerEvents",
  "aspectRatio"
  /** 非常用 style */
  // 'azimuth',
  // 'backfaceVisibility',
  // 'baselineShift',
  // 'captionSide',
  // 'chains',
  // 'dominantBaseline',
  // 'elevation',
  // 'emptyCells',
  // 'forcedColorAdjust',
  // 'glyphOrientationVertical',
  // 'hangingPunctuation',
  // 'hyphenateCharacter',
  // 'hyphens',
  // 'imageOrientation',
  // 'imageResolution',
  // 'orphans',
  // 'playDuring',
  // 'pointerEvents',
  // 'regionFragment',
  // 'richness',
  // 'running',
  // 'scrollBehavior',
  // 'speechRate',
  // 'stress',
  // 'stringSet',
  // 'unicodeBidi',
  // 'willChange',
  // 'writingMode',
];
function combine(prefix, list, excludeSelf) {
  !excludeSelf && styleProperties.push(prefix);
  list.forEach((item) => {
    styleProperties.push(prefix + item);
    if (prefix === WEBKIT) {
      styleProperties.push("Webkit" + item);
    }
  });
}
const color = "Color";
const style = "Style";
const width = "Width";
const image = "Image";
const size = "Size";
const color_style_width = [color, style, width];
const fitlength_fitwidth_image = ["FitLength", "FitWidth", image];
const fitlength_fitwidth_image_radius = [...fitlength_fitwidth_image, "Radius"];
const color_style_width_fitlength_fitwidth_image = [...color_style_width, ...fitlength_fitwidth_image];
const endRadius_startRadius = ["EndRadius", "StartRadius"];
const bottom_left_right_top = ["Bottom", "Left", "Right", "Top"];
const end_start = ["End", "Start"];
const content_items_self = ["Content", "Items", "Self"];
const blockSize_height_inlineSize_width = ["BlockSize", "Height", "InlineSize", width];
const after_before = ["After", "Before"];
combine("borderBlock", color_style_width);
combine("borderBlockEnd", color_style_width);
combine("borderBlockStart", color_style_width);
combine("outline", [...color_style_width, "Offset"]);
combine("border", [...color_style_width, "Boundary", "Break", "Collapse", "Radius", "Spacing"]);
combine("borderFit", ["Length", width]);
combine("borderInline", color_style_width);
combine("borderInlineEnd", color_style_width);
combine("borderInlineStart", color_style_width);
combine("borderLeft", color_style_width_fitlength_fitwidth_image);
combine("borderRight", color_style_width_fitlength_fitwidth_image);
combine("borderTop", color_style_width_fitlength_fitwidth_image);
combine("borderBottom", color_style_width_fitlength_fitwidth_image);
combine("textDecoration", [color, style, "Line"]);
combine("textEmphasis", [color, style, "Position"]);
combine("scrollMargin", bottom_left_right_top);
combine("scrollPadding", bottom_left_right_top);
combine("padding", bottom_left_right_top);
combine("margin", [...bottom_left_right_top, "Trim"]);
combine("scrollMarginBlock", end_start);
combine("scrollMarginInline", end_start);
combine("scrollPaddingBlock", end_start);
combine("scrollPaddingInline", end_start);
combine("gridColumn", end_start);
combine("gridRow", end_start);
combine("insetBlock", end_start);
combine("insetInline", end_start);
combine("marginBlock", end_start);
combine("marginInline", end_start);
combine("paddingBlock", end_start);
combine("paddingInline", end_start);
combine("pause", after_before);
combine("cue", after_before);
combine("mask", ["Clip", "Composite", image, "Mode", "Origin", "Position", "Repeat", size, "Type"]);
combine("borderImage", ["Outset", "Repeat", "Slice", "Source", "Transform", width]);
combine("maskBorder", ["Mode", "Outset", "Repeat", "Slice", "Source", width]);
combine("font", ["Family", "FeatureSettings", "Kerning", "LanguageOverride", "MaxSize", "MinSize", "OpticalSizing", "Palette", size, "SizeAdjust", "Stretch", style, "Weight", "VariationSettings"]);
combine("transform", ["Box", "Origin", style]);
combine("background", [color, image, "Attachment", "BlendMode", "Clip", "Origin", "Position", "Repeat", size]);
combine("listStyle", [image, "Position", "Type"]);
combine("scrollSnap", ["Align", "Stop", "Type"]);
combine("grid", ["Area", "AutoColumns", "AutoFlow", "AutoRows"]);
combine("gridTemplate", ["Areas", "Columns", "Rows"]);
combine("overflow", ["Block", "Inline", "Wrap", "X", "Y"]);
combine("transition", ["Delay", "Duration", "Property", "TimingFunction"]);
combine("color", ["Adjust", "InterpolationFilters", "Scheme"]);
combine("textAlign", ["All", "Last"]);
combine("page", ["BreakAfter", "BreakBefore", "BreakInside"]);
combine("animation", ["Delay", "Direction", "Duration", "FillMode", "IterationCount", "Name", "PlayState", "TimingFunction"]);
combine("flex", ["Basis", "Direction", "Flow", "Grow", "Shrink", "Wrap"]);
combine("offset", [...after_before, ...end_start, "Anchor", "Distance", "Path", "Position", "Rotate"]);
combine("perspective", ["Origin"]);
combine("clip", ["Path", "Rule"]);
combine("flow", ["From", "Into"]);
combine("align", ["Content", "Items", "Self"], true);
combine("alignment", ["Adjust", "Baseline"], true);
combine("borderStart", endRadius_startRadius, true);
combine("borderEnd", endRadius_startRadius, true);
combine("borderCorner", ["Fit", image, "ImageTransform"], true);
combine("borderTopLeft", fitlength_fitwidth_image_radius, true);
combine("borderTopRight", fitlength_fitwidth_image_radius, true);
combine("borderBottomLeft", fitlength_fitwidth_image_radius, true);
combine("borderBottomRight", fitlength_fitwidth_image_radius, true);
combine("column", ["s", "Count", "Fill", "Gap", "Rule", "RuleColor", "RuleStyle", "RuleWidth", "Span", width], true);
combine("break", [...after_before, "Inside"], true);
combine("wrap", [...after_before, "Flow", "Inside", "Through"], true);
combine("justify", content_items_self, true);
combine("place", content_items_self, true);
combine("max", [...blockSize_height_inlineSize_width, "Lines"], true);
combine("min", blockSize_height_inlineSize_width, true);
combine("line", ["Break", "Clamp", "Grid", "Height", "Padding", "Snap"], true);
combine("inline", ["BoxAlign", size, "Sizing"], true);
combine("text", ["CombineUpright", "GroupAlign", "Height", "Indent", "Justify", "Orientation", "Overflow", "Shadow", "SpaceCollapse", "SpaceTrim", "Spacing", "Transform", "UnderlinePosition", "Wrap"], true);
combine("shape", ["ImageThreshold", "Inside", "Margin", "Outside"], true);
combine("word", ["Break", "Spacing", "Wrap"], true);
combine("object", ["Fit", "Position"], true);
combine("box", ["DecorationBreak", "Shadow", "Sizing", "Snap"], true);
combine(WEBKIT, ["LineClamp", "BoxOrient", "TextFillColor", "TextStroke", "TextStrokeColor", "TextStrokeWidth"], true);
function recordCss(obj) {
  MutationObserver.record({
    type: "attributes",
    target: obj._element,
    attributeName: "style",
    oldValue: obj.cssText
  });
}
function enqueueUpdate(obj) {
  const element = obj._element;
  if (element._root) {
    element.enqueueUpdate({
      path: `${element._path}.${"st"}`,
      value: obj.cssText
    });
  }
}
function setStyle$1(newVal, styleKey) {
  warn(isString(newVal) && newVal.length > PROPERTY_THRESHOLD, `Style 属性 ${styleKey} 的值数据量过大，可能会影响渲染性能，考虑使用 CSS 类或其它方案替代。`);
  const old = this[styleKey];
  if (old === newVal)
    return;
  !this._pending && recordCss(this);
  if (isNull(newVal) || isUndefined(newVal) || newVal === "") {
    this._usedStyleProp.delete(styleKey);
    delete this._value[styleKey];
  } else {
    this._usedStyleProp.add(styleKey);
    this._value[styleKey] = newVal;
  }
  !this._pending && enqueueUpdate(this);
}
function initStyle(ctor, styleProperties2) {
  const properties = {};
  for (let i = 0; i < styleProperties2.length; i++) {
    const styleKey = styleProperties2[i];
    if (ctor[styleKey])
      return;
    properties[styleKey] = {
      get() {
        const val = this._value[styleKey];
        return isNull(val) || isUndefined(val) ? "" : val;
      },
      set(newVal) {
        setStyle$1.call(this, newVal, styleKey);
      }
    };
  }
  Object.defineProperties(ctor.prototype, properties);
}
function isCssVariable(propertyName) {
  return /^--/.test(propertyName);
}
class Style {
  constructor(element) {
    this._element = element;
    this._usedStyleProp = /* @__PURE__ */ new Set();
    this._value = {};
  }
  setCssVariables(styleKey) {
    this.hasOwnProperty(styleKey) || Object.defineProperty(this, styleKey, {
      enumerable: true,
      configurable: true,
      get: () => {
        return this._value[styleKey] || "";
      },
      set: (newVal) => {
        setStyle$1.call(this, newVal, styleKey);
      }
    });
  }
  get cssText() {
    if (!this._usedStyleProp.size)
      return "";
    const texts = [];
    this._usedStyleProp.forEach((key) => {
      const val = this[key];
      if (isNull(val) || isUndefined(val))
        return;
      let styleName = isCssVariable(key) ? key : toDashed(key);
      if (styleName.indexOf("webkit") === 0 || styleName.indexOf("Webkit") === 0) {
        styleName = `-${styleName}`;
      }
      texts.push(`${styleName}: ${val};`);
    });
    return texts.join(" ");
  }
  set cssText(str) {
    this._pending = true;
    recordCss(this);
    this._usedStyleProp.forEach((prop) => {
      this.removeProperty(prop);
    });
    if (str === "" || isUndefined(str) || isNull(str)) {
      this._pending = false;
      enqueueUpdate(this);
      return;
    }
    const rules = str.split(";");
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i].trim();
      if (rule === "") {
        continue;
      }
      const [propName, ...valList] = rule.split(":");
      const val = valList.join(":");
      if (isUndefined(val)) {
        continue;
      }
      this.setProperty(propName.trim(), val.trim());
    }
    this._pending = false;
    enqueueUpdate(this);
  }
  setProperty(propertyName, value) {
    if (propertyName[0] === "-") {
      this.setCssVariables(propertyName);
    } else {
      propertyName = toCamelCase(propertyName);
    }
    if (isNull(value) || isUndefined(value)) {
      this.removeProperty(propertyName);
    } else {
      this[propertyName] = value;
    }
  }
  removeProperty(propertyName) {
    propertyName = toCamelCase(propertyName);
    if (!this._usedStyleProp.has(propertyName)) {
      return "";
    }
    const value = this[propertyName];
    this[propertyName] = void 0;
    return value;
  }
  getPropertyValue(propertyName) {
    propertyName = toCamelCase(propertyName);
    const value = this[propertyName];
    if (!value) {
      return "";
    }
    return value;
  }
}
initStyle(Style, styleProperties);
hooks.tap("injectNewStyleProperties", (newStyleProperties) => {
  if (isArray(newStyleProperties)) {
    initStyle(Style, newStyleProperties);
  } else {
    if (typeof newStyleProperties !== "string")
      return;
    initStyle(Style, [newStyleProperties]);
  }
});
function returnTrue() {
  return true;
}
function treeToArray(root, predict) {
  const array = [];
  const filter = predict !== null && predict !== void 0 ? predict : returnTrue;
  let object = root;
  while (object) {
    if (object.nodeType === 1 && filter(object)) {
      array.push(object);
    }
    object = following(object, root);
  }
  return array;
}
function following(el, root) {
  const firstChild = el.firstChild;
  const isElmentTypeValid = el.nodeType === 1 || el.nodeType === 9;
  if (firstChild && isElmentTypeValid) {
    return firstChild;
  }
  let current = el;
  do {
    if (current === root) {
      return null;
    }
    const nextSibling = current.nextSibling;
    if (nextSibling) {
      return nextSibling;
    }
    current = current.parentElement;
  } while (current);
  return null;
}
class TaroElement extends TaroNode {
  constructor() {
    super();
    this.props = {};
    this.dataset = EMPTY_OBJ;
    this.nodeType = 1;
    this.style = new Style(this);
    hooks.call("patchElement", this);
  }
  _stopPropagation(event) {
    let target = this;
    while (target = target.parentNode) {
      const listeners = target.__handlers[event.type];
      if (!isArray(listeners)) {
        continue;
      }
      for (let i = listeners.length; i--; ) {
        const l2 = listeners[i];
        l2._stop = true;
      }
    }
  }
  get id() {
    return this.getAttribute(ID);
  }
  set id(val) {
    this.setAttribute(ID, val);
  }
  get className() {
    return this.getAttribute(CLASS) || "";
  }
  set className(val) {
    this.setAttribute(CLASS, val);
  }
  get cssText() {
    return this.getAttribute(STYLE) || "";
  }
  get classList() {
    return new ClassList(this.className, this);
  }
  get children() {
    return this.childNodes.filter(isElement);
  }
  get attributes() {
    const props = this.props;
    const propKeys = Object.keys(props);
    const style2 = this.style.cssText;
    const attrs = propKeys.map((key) => ({
      name: key,
      value: props[key]
    }));
    return attrs.concat(style2 ? {
      name: STYLE,
      value: style2
    } : []);
  }
  get textContent() {
    let text = "";
    const childNodes = this.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      text += childNodes[i].textContent;
    }
    return text;
  }
  set textContent(text) {
    super.textContent = text;
  }
  hasAttribute(qualifiedName) {
    return !isUndefined(this.props[qualifiedName]);
  }
  hasAttributes() {
    return this.attributes.length > 0;
  }
  get focus() {
    return function() {
      this.setAttribute(FOCUS, true);
    };
  }
  // 兼容 Vue3，详情请见：https://github.com/NervJS/taro/issues/10579
  set focus(value) {
    this.setAttribute(FOCUS, value);
  }
  blur() {
    this.setAttribute(FOCUS, false);
  }
  setAttribute(qualifiedName, value) {
    warn(isString(value) && value.length > PROPERTY_THRESHOLD, `元素 ${this.nodeName} 的 ${qualifiedName} 属性值数据量过大，可能会影响渲染性能。考虑降低图片转为 base64 的阈值或在 CSS 中使用 base64。`);
    const isPureView = this.nodeName === VIEW && !isHasExtractProp(this) && !this.isAnyEventBinded();
    if (qualifiedName !== STYLE) {
      MutationObserver.record({
        target: this,
        type: "attributes",
        attributeName: qualifiedName,
        oldValue: this.getAttribute(qualifiedName)
      });
    }
    switch (qualifiedName) {
      case STYLE:
        this.style.cssText = value;
        break;
      case ID:
        if (this.uid !== this.sid) {
          eventSource.delete(this.uid);
        }
        value = String(value);
        this.props[qualifiedName] = this.uid = value;
        eventSource.set(value, this);
        break;
      default:
        this.props[qualifiedName] = value;
        if (qualifiedName.startsWith("data-")) {
          if (this.dataset === EMPTY_OBJ) {
            this.dataset = /* @__PURE__ */ Object.create(null);
          }
          this.dataset[toCamelCase(qualifiedName.replace(/^data-/, ""))] = value;
        }
        break;
    }
    if (!this._root)
      return;
    const componentsAlias2 = getComponentsAlias();
    const _alias = componentsAlias2[this.nodeName];
    const viewAlias = componentsAlias2[VIEW]._num;
    const clickViewAlias = componentsAlias2[CLICK_VIEW]._num;
    const staticViewAlias = componentsAlias2[STATIC_VIEW]._num;
    const catchViewAlias = componentsAlias2[CATCH_VIEW]._num;
    const _path = this._path;
    qualifiedName = shortcutAttr(qualifiedName);
    const qualifiedNameInCamelCase = toCamelCase(qualifiedName);
    const payload = {
      path: `${_path}.${qualifiedNameInCamelCase}`,
      value: isFunction(value) ? () => value : value
    };
    hooks.call("modifySetAttrPayload", this, qualifiedName, payload, componentsAlias2);
    if (_alias) {
      const qualifiedNameAlias = _alias[qualifiedNameInCamelCase] || qualifiedName;
      payload.path = `${_path}.${toCamelCase(qualifiedNameAlias)}`;
    }
    this.enqueueUpdate(payload);
    if (this.nodeName === VIEW) {
      if (qualifiedNameInCamelCase === CATCHMOVE) {
        this.enqueueUpdate({
          path: `${_path}.${"nn"}`,
          value: value ? catchViewAlias : this.isOnlyClickBinded() && !isHasExtractProp(this) ? clickViewAlias : this.isAnyEventBinded() ? viewAlias : staticViewAlias
        });
      } else if (isPureView && isHasExtractProp(this)) {
        this.enqueueUpdate({
          path: `${_path}.${"nn"}`,
          value: staticViewAlias
        });
      }
    }
  }
  removeAttribute(qualifiedName) {
    const isStaticView = this.nodeName === VIEW && isHasExtractProp(this) && !this.isAnyEventBinded();
    MutationObserver.record({
      target: this,
      type: "attributes",
      attributeName: qualifiedName,
      oldValue: this.getAttribute(qualifiedName)
    });
    if (qualifiedName === STYLE) {
      this.style.cssText = "";
    } else {
      const isInterrupt = hooks.call("onRemoveAttribute", this, qualifiedName);
      if (isInterrupt) {
        return;
      }
      if (!this.props.hasOwnProperty(qualifiedName)) {
        return;
      }
      delete this.props[qualifiedName];
    }
    if (!this._root)
      return;
    const componentsAlias2 = getComponentsAlias();
    const _alias = componentsAlias2[this.nodeName];
    const viewAlias = componentsAlias2[VIEW]._num;
    const staticViewAlias = componentsAlias2[STATIC_VIEW]._num;
    const pureViewAlias = componentsAlias2[PURE_VIEW]._num;
    const clickViewAlias = componentsAlias2[CLICK_VIEW]._num;
    const _path = this._path;
    qualifiedName = shortcutAttr(qualifiedName);
    const qualifiedNameInCamelCase = toCamelCase(qualifiedName);
    const payload = {
      path: `${_path}.${qualifiedNameInCamelCase}`,
      value: ""
    };
    hooks.call("modifyRmAttrPayload", this, qualifiedName, payload, componentsAlias2);
    if (_alias) {
      const qualifiedNameAlias = _alias[qualifiedNameInCamelCase] || qualifiedName;
      payload.path = `${_path}.${toCamelCase(qualifiedNameAlias)}`;
    }
    this.enqueueUpdate(payload);
    if (this.nodeName === VIEW) {
      if (qualifiedNameInCamelCase === CATCHMOVE) {
        this.enqueueUpdate({
          path: `${_path}.${"nn"}`,
          value: this.isOnlyClickBinded() && !isHasExtractProp(this) ? clickViewAlias : this.isAnyEventBinded() ? viewAlias : isHasExtractProp(this) ? staticViewAlias : pureViewAlias
        });
      } else if (isStaticView && !isHasExtractProp(this)) {
        this.enqueueUpdate({
          path: `${_path}.${"nn"}`,
          value: pureViewAlias
        });
      }
    }
  }
  getAttribute(qualifiedName) {
    const attr = qualifiedName === STYLE ? this.style.cssText : this.props[qualifiedName];
    return attr !== null && attr !== void 0 ? attr : "";
  }
  getElementsByTagName(tagName) {
    return treeToArray(this, (el) => {
      return el.nodeName === tagName || tagName === "*" && this !== el;
    });
  }
  getElementsByClassName(className) {
    const classNames = className.trim().split(/\s+/);
    return treeToArray(this, (el) => {
      const classList = el.classList;
      return classNames.every((c) => classList.contains(c));
    });
  }
  dispatchEvent(event) {
    const cancelable = event.cancelable;
    const listeners = this.__handlers[event.type];
    if (!isArray(listeners)) {
      return false;
    }
    for (let i = listeners.length; i--; ) {
      const listener = listeners[i];
      let result;
      if (listener._stop) {
        listener._stop = false;
      } else {
        hooks.call("modifyDispatchEvent", event, this);
        result = listener.call(this, event);
      }
      if ((result === false || event._end) && cancelable) {
        event.defaultPrevented = true;
      }
      if (!isUndefined(result) && event.mpEvent) {
        const res = hooks.call("modifyTaroEventReturn", this, event, result);
        if (res) {
          event.mpEvent[EVENT_CALLBACK_RESULT] = result;
        }
      }
      if (event._end && event._stop) {
        break;
      }
    }
    if (event._stop) {
      this._stopPropagation(event);
    }
    return listeners != null;
  }
  addEventListener(type, handler, options2) {
    const name = this.nodeName;
    const SPECIAL_NODES2 = hooks.call("getSpecialNodes");
    let sideEffect = true;
    if (isObject(options2) && options2.sideEffect === false) {
      sideEffect = false;
      delete options2.sideEffect;
    }
    hooks.call("modifyAddEventListener", this, sideEffect, getComponentsAlias);
    if (sideEffect !== false && !this.isAnyEventBinded() && SPECIAL_NODES2.indexOf(name) > -1) {
      const componentsAlias2 = getComponentsAlias();
      const alias = componentsAlias2[name]._num;
      this.enqueueUpdate({
        path: `${this._path}.${"nn"}`,
        value: alias
      });
    }
    super.addEventListener(type, handler, options2);
  }
  removeEventListener(type, handler, sideEffect = true) {
    super.removeEventListener(type, handler);
    const name = this.nodeName;
    const SPECIAL_NODES2 = hooks.call("getSpecialNodes");
    hooks.call("modifyRemoveEventListener", this, sideEffect, getComponentsAlias);
    if (sideEffect !== false && !this.isAnyEventBinded() && SPECIAL_NODES2.indexOf(name) > -1) {
      const componentsAlias2 = getComponentsAlias();
      const value = isHasExtractProp(this) ? `static-${name}` : `pure-${name}`;
      const valueAlias = componentsAlias2[value]._num;
      this.enqueueUpdate({
        path: `${this._path}.${"nn"}`,
        value: valueAlias
      });
    }
  }
  static extend(methodName, options2) {
    extend(TaroElement, methodName, options2);
  }
}
const options = {
  prerender: true,
  debug: false
};
function initPosition() {
  return {
    index: 0,
    column: 0,
    line: 0
  };
}
function feedPosition(position, str, len) {
  const start = position.index;
  const end = position.index = start + len;
  for (let i = start; i < end; i++) {
    const char = str.charAt(i);
    if (char === "\n") {
      position.line++;
      position.column = 0;
    } else {
      position.column++;
    }
  }
}
function jumpPosition(position, str, end) {
  const len = end - position.index;
  return feedPosition(position, str, len);
}
function copyPosition(position) {
  return {
    index: position.index,
    line: position.line,
    column: position.column
  };
}
const whitespace = /\s/;
function isWhitespaceChar(char) {
  return whitespace.test(char);
}
const equalSign = /=/;
function isEqualSignChar(char) {
  return equalSign.test(char);
}
function shouldBeIgnore(tagName) {
  const name = tagName.toLowerCase();
  if (options.html.skipElements.has(name)) {
    return true;
  }
  return false;
}
const alphanumeric = /[A-Za-z0-9]/;
function findTextEnd(str, index2) {
  while (true) {
    const textEnd = str.indexOf("<", index2);
    if (textEnd === -1) {
      return textEnd;
    }
    const char = str.charAt(textEnd + 1);
    if (char === "/" || char === "!" || alphanumeric.test(char)) {
      return textEnd;
    }
    index2 = textEnd + 1;
  }
}
function isWordEnd(cursor, wordBegin, html) {
  if (!isWhitespaceChar(html.charAt(cursor)))
    return false;
  const len = html.length;
  for (let i = cursor - 1; i > wordBegin; i--) {
    const char = html.charAt(i);
    if (!isWhitespaceChar(char)) {
      if (isEqualSignChar(char))
        return false;
      break;
    }
  }
  for (let i = cursor + 1; i < len; i++) {
    const char = html.charAt(i);
    if (!isWhitespaceChar(char)) {
      if (isEqualSignChar(char))
        return false;
      return true;
    }
  }
}
class Scanner {
  constructor(html) {
    this.tokens = [];
    this.position = initPosition();
    this.html = html;
  }
  scan() {
    const {
      html,
      position
    } = this;
    const len = html.length;
    while (position.index < len) {
      const start = position.index;
      this.scanText();
      if (position.index === start) {
        const isComment2 = html.startsWith("!--", start + 1);
        if (isComment2) {
          this.scanComment();
        } else {
          const tagName = this.scanTag();
          if (shouldBeIgnore(tagName)) {
            this.scanSkipTag(tagName);
          }
        }
      }
    }
    return this.tokens;
  }
  scanText() {
    const type = "text";
    const {
      html,
      position
    } = this;
    let textEnd = findTextEnd(html, position.index);
    if (textEnd === position.index) {
      return;
    }
    if (textEnd === -1) {
      textEnd = html.length;
    }
    const start = copyPosition(position);
    const content = html.slice(position.index, textEnd);
    jumpPosition(position, html, textEnd);
    const end = copyPosition(position);
    this.tokens.push({
      type,
      content,
      position: {
        start,
        end
      }
    });
  }
  scanComment() {
    const type = "comment";
    const {
      html,
      position
    } = this;
    const start = copyPosition(position);
    feedPosition(position, html, 4);
    let contentEnd = html.indexOf("-->", position.index);
    let commentEnd = contentEnd + 3;
    if (contentEnd === -1) {
      contentEnd = commentEnd = html.length;
    }
    const content = html.slice(position.index, contentEnd);
    jumpPosition(position, html, commentEnd);
    this.tokens.push({
      type,
      content,
      position: {
        start,
        end: copyPosition(position)
      }
    });
  }
  scanTag() {
    this.scanTagStart();
    const tagName = this.scanTagName();
    this.scanAttrs();
    this.scanTagEnd();
    return tagName;
  }
  scanTagStart() {
    const type = "tag-start";
    const {
      html,
      position
    } = this;
    const secondChar = html.charAt(position.index + 1);
    const close = secondChar === "/";
    const start = copyPosition(position);
    feedPosition(position, html, close ? 2 : 1);
    this.tokens.push({
      type,
      close,
      position: {
        start
      }
    });
  }
  scanTagEnd() {
    const type = "tag-end";
    const {
      html,
      position
    } = this;
    const firstChar = html.charAt(position.index);
    const close = firstChar === "/";
    feedPosition(position, html, close ? 2 : 1);
    const end = copyPosition(position);
    this.tokens.push({
      type,
      close,
      position: {
        end
      }
    });
  }
  scanTagName() {
    const type = "tag";
    const {
      html,
      position
    } = this;
    const len = html.length;
    let start = position.index;
    while (start < len) {
      const char = html.charAt(start);
      const isTagChar = !(isWhitespaceChar(char) || char === "/" || char === ">");
      if (isTagChar)
        break;
      start++;
    }
    let end = start + 1;
    while (end < len) {
      const char = html.charAt(end);
      const isTagChar = !(isWhitespaceChar(char) || char === "/" || char === ">");
      if (!isTagChar)
        break;
      end++;
    }
    jumpPosition(position, html, end);
    const tagName = html.slice(start, end);
    this.tokens.push({
      type,
      content: tagName
    });
    return tagName;
  }
  scanAttrs() {
    const {
      html,
      position,
      tokens
    } = this;
    let cursor = position.index;
    let quote = null;
    let wordBegin = cursor;
    const words = [];
    const len = html.length;
    while (cursor < len) {
      const char = html.charAt(cursor);
      if (quote) {
        const isQuoteEnd = char === quote;
        if (isQuoteEnd) {
          quote = null;
        }
        cursor++;
        continue;
      }
      const isTagEnd = char === "/" || char === ">";
      if (isTagEnd) {
        if (cursor !== wordBegin) {
          words.push(html.slice(wordBegin, cursor));
        }
        break;
      }
      if (isWordEnd(cursor, wordBegin, html)) {
        if (cursor !== wordBegin) {
          words.push(html.slice(wordBegin, cursor));
        }
        wordBegin = cursor + 1;
        cursor++;
        continue;
      }
      const isQuoteStart = char === "'" || char === '"';
      if (isQuoteStart) {
        quote = char;
        cursor++;
        continue;
      }
      cursor++;
    }
    jumpPosition(position, html, cursor);
    const wLen = words.length;
    const type = "attribute";
    for (let i = 0; i < wLen; i++) {
      const word = words[i];
      const isNotPair = word.includes("=");
      if (isNotPair) {
        const secondWord = words[i + 1];
        if (secondWord && secondWord.startsWith("=")) {
          if (secondWord.length > 1) {
            const newWord = word + secondWord;
            tokens.push({
              type,
              content: newWord
            });
            i += 1;
            continue;
          }
          const thirdWord = words[i + 2];
          i += 1;
          if (thirdWord) {
            const newWord = word + "=" + thirdWord;
            tokens.push({
              type,
              content: newWord
            });
            i += 1;
            continue;
          }
        }
      }
      if (word.endsWith("=")) {
        const secondWord = words[i + 1];
        if (secondWord && !secondWord.includes("=")) {
          const newWord2 = word + secondWord;
          tokens.push({
            type,
            content: newWord2
          });
          i += 1;
          continue;
        }
        const newWord = word.slice(0, -1);
        tokens.push({
          type,
          content: newWord
        });
        continue;
      }
      tokens.push({
        type,
        content: word
      });
    }
  }
  scanSkipTag(tagName) {
    const {
      html,
      position
    } = this;
    const safeTagName = tagName.toLowerCase();
    const len = html.length;
    while (position.index < len) {
      const nextTag = html.indexOf("</", position.index);
      if (nextTag === -1) {
        this.scanText();
        break;
      }
      jumpPosition(position, html, nextTag);
      const name = this.scanTag();
      if (safeTagName === name.toLowerCase()) {
        break;
      }
    }
  }
}
function unquote(str) {
  const car = str.charAt(0);
  const end = str.length - 1;
  const isQuoteStart = car === '"' || car === "'";
  if (isQuoteStart && car === str.charAt(end)) {
    return str.slice(1, end);
  }
  return str;
}
const LEFT_BRACKET = "{";
const RIGHT_BRACKET = "}";
const CLASS_SELECTOR = ".";
const ID_SELECTOR = "#";
const CHILD_COMBINATOR = ">";
const GENERAL_SIBLING_COMBINATOR = "~";
const ADJACENT_SIBLING_COMBINATOR = "+";
class StyleTagParser {
  constructor() {
    this.styles = [];
  }
  extractStyle(src) {
    const REG_STYLE = /<style\s?[^>]*>((.|\n|\s)+?)<\/style>/g;
    let html = src;
    html = html.replace(REG_STYLE, (_, $1) => {
      const style2 = $1.trim();
      this.stringToSelector(style2);
      return "";
    });
    return html.trim();
  }
  stringToSelector(style2) {
    let lb = style2.indexOf(LEFT_BRACKET);
    while (lb > -1) {
      const rb = style2.indexOf(RIGHT_BRACKET);
      const selectors = style2.slice(0, lb).trim();
      let content = style2.slice(lb + 1, rb);
      content = content.replace(/:(.*);/g, function(_, $1) {
        const t2 = $1.trim().replace(/ +/g, "+++");
        return `:${t2};`;
      });
      content = content.replace(/ /g, "");
      content = content.replace(/\+\+\+/g, " ");
      if (!/;$/.test(content)) {
        content += ";";
      }
      selectors.split(",").forEach((src) => {
        const selectorList = this.parseSelector(src);
        this.styles.push({
          content,
          selectorList
        });
      });
      style2 = style2.slice(rb + 1);
      lb = style2.indexOf(LEFT_BRACKET);
    }
  }
  parseSelector(src) {
    const list = src.trim().replace(/ *([>~+]) */g, " $1").replace(/ +/g, " ").replace(/\[\s*([^[\]=\s]+)\s*=\s*([^[\]=\s]+)\s*\]/g, "[$1=$2]").split(" ");
    const selectors = list.map((item) => {
      const firstChar = item.charAt(0);
      const selector = {
        isChild: firstChar === CHILD_COMBINATOR,
        isGeneralSibling: firstChar === GENERAL_SIBLING_COMBINATOR,
        isAdjacentSibling: firstChar === ADJACENT_SIBLING_COMBINATOR,
        tag: null,
        id: null,
        class: [],
        attrs: []
      };
      item = item.replace(/^[>~+]/, "");
      item = item.replace(/\[(.+?)\]/g, function(_, $1) {
        const [key, value] = $1.split("=");
        const all = $1.indexOf("=") === -1;
        const attr = {
          all,
          key,
          value: all ? null : value
        };
        selector.attrs.push(attr);
        return "";
      });
      item = item.replace(/([.#][A-Za-z0-9-_]+)/g, function(_, $1) {
        if ($1[0] === ID_SELECTOR) {
          selector.id = $1.substr(1);
        } else if ($1[0] === CLASS_SELECTOR) {
          selector.class.push($1.substr(1));
        }
        return "";
      });
      if (item !== "") {
        selector.tag = item;
      }
      return selector;
    });
    return selectors;
  }
  matchStyle(tagName, el, list) {
    const res = sortStyles(this.styles).reduce((str, {
      content,
      selectorList
    }, i) => {
      let idx = list[i];
      let selector = selectorList[idx];
      const nextSelector = selectorList[idx + 1];
      if ((nextSelector === null || nextSelector === void 0 ? void 0 : nextSelector.isGeneralSibling) || (nextSelector === null || nextSelector === void 0 ? void 0 : nextSelector.isAdjacentSibling)) {
        selector = nextSelector;
        idx += 1;
        list[i] += 1;
      }
      let isMatch = this.matchCurrent(tagName, el, selector);
      if (isMatch && selector.isGeneralSibling) {
        let prev = getPreviousElement(el);
        while (prev) {
          if (prev.h5tagName && this.matchCurrent(prev.h5tagName, prev, selectorList[idx - 1])) {
            isMatch = true;
            break;
          }
          prev = getPreviousElement(prev);
          isMatch = false;
        }
      }
      if (isMatch && selector.isAdjacentSibling) {
        const prev = getPreviousElement(el);
        if (!prev || !prev.h5tagName) {
          isMatch = false;
        } else {
          const isSiblingMatch = this.matchCurrent(prev.h5tagName, prev, selectorList[idx - 1]);
          if (!isSiblingMatch) {
            isMatch = false;
          }
        }
      }
      if (isMatch) {
        if (idx === selectorList.length - 1) {
          return str + content;
        } else if (idx < selectorList.length - 1) {
          list[i] += 1;
        }
      } else {
        if (selector.isChild && idx > 0) {
          list[i] -= 1;
          if (this.matchCurrent(tagName, el, selectorList[list[i]])) {
            list[i] += 1;
          }
        }
      }
      return str;
    }, "");
    return res;
  }
  matchCurrent(tagName, el, selector) {
    if (selector.tag && selector.tag !== tagName)
      return false;
    if (selector.id && selector.id !== el.id)
      return false;
    if (selector.class.length) {
      const classList = el.className.split(" ");
      for (let i = 0; i < selector.class.length; i++) {
        const cls = selector.class[i];
        if (classList.indexOf(cls) === -1) {
          return false;
        }
      }
    }
    if (selector.attrs.length) {
      for (let i = 0; i < selector.attrs.length; i++) {
        const {
          all,
          key,
          value
        } = selector.attrs[i];
        if (all && !el.hasAttribute(key)) {
          return false;
        } else {
          const attr = el.getAttribute(key);
          if (attr !== unquote(value || "")) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
function getPreviousElement(el) {
  const parent = el.parentElement;
  if (!parent)
    return null;
  const prev = el.previousSibling;
  if (!prev)
    return null;
  if (prev.nodeType === 1) {
    return prev;
  } else {
    return getPreviousElement(prev);
  }
}
function sortStyles(styles) {
  return styles.sort((s1, s2) => {
    const hundreds1 = getHundredsWeight(s1.selectorList);
    const hundreds2 = getHundredsWeight(s2.selectorList);
    if (hundreds1 !== hundreds2)
      return hundreds1 - hundreds2;
    const tens1 = getTensWeight(s1.selectorList);
    const tens2 = getTensWeight(s2.selectorList);
    if (tens1 !== tens2)
      return tens1 - tens2;
    const ones1 = getOnesWeight(s1.selectorList);
    const ones2 = getOnesWeight(s2.selectorList);
    return ones1 - ones2;
  });
}
function getHundredsWeight(selectors) {
  return selectors.reduce((pre, cur) => pre + (cur.id ? 1 : 0), 0);
}
function getTensWeight(selectors) {
  return selectors.reduce((pre, cur) => pre + cur.class.length + cur.attrs.length, 0);
}
function getOnesWeight(selectors) {
  return selectors.reduce((pre, cur) => pre + (cur.tag ? 1 : 0), 0);
}
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return (val) => !!map[val.toLowerCase()];
}
const specialMiniElements = {
  img: "image",
  iframe: "web-view"
};
const internalCompsList = Object.keys(internalComponents).map((i) => i.toLowerCase()).join(",");
const isMiniElements = makeMap(internalCompsList);
const isInlineElements = makeMap("a,i,abbr,iframe,select,acronym,slot,small,span,bdi,kbd,strong,big,map,sub,sup,br,mark,mark,meter,template,canvas,textarea,cite,object,time,code,output,u,data,picture,tt,datalist,var,dfn,del,q,em,s,embed,samp,b");
const isBlockElements = makeMap("address,fieldset,li,article,figcaption,main,aside,figure,nav,blockquote,footer,ol,details,form,p,dialog,h1,h2,h3,h4,h5,h6,pre,dd,header,section,div,hgroup,table,dl,hr,ul,dt");
const closingTagAncestorBreakers = {
  li: ["ul", "ol", "menu"],
  dt: ["dl"],
  dd: ["dl"],
  tbody: ["table"],
  thead: ["table"],
  tfoot: ["table"],
  tr: ["table"],
  td: ["table"]
};
function hasTerminalParent(tagName, stack) {
  const tagParents = closingTagAncestorBreakers[tagName];
  if (tagParents) {
    let currentIndex = stack.length - 1;
    while (currentIndex >= 0) {
      const parentTagName = stack[currentIndex].tagName;
      if (parentTagName === tagName) {
        break;
      }
      if (tagParents && tagParents.includes(parentTagName)) {
        return true;
      }
      currentIndex--;
    }
  }
  return false;
}
function getTagName(tag) {
  if (options.html.renderHTMLTag) {
    return tag;
  }
  if (specialMiniElements[tag]) {
    return specialMiniElements[tag];
  } else if (isMiniElements(tag)) {
    return tag;
  } else if (isBlockElements(tag)) {
    return "view";
  } else if (isInlineElements(tag)) {
    return "text";
  }
  return "view";
}
function splitEqual(str) {
  const sep = "=";
  const idx = str.indexOf(sep);
  if (idx === -1)
    return [str];
  const key = str.slice(0, idx).trim();
  const value = str.slice(idx + sep.length).trim();
  return [key, value];
}
function format(children, document, styleOptions, parent) {
  return children.filter((child) => {
    if (child.type === "comment") {
      return false;
    } else if (child.type === "text") {
      return child.content !== "";
    }
    return true;
  }).map((child) => {
    if (child.type === "text") {
      let text = document.createTextNode(child.content);
      if (isFunction(options.html.transformText)) {
        text = options.html.transformText(text, child);
      }
      parent === null || parent === void 0 ? void 0 : parent.appendChild(text);
      return text;
    }
    const el = document.createElement(getTagName(child.tagName));
    el.h5tagName = child.tagName;
    parent === null || parent === void 0 ? void 0 : parent.appendChild(el);
    if (!options.html.renderHTMLTag) {
      el.className = `h5-${child.tagName}`;
    }
    for (let i = 0; i < child.attributes.length; i++) {
      const attr = child.attributes[i];
      const [key, value] = splitEqual(attr);
      if (key === "class") {
        el.className += " " + unquote(value);
      } else if (key[0] === "o" && key[1] === "n") {
        continue;
      } else {
        el.setAttribute(key, value == null ? true : unquote(value));
      }
    }
    const {
      styleTagParser,
      descendantList
    } = styleOptions;
    const list = descendantList.slice();
    const style2 = styleTagParser.matchStyle(child.tagName, el, list);
    el.setAttribute("style", style2 + el.style.cssText);
    format(child.children, document, {
      styleTagParser,
      descendantList: list
    }, el);
    if (isFunction(options.html.transformElement)) {
      return options.html.transformElement(el, child);
    }
    return el;
  });
}
function parser(html, document) {
  const styleTagParser = new StyleTagParser();
  html = styleTagParser.extractStyle(html);
  const tokens = new Scanner(html).scan();
  const root = {
    tagName: "",
    children: [],
    type: "element",
    attributes: []
  };
  const state = {
    tokens,
    cursor: 0,
    stack: [root]
  };
  parse(state);
  return format(root.children, document, {
    styleTagParser,
    descendantList: Array(styleTagParser.styles.length).fill(0)
  });
}
function parse(state) {
  const {
    tokens,
    stack
  } = state;
  let {
    cursor
  } = state;
  const len = tokens.length;
  let nodes = stack[stack.length - 1].children;
  while (cursor < len) {
    const token = tokens[cursor];
    if (token.type !== "tag-start") {
      nodes.push(token);
      cursor++;
      continue;
    }
    const tagToken = tokens[++cursor];
    cursor++;
    const tagName = tagToken.content.toLowerCase();
    if (token.close) {
      let index2 = stack.length;
      let shouldRewind = false;
      while (--index2 > -1) {
        if (stack[index2].tagName === tagName) {
          shouldRewind = true;
          break;
        }
      }
      while (cursor < len) {
        const endToken = tokens[cursor];
        if (endToken.type !== "tag-end")
          break;
        cursor++;
      }
      if (shouldRewind) {
        stack.splice(index2);
        break;
      } else {
        continue;
      }
    }
    const isClosingTag = options.html.closingElements.has(tagName);
    let shouldRewindToAutoClose = isClosingTag;
    if (shouldRewindToAutoClose) {
      shouldRewindToAutoClose = !hasTerminalParent(tagName, stack);
    }
    if (shouldRewindToAutoClose) {
      let currentIndex = stack.length - 1;
      while (currentIndex > 0) {
        if (tagName === stack[currentIndex].tagName) {
          stack.splice(currentIndex);
          const previousIndex = currentIndex - 1;
          nodes = stack[previousIndex].children;
          break;
        }
        currentIndex = currentIndex - 1;
      }
    }
    const attributes = [];
    let attrToken;
    while (cursor < len) {
      attrToken = tokens[cursor];
      if (attrToken.type === "tag-end")
        break;
      attributes.push(attrToken.content);
      cursor++;
    }
    cursor++;
    const children = [];
    const element = {
      type: "element",
      tagName: tagToken.content,
      attributes,
      children
    };
    nodes.push(element);
    const hasChildren = !(attrToken.close || options.html.voidElements.has(tagName));
    if (hasChildren) {
      stack.push({
        tagName,
        children
      });
      const innerState = {
        tokens,
        cursor,
        stack
      };
      parse(innerState);
      cursor = innerState.cursor;
    }
  }
  state.cursor = cursor;
}
options.html = {
  skipElements: /* @__PURE__ */ new Set(["style", "script"]),
  voidElements: /* @__PURE__ */ new Set(["!doctype", "area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]),
  closingElements: /* @__PURE__ */ new Set(["html", "head", "body", "p", "dt", "dd", "li", "option", "thead", "th", "tbody", "tr", "td", "tfoot", "colgroup"]),
  renderHTMLTag: false
};
function setInnerHTML(element, html) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  const children = parser(html, element.ownerDocument);
  for (let i = 0; i < children.length; i++) {
    element.appendChild(children[i]);
  }
}
if ("mini" !== PLATFORM_TYPE.WEB && "mini" !== PLATFORM_TYPE.HARMONY) {
  {
    TaroNode.extend("innerHTML", {
      set(html) {
        setInnerHTML.call(this, this, html);
      },
      get() {
        return "";
      }
    });
  }
}
class TaroEvent {
  constructor(type, opts, event) {
    this._stop = false;
    this._end = false;
    this.defaultPrevented = false;
    this.button = 0;
    this.timeStamp = Date.now();
    this.type = type.toLowerCase();
    this.mpEvent = event;
    this.bubbles = Boolean(opts && opts.bubbles);
    this.cancelable = Boolean(opts && opts.cancelable);
  }
  stopPropagation() {
    this._stop = true;
  }
  stopImmediatePropagation() {
    this._end = this._stop = true;
  }
  preventDefault() {
    this.defaultPrevented = true;
  }
  get target() {
    var _a2, _b, _c, _d, _e;
    const cacheTarget = this.cacheTarget;
    if (!cacheTarget) {
      const target = Object.create(((_a2 = this.mpEvent) === null || _a2 === void 0 ? void 0 : _a2.target) || null);
      const currentEle = env.document.getElementById(((_b = target.dataset) === null || _b === void 0 ? void 0 : _b.sid) || target.id || null);
      const element = env.document.getElementById(((_c = target.targetDataset) === null || _c === void 0 ? void 0 : _c.sid) || ((_d = target.dataset) === null || _d === void 0 ? void 0 : _d.sid) || target.id || null);
      target.dataset = Object.assign(Object.assign({}, currentEle !== null ? currentEle.dataset : EMPTY_OBJ), element !== null ? element.dataset : EMPTY_OBJ);
      for (const key in (_e = this.mpEvent) === null || _e === void 0 ? void 0 : _e.detail) {
        target[key] = this.mpEvent.detail[key];
      }
      this.cacheTarget = target;
      return target;
    } else {
      return cacheTarget;
    }
  }
  get currentTarget() {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    const cacheCurrentTarget = this.cacheCurrentTarget;
    if (!cacheCurrentTarget) {
      const doc = env.document;
      const currentTarget = Object.create(((_a2 = this.mpEvent) === null || _a2 === void 0 ? void 0 : _a2.currentTarget) || null);
      const element = doc.getElementById(((_b = currentTarget.dataset) === null || _b === void 0 ? void 0 : _b.sid) || currentTarget.id || null);
      const targetElement = doc.getElementById(((_e = (_d = (_c = this.mpEvent) === null || _c === void 0 ? void 0 : _c.target) === null || _d === void 0 ? void 0 : _d.dataset) === null || _e === void 0 ? void 0 : _e.sid) || ((_g = (_f = this.mpEvent) === null || _f === void 0 ? void 0 : _f.target) === null || _g === void 0 ? void 0 : _g.id) || null);
      if (element === null || element && element === targetElement) {
        this.cacheCurrentTarget = this.target;
        return this.target;
      }
      currentTarget.dataset = element.dataset;
      for (const key in (_h = this.mpEvent) === null || _h === void 0 ? void 0 : _h.detail) {
        currentTarget[key] = this.mpEvent.detail[key];
      }
      this.cacheCurrentTarget = currentTarget;
      return currentTarget;
    } else {
      return cacheCurrentTarget;
    }
  }
}
function createEvent(event, node) {
  if (typeof event === "string") {
    return new TaroEvent(event, {
      bubbles: true,
      cancelable: true
    });
  }
  const domEv = new TaroEvent(event.type, {
    bubbles: true,
    cancelable: true
  }, event);
  for (const key in event) {
    if (key === CURRENT_TARGET || key === TARGET || key === TYPE || key === TIME_STAMP) {
      continue;
    } else {
      domEv[key] = event[key];
    }
  }
  if (domEv.type === CONFIRM && (node === null || node === void 0 ? void 0 : node.nodeName) === INPUT) {
    domEv[KEY_CODE] = 13;
  }
  return domEv;
}
const eventsBatch = {};
function getEventCBResult(event) {
  const result = event[EVENT_CALLBACK_RESULT];
  if (!isUndefined(result)) {
    delete event[EVENT_CALLBACK_RESULT];
  }
  return result;
}
function eventHandler(event) {
  var _a2, _b;
  event.type === void 0 && Object.defineProperty(event, "type", {
    value: event._type
    // ohos only
  });
  event.detail === void 0 && Object.defineProperty(event, "detail", {
    value: event._detail || Object.assign({}, event)
    // ohos only
  });
  event.currentTarget = event.currentTarget || event.target || Object.assign({}, event);
  hooks.call("modifyMpEventImpl", event);
  const currentTarget = event.currentTarget;
  const id = ((_a2 = currentTarget.dataset) === null || _a2 === void 0 ? void 0 : _a2.sid) || currentTarget.id || ((_b = event.detail) === null || _b === void 0 ? void 0 : _b.id) || "";
  const node = env.document.getElementById(id);
  if (node) {
    const dispatch = () => {
      const e = createEvent(event, node);
      hooks.call("modifyTaroEvent", e, node);
      hooks.call("dispatchTaroEvent", e, node);
      hooks.call("dispatchTaroEventFinish", e, node);
    };
    if (hooks.isExist("batchedEventUpdates")) {
      const type = event.type;
      if (!hooks.call("isBubbleEvents", type) || !isParentBound(node, type) || type === TOUCHMOVE && !!node.props.catchMove) {
        hooks.call("batchedEventUpdates", () => {
          if (eventsBatch[type]) {
            eventsBatch[type].forEach((fn) => fn());
            delete eventsBatch[type];
          }
          dispatch();
        });
        return getEventCBResult(event);
      } else {
        (eventsBatch[type] || (eventsBatch[type] = [])).push(dispatch);
      }
    } else {
      dispatch();
      return getEventCBResult(event);
    }
  }
}
class FormElement extends TaroElement {
  get type() {
    var _a2;
    return (_a2 = this.props[TYPE]) !== null && _a2 !== void 0 ? _a2 : "";
  }
  set type(val) {
    this.setAttribute(TYPE, val);
  }
  get value() {
    const val = this.props[VALUE];
    return val == null ? "" : val;
  }
  set value(val) {
    this.setAttribute(VALUE, val);
  }
  dispatchEvent(event) {
    if (event.mpEvent) {
      const val = event.mpEvent.detail.value;
      if (event.type === CHANGE) {
        this.props.value = val;
      } else if (event.type === INPUT) {
        this.value = val;
      }
    }
    return super.dispatchEvent(event);
  }
}
function throttle(fn, threshold = 250, scope) {
  let lastTime2 = 0;
  let deferTimer;
  return function(...args) {
    const context = scope || this;
    const now2 = Date.now();
    if (now2 - lastTime2 > threshold) {
      fn.apply(this, args);
      lastTime2 = now2;
    } else {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        lastTime2 = now2;
        fn.apply(context, args);
      }, threshold);
    }
  };
}
function debounce(fn, ms = 250, scope) {
  let timer;
  return function(...args) {
    const context = scope || this;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, ms);
  };
}
var _Performance_instances, _Performance_parseTime;
class Performance {
  constructor() {
    _Performance_instances.add(this);
    this.recorder = /* @__PURE__ */ new Map();
  }
  start(id) {
    if (!options.debug) {
      return;
    }
    this.recorder.set(id, Date.now());
  }
  stop(id, now2 = Date.now()) {
    if (!options.debug) {
      return;
    }
    const prev = this.recorder.get(id);
    if (!(prev >= 0))
      return;
    this.recorder.delete(id);
    const time = now2 - prev;
    console.log(`${id} 时长： ${time}ms 开始时间：${__classPrivateFieldGet(this, _Performance_instances, "m", _Performance_parseTime).call(this, prev)} 结束时间：${__classPrivateFieldGet(this, _Performance_instances, "m", _Performance_parseTime).call(this, now2)}`);
  }
  delayStop(id, delay = 500) {
    if (!options.debug) {
      return;
    }
    return debounce((now2 = Date.now(), cb) => {
      this.stop(id, now2);
      cb === null || cb === void 0 ? void 0 : cb();
    }, delay);
  }
}
_Performance_instances = /* @__PURE__ */ new WeakSet(), _Performance_parseTime = function _Performance_parseTime2(time) {
  const d = new Date(time);
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${`${d.getMilliseconds()}`.padStart(3, "0")}`;
};
const perf = new Performance();
function findCustomWrapper(root, dataPathArr) {
  const list = dataPathArr.slice(1);
  let currentData = root;
  let customWrapper;
  let splitedPath = "";
  list.some((item, i) => {
    const key = item.replace(/^\[(.+)\]$/, "$1").replace(/\bcn\b/g, "childNodes");
    currentData = currentData[key];
    if (isArray(currentData)) {
      currentData = currentData.filter((el) => !isComment(el));
    }
    if (isUndefined(currentData))
      return true;
    if (currentData.nodeName === CUSTOM_WRAPPER) {
      const res = customWrapperCache.get(currentData.sid);
      if (res) {
        customWrapper = res;
        splitedPath = dataPathArr.slice(i + 2).join(".");
      }
    }
  });
  if (customWrapper) {
    return {
      customWrapper,
      splitedPath
    };
  }
}
class TaroRootElement extends TaroElement {
  constructor() {
    super();
    this.updatePayloads = [];
    this.updateCallbacks = [];
    this.pendingUpdate = false;
    this.ctx = null;
    this.nodeName = ROOT_STR;
    this.tagName = ROOT_STR.toUpperCase();
  }
  get _path() {
    return ROOT_STR;
  }
  get _root() {
    return this;
  }
  scheduleTask(fn) {
    setTimeout(fn);
  }
  enqueueUpdate(payload) {
    this.updatePayloads.push(payload);
    if (!this.pendingUpdate && this.ctx) {
      this.performUpdate();
    }
  }
  performUpdate(initRender = false, prerender) {
    this.pendingUpdate = true;
    const ctx = hooks.call("proxyToRaw", this.ctx);
    this.scheduleTask(() => {
      const setDataMark = `${SET_DATA} 开始时间戳 ${Date.now()}`;
      perf.start(setDataMark);
      const data = /* @__PURE__ */ Object.create(null);
      const resetPaths = new Set(initRender ? ["root.cn.[0]", "root.cn[0]"] : []);
      while (this.updatePayloads.length > 0) {
        const {
          path,
          value
        } = this.updatePayloads.shift();
        if (path.endsWith(
          "cn"
          /* Shortcuts.Childnodes */
        )) {
          resetPaths.add(path);
        }
        data[path] = value;
      }
      for (const path in data) {
        resetPaths.forEach((p2) => {
          if (path.includes(p2) && path !== p2) {
            delete data[path];
          }
        });
        const value = data[path];
        if (isFunction(value)) {
          data[path] = value();
        }
      }
      if (isFunction(prerender))
        return prerender(data);
      this.pendingUpdate = false;
      let normalUpdate = {};
      const customWrapperMap = /* @__PURE__ */ new Map();
      if (initRender) {
        normalUpdate = data;
      } else {
        for (const p2 in data) {
          const dataPathArr = p2.split(".");
          const found = findCustomWrapper(this, dataPathArr);
          if (found) {
            const {
              customWrapper,
              splitedPath
            } = found;
            customWrapperMap.set(customWrapper, Object.assign(Object.assign({}, customWrapperMap.get(customWrapper) || {}), {
              [`i.${splitedPath}`]: data[p2]
            }));
          } else {
            normalUpdate[p2] = data[p2];
          }
        }
      }
      const customWrapperCount = customWrapperMap.size;
      const isNeedNormalUpdate = Object.keys(normalUpdate).length > 0;
      const updateArrLen = customWrapperCount + (isNeedNormalUpdate ? 1 : 0);
      let executeTime = 0;
      const cb = () => {
        if (++executeTime === updateArrLen) {
          perf.stop(setDataMark);
          this.flushUpdateCallback();
          initRender && perf.stop(PAGE_INIT);
        }
      };
      if (customWrapperCount) {
        customWrapperMap.forEach((data2, ctx2) => {
          if (options.debug) {
            console.log("custom wrapper setData: ", data2);
          }
          ctx2.setData(data2, cb);
        });
      }
      if (isNeedNormalUpdate) {
        if (options.debug) {
          console.log("page setData:", normalUpdate);
        }
        ctx.setData(normalUpdate, cb);
      }
    });
  }
  enqueueUpdateCallback(cb, ctx) {
    this.updateCallbacks.push(() => {
      ctx ? cb.call(ctx) : cb();
    });
  }
  flushUpdateCallback() {
    const updateCallbacks = this.updateCallbacks;
    if (!updateCallbacks.length)
      return;
    const copies = updateCallbacks.slice(0);
    this.updateCallbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
}
class TaroText extends TaroNode {
  constructor(value) {
    super();
    this.nodeType = 3;
    this.nodeName = "#text";
    this._value = value;
  }
  set textContent(text) {
    MutationObserver.record({
      target: this,
      type: "characterData",
      oldValue: this._value
    });
    this._value = text;
    this.enqueueUpdate({
      path: `${this._path}.${"v"}`,
      value: text
    });
  }
  get textContent() {
    return this._value;
  }
  set nodeValue(text) {
    this.textContent = text;
  }
  get nodeValue() {
    return this._value;
  }
  set data(text) {
    this.textContent = text;
  }
  get data() {
    return this._value;
  }
}
class AnchorElement extends TaroElement {
  get href() {
    var _a2;
    return (_a2 = this.props[
      "href"
      /* AnchorElementAttrs.HREF */
    ]) !== null && _a2 !== void 0 ? _a2 : "";
  }
  set href(val) {
    this.setAttribute("href", val);
  }
  get protocol() {
    var _a2;
    return (_a2 = this.props[
      "protocol"
      /* AnchorElementAttrs.PROTOCOL */
    ]) !== null && _a2 !== void 0 ? _a2 : "";
  }
  get host() {
    var _a2;
    return (_a2 = this.props[
      "host"
      /* AnchorElementAttrs.HOST */
    ]) !== null && _a2 !== void 0 ? _a2 : "";
  }
  get search() {
    var _a2;
    return (_a2 = this.props[
      "search"
      /* AnchorElementAttrs.SEARCH */
    ]) !== null && _a2 !== void 0 ? _a2 : "";
  }
  get hash() {
    var _a2;
    return (_a2 = this.props[
      "hash"
      /* AnchorElementAttrs.HASH */
    ]) !== null && _a2 !== void 0 ? _a2 : "";
  }
  get hostname() {
    var _a2;
    return (_a2 = this.props[
      "hostname"
      /* AnchorElementAttrs.HOSTNAME */
    ]) !== null && _a2 !== void 0 ? _a2 : "";
  }
  get port() {
    var _a2;
    return (_a2 = this.props[
      "port"
      /* AnchorElementAttrs.PORT */
    ]) !== null && _a2 !== void 0 ? _a2 : "";
  }
  get pathname() {
    var _a2;
    return (_a2 = this.props[
      "pathname"
      /* AnchorElementAttrs.PATHNAME */
    ]) !== null && _a2 !== void 0 ? _a2 : "";
  }
  setAttribute(qualifiedName, value) {
    if (qualifiedName === "href") {
      const willSetAttr = parseUrl(value);
      for (const k2 in willSetAttr) {
        super.setAttribute(k2, willSetAttr[k2]);
      }
    } else {
      super.setAttribute(qualifiedName, value);
    }
  }
}
class TransferElement extends TaroElement {
  constructor(dataName) {
    super();
    this.dataName = dataName;
    this.isTransferElement = true;
  }
  get _path() {
    return this.dataName;
  }
}
class TaroDocument extends TaroElement {
  constructor() {
    super();
    this.createEvent = createEvent;
    this.nodeType = 9;
    this.nodeName = DOCUMENT_ELEMENT_NAME;
  }
  createElement(type) {
    const nodeName = type.toLowerCase();
    let element;
    switch (true) {
      case nodeName === ROOT_STR:
        element = new TaroRootElement();
        return element;
      case controlledComponent.has(nodeName):
        element = new FormElement();
        break;
      case nodeName === A$1:
        element = new AnchorElement();
        break;
      case nodeName === "page-meta":
      case nodeName === "navigation-bar":
        element = new TransferElement(toCamelCase(nodeName));
        break;
      default:
        element = new TaroElement();
        break;
    }
    element.nodeName = nodeName;
    element.tagName = type.toUpperCase();
    return element;
  }
  // an ugly fake createElementNS to deal with @vue/runtime-dom's
  // support mounting app to svg container since vue@3.0.8
  createElementNS(_svgNS, type) {
    return this.createElement(type);
  }
  createTextNode(text) {
    return new TaroText(text);
  }
  getElementById(id) {
    const el = eventSource.get(id);
    return isUndefined(el) ? null : el;
  }
  querySelector(query) {
    if (/^#/.test(query)) {
      return this.getElementById(query.slice(1));
    }
    return null;
  }
  querySelectorAll() {
    return [];
  }
  // @TODO: @PERF: 在 hydrate 移除掉空的 node
  createComment() {
    const textnode = new TaroText("");
    textnode.nodeName = COMMENT;
    return textnode;
  }
  get defaultView() {
    return env.window;
  }
}
function createDocument() {
  const doc = new TaroDocument();
  const documentCreateElement = doc.createElement.bind(doc);
  const html = documentCreateElement(HTML);
  const head = documentCreateElement(HEAD);
  const body = documentCreateElement(BODY);
  const app = documentCreateElement(APP);
  app.id = APP;
  const container = documentCreateElement(CONTAINER);
  doc.appendChild(html);
  html.appendChild(head);
  html.appendChild(body);
  body.appendChild(container);
  container.appendChild(app);
  doc.documentElement = html;
  doc.head = head;
  doc.body = body;
  return doc;
}
const taroDocumentProvider = env.document = createDocument();
class SVGElement extends TaroElement {
}
const addLeadingSlash = (url = "") => url.charAt(0) === "/" ? url : "/" + url;
const hasBasename = (path = "", prefix = "") => new RegExp("^" + prefix + "(\\/|\\?|#|$)", "i").test(path) || path === prefix;
const stripBasename = (path = "", prefix = "") => hasBasename(path, prefix) ? path.substring(prefix.length) : path;
const stripTrailing = (str = "") => str.replace(/[?#][\s\S]*$/, "");
const stripSuffix = (path = "", suffix = "") => path.includes(suffix) ? path.substring(0, path.length - suffix.length) : path;
const getHomePage = (path = "", basename = "", customRoutes = {}, entryPagePath = "") => {
  var _a2;
  const routePath = addLeadingSlash(stripBasename(path, basename));
  const alias = ((_a2 = Object.entries(customRoutes).find(([key]) => key === routePath)) === null || _a2 === void 0 ? void 0 : _a2[1]) || routePath;
  return entryPagePath || (typeof alias === "string" ? alias : alias[0]) || basename;
};
const getCurrentPage = (routerMode = "hash", basename = "/") => {
  const pagePath = routerMode === "hash" ? taroLocationProvider.hash.slice(1).split("?")[0] : taroLocationProvider.pathname;
  return addLeadingSlash(stripBasename(pagePath, basename));
};
const instances = /* @__PURE__ */ new Map();
const pageId = incrementId();
function injectPageInstance(inst, id) {
  hooks.call("mergePageInstance", instances.get(id), inst);
  instances.set(id, inst);
}
function getPageInstance(id) {
  return instances.get(id);
}
function removePageInstance(id) {
  instances.delete(id);
}
function safeExecute(path, lifecycle, ...args) {
  const instance = instances.get(path);
  if (instance == null) {
    return;
  }
  const func = hooks.call("getLifecycle", instance, lifecycle);
  if (isArray(func)) {
    const res = func.map((fn) => fn.apply(instance, args));
    return res[0];
  }
  if (!isFunction(func)) {
    return;
  }
  return func.apply(instance, args);
}
function stringify(obj) {
  if (obj == null) {
    return "";
  }
  const path = Object.keys(obj).map((key) => {
    return key + "=" + obj[key];
  }).join("&");
  return path === "" ? path : "?" + path;
}
function getPath(id, options2) {
  const idx = id.indexOf("?");
  {
    return `${idx > -1 ? id.substring(0, idx) : id}${stringify(options2)}`;
  }
}
function getOnReadyEventKey(path) {
  return path + "." + ON_READY;
}
function getOnShowEventKey(path) {
  return path + "." + ON_SHOW;
}
function getOnHideEventKey(path) {
  return path + "." + ON_HIDE;
}
function createPageConfig(component, pageName, data, pageConfig) {
  const id = pageName !== null && pageName !== void 0 ? pageName : `taro_page_${pageId()}`;
  const [ONLOAD, ONUNLOAD, ONREADY, ONSHOW, ONHIDE, LIFECYCLES, SIDE_EFFECT_LIFECYCLES] = hooks.call("getMiniLifecycleImpl").page;
  let pageElement = null;
  let unmounting = false;
  let prepareMountList = [];
  function setCurrentRouter(page) {
    const router = page.route || page.__route__ || page.$taroPath;
    Current.router = {
      params: page.$taroParams,
      path: addLeadingSlash(router),
      $taroPath: page.$taroPath,
      onReady: getOnReadyEventKey(id),
      onShow: getOnShowEventKey(id),
      onHide: getOnHideEventKey(id)
    };
    if (!isUndefined(page.exitState)) {
      Current.router.exitState = page.exitState;
    }
  }
  let loadResolver;
  let hasLoaded;
  const config = {
    [ONLOAD](options2 = {}, cb) {
      hasLoaded = new Promise((resolve) => {
        loadResolver = resolve;
      });
      perf.start(PAGE_INIT);
      Current.page = this;
      this.config = pageConfig || {};
      const uniqueOptions = Object.assign({}, options2, {
        $taroTimestamp: Date.now()
      });
      const $taroPath = this.$taroPath = getPath(id, uniqueOptions);
      if (this.$taroParams == null) {
        this.$taroParams = uniqueOptions;
      }
      setCurrentRouter(this);
      {
        taroWindowProvider.trigger(CONTEXT_ACTIONS.INIT, $taroPath);
      }
      const mount = () => {
        Current.app.mount(component, $taroPath, () => {
          pageElement = env.document.getElementById($taroPath);
          ensure(pageElement !== null, "没有找到页面实例。");
          safeExecute($taroPath, ON_LOAD, this.$taroParams);
          loadResolver();
          {
            pageElement.ctx = this;
            pageElement.performUpdate(true, cb);
          }
        });
      };
      if (unmounting) {
        prepareMountList.push(mount);
      } else {
        mount();
      }
    },
    [ONUNLOAD]() {
      const $taroPath = this.$taroPath;
      {
        taroWindowProvider.trigger(CONTEXT_ACTIONS.DESTROY, $taroPath);
      }
      safeExecute($taroPath, ONUNLOAD);
      unmounting = true;
      Current.app.unmount($taroPath, () => {
        unmounting = false;
        instances.delete($taroPath);
        if (pageElement) {
          pageElement.ctx = null;
          pageElement = null;
        }
        if (prepareMountList.length) {
          prepareMountList.forEach((fn) => fn());
          prepareMountList = [];
        }
      });
    },
    [ONREADY]() {
      hasLoaded.then(() => {
        safeExecute(this.$taroPath, ON_READY);
        _raf(() => eventCenter.trigger(getOnReadyEventKey(id)));
        this.onReady.called = true;
      });
    },
    [ONSHOW](options2 = {}) {
      hasLoaded.then(() => {
        Current.page = this;
        setCurrentRouter(this);
        {
          taroWindowProvider.trigger(CONTEXT_ACTIONS.RECOVER, this.$taroPath);
        }
        safeExecute(this.$taroPath, ON_SHOW, options2);
        _raf(() => eventCenter.trigger(getOnShowEventKey(id)));
      });
    },
    [ONHIDE]() {
      {
        taroWindowProvider.trigger(CONTEXT_ACTIONS.RESTORE, this.$taroPath);
      }
      if (Current.page === this) {
        Current.page = null;
        Current.router = null;
      }
      safeExecute(this.$taroPath, ON_HIDE);
      eventCenter.trigger(getOnHideEventKey(id));
    }
  };
  LIFECYCLES.forEach((lifecycle) => {
    let isDefer = false;
    let isEvent = false;
    lifecycle = lifecycle.replace(/^defer:/, () => {
      isDefer = true;
      return "";
    });
    lifecycle = lifecycle.replace(/^events:/, () => {
      isEvent = true;
      return "";
    });
    if (isEvent && false) {
      if (!config.events)
        config.events = {};
      config.events[lifecycle] = function() {
        return safeExecute(this.$taroPath, lifecycle, ...arguments);
      };
    } else {
      config[lifecycle] = function() {
        const exec = () => safeExecute(this.$taroPath, lifecycle, ...arguments);
        if (isDefer) {
          hasLoaded.then(exec);
        } else {
          return exec();
        }
      };
    }
  });
  SIDE_EFFECT_LIFECYCLES.forEach((lifecycle) => {
    var _a2;
    if (component[lifecycle] || ((_a2 = component.prototype) === null || _a2 === void 0 ? void 0 : _a2[lifecycle]) || component[lifecycle.replace(/^on/, "enable")] || (pageConfig === null || pageConfig === void 0 ? void 0 : pageConfig[lifecycle.replace(/^on/, "enable")])) {
      config[lifecycle] = function(...args) {
        var _a3;
        const target = (_a3 = args[0]) === null || _a3 === void 0 ? void 0 : _a3.target;
        if (target === null || target === void 0 ? void 0 : target.id) {
          const id2 = target.id;
          const element = env.document.getElementById(id2);
          if (element) {
            target.dataset = element.dataset;
          }
        }
        return safeExecute(this.$taroPath, lifecycle, ...args);
      };
    }
  });
  config.eh = eventHandler;
  if (!isUndefined(data)) {
    config.data = data;
  }
  hooks.call("modifyPageObject", config);
  return config;
}
function createComponentConfig(component, componentName, data) {
  const id = componentName !== null && componentName !== void 0 ? componentName : `taro_component_${pageId()}`;
  let componentElement = null;
  const [ATTACHED, DETACHED] = hooks.call("getMiniLifecycleImpl").component;
  const config = {
    [ATTACHED]() {
      var _a2;
      perf.start(PAGE_INIT);
      this.pageIdCache = ((_a2 = this.getPageId) === null || _a2 === void 0 ? void 0 : _a2.call(this)) || pageId();
      const path = getPath(id, {
        id: this.pageIdCache
      });
      Current.app.mount(component, path, () => {
        componentElement = env.document.getElementById(path);
        ensure(componentElement !== null, "没有找到组件实例。");
        this.$taroInstances = instances.get(path);
        safeExecute(path, ON_LOAD);
        {
          componentElement.ctx = this;
          componentElement.performUpdate(true);
        }
      });
    },
    [DETACHED]() {
      const path = getPath(id, {
        id: this.pageIdCache
      });
      Current.app.unmount(path, () => {
        instances.delete(path);
        if (componentElement) {
          componentElement.ctx = null;
        }
      });
    },
    methods: {
      eh: eventHandler
    }
  };
  if (!isUndefined(data)) {
    config.data = data;
  }
  [OPTIONS, EXTERNAL_CLASSES, BEHAVIORS].forEach((key) => {
    var _a2;
    config[key] = (_a2 = component[key]) !== null && _a2 !== void 0 ? _a2 : EMPTY_OBJ;
  });
  return config;
}
function createRecursiveComponentConfig(componentName) {
  const isCustomWrapper = componentName === CUSTOM_WRAPPER;
  const [ATTACHED, DETACHED] = hooks.call("getMiniLifecycleImpl").component;
  const lifeCycles = isCustomWrapper ? {
    [ATTACHED]() {
      var _a2, _b;
      const componentId = ((_a2 = this.data.i) === null || _a2 === void 0 ? void 0 : _a2.sid) || ((_b = this.props.i) === null || _b === void 0 ? void 0 : _b.sid);
      if (isString(componentId)) {
        customWrapperCache.set(componentId, this);
        const el = env.document.getElementById(componentId);
        if (el) {
          el.ctx = this;
        }
      }
    },
    [DETACHED]() {
      var _a2, _b;
      const componentId = ((_a2 = this.data.i) === null || _a2 === void 0 ? void 0 : _a2.sid) || ((_b = this.props.i) === null || _b === void 0 ? void 0 : _b.sid);
      if (isString(componentId)) {
        customWrapperCache.delete(componentId);
        const el = env.document.getElementById(componentId);
        if (el) {
          el.ctx = null;
        }
      }
    }
  } : EMPTY_OBJ;
  const extraOptions = {};
  return hooks.call("modifyRecursiveComponentConfig", Object.assign({
    properties: {
      i: {
        type: Object,
        value: {
          [
            "nn"
            /* Shortcuts.NodeName */
          ]: getComponentsAlias$1(internalComponents)[VIEW]._num
        }
      },
      l: {
        type: String,
        value: ""
      }
    },
    options: Object.assign(Object.assign({}, extraOptions), {
      virtualHost: !isCustomWrapper
    }),
    methods: {
      eh: eventHandler
    }
  }, lifeCycles), {
    isCustomWrapper
  });
}
const TIMEOUT = 100;
const nextTick = (cb, ctx) => {
  const beginTime = Date.now();
  const router = Current.router;
  const timerFunc = () => {
    setTimeout(function() {
      ctx ? cb.call(ctx) : cb();
    }, 1);
  };
  if (router === null)
    return timerFunc();
  const path = router.$taroPath;
  function next() {
    const pageElement = env.document.getElementById(path);
    if (pageElement === null || pageElement === void 0 ? void 0 : pageElement.pendingUpdate) {
      {
        pageElement.enqueueUpdateCallback(cb, ctx);
      }
    } else if (Date.now() - beginTime > TIMEOUT) {
      timerFunc();
    } else {
      setTimeout(() => next(), 20);
    }
  }
  next();
};
function handlePolyfill() {
}
const dist$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  A: A$1,
  APP,
  BEHAVIORS,
  BODY,
  CATCHMOVE,
  CATCH_VIEW,
  CHANGE,
  CLASS,
  CLICK_VIEW,
  COMMENT,
  COMPILE_MODE,
  CONFIRM,
  CONTAINER,
  get CONTEXT_ACTIONS() {
    return CONTEXT_ACTIONS;
  },
  CURRENT_TARGET,
  CUSTOM_WRAPPER,
  Current,
  DATASET,
  DATE,
  DOCUMENT_ELEMENT_NAME,
  DOCUMENT_FRAGMENT,
  EVENT_CALLBACK_RESULT,
  EXTERNAL_CLASSES,
  Events,
  FOCUS,
  FormElement,
  HEAD,
  HOOKS_APP_ID: HOOKS_APP_ID$1,
  HTML,
  History,
  ID,
  INPUT,
  KEY_CODE,
  Location,
  MutationObserver,
  OBJECT,
  ON_HIDE,
  ON_LOAD,
  ON_READY,
  ON_SHOW,
  OPTIONS,
  PAGE_INIT,
  PROPERTY_THRESHOLD,
  PROPS,
  PURE_VIEW,
  ROOT_STR,
  SET_DATA,
  SET_TIMEOUT,
  STATIC_VIEW,
  STYLE,
  SVGElement,
  Style,
  TARGET,
  TARO_RUNTIME,
  TIME_STAMP,
  TOUCHMOVE,
  TYPE,
  TaroElement,
  TaroEvent,
  TaroNode,
  TaroRootElement,
  TaroText,
  UID,
  URL: TaroURLProvider,
  URLSearchParams,
  VALUE,
  VIEW,
  addLeadingSlash,
  cancelAnimationFrame: _caf,
  convertNumber2PX,
  createComponentConfig,
  createEvent,
  createPageConfig,
  createRecursiveComponentConfig,
  customWrapperCache,
  debounce,
  document: taroDocumentProvider,
  env,
  eventCenter,
  eventHandler,
  eventSource,
  extend,
  getComponentsAlias,
  getComputedStyle: taroGetComputedStyleProvider,
  getCurrentInstance,
  getCurrentPage,
  getHomePage,
  getOnHideEventKey,
  getOnReadyEventKey,
  getOnShowEventKey,
  getPageInstance,
  getPath,
  handlePolyfill,
  hasBasename,
  history: taroHistoryProvider,
  hooks,
  hydrate,
  incrementId,
  injectPageInstance,
  isComment,
  isElement,
  isHasExtractProp,
  isParentBound,
  isText,
  location: taroLocationProvider,
  navigator: nav,
  nextTick,
  get now() {
    return now;
  },
  options,
  parseUrl,
  perf,
  removePageInstance,
  requestAnimationFrame: _raf,
  safeExecute,
  shortcutAttr,
  stringify,
  stripBasename,
  stripSuffix,
  stripTrailing,
  throttle,
  window: taroWindowProvider
}, Symbol.toStringTag, { value: "Module" }));
const reactMeta = {
  PageContext: EMPTY_OBJ,
  R: EMPTY_OBJ
};
const HOOKS_APP_ID = "taro-app";
function isClassComponent(R2, component) {
  var _a2;
  const prototype = component.prototype;
  if ((_a2 = component.displayName) === null || _a2 === void 0 ? void 0 : _a2.includes("Connect"))
    return false;
  return isFunction(component.render) || !!(prototype === null || prototype === void 0 ? void 0 : prototype.isReactComponent) || prototype instanceof R2.Component;
}
function ensureIsArray(item) {
  if (isArray(item)) {
    return item;
  } else {
    return item ? [item] : [];
  }
}
function setDefaultDescriptor(obj) {
  obj.writable = true;
  obj.enumerable = true;
  return obj;
}
function setRouterParams(options2) {
  Current.router = Object.assign({
    params: options2 === null || options2 === void 0 ? void 0 : options2.query
  }, options2);
}
const createTaroHook = (lifecycle) => {
  return (fn) => {
    const {
      R: React2,
      PageContext
    } = reactMeta;
    const id = React2.useContext(PageContext) || HOOKS_APP_ID;
    const instRef = React2.useRef();
    const fnRef = React2.useRef(fn);
    if (fnRef.current !== fn)
      fnRef.current = fn;
    React2.useLayoutEffect(() => {
      let inst = instRef.current = getPageInstance(id);
      let first = false;
      if (!inst) {
        first = true;
        instRef.current = /* @__PURE__ */ Object.create(null);
        inst = instRef.current;
      }
      const callback = (...args) => fnRef.current(...args);
      if (isFunction(inst[lifecycle])) {
        inst[lifecycle] = [inst[lifecycle], callback];
      } else {
        inst[lifecycle] = [...inst[lifecycle] || [], callback];
      }
      if (first) {
        injectPageInstance(inst, id);
      }
      return () => {
        const inst2 = instRef.current;
        if (!inst2)
          return;
        const list = inst2[lifecycle];
        if (list === callback) {
          inst2[lifecycle] = void 0;
        } else if (isArray(list)) {
          inst2[lifecycle] = list.filter((item) => item !== callback);
        }
        instRef.current = void 0;
      };
    }, []);
  };
};
const useDidHide = createTaroHook("componentDidHide");
const useDidShow = createTaroHook("componentDidShow");
const useError = createTaroHook("onError");
const useUnhandledRejection = createTaroHook("onUnhandledRejection");
const useLaunch = createTaroHook("onLaunch");
const usePageNotFound = createTaroHook("onPageNotFound");
const useLoad = createTaroHook("onLoad");
const usePageScroll = createTaroHook("onPageScroll");
const usePullDownRefresh = createTaroHook("onPullDownRefresh");
const usePullIntercept = createTaroHook("onPullIntercept");
const useReachBottom = createTaroHook("onReachBottom");
const useResize = createTaroHook("onResize");
const useUnload = createTaroHook("onUnload");
const useAddToFavorites = createTaroHook("onAddToFavorites");
const useOptionMenuClick = createTaroHook("onOptionMenuClick");
const useKeyboardHeight = createTaroHook("onKeyboardHeight");
const useSaveExitState = createTaroHook("onSaveExitState");
const useShareAppMessage = createTaroHook("onShareAppMessage");
const useShareTimeline = createTaroHook("onShareTimeline");
const useTitleClick = createTaroHook("onTitleClick");
const useReady = createTaroHook("onReady");
const useRouter = (dynamic = false) => {
  const React2 = reactMeta.R;
  return dynamic ? Current.router : React2.useMemo(() => Current.router, []);
};
const useTabItemTap = createTaroHook("onTabItemTap");
const useScope = () => void 0;
var taroHooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  useAddToFavorites,
  useDidHide,
  useDidShow,
  useError,
  useKeyboardHeight,
  useLaunch,
  useLoad,
  useOptionMenuClick,
  usePageNotFound,
  usePageScroll,
  usePullDownRefresh,
  usePullIntercept,
  useReachBottom,
  useReady,
  useResize,
  useRouter,
  useSaveExitState,
  useScope,
  useShareAppMessage,
  useShareTimeline,
  useTabItemTap,
  useTitleClick,
  useUnhandledRejection,
  useUnload
});
let h$1;
let ReactDOM$1;
const pageKeyId = incrementId();
function setReconciler(ReactDOM) {
  hooks.tap("getLifecycle", function(instance, lifecycle) {
    lifecycle = lifecycle.replace(/^on(Show|Hide)$/, "componentDid$1");
    return instance[lifecycle];
  });
  hooks.tap("modifyMpEvent", function(event) {
    Object.defineProperty(event, "type", {
      value: event.type.replace(/-/g, "")
    });
  });
  hooks.tap("batchedEventUpdates", function(cb) {
    ReactDOM === null || ReactDOM === void 0 ? void 0 : ReactDOM.unstable_batchedUpdates(cb);
  });
  hooks.tap("mergePageInstance", function(prev, next) {
    if (!prev || !next)
      return;
    if ("constructor" in prev)
      return;
    Object.keys(prev).forEach((item) => {
      const prevList = prev[item];
      const nextList = ensureIsArray(next[item]);
      next[item] = nextList.concat(prevList);
    });
  });
}
function connectReactPage(R2, id) {
  return (Page) => {
    const isReactComponent = isClassComponent(R2, Page);
    const inject = (node) => node && injectPageInstance(node, id);
    const refs = isReactComponent ? {
      ref: inject
    } : {
      forwardedRef: inject,
      // 兼容 react-redux 7.20.1+
      reactReduxForwardedRef: inject
    };
    if (reactMeta.PageContext === EMPTY_OBJ) {
      reactMeta.PageContext = R2.createContext("");
    }
    return class PageWrapper extends R2.Component {
      constructor() {
        super(...arguments);
        this.state = {
          hasError: false
        };
      }
      static getDerivedStateFromError(error) {
        var _a2, _b;
        (_b = (_a2 = Current.app) === null || _a2 === void 0 ? void 0 : _a2.onError) === null || _b === void 0 ? void 0 : _b.call(_a2, error.message + error.stack);
        return {
          hasError: true
        };
      }
      // React 16 uncaught error 会导致整个应用 crash，
      // 目前把错误缩小到页面
      componentDidCatch(error, info) {
        {
          console.warn(error);
          console.error(info.componentStack);
        }
      }
      render() {
        const children = this.state.hasError ? [] : h$1(reactMeta.PageContext.Provider, {
          value: id
        }, h$1(Page, Object.assign(Object.assign({}, this.props), refs)));
        {
          return h$1("root", {
            id
          }, children);
        }
      }
    };
  };
}
function createReactApp(App, react, dom, config) {
  {
    ensure(!!dom, `构建 React/Preact 项目请把 "react" 设置为 'react'/'preact' `);
  }
  reactMeta.R = react;
  h$1 = react.createElement;
  ReactDOM$1 = dom;
  react.Fragment;
  const appInstanceRef = react.createRef();
  const isReactComponent = isClassComponent(react, App);
  let appWrapper;
  let appWrapperResolver;
  const appWrapperPromise = new Promise((resolve) => appWrapperResolver = resolve);
  setReconciler(ReactDOM$1);
  function getAppInstance() {
    return appInstanceRef.current;
  }
  function waitAppWrapper(cb) {
    appWrapperPromise.then(() => cb());
  }
  function renderReactRoot() {
    var _a2, _b;
    const appId = (config === null || config === void 0 ? void 0 : config.appId) || "app";
    let container = taroDocumentProvider.getElementById(appId);
    if (container == null) {
      const appContainer = taroDocumentProvider.getElementById(CONTAINER);
      container = taroDocumentProvider.createElement(appId);
      container.id = appId;
      appContainer === null || appContainer === void 0 ? void 0 : appContainer.appendChild(container);
    }
    if ((react.version || "").startsWith("18")) {
      const root = ReactDOM$1.createRoot(container);
      (_a2 = root.render) === null || _a2 === void 0 ? void 0 : _a2.call(root, h$1(AppWrapper));
    } else {
      (_b = ReactDOM$1.render) === null || _b === void 0 ? void 0 : _b.call(ReactDOM$1, h$1(AppWrapper), container);
    }
  }
  class AppWrapper extends react.Component {
    constructor(props) {
      super(props);
      this.pages = [];
      this.elements = [];
      appWrapper = this;
      appWrapperResolver(this);
    }
    mount(pageComponent, id, cb) {
      const pageWrapper = connectReactPage(react, id)(pageComponent);
      const key = id + pageKeyId();
      const page = () => h$1(pageWrapper, {
        key,
        tid: id
      });
      this.pages.push(page);
      this.forceUpdate((...args) => {
        perf.stop(PAGE_INIT);
        return cb(...args);
      });
    }
    unmount(id, cb) {
      const elements = this.elements;
      const idx = elements.findIndex((item) => item.props.tid === id);
      elements.splice(idx, 1);
      this.forceUpdate(cb);
    }
    render() {
      const {
        pages,
        elements
      } = this;
      while (pages.length > 0) {
        const page = pages.pop();
        elements.push(page());
      }
      let props = null;
      if (isReactComponent) {
        props = {
          ref: appInstanceRef
        };
      }
      return h$1(App, props, elements.slice());
    }
  }
  {
    renderReactRoot();
  }
  const [ONLAUNCH, ONSHOW, ONHIDE] = hooks.call("getMiniLifecycleImpl").app;
  const appObj = Object.create({
    render(cb) {
      appWrapper.forceUpdate(cb);
    },
    mount(component, id, cb) {
      if (appWrapper) {
        appWrapper.mount(component, id, cb);
      } else {
        appWrapperPromise.then((appWrapper2) => appWrapper2.mount(component, id, cb));
      }
    },
    unmount(id, cb) {
      if (appWrapper) {
        appWrapper.unmount(id, cb);
      } else {
        appWrapperPromise.then((appWrapper2) => appWrapper2.unmount(id, cb));
      }
    }
  }, {
    config: setDefaultDescriptor({
      configurable: true,
      value: config
    }),
    [ONLAUNCH]: setDefaultDescriptor({
      value(options2) {
        setRouterParams(options2);
        const onLaunch = () => {
          var _a2;
          const app = getAppInstance();
          this.$app = app;
          if (app) {
            if (app.taroGlobalData) {
              const globalData = app.taroGlobalData;
              const keys = Object.keys(globalData);
              const descriptors = Object.getOwnPropertyDescriptors(globalData);
              keys.forEach((key) => {
                Object.defineProperty(this, key, {
                  configurable: true,
                  enumerable: true,
                  get() {
                    return globalData[key];
                  },
                  set(value) {
                    globalData[key] = value;
                  }
                });
              });
              Object.defineProperties(this, descriptors);
            }
            (_a2 = app.onLaunch) === null || _a2 === void 0 ? void 0 : _a2.call(app, options2);
          }
          triggerAppHook("onLaunch", options2);
        };
        waitAppWrapper(onLaunch);
      }
    }),
    [ONSHOW]: setDefaultDescriptor({
      value(options2) {
        setRouterParams(options2);
        const onShow = () => {
          var _a2;
          const app = getAppInstance();
          (_a2 = app === null || app === void 0 ? void 0 : app.componentDidShow) === null || _a2 === void 0 ? void 0 : _a2.call(app, options2);
          triggerAppHook("onShow", options2);
        };
        waitAppWrapper(onShow);
      }
    }),
    [ONHIDE]: setDefaultDescriptor({
      value() {
        const onHide = () => {
          var _a2;
          const app = getAppInstance();
          (_a2 = app === null || app === void 0 ? void 0 : app.componentDidHide) === null || _a2 === void 0 ? void 0 : _a2.call(app);
          triggerAppHook("onHide");
        };
        waitAppWrapper(onHide);
      }
    }),
    onError: setDefaultDescriptor({
      value(error) {
        const onError = () => {
          var _a2;
          const app = getAppInstance();
          (_a2 = app === null || app === void 0 ? void 0 : app.onError) === null || _a2 === void 0 ? void 0 : _a2.call(app, error);
          triggerAppHook("onError", error);
          if (error === null || error === void 0 ? void 0 : error.includes("Minified React error")) {
            console.warn("React 出现报错，请打开编译配置 mini.debugReact 查看报错详情：https://docs.taro.zone/docs/config-detail#minidebugreact");
          }
        };
        waitAppWrapper(onError);
      }
    }),
    onUnhandledRejection: setDefaultDescriptor({
      value(res) {
        const onUnhandledRejection = () => {
          var _a2;
          const app = getAppInstance();
          (_a2 = app === null || app === void 0 ? void 0 : app.onUnhandledRejection) === null || _a2 === void 0 ? void 0 : _a2.call(app, res);
          triggerAppHook("onUnhandledRejection", res);
        };
        waitAppWrapper(onUnhandledRejection);
      }
    }),
    onPageNotFound: setDefaultDescriptor({
      value(res) {
        const onPageNotFound = () => {
          var _a2;
          const app = getAppInstance();
          (_a2 = app === null || app === void 0 ? void 0 : app.onPageNotFound) === null || _a2 === void 0 ? void 0 : _a2.call(app, res);
          triggerAppHook("onPageNotFound", res);
        };
        waitAppWrapper(onPageNotFound);
      }
    })
  });
  function triggerAppHook(lifecycle, ...option) {
    const instance = getPageInstance(HOOKS_APP_ID);
    if (instance) {
      const app = getAppInstance();
      const func = hooks.call("getLifecycle", instance, lifecycle);
      if (Array.isArray(func)) {
        func.forEach((cb) => cb.apply(app, option));
      }
    }
  }
  Current.app = appObj;
  return appObj;
}
incrementId();
hooks.tap("initNativeApi", function(taro2) {
  for (const hook in taroHooks) {
    taro2[hook] = taroHooks[hook];
  }
});
var taro = {
  exports: {}
};
const require$$0 = /* @__PURE__ */ babelHelpers.getAugmentedNamespace(dist$1);
const ENV_TYPE = {
  ASCF: "ASCF",
  WEAPP: "WEAPP",
  SWAN: "SWAN",
  ALIPAY: "ALIPAY",
  TT: "TT",
  QQ: "QQ",
  JD: "JD",
  WEB: "WEB",
  RN: "RN",
  HARMONY: "HARMONY",
  QUICKAPP: "QUICKAPP",
  HARMONYHYBRID: "HARMONYHYBRID"
};
function getEnv() {
  {
    return ENV_TYPE.WEAPP;
  }
}
class Chain {
  constructor(requestParams, interceptors2, index2) {
    this.index = index2 || 0;
    this.requestParams = requestParams || {};
    this.interceptors = interceptors2 || [];
  }
  proceed(requestParams = {}) {
    this.requestParams = requestParams;
    if (this.index >= this.interceptors.length) {
      throw new Error("chain 参数错误, 请勿直接修改 request.chain");
    }
    const nextInterceptor = this._getNextInterceptor();
    const nextChain = this._getNextChain();
    const p2 = nextInterceptor(nextChain);
    const res = p2.catch((err) => Promise.reject(err));
    Object.keys(p2).forEach((k2) => isFunction(p2[k2]) && (res[k2] = p2[k2]));
    return res;
  }
  _getNextInterceptor() {
    return this.interceptors[this.index];
  }
  _getNextChain() {
    return new Chain(this.requestParams, this.interceptors, this.index + 1);
  }
}
class Link {
  constructor(interceptor) {
    this.taroInterceptor = interceptor;
    this.chain = new Chain();
  }
  request(requestParams) {
    const chain = this.chain;
    const taroInterceptor = this.taroInterceptor;
    chain.interceptors = chain.interceptors.filter((interceptor) => interceptor !== taroInterceptor).concat(taroInterceptor);
    return chain.proceed(Object.assign({}, requestParams));
  }
  addInterceptor(interceptor) {
    this.chain.interceptors.push(interceptor);
  }
  cleanInterceptors() {
    this.chain = new Chain();
  }
}
function interceptorify(promisifyApi) {
  return new Link(function(chain) {
    return promisifyApi(chain.requestParams);
  });
}
function timeoutInterceptor(chain) {
  const requestParams = chain.requestParams;
  let p2;
  const res = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      reject(new Error("网络链接超时,请稍后再试！"));
    }, requestParams && requestParams.timeout || 6e4);
    p2 = chain.proceed(requestParams);
    p2.then((res2) => {
      if (!timeout)
        return;
      clearTimeout(timeout);
      resolve(res2);
    }).catch((err) => {
      timeout && clearTimeout(timeout);
      reject(err);
    });
  });
  if (!isUndefined(p2) && isFunction(p2.abort))
    res.abort = p2.abort;
  return res;
}
function logInterceptor(chain) {
  const requestParams = chain.requestParams;
  const {
    method,
    data,
    url
  } = requestParams;
  console.log(`http ${method || "GET"} --> ${url} data: `, data);
  const p2 = chain.proceed(requestParams);
  const res = p2.then((res2) => {
    console.log(`http <-- ${url} result:`, res2);
    return res2;
  });
  if (isFunction(p2.abort))
    res.abort = p2.abort;
  return res;
}
const interceptors = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  logInterceptor,
  timeoutInterceptor
}, Symbol.toStringTag, { value: "Module" }));
function Behavior(options2) {
  return options2;
}
function getPreload(current) {
  return function(key, val) {
    current.preloadData = isObject(key) ? key : {
      [key]: val
    };
  };
}
const defaultDesignWidth = 750;
const defaultDesignRatio = {
  640: 2.34 / 2,
  750: 1,
  828: 1.81 / 2
};
const defaultBaseFontSize = 20;
const defaultUnitPrecision = 5;
const defaultTargetUnit = "rpx";
function getInitPxTransform(taro2) {
  return function(config) {
    const {
      designWidth = defaultDesignWidth,
      deviceRatio = defaultDesignRatio,
      baseFontSize = defaultBaseFontSize,
      targetUnit = defaultTargetUnit,
      unitPrecision = defaultUnitPrecision
    } = config;
    taro2.config = taro2.config || {};
    taro2.config.designWidth = designWidth;
    taro2.config.deviceRatio = deviceRatio;
    taro2.config.baseFontSize = baseFontSize;
    taro2.config.targetUnit = targetUnit;
    taro2.config.unitPrecision = unitPrecision;
  };
}
function getPxTransform(taro2) {
  return function(size2) {
    const config = taro2.config || {};
    const baseFontSize = config.baseFontSize;
    const deviceRatio = config.deviceRatio || defaultDesignRatio;
    const designWidth = ((input = 0) => isFunction(config.designWidth) ? config.designWidth(input) : config.designWidth || defaultDesignWidth)(size2);
    if (!(designWidth in deviceRatio)) {
      throw new Error(`deviceRatio 配置中不存在 ${designWidth} 的设置！`);
    }
    const targetUnit = config.targetUnit || defaultTargetUnit;
    const unitPrecision = config.unitPrecision || defaultUnitPrecision;
    const formatSize = ~~size2;
    let rootValue = 1 / deviceRatio[designWidth];
    switch (targetUnit) {
      case "rem":
        rootValue *= baseFontSize * 2;
        break;
      case "px":
        rootValue *= 2;
        break;
    }
    let val = formatSize / rootValue;
    if (unitPrecision >= 0 && unitPrecision <= 100) {
      val = Number(val.toFixed(unitPrecision));
    }
    return val + targetUnit;
  };
}
const Taro$1 = {
  Behavior,
  getEnv,
  ENV_TYPE,
  Link,
  interceptors,
  Current,
  getCurrentInstance,
  options,
  nextTick,
  eventCenter,
  Events,
  getInitPxTransform,
  interceptorify
};
Taro$1.initPxTransform = getInitPxTransform(Taro$1);
Taro$1.preload = getPreload(Current);
Taro$1.pxTransform = getPxTransform(Taro$1);
const dist = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Taro$1
}, Symbol.toStringTag, { value: "Module" }));
const require$$1 = /* @__PURE__ */ babelHelpers.getAugmentedNamespace(dist);
(function(module2) {
  const {
    hooks: hooks2
  } = require$$0;
  const taro2 = require$$1.default;
  if (hooks2.isExist("initNativeApi")) {
    hooks2.call("initNativeApi", taro2);
  }
  module2.exports = taro2;
  module2.exports.default = module2.exports;
})(taro);
var taroExports = taro.exports;
const Taro = /* @__PURE__ */ babelHelpers.getDefaultExportFromCjs(taroExports);
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$1 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z = Symbol.iterator;
function A(a) {
  if (null === a || "object" !== typeof a)
    return null;
  a = z && a[z] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C = Object.assign, D = {};
function E(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = e || B;
}
E.prototype.isReactComponent = {};
E.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E.prototype;
function G(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = e || B;
}
var H = G.prototype = new F();
H.constructor = G;
C(H, E.prototype);
H.isPureReactComponent = true;
var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = { current: null }, L = { key: true, ref: true, __self: true, __source: true };
function M(a, b, e) {
  var d, c = {}, k2 = null, h = null;
  if (null != b)
    for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b)
      J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g)
    c.children = e;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++)
      f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps)
    for (d in g = a.defaultProps, g)
      void 0 === c[d] && (c[d] = g[d]);
  return { $$typeof: l, type: a, key: k2, ref: h, props: c, _owner: K.current };
}
function N(a, b) {
  return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P = /\/+/g;
function Q(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R(a, b, e, d, c) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2)
    a = null;
  var h = false;
  if (null === a)
    h = true;
  else
    switch (k2) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case l:
          case n$1:
            h = true;
        }
    }
  if (h)
    return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
      return a2;
    })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I(a))
    for (var g = 0; g < a.length; g++) {
      k2 = a[g];
      var f2 = d + Q(k2, g);
      h += R(k2, b, e, f2, c);
    }
  else if (f2 = A(a), "function" === typeof f2)
    for (a = f2.call(a), g = 0; !(k2 = a.next()).done; )
      k2 = k2.value, f2 = d + Q(k2, g++), h += R(k2, b, e, f2, c);
  else if ("object" === k2)
    throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S(a, b, e) {
  if (null == a)
    return a;
  var d = [], c = 0;
  R(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status)
        a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status)
        a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status)
    return a._result.default;
  throw a._result;
}
var U = { current: null }, V = { transition: null }, W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
function X() {
  throw Error("act(...) is not supported in production builds of React.");
}
var Children = react_production_min.Children = { map: S, forEach: function(a, b, e) {
  S(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O(a))
    throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
var Component = react_production_min.Component = E;
var Fragment = react_production_min.Fragment = p$1;
var Profiler = react_production_min.Profiler = r;
var PureComponent = react_production_min.PureComponent = G;
var StrictMode = react_production_min.StrictMode = q$1;
var Suspense = react_production_min.Suspense = w;
var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
var act = react_production_min.act = X;
var cloneElement = react_production_min.cloneElement = function(a, b, e) {
  if (null === a || void 0 === a)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h = K.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps)
      var g = a.type.defaultProps;
    for (f2 in b)
      J.call(b, f2) && !L.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2)
    d.children = e;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++)
      g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l, type: a.type, key: c, ref: k2, props: d, _owner: h };
};
var createContext = react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
var createElement = react_production_min.createElement = M;
var createFactory = react_production_min.createFactory = function(a) {
  var b = M.bind(null, a);
  b.type = a;
  return b;
};
var createRef = react_production_min.createRef = function() {
  return { current: null };
};
var forwardRef = react_production_min.forwardRef = function(a) {
  return { $$typeof: v, render: a };
};
var isValidElement = react_production_min.isValidElement = O;
var lazy = react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
};
var memo = react_production_min.memo = function(a, b) {
  return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
};
var startTransition = react_production_min.startTransition = function(a) {
  var b = V.transition;
  V.transition = {};
  try {
    a();
  } finally {
    V.transition = b;
  }
};
var unstable_act = react_production_min.unstable_act = X;
var useCallback = react_production_min.useCallback = function(a, b) {
  return U.current.useCallback(a, b);
};
var useContext = react_production_min.useContext = function(a) {
  return U.current.useContext(a);
};
var useDebugValue = react_production_min.useDebugValue = function() {
};
var useDeferredValue = react_production_min.useDeferredValue = function(a) {
  return U.current.useDeferredValue(a);
};
var useEffect = react_production_min.useEffect = function(a, b) {
  return U.current.useEffect(a, b);
};
var useId = react_production_min.useId = function() {
  return U.current.useId();
};
var useImperativeHandle = react_production_min.useImperativeHandle = function(a, b, e) {
  return U.current.useImperativeHandle(a, b, e);
};
var useInsertionEffect = react_production_min.useInsertionEffect = function(a, b) {
  return U.current.useInsertionEffect(a, b);
};
var useLayoutEffect = react_production_min.useLayoutEffect = function(a, b) {
  return U.current.useLayoutEffect(a, b);
};
var useMemo = react_production_min.useMemo = function(a, b) {
  return U.current.useMemo(a, b);
};
var useReducer = react_production_min.useReducer = function(a, b, e) {
  return U.current.useReducer(a, b, e);
};
var useRef = react_production_min.useRef = function(a) {
  return U.current.useRef(a);
};
var useState = react_production_min.useState = function(a) {
  return U.current.useState(a);
};
var useSyncExternalStore = react_production_min.useSyncExternalStore = function(a, b, e) {
  return U.current.useSyncExternalStore(a, b, e);
};
var useTransition = react_production_min.useTransition = function() {
  return U.current.useTransition();
};
var version = react_production_min.version = "18.3.1";
const React = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  Children,
  Component,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  act,
  cloneElement,
  createContext,
  createElement,
  createFactory,
  createRef,
  default: react_production_min,
  forwardRef,
  isValidElement,
  lazy,
  memo,
  startTransition,
  unstable_act,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useId,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  version
}, [react_production_min]);
var scheduler_production_min = {};
var hasRequiredScheduler_production_min;
function requireScheduler_production_min() {
  if (hasRequiredScheduler_production_min)
    return scheduler_production_min;
  hasRequiredScheduler_production_min = 1;
  (function(exports2) {
    function f2(a, b) {
      var c = a.length;
      a.push(b);
      a:
        for (; 0 < c; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (0 < g(e, b))
            a[d] = b, a[c] = e, c = d;
          else
            break a;
        }
    }
    function h(a) {
      return 0 === a.length ? null : a[0];
    }
    function k2(a) {
      if (0 === a.length)
        return null;
      var b = a[0], c = a.pop();
      if (c !== b) {
        a[0] = c;
        a:
          for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
            var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
            if (0 > g(C2, c))
              n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
            else if (n2 < e && 0 > g(x2, c))
              a[d] = x2, a[n2] = c, d = n2;
            else
              break a;
          }
      }
      return b;
    }
    function g(a, b) {
      var c = a.sortIndex - b.sortIndex;
      return 0 !== c ? c : a.id - b.id;
    }
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var l2 = performance;
      exports2.unstable_now = function() {
        return l2.now();
      };
    } else {
      var p2 = Date, q2 = p2.now();
      exports2.unstable_now = function() {
        return p2.now() - q2;
      };
    }
    var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
    "undefined" !== typeof nav && void 0 !== nav.scheduling && void 0 !== nav.scheduling.isInputPending && nav.scheduling.isInputPending.bind(nav.scheduling);
    function G2(a) {
      for (var b = h(t2); null !== b; ) {
        if (null === b.callback)
          k2(t2);
        else if (b.startTime <= a)
          k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
        else
          break;
        b = h(t2);
      }
    }
    function H2(a) {
      B2 = false;
      G2(a);
      if (!A2)
        if (null !== h(r2))
          A2 = true, I2(J2);
        else {
          var b = h(t2);
          null !== b && K2(H2, b.startTime - a);
        }
    }
    function J2(a, b) {
      A2 = false;
      B2 && (B2 = false, E2(L2), L2 = -1);
      z2 = true;
      var c = y2;
      try {
        G2(b);
        for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
          var d = v2.callback;
          if ("function" === typeof d) {
            v2.callback = null;
            y2 = v2.priorityLevel;
            var e = d(v2.expirationTime <= b);
            b = exports2.unstable_now();
            "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
            G2(b);
          } else
            k2(r2);
          v2 = h(r2);
        }
        if (null !== v2)
          var w2 = true;
        else {
          var m2 = h(t2);
          null !== m2 && K2(H2, m2.startTime - b);
          w2 = false;
        }
        return w2;
      } finally {
        v2 = null, y2 = c, z2 = false;
      }
    }
    var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
    function M2() {
      return exports2.unstable_now() - Q2 < P2 ? false : true;
    }
    function R2() {
      if (null !== O2) {
        var a = exports2.unstable_now();
        Q2 = a;
        var b = true;
        try {
          b = O2(true, a);
        } finally {
          b ? S2() : (N2 = false, O2 = null);
        }
      } else
        N2 = false;
    }
    var S2;
    if ("function" === typeof F2)
      S2 = function() {
        F2(R2);
      };
    else if ("undefined" !== typeof MessageChannel) {
      var T2 = new MessageChannel(), U2 = T2.port2;
      T2.port1.onmessage = R2;
      S2 = function() {
        U2.postMessage(null);
      };
    } else
      S2 = function() {
        D2(R2, 0);
      };
    function I2(a) {
      O2 = a;
      N2 || (N2 = true, S2());
    }
    function K2(a, b) {
      L2 = D2(function() {
        a(exports2.unstable_now());
      }, b);
    }
    exports2.unstable_IdlePriority = 5;
    exports2.unstable_ImmediatePriority = 1;
    exports2.unstable_LowPriority = 4;
    exports2.unstable_NormalPriority = 3;
    exports2.unstable_Profiling = null;
    exports2.unstable_UserBlockingPriority = 2;
    exports2.unstable_cancelCallback = function(a) {
      a.callback = null;
    };
    exports2.unstable_continueExecution = function() {
      A2 || z2 || (A2 = true, I2(J2));
    };
    exports2.unstable_forceFrameRate = function(a) {
      0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
    };
    exports2.unstable_getCurrentPriorityLevel = function() {
      return y2;
    };
    exports2.unstable_getFirstCallbackNode = function() {
      return h(r2);
    };
    exports2.unstable_next = function(a) {
      switch (y2) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = y2;
      }
      var c = y2;
      y2 = b;
      try {
        return a();
      } finally {
        y2 = c;
      }
    };
    exports2.unstable_pauseExecution = function() {
    };
    exports2.unstable_requestPaint = function() {
    };
    exports2.unstable_runWithPriority = function(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a = 3;
      }
      var c = y2;
      y2 = a;
      try {
        return b();
      } finally {
        y2 = c;
      }
    };
    exports2.unstable_scheduleCallback = function(a, b, c) {
      var d = exports2.unstable_now();
      "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
      switch (a) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c + e;
      a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
      c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
      return a;
    };
    exports2.unstable_shouldYield = M2;
    exports2.unstable_wrapCallback = function(a) {
      var b = y2;
      return function() {
        var c = y2;
        y2 = b;
        try {
          return a.apply(this, arguments);
        } finally {
          y2 = c;
        }
      };
    };
  })(scheduler_production_min);
  return scheduler_production_min;
}
/**
 * @license React
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var reactReconciler_production_min = function $$$reconciler($$$hostConfig) {
  var exports2 = {};
  var aa = react_production_min, ba = requireScheduler_production_min(), ca = Object.assign;
  function m2(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
      b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var da = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ea = Symbol.for("react.element"), fa = Symbol.for("react.portal"), ha = Symbol.for("react.fragment"), ia = Symbol.for("react.strict_mode"), ja = Symbol.for("react.profiler"), ka = Symbol.for("react.provider"), la = Symbol.for("react.context"), ma = Symbol.for("react.forward_ref"), na = Symbol.for("react.suspense"), oa = Symbol.for("react.suspense_list"), pa = Symbol.for("react.memo"), qa = Symbol.for("react.lazy");
  var ra = Symbol.for("react.offscreen");
  var sa = Symbol.iterator;
  function ta(a) {
    if (null === a || "object" !== typeof a)
      return null;
    a = sa && a[sa] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  function ua(a) {
    if (null == a)
      return null;
    if ("function" === typeof a)
      return a.displayName || a.name || null;
    if ("string" === typeof a)
      return a;
    switch (a) {
      case ha:
        return "Fragment";
      case fa:
        return "Portal";
      case ja:
        return "Profiler";
      case ia:
        return "StrictMode";
      case na:
        return "Suspense";
      case oa:
        return "SuspenseList";
    }
    if ("object" === typeof a)
      switch (a.$$typeof) {
        case la:
          return (a.displayName || "Context") + ".Consumer";
        case ka:
          return (a._context.displayName || "Context") + ".Provider";
        case ma:
          var b = a.render;
          a = a.displayName;
          a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          return a;
        case pa:
          return b = a.displayName || null, null !== b ? b : ua(a.type) || "Memo";
        case qa:
          b = a._payload;
          a = a._init;
          try {
            return ua(a(b));
          } catch (c) {
          }
      }
    return null;
  }
  function va(a) {
    var b = a.type;
    switch (a.tag) {
      case 24:
        return "Cache";
      case 9:
        return (b.displayName || "Context") + ".Consumer";
      case 10:
        return (b._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return b;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return ua(b);
      case 8:
        return b === ia ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if ("function" === typeof b)
          return b.displayName || b.name || null;
        if ("string" === typeof b)
          return b;
    }
    return null;
  }
  function wa(a) {
    var b = a, c = a;
    if (a.alternate)
      for (; b.return; )
        b = b.return;
    else {
      a = b;
      do
        b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
      while (a);
    }
    return 3 === b.tag ? c : null;
  }
  function xa(a) {
    if (wa(a) !== a)
      throw Error(m2(188));
  }
  function ya(a) {
    var b = a.alternate;
    if (!b) {
      b = wa(a);
      if (null === b)
        throw Error(m2(188));
      return b !== a ? null : a;
    }
    for (var c = a, d = b; ; ) {
      var e = c.return;
      if (null === e)
        break;
      var f2 = e.alternate;
      if (null === f2) {
        d = e.return;
        if (null !== d) {
          c = d;
          continue;
        }
        break;
      }
      if (e.child === f2.child) {
        for (f2 = e.child; f2; ) {
          if (f2 === c)
            return xa(e), a;
          if (f2 === d)
            return xa(e), b;
          f2 = f2.sibling;
        }
        throw Error(m2(188));
      }
      if (c.return !== d.return)
        c = e, d = f2;
      else {
        for (var g = false, h = e.child; h; ) {
          if (h === c) {
            g = true;
            c = e;
            d = f2;
            break;
          }
          if (h === d) {
            g = true;
            d = e;
            c = f2;
            break;
          }
          h = h.sibling;
        }
        if (!g) {
          for (h = f2.child; h; ) {
            if (h === c) {
              g = true;
              c = f2;
              d = e;
              break;
            }
            if (h === d) {
              g = true;
              d = f2;
              c = e;
              break;
            }
            h = h.sibling;
          }
          if (!g)
            throw Error(m2(189));
        }
      }
      if (c.alternate !== d)
        throw Error(m2(190));
    }
    if (3 !== c.tag)
      throw Error(m2(188));
    return c.stateNode.current === c ? a : b;
  }
  function Aa(a) {
    a = ya(a);
    return null !== a ? Ba(a) : null;
  }
  function Ba(a) {
    if (5 === a.tag || 6 === a.tag)
      return a;
    for (a = a.child; null !== a; ) {
      var b = Ba(a);
      if (null !== b)
        return b;
      a = a.sibling;
    }
    return null;
  }
  function Ca(a) {
    if (5 === a.tag || 6 === a.tag)
      return a;
    for (a = a.child; null !== a; ) {
      if (4 !== a.tag) {
        var b = Ca(a);
        if (null !== b)
          return b;
      }
      a = a.sibling;
    }
    return null;
  }
  var Da = Array.isArray, Ea = $$$hostConfig.getPublicInstance, Fa = $$$hostConfig.getRootHostContext, Ga = $$$hostConfig.getChildHostContext, Ha = $$$hostConfig.prepareForCommit, Ia = $$$hostConfig.resetAfterCommit, Ja = $$$hostConfig.createInstance, Ka = $$$hostConfig.appendInitialChild, La = $$$hostConfig.finalizeInitialChildren, Ma = $$$hostConfig.prepareUpdate, Na = $$$hostConfig.shouldSetTextContent, Oa = $$$hostConfig.createTextInstance, Pa = $$$hostConfig.scheduleTimeout, Qa = $$$hostConfig.cancelTimeout, Ra = $$$hostConfig.noTimeout, Sa = $$$hostConfig.isPrimaryRenderer, Ta = $$$hostConfig.supportsMutation, Ua = $$$hostConfig.supportsPersistence, Va = $$$hostConfig.supportsHydration, Wa = $$$hostConfig.getInstanceFromNode, Xa = $$$hostConfig.preparePortalMount, Ya = $$$hostConfig.getCurrentEventPriority, Za = $$$hostConfig.detachDeletedInstance, $a = $$$hostConfig.supportsMicrotasks, ab = $$$hostConfig.scheduleMicrotask, bb = $$$hostConfig.supportsTestSelectors, cb = $$$hostConfig.findFiberRoot, db = $$$hostConfig.getBoundingRect, eb = $$$hostConfig.getTextContent, fb = $$$hostConfig.isHiddenSubtree, gb = $$$hostConfig.matchAccessibilityRole, hb = $$$hostConfig.setFocusIfFocusable, ib = $$$hostConfig.setupIntersectionObserver, jb = $$$hostConfig.appendChild, kb = $$$hostConfig.appendChildToContainer, lb = $$$hostConfig.commitTextUpdate, mb = $$$hostConfig.commitMount, nb = $$$hostConfig.commitUpdate, ob = $$$hostConfig.insertBefore, pb = $$$hostConfig.insertInContainerBefore, qb = $$$hostConfig.removeChild, rb = $$$hostConfig.removeChildFromContainer, sb = $$$hostConfig.resetTextContent, tb = $$$hostConfig.hideInstance, ub = $$$hostConfig.hideTextInstance, vb = $$$hostConfig.unhideInstance, wb = $$$hostConfig.unhideTextInstance, xb = $$$hostConfig.clearContainer, yb = $$$hostConfig.cloneInstance, zb = $$$hostConfig.createContainerChildSet, Ab = $$$hostConfig.appendChildToContainerChildSet, Bb = $$$hostConfig.finalizeContainerChildren, Cb = $$$hostConfig.replaceContainerChildren, Eb = $$$hostConfig.cloneHiddenInstance, Fb = $$$hostConfig.cloneHiddenTextInstance, Gb = $$$hostConfig.canHydrateInstance, Hb = $$$hostConfig.canHydrateTextInstance, Ib = $$$hostConfig.canHydrateSuspenseInstance, Jb = $$$hostConfig.isSuspenseInstancePending, Kb = $$$hostConfig.isSuspenseInstanceFallback, Lb = $$$hostConfig.getSuspenseInstanceFallbackErrorDetails, Mb = $$$hostConfig.registerSuspenseInstanceRetry, Nb = $$$hostConfig.getNextHydratableSibling, Ob = $$$hostConfig.getFirstHydratableChild, Pb = $$$hostConfig.getFirstHydratableChildWithinContainer, Qb = $$$hostConfig.getFirstHydratableChildWithinSuspenseInstance, Rb = $$$hostConfig.hydrateInstance, Sb = $$$hostConfig.hydrateTextInstance, Tb = $$$hostConfig.hydrateSuspenseInstance, Ub = $$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance, Vb = $$$hostConfig.commitHydratedContainer, Wb = $$$hostConfig.commitHydratedSuspenseInstance, Xb = $$$hostConfig.clearSuspenseBoundary, Yb = $$$hostConfig.clearSuspenseBoundaryFromContainer, Zb = $$$hostConfig.shouldDeleteUnhydratedTailInstances, $b = $$$hostConfig.didNotMatchHydratedContainerTextInstance, ac = $$$hostConfig.didNotMatchHydratedTextInstance, bc;
  function cc(a) {
    if (void 0 === bc)
      try {
        throw Error();
      } catch (c) {
        var b = c.stack.trim().match(/\n( *(at )?)/);
        bc = b && b[1] || "";
      }
    return "\n" + bc + a;
  }
  var dc = false;
  function ec(a, b) {
    if (!a || dc)
      return "";
    dc = true;
    var c = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (b)
        if (b = function() {
          throw Error();
        }, Object.defineProperty(b.prototype, "props", { set: function() {
          throw Error();
        } }), "object" === typeof Reflect && Reflect.construct) {
          try {
            Reflect.construct(b, []);
          } catch (l2) {
            var d = l2;
          }
          Reflect.construct(a, [], b);
        } else {
          try {
            b.call();
          } catch (l2) {
            d = l2;
          }
          a.call(b.prototype);
        }
      else {
        try {
          throw Error();
        } catch (l2) {
          d = l2;
        }
        a();
      }
    } catch (l2) {
      if (l2 && d && "string" === typeof l2.stack) {
        for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; )
          h--;
        for (; 1 <= g && 0 <= h; g--, h--)
          if (e[g] !== f2[h]) {
            if (1 !== g || 1 !== h) {
              do
                if (g--, h--, 0 > h || e[g] !== f2[h]) {
                  var k2 = "\n" + e[g].replace(" at new ", " at ");
                  a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
                  return k2;
                }
              while (1 <= g && 0 <= h);
            }
            break;
          }
      }
    } finally {
      dc = false, Error.prepareStackTrace = c;
    }
    return (a = a ? a.displayName || a.name : "") ? cc(a) : "";
  }
  var fc = Object.prototype.hasOwnProperty, gc = [], hc = -1;
  function ic(a) {
    return { current: a };
  }
  function q2(a) {
    0 > hc || (a.current = gc[hc], gc[hc] = null, hc--);
  }
  function v2(a, b) {
    hc++;
    gc[hc] = a.current;
    a.current = b;
  }
  var jc = {}, x2 = ic(jc), z2 = ic(false), kc = jc;
  function lc(a, b) {
    var c = a.type.contextTypes;
    if (!c)
      return jc;
    var d = a.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
      return d.__reactInternalMemoizedMaskedChildContext;
    var e = {}, f2;
    for (f2 in c)
      e[f2] = b[f2];
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
    return e;
  }
  function A2(a) {
    a = a.childContextTypes;
    return null !== a && void 0 !== a;
  }
  function mc() {
    q2(z2);
    q2(x2);
  }
  function nc(a, b, c) {
    if (x2.current !== jc)
      throw Error(m2(168));
    v2(x2, b);
    v2(z2, c);
  }
  function oc(a, b, c) {
    var d = a.stateNode;
    b = b.childContextTypes;
    if ("function" !== typeof d.getChildContext)
      return c;
    d = d.getChildContext();
    for (var e in d)
      if (!(e in b))
        throw Error(m2(108, va(a) || "Unknown", e));
    return ca({}, c, d);
  }
  function pc(a) {
    a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || jc;
    kc = x2.current;
    v2(x2, a);
    v2(z2, z2.current);
    return true;
  }
  function rc(a, b, c) {
    var d = a.stateNode;
    if (!d)
      throw Error(m2(169));
    c ? (a = oc(a, b, kc), d.__reactInternalMemoizedMergedChildContext = a, q2(z2), q2(x2), v2(x2, a)) : q2(z2);
    v2(z2, c);
  }
  var tc = Math.clz32 ? Math.clz32 : sc, uc = Math.log, vc = Math.LN2;
  function sc(a) {
    a >>>= 0;
    return 0 === a ? 32 : 31 - (uc(a) / vc | 0) | 0;
  }
  var wc = 64, xc = 4194304;
  function yc(a) {
    switch (a & -a) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return a & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return a;
    }
  }
  function zc(a, b) {
    var c = a.pendingLanes;
    if (0 === c)
      return 0;
    var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
    if (0 !== g) {
      var h = g & ~e;
      0 !== h ? d = yc(h) : (f2 &= g, 0 !== f2 && (d = yc(f2)));
    } else
      g = c & ~e, 0 !== g ? d = yc(g) : 0 !== f2 && (d = yc(f2));
    if (0 === d)
      return 0;
    if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240)))
      return b;
    0 !== (d & 4) && (d |= c & 16);
    b = a.entangledLanes;
    if (0 !== b)
      for (a = a.entanglements, b &= d; 0 < b; )
        c = 31 - tc(b), e = 1 << c, d |= a[c], b &= ~e;
    return d;
  }
  function Ac(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 4:
        return b + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return b + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Bc(a, b) {
    for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
      var g = 31 - tc(f2), h = 1 << g, k2 = e[g];
      if (-1 === k2) {
        if (0 === (h & c) || 0 !== (h & d))
          e[g] = Ac(h, b);
      } else
        k2 <= b && (a.expiredLanes |= h);
      f2 &= ~h;
    }
  }
  function Cc(a) {
    a = a.pendingLanes & -1073741825;
    return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
  }
  function Dc() {
    var a = wc;
    wc <<= 1;
    0 === (wc & 4194240) && (wc = 64);
    return a;
  }
  function Ec(a) {
    for (var b = [], c = 0; 31 > c; c++)
      b.push(a);
    return b;
  }
  function Fc(a, b, c) {
    a.pendingLanes |= b;
    536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
    a = a.eventTimes;
    b = 31 - tc(b);
    a[b] = c;
  }
  function Gc(a, b) {
    var c = a.pendingLanes & ~b;
    a.pendingLanes = b;
    a.suspendedLanes = 0;
    a.pingedLanes = 0;
    a.expiredLanes &= b;
    a.mutableReadLanes &= b;
    a.entangledLanes &= b;
    b = a.entanglements;
    var d = a.eventTimes;
    for (a = a.expirationTimes; 0 < c; ) {
      var e = 31 - tc(c), f2 = 1 << e;
      b[e] = 0;
      d[e] = -1;
      a[e] = -1;
      c &= ~f2;
    }
  }
  function Hc(a, b) {
    var c = a.entangledLanes |= b;
    for (a = a.entanglements; c; ) {
      var d = 31 - tc(c), e = 1 << d;
      e & b | a[d] & b && (a[d] |= b);
      c &= ~e;
    }
  }
  var C2 = 0;
  function Ic(a) {
    a &= -a;
    return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
  }
  var Jc = ba.unstable_scheduleCallback, Kc = ba.unstable_cancelCallback, Lc = ba.unstable_shouldYield, Mc = ba.unstable_requestPaint, D2 = ba.unstable_now, Nc = ba.unstable_ImmediatePriority, Oc = ba.unstable_UserBlockingPriority, Pc = ba.unstable_NormalPriority, Qc = ba.unstable_IdlePriority, Rc = null, Sc = null;
  function Tc(a) {
    if (Sc && "function" === typeof Sc.onCommitFiberRoot)
      try {
        Sc.onCommitFiberRoot(Rc, a, void 0, 128 === (a.current.flags & 128));
      } catch (b) {
      }
  }
  function Uc(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }
  var Vc = "function" === typeof Object.is ? Object.is : Uc, Wc = null, Xc = false, Yc = false;
  function Zc(a) {
    null === Wc ? Wc = [a] : Wc.push(a);
  }
  function $c(a) {
    Xc = true;
    Zc(a);
  }
  function ad() {
    if (!Yc && null !== Wc) {
      Yc = true;
      var a = 0, b = C2;
      try {
        var c = Wc;
        for (C2 = 1; a < c.length; a++) {
          var d = c[a];
          do
            d = d(true);
          while (null !== d);
        }
        Wc = null;
        Xc = false;
      } catch (e) {
        throw null !== Wc && (Wc = Wc.slice(a + 1)), Jc(Nc, ad), e;
      } finally {
        C2 = b, Yc = false;
      }
    }
    return null;
  }
  var bd = [], cd = 0, dd = null, ed = 0, fd = [], gd = 0, hd = null, id = 1, jd = "";
  function kd(a, b) {
    bd[cd++] = ed;
    bd[cd++] = dd;
    dd = a;
    ed = b;
  }
  function ld(a, b, c) {
    fd[gd++] = id;
    fd[gd++] = jd;
    fd[gd++] = hd;
    hd = a;
    var d = id;
    a = jd;
    var e = 32 - tc(d) - 1;
    d &= ~(1 << e);
    c += 1;
    var f2 = 32 - tc(b) + e;
    if (30 < f2) {
      var g = e - e % 5;
      f2 = (d & (1 << g) - 1).toString(32);
      d >>= g;
      e -= g;
      id = 1 << 32 - tc(b) + e | c << e | d;
      jd = f2 + a;
    } else
      id = 1 << f2 | c << e | d, jd = a;
  }
  function md(a) {
    null !== a.return && (kd(a, 1), ld(a, 1, 0));
  }
  function nd(a) {
    for (; a === dd; )
      dd = bd[--cd], bd[cd] = null, ed = bd[--cd], bd[cd] = null;
    for (; a === hd; )
      hd = fd[--gd], fd[gd] = null, jd = fd[--gd], fd[gd] = null, id = fd[--gd], fd[gd] = null;
  }
  var od = null, pd = null, F2 = false, qd = false, rd = null;
  function sd(a, b) {
    var c = td(5, null, null, 0);
    c.elementType = "DELETED";
    c.stateNode = b;
    c.return = a;
    b = a.deletions;
    null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
  }
  function ud(a, b) {
    switch (a.tag) {
      case 5:
        return b = Gb(b, a.type, a.pendingProps), null !== b ? (a.stateNode = b, od = a, pd = Ob(b), true) : false;
      case 6:
        return b = Hb(b, a.pendingProps), null !== b ? (a.stateNode = b, od = a, pd = null, true) : false;
      case 13:
        b = Ib(b);
        if (null !== b) {
          var c = null !== hd ? { id, overflow: jd } : null;
          a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 };
          c = td(18, null, null, 0);
          c.stateNode = b;
          c.return = a;
          a.child = c;
          od = a;
          pd = null;
          return true;
        }
        return false;
      default:
        return false;
    }
  }
  function vd(a) {
    return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
  }
  function wd(a) {
    if (F2) {
      var b = pd;
      if (b) {
        var c = b;
        if (!ud(a, b)) {
          if (vd(a))
            throw Error(m2(418));
          b = Nb(c);
          var d = od;
          b && ud(a, b) ? sd(d, c) : (a.flags = a.flags & -4097 | 2, F2 = false, od = a);
        }
      } else {
        if (vd(a))
          throw Error(m2(418));
        a.flags = a.flags & -4097 | 2;
        F2 = false;
        od = a;
      }
    }
  }
  function xd(a) {
    for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; )
      a = a.return;
    od = a;
  }
  function yd(a) {
    if (!Va || a !== od)
      return false;
    if (!F2)
      return xd(a), F2 = true, false;
    if (3 !== a.tag && (5 !== a.tag || Zb(a.type) && !Na(a.type, a.memoizedProps))) {
      var b = pd;
      if (b) {
        if (vd(a))
          throw zd(), Error(m2(418));
        for (; b; )
          sd(a, b), b = Nb(b);
      }
    }
    xd(a);
    if (13 === a.tag) {
      if (!Va)
        throw Error(m2(316));
      a = a.memoizedState;
      a = null !== a ? a.dehydrated : null;
      if (!a)
        throw Error(m2(317));
      pd = Ub(a);
    } else
      pd = od ? Nb(a.stateNode) : null;
    return true;
  }
  function zd() {
    for (var a = pd; a; )
      a = Nb(a);
  }
  function Ad2() {
    Va && (pd = od = null, qd = F2 = false);
  }
  function Bd(a) {
    null === rd ? rd = [a] : rd.push(a);
  }
  var Cd = da.ReactCurrentBatchConfig;
  function Dd(a, b) {
    if (Vc(a, b))
      return true;
    if ("object" !== typeof a || null === a || "object" !== typeof b || null === b)
      return false;
    var c = Object.keys(a), d = Object.keys(b);
    if (c.length !== d.length)
      return false;
    for (d = 0; d < c.length; d++) {
      var e = c[d];
      if (!fc.call(b, e) || !Vc(a[e], b[e]))
        return false;
    }
    return true;
  }
  function Ed(a) {
    switch (a.tag) {
      case 5:
        return cc(a.type);
      case 16:
        return cc("Lazy");
      case 13:
        return cc("Suspense");
      case 19:
        return cc("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a = ec(a.type, false), a;
      case 11:
        return a = ec(a.type.render, false), a;
      case 1:
        return a = ec(a.type, true), a;
      default:
        return "";
    }
  }
  function Fd(a, b) {
    if (a && a.defaultProps) {
      b = ca({}, b);
      a = a.defaultProps;
      for (var c in a)
        void 0 === b[c] && (b[c] = a[c]);
      return b;
    }
    return b;
  }
  var Gd = ic(null), Hd = null, Id = null, Jd = null;
  function Kd() {
    Jd = Id = Hd = null;
  }
  function Ld(a, b, c) {
    Sa ? (v2(Gd, b._currentValue), b._currentValue = c) : (v2(Gd, b._currentValue2), b._currentValue2 = c);
  }
  function Md(a) {
    var b = Gd.current;
    q2(Gd);
    Sa ? a._currentValue = b : a._currentValue2 = b;
  }
  function Nd(a, b, c) {
    for (; null !== a; ) {
      var d = a.alternate;
      (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
      if (a === c)
        break;
      a = a.return;
    }
  }
  function Od(a, b) {
    Hd = a;
    Jd = Id = null;
    a = a.dependencies;
    null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (G2 = true), a.firstContext = null);
  }
  function Pd(a) {
    var b = Sa ? a._currentValue : a._currentValue2;
    if (Jd !== a)
      if (a = { context: a, memoizedValue: b, next: null }, null === Id) {
        if (null === Hd)
          throw Error(m2(308));
        Id = a;
        Hd.dependencies = { lanes: 0, firstContext: a };
      } else
        Id = Id.next = a;
    return b;
  }
  var Qd = null;
  function Rd(a) {
    null === Qd ? Qd = [a] : Qd.push(a);
  }
  function Sd(a, b, c, d) {
    var e = b.interleaved;
    null === e ? (c.next = c, Rd(b)) : (c.next = e.next, e.next = c);
    b.interleaved = c;
    return Td(a, d);
  }
  function Td(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    null !== c && (c.lanes |= b);
    c = a;
    for (a = a.return; null !== a; )
      a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
    return 3 === c.tag ? c.stateNode : null;
  }
  var Ud = false;
  function Vd(a) {
    a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Wd(a, b) {
    a = a.updateQueue;
    b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
  }
  function Xd(a, b) {
    return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
  }
  function Yd(a, b, c) {
    var d = a.updateQueue;
    if (null === d)
      return null;
    d = d.shared;
    if (0 !== (H2 & 2)) {
      var e = d.pending;
      null === e ? b.next = b : (b.next = e.next, e.next = b);
      d.pending = b;
      return Td(a, c);
    }
    e = d.interleaved;
    null === e ? (b.next = b, Rd(d)) : (b.next = e.next, e.next = b);
    d.interleaved = b;
    return Td(a, c);
  }
  function Zd(a, b, c) {
    b = b.updateQueue;
    if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Hc(a, c);
    }
  }
  function $d(a, b) {
    var c = a.updateQueue, d = a.alternate;
    if (null !== d && (d = d.updateQueue, c === d)) {
      var e = null, f2 = null;
      c = c.firstBaseUpdate;
      if (null !== c) {
        do {
          var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
          null === f2 ? e = f2 = g : f2 = f2.next = g;
          c = c.next;
        } while (null !== c);
        null === f2 ? e = f2 = b : f2 = f2.next = b;
      } else
        e = f2 = b;
      c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
      a.updateQueue = c;
      return;
    }
    a = c.lastBaseUpdate;
    null === a ? c.firstBaseUpdate = b : a.next = b;
    c.lastBaseUpdate = b;
  }
  function ae(a, b, c, d) {
    var e = a.updateQueue;
    Ud = false;
    var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
    if (null !== h) {
      e.shared.pending = null;
      var k2 = h, l2 = k2.next;
      k2.next = null;
      null === g ? f2 = l2 : g.next = l2;
      g = k2;
      var n2 = a.alternate;
      null !== n2 && (n2 = n2.updateQueue, h = n2.lastBaseUpdate, h !== g && (null === h ? n2.firstBaseUpdate = l2 : h.next = l2, n2.lastBaseUpdate = k2));
    }
    if (null !== f2) {
      var t2 = e.baseState;
      g = 0;
      n2 = l2 = k2 = null;
      h = f2;
      do {
        var p2 = h.lane, B2 = h.eventTime;
        if ((d & p2) === p2) {
          null !== n2 && (n2 = n2.next = {
            eventTime: B2,
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          });
          a: {
            var w2 = a, Z = h;
            p2 = b;
            B2 = c;
            switch (Z.tag) {
              case 1:
                w2 = Z.payload;
                if ("function" === typeof w2) {
                  t2 = w2.call(B2, t2, p2);
                  break a;
                }
                t2 = w2;
                break a;
              case 3:
                w2.flags = w2.flags & -65537 | 128;
              case 0:
                w2 = Z.payload;
                p2 = "function" === typeof w2 ? w2.call(B2, t2, p2) : w2;
                if (null === p2 || void 0 === p2)
                  break a;
                t2 = ca({}, t2, p2);
                break a;
              case 2:
                Ud = true;
            }
          }
          null !== h.callback && 0 !== h.lane && (a.flags |= 64, p2 = e.effects, null === p2 ? e.effects = [h] : p2.push(h));
        } else
          B2 = { eventTime: B2, lane: p2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === n2 ? (l2 = n2 = B2, k2 = t2) : n2 = n2.next = B2, g |= p2;
        h = h.next;
        if (null === h)
          if (h = e.shared.pending, null === h)
            break;
          else
            p2 = h, h = p2.next, p2.next = null, e.lastBaseUpdate = p2, e.shared.pending = null;
      } while (1);
      null === n2 && (k2 = t2);
      e.baseState = k2;
      e.firstBaseUpdate = l2;
      e.lastBaseUpdate = n2;
      b = e.shared.interleaved;
      if (null !== b) {
        e = b;
        do
          g |= e.lane, e = e.next;
        while (e !== b);
      } else
        null === f2 && (e.shared.lanes = 0);
      be |= g;
      a.lanes = g;
      a.memoizedState = t2;
    }
  }
  function ce(a, b, c) {
    a = b.effects;
    b.effects = null;
    if (null !== a)
      for (b = 0; b < a.length; b++) {
        var d = a[b], e = d.callback;
        if (null !== e) {
          d.callback = null;
          d = c;
          if ("function" !== typeof e)
            throw Error(m2(191, e));
          e.call(d);
        }
      }
  }
  var de = new aa.Component().refs;
  function ee(a, b, c, d) {
    b = a.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : ca({}, b, c);
    a.memoizedState = c;
    0 === a.lanes && (a.updateQueue.baseState = c);
  }
  var he = { isMounted: function(a) {
    return (a = a._reactInternals) ? wa(a) === a : false;
  }, enqueueSetState: function(a, b, c) {
    a = a._reactInternals;
    var d = I2(), e = fe(a), f2 = Xd(d, e);
    f2.payload = b;
    void 0 !== c && null !== c && (f2.callback = c);
    b = Yd(a, f2, e);
    null !== b && (ge(b, a, e, d), Zd(b, a, e));
  }, enqueueReplaceState: function(a, b, c) {
    a = a._reactInternals;
    var d = I2(), e = fe(a), f2 = Xd(d, e);
    f2.tag = 1;
    f2.payload = b;
    void 0 !== c && null !== c && (f2.callback = c);
    b = Yd(a, f2, e);
    null !== b && (ge(b, a, e, d), Zd(b, a, e));
  }, enqueueForceUpdate: function(a, b) {
    a = a._reactInternals;
    var c = I2(), d = fe(a), e = Xd(c, d);
    e.tag = 2;
    void 0 !== b && null !== b && (e.callback = b);
    b = Yd(a, e, d);
    null !== b && (ge(b, a, d, c), Zd(b, a, d));
  } };
  function ie(a, b, c, d, e, f2, g) {
    a = a.stateNode;
    return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Dd(c, d) || !Dd(e, f2) : true;
  }
  function je(a, b, c) {
    var d = false, e = jc;
    var f2 = b.contextType;
    "object" === typeof f2 && null !== f2 ? f2 = Pd(f2) : (e = A2(b) ? kc : x2.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? lc(a, e) : jc);
    b = new b(c, f2);
    a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = he;
    a.stateNode = b;
    b._reactInternals = a;
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
    return b;
  }
  function ke(a, b, c, d) {
    a = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a && he.enqueueReplaceState(b, b.state, null);
  }
  function le(a, b, c, d) {
    var e = a.stateNode;
    e.props = c;
    e.state = a.memoizedState;
    e.refs = de;
    Vd(a);
    var f2 = b.contextType;
    "object" === typeof f2 && null !== f2 ? e.context = Pd(f2) : (f2 = A2(b) ? kc : x2.current, e.context = lc(a, f2));
    e.state = a.memoizedState;
    f2 = b.getDerivedStateFromProps;
    "function" === typeof f2 && (ee(a, b, f2, c), e.state = a.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && he.enqueueReplaceState(e, e.state, null), ae(a, c, e, d), e.state = a.memoizedState);
    "function" === typeof e.componentDidMount && (a.flags |= 4194308);
  }
  function me(a, b, c) {
    a = c.ref;
    if (null !== a && "function" !== typeof a && "object" !== typeof a) {
      if (c._owner) {
        c = c._owner;
        if (c) {
          if (1 !== c.tag)
            throw Error(m2(309));
          var d = c.stateNode;
        }
        if (!d)
          throw Error(m2(147, a));
        var e = d, f2 = "" + a;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2)
          return b.ref;
        b = function(a2) {
          var b2 = e.refs;
          b2 === de && (b2 = e.refs = {});
          null === a2 ? delete b2[f2] : b2[f2] = a2;
        };
        b._stringRef = f2;
        return b;
      }
      if ("string" !== typeof a)
        throw Error(m2(284));
      if (!c._owner)
        throw Error(m2(290, a));
    }
    return a;
  }
  function ne(a, b) {
    a = Object.prototype.toString.call(b);
    throw Error(m2(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
  }
  function oe(a) {
    var b = a._init;
    return b(a._payload);
  }
  function pe(a) {
    function b(b2, c2) {
      if (a) {
        var d2 = b2.deletions;
        null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
      }
    }
    function c(c2, d2) {
      if (!a)
        return null;
      for (; null !== d2; )
        b(c2, d2), d2 = d2.sibling;
      return null;
    }
    function d(a2, b2) {
      for (a2 = /* @__PURE__ */ new Map(); null !== b2; )
        null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
      return a2;
    }
    function e(a2, b2) {
      a2 = qe(a2, b2);
      a2.index = 0;
      a2.sibling = null;
      return a2;
    }
    function f2(b2, c2, d2) {
      b2.index = d2;
      if (!a)
        return b2.flags |= 1048576, c2;
      d2 = b2.alternate;
      if (null !== d2)
        return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
      b2.flags |= 2;
      return c2;
    }
    function g(b2) {
      a && null === b2.alternate && (b2.flags |= 2);
      return b2;
    }
    function h(a2, b2, c2, d2) {
      if (null === b2 || 6 !== b2.tag)
        return b2 = re(c2, a2.mode, d2), b2.return = a2, b2;
      b2 = e(b2, c2);
      b2.return = a2;
      return b2;
    }
    function k2(a2, b2, c2, d2) {
      var f3 = c2.type;
      if (f3 === ha)
        return n2(a2, b2, c2.props.children, d2, c2.key);
      if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === qa && oe(f3) === b2.type))
        return d2 = e(b2, c2.props), d2.ref = me(a2, b2, c2), d2.return = a2, d2;
      d2 = se(c2.type, c2.key, c2.props, null, a2.mode, d2);
      d2.ref = me(a2, b2, c2);
      d2.return = a2;
      return d2;
    }
    function l2(a2, b2, c2, d2) {
      if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation)
        return b2 = te(c2, a2.mode, d2), b2.return = a2, b2;
      b2 = e(b2, c2.children || []);
      b2.return = a2;
      return b2;
    }
    function n2(a2, b2, c2, d2, f3) {
      if (null === b2 || 7 !== b2.tag)
        return b2 = ue(c2, a2.mode, d2, f3), b2.return = a2, b2;
      b2 = e(b2, c2);
      b2.return = a2;
      return b2;
    }
    function t2(a2, b2, c2) {
      if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2)
        return b2 = re("" + b2, a2.mode, c2), b2.return = a2, b2;
      if ("object" === typeof b2 && null !== b2) {
        switch (b2.$$typeof) {
          case ea:
            return c2 = se(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = me(a2, null, b2), c2.return = a2, c2;
          case fa:
            return b2 = te(b2, a2.mode, c2), b2.return = a2, b2;
          case qa:
            var d2 = b2._init;
            return t2(a2, d2(b2._payload), c2);
        }
        if (Da(b2) || ta(b2))
          return b2 = ue(b2, a2.mode, c2, null), b2.return = a2, b2;
        ne(a2, b2);
      }
      return null;
    }
    function p2(a2, b2, c2, d2) {
      var e2 = null !== b2 ? b2.key : null;
      if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2)
        return null !== e2 ? null : h(a2, b2, "" + c2, d2);
      if ("object" === typeof c2 && null !== c2) {
        switch (c2.$$typeof) {
          case ea:
            return c2.key === e2 ? k2(a2, b2, c2, d2) : null;
          case fa:
            return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
          case qa:
            return e2 = c2._init, p2(
              a2,
              b2,
              e2(c2._payload),
              d2
            );
        }
        if (Da(c2) || ta(c2))
          return null !== e2 ? null : n2(a2, b2, c2, d2, null);
        ne(a2, c2);
      }
      return null;
    }
    function B2(a2, b2, c2, d2, e2) {
      if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2)
        return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
      if ("object" === typeof d2 && null !== d2) {
        switch (d2.$$typeof) {
          case ea:
            return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e2);
          case fa:
            return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
          case qa:
            var f3 = d2._init;
            return B2(a2, b2, c2, f3(d2._payload), e2);
        }
        if (Da(d2) || ta(d2))
          return a2 = a2.get(c2) || null, n2(b2, a2, d2, e2, null);
        ne(b2, d2);
      }
      return null;
    }
    function w2(e2, g2, h2, k3) {
      for (var l3 = null, n3 = null, r2 = g2, u2 = g2 = 0, E2 = null; null !== r2 && u2 < h2.length; u2++) {
        r2.index > u2 ? (E2 = r2, r2 = null) : E2 = r2.sibling;
        var y2 = p2(e2, r2, h2[u2], k3);
        if (null === y2) {
          null === r2 && (r2 = E2);
          break;
        }
        a && r2 && null === y2.alternate && b(e2, r2);
        g2 = f2(y2, g2, u2);
        null === n3 ? l3 = y2 : n3.sibling = y2;
        n3 = y2;
        r2 = E2;
      }
      if (u2 === h2.length)
        return c(e2, r2), F2 && kd(e2, u2), l3;
      if (null === r2) {
        for (; u2 < h2.length; u2++)
          r2 = t2(e2, h2[u2], k3), null !== r2 && (g2 = f2(r2, g2, u2), null === n3 ? l3 = r2 : n3.sibling = r2, n3 = r2);
        F2 && kd(e2, u2);
        return l3;
      }
      for (r2 = d(e2, r2); u2 < h2.length; u2++)
        E2 = B2(r2, e2, u2, h2[u2], k3), null !== E2 && (a && null !== E2.alternate && r2.delete(null === E2.key ? u2 : E2.key), g2 = f2(E2, g2, u2), null === n3 ? l3 = E2 : n3.sibling = E2, n3 = E2);
      a && r2.forEach(function(a2) {
        return b(e2, a2);
      });
      F2 && kd(e2, u2);
      return l3;
    }
    function Z(e2, g2, h2, k3) {
      var l3 = ta(h2);
      if ("function" !== typeof l3)
        throw Error(m2(150));
      h2 = l3.call(h2);
      if (null == h2)
        throw Error(m2(151));
      for (var n3 = l3 = null, r2 = g2, u2 = g2 = 0, E2 = null, y2 = h2.next(); null !== r2 && !y2.done; u2++, y2 = h2.next()) {
        r2.index > u2 ? (E2 = r2, r2 = null) : E2 = r2.sibling;
        var w3 = p2(e2, r2, y2.value, k3);
        if (null === w3) {
          null === r2 && (r2 = E2);
          break;
        }
        a && r2 && null === w3.alternate && b(e2, r2);
        g2 = f2(w3, g2, u2);
        null === n3 ? l3 = w3 : n3.sibling = w3;
        n3 = w3;
        r2 = E2;
      }
      if (y2.done)
        return c(
          e2,
          r2
        ), F2 && kd(e2, u2), l3;
      if (null === r2) {
        for (; !y2.done; u2++, y2 = h2.next())
          y2 = t2(e2, y2.value, k3), null !== y2 && (g2 = f2(y2, g2, u2), null === n3 ? l3 = y2 : n3.sibling = y2, n3 = y2);
        F2 && kd(e2, u2);
        return l3;
      }
      for (r2 = d(e2, r2); !y2.done; u2++, y2 = h2.next())
        y2 = B2(r2, e2, u2, y2.value, k3), null !== y2 && (a && null !== y2.alternate && r2.delete(null === y2.key ? u2 : y2.key), g2 = f2(y2, g2, u2), null === n3 ? l3 = y2 : n3.sibling = y2, n3 = y2);
      a && r2.forEach(function(a2) {
        return b(e2, a2);
      });
      F2 && kd(e2, u2);
      return l3;
    }
    function za(a2, d2, f3, h2) {
      "object" === typeof f3 && null !== f3 && f3.type === ha && null === f3.key && (f3 = f3.props.children);
      if ("object" === typeof f3 && null !== f3) {
        switch (f3.$$typeof) {
          case ea:
            a: {
              for (var k3 = f3.key, l3 = d2; null !== l3; ) {
                if (l3.key === k3) {
                  k3 = f3.type;
                  if (k3 === ha) {
                    if (7 === l3.tag) {
                      c(a2, l3.sibling);
                      d2 = e(l3, f3.props.children);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                  } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === qa && oe(k3) === l3.type) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f3.props);
                    d2.ref = me(a2, l3, f3);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                  c(a2, l3);
                  break;
                } else
                  b(a2, l3);
                l3 = l3.sibling;
              }
              f3.type === ha ? (d2 = ue(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = se(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = me(a2, d2, f3), h2.return = a2, a2 = h2);
            }
            return g(a2);
          case fa:
            a: {
              for (l3 = f3.key; null !== d2; ) {
                if (d2.key === l3)
                  if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                    c(a2, d2.sibling);
                    d2 = e(d2, f3.children || []);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  } else {
                    c(a2, d2);
                    break;
                  }
                else
                  b(a2, d2);
                d2 = d2.sibling;
              }
              d2 = te(f3, a2.mode, h2);
              d2.return = a2;
              a2 = d2;
            }
            return g(a2);
          case qa:
            return l3 = f3._init, za(a2, d2, l3(f3._payload), h2);
        }
        if (Da(f3))
          return w2(a2, d2, f3, h2);
        if (ta(f3))
          return Z(a2, d2, f3, h2);
        ne(a2, f3);
      }
      return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = re(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
    }
    return za;
  }
  var ve = pe(true), we = pe(false), xe = {}, ye = ic(xe), ze = ic(xe), Ae = ic(xe);
  function Be(a) {
    if (a === xe)
      throw Error(m2(174));
    return a;
  }
  function Ce(a, b) {
    v2(Ae, b);
    v2(ze, a);
    v2(ye, xe);
    a = Fa(b);
    q2(ye);
    v2(ye, a);
  }
  function De() {
    q2(ye);
    q2(ze);
    q2(Ae);
  }
  function Ee(a) {
    var b = Be(Ae.current), c = Be(ye.current);
    b = Ga(c, a.type, b);
    c !== b && (v2(ze, a), v2(ye, b));
  }
  function Fe(a) {
    ze.current === a && (q2(ye), q2(ze));
  }
  var J2 = ic(0);
  function Ge(a) {
    for (var b = a; null !== b; ) {
      if (13 === b.tag) {
        var c = b.memoizedState;
        if (null !== c && (c = c.dehydrated, null === c || Jb(c) || Kb(c)))
          return b;
      } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
        if (0 !== (b.flags & 128))
          return b;
      } else if (null !== b.child) {
        b.child.return = b;
        b = b.child;
        continue;
      }
      if (b === a)
        break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a)
          return null;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
    return null;
  }
  var He = [];
  function Ie() {
    for (var a = 0; a < He.length; a++) {
      var b = He[a];
      Sa ? b._workInProgressVersionPrimary = null : b._workInProgressVersionSecondary = null;
    }
    He.length = 0;
  }
  var Je = da.ReactCurrentDispatcher, Ke = da.ReactCurrentBatchConfig, Le = 0, K2 = null, L2 = null, M2 = null, Me = false, Ne = false, Oe = 0, Pe = 0;
  function N2() {
    throw Error(m2(321));
  }
  function Qe(a, b) {
    if (null === b)
      return false;
    for (var c = 0; c < b.length && c < a.length; c++)
      if (!Vc(a[c], b[c]))
        return false;
    return true;
  }
  function Re(a, b, c, d, e, f2) {
    Le = f2;
    K2 = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    Je.current = null === a || null === a.memoizedState ? Se : Te;
    a = c(d, e);
    if (Ne) {
      f2 = 0;
      do {
        Ne = false;
        Oe = 0;
        if (25 <= f2)
          throw Error(m2(301));
        f2 += 1;
        M2 = L2 = null;
        b.updateQueue = null;
        Je.current = Ue;
        a = c(d, e);
      } while (Ne);
    }
    Je.current = Ve;
    b = null !== L2 && null !== L2.next;
    Le = 0;
    M2 = L2 = K2 = null;
    Me = false;
    if (b)
      throw Error(m2(300));
    return a;
  }
  function We() {
    var a = 0 !== Oe;
    Oe = 0;
    return a;
  }
  function Xe() {
    var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    null === M2 ? K2.memoizedState = M2 = a : M2 = M2.next = a;
    return M2;
  }
  function Ye() {
    if (null === L2) {
      var a = K2.alternate;
      a = null !== a ? a.memoizedState : null;
    } else
      a = L2.next;
    var b = null === M2 ? K2.memoizedState : M2.next;
    if (null !== b)
      M2 = b, L2 = a;
    else {
      if (null === a)
        throw Error(m2(310));
      L2 = a;
      a = { memoizedState: L2.memoizedState, baseState: L2.baseState, baseQueue: L2.baseQueue, queue: L2.queue, next: null };
      null === M2 ? K2.memoizedState = M2 = a : M2 = M2.next = a;
    }
    return M2;
  }
  function Ze(a, b) {
    return "function" === typeof b ? b(a) : b;
  }
  function $e(a) {
    var b = Ye(), c = b.queue;
    if (null === c)
      throw Error(m2(311));
    c.lastRenderedReducer = a;
    var d = L2, e = d.baseQueue, f2 = c.pending;
    if (null !== f2) {
      if (null !== e) {
        var g = e.next;
        e.next = f2.next;
        f2.next = g;
      }
      d.baseQueue = e = f2;
      c.pending = null;
    }
    if (null !== e) {
      f2 = e.next;
      d = d.baseState;
      var h = g = null, k2 = null, l2 = f2;
      do {
        var n2 = l2.lane;
        if ((Le & n2) === n2)
          null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
        else {
          var t2 = {
            lane: n2,
            action: l2.action,
            hasEagerState: l2.hasEagerState,
            eagerState: l2.eagerState,
            next: null
          };
          null === k2 ? (h = k2 = t2, g = d) : k2 = k2.next = t2;
          K2.lanes |= n2;
          be |= n2;
        }
        l2 = l2.next;
      } while (null !== l2 && l2 !== f2);
      null === k2 ? g = d : k2.next = h;
      Vc(d, b.memoizedState) || (G2 = true);
      b.memoizedState = d;
      b.baseState = g;
      b.baseQueue = k2;
      c.lastRenderedState = d;
    }
    a = c.interleaved;
    if (null !== a) {
      e = a;
      do
        f2 = e.lane, K2.lanes |= f2, be |= f2, e = e.next;
      while (e !== a);
    } else
      null === e && (c.lanes = 0);
    return [b.memoizedState, c.dispatch];
  }
  function af(a) {
    var b = Ye(), c = b.queue;
    if (null === c)
      throw Error(m2(311));
    c.lastRenderedReducer = a;
    var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
    if (null !== e) {
      c.pending = null;
      var g = e = e.next;
      do
        f2 = a(f2, g.action), g = g.next;
      while (g !== e);
      Vc(f2, b.memoizedState) || (G2 = true);
      b.memoizedState = f2;
      null === b.baseQueue && (b.baseState = f2);
      c.lastRenderedState = f2;
    }
    return [f2, d];
  }
  function bf() {
  }
  function cf(a, b) {
    var c = K2, d = Ye(), e = b(), f2 = !Vc(d.memoizedState, e);
    f2 && (d.memoizedState = e, G2 = true);
    d = d.queue;
    df(ef.bind(null, c, d, a), [a]);
    if (d.getSnapshot !== b || f2 || null !== M2 && M2.memoizedState.tag & 1) {
      c.flags |= 2048;
      ff(9, gf.bind(null, c, d, e, b), void 0, null);
      if (null === O2)
        throw Error(m2(349));
      0 !== (Le & 30) || hf(c, b, e);
    }
    return e;
  }
  function hf(a, b, c) {
    a.flags |= 16384;
    a = { getSnapshot: b, value: c };
    b = K2.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, K2.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
  }
  function gf(a, b, c, d) {
    b.value = c;
    b.getSnapshot = d;
    jf(b) && kf(a);
  }
  function ef(a, b, c) {
    return c(function() {
      jf(b) && kf(a);
    });
  }
  function jf(a) {
    var b = a.getSnapshot;
    a = a.value;
    try {
      var c = b();
      return !Vc(a, c);
    } catch (d) {
      return true;
    }
  }
  function kf(a) {
    var b = Td(a, 1);
    null !== b && ge(b, a, 1, -1);
  }
  function lf(a) {
    var b = Xe();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ze, lastRenderedState: a };
    b.queue = a;
    a = a.dispatch = mf.bind(null, K2, a);
    return [b.memoizedState, a];
  }
  function ff(a, b, c, d) {
    a = { tag: a, create: b, destroy: c, deps: d, next: null };
    b = K2.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, K2.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
    return a;
  }
  function nf() {
    return Ye().memoizedState;
  }
  function of(a, b, c, d) {
    var e = Xe();
    K2.flags |= a;
    e.memoizedState = ff(1 | b, c, void 0, void 0 === d ? null : d);
  }
  function pf(a, b, c, d) {
    var e = Ye();
    d = void 0 === d ? null : d;
    var f2 = void 0;
    if (null !== L2) {
      var g = L2.memoizedState;
      f2 = g.destroy;
      if (null !== d && Qe(d, g.deps)) {
        e.memoizedState = ff(b, c, f2, d);
        return;
      }
    }
    K2.flags |= a;
    e.memoizedState = ff(1 | b, c, f2, d);
  }
  function qf(a, b) {
    return of(8390656, 8, a, b);
  }
  function df(a, b) {
    return pf(2048, 8, a, b);
  }
  function rf(a, b) {
    return pf(4, 2, a, b);
  }
  function sf(a, b) {
    return pf(4, 4, a, b);
  }
  function tf(a, b) {
    if ("function" === typeof b)
      return a = a(), b(a), function() {
        b(null);
      };
    if (null !== b && void 0 !== b)
      return a = a(), b.current = a, function() {
        b.current = null;
      };
  }
  function uf(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return pf(4, 4, tf.bind(null, b, a), c);
  }
  function vf() {
  }
  function wf(a, b) {
    var c = Ye();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Qe(b, d[1]))
      return d[0];
    c.memoizedState = [a, b];
    return a;
  }
  function xf(a, b) {
    var c = Ye();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Qe(b, d[1]))
      return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  }
  function yf(a, b, c) {
    if (0 === (Le & 21))
      return a.baseState && (a.baseState = false, G2 = true), a.memoizedState = c;
    Vc(c, b) || (c = Dc(), K2.lanes |= c, be |= c, a.baseState = true);
    return b;
  }
  function zf(a, b) {
    var c = C2;
    C2 = 0 !== c && 4 > c ? c : 4;
    a(true);
    var d = Ke.transition;
    Ke.transition = {};
    try {
      a(false), b();
    } finally {
      C2 = c, Ke.transition = d;
    }
  }
  function Af() {
    return Ye().memoizedState;
  }
  function Bf(a, b, c) {
    var d = fe(a);
    c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
    if (Cf(a))
      Df(b, c);
    else if (c = Sd(a, b, c, d), null !== c) {
      var e = I2();
      ge(c, a, d, e);
      Ef(c, b, d);
    }
  }
  function mf(a, b, c) {
    var d = fe(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
    if (Cf(a))
      Df(b, e);
    else {
      var f2 = a.alternate;
      if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2))
        try {
          var g = b.lastRenderedState, h = f2(g, c);
          e.hasEagerState = true;
          e.eagerState = h;
          if (Vc(h, g)) {
            var k2 = b.interleaved;
            null === k2 ? (e.next = e, Rd(b)) : (e.next = k2.next, k2.next = e);
            b.interleaved = e;
            return;
          }
        } catch (l2) {
        } finally {
        }
      c = Sd(a, b, e, d);
      null !== c && (e = I2(), ge(c, a, d, e), Ef(c, b, d));
    }
  }
  function Cf(a) {
    var b = a.alternate;
    return a === K2 || null !== b && b === K2;
  }
  function Df(a, b) {
    Ne = Me = true;
    var c = a.pending;
    null === c ? b.next = b : (b.next = c.next, c.next = b);
    a.pending = b;
  }
  function Ef(a, b, c) {
    if (0 !== (c & 4194240)) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Hc(a, c);
    }
  }
  var Ve = { readContext: Pd, useCallback: N2, useContext: N2, useEffect: N2, useImperativeHandle: N2, useInsertionEffect: N2, useLayoutEffect: N2, useMemo: N2, useReducer: N2, useRef: N2, useState: N2, useDebugValue: N2, useDeferredValue: N2, useTransition: N2, useMutableSource: N2, useSyncExternalStore: N2, useId: N2, unstable_isNewReconciler: false }, Se = { readContext: Pd, useCallback: function(a, b) {
    Xe().memoizedState = [a, void 0 === b ? null : b];
    return a;
  }, useContext: Pd, useEffect: qf, useImperativeHandle: function(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return of(
      4194308,
      4,
      tf.bind(null, b, a),
      c
    );
  }, useLayoutEffect: function(a, b) {
    return of(4194308, 4, a, b);
  }, useInsertionEffect: function(a, b) {
    return of(4, 2, a, b);
  }, useMemo: function(a, b) {
    var c = Xe();
    b = void 0 === b ? null : b;
    a = a();
    c.memoizedState = [a, b];
    return a;
  }, useReducer: function(a, b, c) {
    var d = Xe();
    b = void 0 !== c ? c(b) : b;
    d.memoizedState = d.baseState = b;
    a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
    d.queue = a;
    a = a.dispatch = Bf.bind(null, K2, a);
    return [d.memoizedState, a];
  }, useRef: function(a) {
    var b = Xe();
    a = { current: a };
    return b.memoizedState = a;
  }, useState: lf, useDebugValue: vf, useDeferredValue: function(a) {
    return Xe().memoizedState = a;
  }, useTransition: function() {
    var a = lf(false), b = a[0];
    a = zf.bind(null, a[1]);
    Xe().memoizedState = a;
    return [b, a];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(a, b, c) {
    var d = K2, e = Xe();
    if (F2) {
      if (void 0 === c)
        throw Error(m2(407));
      c = c();
    } else {
      c = b();
      if (null === O2)
        throw Error(m2(349));
      0 !== (Le & 30) || hf(d, b, c);
    }
    e.memoizedState = c;
    var f2 = { value: c, getSnapshot: b };
    e.queue = f2;
    qf(ef.bind(
      null,
      d,
      f2,
      a
    ), [a]);
    d.flags |= 2048;
    ff(9, gf.bind(null, d, f2, c, b), void 0, null);
    return c;
  }, useId: function() {
    var a = Xe(), b = O2.identifierPrefix;
    if (F2) {
      var c = jd;
      var d = id;
      c = (d & ~(1 << 32 - tc(d) - 1)).toString(32) + c;
      b = ":" + b + "R" + c;
      c = Oe++;
      0 < c && (b += "H" + c.toString(32));
      b += ":";
    } else
      c = Pe++, b = ":" + b + "r" + c.toString(32) + ":";
    return a.memoizedState = b;
  }, unstable_isNewReconciler: false }, Te = {
    readContext: Pd,
    useCallback: wf,
    useContext: Pd,
    useEffect: df,
    useImperativeHandle: uf,
    useInsertionEffect: rf,
    useLayoutEffect: sf,
    useMemo: xf,
    useReducer: $e,
    useRef: nf,
    useState: function() {
      return $e(Ze);
    },
    useDebugValue: vf,
    useDeferredValue: function(a) {
      var b = Ye();
      return yf(b, L2.memoizedState, a);
    },
    useTransition: function() {
      var a = $e(Ze)[0], b = Ye().memoizedState;
      return [a, b];
    },
    useMutableSource: bf,
    useSyncExternalStore: cf,
    useId: Af,
    unstable_isNewReconciler: false
  }, Ue = { readContext: Pd, useCallback: wf, useContext: Pd, useEffect: df, useImperativeHandle: uf, useInsertionEffect: rf, useLayoutEffect: sf, useMemo: xf, useReducer: af, useRef: nf, useState: function() {
    return af(Ze);
  }, useDebugValue: vf, useDeferredValue: function(a) {
    var b = Ye();
    return null === L2 ? b.memoizedState = a : yf(b, L2.memoizedState, a);
  }, useTransition: function() {
    var a = af(Ze)[0], b = Ye().memoizedState;
    return [a, b];
  }, useMutableSource: bf, useSyncExternalStore: cf, useId: Af, unstable_isNewReconciler: false };
  function Ff(a, b) {
    try {
      var c = "", d = b;
      do
        c += Ed(d), d = d.return;
      while (d);
      var e = c;
    } catch (f2) {
      e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
    }
    return { value: a, source: b, stack: e, digest: null };
  }
  function Gf(a, b, c) {
    return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
  }
  function Hf(a, b) {
    try {
      console.error(b.value);
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  var If = "function" === typeof WeakMap ? WeakMap : Map;
  function Jf(a, b, c) {
    c = Xd(-1, c);
    c.tag = 3;
    c.payload = { element: null };
    var d = b.value;
    c.callback = function() {
      Kf || (Kf = true, Lf = d);
      Hf(a, b);
    };
    return c;
  }
  function Mf(a, b, c) {
    c = Xd(-1, c);
    c.tag = 3;
    var d = a.type.getDerivedStateFromError;
    if ("function" === typeof d) {
      var e = b.value;
      c.payload = function() {
        return d(e);
      };
      c.callback = function() {
        Hf(a, b);
      };
    }
    var f2 = a.stateNode;
    null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
      Hf(a, b);
      "function" !== typeof d && (null === Nf ? Nf = /* @__PURE__ */ new Set([this]) : Nf.add(this));
      var c2 = b.stack;
      this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
    });
    return c;
  }
  function Of(a, b, c) {
    var d = a.pingCache;
    if (null === d) {
      d = a.pingCache = new If();
      var e = /* @__PURE__ */ new Set();
      d.set(b, e);
    } else
      e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
    e.has(c) || (e.add(c), a = Pf.bind(null, a, b, c), b.then(a, a));
  }
  function Qf(a) {
    do {
      var b;
      if (b = 13 === a.tag)
        b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
      if (b)
        return a;
      a = a.return;
    } while (null !== a);
    return null;
  }
  function Rf(a, b, c, d, e) {
    if (0 === (a.mode & 1))
      return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = Xd(-1, 1), b.tag = 2, Yd(c, b, 1))), c.lanes |= 1), a;
    a.flags |= 65536;
    a.lanes = e;
    return a;
  }
  var Sf = da.ReactCurrentOwner, G2 = false;
  function P2(a, b, c, d) {
    b.child = null === a ? we(b, null, c, d) : ve(b, a.child, c, d);
  }
  function Tf(a, b, c, d, e) {
    c = c.render;
    var f2 = b.ref;
    Od(b, e);
    d = Re(a, b, c, d, f2, e);
    c = We();
    if (null !== a && !G2)
      return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Uf(a, b, e);
    F2 && c && md(b);
    b.flags |= 1;
    P2(a, b, d, e);
    return b.child;
  }
  function Vf(a, b, c, d, e) {
    if (null === a) {
      var f2 = c.type;
      if ("function" === typeof f2 && !Wf(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps)
        return b.tag = 15, b.type = f2, Xf(a, b, f2, d, e);
      a = se(c.type, null, d, b, b.mode, e);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }
    f2 = a.child;
    if (0 === (a.lanes & e)) {
      var g = f2.memoizedProps;
      c = c.compare;
      c = null !== c ? c : Dd;
      if (c(g, d) && a.ref === b.ref)
        return Uf(a, b, e);
    }
    b.flags |= 1;
    a = qe(f2, d);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  function Xf(a, b, c, d, e) {
    if (null !== a) {
      var f2 = a.memoizedProps;
      if (Dd(f2, d) && a.ref === b.ref)
        if (G2 = false, b.pendingProps = d = f2, 0 !== (a.lanes & e))
          0 !== (a.flags & 131072) && (G2 = true);
        else
          return b.lanes = a.lanes, Uf(a, b, e);
    }
    return Yf(a, b, c, d, e);
  }
  function Zf(a, b, c) {
    var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
    if ("hidden" === d.mode)
      if (0 === (b.mode & 1))
        b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, v2($f, ag), ag |= c;
      else {
        if (0 === (c & 1073741824))
          return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, v2($f, ag), ag |= a, null;
        b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
        d = null !== f2 ? f2.baseLanes : c;
        v2($f, ag);
        ag |= d;
      }
    else
      null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, v2($f, ag), ag |= d;
    P2(a, b, e, c);
    return b.child;
  }
  function bg(a, b) {
    var c = b.ref;
    if (null === a && null !== c || null !== a && a.ref !== c)
      b.flags |= 512, b.flags |= 2097152;
  }
  function Yf(a, b, c, d, e) {
    var f2 = A2(c) ? kc : x2.current;
    f2 = lc(b, f2);
    Od(b, e);
    c = Re(a, b, c, d, f2, e);
    d = We();
    if (null !== a && !G2)
      return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Uf(a, b, e);
    F2 && d && md(b);
    b.flags |= 1;
    P2(a, b, c, e);
    return b.child;
  }
  function cg(a, b, c, d, e) {
    if (A2(c)) {
      var f2 = true;
      pc(b);
    } else
      f2 = false;
    Od(b, e);
    if (null === b.stateNode)
      dg(a, b), je(b, c, d), le(b, c, d, e), d = true;
    else if (null === a) {
      var g = b.stateNode, h = b.memoizedProps;
      g.props = h;
      var k2 = g.context, l2 = c.contextType;
      "object" === typeof l2 && null !== l2 ? l2 = Pd(l2) : (l2 = A2(c) ? kc : x2.current, l2 = lc(b, l2));
      var n2 = c.getDerivedStateFromProps, t2 = "function" === typeof n2 || "function" === typeof g.getSnapshotBeforeUpdate;
      t2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && ke(b, g, d, l2);
      Ud = false;
      var p2 = b.memoizedState;
      g.state = p2;
      ae(b, d, g, e);
      k2 = b.memoizedState;
      h !== d || p2 !== k2 || z2.current || Ud ? ("function" === typeof n2 && (ee(b, c, n2, d), k2 = b.memoizedState), (h = Ud || ie(b, c, h, d, p2, k2, l2)) ? (t2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
    } else {
      g = b.stateNode;
      Wd(a, b);
      h = b.memoizedProps;
      l2 = b.type === b.elementType ? h : Fd(b.type, h);
      g.props = l2;
      t2 = b.pendingProps;
      p2 = g.context;
      k2 = c.contextType;
      "object" === typeof k2 && null !== k2 ? k2 = Pd(k2) : (k2 = A2(c) ? kc : x2.current, k2 = lc(b, k2));
      var B2 = c.getDerivedStateFromProps;
      (n2 = "function" === typeof B2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== t2 || p2 !== k2) && ke(b, g, d, k2);
      Ud = false;
      p2 = b.memoizedState;
      g.state = p2;
      ae(b, d, g, e);
      var w2 = b.memoizedState;
      h !== t2 || p2 !== w2 || z2.current || Ud ? ("function" === typeof B2 && (ee(b, c, B2, d), w2 = b.memoizedState), (l2 = Ud || ie(b, c, l2, d, p2, w2, k2) || false) ? (n2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, w2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, w2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = w2), g.props = d, g.state = w2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p2 === a.memoizedState || (b.flags |= 1024), d = false);
    }
    return eg(a, b, c, d, f2, e);
  }
  function eg(a, b, c, d, e, f2) {
    bg(a, b);
    var g = 0 !== (b.flags & 128);
    if (!d && !g)
      return e && rc(b, c, false), Uf(a, b, f2);
    d = b.stateNode;
    Sf.current = b;
    var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.flags |= 1;
    null !== a && g ? (b.child = ve(b, a.child, null, f2), b.child = ve(b, null, h, f2)) : P2(a, b, h, f2);
    b.memoizedState = d.state;
    e && rc(b, c, true);
    return b.child;
  }
  function fg(a) {
    var b = a.stateNode;
    b.pendingContext ? nc(a, b.pendingContext, b.pendingContext !== b.context) : b.context && nc(a, b.context, false);
    Ce(a, b.containerInfo);
  }
  function gg(a, b, c, d, e) {
    Ad2();
    Bd(e);
    b.flags |= 256;
    P2(a, b, c, d);
    return b.child;
  }
  var hg = { dehydrated: null, treeContext: null, retryLane: 0 };
  function ig(a) {
    return { baseLanes: a, cachePool: null, transitions: null };
  }
  function jg(a, b, c) {
    var d = b.pendingProps, e = J2.current, f2 = false, g = 0 !== (b.flags & 128), h;
    (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
    if (h)
      f2 = true, b.flags &= -129;
    else if (null === a || null !== a.memoizedState)
      e |= 1;
    v2(J2, e & 1);
    if (null === a) {
      wd(b);
      a = b.memoizedState;
      if (null !== a && (a = a.dehydrated, null !== a))
        return 0 === (b.mode & 1) ? b.lanes = 1 : Kb(a) ? b.lanes = 8 : b.lanes = 1073741824, null;
      g = d.children;
      a = d.fallback;
      return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = kg(g, d, 0, null), a = ue(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = ig(c), b.memoizedState = hg, a) : lg(b, g);
    }
    e = a.memoizedState;
    if (null !== e && (h = e.dehydrated, null !== h))
      return mg(a, b, g, d, h, e, c);
    if (f2) {
      f2 = d.fallback;
      g = b.mode;
      e = a.child;
      h = e.sibling;
      var k2 = { mode: "hidden", children: d.children };
      0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = qe(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
      null !== h ? f2 = qe(h, f2) : (f2 = ue(f2, g, c, null), f2.flags |= 2);
      f2.return = b;
      d.return = b;
      d.sibling = f2;
      b.child = d;
      d = f2;
      f2 = b.child;
      g = a.child.memoizedState;
      g = null === g ? ig(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
      f2.memoizedState = g;
      f2.childLanes = a.childLanes & ~c;
      b.memoizedState = hg;
      return d;
    }
    f2 = a.child;
    a = f2.sibling;
    d = qe(f2, { mode: "visible", children: d.children });
    0 === (b.mode & 1) && (d.lanes = c);
    d.return = b;
    d.sibling = null;
    null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
    b.child = d;
    b.memoizedState = null;
    return d;
  }
  function lg(a, b) {
    b = kg({ mode: "visible", children: b }, a.mode, 0, null);
    b.return = a;
    return a.child = b;
  }
  function ng(a, b, c, d) {
    null !== d && Bd(d);
    ve(b, a.child, null, c);
    a = lg(b, b.pendingProps.children);
    a.flags |= 2;
    b.memoizedState = null;
    return a;
  }
  function mg(a, b, c, d, e, f2, g) {
    if (c) {
      if (b.flags & 256)
        return b.flags &= -257, d = Gf(Error(m2(422))), ng(a, b, g, d);
      if (null !== b.memoizedState)
        return b.child = a.child, b.flags |= 128, null;
      f2 = d.fallback;
      e = b.mode;
      d = kg({ mode: "visible", children: d.children }, e, 0, null);
      f2 = ue(f2, e, g, null);
      f2.flags |= 2;
      d.return = b;
      f2.return = b;
      d.sibling = f2;
      b.child = d;
      0 !== (b.mode & 1) && ve(b, a.child, null, g);
      b.child.memoizedState = ig(g);
      b.memoizedState = hg;
      return f2;
    }
    if (0 === (b.mode & 1))
      return ng(a, b, g, null);
    if (Kb(e))
      return d = Lb(e).digest, f2 = Error(m2(419)), d = Gf(
        f2,
        d,
        void 0
      ), ng(a, b, g, d);
    c = 0 !== (g & a.childLanes);
    if (G2 || c) {
      d = O2;
      if (null !== d) {
        switch (g & -g) {
          case 4:
            e = 2;
            break;
          case 16:
            e = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            e = 32;
            break;
          case 536870912:
            e = 268435456;
            break;
          default:
            e = 0;
        }
        e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
        0 !== e && e !== f2.retryLane && (f2.retryLane = e, Td(a, e), ge(
          d,
          a,
          e,
          -1
        ));
      }
      og();
      d = Gf(Error(m2(421)));
      return ng(a, b, g, d);
    }
    if (Jb(e))
      return b.flags |= 128, b.child = a.child, b = pg.bind(null, a), Mb(e, b), null;
    a = f2.treeContext;
    Va && (pd = Qb(e), od = b, F2 = true, rd = null, qd = false, null !== a && (fd[gd++] = id, fd[gd++] = jd, fd[gd++] = hd, id = a.id, jd = a.overflow, hd = b));
    b = lg(b, d.children);
    b.flags |= 4096;
    return b;
  }
  function qg(a, b, c) {
    a.lanes |= b;
    var d = a.alternate;
    null !== d && (d.lanes |= b);
    Nd(a.return, b, c);
  }
  function rg(a, b, c, d, e) {
    var f2 = a.memoizedState;
    null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
  }
  function sg(a, b, c) {
    var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
    P2(a, b, d.children, c);
    d = J2.current;
    if (0 !== (d & 2))
      d = d & 1 | 2, b.flags |= 128;
    else {
      if (null !== a && 0 !== (a.flags & 128))
        a:
          for (a = b.child; null !== a; ) {
            if (13 === a.tag)
              null !== a.memoizedState && qg(a, c, b);
            else if (19 === a.tag)
              qg(a, c, b);
            else if (null !== a.child) {
              a.child.return = a;
              a = a.child;
              continue;
            }
            if (a === b)
              break a;
            for (; null === a.sibling; ) {
              if (null === a.return || a.return === b)
                break a;
              a = a.return;
            }
            a.sibling.return = a.return;
            a = a.sibling;
          }
      d &= 1;
    }
    v2(J2, d);
    if (0 === (b.mode & 1))
      b.memoizedState = null;
    else
      switch (e) {
        case "forwards":
          c = b.child;
          for (e = null; null !== c; )
            a = c.alternate, null !== a && null === Ge(a) && (e = c), c = c.sibling;
          c = e;
          null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
          rg(b, false, e, c, f2);
          break;
        case "backwards":
          c = null;
          e = b.child;
          for (b.child = null; null !== e; ) {
            a = e.alternate;
            if (null !== a && null === Ge(a)) {
              b.child = e;
              break;
            }
            a = e.sibling;
            e.sibling = c;
            c = e;
            e = a;
          }
          rg(b, true, c, null, f2);
          break;
        case "together":
          rg(b, false, null, null, void 0);
          break;
        default:
          b.memoizedState = null;
      }
    return b.child;
  }
  function dg(a, b) {
    0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
  }
  function Uf(a, b, c) {
    null !== a && (b.dependencies = a.dependencies);
    be |= b.lanes;
    if (0 === (c & b.childLanes))
      return null;
    if (null !== a && b.child !== a.child)
      throw Error(m2(153));
    if (null !== b.child) {
      a = b.child;
      c = qe(a, a.pendingProps);
      b.child = c;
      for (c.return = b; null !== a.sibling; )
        a = a.sibling, c = c.sibling = qe(a, a.pendingProps), c.return = b;
      c.sibling = null;
    }
    return b.child;
  }
  function tg(a, b, c) {
    switch (b.tag) {
      case 3:
        fg(b);
        Ad2();
        break;
      case 5:
        Ee(b);
        break;
      case 1:
        A2(b.type) && pc(b);
        break;
      case 4:
        Ce(b, b.stateNode.containerInfo);
        break;
      case 10:
        Ld(b, b.type._context, b.memoizedProps.value);
        break;
      case 13:
        var d = b.memoizedState;
        if (null !== d) {
          if (null !== d.dehydrated)
            return v2(J2, J2.current & 1), b.flags |= 128, null;
          if (0 !== (c & b.child.childLanes))
            return jg(a, b, c);
          v2(J2, J2.current & 1);
          a = Uf(a, b, c);
          return null !== a ? a.sibling : null;
        }
        v2(J2, J2.current & 1);
        break;
      case 19:
        d = 0 !== (c & b.childLanes);
        if (0 !== (a.flags & 128)) {
          if (d)
            return sg(
              a,
              b,
              c
            );
          b.flags |= 128;
        }
        var e = b.memoizedState;
        null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
        v2(J2, J2.current);
        if (d)
          break;
        else
          return null;
      case 22:
      case 23:
        return b.lanes = 0, Zf(a, b, c);
    }
    return Uf(a, b, c);
  }
  function ug(a) {
    a.flags |= 4;
  }
  function vg(a, b) {
    if (null !== a && a.child === b.child)
      return true;
    if (0 !== (b.flags & 16))
      return false;
    for (a = b.child; null !== a; ) {
      if (0 !== (a.flags & 12854) || 0 !== (a.subtreeFlags & 12854))
        return false;
      a = a.sibling;
    }
    return true;
  }
  var wg, xg, yg, zg;
  if (Ta)
    wg = function(a, b) {
      for (var c = b.child; null !== c; ) {
        if (5 === c.tag || 6 === c.tag)
          Ka(a, c.stateNode);
        else if (4 !== c.tag && null !== c.child) {
          c.child.return = c;
          c = c.child;
          continue;
        }
        if (c === b)
          break;
        for (; null === c.sibling; ) {
          if (null === c.return || c.return === b)
            return;
          c = c.return;
        }
        c.sibling.return = c.return;
        c = c.sibling;
      }
    }, xg = function() {
    }, yg = function(a, b, c, d, e) {
      a = a.memoizedProps;
      if (a !== d) {
        var f2 = b.stateNode, g = Be(ye.current);
        c = Ma(f2, c, a, d, e, g);
        (b.updateQueue = c) && ug(b);
      }
    }, zg = function(a, b, c, d) {
      c !== d && ug(b);
    };
  else if (Ua) {
    wg = function(a, b, c, d) {
      for (var e = b.child; null !== e; ) {
        if (5 === e.tag) {
          var f2 = e.stateNode;
          c && d && (f2 = Eb(f2, e.type, e.memoizedProps, e));
          Ka(a, f2);
        } else if (6 === e.tag)
          f2 = e.stateNode, c && d && (f2 = Fb(f2, e.memoizedProps, e)), Ka(a, f2);
        else if (4 !== e.tag) {
          if (22 === e.tag && null !== e.memoizedState)
            f2 = e.child, null !== f2 && (f2.return = e), wg(a, e, true, true);
          else if (null !== e.child) {
            e.child.return = e;
            e = e.child;
            continue;
          }
        }
        if (e === b)
          break;
        for (; null === e.sibling; ) {
          if (null === e.return || e.return === b)
            return;
          e = e.return;
        }
        e.sibling.return = e.return;
        e = e.sibling;
      }
    };
    var Ag = function(a, b, c, d) {
      for (var e = b.child; null !== e; ) {
        if (5 === e.tag) {
          var f2 = e.stateNode;
          c && d && (f2 = Eb(f2, e.type, e.memoizedProps, e));
          Ab(a, f2);
        } else if (6 === e.tag)
          f2 = e.stateNode, c && d && (f2 = Fb(f2, e.memoizedProps, e)), Ab(a, f2);
        else if (4 !== e.tag) {
          if (22 === e.tag && null !== e.memoizedState)
            f2 = e.child, null !== f2 && (f2.return = e), Ag(a, e, true, true);
          else if (null !== e.child) {
            e.child.return = e;
            e = e.child;
            continue;
          }
        }
        if (e === b)
          break;
        for (; null === e.sibling; ) {
          if (null === e.return || e.return === b)
            return;
          e = e.return;
        }
        e.sibling.return = e.return;
        e = e.sibling;
      }
    };
    xg = function(a, b) {
      var c = b.stateNode;
      if (!vg(a, b)) {
        a = c.containerInfo;
        var d = zb(a);
        Ag(d, b, false, false);
        c.pendingChildren = d;
        ug(b);
        Bb(a, d);
      }
    };
    yg = function(a, b, c, d, e) {
      var f2 = a.stateNode, g = a.memoizedProps;
      if ((a = vg(a, b)) && g === d)
        b.stateNode = f2;
      else {
        var h = b.stateNode, k2 = Be(ye.current), l2 = null;
        g !== d && (l2 = Ma(h, c, g, d, e, k2));
        a && null === l2 ? b.stateNode = f2 : (f2 = yb(f2, l2, c, g, d, b, a, h), La(f2, c, d, e, k2) && ug(b), b.stateNode = f2, a ? ug(b) : wg(f2, b, false, false));
      }
    };
    zg = function(a, b, c, d) {
      c !== d ? (a = Be(Ae.current), c = Be(ye.current), b.stateNode = Oa(d, a, c, b), ug(b)) : b.stateNode = a.stateNode;
    };
  } else
    xg = function() {
    }, yg = function() {
    }, zg = function() {
    };
  function Bg(a, b) {
    if (!F2)
      switch (a.tailMode) {
        case "hidden":
          b = a.tail;
          for (var c = null; null !== b; )
            null !== b.alternate && (c = b), b = b.sibling;
          null === c ? a.tail = null : c.sibling = null;
          break;
        case "collapsed":
          c = a.tail;
          for (var d = null; null !== c; )
            null !== c.alternate && (d = c), c = c.sibling;
          null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
      }
  }
  function Q2(a) {
    var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
    if (b)
      for (var e = a.child; null !== e; )
        c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
    else
      for (e = a.child; null !== e; )
        c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
    a.subtreeFlags |= d;
    a.childLanes = c;
    return b;
  }
  function Cg(a, b, c) {
    var d = b.pendingProps;
    nd(b);
    switch (b.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Q2(b), null;
      case 1:
        return A2(b.type) && mc(), Q2(b), null;
      case 3:
        c = b.stateNode;
        De();
        q2(z2);
        q2(x2);
        Ie();
        c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null);
        if (null === a || null === a.child)
          yd(b) ? ug(b) : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== rd && (Dg(rd), rd = null));
        xg(a, b);
        Q2(b);
        return null;
      case 5:
        Fe(b);
        c = Be(Ae.current);
        var e = b.type;
        if (null !== a && null != b.stateNode)
          yg(a, b, e, d, c), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        else {
          if (!d) {
            if (null === b.stateNode)
              throw Error(m2(166));
            Q2(b);
            return null;
          }
          a = Be(ye.current);
          if (yd(b)) {
            if (!Va)
              throw Error(m2(175));
            a = Rb(b.stateNode, b.type, b.memoizedProps, c, a, b, !qd);
            b.updateQueue = a;
            null !== a && ug(b);
          } else {
            var f2 = Ja(e, d, c, a, b);
            wg(f2, b, false, false);
            b.stateNode = f2;
            La(f2, e, d, c, a) && ug(b);
          }
          null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        }
        Q2(b);
        return null;
      case 6:
        if (a && null != b.stateNode)
          zg(a, b, a.memoizedProps, d);
        else {
          if ("string" !== typeof d && null === b.stateNode)
            throw Error(m2(166));
          a = Be(Ae.current);
          c = Be(ye.current);
          if (yd(b)) {
            if (!Va)
              throw Error(m2(176));
            a = b.stateNode;
            c = b.memoizedProps;
            if (d = Sb(a, c, b, !qd)) {
              if (e = od, null !== e)
                switch (e.tag) {
                  case 3:
                    $b(e.stateNode.containerInfo, a, c, 0 !== (e.mode & 1));
                    break;
                  case 5:
                    ac(e.type, e.memoizedProps, e.stateNode, a, c, 0 !== (e.mode & 1));
                }
            }
            d && ug(b);
          } else
            b.stateNode = Oa(d, a, c, b);
        }
        Q2(b);
        return null;
      case 13:
        q2(J2);
        d = b.memoizedState;
        if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
          if (F2 && null !== pd && 0 !== (b.mode & 1) && 0 === (b.flags & 128))
            zd(), Ad2(), b.flags |= 98560, e = false;
          else if (e = yd(b), null !== d && null !== d.dehydrated) {
            if (null === a) {
              if (!e)
                throw Error(m2(318));
              if (!Va)
                throw Error(m2(344));
              e = b.memoizedState;
              e = null !== e ? e.dehydrated : null;
              if (!e)
                throw Error(m2(317));
              Tb(e, b);
            } else
              Ad2(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
            Q2(b);
            e = false;
          } else
            null !== rd && (Dg(rd), rd = null), e = true;
          if (!e)
            return b.flags & 65536 ? b : null;
        }
        if (0 !== (b.flags & 128))
          return b.lanes = c, b;
        c = null !== d;
        c !== (null !== a && null !== a.memoizedState) && c && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (J2.current & 1) ? 0 === R2 && (R2 = 3) : og()));
        null !== b.updateQueue && (b.flags |= 4);
        Q2(b);
        return null;
      case 4:
        return De(), xg(a, b), null === a && Xa(b.stateNode.containerInfo), Q2(b), null;
      case 10:
        return Md(b.type._context), Q2(b), null;
      case 17:
        return A2(b.type) && mc(), Q2(b), null;
      case 19:
        q2(J2);
        e = b.memoizedState;
        if (null === e)
          return Q2(b), null;
        d = 0 !== (b.flags & 128);
        f2 = e.rendering;
        if (null === f2)
          if (d)
            Bg(e, false);
          else {
            if (0 !== R2 || null !== a && 0 !== (a.flags & 128))
              for (a = b.child; null !== a; ) {
                f2 = Ge(a);
                if (null !== f2) {
                  b.flags |= 128;
                  Bg(e, false);
                  a = f2.updateQueue;
                  null !== a && (b.updateQueue = a, b.flags |= 4);
                  b.subtreeFlags = 0;
                  a = c;
                  for (c = b.child; null !== c; )
                    d = c, e = a, d.flags &= 14680066, f2 = d.alternate, null === f2 ? (d.childLanes = 0, d.lanes = e, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = f2.childLanes, d.lanes = f2.lanes, d.child = f2.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = f2.memoizedProps, d.memoizedState = f2.memoizedState, d.updateQueue = f2.updateQueue, d.type = f2.type, e = f2.dependencies, d.dependencies = null === e ? null : { lanes: e.lanes, firstContext: e.firstContext }), c = c.sibling;
                  v2(J2, J2.current & 1 | 2);
                  return b.child;
                }
                a = a.sibling;
              }
            null !== e.tail && D2() > Eg && (b.flags |= 128, d = true, Bg(e, false), b.lanes = 4194304);
          }
        else {
          if (!d)
            if (a = Ge(f2), null !== a) {
              if (b.flags |= 128, d = true, a = a.updateQueue, null !== a && (b.updateQueue = a, b.flags |= 4), Bg(e, true), null === e.tail && "hidden" === e.tailMode && !f2.alternate && !F2)
                return Q2(b), null;
            } else
              2 * D2() - e.renderingStartTime > Eg && 1073741824 !== c && (b.flags |= 128, d = true, Bg(e, false), b.lanes = 4194304);
          e.isBackwards ? (f2.sibling = b.child, b.child = f2) : (a = e.last, null !== a ? a.sibling = f2 : b.child = f2, e.last = f2);
        }
        if (null !== e.tail)
          return b = e.tail, e.rendering = b, e.tail = b.sibling, e.renderingStartTime = D2(), b.sibling = null, a = J2.current, v2(J2, d ? a & 1 | 2 : a & 1), b;
        Q2(b);
        return null;
      case 22:
      case 23:
        return Fg(), c = null !== b.memoizedState, null !== a && null !== a.memoizedState !== c && (b.flags |= 8192), c && 0 !== (b.mode & 1) ? 0 !== (ag & 1073741824) && (Q2(b), Ta && b.subtreeFlags & 6 && (b.flags |= 8192)) : Q2(b), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(m2(
      156,
      b.tag
    ));
  }
  function Gg(a, b) {
    nd(b);
    switch (b.tag) {
      case 1:
        return A2(b.type) && mc(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 3:
        return De(), q2(z2), q2(x2), Ie(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
      case 5:
        return Fe(b), null;
      case 13:
        q2(J2);
        a = b.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          if (null === b.alternate)
            throw Error(m2(340));
          Ad2();
        }
        a = b.flags;
        return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 19:
        return q2(J2), null;
      case 4:
        return De(), null;
      case 10:
        return Md(b.type._context), null;
      case 22:
      case 23:
        return Fg(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Hg = false, S2 = false, Ig = "function" === typeof WeakSet ? WeakSet : Set, T2 = null;
  function Jg(a, b) {
    var c = a.ref;
    if (null !== c)
      if ("function" === typeof c)
        try {
          c(null);
        } catch (d) {
          U2(a, b, d);
        }
      else
        c.current = null;
  }
  function Kg(a, b, c) {
    try {
      c();
    } catch (d) {
      U2(a, b, d);
    }
  }
  var Lg = false;
  function Mg(a, b) {
    Ha(a.containerInfo);
    for (T2 = b; null !== T2; )
      if (a = T2, b = a.child, 0 !== (a.subtreeFlags & 1028) && null !== b)
        b.return = a, T2 = b;
      else
        for (; null !== T2; ) {
          a = T2;
          try {
            var c = a.alternate;
            if (0 !== (a.flags & 1024))
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (null !== c) {
                    var d = c.memoizedProps, e = c.memoizedState, f2 = a.stateNode, g = f2.getSnapshotBeforeUpdate(a.elementType === a.type ? d : Fd(a.type, d), e);
                    f2.__reactInternalSnapshotBeforeUpdate = g;
                  }
                  break;
                case 3:
                  Ta && xb(a.stateNode.containerInfo);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(m2(163));
              }
          } catch (h) {
            U2(a, a.return, h);
          }
          b = a.sibling;
          if (null !== b) {
            b.return = a.return;
            T2 = b;
            break;
          }
          T2 = a.return;
        }
    c = Lg;
    Lg = false;
    return c;
  }
  function Ng(a, b, c) {
    var d = b.updateQueue;
    d = null !== d ? d.lastEffect : null;
    if (null !== d) {
      var e = d = d.next;
      do {
        if ((e.tag & a) === a) {
          var f2 = e.destroy;
          e.destroy = void 0;
          void 0 !== f2 && Kg(b, c, f2);
        }
        e = e.next;
      } while (e !== d);
    }
  }
  function Og(a, b) {
    b = b.updateQueue;
    b = null !== b ? b.lastEffect : null;
    if (null !== b) {
      var c = b = b.next;
      do {
        if ((c.tag & a) === a) {
          var d = c.create;
          c.destroy = d();
        }
        c = c.next;
      } while (c !== b);
    }
  }
  function Pg(a) {
    var b = a.ref;
    if (null !== b) {
      var c = a.stateNode;
      switch (a.tag) {
        case 5:
          a = Ea(c);
          break;
        default:
          a = c;
      }
      "function" === typeof b ? b(a) : b.current = a;
    }
  }
  function Qg(a) {
    var b = a.alternate;
    null !== b && (a.alternate = null, Qg(b));
    a.child = null;
    a.deletions = null;
    a.sibling = null;
    5 === a.tag && (b = a.stateNode, null !== b && Za(b));
    a.stateNode = null;
    a.return = null;
    a.dependencies = null;
    a.memoizedProps = null;
    a.memoizedState = null;
    a.pendingProps = null;
    a.stateNode = null;
    a.updateQueue = null;
  }
  function Rg(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }
  function Sg(a) {
    a:
      for (; ; ) {
        for (; null === a.sibling; ) {
          if (null === a.return || Rg(a.return))
            return null;
          a = a.return;
        }
        a.sibling.return = a.return;
        for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
          if (a.flags & 2)
            continue a;
          if (null === a.child || 4 === a.tag)
            continue a;
          else
            a.child.return = a, a = a.child;
        }
        if (!(a.flags & 2))
          return a.stateNode;
      }
  }
  function Tg(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d)
      a = a.stateNode, b ? pb(c, a, b) : kb(c, a);
    else if (4 !== d && (a = a.child, null !== a))
      for (Tg(a, b, c), a = a.sibling; null !== a; )
        Tg(a, b, c), a = a.sibling;
  }
  function Ug(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d)
      a = a.stateNode, b ? ob(c, a, b) : jb(c, a);
    else if (4 !== d && (a = a.child, null !== a))
      for (Ug(a, b, c), a = a.sibling; null !== a; )
        Ug(a, b, c), a = a.sibling;
  }
  var V2 = null, Vg = false;
  function Wg(a, b, c) {
    for (c = c.child; null !== c; )
      Xg(a, b, c), c = c.sibling;
  }
  function Xg(a, b, c) {
    if (Sc && "function" === typeof Sc.onCommitFiberUnmount)
      try {
        Sc.onCommitFiberUnmount(Rc, c);
      } catch (h) {
      }
    switch (c.tag) {
      case 5:
        S2 || Jg(c, b);
      case 6:
        if (Ta) {
          var d = V2, e = Vg;
          V2 = null;
          Wg(a, b, c);
          V2 = d;
          Vg = e;
          null !== V2 && (Vg ? rb(V2, c.stateNode) : qb(V2, c.stateNode));
        } else
          Wg(a, b, c);
        break;
      case 18:
        Ta && null !== V2 && (Vg ? Yb(V2, c.stateNode) : Xb(V2, c.stateNode));
        break;
      case 4:
        Ta ? (d = V2, e = Vg, V2 = c.stateNode.containerInfo, Vg = true, Wg(a, b, c), V2 = d, Vg = e) : (Ua && (d = c.stateNode.containerInfo, e = zb(d), Cb(d, e)), Wg(a, b, c));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!S2 && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
          e = d = d.next;
          do {
            var f2 = e, g = f2.destroy;
            f2 = f2.tag;
            void 0 !== g && (0 !== (f2 & 2) ? Kg(c, b, g) : 0 !== (f2 & 4) && Kg(c, b, g));
            e = e.next;
          } while (e !== d);
        }
        Wg(a, b, c);
        break;
      case 1:
        if (!S2 && (Jg(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount))
          try {
            d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
          } catch (h) {
            U2(c, b, h);
          }
        Wg(a, b, c);
        break;
      case 21:
        Wg(a, b, c);
        break;
      case 22:
        c.mode & 1 ? (S2 = (d = S2) || null !== c.memoizedState, Wg(a, b, c), S2 = d) : Wg(a, b, c);
        break;
      default:
        Wg(
          a,
          b,
          c
        );
    }
  }
  function Yg(a) {
    var b = a.updateQueue;
    if (null !== b) {
      a.updateQueue = null;
      var c = a.stateNode;
      null === c && (c = a.stateNode = new Ig());
      b.forEach(function(b2) {
        var d = Zg.bind(null, a, b2);
        c.has(b2) || (c.add(b2), b2.then(d, d));
      });
    }
  }
  function $g(a, b) {
    var c = b.deletions;
    if (null !== c)
      for (var d = 0; d < c.length; d++) {
        var e = c[d];
        try {
          var f2 = a, g = b;
          if (Ta) {
            var h = g;
            a:
              for (; null !== h; ) {
                switch (h.tag) {
                  case 5:
                    V2 = h.stateNode;
                    Vg = false;
                    break a;
                  case 3:
                    V2 = h.stateNode.containerInfo;
                    Vg = true;
                    break a;
                  case 4:
                    V2 = h.stateNode.containerInfo;
                    Vg = true;
                    break a;
                }
                h = h.return;
              }
            if (null === V2)
              throw Error(m2(160));
            Xg(f2, g, e);
            V2 = null;
            Vg = false;
          } else
            Xg(f2, g, e);
          var k2 = e.alternate;
          null !== k2 && (k2.return = null);
          e.return = null;
        } catch (l2) {
          U2(e, b, l2);
        }
      }
    if (b.subtreeFlags & 12854)
      for (b = b.child; null !== b; )
        ah(b, a), b = b.sibling;
  }
  function ah(a, b) {
    var c = a.alternate, d = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        $g(b, a);
        bh(a);
        if (d & 4) {
          try {
            Ng(3, a, a.return), Og(3, a);
          } catch (p2) {
            U2(a, a.return, p2);
          }
          try {
            Ng(5, a, a.return);
          } catch (p2) {
            U2(a, a.return, p2);
          }
        }
        break;
      case 1:
        $g(b, a);
        bh(a);
        d & 512 && null !== c && Jg(c, c.return);
        break;
      case 5:
        $g(b, a);
        bh(a);
        d & 512 && null !== c && Jg(c, c.return);
        if (Ta) {
          if (a.flags & 32) {
            var e = a.stateNode;
            try {
              sb(e);
            } catch (p2) {
              U2(a, a.return, p2);
            }
          }
          if (d & 4 && (e = a.stateNode, null != e)) {
            var f2 = a.memoizedProps;
            c = null !== c ? c.memoizedProps : f2;
            d = a.type;
            b = a.updateQueue;
            a.updateQueue = null;
            if (null !== b)
              try {
                nb(e, b, d, c, f2, a);
              } catch (p2) {
                U2(a, a.return, p2);
              }
          }
        }
        break;
      case 6:
        $g(b, a);
        bh(a);
        if (d & 4 && Ta) {
          if (null === a.stateNode)
            throw Error(m2(162));
          e = a.stateNode;
          f2 = a.memoizedProps;
          c = null !== c ? c.memoizedProps : f2;
          try {
            lb(e, c, f2);
          } catch (p2) {
            U2(a, a.return, p2);
          }
        }
        break;
      case 3:
        $g(b, a);
        bh(a);
        if (d & 4) {
          if (Ta && Va && null !== c && c.memoizedState.isDehydrated)
            try {
              Vb(b.containerInfo);
            } catch (p2) {
              U2(a, a.return, p2);
            }
          if (Ua) {
            e = b.containerInfo;
            f2 = b.pendingChildren;
            try {
              Cb(e, f2);
            } catch (p2) {
              U2(a, a.return, p2);
            }
          }
        }
        break;
      case 4:
        $g(
          b,
          a
        );
        bh(a);
        if (d & 4 && Ua) {
          f2 = a.stateNode;
          e = f2.containerInfo;
          f2 = f2.pendingChildren;
          try {
            Cb(e, f2);
          } catch (p2) {
            U2(a, a.return, p2);
          }
        }
        break;
      case 13:
        $g(b, a);
        bh(a);
        e = a.child;
        e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (ch = D2()));
        d & 4 && Yg(a);
        break;
      case 22:
        var g = null !== c && null !== c.memoizedState;
        a.mode & 1 ? (S2 = (c = S2) || g, $g(b, a), S2 = c) : $g(b, a);
        bh(a);
        if (d & 8192) {
          c = null !== a.memoizedState;
          if ((a.stateNode.isHidden = c) && !g && 0 !== (a.mode & 1))
            for (T2 = a, d = a.child; null !== d; ) {
              for (b = T2 = d; null !== T2; ) {
                g = T2;
                var h = g.child;
                switch (g.tag) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    Ng(4, g, g.return);
                    break;
                  case 1:
                    Jg(g, g.return);
                    var k2 = g.stateNode;
                    if ("function" === typeof k2.componentWillUnmount) {
                      var l2 = g, n2 = g.return;
                      try {
                        var t2 = l2;
                        k2.props = t2.memoizedProps;
                        k2.state = t2.memoizedState;
                        k2.componentWillUnmount();
                      } catch (p2) {
                        U2(l2, n2, p2);
                      }
                    }
                    break;
                  case 5:
                    Jg(g, g.return);
                    break;
                  case 22:
                    if (null !== g.memoizedState) {
                      dh(b);
                      continue;
                    }
                }
                null !== h ? (h.return = g, T2 = h) : dh(b);
              }
              d = d.sibling;
            }
          if (Ta) {
            a:
              if (d = null, Ta)
                for (b = a; ; ) {
                  if (5 === b.tag) {
                    if (null === d) {
                      d = b;
                      try {
                        e = b.stateNode, c ? tb(e) : vb(b.stateNode, b.memoizedProps);
                      } catch (p2) {
                        U2(a, a.return, p2);
                      }
                    }
                  } else if (6 === b.tag) {
                    if (null === d)
                      try {
                        f2 = b.stateNode, c ? ub(f2) : wb(f2, b.memoizedProps);
                      } catch (p2) {
                        U2(a, a.return, p2);
                      }
                  } else if ((22 !== b.tag && 23 !== b.tag || null === b.memoizedState || b === a) && null !== b.child) {
                    b.child.return = b;
                    b = b.child;
                    continue;
                  }
                  if (b === a)
                    break a;
                  for (; null === b.sibling; ) {
                    if (null === b.return || b.return === a)
                      break a;
                    d === b && (d = null);
                    b = b.return;
                  }
                  d === b && (d = null);
                  b.sibling.return = b.return;
                  b = b.sibling;
                }
          }
        }
        break;
      case 19:
        $g(b, a);
        bh(a);
        d & 4 && Yg(a);
        break;
      case 21:
        break;
      default:
        $g(b, a), bh(a);
    }
  }
  function bh(a) {
    var b = a.flags;
    if (b & 2) {
      try {
        if (Ta) {
          b: {
            for (var c = a.return; null !== c; ) {
              if (Rg(c)) {
                var d = c;
                break b;
              }
              c = c.return;
            }
            throw Error(m2(160));
          }
          switch (d.tag) {
            case 5:
              var e = d.stateNode;
              d.flags & 32 && (sb(e), d.flags &= -33);
              var f2 = Sg(a);
              Ug(a, f2, e);
              break;
            case 3:
            case 4:
              var g = d.stateNode.containerInfo, h = Sg(a);
              Tg(a, h, g);
              break;
            default:
              throw Error(m2(161));
          }
        }
      } catch (k2) {
        U2(a, a.return, k2);
      }
      a.flags &= -3;
    }
    b & 4096 && (a.flags &= -4097);
  }
  function eh(a, b, c) {
    T2 = a;
    fh(a);
  }
  function fh(a, b, c) {
    for (var d = 0 !== (a.mode & 1); null !== T2; ) {
      var e = T2, f2 = e.child;
      if (22 === e.tag && d) {
        var g = null !== e.memoizedState || Hg;
        if (!g) {
          var h = e.alternate, k2 = null !== h && null !== h.memoizedState || S2;
          h = Hg;
          var l2 = S2;
          Hg = g;
          if ((S2 = k2) && !l2)
            for (T2 = e; null !== T2; )
              g = T2, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? gh(e) : null !== k2 ? (k2.return = g, T2 = k2) : gh(e);
          for (; null !== f2; )
            T2 = f2, fh(f2), f2 = f2.sibling;
          T2 = e;
          Hg = h;
          S2 = l2;
        }
        hh(a);
      } else
        0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, T2 = f2) : hh(a);
    }
  }
  function hh(a) {
    for (; null !== T2; ) {
      var b = T2;
      if (0 !== (b.flags & 8772)) {
        var c = b.alternate;
        try {
          if (0 !== (b.flags & 8772))
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                S2 || Og(5, b);
                break;
              case 1:
                var d = b.stateNode;
                if (b.flags & 4 && !S2)
                  if (null === c)
                    d.componentDidMount();
                  else {
                    var e = b.elementType === b.type ? c.memoizedProps : Fd(b.type, c.memoizedProps);
                    d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                  }
                var f2 = b.updateQueue;
                null !== f2 && ce(b, f2, d);
                break;
              case 3:
                var g = b.updateQueue;
                if (null !== g) {
                  c = null;
                  if (null !== b.child)
                    switch (b.child.tag) {
                      case 5:
                        c = Ea(b.child.stateNode);
                        break;
                      case 1:
                        c = b.child.stateNode;
                    }
                  ce(b, g, c);
                }
                break;
              case 5:
                var h = b.stateNode;
                null === c && b.flags & 4 && mb(h, b.type, b.memoizedProps, b);
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (Va && null === b.memoizedState) {
                  var k2 = b.alternate;
                  if (null !== k2) {
                    var l2 = k2.memoizedState;
                    if (null !== l2) {
                      var n2 = l2.dehydrated;
                      null !== n2 && Wb(n2);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(m2(163));
            }
          S2 || b.flags & 512 && Pg(b);
        } catch (t2) {
          U2(b, b.return, t2);
        }
      }
      if (b === a) {
        T2 = null;
        break;
      }
      c = b.sibling;
      if (null !== c) {
        c.return = b.return;
        T2 = c;
        break;
      }
      T2 = b.return;
    }
  }
  function dh(a) {
    for (; null !== T2; ) {
      var b = T2;
      if (b === a) {
        T2 = null;
        break;
      }
      var c = b.sibling;
      if (null !== c) {
        c.return = b.return;
        T2 = c;
        break;
      }
      T2 = b.return;
    }
  }
  function gh(a) {
    for (; null !== T2; ) {
      var b = T2;
      try {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
            var c = b.return;
            try {
              Og(4, b);
            } catch (k2) {
              U2(b, c, k2);
            }
            break;
          case 1:
            var d = b.stateNode;
            if ("function" === typeof d.componentDidMount) {
              var e = b.return;
              try {
                d.componentDidMount();
              } catch (k2) {
                U2(b, e, k2);
              }
            }
            var f2 = b.return;
            try {
              Pg(b);
            } catch (k2) {
              U2(b, f2, k2);
            }
            break;
          case 5:
            var g = b.return;
            try {
              Pg(b);
            } catch (k2) {
              U2(b, g, k2);
            }
        }
      } catch (k2) {
        U2(b, b.return, k2);
      }
      if (b === a) {
        T2 = null;
        break;
      }
      var h = b.sibling;
      if (null !== h) {
        h.return = b.return;
        T2 = h;
        break;
      }
      T2 = b.return;
    }
  }
  var ih = 0, jh = 1, kh = 2, lh = 3, mh = 4;
  if ("function" === typeof Symbol && Symbol.for) {
    var nh = Symbol.for;
    ih = nh("selector.component");
    jh = nh("selector.has_pseudo_class");
    kh = nh("selector.role");
    lh = nh("selector.test_id");
    mh = nh("selector.text");
  }
  function oh(a) {
    var b = Wa(a);
    if (null != b) {
      if ("string" !== typeof b.memoizedProps["data-testname"])
        throw Error(m2(364));
      return b;
    }
    a = cb(a);
    if (null === a)
      throw Error(m2(362));
    return a.stateNode.current;
  }
  function ph(a, b) {
    switch (b.$$typeof) {
      case ih:
        if (a.type === b.value)
          return true;
        break;
      case jh:
        a: {
          b = b.value;
          a = [a, 0];
          for (var c = 0; c < a.length; ) {
            var d = a[c++], e = a[c++], f2 = b[e];
            if (5 !== d.tag || !fb(d)) {
              for (; null != f2 && ph(d, f2); )
                e++, f2 = b[e];
              if (e === b.length) {
                b = true;
                break a;
              } else
                for (d = d.child; null !== d; )
                  a.push(d, e), d = d.sibling;
            }
          }
          b = false;
        }
        return b;
      case kh:
        if (5 === a.tag && gb(a.stateNode, b.value))
          return true;
        break;
      case mh:
        if (5 === a.tag || 6 === a.tag) {
          if (a = eb(a), null !== a && 0 <= a.indexOf(b.value))
            return true;
        }
        break;
      case lh:
        if (5 === a.tag && (a = a.memoizedProps["data-testname"], "string" === typeof a && a.toLowerCase() === b.value.toLowerCase()))
          return true;
        break;
      default:
        throw Error(m2(365));
    }
    return false;
  }
  function qh(a) {
    switch (a.$$typeof) {
      case ih:
        return "<" + (ua(a.value) || "Unknown") + ">";
      case jh:
        return ":has(" + (qh(a) || "") + ")";
      case kh:
        return '[role="' + a.value + '"]';
      case mh:
        return '"' + a.value + '"';
      case lh:
        return '[data-testname="' + a.value + '"]';
      default:
        throw Error(m2(365));
    }
  }
  function rh(a, b) {
    var c = [];
    a = [a, 0];
    for (var d = 0; d < a.length; ) {
      var e = a[d++], f2 = a[d++], g = b[f2];
      if (5 !== e.tag || !fb(e)) {
        for (; null != g && ph(e, g); )
          f2++, g = b[f2];
        if (f2 === b.length)
          c.push(e);
        else
          for (e = e.child; null !== e; )
            a.push(e, f2), e = e.sibling;
      }
    }
    return c;
  }
  function sh(a, b) {
    if (!bb)
      throw Error(m2(363));
    a = oh(a);
    a = rh(a, b);
    b = [];
    a = Array.from(a);
    for (var c = 0; c < a.length; ) {
      var d = a[c++];
      if (5 === d.tag)
        fb(d) || b.push(d.stateNode);
      else
        for (d = d.child; null !== d; )
          a.push(d), d = d.sibling;
    }
    return b;
  }
  var th = Math.ceil, uh = da.ReactCurrentDispatcher, vh = da.ReactCurrentOwner, W2 = da.ReactCurrentBatchConfig, H2 = 0, O2 = null, X2 = null, Y = 0, ag = 0, $f = ic(0), R2 = 0, wh = null, be = 0, xh = 0, yh = 0, zh = null, Ah = null, ch = 0, Eg = Infinity, Bh = null;
  function Ch() {
    Eg = D2() + 500;
  }
  var Kf = false, Lf = null, Nf = null, Dh = false, Eh = null, Fh = 0, Gh = 0, Hh = null, Ih = -1, Jh = 0;
  function I2() {
    return 0 !== (H2 & 6) ? D2() : -1 !== Ih ? Ih : Ih = D2();
  }
  function fe(a) {
    if (0 === (a.mode & 1))
      return 1;
    if (0 !== (H2 & 2) && 0 !== Y)
      return Y & -Y;
    if (null !== Cd.transition)
      return 0 === Jh && (Jh = Dc()), Jh;
    a = C2;
    return 0 !== a ? a : Ya();
  }
  function ge(a, b, c, d) {
    if (50 < Gh)
      throw Gh = 0, Hh = null, Error(m2(185));
    Fc(a, c, d);
    if (0 === (H2 & 2) || a !== O2)
      a === O2 && (0 === (H2 & 2) && (xh |= c), 4 === R2 && Kh(a, Y)), Lh(a, d), 1 === c && 0 === H2 && 0 === (b.mode & 1) && (Ch(), Xc && ad());
  }
  function Lh(a, b) {
    var c = a.callbackNode;
    Bc(a, b);
    var d = zc(a, a === O2 ? Y : 0);
    if (0 === d)
      null !== c && Kc(c), a.callbackNode = null, a.callbackPriority = 0;
    else if (b = d & -d, a.callbackPriority !== b) {
      null != c && Kc(c);
      if (1 === b)
        0 === a.tag ? $c(Mh.bind(null, a)) : Zc(Mh.bind(null, a)), $a ? ab(function() {
          0 === (H2 & 6) && ad();
        }) : Jc(Nc, ad), c = null;
      else {
        switch (Ic(d)) {
          case 1:
            c = Nc;
            break;
          case 4:
            c = Oc;
            break;
          case 16:
            c = Pc;
            break;
          case 536870912:
            c = Qc;
            break;
          default:
            c = Pc;
        }
        c = Nh(c, Oh.bind(null, a));
      }
      a.callbackPriority = b;
      a.callbackNode = c;
    }
  }
  function Oh(a, b) {
    Ih = -1;
    Jh = 0;
    if (0 !== (H2 & 6))
      throw Error(m2(327));
    var c = a.callbackNode;
    if (Ph() && a.callbackNode !== c)
      return null;
    var d = zc(a, a === O2 ? Y : 0);
    if (0 === d)
      return null;
    if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b)
      b = Qh(a, d);
    else {
      b = d;
      var e = H2;
      H2 |= 2;
      var f2 = Rh();
      if (O2 !== a || Y !== b)
        Bh = null, Ch(), Sh(a, b);
      do
        try {
          Th();
          break;
        } catch (h) {
          Uh(a, h);
        }
      while (1);
      Kd();
      uh.current = f2;
      H2 = e;
      null !== X2 ? b = 0 : (O2 = null, Y = 0, b = R2);
    }
    if (0 !== b) {
      2 === b && (e = Cc(a), 0 !== e && (d = e, b = Vh(a, e)));
      if (1 === b)
        throw c = wh, Sh(a, 0), Kh(a, d), Lh(a, D2()), c;
      if (6 === b)
        Kh(a, d);
      else {
        e = a.current.alternate;
        if (0 === (d & 30) && !Wh(e) && (b = Qh(a, d), 2 === b && (f2 = Cc(a), 0 !== f2 && (d = f2, b = Vh(a, f2))), 1 === b))
          throw c = wh, Sh(a, 0), Kh(a, d), Lh(a, D2()), c;
        a.finishedWork = e;
        a.finishedLanes = d;
        switch (b) {
          case 0:
          case 1:
            throw Error(m2(345));
          case 2:
            Xh(a, Ah, Bh);
            break;
          case 3:
            Kh(a, d);
            if ((d & 130023424) === d && (b = ch + 500 - D2(), 10 < b)) {
              if (0 !== zc(a, 0))
                break;
              e = a.suspendedLanes;
              if ((e & d) !== d) {
                I2();
                a.pingedLanes |= a.suspendedLanes & e;
                break;
              }
              a.timeoutHandle = Pa(Xh.bind(null, a, Ah, Bh), b);
              break;
            }
            Xh(a, Ah, Bh);
            break;
          case 4:
            Kh(a, d);
            if ((d & 4194240) === d)
              break;
            b = a.eventTimes;
            for (e = -1; 0 < d; ) {
              var g = 31 - tc(d);
              f2 = 1 << g;
              g = b[g];
              g > e && (e = g);
              d &= ~f2;
            }
            d = e;
            d = D2() - d;
            d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * th(d / 1960)) - d;
            if (10 < d) {
              a.timeoutHandle = Pa(Xh.bind(null, a, Ah, Bh), d);
              break;
            }
            Xh(a, Ah, Bh);
            break;
          case 5:
            Xh(a, Ah, Bh);
            break;
          default:
            throw Error(m2(329));
        }
      }
    }
    Lh(a, D2());
    return a.callbackNode === c ? Oh.bind(null, a) : null;
  }
  function Vh(a, b) {
    var c = zh;
    a.current.memoizedState.isDehydrated && (Sh(a, b).flags |= 256);
    a = Qh(a, b);
    2 !== a && (b = Ah, Ah = c, null !== b && Dg(b));
    return a;
  }
  function Dg(a) {
    null === Ah ? Ah = a : Ah.push.apply(Ah, a);
  }
  function Wh(a) {
    for (var b = a; ; ) {
      if (b.flags & 16384) {
        var c = b.updateQueue;
        if (null !== c && (c = c.stores, null !== c))
          for (var d = 0; d < c.length; d++) {
            var e = c[d], f2 = e.getSnapshot;
            e = e.value;
            try {
              if (!Vc(f2(), e))
                return false;
            } catch (g) {
              return false;
            }
          }
      }
      c = b.child;
      if (b.subtreeFlags & 16384 && null !== c)
        c.return = b, b = c;
      else {
        if (b === a)
          break;
        for (; null === b.sibling; ) {
          if (null === b.return || b.return === a)
            return true;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
    }
    return true;
  }
  function Kh(a, b) {
    b &= ~yh;
    b &= ~xh;
    a.suspendedLanes |= b;
    a.pingedLanes &= ~b;
    for (a = a.expirationTimes; 0 < b; ) {
      var c = 31 - tc(b), d = 1 << c;
      a[c] = -1;
      b &= ~d;
    }
  }
  function Mh(a) {
    if (0 !== (H2 & 6))
      throw Error(m2(327));
    Ph();
    var b = zc(a, 0);
    if (0 === (b & 1))
      return Lh(a, D2()), null;
    var c = Qh(a, b);
    if (0 !== a.tag && 2 === c) {
      var d = Cc(a);
      0 !== d && (b = d, c = Vh(a, d));
    }
    if (1 === c)
      throw c = wh, Sh(a, 0), Kh(a, b), Lh(a, D2()), c;
    if (6 === c)
      throw Error(m2(345));
    a.finishedWork = a.current.alternate;
    a.finishedLanes = b;
    Xh(a, Ah, Bh);
    Lh(a, D2());
    return null;
  }
  function Yh(a) {
    null !== Eh && 0 === Eh.tag && 0 === (H2 & 6) && Ph();
    var b = H2;
    H2 |= 1;
    var c = W2.transition, d = C2;
    try {
      if (W2.transition = null, C2 = 1, a)
        return a();
    } finally {
      C2 = d, W2.transition = c, H2 = b, 0 === (H2 & 6) && ad();
    }
  }
  function Fg() {
    ag = $f.current;
    q2($f);
  }
  function Sh(a, b) {
    a.finishedWork = null;
    a.finishedLanes = 0;
    var c = a.timeoutHandle;
    c !== Ra && (a.timeoutHandle = Ra, Qa(c));
    if (null !== X2)
      for (c = X2.return; null !== c; ) {
        var d = c;
        nd(d);
        switch (d.tag) {
          case 1:
            d = d.type.childContextTypes;
            null !== d && void 0 !== d && mc();
            break;
          case 3:
            De();
            q2(z2);
            q2(x2);
            Ie();
            break;
          case 5:
            Fe(d);
            break;
          case 4:
            De();
            break;
          case 13:
            q2(J2);
            break;
          case 19:
            q2(J2);
            break;
          case 10:
            Md(d.type._context);
            break;
          case 22:
          case 23:
            Fg();
        }
        c = c.return;
      }
    O2 = a;
    X2 = a = qe(a.current, null);
    Y = ag = b;
    R2 = 0;
    wh = null;
    yh = xh = be = 0;
    Ah = zh = null;
    if (null !== Qd) {
      for (b = 0; b < Qd.length; b++)
        if (c = Qd[b], d = c.interleaved, null !== d) {
          c.interleaved = null;
          var e = d.next, f2 = c.pending;
          if (null !== f2) {
            var g = f2.next;
            f2.next = e;
            d.next = g;
          }
          c.pending = d;
        }
      Qd = null;
    }
    return a;
  }
  function Uh(a, b) {
    do {
      var c = X2;
      try {
        Kd();
        Je.current = Ve;
        if (Me) {
          for (var d = K2.memoizedState; null !== d; ) {
            var e = d.queue;
            null !== e && (e.pending = null);
            d = d.next;
          }
          Me = false;
        }
        Le = 0;
        M2 = L2 = K2 = null;
        Ne = false;
        Oe = 0;
        vh.current = null;
        if (null === c || null === c.return) {
          R2 = 1;
          wh = b;
          X2 = null;
          break;
        }
        a: {
          var f2 = a, g = c.return, h = c, k2 = b;
          b = Y;
          h.flags |= 32768;
          if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
            var l2 = k2, n2 = h, t2 = n2.tag;
            if (0 === (n2.mode & 1) && (0 === t2 || 11 === t2 || 15 === t2)) {
              var p2 = n2.alternate;
              p2 ? (n2.updateQueue = p2.updateQueue, n2.memoizedState = p2.memoizedState, n2.lanes = p2.lanes) : (n2.updateQueue = null, n2.memoizedState = null);
            }
            var B2 = Qf(g);
            if (null !== B2) {
              B2.flags &= -257;
              Rf(B2, g, h, f2, b);
              B2.mode & 1 && Of(f2, l2, b);
              b = B2;
              k2 = l2;
              var w2 = b.updateQueue;
              if (null === w2) {
                var Z = /* @__PURE__ */ new Set();
                Z.add(k2);
                b.updateQueue = Z;
              } else
                w2.add(k2);
              break a;
            } else {
              if (0 === (b & 1)) {
                Of(f2, l2, b);
                og();
                break a;
              }
              k2 = Error(m2(426));
            }
          } else if (F2 && h.mode & 1) {
            var za = Qf(g);
            if (null !== za) {
              0 === (za.flags & 65536) && (za.flags |= 256);
              Rf(za, g, h, f2, b);
              Bd(Ff(k2, h));
              break a;
            }
          }
          f2 = k2 = Ff(k2, h);
          4 !== R2 && (R2 = 2);
          null === zh ? zh = [f2] : zh.push(f2);
          f2 = g;
          do {
            switch (f2.tag) {
              case 3:
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var E2 = Jf(f2, k2, b);
                $d(f2, E2);
                break a;
              case 1:
                h = k2;
                var r2 = f2.type, u2 = f2.stateNode;
                if (0 === (f2.flags & 128) && ("function" === typeof r2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Nf || !Nf.has(u2)))) {
                  f2.flags |= 65536;
                  b &= -b;
                  f2.lanes |= b;
                  var Db = Mf(f2, h, b);
                  $d(f2, Db);
                  break a;
                }
            }
            f2 = f2.return;
          } while (null !== f2);
        }
        Zh(c);
      } catch (qc) {
        b = qc;
        X2 === c && null !== c && (X2 = c = c.return);
        continue;
      }
      break;
    } while (1);
  }
  function Rh() {
    var a = uh.current;
    uh.current = Ve;
    return null === a ? Ve : a;
  }
  function og() {
    if (0 === R2 || 3 === R2 || 2 === R2)
      R2 = 4;
    null === O2 || 0 === (be & 268435455) && 0 === (xh & 268435455) || Kh(O2, Y);
  }
  function Qh(a, b) {
    var c = H2;
    H2 |= 2;
    var d = Rh();
    if (O2 !== a || Y !== b)
      Bh = null, Sh(a, b);
    do
      try {
        $h();
        break;
      } catch (e) {
        Uh(a, e);
      }
    while (1);
    Kd();
    H2 = c;
    uh.current = d;
    if (null !== X2)
      throw Error(m2(261));
    O2 = null;
    Y = 0;
    return R2;
  }
  function $h() {
    for (; null !== X2; )
      ai(X2);
  }
  function Th() {
    for (; null !== X2 && !Lc(); )
      ai(X2);
  }
  function ai(a) {
    var b = bi(a.alternate, a, ag);
    a.memoizedProps = a.pendingProps;
    null === b ? Zh(a) : X2 = b;
    vh.current = null;
  }
  function Zh(a) {
    var b = a;
    do {
      var c = b.alternate;
      a = b.return;
      if (0 === (b.flags & 32768)) {
        if (c = Cg(c, b, ag), null !== c) {
          X2 = c;
          return;
        }
      } else {
        c = Gg(c, b);
        if (null !== c) {
          c.flags &= 32767;
          X2 = c;
          return;
        }
        if (null !== a)
          a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
        else {
          R2 = 6;
          X2 = null;
          return;
        }
      }
      b = b.sibling;
      if (null !== b) {
        X2 = b;
        return;
      }
      X2 = b = a;
    } while (null !== b);
    0 === R2 && (R2 = 5);
  }
  function Xh(a, b, c) {
    var d = C2, e = W2.transition;
    try {
      W2.transition = null, C2 = 1, ci(a, b, c, d);
    } finally {
      W2.transition = e, C2 = d;
    }
    return null;
  }
  function ci(a, b, c, d) {
    do
      Ph();
    while (null !== Eh);
    if (0 !== (H2 & 6))
      throw Error(m2(327));
    c = a.finishedWork;
    var e = a.finishedLanes;
    if (null === c)
      return null;
    a.finishedWork = null;
    a.finishedLanes = 0;
    if (c === a.current)
      throw Error(m2(177));
    a.callbackNode = null;
    a.callbackPriority = 0;
    var f2 = c.lanes | c.childLanes;
    Gc(a, f2);
    a === O2 && (X2 = O2 = null, Y = 0);
    0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || Dh || (Dh = true, Nh(Pc, function() {
      Ph();
      return null;
    }));
    f2 = 0 !== (c.flags & 15990);
    if (0 !== (c.subtreeFlags & 15990) || f2) {
      f2 = W2.transition;
      W2.transition = null;
      var g = C2;
      C2 = 1;
      var h = H2;
      H2 |= 4;
      vh.current = null;
      Mg(a, c);
      ah(c, a);
      Ia(a.containerInfo);
      a.current = c;
      eh(c);
      Mc();
      H2 = h;
      C2 = g;
      W2.transition = f2;
    } else
      a.current = c;
    Dh && (Dh = false, Eh = a, Fh = e);
    f2 = a.pendingLanes;
    0 === f2 && (Nf = null);
    Tc(c.stateNode);
    Lh(a, D2());
    if (null !== b)
      for (d = a.onRecoverableError, c = 0; c < b.length; c++)
        e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
    if (Kf)
      throw Kf = false, a = Lf, Lf = null, a;
    0 !== (Fh & 1) && 0 !== a.tag && Ph();
    f2 = a.pendingLanes;
    0 !== (f2 & 1) ? a === Hh ? Gh++ : (Gh = 0, Hh = a) : Gh = 0;
    ad();
    return null;
  }
  function Ph() {
    if (null !== Eh) {
      var a = Ic(Fh), b = W2.transition, c = C2;
      try {
        W2.transition = null;
        C2 = 16 > a ? 16 : a;
        if (null === Eh)
          var d = false;
        else {
          a = Eh;
          Eh = null;
          Fh = 0;
          if (0 !== (H2 & 6))
            throw Error(m2(331));
          var e = H2;
          H2 |= 4;
          for (T2 = a.current; null !== T2; ) {
            var f2 = T2, g = f2.child;
            if (0 !== (T2.flags & 16)) {
              var h = f2.deletions;
              if (null !== h) {
                for (var k2 = 0; k2 < h.length; k2++) {
                  var l2 = h[k2];
                  for (T2 = l2; null !== T2; ) {
                    var n2 = T2;
                    switch (n2.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ng(8, n2, f2);
                    }
                    var t2 = n2.child;
                    if (null !== t2)
                      t2.return = n2, T2 = t2;
                    else
                      for (; null !== T2; ) {
                        n2 = T2;
                        var p2 = n2.sibling, B2 = n2.return;
                        Qg(n2);
                        if (n2 === l2) {
                          T2 = null;
                          break;
                        }
                        if (null !== p2) {
                          p2.return = B2;
                          T2 = p2;
                          break;
                        }
                        T2 = B2;
                      }
                  }
                }
                var w2 = f2.alternate;
                if (null !== w2) {
                  var Z = w2.child;
                  if (null !== Z) {
                    w2.child = null;
                    do {
                      var za = Z.sibling;
                      Z.sibling = null;
                      Z = za;
                    } while (null !== Z);
                  }
                }
                T2 = f2;
              }
            }
            if (0 !== (f2.subtreeFlags & 2064) && null !== g)
              g.return = f2, T2 = g;
            else
              b:
                for (; null !== T2; ) {
                  f2 = T2;
                  if (0 !== (f2.flags & 2048))
                    switch (f2.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ng(9, f2, f2.return);
                    }
                  var E2 = f2.sibling;
                  if (null !== E2) {
                    E2.return = f2.return;
                    T2 = E2;
                    break b;
                  }
                  T2 = f2.return;
                }
          }
          var r2 = a.current;
          for (T2 = r2; null !== T2; ) {
            g = T2;
            var u2 = g.child;
            if (0 !== (g.subtreeFlags & 2064) && null !== u2)
              u2.return = g, T2 = u2;
            else
              b:
                for (g = r2; null !== T2; ) {
                  h = T2;
                  if (0 !== (h.flags & 2048))
                    try {
                      switch (h.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Og(9, h);
                      }
                    } catch (qc) {
                      U2(h, h.return, qc);
                    }
                  if (h === g) {
                    T2 = null;
                    break b;
                  }
                  var Db = h.sibling;
                  if (null !== Db) {
                    Db.return = h.return;
                    T2 = Db;
                    break b;
                  }
                  T2 = h.return;
                }
          }
          H2 = e;
          ad();
          if (Sc && "function" === typeof Sc.onPostCommitFiberRoot)
            try {
              Sc.onPostCommitFiberRoot(Rc, a);
            } catch (qc) {
            }
          d = true;
        }
        return d;
      } finally {
        C2 = c, W2.transition = b;
      }
    }
    return false;
  }
  function di(a, b, c) {
    b = Ff(c, b);
    b = Jf(a, b, 1);
    a = Yd(a, b, 1);
    b = I2();
    null !== a && (Fc(a, 1, b), Lh(a, b));
  }
  function U2(a, b, c) {
    if (3 === a.tag)
      di(a, a, c);
    else
      for (; null !== b; ) {
        if (3 === b.tag) {
          di(b, a, c);
          break;
        } else if (1 === b.tag) {
          var d = b.stateNode;
          if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Nf || !Nf.has(d))) {
            a = Ff(c, a);
            a = Mf(b, a, 1);
            b = Yd(b, a, 1);
            a = I2();
            null !== b && (Fc(b, 1, a), Lh(b, a));
            break;
          }
        }
        b = b.return;
      }
  }
  function Pf(a, b, c) {
    var d = a.pingCache;
    null !== d && d.delete(b);
    b = I2();
    a.pingedLanes |= a.suspendedLanes & c;
    O2 === a && (Y & c) === c && (4 === R2 || 3 === R2 && (Y & 130023424) === Y && 500 > D2() - ch ? Sh(a, 0) : yh |= c);
    Lh(a, b);
  }
  function ei(a, b) {
    0 === b && (0 === (a.mode & 1) ? b = 1 : (b = xc, xc <<= 1, 0 === (xc & 130023424) && (xc = 4194304)));
    var c = I2();
    a = Td(a, b);
    null !== a && (Fc(a, b, c), Lh(a, c));
  }
  function pg(a) {
    var b = a.memoizedState, c = 0;
    null !== b && (c = b.retryLane);
    ei(a, c);
  }
  function Zg(a, b) {
    var c = 0;
    switch (a.tag) {
      case 13:
        var d = a.stateNode;
        var e = a.memoizedState;
        null !== e && (c = e.retryLane);
        break;
      case 19:
        d = a.stateNode;
        break;
      default:
        throw Error(m2(314));
    }
    null !== d && d.delete(b);
    ei(a, c);
  }
  var bi;
  bi = function(a, b, c) {
    if (null !== a)
      if (a.memoizedProps !== b.pendingProps || z2.current)
        G2 = true;
      else {
        if (0 === (a.lanes & c) && 0 === (b.flags & 128))
          return G2 = false, tg(a, b, c);
        G2 = 0 !== (a.flags & 131072) ? true : false;
      }
    else
      G2 = false, F2 && 0 !== (b.flags & 1048576) && ld(b, ed, b.index);
    b.lanes = 0;
    switch (b.tag) {
      case 2:
        var d = b.type;
        dg(a, b);
        a = b.pendingProps;
        var e = lc(b, x2.current);
        Od(b, c);
        e = Re(null, b, d, a, e, c);
        var f2 = We();
        b.flags |= 1;
        "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, A2(d) ? (f2 = true, pc(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, Vd(b), e.updater = he, b.stateNode = e, e._reactInternals = b, le(b, d, a, c), b = eg(null, b, d, true, f2, c)) : (b.tag = 0, F2 && f2 && md(b), P2(null, b, e, c), b = b.child);
        return b;
      case 16:
        d = b.elementType;
        a: {
          dg(a, b);
          a = b.pendingProps;
          e = d._init;
          d = e(d._payload);
          b.type = d;
          e = b.tag = fi(d);
          a = Fd(d, a);
          switch (e) {
            case 0:
              b = Yf(null, b, d, a, c);
              break a;
            case 1:
              b = cg(null, b, d, a, c);
              break a;
            case 11:
              b = Tf(null, b, d, a, c);
              break a;
            case 14:
              b = Vf(null, b, d, Fd(d.type, a), c);
              break a;
          }
          throw Error(m2(
            306,
            d,
            ""
          ));
        }
        return b;
      case 0:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Fd(d, e), Yf(a, b, d, e, c);
      case 1:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Fd(d, e), cg(a, b, d, e, c);
      case 3:
        a: {
          fg(b);
          if (null === a)
            throw Error(m2(387));
          d = b.pendingProps;
          f2 = b.memoizedState;
          e = f2.element;
          Wd(a, b);
          ae(b, d, null, c);
          var g = b.memoizedState;
          d = g.element;
          if (Va && f2.isDehydrated)
            if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
              e = Ff(Error(m2(423)), b);
              b = gg(a, b, d, c, e);
              break a;
            } else if (d !== e) {
              e = Ff(Error(m2(424)), b);
              b = gg(a, b, d, c, e);
              break a;
            } else
              for (Va && (pd = Pb(b.stateNode.containerInfo), od = b, F2 = true, rd = null, qd = false), c = we(b, null, d, c), b.child = c; c; )
                c.flags = c.flags & -3 | 4096, c = c.sibling;
          else {
            Ad2();
            if (d === e) {
              b = Uf(a, b, c);
              break a;
            }
            P2(a, b, d, c);
          }
          b = b.child;
        }
        return b;
      case 5:
        return Ee(b), null === a && wd(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e.children, Na(d, e) ? g = null : null !== f2 && Na(d, f2) && (b.flags |= 32), bg(a, b), P2(a, b, g, c), b.child;
      case 6:
        return null === a && wd(b), null;
      case 13:
        return jg(a, b, c);
      case 4:
        return Ce(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = ve(b, null, d, c) : P2(a, b, d, c), b.child;
      case 11:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Fd(d, e), Tf(a, b, d, e, c);
      case 7:
        return P2(a, b, b.pendingProps, c), b.child;
      case 8:
        return P2(a, b, b.pendingProps.children, c), b.child;
      case 12:
        return P2(a, b, b.pendingProps.children, c), b.child;
      case 10:
        a: {
          d = b.type._context;
          e = b.pendingProps;
          f2 = b.memoizedProps;
          g = e.value;
          Ld(b, d, g);
          if (null !== f2)
            if (Vc(f2.value, g)) {
              if (f2.children === e.children && !z2.current) {
                b = Uf(a, b, c);
                break a;
              }
            } else
              for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
                var h = f2.dependencies;
                if (null !== h) {
                  g = f2.child;
                  for (var k2 = h.firstContext; null !== k2; ) {
                    if (k2.context === d) {
                      if (1 === f2.tag) {
                        k2 = Xd(-1, c & -c);
                        k2.tag = 2;
                        var l2 = f2.updateQueue;
                        if (null !== l2) {
                          l2 = l2.shared;
                          var n2 = l2.pending;
                          null === n2 ? k2.next = k2 : (k2.next = n2.next, n2.next = k2);
                          l2.pending = k2;
                        }
                      }
                      f2.lanes |= c;
                      k2 = f2.alternate;
                      null !== k2 && (k2.lanes |= c);
                      Nd(f2.return, c, b);
                      h.lanes |= c;
                      break;
                    }
                    k2 = k2.next;
                  }
                } else if (10 === f2.tag)
                  g = f2.type === b.type ? null : f2.child;
                else if (18 === f2.tag) {
                  g = f2.return;
                  if (null === g)
                    throw Error(m2(341));
                  g.lanes |= c;
                  h = g.alternate;
                  null !== h && (h.lanes |= c);
                  Nd(g, c, b);
                  g = f2.sibling;
                } else
                  g = f2.child;
                if (null !== g)
                  g.return = f2;
                else
                  for (g = f2; null !== g; ) {
                    if (g === b) {
                      g = null;
                      break;
                    }
                    f2 = g.sibling;
                    if (null !== f2) {
                      f2.return = g.return;
                      g = f2;
                      break;
                    }
                    g = g.return;
                  }
                f2 = g;
              }
          P2(a, b, e.children, c);
          b = b.child;
        }
        return b;
      case 9:
        return e = b.type, d = b.pendingProps.children, Od(b, c), e = Pd(e), d = d(e), b.flags |= 1, P2(a, b, d, c), b.child;
      case 14:
        return d = b.type, e = Fd(d, b.pendingProps), e = Fd(d.type, e), Vf(a, b, d, e, c);
      case 15:
        return Xf(a, b, b.type, b.pendingProps, c);
      case 17:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Fd(d, e), dg(a, b), b.tag = 1, A2(d) ? (a = true, pc(b)) : a = false, Od(b, c), je(b, d, e), le(b, d, e, c), eg(null, b, d, true, a, c);
      case 19:
        return sg(a, b, c);
      case 22:
        return Zf(a, b, c);
    }
    throw Error(m2(156, b.tag));
  };
  function Nh(a, b) {
    return Jc(a, b);
  }
  function gi(a, b, c, d) {
    this.tag = a;
    this.key = c;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function td(a, b, c, d) {
    return new gi(a, b, c, d);
  }
  function Wf(a) {
    a = a.prototype;
    return !(!a || !a.isReactComponent);
  }
  function fi(a) {
    if ("function" === typeof a)
      return Wf(a) ? 1 : 0;
    if (void 0 !== a && null !== a) {
      a = a.$$typeof;
      if (a === ma)
        return 11;
      if (a === pa)
        return 14;
    }
    return 2;
  }
  function qe(a, b) {
    var c = a.alternate;
    null === c ? (c = td(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
    c.flags = a.flags & 14680064;
    c.childLanes = a.childLanes;
    c.lanes = a.lanes;
    c.child = a.child;
    c.memoizedProps = a.memoizedProps;
    c.memoizedState = a.memoizedState;
    c.updateQueue = a.updateQueue;
    b = a.dependencies;
    c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
    c.sibling = a.sibling;
    c.index = a.index;
    c.ref = a.ref;
    return c;
  }
  function se(a, b, c, d, e, f2) {
    var g = 2;
    d = a;
    if ("function" === typeof a)
      Wf(a) && (g = 1);
    else if ("string" === typeof a)
      g = 5;
    else
      a:
        switch (a) {
          case ha:
            return ue(c.children, e, f2, b);
          case ia:
            g = 8;
            e |= 8;
            break;
          case ja:
            return a = td(12, c, b, e | 2), a.elementType = ja, a.lanes = f2, a;
          case na:
            return a = td(13, c, b, e), a.elementType = na, a.lanes = f2, a;
          case oa:
            return a = td(19, c, b, e), a.elementType = oa, a.lanes = f2, a;
          case ra:
            return kg(c, e, f2, b);
          default:
            if ("object" === typeof a && null !== a)
              switch (a.$$typeof) {
                case ka:
                  g = 10;
                  break a;
                case la:
                  g = 9;
                  break a;
                case ma:
                  g = 11;
                  break a;
                case pa:
                  g = 14;
                  break a;
                case qa:
                  g = 16;
                  d = null;
                  break a;
              }
            throw Error(m2(130, null == a ? a : typeof a, ""));
        }
    b = td(g, c, b, e);
    b.elementType = a;
    b.type = d;
    b.lanes = f2;
    return b;
  }
  function ue(a, b, c, d) {
    a = td(7, a, d, b);
    a.lanes = c;
    return a;
  }
  function kg(a, b, c, d) {
    a = td(22, a, d, b);
    a.elementType = ra;
    a.lanes = c;
    a.stateNode = { isHidden: false };
    return a;
  }
  function re(a, b, c) {
    a = td(6, a, null, b);
    a.lanes = c;
    return a;
  }
  function te(a, b, c) {
    b = td(4, null !== a.children ? a.children : [], a.key, b);
    b.lanes = c;
    b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
    return b;
  }
  function hi(a, b, c, d, e) {
    this.tag = b;
    this.containerInfo = a;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = Ra;
    this.callbackNode = this.pendingContext = this.context = null;
    this.callbackPriority = 0;
    this.eventTimes = Ec(0);
    this.expirationTimes = Ec(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = Ec(0);
    this.identifierPrefix = d;
    this.onRecoverableError = e;
    Va && (this.mutableSourceEagerHydrationData = null);
  }
  function ii(a, b, c, d, e, f2, g, h, k2) {
    a = new hi(a, b, c, h, k2);
    1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
    f2 = td(3, null, null, b);
    a.current = f2;
    f2.stateNode = a;
    f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
    Vd(f2);
    return a;
  }
  function ji(a) {
    if (!a)
      return jc;
    a = a._reactInternals;
    a: {
      if (wa(a) !== a || 1 !== a.tag)
        throw Error(m2(170));
      var b = a;
      do {
        switch (b.tag) {
          case 3:
            b = b.stateNode.context;
            break a;
          case 1:
            if (A2(b.type)) {
              b = b.stateNode.__reactInternalMemoizedMergedChildContext;
              break a;
            }
        }
        b = b.return;
      } while (null !== b);
      throw Error(m2(171));
    }
    if (1 === a.tag) {
      var c = a.type;
      if (A2(c))
        return oc(a, c, b);
    }
    return b;
  }
  function ki(a) {
    var b = a._reactInternals;
    if (void 0 === b) {
      if ("function" === typeof a.render)
        throw Error(m2(188));
      a = Object.keys(a).join(",");
      throw Error(m2(268, a));
    }
    a = Aa(b);
    return null === a ? null : a.stateNode;
  }
  function li(a, b) {
    a = a.memoizedState;
    if (null !== a && null !== a.dehydrated) {
      var c = a.retryLane;
      a.retryLane = 0 !== c && c < b ? c : b;
    }
  }
  function mi(a, b) {
    li(a, b);
    (a = a.alternate) && li(a, b);
  }
  function ni(a) {
    a = Aa(a);
    return null === a ? null : a.stateNode;
  }
  function oi() {
    return null;
  }
  exports2.attemptContinuousHydration = function(a) {
    if (13 === a.tag) {
      var b = Td(a, 134217728);
      if (null !== b) {
        var c = I2();
        ge(b, a, 134217728, c);
      }
      mi(a, 134217728);
    }
  };
  exports2.attemptDiscreteHydration = function(a) {
    if (13 === a.tag) {
      var b = Td(a, 1);
      if (null !== b) {
        var c = I2();
        ge(b, a, 1, c);
      }
      mi(a, 1);
    }
  };
  exports2.attemptHydrationAtCurrentPriority = function(a) {
    if (13 === a.tag) {
      var b = fe(a), c = Td(a, b);
      if (null !== c) {
        var d = I2();
        ge(c, a, b, d);
      }
      mi(a, b);
    }
  };
  exports2.attemptSynchronousHydration = function(a) {
    switch (a.tag) {
      case 3:
        var b = a.stateNode;
        if (b.current.memoizedState.isDehydrated) {
          var c = yc(b.pendingLanes);
          0 !== c && (Hc(b, c | 1), Lh(b, D2()), 0 === (H2 & 6) && (Ch(), ad()));
        }
        break;
      case 13:
        Yh(function() {
          var b2 = Td(a, 1);
          if (null !== b2) {
            var c2 = I2();
            ge(b2, a, 1, c2);
          }
        }), mi(a, 1);
    }
  };
  exports2.batchedUpdates = function(a, b) {
    var c = H2;
    H2 |= 1;
    try {
      return a(b);
    } finally {
      H2 = c, 0 === H2 && (Ch(), Xc && ad());
    }
  };
  exports2.createComponentSelector = function(a) {
    return { $$typeof: ih, value: a };
  };
  exports2.createContainer = function(a, b, c, d, e, f2, g) {
    return ii(a, b, false, null, c, d, e, f2, g);
  };
  exports2.createHasPseudoClassSelector = function(a) {
    return { $$typeof: jh, value: a };
  };
  exports2.createHydrationContainer = function(a, b, c, d, e, f2, g, h, k2) {
    a = ii(c, d, true, a, e, f2, g, h, k2);
    a.context = ji(null);
    c = a.current;
    d = I2();
    e = fe(c);
    f2 = Xd(d, e);
    f2.callback = void 0 !== b && null !== b ? b : null;
    Yd(c, f2, e);
    a.current.lanes = e;
    Fc(a, e, d);
    Lh(a, d);
    return a;
  };
  exports2.createPortal = function(a, b, c) {
    var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return { $$typeof: fa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
  };
  exports2.createRoleSelector = function(a) {
    return { $$typeof: kh, value: a };
  };
  exports2.createTestNameSelector = function(a) {
    return { $$typeof: lh, value: a };
  };
  exports2.createTextSelector = function(a) {
    return { $$typeof: mh, value: a };
  };
  exports2.deferredUpdates = function(a) {
    var b = C2, c = W2.transition;
    try {
      return W2.transition = null, C2 = 16, a();
    } finally {
      C2 = b, W2.transition = c;
    }
  };
  exports2.discreteUpdates = function(a, b, c, d, e) {
    var f2 = C2, g = W2.transition;
    try {
      return W2.transition = null, C2 = 1, a(b, c, d, e);
    } finally {
      C2 = f2, W2.transition = g, 0 === H2 && Ch();
    }
  };
  exports2.findAllNodes = sh;
  exports2.findBoundingRects = function(a, b) {
    if (!bb)
      throw Error(m2(363));
    b = sh(a, b);
    a = [];
    for (var c = 0; c < b.length; c++)
      a.push(db(b[c]));
    for (b = a.length - 1; 0 < b; b--) {
      c = a[b];
      for (var d = c.x, e = d + c.width, f2 = c.y, g = f2 + c.height, h = b - 1; 0 <= h; h--)
        if (b !== h) {
          var k2 = a[h], l2 = k2.x, n2 = l2 + k2.width, t2 = k2.y, p2 = t2 + k2.height;
          if (d >= l2 && f2 >= t2 && e <= n2 && g <= p2) {
            a.splice(b, 1);
            break;
          } else if (!(d !== l2 || c.width !== k2.width || p2 < f2 || t2 > g)) {
            t2 > f2 && (k2.height += t2 - f2, k2.y = f2);
            p2 < g && (k2.height = g - t2);
            a.splice(b, 1);
            break;
          } else if (!(f2 !== t2 || c.height !== k2.height || n2 < d || l2 > e)) {
            l2 > d && (k2.width += l2 - d, k2.x = d);
            n2 < e && (k2.width = e - l2);
            a.splice(b, 1);
            break;
          }
        }
    }
    return a;
  };
  exports2.findHostInstance = ki;
  exports2.findHostInstanceWithNoPortals = function(a) {
    a = ya(a);
    a = null !== a ? Ca(a) : null;
    return null === a ? null : a.stateNode;
  };
  exports2.findHostInstanceWithWarning = function(a) {
    return ki(a);
  };
  exports2.flushControlled = function(a) {
    var b = H2;
    H2 |= 1;
    var c = W2.transition, d = C2;
    try {
      W2.transition = null, C2 = 1, a();
    } finally {
      C2 = d, W2.transition = c, H2 = b, 0 === H2 && (Ch(), ad());
    }
  };
  exports2.flushPassiveEffects = Ph;
  exports2.flushSync = Yh;
  exports2.focusWithin = function(a, b) {
    if (!bb)
      throw Error(m2(363));
    a = oh(a);
    b = rh(a, b);
    b = Array.from(b);
    for (a = 0; a < b.length; ) {
      var c = b[a++];
      if (!fb(c)) {
        if (5 === c.tag && hb(c.stateNode))
          return true;
        for (c = c.child; null !== c; )
          b.push(c), c = c.sibling;
      }
    }
    return false;
  };
  exports2.getCurrentUpdatePriority = function() {
    return C2;
  };
  exports2.getFindAllNodesFailureDescription = function(a, b) {
    if (!bb)
      throw Error(m2(363));
    var c = 0, d = [];
    a = [oh(a), 0];
    for (var e = 0; e < a.length; ) {
      var f2 = a[e++], g = a[e++], h = b[g];
      if (5 !== f2.tag || !fb(f2)) {
        if (ph(f2, h) && (d.push(qh(h)), g++, g > c && (c = g)), g < b.length)
          for (f2 = f2.child; null !== f2; )
            a.push(f2, g), f2 = f2.sibling;
      }
    }
    if (c < b.length) {
      for (a = []; c < b.length; c++)
        a.push(qh(b[c]));
      return "findAllNodes was able to match part of the selector:\n  " + (d.join(" > ") + "\n\nNo matching component was found for:\n  ") + a.join(" > ");
    }
    return null;
  };
  exports2.getPublicRootInstance = function(a) {
    a = a.current;
    if (!a.child)
      return null;
    switch (a.child.tag) {
      case 5:
        return Ea(a.child.stateNode);
      default:
        return a.child.stateNode;
    }
  };
  exports2.injectIntoDevTools = function(a) {
    a = { bundleType: a.bundleType, version: a.version, rendererPackageName: a.rendererPackageName, rendererConfig: a.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: da.ReactCurrentDispatcher, findHostInstanceByFiber: ni, findFiberByHostInstance: a.findFiberByHostInstance || oi, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0" };
    if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)
      a = false;
    else {
      var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (b.isDisabled || !b.supportsFiber)
        a = true;
      else {
        try {
          Rc = b.inject(a), Sc = b;
        } catch (c) {
        }
        a = b.checkDCE ? true : false;
      }
    }
    return a;
  };
  exports2.isAlreadyRendering = function() {
    return false;
  };
  exports2.observeVisibleRects = function(a, b, c, d) {
    if (!bb)
      throw Error(m2(363));
    a = sh(a, b);
    var e = ib(a, c, d).disconnect;
    return { disconnect: function() {
      e();
    } };
  };
  exports2.registerMutableSourceForHydration = function(a, b) {
    var c = b._getVersion;
    c = c(b._source);
    null == a.mutableSourceEagerHydrationData ? a.mutableSourceEagerHydrationData = [b, c] : a.mutableSourceEagerHydrationData.push(b, c);
  };
  exports2.runWithPriority = function(a, b) {
    var c = C2;
    try {
      return C2 = a, b();
    } finally {
      C2 = c;
    }
  };
  exports2.shouldError = function() {
    return null;
  };
  exports2.shouldSuspend = function() {
    return false;
  };
  exports2.updateContainer = function(a, b, c, d) {
    var e = b.current, f2 = I2(), g = fe(e);
    c = ji(c);
    null === b.context ? b.context = c : b.pendingContext = c;
    b = Xd(f2, g);
    b.payload = { element: a };
    d = void 0 === d ? null : d;
    null !== d && (b.callback = d);
    a = Yd(e, b, g);
    null !== a && (ge(a, e, g, f2), Zd(a, e, g));
    return g;
  };
  return exports2;
};
const Reconciler = /* @__PURE__ */ babelHelpers.getDefaultExportFromCjs(reactReconciler_production_min);
var constants = { exports: {} };
var reactReconcilerConstants_development = {};
/**
 * @license React
 * react-reconciler-constants.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
{
  (function() {
    var SyncLane2 = (
      /*                        */
      1
    );
    var InputContinuousLane2 = (
      /*             */
      4
    );
    var DefaultLane2 = (
      /*                     */
      16
    );
    var IdleLane = (
      /*                        */
      536870912
    );
    var DiscreteEventPriority2 = SyncLane2;
    var ContinuousEventPriority2 = InputContinuousLane2;
    var DefaultEventPriority2 = DefaultLane2;
    var IdleEventPriority = IdleLane;
    var LegacyRoot = 0;
    var ConcurrentRoot = 1;
    reactReconcilerConstants_development.ConcurrentRoot = ConcurrentRoot;
    reactReconcilerConstants_development.ContinuousEventPriority = ContinuousEventPriority2;
    reactReconcilerConstants_development.DefaultEventPriority = DefaultEventPriority2;
    reactReconcilerConstants_development.DiscreteEventPriority = DiscreteEventPriority2;
    reactReconcilerConstants_development.IdleEventPriority = IdleEventPriority;
    reactReconcilerConstants_development.LegacyRoot = LegacyRoot;
  })();
}
{
  constants.exports = reactReconcilerConstants_development;
}
var constantsExports = constants.exports;
const supportedInputTypes = {
  color: true,
  date: true,
  datetime: true,
  "datetime-local": true,
  email: true,
  month: true,
  number: true,
  password: true,
  range: true,
  search: true,
  tel: true,
  text: true,
  time: true,
  url: true,
  week: true
};
const SyncLane = 1;
const InputContinuousLane = 4;
const DefaultLane = 16;
const DiscreteEventPriority = SyncLane;
const ContinuousEventPriority = InputContinuousLane;
const DefaultEventPriority = DefaultLane;
function getEventPriority(domEventName) {
  switch (domEventName) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "dragend":
    case "dragstart":
    case "drop":
    case "input":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "reset":
    case "resize":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "change":
    case "blur":
    case "focus":
    case "select":
    case "selectstart":
      return DiscreteEventPriority;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "pointerenter":
    case "pointerleave":
      return ContinuousEventPriority;
    default:
      return DefaultEventPriority;
  }
}
const randomKey = Math.random().toString(36).slice(2);
const internalPropsKey = "__reactProps$" + randomKey;
const internalInstanceKey = "__reactFiber$" + randomKey;
const internalContainerInstanceKey = "__reactContainer$" + randomKey;
const HostRoot = 3;
const HostComponent = 5;
const HostText = 6;
const SuspenseComponent = 13;
function precacheFiberNode(hostInst, node) {
  node[internalInstanceKey] = hostInst;
}
function markContainerAsRoot(hostRoot, node) {
  node[internalContainerInstanceKey] = hostRoot;
}
function getInstanceFromNode(node) {
  const inst = node[internalInstanceKey] || node[internalContainerInstanceKey];
  if (inst) {
    if (inst.tag === HostComponent || inst.tag === HostText || inst.tag === SuspenseComponent || inst.tag === HostRoot) {
      return inst;
    } else {
      return null;
    }
  }
  return null;
}
function getNodeFromInstance(inst) {
  if (inst.tag === HostComponent || inst.tag === HostText) {
    return inst.stateNode;
  }
}
function getFiberCurrentPropsFromNode(node) {
  return node[internalPropsKey] || null;
}
function updateFiberProps(node, props) {
  node[internalPropsKey] = props;
}
function updateInputWrapper(element, oldValue, props) {
  const node = element;
  const checked = props.checked;
  if (checked != null) {
    console.warn("updateCheck 未实现", node);
    return;
  }
  updateWrapper(element, oldValue, props);
  updateNamedCousins(element, props);
}
function updateNamedCousins(rootNode, props) {
  const name = props.name;
  if (props.type === "radio" && name != null) {
    console.warn("radio updateNamedCousins 未实现", rootNode, props);
  }
}
function getToStringValue(value) {
  const isEmptyType = typeof value === "function" || typeof value === "symbol";
  return isEmptyType ? "" : value;
}
function toString(value) {
  return "" + value;
}
function updateWrapper(element, oldValue, props) {
  const node = element;
  const value = getToStringValue(props.value);
  const type = props.type;
  setNodeValue(node, oldValue, value, type);
}
function setNodeValue(node, oldValue, value, type = "string") {
  if (value != null) {
    if (type === "number") {
      if (value === 0 && node.value === "" || oldValue != value) {
        node.value = toString(value);
      }
    } else if (oldValue !== toString(value)) {
      node.value = toString(value);
    }
  } else if (type === "submit" || type === "reset") {
    node.removeAttribute("value");
  }
}
function isTextInputElement(elem) {
  const nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  if (nodeName === "input") {
    const type = elem.type;
    return !type || !!supportedInputTypes[type];
  }
  if (nodeName === "textarea") {
    return true;
  }
  return false;
}
const ReactDOMTextareaRestoreControlledState = updateWrapper;
const ReactDOMInputRestoreControlledState = updateInputWrapper;
function isCheckable(elem) {
  const type = elem.type;
  const nodeName = elem.nodeName;
  return nodeName && nodeName.toLowerCase() === "input" && (type === "checkbox" || type === "radio");
}
function getTracker(node) {
  return node._valueTracker;
}
function detachTracker(node) {
  node._valueTracker = null;
}
function trackValueOnNode(node) {
  const valueField = isCheckable(node) ? "checked" : "value";
  const descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);
  let currentValue = "" + node[valueField];
  if (node.hasOwnProperty(valueField) || typeof descriptor === "undefined" || typeof descriptor.get !== "function" || typeof descriptor.set !== "function") {
    return;
  }
  const {
    get,
    set
  } = descriptor;
  Object.defineProperty(node, valueField, {
    configurable: true,
    enumerable: descriptor.enumerable,
    get: function() {
      return get.call(this);
    },
    set: function(value) {
      currentValue = "" + value;
      set.call(this, value);
    }
  });
  const tracker = {
    getValue() {
      return currentValue;
    },
    setValue(value) {
      currentValue = "" + value;
    },
    stopTracking() {
      detachTracker(node);
      delete node[valueField];
    }
  };
  return tracker;
}
function track(node) {
  if (getTracker(node)) {
    return;
  }
  node._valueTracker = trackValueOnNode(node);
}
function updateValueIfChanged(node, nextValue) {
  if (!node) {
    return false;
  }
  const tracker = getTracker(node);
  if (!tracker) {
    return true;
  }
  const lastValue = tracker.getValue();
  if (nextValue !== lastValue) {
    tracker.setValue(nextValue);
    return true;
  }
  return false;
}
const IS_NON_DIMENSIONAL = /aspect|acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function isEventName(s) {
  return s[0] === "o" && s[1] === "n";
}
function isEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i];
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
function updateProps(dom, oldProps, newProps) {
  const updatePayload = getUpdatePayload(dom, oldProps, newProps);
  if (updatePayload) {
    updatePropsByPayload(dom, oldProps, updatePayload);
  }
}
function updatePropsByPayload(dom, oldProps, updatePayload) {
  const handlers = [];
  let fixedHandler = null;
  for (let i = 0; i < updatePayload.length; i += 2) {
    const key = updatePayload[i];
    const newProp = updatePayload[i + 1];
    const oldProp = oldProps[key];
    if ("mini" === PLATFORM_TYPE.HARMONY) {
      if (key === "__fixed") {
        fixedHandler = () => setProperty(dom, key, newProp, oldProp);
        continue;
      }
      if (key === "__hmStyle") {
        handlers.splice(0, 0, () => setHarmonyStyle(dom, newProp, oldProp));
      } else {
        handlers.push(() => setProperty(dom, key, newProp, oldProp));
      }
    } else {
      setProperty(dom, key, newProp, oldProp);
    }
  }
  if ("mini" === PLATFORM_TYPE.HARMONY) {
    fixedHandler && fixedHandler();
    for (let i = 0; i < handlers.length; i++) {
      handlers[i]();
    }
  }
}
function getUpdatePayload(dom, oldProps, newProps) {
  let i;
  let updatePayload = null;
  for (i in oldProps) {
    if (!(i in newProps)) {
      (updatePayload = updatePayload || []).push(i, null);
    }
  }
  const isFormElement = dom instanceof FormElement;
  for (i in newProps) {
    if (oldProps[i] !== newProps[i] || isFormElement && i === "value") {
      if (i === "style" && isObject(oldProps[i]) && isObject(newProps[i]) && isEqual(oldProps[i], newProps[i]))
        continue;
      (updatePayload = updatePayload || []).push(i, newProps[i]);
    }
  }
  return updatePayload;
}
function setEvent(dom, name, value, oldValue) {
  const isCapture = name.endsWith("Capture");
  let eventName = name.toLowerCase().slice(2);
  if (isCapture) {
    eventName = eventName.slice(0, -7);
  }
  const compName = capitalize(toCamelCase(dom.tagName.toLowerCase()));
  if (eventName === "click" && "mini" !== PLATFORM_TYPE.HARMONY && compName in internalComponents) {
    eventName = "tap";
  }
  if (isFunction(value)) {
    if (oldValue) {
      dom.removeEventListener(eventName, oldValue, "mini" !== PLATFORM_TYPE.HARMONY ? false : void 0);
      dom.addEventListener(eventName, value, "mini" !== PLATFORM_TYPE.HARMONY ? {
        isCapture,
        sideEffect: false
      } : void 0);
    } else {
      dom.addEventListener(eventName, value, "mini" !== PLATFORM_TYPE.HARMONY ? isCapture : void 0);
    }
  } else {
    dom.removeEventListener(eventName, oldValue);
  }
}
function setStyle(style2, key, value) {
  if (key[0] === "-" && "mini" !== PLATFORM_TYPE.HARMONY) {
    style2.setProperty(key, value.toString());
    return;
  }
  style2[key] = isNumber(value) && IS_NON_DIMENSIONAL.test(key) === false ? "mini" === PLATFORM_TYPE.HARMONY ? value + "px" : convertNumber2PX(value) : value === null ? "" : value;
}
function setHarmonyStyle(dom, value, oldValue) {
  const style2 = dom._st.hmStyle;
  if (isObject(oldValue)) {
    for (const i in oldValue) {
      if (!(value && i in value)) {
        if ("mini" === PLATFORM_TYPE.HARMONY) {
          if (i === "::after" || i === "::before") {
            setPseudo(dom, i, null);
          } else if (["::first-child", "::last-child", "::empty"].includes(i) || `${i}`.indexOf("::nth-child") === 0) {
            dom.set_pseudo_class(i, null);
          } else {
            if (i === "position" && oldValue[i] === "fixed") {
              dom.setLayer(0);
            } else if (i === "animationName") {
              dom.setAnimation(false);
            }
            style2[i] = "";
          }
        } else {
          style2[i] = "";
        }
      }
    }
  }
  if (isObject(value)) {
    for (const i in value) {
      if (!oldValue || !isEqual(value[i], oldValue[i])) {
        if ("mini" === PLATFORM_TYPE.HARMONY) {
          if (i === "::after" || i === "::before") {
            setPseudo(dom, i, value[i]);
          } else if (["::first-child", "::last-child", "::empty"].includes(i) || i.startsWith("::nth-child")) {
            dom.set_pseudo_class(i, value[i]);
          } else {
            if (i === "position") {
              if (value[i] === "fixed" || value[i] !== "fixed" && (oldValue === null || oldValue === void 0 ? void 0 : oldValue[i])) {
                dom.setLayer(value[i] === "fixed" ? 1 : 0);
              }
            } else if (i === "animationName") {
              dom.setAnimation(true);
            }
            style2[i] = value[i];
          }
        } else {
          style2[i] = value[i];
        }
      }
    }
  }
  dom.setAttribute("__hmStyle", value);
}
function setProperty(dom, name, value, oldValue) {
  var _a2, _b;
  name = name === "className" ? "class" : name;
  if (name === "key" || name === "children" || name === "ref")
    ;
  else if (name === "style") {
    if (/harmony.*cpp/.test("weapp")) {
      return dom.setAttribute("_style4cpp", value);
    }
    const style2 = dom.style;
    if (isString(value)) {
      style2.cssText = value;
    } else {
      if (isString(oldValue)) {
        style2.cssText = "";
        oldValue = null;
      }
      if (isObject(oldValue)) {
        for (const i in oldValue) {
          if (!(value && i in value)) {
            if ("mini" === PLATFORM_TYPE.HARMONY && i === "position" && oldValue[i] === "fixed") {
              dom.setLayer(0);
            }
            setStyle(style2, i, "");
          }
        }
      }
      if (isObject(value)) {
        for (const i in value) {
          if (!oldValue || !isEqual(value[i], oldValue[i])) {
            if ("mini" === PLATFORM_TYPE.HARMONY && i === "position") {
              if (value[i] === "fixed" || value[i] !== "fixed" && (oldValue === null || oldValue === void 0 ? void 0 : oldValue[i])) {
                dom.setLayer(value[i] === "fixed" ? 1 : 0);
              }
            }
            setStyle(style2, i, value[i]);
          }
        }
      }
    }
  } else if (isEventName(name)) {
    setEvent(dom, name, value, oldValue);
  } else if (name === "dangerouslySetInnerHTML") {
    const newHtml = (_a2 = value === null || value === void 0 ? void 0 : value.__html) !== null && _a2 !== void 0 ? _a2 : "";
    const oldHtml = (_b = oldValue === null || oldValue === void 0 ? void 0 : oldValue.__html) !== null && _b !== void 0 ? _b : "";
    if (newHtml || oldHtml) {
      if (oldHtml !== newHtml) {
        dom.innerHTML = newHtml;
      }
    }
  } else if (!isFunction(value)) {
    if (value == null) {
      dom.removeAttribute(name);
    } else {
      dom.setAttribute(name, value);
    }
  }
}
function setPseudo(dom, name, value) {
  if (name === "::after") {
    dom.set_pseudo_after(value);
  } else if (name === "::before") {
    dom.set_pseudo_before(value);
  }
}
const hostConfig = {
  // below keys order by {React ReactFiberHostConfig.custom.js}, convenient for comparing each other.
  // -------------------
  // required by @types/react-reconciler
  // -------------------
  getPublicInstance(inst) {
    return inst;
  },
  getRootHostContext() {
    return {};
  },
  getChildHostContext(parentHostContext) {
    return parentHostContext;
  },
  prepareForCommit(..._) {
    return null;
  },
  resetAfterCommit: noop,
  createInstance(type, props, _rootContainerInstance, _hostContext, internalInstanceHandle) {
    const element = taroDocumentProvider.createElement(type);
    precacheFiberNode(internalInstanceHandle, element);
    updateFiberProps(element, props);
    return element;
  },
  appendInitialChild(parent, child) {
    parent.appendChild(child);
  },
  finalizeInitialChildren(dom, type, props) {
    let newProps = props;
    if (dom instanceof FormElement) {
      const [defaultName, defaultKey] = ["switch", "checkbox", "radio"].includes(type) ? ["checked", "defaultChecked"] : ["value", "defaultValue"];
      if (props.hasOwnProperty(defaultKey)) {
        newProps = Object.assign(Object.assign({}, newProps), {
          [defaultName]: props[defaultKey]
        });
        delete newProps[defaultKey];
      }
    }
    updateProps(dom, {}, newProps);
    if (type === "input" || type === "textarea") {
      track(dom);
    }
    return false;
  },
  prepareUpdate(instance, _, oldProps, newProps) {
    return getUpdatePayload(instance, oldProps, newProps);
  },
  shouldSetTextContent() {
    return false;
  },
  createTextInstance(text, _rootContainerInstance, _hostContext, internalInstanceHandle) {
    const textNode = taroDocumentProvider.createTextNode(text);
    precacheFiberNode(internalInstanceHandle, textNode);
    return textNode;
  },
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  isPrimaryRenderer: true,
  warnsIfNotActing: true,
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,
  getInstanceFromNode: () => null,
  beforeActiveInstanceBlur: noop,
  afterActiveInstanceBlur: noop,
  preparePortalMount: noop,
  prepareScopeUpdate: noop,
  getInstanceFromScope: () => null,
  getCurrentEventPriority() {
    return constantsExports.DefaultEventPriority;
  },
  detachDeletedInstance: noop,
  // -------------------
  //      Microtasks
  //     (optional)
  // -------------------
  supportsMicrotasks: true,
  scheduleMicrotask: isUndefined(Promise) ? setTimeout : (callback) => Promise.resolve(null).then(callback).catch(function(error) {
    setTimeout(() => {
      throw error;
    });
  }),
  // -------------------
  //      Mutation
  //     (required if supportsMutation is true)
  // -------------------
  appendChild(parent, child) {
    parent.appendChild(child);
  },
  appendChildToContainer(parent, child) {
    parent.appendChild(child);
  },
  commitTextUpdate(textInst, _, newText) {
    textInst.nodeValue = newText;
  },
  commitMount: noop,
  commitUpdate(dom, updatePayload, _, oldProps, newProps) {
    if (!updatePayload)
      return;
    if (updatePayload.length === 2 && updatePayload.includes("children"))
      return;
    updatePropsByPayload(dom, oldProps, updatePayload);
    updateFiberProps(dom, newProps);
  },
  insertBefore(parent, child, refChild) {
    parent.insertBefore(child, refChild);
  },
  insertInContainerBefore(parent, child, refChild) {
    parent.insertBefore(child, refChild);
  },
  removeChild(parent, child) {
    parent.removeChild(child);
  },
  removeChildFromContainer(parent, child) {
    parent.removeChild(child);
  },
  resetTextContent: noop,
  hideInstance(instance) {
    const style2 = instance.style;
    style2.setProperty("display", "none");
  },
  hideTextInstance(textInstance) {
    textInstance.nodeValue = "";
  },
  unhideInstance(instance, props) {
    const styleProp = props.style;
    let display = (styleProp === null || styleProp === void 0 ? void 0 : styleProp.hasOwnProperty("display")) ? styleProp.display : null;
    display = display == null || isBoolean(display) || display === "" ? "" : ("" + display).trim();
    instance.style["display"] = display;
  },
  unhideTextInstance(textInstance, text) {
    textInstance.nodeValue = text;
  },
  clearContainer(element) {
    if (element.childNodes.length > 0) {
      element.textContent = "";
    }
  }
};
const TaroReconciler = Reconciler(hostConfig);
{
  const foundDevTools = TaroReconciler.injectIntoDevTools({
    bundleType: 1,
    version: "18.0.0",
    rendererPackageName: "taro-react"
  });
  if (!foundDevTools) {
    console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools", "font-weight:bold");
  }
}
let restoreQueue = null;
function getTargetInstForInputOrChangeEvent(e, node) {
  var _a2, _b;
  const targetInst = getInstanceFromNode(node);
  const domEventName = e.type;
  if (!targetInst || !isTextInputElement(node))
    return;
  if (domEventName === "input" || domEventName === "change") {
    const nextValue = toString((_b = (_a2 = e.mpEvent) === null || _a2 === void 0 ? void 0 : _a2.detail) === null || _b === void 0 ? void 0 : _b.value);
    return getInstIfValueChanged(targetInst, nextValue);
  }
}
function getInstIfValueChanged(targetInst, nextValue) {
  const targetNode = getNodeFromInstance(targetInst);
  if (!targetNode)
    return false;
  if (updateValueIfChanged(targetNode, nextValue)) {
    return targetInst;
  }
}
function enqueueStateRestore(target) {
  if (restoreQueue) {
    restoreQueue.push(target);
  } else {
    restoreQueue = [target];
  }
}
function needsStateRestore() {
  return restoreQueue !== null;
}
function finishEventHandler() {
  const controlledComponentsHavePendingUpdates = needsStateRestore();
  if (controlledComponentsHavePendingUpdates) {
    TaroReconciler.flushSync();
    restoreStateIfNeeded();
  }
}
function restoreStateIfNeeded() {
  if (!restoreQueue) {
    return;
  }
  const queuedTargets = restoreQueue;
  restoreQueue = null;
  for (let i = 0; i < queuedTargets.length; i++) {
    restoreStateOfTarget(queuedTargets[i]);
  }
}
function restoreImpl(domElement, tag, oldValue, props) {
  switch (tag) {
    case "input":
      ReactDOMInputRestoreControlledState(domElement, oldValue, props);
      break;
    case "textarea":
      ReactDOMTextareaRestoreControlledState(domElement, oldValue, props);
      break;
  }
}
function restoreStateOfTarget(item) {
  const internalInstance = getInstanceFromNode(item.target);
  if (!internalInstance)
    return;
  const {
    stateNode,
    type
  } = internalInstance;
  if (stateNode) {
    const props = getFiberCurrentPropsFromNode(stateNode);
    restoreImpl(stateNode, type, item.value, props);
  }
}
const ContainerMap = /* @__PURE__ */ new WeakMap();
class Root {
  constructor(renderer, domContainer, options2) {
    this.renderer = renderer;
    this.initInternalRoot(renderer, domContainer, options2);
  }
  initInternalRoot(renderer, domContainer, options2) {
    const containerInfo = domContainer;
    if (options2) {
      const tag = 1;
      const concurrentUpdatesByDefaultOverride = false;
      let isStrictMode = false;
      let identifierPrefix = "";
      let onRecoverableError = (error) => console.error(error);
      let transitionCallbacks = null;
      if (options2.unstable_strictMode === true) {
        isStrictMode = true;
      }
      if (options2.identifierPrefix !== void 0) {
        identifierPrefix = options2.identifierPrefix;
      }
      if (options2.onRecoverableError !== void 0) {
        onRecoverableError = options2.onRecoverableError;
      }
      if (options2.unstable_transitionCallbacks !== void 0) {
        transitionCallbacks = options2.unstable_transitionCallbacks;
      }
      this.internalRoot = renderer.createContainer(
        containerInfo,
        tag,
        null,
        // hydrationCallbacks
        isStrictMode,
        concurrentUpdatesByDefaultOverride,
        identifierPrefix,
        onRecoverableError,
        transitionCallbacks
      );
    } else {
      const tag = 0;
      this.internalRoot = renderer.createContainer(
        containerInfo,
        tag,
        null,
        // hydrationCallbacks
        false,
        // isStrictMode
        false,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        () => {
        },
        // onRecoverableError, this isn't reachable because onRecoverableError isn't called in the legacy API.
        null
        // transitionCallbacks
      );
    }
  }
  render(children, cb) {
    const {
      renderer,
      internalRoot
    } = this;
    renderer.updateContainer(children, internalRoot, null, cb);
    return renderer.getPublicRootInstance(internalRoot);
  }
  unmount(cb) {
    this.renderer.updateContainer(null, this.internalRoot, null, cb);
  }
}
function render(element, domContainer, cb) {
  const oldRoot = ContainerMap.get(domContainer);
  if (oldRoot != null) {
    return oldRoot.render(element, cb);
  }
  const root = new Root(TaroReconciler, domContainer);
  ContainerMap.set(domContainer, root);
  return root.render(element, cb);
}
function createRoot(domContainer, options2 = {}) {
  var _a2;
  const oldRoot = ContainerMap.get(domContainer);
  if (oldRoot != null) {
    return oldRoot;
  }
  const root = new Root(TaroReconciler, domContainer, options2);
  ContainerMap.set(domContainer, root);
  markContainerAsRoot((_a2 = root === null || root === void 0 ? void 0 : root.internalRoot) === null || _a2 === void 0 ? void 0 : _a2.current, domContainer);
  hooks.tap("dispatchTaroEvent", (e, node) => {
    const eventPriority = getEventPriority(e.type);
    TaroReconciler.runWithPriority(eventPriority, () => {
      node.dispatchEvent(e);
    });
  });
  hooks.tap("modifyTaroEvent", (e, node) => {
    var _a3, _b;
    const inst = getTargetInstForInputOrChangeEvent(e, node);
    if (!inst)
      return;
    const nextValue = (_b = (_a3 = e.mpEvent) === null || _a3 === void 0 ? void 0 : _a3.detail) === null || _b === void 0 ? void 0 : _b.value;
    enqueueStateRestore({
      target: node,
      value: nextValue
    });
  });
  return root;
}
let isInsideEventHandler = false;
const unstable_batchedUpdates = (fn, a) => {
  if (isInsideEventHandler) {
    return fn(a);
  }
  isInsideEventHandler = true;
  try {
    return TaroReconciler.batchedUpdates(fn, a);
  } finally {
    isInsideEventHandler = false;
    finishEventHandler();
  }
};
function unmountComponentAtNode(dom) {
  ensure(dom && [1, 8, 9, 11].includes(dom.nodeType), "unmountComponentAtNode(...): Target container is not a DOM element.");
  const root = ContainerMap.get(dom);
  if (!root)
    return false;
  unstable_batchedUpdates(() => {
    root.unmount(() => {
      ContainerMap.delete(dom);
    });
  }, null);
  return true;
}
function findDOMNode(comp) {
  if (comp == null) {
    return null;
  }
  const nodeType = comp.nodeType;
  if (nodeType === 1 || nodeType === 3) {
    return comp;
  }
  return TaroReconciler.findHostInstance(comp);
}
const portalType = isFunction(Symbol) && Symbol.for ? Symbol.for("react.portal") : 60106;
function createPortal(children, containerInfo, key) {
  return {
    $$typeof: portalType,
    key: key == null ? null : String(key),
    children,
    containerInfo,
    implementation: null
  };
}
const flushSync = TaroReconciler.flushSync;
var index = {
  render,
  flushSync,
  createRoot,
  unstable_batchedUpdates,
  unmountComponentAtNode,
  findDOMNode,
  createPortal,
  internalInstanceKey
};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = react_production_min, k = Symbol.for("react.element"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a)
    m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
}
var jsx = q;
var jsxs = q;
const View = "view";
const Text = "text";
const Button = "button";
const Input = "input";
const ScrollView = "scroll-view";
const Swiper = "swiper";
const SwiperItem = "swiper-item";
const Image = "image";
exports.Button = Button;
exports.Image = Image;
exports.Input = Input;
exports.React = React;
exports.ScrollView = ScrollView;
exports.Swiper = Swiper;
exports.SwiperItem = SwiperItem;
exports.Taro = Taro;
exports.Text = Text;
exports.View = View;
exports._raf = _raf;
exports.createContext = createContext;
exports.createPageConfig = createPageConfig;
exports.createPortal = createPortal;
exports.createReactApp = createReactApp;
exports.createRecursiveComponentConfig = createRecursiveComponentConfig;
exports.index = index;
exports.jsx = jsx;
exports.jsxs = jsxs;
exports.react_production_min = react_production_min;
exports.taroDocumentProvider = taroDocumentProvider;
exports.taroExports = taroExports;
exports.taroWindowProvider = taroWindowProvider;
exports.useCallback = useCallback;
exports.useContext = useContext;
exports.useEffect = useEffect;
exports.useRef = useRef;
exports.useState = useState;
//# sourceMappingURL=taro.js.map
