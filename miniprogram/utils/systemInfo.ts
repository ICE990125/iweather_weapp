// 获取导航栏信息
export function getSystemInfo() {
  const {
    top: capsuleTop,
    bottom: capsuleBottom,
    left: capsuleLeft,
  } = wx.getMenuButtonBoundingClientRect();

  const {
    statusBarHeight, // 状态栏高度
    platform, // 当前平台
  } = wx.getSystemInfoSync();

  console.log(`当前系统: ${platform}`);

  let navHeight: number = capsuleBottom + capsuleTop - 2 * statusBarHeight; // 导航栏高度

  return {
    platform,
    navHeight, // 导航栏高度
    statusBarHeight,
    capsuleLeft, // 胶囊左边位置
  };
}
