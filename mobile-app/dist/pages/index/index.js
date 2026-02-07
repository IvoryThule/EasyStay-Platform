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
const taro = require("../../taro.js");
const vendors = require("../../vendors.js");
require("../../common.js");
require("../../babelHelpers.js");
const index = "";
vendors.dayjs.locale("zh-cn");
const QUICK_TAGS = [
  { id: 1, icon: "⭐", label: "五星级", type: "star" },
  { id: 2, icon: "📱", label: "网红博主推荐", type: "influencer" },
  { id: 3, icon: "👨‍👩‍👧‍👦", label: "亲子乐园", type: "family" },
  { id: 4, icon: "🎨", label: "设计精品", type: "design" },
  { id: 5, icon: "🏊", label: "无边泳池", type: "pool" },
  { id: 6, icon: "🍽️", label: "米其林餐厅", type: "restaurant" }
];
const RECENT_HOTELS = [
  {
    id: 1,
    name: "上海中心J酒店",
    price: 2880,
    rating: 4.9,
    reviews: 1280,
    image: "https://modao.cc/agent-py/media/generated_images/2026-02-04/a55fae9d04fa47b383be512902d9f2b1.jpg",
    tags: ["五星级", "江景房", "行政酒廊"]
  },
  {
    id: 2,
    name: "和平饭店",
    price: 1920,
    rating: 4.8,
    reviews: 2456,
    image: "https://modao.cc/agent-py/media/generated_images/2026-02-04/f3b3ec4f3810412ca44d6a60c5ae0652.jpg",
    tags: ["历史建筑", "外滩景观", "老上海风情"]
  },
  {
    id: 3,
    name: "养云安缦",
    price: 4500,
    rating: 4.9,
    reviews: 892,
    image: "https://modao.cc/agent-py/media/generated_images/2026-02-04/d6da6cead0c74fa3bb26f2f684f5386a.jpg",
    tags: ["奢华度假", "园林景观", "私密性佳"]
  },
  {
    id: 4,
    name: "宝格丽酒店",
    price: 3800,
    rating: 4.9,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80",
    tags: ["奢华品牌", "城市景观", "高端服务"]
  }
];
const POPULAR_CITIES = [
  { id: 1, name: "上海", hotels: 1280 },
  { id: 2, name: "北京", hotels: 980 },
  { id: 3, name: "广州", hotels: 760 },
  { id: 4, name: "深圳", hotels: 820 },
  { id: 5, name: "杭州", hotels: 540 },
  { id: 6, name: "成都", hotels: 630 }
];
function Index() {
  const [searchParams, setSearchParams] = taro.useState({
    city: "上海市",
    checkInDate: vendors.dayjs().format("MM月DD日"),
    checkInWeekday: vendors.dayjs().format("dddd"),
    checkOutDate: vendors.dayjs().add(1, "day").format("MM月DD日"),
    checkOutWeekday: vendors.dayjs().add(1, "day").format("dddd"),
    nights: 1,
    keyword: "",
    guests: 2,
    rooms: 1
  });
  const [activeTag, setActiveTag] = taro.useState(null);
  taro.useState(false);
  const [showCityPicker, setShowCityPicker] = taro.useState(false);
  const [currentCity, setCurrentCity] = taro.useState("上海市");
  const [loading, setLoading] = taro.useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = taro.useState(false);
  taro.taroExports.useLoad(() => {
    console.log("页面加载完成");
    initPageData();
  });
  const initPageData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const handleConfirmDate = (param) => {
    const [start, end] = param;
    const startDate = vendors.dayjs(`${start[0]}-${start[1]}-${start[2]}`);
    const endDate = vendors.dayjs(`${end[0]}-${end[1]}-${end[2]}`);
    setSearchParams((prev) => __spreadProps(__spreadValues({}, prev), {
      checkInDate: startDate.format("MM月DD日"),
      checkInWeekday: startDate.format("dddd"),
      checkOutDate: endDate.format("MM月DD日"),
      checkOutWeekday: endDate.format("dddd"),
      nights: endDate.diff(startDate, "day")
      // 计算差值
    }));
    setIsCalendarVisible(false);
  };
  const handleSearch = () => {
    console.log("搜索参数:", searchParams);
    if (!searchParams.keyword.trim() && searchParams.city === "请选择") {
      taro.Taro.showToast({
        title: "请选择目的地或输入关键词",
        icon: "none",
        duration: 2e3
      });
      return;
    }
    taro.taroExports.navigateTo({
      url: `/pages/search-result/index?city=${encodeURIComponent(searchParams.city)}&keyword=${encodeURIComponent(searchParams.keyword)}`
    });
  };
  const handleCitySelect = (city) => {
    setCurrentCity(city);
    setSearchParams((prev) => __spreadProps(__spreadValues({}, prev), {
      city
    }));
    setShowCityPicker(false);
  };
  const openCalendar = (e) => {
    console.log("点击了日期区域");
    setIsCalendarVisible(true);
  };
  const handleTagClick = (tag) => {
    setActiveTag(tag.id);
    console.log("选中标签:", tag);
    switch (tag.type) {
      case "star":
        taro.taroExports.navigateTo({
          url: "/pages/filter/index?type=star&value=5"
        });
        break;
      case "family":
        taro.taroExports.navigateTo({
          url: "/pages/filter/index?type=facility&value=family"
        });
        break;
      default:
        setSearchParams((prev) => __spreadProps(__spreadValues({}, prev), {
          keyword: tag.label
        }));
    }
  };
  const handleHotelClick = (hotel) => {
    console.log("点击酒店:", hotel.name);
    taro.taroExports.navigateTo({
      url: `/pages/hotel-detail/index?id=${hotel.id}`
    });
  };
  const clearHistory = () => {
    taro.Taro.showModal({
      title: "确认清空",
      content: "确定要清空浏览历史吗？",
      success: (res) => {
        if (res.confirm) {
          taro.Taro.showToast({
            title: "已清空历史记录",
            icon: "success",
            duration: 1500
          });
        }
      }
    });
  };
  const useMyLocation = () => {
    taro.Taro.getLocation({
      type: "wgs84",
      success: (res) => {
        console.log("当前位置:", res);
        const city = "上海市";
        setCurrentCity(city);
        setSearchParams((prev) => __spreadProps(__spreadValues({}, prev), {
          city
        }));
        taro.Taro.showToast({
          title: "已获取当前位置",
          icon: "success",
          duration: 1500
        });
      },
      fail: (err) => {
        console.error("获取位置失败:", err);
        taro.Taro.showToast({
          title: "获取位置失败，请检查权限",
          icon: "error",
          duration: 2e3
        });
      }
    });
  };
  const renderPopularCities = () => {
    return /* @__PURE__ */ taro.jsxs(taro.View, { className: "popular-cities", children: [
      /* @__PURE__ */ taro.jsxs(taro.View, { className: "section-title", children: [
        /* @__PURE__ */ taro.jsx(taro.Text, { className: "title", children: "热门城市" }),
        /* @__PURE__ */ taro.jsx(taro.Text, { className: "subtitle", children: "探索更多目的地" })
      ] }),
      /* @__PURE__ */ taro.jsx(
        taro.ScrollView,
        {
          className: "cities-scroll",
          scrollX: true,
          enhanced: true,
          showScrollbar: false,
          children: /* @__PURE__ */ taro.jsx(taro.View, { className: "cities-container", children: POPULAR_CITIES.map(
            (city) => /* @__PURE__ */ taro.jsxs(
              taro.View,
              {
                className: `city-item ${currentCity.includes(city.name) ? "active" : ""}`,
                onClick: () => handleCitySelect(city.name),
                children: [
                  /* @__PURE__ */ taro.jsx(taro.Text, { className: "city-name", children: city.name }),
                  /* @__PURE__ */ taro.jsxs(taro.Text, { className: "city-count", children: [
                    city.hotels,
                    "家酒店"
                  ] })
                ]
              },
              city.id
            )
          ) })
        }
      )
    ] });
  };
  return /* @__PURE__ */ taro.jsxs(taro.View, { className: "page-container", children: [
    /* @__PURE__ */ taro.jsxs(
      taro.ScrollView,
      {
        className: "main-content",
        scrollY: true,
        enhanced: true,
        showScrollbar: false,
        children: [
          /* @__PURE__ */ taro.jsxs(
            taro.Swiper,
            {
              className: "banner-swiper",
              indicatorColor: "#999",
              indicatorActiveColor: "#3B82F6",
              circular: true,
              indicatorDots: true,
              autoplay: true,
              interval: 4e3,
              children: [
                /* @__PURE__ */ taro.jsx(taro.SwiperItem, { children: /* @__PURE__ */ taro.jsxs(
                  taro.View,
                  {
                    className: "banner-item",
                    onClick: () => taro.taroExports.navigateTo({ url: "/pages/promotion/index?id=1" }),
                    children: [
                      /* @__PURE__ */ taro.jsx(
                        taro.Image,
                        {
                          className: "banner-image",
                          src: "https://miaobi-lite.bj.bcebos.com/miaobi/5mao/b%275LiJ5LqaMTgw5bqm5rW35pmv6YWS5bqXXzE3MzA3NTcyOTkuMTk3MDIzNA%3D%3D%27/0.png",
                          mode: "aspectFill"
                        }
                      ),
                      /* @__PURE__ */ taro.jsxs(taro.View, { className: "banner-content", children: [
                        /* @__PURE__ */ taro.jsx(taro.View, { className: "promotion-tag", children: /* @__PURE__ */ taro.jsx(taro.Text, { className: "tag-text", children: "限时特惠" }) }),
                        /* @__PURE__ */ taro.jsx(taro.Text, { className: "banner-title", children: "2026春季大促：海景房5折起" }),
                        /* @__PURE__ */ taro.jsx(taro.Text, { className: "banner-subtitle", children: "感受呼吸间的海滨浪漫" })
                      ] })
                    ]
                  }
                ) }),
                /* @__PURE__ */ taro.jsx(taro.SwiperItem, { children: /* @__PURE__ */ taro.jsxs(
                  taro.View,
                  {
                    className: "banner-item",
                    onClick: () => taro.taroExports.navigateTo({ url: "/pages/promotion/index?id=2" }),
                    children: [
                      /* @__PURE__ */ taro.jsx(
                        taro.Image,
                        {
                          className: "banner-image",
                          src: "https://digital.ihg.com.cn/is/image/ihg/crowne-plaza-lanzhou-7876381686-4x3",
                          mode: "aspectFill"
                        }
                      ),
                      /* @__PURE__ */ taro.jsxs(taro.View, { className: "banner-content", children: [
                        /* @__PURE__ */ taro.jsx(taro.View, { className: "promotion-tag tag-premium", children: /* @__PURE__ */ taro.jsx(taro.Text, { className: "tag-text", children: "会员专享" }) }),
                        /* @__PURE__ */ taro.jsx(taro.Text, { className: "banner-title", children: "白金会员专享：房型免费升级" }),
                        /* @__PURE__ */ taro.jsx(taro.Text, { className: "banner-subtitle", children: "尊享奢华住宿体验" })
                      ] })
                    ]
                  }
                ) }),
                /* @__PURE__ */ taro.jsx(taro.SwiperItem, { children: /* @__PURE__ */ taro.jsxs(
                  taro.View,
                  {
                    className: "banner-item",
                    onClick: () => taro.taroExports.navigateTo({ url: "/pages/promotion/index?id=3" }),
                    children: [
                      /* @__PURE__ */ taro.jsx(
                        taro.Image,
                        {
                          className: "banner-image",
                          src: "https://plus.unsplash.com/premium_photo-1661963123153-5471a95b7042?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                          mode: "aspectFill"
                        }
                      ),
                      /* @__PURE__ */ taro.jsxs(taro.View, { className: "banner-content", children: [
                        /* @__PURE__ */ taro.jsx(taro.View, { className: "promotion-tag tag-flash", children: /* @__PURE__ */ taro.jsx(taro.Text, { className: "tag-text", children: "闪购" }) }),
                        /* @__PURE__ */ taro.jsx(taro.Text, { className: "banner-title", children: "周末闪购：精品酒店299元起" }),
                        /* @__PURE__ */ taro.jsx(taro.Text, { className: "banner-subtitle", children: "限时抢购，手慢无" })
                      ] })
                    ]
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ taro.jsx(taro.View, { className: "search-section", children: /* @__PURE__ */ taro.jsxs(taro.View, { className: "search-card", children: [
            /* @__PURE__ */ taro.jsxs(taro.View, { className: "search-row location-row", children: [
              /* @__PURE__ */ taro.jsxs(
                taro.View,
                {
                  className: "location-select",
                  onClick: () => setShowCityPicker(!showCityPicker),
                  children: [
                    /* @__PURE__ */ taro.jsx(taro.Text, { className: "location-icon", children: "📍" }),
                    /* @__PURE__ */ taro.jsxs(taro.View, { className: "location-info", children: [
                      /* @__PURE__ */ taro.jsx(taro.Text, { className: "location-label", children: "目的地" }),
                      /* @__PURE__ */ taro.jsx(taro.Text, { className: "location-value", children: searchParams.city })
                    ] }),
                    /* @__PURE__ */ taro.jsx(taro.Text, { className: "arrow-icon", children: "›" })
                  ]
                }
              ),
              /* @__PURE__ */ taro.jsxs(
                taro.Button,
                {
                  className: "location-btn",
                  onClick: useMyLocation,
                  children: [
                    /* @__PURE__ */ taro.jsx(taro.Text, { className: "btn-icon", children: "📍" }),
                    /* @__PURE__ */ taro.jsx(taro.Text, { className: "btn-text", children: "我的位置" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ taro.jsxs(
              taro.View,
              {
                className: "search-row date-row",
                onClick: openCalendar,
                hoverClass: "date-row-hover",
                children: [
                  /* @__PURE__ */ taro.jsxs(taro.View, { className: "date-item checkin", children: [
                    /* @__PURE__ */ taro.jsx(taro.Text, { className: "date-label", children: "入住日期" }),
                    /* @__PURE__ */ taro.jsxs(taro.View, { className: "date-info", children: [
                      /* @__PURE__ */ taro.jsx(taro.Text, { className: "date-value", children: searchParams.checkInDate }),
                      /* @__PURE__ */ taro.jsx(taro.Text, { className: "date-weekday", children: searchParams.checkInWeekday })
                    ] })
                  ] }),
                  /* @__PURE__ */ taro.jsx(taro.View, { className: "night-count", children: /* @__PURE__ */ taro.jsxs(taro.Text, { className: "night-text", children: [
                    searchParams.nights,
                    "晚"
                  ] }) }),
                  /* @__PURE__ */ taro.jsxs(
                    taro.View,
                    {
                      className: "date-item checkout",
                      children: [
                        /* @__PURE__ */ taro.jsx(taro.Text, { className: "date-label", children: "离店日期" }),
                        /* @__PURE__ */ taro.jsxs(taro.View, { className: "date-info", children: [
                          /* @__PURE__ */ taro.jsx(taro.Text, { className: "date-value", children: searchParams.checkOutDate }),
                          /* @__PURE__ */ taro.jsx(taro.Text, { className: "date-weekday", children: searchParams.checkOutWeekday })
                        ] })
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ taro.jsxs(taro.View, { className: "search-row keyword-row", children: [
              /* @__PURE__ */ taro.jsx(taro.Text, { className: "search-icon", children: "🔍" }),
              /* @__PURE__ */ taro.jsx(
                taro.Input,
                {
                  className: "search-input",
                  placeholder: "关键字/位置/品牌/酒店名",
                  placeholderClass: "placeholder",
                  value: searchParams.keyword,
                  onInput: (e) => setSearchParams((prev) => __spreadProps(__spreadValues({}, prev), {
                    keyword: e.detail.value
                  })),
                  confirmType: "search",
                  onConfirm: handleSearch
                }
              ),
              searchParams.keyword && /* @__PURE__ */ taro.jsx(
                taro.Text,
                {
                  className: "clear-icon",
                  onClick: () => setSearchParams((prev) => __spreadProps(__spreadValues({}, prev), { keyword: "" })),
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ taro.jsxs(taro.View, { className: "search-row rooms-row", children: [
              /* @__PURE__ */ taro.jsx(taro.Text, { className: "rooms-label", children: "房间数量" }),
              /* @__PURE__ */ taro.jsxs(taro.View, { className: "rooms-controls", children: [
                /* @__PURE__ */ taro.jsx(
                  taro.Button,
                  {
                    className: "control-btn minus",
                    onClick: () => setSearchParams((prev) => __spreadProps(__spreadValues({}, prev), {
                      rooms: Math.max(1, prev.rooms - 1)
                    })),
                    children: "-"
                  }
                ),
                /* @__PURE__ */ taro.jsxs(taro.Text, { className: "rooms-count", children: [
                  searchParams.rooms,
                  "间"
                ] }),
                /* @__PURE__ */ taro.jsx(
                  taro.Button,
                  {
                    className: "control-btn plus",
                    onClick: () => setSearchParams((prev) => __spreadProps(__spreadValues({}, prev), {
                      rooms: prev.rooms + 1
                    })),
                    children: "+"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ taro.jsx(
              taro.Button,
              {
                className: "search-button",
                onClick: handleSearch,
                loading,
                disabled: loading,
                children: /* @__PURE__ */ taro.jsx(taro.Text, { className: "button-text", children: loading ? "搜索中..." : "开始搜索" })
              }
            )
          ] }) }),
          renderPopularCities(),
          /* @__PURE__ */ taro.jsxs(taro.View, { className: "quick-tags-section", children: [
            /* @__PURE__ */ taro.jsxs(taro.View, { className: "section-header", children: [
              /* @__PURE__ */ taro.jsx(taro.Text, { className: "section-title", children: "为您推荐" }),
              /* @__PURE__ */ taro.jsx(taro.Text, { className: "section-subtitle", children: "智能推荐热门筛选" })
            ] }),
            /* @__PURE__ */ taro.jsx(
              taro.ScrollView,
              {
                className: "tags-scroll",
                scrollX: true,
                enhanced: true,
                showScrollbar: false,
                children: /* @__PURE__ */ taro.jsx(taro.View, { className: "tags-container", children: QUICK_TAGS.map(
                  (tag) => /* @__PURE__ */ taro.jsxs(
                    taro.View,
                    {
                      className: `tag-item ${activeTag === tag.id ? "active" : ""}`,
                      onClick: () => handleTagClick(tag),
                      children: [
                        /* @__PURE__ */ taro.jsx(taro.Text, { className: "tag-icon", children: tag.icon }),
                        /* @__PURE__ */ taro.jsx(taro.Text, { className: "tag-label", children: tag.label })
                      ]
                    },
                    tag.id
                  )
                ) })
              }
            )
          ] }),
          /* @__PURE__ */ taro.jsxs(taro.View, { className: "recent-section", children: [
            /* @__PURE__ */ taro.jsxs(taro.View, { className: "section-header", children: [
              /* @__PURE__ */ taro.jsxs(taro.View, { className: "section-title-wrapper", children: [
                /* @__PURE__ */ taro.jsx(taro.Text, { className: "section-title", children: "最近看过" }),
                /* @__PURE__ */ taro.jsx(taro.Text, { className: "section-badge", children: RECENT_HOTELS.length })
              ] }),
              /* @__PURE__ */ taro.jsx(
                taro.Text,
                {
                  className: "clear-history",
                  onClick: clearHistory,
                  children: "清空历史"
                }
              )
            ] }),
            /* @__PURE__ */ taro.jsx(
              taro.ScrollView,
              {
                className: "hotels-scroll",
                scrollX: true,
                enhanced: true,
                showScrollbar: false,
                children: /* @__PURE__ */ taro.jsx(taro.View, { className: "hotels-container", children: RECENT_HOTELS.map(
                  (hotel) => /* @__PURE__ */ taro.jsxs(
                    taro.View,
                    {
                      className: "hotel-card",
                      onClick: () => handleHotelClick(hotel),
                      children: [
                        /* @__PURE__ */ taro.jsx(
                          taro.Image,
                          {
                            className: "hotel-image",
                            src: hotel.image,
                            mode: "aspectFill"
                          }
                        ),
                        /* @__PURE__ */ taro.jsxs(taro.View, { className: "hotel-info", children: [
                          /* @__PURE__ */ taro.jsx(taro.Text, { className: "hotel-name", children: hotel.name }),
                          /* @__PURE__ */ taro.jsxs(taro.View, { className: "hotel-rating", children: [
                            /* @__PURE__ */ taro.jsx(taro.Text, { className: "rating-star", children: "⭐" }),
                            /* @__PURE__ */ taro.jsx(taro.Text, { className: "rating-value", children: hotel.rating }),
                            /* @__PURE__ */ taro.jsxs(taro.Text, { className: "rating-reviews", children: [
                              "(",
                              hotel.reviews,
                              "条评价)"
                            ] })
                          ] }),
                          /* @__PURE__ */ taro.jsx(taro.View, { className: "hotel-tags", children: hotel.tags.slice(0, 2).map(
                            (tag, index2) => /* @__PURE__ */ taro.jsx(taro.Text, { className: "hotel-tag", children: tag }, index2)
                          ) }),
                          /* @__PURE__ */ taro.jsxs(taro.View, { className: "hotel-price", children: [
                            /* @__PURE__ */ taro.jsx(taro.Text, { className: "price-symbol", children: "¥" }),
                            /* @__PURE__ */ taro.jsx(taro.Text, { className: "price-value", children: hotel.price.toLocaleString() }),
                            /* @__PURE__ */ taro.jsx(taro.Text, { className: "price-unit", children: "起/晚" })
                          ] })
                        ] })
                      ]
                    },
                    hotel.id
                  )
                ) })
              }
            )
          ] }),
          /* @__PURE__ */ taro.jsx(taro.View, { className: "bottom-spacing" })
        ]
      }
    ),
    isCalendarVisible && /* @__PURE__ */ taro.jsx(
      vendors.Calendar,
      {
        visible: isCalendarVisible,
        type: "range",
        startDate: vendors.dayjs().format("YYYY-MM-DD"),
        endDate: vendors.dayjs().add(6, "month").format("YYYY-MM-DD"),
        onClose: () => setIsCalendarVisible(false),
        onConfirm: handleConfirmDate
      }
    ),
    loading && /* @__PURE__ */ taro.jsx(taro.View, { className: "loading-overlay", children: /* @__PURE__ */ taro.jsxs(taro.View, { className: "loading-content", children: [
      /* @__PURE__ */ taro.jsx(taro.View, { className: "loading-spinner" }),
      /* @__PURE__ */ taro.jsx(taro.Text, { className: "loading-text", children: "加载中..." })
    ] }) }),
    showCityPicker && /* @__PURE__ */ taro.jsx(taro.View, { className: "city-picker-overlay", onClick: () => setShowCityPicker(false), children: /* @__PURE__ */ taro.jsxs(taro.View, { className: "city-picker", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ taro.jsxs(taro.View, { className: "picker-header", children: [
        /* @__PURE__ */ taro.jsx(taro.Text, { className: "picker-title", children: "选择城市" }),
        /* @__PURE__ */ taro.jsx(
          taro.Text,
          {
            className: "picker-close",
            onClick: () => setShowCityPicker(false),
            children: "✕"
          }
        )
      ] }),
      /* @__PURE__ */ taro.jsx(taro.ScrollView, { className: "picker-list", scrollY: true, children: POPULAR_CITIES.map(
        (city) => /* @__PURE__ */ taro.jsxs(
          taro.View,
          {
            className: `picker-item ${currentCity.includes(city.name) ? "selected" : ""}`,
            onClick: () => handleCitySelect(city.name),
            children: [
              /* @__PURE__ */ taro.jsx(taro.Text, { className: "picker-item-name", children: city.name }),
              /* @__PURE__ */ taro.jsxs(taro.Text, { className: "picker-item-count", children: [
                city.hotels,
                "家酒店"
              ] })
            ]
          },
          city.id
        )
      ) })
    ] }) }),
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
Page(taro.createPageConfig(Index, "pages/index/index", { root: { cn: [] } }, config || {}));
//# sourceMappingURL=index.js.map
