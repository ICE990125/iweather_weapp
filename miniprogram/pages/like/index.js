Page({
  data: {
    paddingTop: 0,
    cities: [],
    navIcon: '',
  },
  onLoad: function () {
    const app = getApp();
    const { navHeight, statusBarHeight, isPC } = app.globalData;

    // 从缓存中获取城市信息
    let cities;
    try {
      cities = wx.getStorageSync('cites');
      if (cities) {
        cities = JSON.parse(cities);
      } else {
        cities = [];
      }
    } catch (err) {
      console.error(`从缓存中获取城市列表失败, 原因: ${err}`);
    }

    this.setData({
      paddingTop: navHeight + statusBarHeight,
      cities,
      isPC,
    });
  },
  back() {
    wx.navigateBack({
      delta: 1,
    });
  },
  searchPage() {
    wx.navigateTo({
      url: '../search/index',
    });
  },
});
