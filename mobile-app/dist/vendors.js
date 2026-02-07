"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const taro = require("./taro.js");
const babelHelpers = require("./babelHelpers.js");
const globalConfig = {
  useSvg: true,
  classPrefix: "nut-icon",
  tag: "i",
  fontClassName: "nutui-iconfont"
};
const defaultProps$1$1 = {
  className: "",
  style: void 0,
  name: "",
  width: "",
  height: "",
  size: "",
  svg64: "",
  svgSrc: "",
  onClick: () => void 0
};
const Icon$1 = (props) => {
  const classPrefix = globalConfig.classPrefix;
  const {
    className,
    style,
    name,
    color,
    width,
    height,
    size,
    svg64,
    svgSrc,
    children,
    onClick,
    fallback = !globalConfig.useSvg
  } = __spreadValues(__spreadValues({}, defaultProps$1$1), props);
  const handleClick = (e) => {
    onClick && onClick(e);
  };
  const pxCheck = (value) => {
    if (value === "")
      return "";
    return isNaN(Number(value)) ? String(value) : value + "px";
  };
  const classes = () => {
    const iconName = fallback ? name == null ? void 0 : name.toLowerCase() : name;
    return `${fallback ? globalConfig.fontClassName : ""} ${classPrefix} ${classPrefix}-${iconName} ${className}`;
  };
  const props2Style = {};
  const checkedWidth = pxCheck(width || size || "");
  const checkedHeight = pxCheck(height || size || "");
  if (checkedWidth) {
    props2Style["width"] = checkedWidth;
  }
  if (checkedHeight) {
    props2Style["height"] = checkedHeight;
  }
  const svg64Style = {
    mask: `url('${svg64}')  0 0/100% 100% no-repeat`,
    "-webkitMask": `url('${svg64}') 0 0/100% 100% no-repeat`
  };
  const getStyle = () => {
    return __spreadValues(__spreadValues(__spreadValues({}, style), fallback ? {} : __spreadValues({
      backgroundColor: color || "currentColor"
    }, svg64Style)), props2Style);
  };
  return /* @__PURE__ */ taro.react_production_min.createElement(globalConfig.tag, {
    className: classes(),
    style: getStyle(),
    onClick: handleClick,
    color
  }, children);
};
const Icon$2 = Icon$1;
const IconSVG = (props) => {
  const realProps = __spreadValues(__spreadValues({}, defaultProps$1$1), props);
  return /* @__PURE__ */ taro.react_production_min.createElement(taro.react_production_min.Fragment, null, /* @__PURE__ */ taro.react_production_min.createElement(Icon$2, __spreadProps(__spreadValues({}, realProps), {
    name: realProps.name || "Close",
    svg64: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0OCA0OCI+PGcgc3R5bGU9Im1peC1ibGVuZC1tb2RlOnBhc3MtdGhyb3VnaDtvcGFjaXR5OjEiPjxwYXRoIGZpbGw9IiMxNzFhMjYiIGZpbGwtcnVsZT0iTk9OWkVSTyIgZD0iTTE1LjE0NiAxNy4yNjggMjcuODggMzBhMSAxIDAgMCAwIDEuNDE0IDBsLjcwNy0uNzA3YTEgMSAwIDAgMCAwLTEuNDE0TDE3LjI2OCAxNS4xNDYgMzAgMi40MTRBMSAxIDAgMCAwIDMwIDFsLS43MDctLjcwN2ExIDEgMCAwIDAtMS40MTQgMEwxNS4xNDYgMTMuMDI1IDIuNDE0LjI5M0ExIDEgMCAwIDAgMSAuMjkzTC4yOTMgMWExIDEgMCAwIDAgMCAxLjQxNGwxMi43MzIgMTIuNzMyTC4yOTMgMjcuODhhMSAxIDAgMCAwIDAgMS40MTRMMSAzMGExIDEgMCAwIDAgMS40MTQgMHoiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpub3JtYWwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguODU0IDguODU0KSIvPjwvZz48L3N2Zz4="
  })));
};
const style_icon = "";
var dayjs_min = { exports: {} };
var hasRequiredDayjs_min;
function requireDayjs_min() {
  if (hasRequiredDayjs_min)
    return dayjs_min.exports;
  hasRequiredDayjs_min = 1;
  (function(module2, exports2) {
    !function(t, e) {
      module2.exports = e();
    }(babelHelpers.commonjsGlobal, function() {
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
        var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
        return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
      } }, m = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, v = { s: m, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date())
          return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return void 0 === t2;
      } }, g = "en", D = {};
      D[g] = M;
      var p = "$isDayjsObject", S = function(t2) {
        return t2 instanceof _ || !(!t2 || !t2[p]);
      }, w = function t2(e2, n2, r2) {
        var i2;
        if (!e2)
          return g;
        if ("string" == typeof e2) {
          var s2 = e2.toLowerCase();
          D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
          var u2 = e2.split("-");
          if (!i2 && u2.length > 1)
            return t2(u2[0]);
        } else {
          var a2 = e2.name;
          D[a2] = e2, i2 = a2;
        }
        return !r2 && i2 && (g = i2), i2 || !r2 && g;
      }, O = function(t2, e2) {
        if (S(t2))
          return t2.clone();
        var n2 = "object" == typeof e2 ? e2 : {};
        return n2.date = t2, n2.args = arguments, new _(n2);
      }, b = v;
      b.l = w, b.i = S, b.w = function(t2, e2) {
        return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var _ = function() {
        function M2(t2) {
          this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (null === e2)
              return /* @__PURE__ */ new Date(NaN);
            if (b.u(e2))
              return /* @__PURE__ */ new Date();
            if (e2 instanceof Date)
              return new Date(e2);
            if ("string" == typeof e2 && !/Z$/i.test(e2)) {
              var r2 = e2.match($);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          }(t2), this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return b;
        }, m2.isValid = function() {
          return !(this.$d.toString() === l);
        }, m2.isSame = function(t2, e2) {
          var n2 = O(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, m2.isAfter = function(t2, e2) {
          return O(t2) < this.startOf(e2);
        }, m2.isBefore = function(t2, e2) {
          return this.endOf(e2) < O(t2);
        }, m2.$g = function(t2, e2, n2) {
          return b.u(t2) ? this[e2] : this.set(n2, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e2) {
          var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
            var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
            return r2 ? i2 : i2.endOf(a);
          }, $2 = function(t3, e3) {
            return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (f2) {
            case h:
              return r2 ? l2(1, 0) : l2(31, 11);
            case c:
              return r2 ? l2(1, M3) : l2(0, M3 + 1);
            case o:
              var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
              return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return $2(v2 + "Hours", 0);
            case u:
              return $2(v2 + "Minutes", 1);
            case s:
              return $2(v2 + "Seconds", 2);
            case i:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e2) {
          var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
          if (o2 === c || o2 === h) {
            var y2 = this.clone().set(d, 1);
            y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else
            l2 && this.$d[l2]($2);
          return this.init(), this;
        }, m2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, m2.get = function(t2) {
          return this[b.p(t2)]();
        }, m2.add = function(r2, f2) {
          var d2, l2 = this;
          r2 = Number(r2);
          var $2 = b.p(f2), y2 = function(t2) {
            var e2 = O(l2);
            return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
          };
          if ($2 === c)
            return this.set(c, this.$M + r2);
          if ($2 === h)
            return this.set(h, this.$y + r2);
          if ($2 === a)
            return y2(1);
          if ($2 === o)
            return y2(7);
          var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return b.w(m3, this);
        }, m2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, m2.format = function(t2) {
          var e2 = this, n2 = this.$locale();
          if (!this.isValid())
            return n2.invalidDate || l;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
            return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
          }, d2 = function(t3) {
            return b.s(s2 % 12 || 12, t3, "0");
          }, $2 = f2 || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          };
          return r2.replace(y, function(t3, r3) {
            return r3 || function(t4) {
              switch (t4) {
                case "YY":
                  return String(e2.$y).slice(-2);
                case "YYYY":
                  return b.s(e2.$y, 4, "0");
                case "M":
                  return a2 + 1;
                case "MM":
                  return b.s(a2 + 1, 2, "0");
                case "MMM":
                  return h2(n2.monthsShort, a2, c2, 3);
                case "MMMM":
                  return h2(c2, a2);
                case "D":
                  return e2.$D;
                case "DD":
                  return b.s(e2.$D, 2, "0");
                case "d":
                  return String(e2.$W);
                case "dd":
                  return h2(n2.weekdaysMin, e2.$W, o2, 2);
                case "ddd":
                  return h2(n2.weekdaysShort, e2.$W, o2, 3);
                case "dddd":
                  return o2[e2.$W];
                case "H":
                  return String(s2);
                case "HH":
                  return b.s(s2, 2, "0");
                case "h":
                  return d2(1);
                case "hh":
                  return d2(2);
                case "a":
                  return $2(s2, u2, true);
                case "A":
                  return $2(s2, u2, false);
                case "m":
                  return String(u2);
                case "mm":
                  return b.s(u2, 2, "0");
                case "s":
                  return String(e2.$s);
                case "ss":
                  return b.s(e2.$s, 2, "0");
                case "SSS":
                  return b.s(e2.$ms, 3, "0");
                case "Z":
                  return i2;
              }
              return null;
            }(t3) || i2.replace(":", "");
          });
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, l2) {
          var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
            return b.m(y2, m3);
          };
          switch (M3) {
            case h:
              $2 = D2() / 12;
              break;
            case c:
              $2 = D2();
              break;
            case f:
              $2 = D2() / 3;
              break;
            case o:
              $2 = (g2 - v2) / 6048e5;
              break;
            case a:
              $2 = (g2 - v2) / 864e5;
              break;
            case u:
              $2 = g2 / n;
              break;
            case s:
              $2 = g2 / e;
              break;
            case i:
              $2 = g2 / t;
              break;
            default:
              $2 = g2;
          }
          return l2 ? $2 : b.a($2);
        }, m2.daysInMonth = function() {
          return this.endOf(c).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t2, e2) {
          if (!t2)
            return this.$L;
          var n2 = this.clone(), r2 = w(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, m2.clone = function() {
          return b.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      }(), k = _.prototype;
      return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t2) {
        k[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      }), O.extend = function(t2, e2) {
        return t2.$i || (t2(e2, _, O), t2.$i = true), O;
      }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
        return O(1e3 * t2);
      }, O.en = D[g], O.Ls = D, O.p = {}, O;
    });
  })(dayjs_min);
  return dayjs_min.exports;
}
var dayjs_minExports = requireDayjs_min();
const dayjs = /* @__PURE__ */ babelHelpers.getDefaultExportFromCjs(dayjs_minExports);
var zhCn = { exports: {} };
(function(module2, exports2) {
  !function(e, _) {
    module2.exports = _(requireDayjs_min());
  }(babelHelpers.commonjsGlobal, function(e) {
    function _(e2) {
      return e2 && "object" == typeof e2 && "default" in e2 ? e2 : { default: e2 };
    }
    var t = _(e), d = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(e2, _2) {
      return "W" === _2 ? e2 + "周" : e2 + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(e2, _2) {
      var t2 = 100 * e2 + _2;
      return t2 < 600 ? "凌晨" : t2 < 900 ? "早上" : t2 < 1100 ? "上午" : t2 < 1300 ? "中午" : t2 < 1800 ? "下午" : "晚上";
    } };
    return t.default.locale(d, null, true), d;
  });
})(zhCn);
function _define_property(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else
    obj[key] = value;
  return obj;
}
function _object_spread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys2 = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys2 = ownKeys2.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys2.forEach(function(key) {
      _define_property(target, key, source[key]);
    });
  }
  return target;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _object_spread_props(target, source) {
  source = source != null ? source : {};
  if (Object.getOwnPropertyDescriptors)
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
  else {
    ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _object_without_properties_loose(source, excluded) {
  if (source == null)
    return {};
  var target = {}, sourceKeys = Object.getOwnPropertyNames(source), key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    if (!Object.prototype.propertyIsEnumerable.call(source, key))
      continue;
    target[key] = source[key];
  }
  return target;
}
function _object_without_properties(source, excluded) {
  if (source == null)
    return {};
  var target = {}, sourceKeys, key, i;
  if (typeof Reflect !== "undefined" && Reflect.ownKeys) {
    sourceKeys = Reflect.ownKeys(source);
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
    return target;
  }
  target = _object_without_properties_loose(source, excluded);
  if (Object.getOwnPropertySymbols) {
    sourceKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
var classnames = { exports: {} };
(function(module2) {
  (function() {
    var hasOwn = {}.hasOwnProperty;
    function classNames2() {
      var classes = "";
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (arg) {
          classes = appendClass(classes, parseValue(arg));
        }
      }
      return classes;
    }
    function parseValue(arg) {
      if (typeof arg === "string" || typeof arg === "number") {
        return arg;
      }
      if (typeof arg !== "object") {
        return "";
      }
      if (Array.isArray(arg)) {
        return classNames2.apply(null, arg);
      }
      if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
        return arg.toString();
      }
      var classes = "";
      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes = appendClass(classes, key);
        }
      }
      return classes;
    }
    function appendClass(value, newClass) {
      if (!newClass) {
        return value;
      }
      if (value) {
        return value + " " + newClass;
      }
      return value + newClass;
    }
    if (module2.exports) {
      classNames2.default = classNames2;
      module2.exports = classNames2;
    } else {
      taro.taroWindowProvider.classNames = classNames2;
    }
  })();
})(classnames);
var classnamesExports = classnames.exports;
const classNames = /* @__PURE__ */ babelHelpers.getDefaultExportFromCjs(classnamesExports);
var ComponentDefaults = {
  className: "",
  style: {}
};
var harmony = function() {
  return ["harmony", "harmonyhybrid", "jdharmony"].includes(taro.Taro.getEnv().toLowerCase());
};
var td = function() {
  return ["dynamic"].includes(taro.Taro.getEnv().toLowerCase());
};
var freeGlobal = typeof babelHelpers.commonjsGlobal == "object" && babelHelpers.commonjsGlobal && babelHelpers.commonjsGlobal.Object === Object && babelHelpers.commonjsGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var Symbol$1 = root.Symbol;
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0;
symbolProto ? symbolProto.toString : void 0;
var zhCN = {
  save: "保存",
  confirm: "确认",
  cancel: "取消",
  done: "完成",
  noData: "暂无数据",
  placeholder: "请输入内容",
  select: "请选择",
  edit: "编辑",
  reset: "重置",
  close: "关闭",
  video: {
    errorTip: "视频加载失败",
    clickRetry: "点击重试"
  },
  fixednav: {
    activeText: "收起导航",
    inactiveText: "快速导航"
  },
  infiniteloading: {
    pullRefreshText: "松开刷新",
    loadText: "加载中",
    loadMoreText: "没有更多了"
  },
  pagination: {
    prev: "上一页",
    next: "下一页"
  },
  range: {
    rangeText: "不在该区间内"
  },
  calendaritem: {
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    end: "结束",
    start: "开始",
    confirm: "确认",
    title: "日历选择",
    monthTitle: function(year, month) {
      return "".concat(year, "年").concat(Number(month) < 10 ? "0".concat(Number(month)) : month, "月");
    },
    today: "今天",
    loadPreviousMonth: "加载上一个月",
    noEarlierMonth: "没有更早月份"
  },
  shortpassword: {
    title: "请输入密码",
    description: "您使用了虚拟资产，请进行验证",
    tips: "忘记密码"
  },
  uploader: {
    list: "上传文件",
    ready: "准备完成",
    readyUpload: "准备上传",
    waitingUpload: "等待上传",
    uploading: "上传中...",
    success: "上传成功",
    error: "上传失败",
    deleteWord: "用户阻止了删除！"
  },
  countdown: {
    day: "天",
    hour: "时",
    minute: "分",
    second: "秒"
  },
  address: {
    selectRegion: "请选择地址",
    deliveryTo: "配送至",
    chooseAnotherAddress: "选择其他地址",
    hotCity: "热门城市",
    selectProvince: "选择省份/地区"
  },
  signature: {
    reSign: "重签",
    unsupported: "对不起，当前浏览器不支持Canvas，无法使用本控件！"
  },
  ecard: {
    chooseText: "请选择电子卡面值",
    otherValueText: "其他面值",
    placeholder: "请输入1-5000整数"
  },
  timeselect: {
    pickupTime: "取件时间"
  },
  sku: {
    buyNow: "立即购买",
    buyNumber: "购买数量",
    addToCard: "加入购物车"
  },
  skuheader: {
    skuId: "商品编号"
  },
  addresslist: {
    addAddress: "新建地址"
  },
  comment: {
    complaintsText: "我要投诉",
    additionalReview: function(day) {
      return "购买".concat(day, "天后追评");
    },
    additionalImages: function(length) {
      return "".concat(length, "张追评图片");
    }
  },
  searchbar: {
    basePlaceholder: "上京东，购好物",
    text: "文本",
    test: "测试",
    title1: "基础用法",
    title2: "搜索框形状及最大长度",
    title3: "搜索框内外背景设置",
    title4: "搜索框文本设置",
    title5: "自定义图标设置",
    title6: "数据改变监听"
  },
  audio: {
    back: "快退",
    forward: "快进",
    pause: "暂停",
    start: "开始",
    mute: "静音",
    tips: "onPlayEnd事件在loop=false时才会触发"
  },
  avatarCropper: {
    rotate: "旋转",
    selectImage: "选择图片"
  },
  datepicker: {
    year: "年",
    month: "月",
    day: "日",
    hour: "时",
    min: "分",
    seconds: "秒"
  },
  pullToRefresh: {
    pullingText: "下拉刷新",
    canReleaseText: "松手刷新",
    refreshingText: "刷新中",
    completeText: "刷新成功"
  },
  tour: {
    prevStepText: "上一步",
    completeText: "完成",
    nextStepText: "下一步"
  },
  watermark: {
    errorCanvasTips: "当前环境不支持Canvas"
  },
  mask: "蒙层"
};
const zhCN$1 = zhCN;
var defaultConfigRef = {
  current: {
    locale: zhCN$1,
    direction: "ltr"
  }
};
var getDefaultConfig = function() {
  return defaultConfigRef.current;
};
var ConfigContext = /* @__PURE__ */ taro.createContext(null);
var useConfig = function() {
  var _useContext;
  return (_useContext = taro.useContext(ConfigContext)) !== null && _useContext !== void 0 ? _useContext : getDefaultConfig();
};
function pxTransform(value, radix) {
  if (harmony() || td())
    return taro.Taro.pxTransform(value, radix || 375);
  return "".concat(value, "px");
}
function _array_with_holes(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterable_to_array_limit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d)
        throw _e;
    }
  }
  return _arr;
}
function _non_iterable_rest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _array_like_to_array(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _unsupported_iterable_to_array(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _array_like_to_array(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _array_like_to_array(o, minLen);
}
function _sliced_to_array(arr, i) {
  return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
var MIN_DISTANCE = 10;
function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return "horizontal";
  }
  if (y > x && y > MIN_DISTANCE) {
    return "vertical";
  }
  return "";
}
function useTouch() {
  var startX = taro.useRef(0);
  var startY = taro.useRef(0);
  var deltaX = taro.useRef(0);
  var deltaY = taro.useRef(0);
  var delta = taro.useRef(0);
  var offsetX = taro.useRef(0);
  var offsetY = taro.useRef(0);
  var direction = taro.useRef("");
  var last = taro.useRef(false);
  var velocity = taro.useRef(0);
  var touchTime = taro.useRef(Date.now());
  var isVertical = function() {
    return direction.current === "vertical";
  };
  var isHorizontal = function() {
    return direction.current === "horizontal";
  };
  var reset = function() {
    touchTime.current = Date.now();
    deltaX.current = 0;
    deltaY.current = 0;
    offsetX.current = 0;
    offsetY.current = 0;
    delta.current = 0;
    direction.current = "";
    last.current = false;
  };
  var getTouch = function(event) {
    var touch = event.touches ? event.touches[0] : event.nativeEvent;
    return touch;
  };
  var getX = function(touch) {
    if (typeof touch.clientX !== "undefined" && typeof touch.pageX !== "undefined")
      return touch.pageX;
    var _touch_screenX, _ref, _ref1;
    return (_ref1 = (_ref = (_touch_screenX = touch.screenX) !== null && _touch_screenX !== void 0 ? _touch_screenX : touch.pageX) !== null && _ref !== void 0 ? _ref : touch.clientX) !== null && _ref1 !== void 0 ? _ref1 : 0;
  };
  var getY = function(touch) {
    if (typeof touch.clientY !== "undefined" && typeof touch.pageY !== "undefined")
      return touch.pageY;
    var _touch_screenY, _ref, _ref1;
    return (_ref1 = (_ref = (_touch_screenY = touch.screenY) !== null && _touch_screenY !== void 0 ? _touch_screenY : touch.pageY) !== null && _ref !== void 0 ? _ref : touch.clientY) !== null && _ref1 !== void 0 ? _ref1 : 0;
  };
  var start = function(event) {
    reset();
    touchTime.current = Date.now();
    startX.current = getX(getTouch(event));
    startY.current = getY(getTouch(event));
  };
  var move = function(event) {
    var touch = getTouch(event);
    var clientX = getX(touch);
    var clientY = getY(touch);
    deltaX.current = clientX < 0 ? 0 : clientX - startX.current;
    deltaY.current = clientY - startY.current;
    offsetX.current = Math.abs(deltaX.current);
    offsetY.current = Math.abs(deltaY.current);
    delta.current = isVertical() ? deltaY.current : deltaX.current;
    if (!direction.current) {
      direction.current = getDirection(offsetX.current, offsetY.current);
    }
  };
  var end = function(event) {
    last.current = true;
    velocity.current = Math.sqrt(Math.pow(deltaX.current, 2) + Math.pow(deltaY.current, 2)) / (Date.now() - touchTime.current);
  };
  return {
    end,
    move,
    start,
    reset,
    touchTime,
    startX,
    startY,
    deltaX,
    deltaY,
    delta,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal,
    last
  };
}
var canUseDom = !!(typeof taro.taroWindowProvider !== "undefined" && typeof taro.taroDocumentProvider !== "undefined" && taro.taroWindowProvider.document && taro.taroWindowProvider.document.createElement);
var defaultRoot = canUseDom ? taro.taroWindowProvider : void 0;
var overflowStylePatterns = ["scroll", "auto", "overlay"];
function isElement(node) {
  var ELEMENT_NODE_TYPE = 1;
  return node.nodeType === ELEMENT_NODE_TYPE;
}
function getScrollParent(el) {
  var root2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultRoot;
  var node = el;
  while (node && node !== root2 && isElement(node)) {
    if (node === taro.taroDocumentProvider.body) {
      return root2;
    }
    var overflowY = taro.taroWindowProvider.getComputedStyle(node).overflowY;
    if (overflowStylePatterns.includes(overflowY) && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentNode;
  }
  return root2;
}
var totalLockCount = 0;
var BODY_LOCK_CLASS = "nut-overflow-hidden";
function getScrollableElement(el) {
  var current = el === null || el === void 0 ? void 0 : el.parentElement;
  while (current) {
    if (current.clientHeight < current.scrollHeight) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}
function useLockScroll(rootRef, shouldLock) {
  var touch = useTouch();
  var onTouchMove = function(event) {
    touch.move(event);
    var direction = touch.deltaY.current > 0 ? "10" : "01";
    var el = getScrollParent(event.target, rootRef.current);
    if (!el)
      return;
    if (shouldLock === "strict") {
      var scrollableParent = getScrollableElement(event.target);
      if (scrollableParent === taro.taroDocumentProvider.body || scrollableParent === taro.taroDocumentProvider.documentElement) {
        event.preventDefault();
        return;
      }
    }
    var scrollHeight = el.scrollHeight, offsetHeight = el.offsetHeight, scrollTop = el.scrollTop;
    var status = "11";
    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? "00" : "01";
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = "10";
    }
    if (status !== "11" && touch.isVertical() && !(parseInt(status, 2) & parseInt(direction, 2))) {
      if (event.cancelable) {
        event.preventDefault();
      }
    }
  };
  var lock = function() {
    taro.taroDocumentProvider.addEventListener("touchstart", touch.start);
    taro.taroDocumentProvider.addEventListener("touchmove", onTouchMove, false);
    if (!totalLockCount) {
      taro.taroDocumentProvider.body.classList.add(BODY_LOCK_CLASS);
    }
    totalLockCount++;
  };
  var unlock = function() {
    if (totalLockCount) {
      taro.taroDocumentProvider.removeEventListener("touchstart", touch.start);
      taro.taroDocumentProvider.removeEventListener("touchmove", onTouchMove);
      totalLockCount--;
      if (!totalLockCount) {
        taro.taroDocumentProvider.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  };
  taro.useEffect(function() {
    if (shouldLock) {
      lock();
      return function() {
        unlock();
      };
    }
  }, [shouldLock]);
}
var useLockScrollTaro = function(shouldLock) {
  var refObject = taro.useRef(null);
  if (taro.taroExports.getEnv() === "WEB") {
    useLockScroll(refObject, shouldLock);
  }
  return refObject;
};
var defaultOverlayProps = _object_spread_props(_object_spread({}, ComponentDefaults), {
  zIndex: 1e3,
  duration: 300,
  closeOnOverlayClick: true,
  visible: false,
  lockScroll: true,
  onClick: function() {
  },
  afterShow: function() {
  },
  afterClose: function() {
  }
});
var Overlay = function(props) {
  var _ref = _object_spread({}, defaultOverlayProps, props), children = _ref.children, zIndex = _ref.zIndex;
  _ref.duration;
  var className = _ref.className, closeOnOverlayClick = _ref.closeOnOverlayClick, visible = _ref.visible, lockScroll = _ref.lockScroll, style = _ref.style;
  _ref.afterShow;
  _ref.afterClose;
  var onClick = _ref.onClick, rest = _object_without_properties(_ref, ["children", "zIndex", "duration", "className", "closeOnOverlayClick", "visible", "lockScroll", "style", "afterShow", "afterClose", "onClick"]);
  var classPrefix = "nut-overlay";
  var _useState = _sliced_to_array(taro.useState(visible), 2), innerVisible = _useState[0], setInnerVisible = _useState[1];
  var nodeRef = useLockScrollTaro(!!lockScroll && innerVisible);
  taro.useEffect(function() {
    setInnerVisible(visible);
  }, [visible]);
  var classes = classNames(classPrefix, className);
  var styles = _object_spread({
    zIndex
  }, style);
  var handleClick = function(e) {
    if (closeOnOverlayClick) {
      onClick && onClick(e);
    }
  };
  var renderOverlay = function() {
    return /* @__PURE__ */ taro.react_production_min.createElement(taro.View, _object_spread_props(_object_spread({
      ref: nodeRef,
      className: classes,
      style: _object_spread_props(_object_spread({}, styles), {
        display: innerVisible ? "block" : "none"
      })
    }, rest), {
      catchMove: lockScroll,
      onClick: handleClick
    }), children);
  };
  return /* @__PURE__ */ taro.react_production_min.createElement(taro.react_production_min.Fragment, null, renderOverlay());
};
Overlay.displayName = "NutOverlay";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done)
    resolve(value);
  else
    Promise.resolve(value).then(_next, _throw);
}
function _async_to_generator(fn) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function _ts_generator(thisArg, body) {
  var f, y, t, _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype), d = Object.defineProperty;
  return d(g, "next", { value: verb(0) }), d(g, "throw", { value: verb(1) }), d(g, "return", { value: verb(2) }), typeof Symbol === "function" && d(g, Symbol.iterator, { value: function() {
    return this;
  } }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function _class_call_check(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _create_class(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
var MiniLru = /* @__PURE__ */ function() {
  function MiniLru2(capacity) {
    _class_call_check(this, MiniLru2);
    _define_property(this, "cache", void 0);
    _define_property(this, "capacity", void 0);
    if (capacity <= 0) {
      throw new Error("Cache capacity must be a positive number");
    }
    this.cache = /* @__PURE__ */ new Map();
    this.capacity = capacity;
  }
  _create_class(MiniLru2, [{
    key: "get",
    value: function get(key) {
      if (this.cache.has(key)) {
        var value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
      }
      return null;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      if (this.cache.has(key)) {
        this.cache.delete(key);
      } else if (this.cache.size >= this.capacity) {
        this.cache.delete(this.cache.keys().next().value);
      }
      this.cache.set(key, value);
    }
  }, {
    key: "has",
    value: function has(key) {
      return this.cache.has(key);
    }
  }]);
  return MiniLru2;
}();
var inBrowser = typeof taro.taroDocumentProvider !== "undefined" && !!taro.taroDocumentProvider.scripts;
function isWindow(val) {
  return val === taro.taroWindowProvider;
}
var getRect = function(elementRef) {
  var element = elementRef;
  if (isWindow(element)) {
    var width = element.innerWidth;
    var height = element.innerHeight;
    return {
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      width,
      height
    };
  }
  if (element && element.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }
  return {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0
  };
};
new MiniLru(10);
function makeRect(width, height) {
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height
  };
}
var getRectInMultiPlatformWithoutCache = function(element) {
  var harmonyId = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return _async_to_generator(function() {
    return _ts_generator(this, function(_state) {
      if (element) {
        if (inBrowser) {
          return [2, Promise.resolve(getRect(element))];
        }
        return [2, new Promise(function(resolve, reject) {
          taro.taroExports.createSelectorQuery().select("#".concat(harmonyId || element.uid)).boundingClientRect().exec(function(param) {
            var _param = _sliced_to_array(param, 1), rects = _param[0];
            resolve(rects);
          });
        })];
      }
      return [2, Promise.resolve(makeRect(0, 0))];
    });
  })();
};
function requestAniFrame() {
  if (inBrowser) {
    var _window = taro.taroWindowProvider;
    return _window.requestAnimationFrame || _window.webkitRequestAnimationFrame || function(callback) {
      _window.setTimeout(callback, 1e3 / 60);
    };
  }
  return function(callback) {
    setTimeout(callback, 1e3 / 60);
  };
}
const requestAniFrame$1 = requestAniFrame();
function _array_without_holes(arr) {
  if (Array.isArray(arr))
    return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
    return Array.from(iter);
  }
}
function _non_iterable_spread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
  return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
var Utils = {
  /**
  * 是否为闫年
  * @return {Boolse} true|false
  */
  isLeapYear: function isLeapYear(y) {
    return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0;
  },
  /**
  * 返回星期数
  * @return {String}
  */
  getWhatDay: function getWhatDay(year, month, day) {
    var date = new Date("".concat(year, "/").concat(month, "/").concat(day));
    var index = date.getDay();
    var dayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return dayNames[index];
  },
  /**
  * 返回上一个月在当前面板中的天数
  * @return {Number}
  */
  getMonthPreDay: function getMonthPreDay(year, month) {
    var date = new Date("".concat(year, "/").concat(month, "/01"));
    var day = date.getDay();
    if (day === 0) {
      day = 7;
    }
    return day;
  },
  /**
  * 返回月份天数
  * @return {Number}
  */
  getMonthDays: function getMonthDays(year, month) {
    if (/^0/.test(month)) {
      month = month.split("")[1];
    }
    return [0, 31, this.isLeapYear(Number(year)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  },
  /**
  * 补齐数字位数
  * @return {string}
  */
  getNumTwoBit: function getNumTwoBit(n) {
    n = Number(n);
    return (n > 9 ? "" : "0") + n;
  },
  /**
  * 日期对象转成字符串
  * @return {string}
  */
  date2Str: function date2Str(date, split) {
    split = split || "-";
    var y = date.getFullYear();
    var m = this.getNumTwoBit(date.getMonth() + 1);
    var d = this.getNumTwoBit(date.getDate());
    return [y, m, d].join(split);
  },
  /**
  * 返回日期格式字符串
  * @param {Number} 0返回今天的日期、1返回明天的日期，2返回后天得日期，依次类推
  * @return {string} '2014-12-31'
  */
  getDay: function getDay(i) {
    i = i || 0;
    var date = /* @__PURE__ */ new Date();
    var diff = i * (1e3 * 60 * 60 * 24);
    date = new Date(date.getTime() + diff);
    return this.date2Str(date);
  },
  /**
  * 时间比较
  * @return {Boolean}
  */
  compareDate: function compareDate(date1, date2) {
    var startTime = new Date(date1.replace("-", "/").replace("-", "/"));
    var endTime = new Date(date2.replace("-", "/").replace("-", "/"));
    if (startTime >= endTime) {
      return false;
    }
    return true;
  },
  /**
  * 时间是否相等
  * @return {Boolean}
  */
  isEqual: function isEqual(date1, date2) {
    var startTime = new Date((date1 || "").replace(/-/g, "/")).getTime();
    var endTime = new Date(date2.replace(/-/g, "/")).getTime();
    if (startTime === endTime) {
      return true;
    }
    return false;
  },
  getMonthWeek: function getMonthWeek(year, month, date) {
    var firstDayOfWeek = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    var dateNow = new Date(Number(year), parseInt(month) - 1, Number(date));
    var w = dateNow.getDay();
    var d = dateNow.getDate();
    var remainder = 6 - w;
    if (firstDayOfWeek !== 0) {
      w = w === 0 ? 7 : w;
      remainder = 7 - w;
    }
    return Math.ceil((d + remainder) / 7);
  },
  getYearWeek: function getYearWeek(year, month, date) {
    var dateNow = new Date(Number(year), parseInt(month) - 1, Number(date));
    var dateFirst = new Date(Number(year), 0, 1);
    var dataNumber = Math.round((dateNow.valueOf() - dateFirst.valueOf()) / 864e5);
    return Math.ceil((dataNumber + (dateFirst.getDay() + 1 - 1)) / 7);
  },
  getWeekDate: function getWeekDate(year, month, date) {
    var firstDayOfWeek = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
    var dateNow = new Date(Number(year), parseInt(month) - 1, Number(date));
    var nowTime = dateNow.getTime();
    var day = dateNow.getDay();
    if (firstDayOfWeek === 0) {
      var oneDayTime = 24 * 60 * 60 * 1e3;
      var SundayTime = nowTime - day * oneDayTime;
      var SaturdayTime = nowTime + (6 - day) * oneDayTime;
      var sunday = this.date2Str(new Date(SundayTime));
      var saturday = this.date2Str(new Date(SaturdayTime));
      return [sunday, saturday];
    }
    day = day === 0 ? 7 : day;
    var oneDayTime1 = 24 * 60 * 60 * 1e3;
    var MondayTime = nowTime - (day - 1) * oneDayTime1;
    var SundayTime1 = nowTime + (7 - day) * oneDayTime1;
    var monday = this.date2Str(new Date(MondayTime));
    var sunday1 = this.date2Str(new Date(SundayTime1));
    return [monday, sunday1];
  },
  formatResultDate: function formatResultDate(date) {
    var days = _to_consumable_array(date.split("-"));
    days[2] = Utils.getNumTwoBit(Number(days[2]));
    days[3] = "".concat(days[0], "-").concat(days[1], "-").concat(days[2]);
    days[4] = Utils.getWhatDay(+days[0], +days[1], +days[2]);
    return days;
  }
};
var getCurrMonthData = function(type, year, month) {
  switch (type) {
    case "prev":
      month === 1 && (year -= 1);
      month = month === 1 ? 12 : --month;
      break;
    case "next":
      month === 12 && (year += 1);
      month = month === 12 ? 1 : ++month;
      break;
  }
  return [year, Utils.getNumTwoBit(month), Utils.getMonthDays(String(year), String(month))];
};
var getDaysStatus = function(type, year, month) {
  var days = Utils.getMonthDays("".concat(year), "".concat(month));
  if (type === "prev" && days >= 7) {
    days -= 7;
  }
  return Array.from(Array(days), function(v, k) {
    return {
      day: k + 1,
      type,
      year,
      month
    };
  });
};
var getPreMonthDates = function(type, year, month, firstDayOfWeek) {
  var preMonth = +month - 1;
  var preYear = year;
  if (preMonth <= 0) {
    preMonth = 12;
    preYear += 1;
  }
  var days = Utils.getMonthPreDay(+year, +month);
  days -= firstDayOfWeek;
  if (type === "prev" && days >= 7) {
    days -= 7;
  }
  var preDates = Utils.getMonthDays("".concat(preYear), "".concat(preMonth));
  var months = Array.from(Array(preDates), function(v, k) {
    return {
      day: k + 1,
      type,
      year: preYear,
      month: preMonth
    };
  });
  return months.slice(preDates - days);
};
function useForceUpdate() {
  var _React_useState = _sliced_to_array(taro.react_production_min.useState(), 2), updateState = _React_useState[1];
  return taro.react_production_min.useCallback(function() {
    return updateState({});
  }, []);
}
function usePropsValue(param) {
  var value = param.value, defaultValue = param.defaultValue, finalValue = param.finalValue, _param_onChange = param.onChange, onChange = _param_onChange === void 0 ? function(value2) {
  } : _param_onChange;
  var forceUpdate = useForceUpdate();
  var dfValue = defaultValue !== void 0 ? defaultValue : finalValue;
  var stateRef = taro.useRef(value !== void 0 ? value : dfValue);
  if (value !== void 0) {
    stateRef.current = value;
  }
  var setState = taro.useCallback(function(v) {
    var forceTrigger = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var prevState = stateRef.current;
    stateRef.current = v;
    if (prevState !== stateRef.current || forceTrigger) {
      forceUpdate();
      onChange === null || onChange === void 0 ? void 0 : onChange(v);
    }
  }, [value, onChange]);
  return [stateRef.current, setState];
}
var defaultProps$2 = _object_spread_props(_object_spread({}, defaultOverlayProps), {
  position: "center",
  transition: "",
  overlayStyle: {},
  overlayClassName: "",
  closeable: false,
  closeIconPosition: "top-right",
  closeIcon: "close",
  destroyOnClose: false,
  portal: null,
  overlay: true,
  round: false,
  resizable: false,
  minHeight: "",
  onOpen: function() {
  },
  onClose: function() {
  },
  onOverlayClick: function() {
    return true;
  },
  onCloseIconClick: function() {
    return true;
  },
  onTouchStart: function() {
  },
  onTouchMove: function() {
  },
  onTouchEnd: function() {
  }
});
var _zIndex = 1100;
var Popup = function(props) {
  var _$_object_spread = _object_spread({}, defaultProps$2, props), children = _$_object_spread.children, visible = _$_object_spread.visible, overlay = _$_object_spread.overlay, closeOnOverlayClick = _$_object_spread.closeOnOverlayClick, overlayStyle = _$_object_spread.overlayStyle, overlayClassName = _$_object_spread.overlayClassName, zIndex = _$_object_spread.zIndex, lockScroll = _$_object_spread.lockScroll, duration = _$_object_spread.duration, closeable = _$_object_spread.closeable, closeIconPosition = _$_object_spread.closeIconPosition, closeIcon = _$_object_spread.closeIcon, left = _$_object_spread.left, title = _$_object_spread.title, top = _$_object_spread.top, description = _$_object_spread.description, style = _$_object_spread.style, transition = _$_object_spread.transition, round = _$_object_spread.round, position = _$_object_spread.position, className = _$_object_spread.className, destroyOnClose = _$_object_spread.destroyOnClose, portal = _$_object_spread.portal, resizable = _$_object_spread.resizable, minHeight = _$_object_spread.minHeight, onOpen = _$_object_spread.onOpen, onClose = _$_object_spread.onClose, onOverlayClick = _$_object_spread.onOverlayClick, onCloseIconClick = _$_object_spread.onCloseIconClick;
  _$_object_spread.afterShow;
  _$_object_spread.afterClose;
  var onClick = _$_object_spread.onClick, onTouchStart = _$_object_spread.onTouchStart, onTouchMove = _$_object_spread.onTouchMove, onTouchEnd = _$_object_spread.onTouchEnd, closeAriaLabel = _$_object_spread.closeAriaLabel;
  var innerIndex = zIndex || _zIndex;
  var _useState = _sliced_to_array(taro.useState(innerIndex), 2), index = _useState[0], setIndex = _useState[1];
  var _useState1 = _sliced_to_array(taro.useState(visible), 2), innerVisible = _useState1[0], setInnerVisible = _useState1[1];
  var _useState2 = _sliced_to_array(taro.useState(true), 2), showChildren = _useState2[0], setShowChildren = _useState2[1];
  var _useState3 = _sliced_to_array(taro.useState(""), 2);
  _useState3[0];
  var setTransitionName = _useState3[1];
  var nodeRef = useLockScrollTaro(innerVisible && lockScroll);
  var topNodeRef = taro.react_production_min.useRef(null);
  var rootRect = taro.useRef(null);
  var touchStartRef = taro.useRef(0);
  var touchMoveDistanceRef = taro.useRef(0);
  var heightRef = taro.useRef(0);
  var defaultHeightRef = taro.useRef(0);
  var isTouching = taro.useRef(false);
  var locale = useConfig().locale;
  var classPrefix = "nut-popup";
  var overlayStyles = _object_spread({}, overlayStyle);
  var contentZIndex = harmony() ? index + 1 : index;
  var popStyles = _object_spread({
    zIndex: contentZIndex,
    minHeight
  }, style);
  var _obj;
  var popClassName = classNames(classPrefix, (_obj = {}, _define_property(_obj, "".concat(classPrefix, "-round"), round || position === "bottom"), _define_property(_obj, "".concat(classPrefix, "-").concat(position), true), _obj), className);
  var _useState4 = _sliced_to_array(taro.useState(""), 2), popupHeight = _useState4[0], setPopupHeight = _useState4[1];
  var _useState5 = _sliced_to_array(taro.useState(""), 2), topBottom = _useState5[0], setTopBottom = _useState5[1];
  var resizeStyles = function() {
    if (popupHeight !== "") {
      return {
        height: popupHeight
      };
    }
  };
  var open = function() {
    if (!innerVisible) {
      if (position === "bottom" && resizable && nodeRef.current && heightRef.current) {
        setPopupHeight(pxTransform(defaultHeightRef.current));
      }
      setInnerVisible(true);
      setIndex(++innerIndex);
    }
    if (destroyOnClose) {
      setShowChildren(true);
    }
    onOpen && onOpen();
  };
  var getPopupHeight = function() {
    return _async_to_generator(function() {
      var _nodeRef_current, rect, height;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            return [4, getRectInMultiPlatformWithoutCache(nodeRef.current)];
          case 1:
            rect = _state.sent();
            height = ((_nodeRef_current = nodeRef.current) === null || _nodeRef_current === void 0 ? void 0 : _nodeRef_current.offsetHeight) || (rect === null || rect === void 0 ? void 0 : rect.height);
            setTopBottom(pxTransform(height));
            return [2];
        }
      });
    })();
  };
  taro.useEffect(function() {
    if (innerVisible && topNodeRef.current && nodeRef.current) {
      taro.taroExports.nextTick(function() {
        taro.taroExports.nextTick(function() {
          getPopupHeight();
        });
      });
    }
  }, [innerVisible]);
  var close = function() {
    if (innerVisible) {
      setInnerVisible(false);
      if (destroyOnClose) {
        setTimeout(function() {
          setShowChildren(false);
        }, Number(duration));
      }
      onClose && onClose();
    }
  };
  var handleOverlayClick = function(e) {
    e.stopPropagation();
    if (closeOnOverlayClick && onOverlayClick(e)) {
      close();
    }
  };
  var handleCloseIconClick = function(e) {
    onCloseIconClick(e) && close();
  };
  var renderCloseIcon = function() {
    var closeClasses = classNames("".concat(classPrefix, "-title-right"), "".concat(classPrefix, "-title-right-").concat(closeIconPosition));
    return /* @__PURE__ */ taro.react_production_min.createElement(taro.react_production_min.Fragment, null, closeable && /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
      className: closeClasses,
      onClick: handleCloseIconClick,
      ariaRole: "button",
      ariaLabel: closeAriaLabel || locale.close
    }, /* @__PURE__ */ taro.react_production_min.isValidElement(closeIcon) ? closeIcon : /* @__PURE__ */ taro.react_production_min.createElement(IconSVG, null)));
  };
  var renderTop = function() {
    if (!top)
      return null;
    return /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
      className: "".concat(classPrefix, "-bottom-top"),
      ref: topNodeRef,
      style: {
        bottom: topBottom
      }
    }, top);
  };
  var renderTitle = function() {
    if (left || title || description) {
      return /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
        className: "".concat(classPrefix, "-title")
      }, position === "bottom" && /* @__PURE__ */ taro.react_production_min.createElement(taro.react_production_min.Fragment, null, left && /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
        className: "".concat(classPrefix, "-title-left")
      }, left), (title || description) && /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
        className: "".concat(classPrefix, "-title-wrapper")
      }, title && /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
        className: "".concat(classPrefix, "-title-title")
      }, title), description && /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
        className: "".concat(classPrefix, "-title-description ").concat(title ? "".concat(classPrefix, "-title-description-gap") : "")
      }, description))), renderCloseIcon());
    }
    if (closeable) {
      return renderCloseIcon();
    }
  };
  var handleTouchStart = function(event) {
    return _async_to_generator(function() {
      var _nodeRef_current, _rootRect_current, e, rect;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            if (position !== "bottom" || !resizable || !nodeRef.current)
              return [2];
            e = event;
            touchStartRef.current = e.touches[0].pageY;
            isTouching.current = true;
            return [4, getRectInMultiPlatformWithoutCache(nodeRef.current)];
          case 1:
            rect = _state.sent();
            rootRect.current = rect;
            heightRef.current = ((_nodeRef_current = nodeRef.current) === null || _nodeRef_current === void 0 ? void 0 : _nodeRef_current.offsetHeight) || ((_rootRect_current = rootRect.current) === null || _rootRect_current === void 0 ? void 0 : _rootRect_current.height) || 0;
            if (!defaultHeightRef.current)
              defaultHeightRef.current = heightRef.current;
            onTouchStart === null || onTouchStart === void 0 ? void 0 : onTouchStart(heightRef.current, e);
            return [2];
        }
      });
    })();
  };
  var handleTouchMove = function(event) {
    if (position !== "bottom" || !resizable || !nodeRef.current || !rootRect.current)
      return;
    var e = event;
    e.stopPropagation();
    touchMoveDistanceRef.current = e.touches[0].pageY - touchStartRef.current;
    var handleMove = function() {
      var min = typeof minHeight === "number" ? minHeight : parseInt(String(minHeight || 0), 10) || 0;
      var currentHeight = Math.max(min, heightRef.current - touchMoveDistanceRef.current);
      setPopupHeight(pxTransform(currentHeight));
      if (touchMoveDistanceRef.current > 0 && isTouching.current) {
        onTouchMove === null || onTouchMove === void 0 ? void 0 : onTouchMove(currentHeight, e, "down");
      } else {
        onTouchMove === null || onTouchMove === void 0 ? void 0 : onTouchMove(currentHeight, e, "up");
      }
    };
    taro._raf(handleMove);
  };
  var handleTouchEnd = function(event) {
    if (position !== "bottom" || !resizable || !nodeRef.current || !rootRect.current)
      return;
    var e = event;
    isTouching.current = false;
    var min = typeof minHeight === "number" ? minHeight : parseInt(String(minHeight || 0), 10) || 0;
    var currentHeight = Math.max(min, heightRef.current - touchMoveDistanceRef.current);
    onTouchEnd === null || onTouchEnd === void 0 ? void 0 : onTouchEnd(currentHeight, e);
  };
  var renderPop = function() {
    return /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
      ref: nodeRef,
      style: _object_spread(_object_spread_props(_object_spread({}, popStyles), {
        display: innerVisible ? (popStyles === null || popStyles === void 0 ? void 0 : popStyles.display) || "block" : "none"
      }), resizeStyles()),
      className: popClassName,
      onClick,
      catchMove: lockScroll,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchEnd
    }, renderTop(), renderTitle(), showChildren ? children : null);
  };
  var renderNode = function() {
    return /* @__PURE__ */ taro.react_production_min.createElement(taro.react_production_min.Fragment, null, overlay ? /* @__PURE__ */ taro.react_production_min.createElement(Overlay, {
      zIndex: index,
      style: overlayStyles,
      className: overlayClassName,
      visible: innerVisible,
      closeOnOverlayClick,
      lockScroll,
      duration,
      onClick: handleOverlayClick
    }) : null, renderPop());
  };
  taro.useEffect(function() {
    visible ? open() : close();
  }, [visible]);
  taro.useEffect(function() {
    setTransitionName(transition || "".concat(classPrefix, "-slide-").concat(position));
  }, [position, transition]);
  var resolveContainer = function(getContainer) {
    return (typeof getContainer === "function" ? getContainer() : getContainer) || taro.taroDocumentProvider.body;
  };
  var renderToContainer = function(getContainer, node) {
    if (getContainer) {
      var container = resolveContainer(getContainer);
      return /* @__PURE__ */ taro.createPortal(node, container);
    }
    return node;
  };
  return /* @__PURE__ */ taro.react_production_min.createElement(taro.react_production_min.Fragment, null, renderToContainer(portal, renderNode()));
};
Popup.displayName = "NutPopup";
var splitDate = function(date) {
  var split = date.indexOf("-") !== -1 ? "-" : "/";
  return date.split(split);
};
var isMultiple = function(day, days) {
  if (days.length > 0) {
    return days.some(function(item) {
      return Utils.isEqual(item, day);
    });
  }
  return false;
};
var isCurrDay = function(month, day) {
  var date = "".concat(month.curData[0], "/").concat(month.curData[1], "/").concat(day);
  return Utils.isEqual(date, Utils.date2Str(/* @__PURE__ */ new Date(), "/"));
};
var getCurrDate = function(day, month) {
  return "".concat(month.curData[0], "/").concat(month.curData[1], "/").concat(Utils.getNumTwoBit(+day.day));
};
var isStart = function(day, days) {
  return Utils.isEqual(days[0], day);
};
var isEnd = function(day, days) {
  return Utils.isEqual(days[1], day);
};
var isStartAndEnd = function(days) {
  return days.length >= 2 && Utils.isEqual(days[0], days[1]);
};
var defaultProps$1 = _object_spread_props(_object_spread({}, ComponentDefaults), {
  type: "single",
  autoBackfill: false,
  popup: true,
  title: "",
  startDate: Utils.getDay(0),
  endDate: Utils.getDay(365),
  showToday: true,
  startText: "",
  endText: "",
  confirmText: "",
  showTitle: true,
  showSubTitle: true,
  scrollAnimation: true,
  firstDayOfWeek: 0,
  disableDate: function(date) {
    return false;
  },
  renderHeaderButtons: void 0,
  renderDay: void 0,
  renderDayTop: void 0,
  renderDayBottom: void 0,
  onConfirm: function() {
  },
  onUpdate: function() {
  },
  onDayClick: function() {
  },
  onPageChange: function() {
  }
});
var CalendarItem = /* @__PURE__ */ taro.react_production_min.forwardRef(function(props, ref) {
  var locale = useConfig().locale;
  var _$_object_spread = _object_spread({}, defaultProps$1, props), style = _$_object_spread.style, className = _$_object_spread.className, children = _$_object_spread.children, popup = _$_object_spread.popup, type = _$_object_spread.type, autoBackfill = _$_object_spread.autoBackfill, title = _$_object_spread.title, defaultValue = _$_object_spread.defaultValue, startDate = _$_object_spread.startDate, endDate = _$_object_spread.endDate, showToday = _$_object_spread.showToday, startText = _$_object_spread.startText, endText = _$_object_spread.endText, confirmText = _$_object_spread.confirmText, showTitle = _$_object_spread.showTitle, showSubTitle = _$_object_spread.showSubTitle, scrollAnimation = _$_object_spread.scrollAnimation, firstDayOfWeek = _$_object_spread.firstDayOfWeek, disableDate = _$_object_spread.disableDate, renderHeaderButtons = _$_object_spread.renderHeaderButtons, renderDay = _$_object_spread.renderDay, renderDayTop = _$_object_spread.renderDayTop, renderDayBottom = _$_object_spread.renderDayBottom, renderBottomButton = _$_object_spread.renderBottomButton, value = _$_object_spread.value, onConfirm = _$_object_spread.onConfirm, onUpdate = _$_object_spread.onUpdate, onDayClick = _$_object_spread.onDayClick, onPageChange = _$_object_spread.onPageChange;
  var weekdays = locale.calendaritem.weekdays;
  var weeks = _to_consumable_array(weekdays.slice(firstDayOfWeek, 7)).concat(_to_consumable_array(weekdays.slice(0, firstDayOfWeek)));
  var monthTitle = locale.calendaritem.monthTitle;
  var _useState = _sliced_to_array(taro.useState(""), 2), yearMonthTitle = _useState[0], setYearMonthTitle = _useState[1];
  var _useState1 = _sliced_to_array(taro.useState([]), 2), monthsData = _useState1[0], setMonthsData = _useState1[1];
  var _useState2 = _sliced_to_array(taro.useState(0), 2), monthsNum = _useState2[0], setMonthsNum = _useState2[1];
  var _useState3 = _sliced_to_array(taro.useState(0), 2), translateY = _useState3[0], setTranslateY = _useState3[1];
  var _useState4 = _sliced_to_array(taro.useState([]), 2), monthDefaultRange = _useState4[0], setMonthDefaultRange = _useState4[1];
  var _useState5 = _sliced_to_array(taro.useState(0), 2), scrollTop = _useState5[0], setScrollTop = _useState5[1];
  var _useState6 = _sliced_to_array(taro.useState(false), 2), scrollWithAnimation = _useState6[0], setScrollWithAnimation = _useState6[1];
  var propStartDate = startDate || Utils.getDay(0);
  var propEndDate = endDate || Utils.getDay(365);
  var startDates = splitDate(propStartDate);
  var endDates = splitDate(propEndDate);
  var _useState7 = _sliced_to_array(taro.useState({
    currDateArray: []
  }), 1), state = _useState7[0];
  var getMonthsPanel = function() {
    return monthsPanel.current;
  };
  var getMonthsRef = function() {
    return monthsRef.current;
  };
  var resetDefaultValue = function() {
    if (defaultValue || Array.isArray(defaultValue) && defaultValue.length > 0) {
      return type !== "single" ? _to_consumable_array(defaultValue) : defaultValue;
    }
    return void 0;
  };
  var _usePropsValue = _sliced_to_array(usePropsValue({
    value,
    defaultValue: resetDefaultValue(),
    finalValue: [],
    onChange: function(val) {
    }
  }), 2), currentDate = _usePropsValue[0], setCurrentDate = _usePropsValue[1];
  var weeksPanel = taro.useRef(null);
  var monthsRef = taro.useRef(null);
  var monthsPanel = taro.useRef(null);
  var viewAreaRef = taro.useRef(null);
  var _useState8 = _sliced_to_array(taro.useState(0), 2), avgHeight = _useState8[0], setAvgHeight = _useState8[1];
  var viewHeight = 0;
  var classPrefix = "nut-calendar";
  var dayPrefix = "nut-calendar-day";
  var getMonthData = function(curData, monthNum, type2) {
    var i = 0;
    var date = curData;
    var monthData = monthsData;
    do {
      var y = parseInt(date[0], 10);
      var m = parseInt(date[1], 10);
      var days = _to_consumable_array(getPreMonthDates("prev", y, m, firstDayOfWeek)).concat(_to_consumable_array(getDaysStatus("active", y, m)));
      var cssHeight = 39 + (days.length > 35 ? 384 : 320);
      var scrollTop2 = 0;
      if (monthData.length > 0) {
        var monthEle = monthData[monthData.length - 1];
        scrollTop2 = monthEle.scrollTop + monthEle.cssHeight;
      }
      var monthInfo = {
        curData: date,
        title: monthTitle(y, m),
        monthData: days,
        cssHeight,
        scrollTop: scrollTop2
      };
      if (type2 === "next") {
        if (!endDates || !Utils.compareDate("".concat(endDates[0], "/").concat(endDates[1], "/").concat(Utils.getMonthDays(endDates[0], endDates[1])), "".concat(curData[0], "/").concat(curData[1], "/").concat(curData[2]))) {
          monthData.push(monthInfo);
        }
      } else if (!startDates || !Utils.compareDate("".concat(curData[0], "/").concat(curData[1], "/").concat(curData[2]), "".concat(startDates[0], "/").concat(startDates[1], "/01"))) {
        monthData.unshift(monthInfo);
      }
      date = getCurrMonthData("next", y, m);
    } while (i++ < monthNum);
    setMonthsData(monthData);
  };
  var setReachedYearMonthInfo = function(current) {
    var currentMonthsData = monthsData[current];
    var _currentMonthsData_curData = _sliced_to_array(currentMonthsData.curData, 2), year = _currentMonthsData_curData[0], month = _currentMonthsData_curData[1];
    if (currentMonthsData.title === yearMonthTitle)
      return;
    onPageChange && onPageChange([year, month, "".concat(year, "-").concat(month)]);
    setYearMonthTitle(currentMonthsData.title);
  };
  var setDefaultRange = function(monthNum, current) {
    var start = 0;
    var end = 0;
    if (monthNum >= 3) {
      if (current > 0 && current < monthNum) {
        start = current - 1;
        end = current + 3;
      } else if (current === 0) {
        start = current;
        end = current + 4;
      } else if (current === monthNum) {
        start = current - 2;
        end = current + 2;
      }
    } else {
      start = 0;
      end = monthNum + 2;
    }
    setMonthDefaultRange([start, end]);
    setTranslateY(monthsData[start].scrollTop);
    setReachedYearMonthInfo(current);
  };
  var getMonthNum = function() {
    var monthNum = Number(endDates[1]) - Number(startDates[1]);
    var yearNum = Number(endDates[0]) - Number(startDates[0]);
    if (yearNum > 0) {
      monthNum += 12 * yearNum;
    }
    if (monthNum < 0) {
      monthNum = 1;
    }
    setMonthsNum(monthNum);
    return monthNum;
  };
  var setDefaultDate = function() {
    var defaultData = [];
    if (type === "range" && Array.isArray(currentDate)) {
      if (currentDate.length > 0) {
        if (propStartDate && Utils.compareDate(currentDate[0], propStartDate)) {
          currentDate.splice(0, 1, propStartDate);
        }
        if (propEndDate && Utils.compareDate(propEndDate, currentDate[1])) {
          currentDate.splice(1, 1, propEndDate);
        }
        defaultData = _to_consumable_array(splitDate(currentDate[0])).concat(_to_consumable_array(splitDate(currentDate[1])));
      }
    } else if (type === "multiple" && Array.isArray(currentDate)) {
      if (currentDate.length > 0) {
        var _currentDate;
        var defaultArr = [];
        var obj = {};
        currentDate.forEach(function(item) {
          if (propStartDate && !Utils.compareDate(item, propStartDate) && propEndDate && !Utils.compareDate(propEndDate, item)) {
            if (!Object.hasOwnProperty.call(obj, item)) {
              defaultArr.push(item);
              obj[item] = item;
            }
          }
        });
        currentDate.splice(0) && (_currentDate = currentDate).push.apply(_currentDate, _to_consumable_array(defaultArr));
        defaultData = _to_consumable_array(splitDate(defaultArr[0]));
      }
    } else if (type === "week" && Array.isArray(currentDate)) {
      if (currentDate.length > 0) {
        var _currentDate1;
        var _splitDate = _sliced_to_array(splitDate(currentDate[0]), 3), y = _splitDate[0], m = _splitDate[1], d = _splitDate[2];
        var weekArr = Utils.getWeekDate(y, m, d, firstDayOfWeek);
        currentDate.splice(0) && (_currentDate1 = currentDate).push.apply(_currentDate1, _to_consumable_array(weekArr));
        if (propStartDate && Utils.compareDate(currentDate[0], propStartDate)) {
          currentDate.splice(0, 1, propStartDate);
        }
        if (propEndDate && Utils.compareDate(propEndDate, currentDate[1])) {
          currentDate.splice(1, 1, propEndDate);
        }
        defaultData = _to_consumable_array(splitDate(currentDate[0])).concat(_to_consumable_array(splitDate(currentDate[1])));
      }
    } else if (currentDate) {
      if (currentDate.length > 0) {
        if (propStartDate && Utils.compareDate(currentDate, propStartDate)) {
          defaultData = _to_consumable_array(splitDate(propStartDate));
        } else if (propEndDate && !Utils.compareDate(currentDate, propEndDate)) {
          defaultData = _to_consumable_array(splitDate(propEndDate));
        } else {
          defaultData = _to_consumable_array(splitDate(currentDate));
        }
      } else {
        defaultData = [];
      }
    }
    return defaultData;
  };
  var getCurrentIndex = function(defaultData) {
    var current = 0;
    var lastCurrent = 0;
    if (defaultData.length > 0) {
      monthsData.forEach(function(item, index2) {
        if (item.title === monthTitle(defaultData[0], defaultData[1])) {
          current = index2;
        }
        if (type === "range" || type === "week") {
          if (item.title === monthTitle(defaultData[3], defaultData[4])) {
            lastCurrent = index2;
          }
        }
      });
    } else {
      var date = /* @__PURE__ */ new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var index = monthsData.findIndex(function(item) {
        return +item.curData[0] === year && +item.curData[1] === month;
      });
      if (index > -1) {
        current = index;
      }
    }
    return {
      current,
      lastCurrent
    };
  };
  var renderCurrentDate = function() {
    var defaultData = setDefaultDate();
    var current = getCurrentIndex(defaultData);
    if (defaultData.length > 0) {
      if (type === "range") {
        chooseDay({
          day: defaultData[2],
          type: "active"
        }, monthsData[current.current], true);
        chooseDay({
          day: defaultData[5],
          type: "active"
        }, monthsData[current.lastCurrent], true);
      } else if (type === "week") {
        chooseDay({
          day: defaultData[2],
          type: "curr"
        }, monthsData[current.current], true);
      } else if (type === "multiple") {
        _to_consumable_array(currentDate).forEach(function(item) {
          var dateArr = splitDate(item);
          var currentIndex = current.current;
          monthsData.forEach(function(item2, index) {
            if (item2.title === monthTitle(dateArr[0], dateArr[1])) {
              currentIndex = index;
            }
          });
          chooseDay({
            day: dateArr[2],
            type: "active"
          }, monthsData[currentIndex], true);
        });
      } else {
        chooseDay({
          day: defaultData[2],
          type: "active"
        }, monthsData[current.current], true);
      }
    }
    return current.current;
  };
  var requestAniFrameFunc = function(current, monthNum) {
    var lastItem = monthsData[monthsData.length - 1];
    var containerHeight = lastItem.cssHeight + lastItem.scrollTop;
    requestAniFrame$1(function() {
      if (monthsRef && monthsPanel && viewAreaRef) {
        viewHeight = getMonthsRef().clientHeight;
        getMonthsPanel().style.height = "".concat(containerHeight, "px");
        getMonthsRef().scrollTop = monthsData[current].scrollTop;
        setScrollTop(monthsData[current].scrollTop);
        taro.taroExports.nextTick(function() {
          return setScrollWithAnimation(true);
        });
      }
    });
    setAvgHeight(Math.floor(containerHeight / (monthNum + 1)));
  };
  var initData = function() {
    var monthNum = getMonthNum();
    getMonthData(startDates, monthNum, "next");
    var current = renderCurrentDate();
    setDefaultRange(monthNum, current);
    requestAniFrameFunc(current, monthNum);
  };
  taro.useEffect(function() {
    initData();
  }, []);
  var resetRender = function() {
    state.currDateArray.splice(0);
    monthsData.splice(0);
    initData();
  };
  taro.useEffect(function() {
    setCurrentDate(resetDefaultValue() || []);
  }, [defaultValue]);
  taro.useEffect(function() {
    popup && resetRender();
  }, [currentDate]);
  var scrollToDate = function(date) {
    if (Utils.compareDate(date, propStartDate)) {
      date = propStartDate;
    } else if (!Utils.compareDate(date, propEndDate)) {
      date = propEndDate;
    }
    var dateArr = splitDate(date);
    monthsData.forEach(function(item, index) {
      if (item.title === monthTitle(dateArr[0], dateArr[1])) {
        var currTop = monthsData[index].scrollTop;
        if (monthsRef.current) {
          var distance = currTop - monthsRef.current.scrollTop;
          if (scrollAnimation) {
            var flag = 0;
            var interval = setInterval(function() {
              flag++;
              if (monthsRef.current) {
                var offset = distance / 10;
                monthsRef.current.scrollTop += offset;
              }
              if (flag >= 10) {
                clearInterval(interval);
                if (monthsRef.current) {
                  monthsRef.current.scrollTop = currTop;
                  setScrollTop(monthsRef.current.scrollTop);
                }
              }
            }, 40);
          } else {
            monthsRef.current.scrollTop = currTop;
            setScrollTop(monthsRef.current.scrollTop);
          }
        }
      }
    });
  };
  var monthsViewScroll = function(e) {
    if (monthsData.length <= 1) {
      return;
    }
    var scrollTop2 = e.target.scrollTop;
    taro.Taro.getEnv() === "WEB" && setScrollTop(scrollTop2);
    var current = Math.floor(scrollTop2 / avgHeight);
    if (current < 0)
      return;
    if (!monthsData[current + 1])
      return;
    var nextTop = monthsData[current + 1].scrollTop;
    var nextHeight = monthsData[current + 1].cssHeight;
    if (current === 0) {
      if (scrollTop2 >= nextTop) {
        current += 1;
      }
    } else if (current > 0 && current < monthsNum - 1) {
      if (scrollTop2 >= nextTop) {
        current += 1;
      }
      if (scrollTop2 < monthsData[current].scrollTop) {
        current -= 1;
      }
    } else {
      var viewPosition = Math.round(scrollTop2 + viewHeight);
      if (current + 1 <= monthsNum && viewPosition >= nextTop + nextHeight) {
        current += 1;
      }
      if (current >= 1 && scrollTop2 < monthsData[current - 1].scrollTop) {
        current -= 1;
      }
    }
    setDefaultRange(monthsNum, current);
  };
  taro.react_production_min.useImperativeHandle(ref, function() {
    return {
      scrollToDate
    };
  });
  var getClasses = function(day, month) {
    var dateStr = getCurrDate(day, month);
    if (day.type === "active") {
      if (propStartDate && Utils.compareDate(dateStr, propStartDate) || propEndDate && Utils.compareDate(propEndDate, dateStr)) {
        return "".concat(dayPrefix, "-disabled");
      }
      if (type === "range" || type === "week") {
        if (isStart(dateStr, currentDate) || isEnd(dateStr, currentDate)) {
          return "".concat(dayPrefix, "-active ").concat(isStart(dateStr, currentDate) ? "active-start" : "", " ").concat(isEnd(dateStr, currentDate) ? "active-end" : "");
        }
        if (Array.isArray(currentDate) && Object.values(currentDate).length === 2 && Utils.compareDate(currentDate[0], dateStr) && Utils.compareDate(dateStr, currentDate[1])) {
          if (disableDate(day)) {
            return "".concat(dayPrefix, "-choose-disabled");
          }
          return "".concat(dayPrefix, "-choose");
        }
      } else if (type === "multiple" && isMultiple(dateStr, currentDate) || !Array.isArray(currentDate) && Utils.isEqual(currentDate, dateStr)) {
        return "".concat(dayPrefix, "-active");
      }
      if (disableDate(day)) {
        return "".concat(dayPrefix, "-disabled");
      }
      return null;
    }
    return "".concat(dayPrefix, "-disabled");
  };
  var chooseDay = function(day, month, isFirst) {
    if (getClasses(day, month) === "".concat(dayPrefix, "-disabled")) {
      return;
    }
    var days = _to_consumable_array(month.curData);
    var _month_curData = _sliced_to_array(month.curData, 2), y = _month_curData[0], m = _month_curData[1];
    days[2] = typeof day.day === "number" ? Utils.getNumTwoBit(day.day) : day.day;
    days[3] = "".concat(days[0], "/").concat(days[1], "/").concat(days[2]);
    days[4] = Utils.getWhatDay(+days[0], +days[1], +days[2]);
    if (type === "multiple") {
      if (currentDate.length > 0) {
        var hasIndex = "";
        currentDate.forEach(function(item, index) {
          if (item === days[3]) {
            hasIndex = index;
          }
        });
        if (isFirst) {
          state.currDateArray.push(_to_consumable_array(days));
        } else if (hasIndex !== "") {
          currentDate.splice(hasIndex, 1);
          state.currDateArray.splice(hasIndex, 1);
        } else {
          currentDate.push(days[3]);
          state.currDateArray.push(_to_consumable_array(days));
        }
      } else {
        currentDate.push(days[3]);
        state.currDateArray = [_to_consumable_array(days)];
      }
    } else if (type === "range") {
      var curDataLength = Object.values(currentDate).length;
      if (curDataLength === 2 || curDataLength === 0) {
        Array.isArray(currentDate) && currentDate.splice(0) && currentDate.push(days[3]);
        state.currDateArray = [_to_consumable_array(days)];
      } else if (Utils.compareDate(currentDate[0], days[3])) {
        Array.isArray(currentDate) && currentDate.push(days[3]);
        state.currDateArray = _to_consumable_array(state.currDateArray).concat([_to_consumable_array(days)]);
      } else {
        Array.isArray(currentDate) && currentDate.unshift(days[3]);
        state.currDateArray = [_to_consumable_array(days)].concat(_to_consumable_array(state.currDateArray));
      }
    } else if (type === "week") {
      var _currentDate;
      var weekArr = Utils.getWeekDate(y, m, "".concat(day.day), firstDayOfWeek);
      if (propStartDate && Utils.compareDate(weekArr[0], propStartDate)) {
        weekArr.splice(0, 1, propStartDate);
      }
      if (propEndDate && Utils.compareDate(propEndDate, weekArr[1])) {
        weekArr.splice(1, 1, propEndDate);
      }
      Array.isArray(currentDate) && currentDate.splice(0) && (_currentDate = currentDate).push.apply(_currentDate, _to_consumable_array(weekArr));
      state.currDateArray = [Utils.formatResultDate(weekArr[0]), Utils.formatResultDate(weekArr[1])];
    } else {
      setCurrentDate(days[3]);
      state.currDateArray = _to_consumable_array(days);
    }
    if (!isFirst) {
      onDayClick && onDayClick(state.currDateArray);
      if (autoBackfill || !popup) {
        confirm();
      }
    }
    setMonthsData(monthsData.slice());
  };
  var confirm = function() {
    if (type === "range" && state.currDateArray.length === 2 || type !== "range") {
      var chooseData = state.currDateArray.slice(0);
      onConfirm && onConfirm(chooseData);
      if (popup) {
        onUpdate && onUpdate();
      }
    }
  };
  var _obj;
  var classes = classNames((_obj = {}, _define_property(_obj, "".concat(classPrefix, "-title"), !popup), _define_property(_obj, "".concat(classPrefix, "-nofooter"), !!autoBackfill), _obj), classPrefix, className);
  var _obj1;
  var headerClasses = classNames((_obj1 = {}, _define_property(_obj1, "".concat(classPrefix, "-header"), true), _define_property(_obj1, "".concat(classPrefix, "-header-title"), !popup), _obj1));
  var isStartTip = function(day, month) {
    return (type === "range" || type === "week") && day.type === "active" && isStart(getCurrDate(day, month), currentDate);
  };
  var isEndTip = function(day, month) {
    return currentDate.length >= 2 && (type === "range" || type === "week") && day.type === "active" && isEnd(getCurrDate(day, month), currentDate);
  };
  var renderHeader = function() {
    return /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
      className: headerClasses
    }, showTitle && /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
      className: "".concat(classPrefix, "-title")
    }, title || locale.calendaritem.title), renderHeaderButtons && /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
      className: "".concat(classPrefix, "-header-buttons")
    }, renderHeaderButtons()), showSubTitle && /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
      className: "".concat(classPrefix, "-sub-title")
    }, yearMonthTitle), /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
      className: "".concat(classPrefix, "-weeks"),
      ref: weeksPanel
    }, weeks.map(function(item) {
      return /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
        className: "".concat(classPrefix, "-week-item"),
        key: item
      }, item);
    })));
  };
  var renderContent = function() {
    return /* @__PURE__ */ taro.react_production_min.createElement(taro.ScrollView, {
      scrollTop,
      scrollY: true,
      type: "list",
      scrollWithAnimation,
      className: "".concat(classPrefix, "-content"),
      onScroll: monthsViewScroll,
      ref: monthsRef
    }, /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
      className: "".concat(classPrefix, "-pannel"),
      ref: monthsPanel
    }, /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
      className: "viewArea",
      ref: viewAreaRef,
      style: {
        transform: "translateY(".concat(translateY, "px)")
      }
    }, monthsData.slice(monthDefaultRange[0], monthDefaultRange[1]).map(function(month, key) {
      return /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
        className: "".concat(classPrefix, "-month"),
        key
      }, /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
        className: "".concat(classPrefix, "-month-title")
      }, month.title), /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
        className: "".concat(classPrefix, "-days")
      }, month.monthData.map(function(day, i) {
        return /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
          className: ["".concat(classPrefix, "-day"), getClasses(day, month)].join(" "),
          onClick: function() {
            chooseDay(day, month);
          },
          key: i
        }, /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
          className: "".concat(classPrefix, "-day-day")
        }, renderDay ? renderDay(day) : day.day), !isStartTip(day, month) && renderDayTop && /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
          className: "".concat(classPrefix, "-day-info-top")
        }, renderDayTop(day)), !isStartTip(day, month) && !isEndTip(day, month) && renderDayBottom && /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
          className: "".concat(classPrefix, "-day-info-bottom")
        }, renderDayBottom(day)), !isStartTip(day, month) && !isEndTip(day, month) && !renderDayBottom && showToday && isCurrDay(month, day.day) && /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
          className: "".concat(classPrefix, "-day-info-curr")
        }, locale.calendaritem.today), isStartTip(day, month) && /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
          className: "".concat(classPrefix, "-day-info ").concat(isStartAndEnd(currentDate) ? "".concat(classPrefix, "-day-info-top") : "")
        }, startText || locale.calendaritem.start), isEndTip(day, month) && /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
          className: "".concat(classPrefix, "-day-info")
        }, endText || locale.calendaritem.end));
      })));
    }))));
  };
  var renderFooter = function() {
    return /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
      className: "nut-calendar-footer"
    }, children, /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
      onClick: confirm
    }, renderBottomButton ? renderBottomButton() : /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
      className: "calendar-confirm-btn"
    }, confirmText || locale.confirm)));
  };
  return /* @__PURE__ */ taro.react_production_min.createElement(taro.View, {
    className: classes,
    style
  }, renderHeader(), renderContent(), popup && !autoBackfill ? renderFooter() : "");
});
CalendarItem.displayName = "NutCalendarItem";
var defaultProps = _object_spread_props(_object_spread({}, ComponentDefaults), {
  type: "single",
  autoBackfill: false,
  popup: true,
  visible: false,
  title: "",
  defaultValue: "",
  startDate: Utils.getDay(0),
  endDate: Utils.getDay(365),
  showToday: true,
  startText: "",
  endText: "",
  confirmText: "",
  showTitle: true,
  showSubTitle: true,
  scrollAnimation: true,
  firstDayOfWeek: 0,
  disableDate: function(date) {
    return false;
  },
  renderHeaderButtons: void 0,
  renderDay: void 0,
  renderDayTop: void 0,
  renderDayBottom: void 0,
  onClose: function() {
  },
  onConfirm: function(param) {
  },
  onDayClick: function(data) {
  },
  onPageChange: function(param) {
  }
});
var Calendar = /* @__PURE__ */ taro.react_production_min.forwardRef(function(props, ref) {
  var locale = useConfig().locale;
  var _$_object_spread = _object_spread({}, defaultProps, props), style = _$_object_spread.style, className = _$_object_spread.className, children = _$_object_spread.children, popup = _$_object_spread.popup, visible = _$_object_spread.visible, type = _$_object_spread.type, autoBackfill = _$_object_spread.autoBackfill, title = _$_object_spread.title, defaultValue = _$_object_spread.defaultValue, startDate = _$_object_spread.startDate, endDate = _$_object_spread.endDate, showToday = _$_object_spread.showToday, startText = _$_object_spread.startText, endText = _$_object_spread.endText, confirmText = _$_object_spread.confirmText, showTitle = _$_object_spread.showTitle, showSubTitle = _$_object_spread.showSubTitle, scrollAnimation = _$_object_spread.scrollAnimation, firstDayOfWeek = _$_object_spread.firstDayOfWeek, closeIcon = _$_object_spread.closeIcon, disableDate = _$_object_spread.disableDate, renderHeaderButtons = _$_object_spread.renderHeaderButtons, renderBottomButton = _$_object_spread.renderBottomButton, renderDay = _$_object_spread.renderDay, renderDayTop = _$_object_spread.renderDayTop, renderDayBottom = _$_object_spread.renderDayBottom, onClose = _$_object_spread.onClose, onConfirm = _$_object_spread.onConfirm, onDayClick = _$_object_spread.onDayClick, onPageChange = _$_object_spread.onPageChange;
  var calendarRef = taro.useRef(null);
  var close = function() {
    onClose && onClose();
  };
  var choose = function(param) {
    close();
    onConfirm && onConfirm(param);
  };
  var closePopup = function() {
    close();
  };
  var select = function(param) {
    onDayClick && onDayClick(param);
  };
  var scrollToDate = function(date) {
    var _calendarRef_current;
    (_calendarRef_current = calendarRef.current) === null || _calendarRef_current === void 0 ? void 0 : _calendarRef_current.scrollToDate(date);
  };
  var yearMonthChange = function(param) {
    onPageChange && onPageChange(param);
  };
  taro.react_production_min.useImperativeHandle(ref, function() {
    return {
      scrollToDate
    };
  });
  var renderItem = function() {
    return /* @__PURE__ */ taro.react_production_min.createElement(CalendarItem, {
      ref: calendarRef,
      style,
      className,
      children,
      type,
      autoBackfill,
      popup,
      title: title || locale.calendaritem.title,
      defaultValue,
      startDate,
      endDate,
      showToday,
      startText: startText || locale.calendaritem.start,
      endText: endText || locale.calendaritem.end,
      confirmText: confirmText || locale.calendaritem.confirm,
      showTitle,
      showSubTitle,
      scrollAnimation,
      firstDayOfWeek,
      disableDate,
      renderHeaderButtons,
      renderBottomButton,
      renderDay,
      renderDayTop,
      renderDayBottom,
      onConfirm: choose,
      onDayClick: select,
      onPageChange: yearMonthChange
    });
  };
  return /* @__PURE__ */ taro.react_production_min.createElement(taro.react_production_min.Fragment, null, popup ? /* @__PURE__ */ taro.react_production_min.createElement(Popup, {
    className: "nut-calendar-popup",
    visible,
    position: "bottom",
    round: true,
    closeable: true,
    destroyOnClose: true,
    onOverlayClick: closePopup,
    onCloseIconClick: closePopup,
    style: {
      height: "83%"
    },
    closeIcon
  }, renderItem()) : renderItem());
});
Calendar.displayName = "NutCalendar";
exports.Calendar = Calendar;
exports.dayjs = dayjs;
//# sourceMappingURL=vendors.js.map
