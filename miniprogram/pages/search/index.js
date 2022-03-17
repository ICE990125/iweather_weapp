import suggestions from './suggestions';

const app = getApp();

Page({
  data: {
    paddingTop: 0,
    value: '',
    placeholder: '例如 北京市',
    cities: [],
    isOpen: false, // 是否打开抽屉
    search: [], // 搜索结果
  },
  onLoad: function () {
    const app = getApp();
    const { navHeight, statusBarHeight, currentLocationUuid } = app.globalData;
    const cities = suggestions();

    this.setData({
      paddingTop: navHeight + statusBarHeight,
      cities,
      // 判断是否存在当前城市的 uuid
      showCurrent: currentLocationUuid ? true : false,
    });
  },
  back() {
    wx.navigateBack({
      delta: 1,
    });
  },
  // 默认建议
  select(e) {
    const index = e.currentTarget.dataset.index;
    const loc = this.data.cities[index];
    const latitude = loc.lat;
    const longitude = loc.lng;
    const name = loc.name;

    wx.reLaunch({
      url: `../home/index?lat=${latitude}&lon=${longitude}&name=${name}`,
    });
  },
  // Geo 搜索后
  GeoSelect(e) {
    const index = e.currentTarget.dataset.index;
    const loc = this.data.search[index];

    const latitude = loc.lat;
    const longitude = loc.lon;
    const name = `${loc.adm1}-${loc.name}`;

    wx.reLaunch({
      url: `../home/index?lat=${latitude}&lon=${longitude}&name=${name}`,
    });
  },
  // 搜索建议
  getInput(e) {
    const value = e.detail.value;
    if (value !== '') {
      app.globalData.qqMap
        .getSuggestions(value)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          wx.showToast({
            title: err.errMsg,
            icon: 'none',
            duration: 2000,
          });
        });
    }
  },
  // 地图选点
  chooseLocation() {
    wx.chooseLocation()
      .then(res => {
        if (res.address !== '') {
          console.log(`用户选择了地址: ${res.address}`);

          const latitude = res.latitude;
          const longitude = res.longitude;
          const name = res.name;
          const address = res.address;

          wx.reLaunch({
            url: `../home/index?lat=${latitude}&lon=${longitude}&name=${name}&address=${address}`,
          });
        }
      })
      .catch(err => {
        console.error(`地图选点失败, 原因: ${err.errMsg}`);
      });
  },
  // 返回当前城市
  current() {
    wx.reLaunch({
      url: '../home/index?isCurrent=true',
    });
  },
  // 关闭遮罩
  closeDrawer() {
    this.setData({
      isOpen: false,
    });
  },
});
