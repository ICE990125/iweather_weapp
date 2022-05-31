import getNavInfo from './navInfo';

Component({
  properties: {
    color: {
      // 字体颜色
      type: String,
      value: '#fff',
    },
    backgroundColor: {
      // 背景色
      type: String,
      value: 'transparent',
    },
    fixed: {
      type: Boolean,
      value: true, // 导航栏是否固定
    },
    title: String, // 导航栏标题
  },
  data: {
    navHeight: 0, // 导航栏高度
    statusBarHeight: 0, // 状态栏高度
  },
  lifetimes: {
    attached() {
      const { navHeight, statusBarHeight, capsuleLeft } = getNavInfo();
      this.setData({
        navHeight,
        statusBarHeight,
        navWidth: capsuleLeft,
      });
    },
  },
});
