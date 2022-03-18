Page({
  data: {
    bgColor: '', // 预警颜色
    color: '', // 字体颜色
    warn: '', // 预警
    desc: '', // 预警详细信息
    type: 0, // 预警类型
    navIcon: '', // 是否显示返回图标
  },

  onLoad(options) {
    const app = getApp();
    const { navHeight, statusBarHeight, isPC } = app.globalData;
    const paddingTop = navHeight + statusBarHeight;

    const uuid = options.uuid; // 获取上一页传过来天气对象的 uuid
    const index = options.index;
    const waring = app.globalData[uuid].warings[index];

    const bgColor = waring.bgColor;
    const color = waring.color;
    const warn = `${waring.typeName}${waring.level}预警`;
    const desc = waring.text;
    const type = waring.type;

    if (isPC) {
      this.setData({ bgColor, color, warn, desc, paddingTop, type });
    } else {
      this.setData({
        bgColor,
        color,
        warn,
        desc,
        paddingTop,
        type,
        navIcon: 'back',
      });
    }
  },

  back() {
    wx.navigateBack({
      delta: 1,
    });
  },
});
