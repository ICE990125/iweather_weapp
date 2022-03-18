import { getAqiColor } from './tools/aqi';
import tip from './tools/tip';

Page({
  data: {
    paddingTop: 0,
    percentage: 0, // 空气质量百分比
    options: {},
    isPC: false, // 是否是 PC 端
    isOpen: false,
    color: '',
    desc: [],
  },
  onLoad(options) {
    const uuid = options.uuid; // 获取上一页传过来天气对象的 uuid
    const app = getApp();
    const { navHeight, statusBarHeight, isPC } = app.globalData;
    const aqi = app.globalData[uuid].aqi;

    const percentage = aqi.value / 500;

    const options_ = {
      data: {
        value: aqi.value,
        max: 500,
        itemStyle: {
          ...getAqiColor(aqi.value),
        },
        sub: {
          value: aqi.category,
        },
      },
    };

    // 获取 aqi 介绍
    const { color, desc } = tip();

    // 获取 aqi 小时预报
    let hours = null;
    if (typeof aqi.hours !== 'undefined') {
      hours = aqiForecast.map(e => {
        const date = new Date(e.dt * 1000);
        const hour = date.format('hh');
        const dt = date.format('MM-dd');
        return { value: e.main.aqi, hour, dt };
      });
    }

    this.setData({
      paddingTop: navHeight + statusBarHeight,
      options: options_,
      percentage,
      isPC,
      hours,
      aqi,
      color,
      desc,
    });
  },
  back() {
    // 返回上一页
    wx.navigateBack({
      delta: 1,
    });
  },
  popTip() {
    // 打开抽屉
    this.setData({ isOpen: true });
  },
  // 关闭抽屉
  closeDrawer() {
    this.setData({ isOpen: false });
  },
});
