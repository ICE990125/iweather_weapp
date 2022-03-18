const app = getApp();

Component({
  properties: {
    textColor: {
      // 字体颜色
      type: String,
      value: '#fff',
    },
    backgroundColor: {
      // 背景色
      type: String,
      value: 'transparent',
    },
    isFixed: {
      type: Boolean,
      value: true, // 导航栏是否固定
    },
    navLeftIcon: String, // 左图标
    navRightIcon: String, // 右图标
    subTitle: String, // 主标题
    navTitle: String, // 副标题
  },
  data: {
    navHeight: 0, // 导航栏高度
    statusBarHeight: 0, // 状态栏高度
  },

  lifetimes: {
    ready() {
      const { navHeight, statusBarHeight, capsuleLeft } = app.globalData;
      this.setData({ navHeight, statusBarHeight, navWidth: capsuleLeft });
    },
  },

  methods: {
    left() {
      // 导航栏按钮点击事件
      this.triggerEvent('left');
    },
    righr() {
      // 导航栏按钮点击事件
      this.triggerEvent('right');
    },
  },
});
