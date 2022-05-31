// 获取导航栏信息
export default function () {
  const {
    top: capsuleTop,
    bottom: capsuleBottom,
    left: capsuleLeft,
  } = wx.getMenuButtonBoundingClientRect();

  const {
    statusBarHeight, // 状态栏高度
  } = wx.getSystemInfoSync();

  const navHeight: number = capsuleBottom + capsuleTop - 2 * statusBarHeight; // 导航栏高度

  return {
    navHeight, // 导航栏高度
    statusBarHeight,
    capsuleLeft, // 胶囊左边位置
  };
}
