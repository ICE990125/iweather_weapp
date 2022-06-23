import { qWeatherKey, qqMapKey } from './appKey'; // 导入密钥
import QWeatherStrategies from './utils/weather/strategies/qweather';
import Weather from './utils/weather/strategies/weather';
import qqMap from './utils/qqMap/qqMap'; // 腾讯地图
import { getSystemInfo } from './utils/systemInfo';

// import './utils/weather/test/index'; 测试用例

App({
  globalData: {},
  onLaunch() {
    // 目前仅支持 qweather
    const qw: QWeatherStrategies = new QWeatherStrategies(qWeatherKey);

    // 获取导航栏和状态栏高度
    const { navHeight, statusBarHeight, capsuleLeft, platform } =
      getSystemInfo();

    // 是否是 PC 端
    let isPC: boolean;
    if (platform !== 'windows' && platform !== 'mac') {
      isPC = false;
    } else {
      isPC = true;
    }

    this.globalData = {
      weather: new Weather(qw, 'qweather'),
      qqMap: new qqMap(qqMapKey),
      statusBarHeight,
      capsuleLeft,
      navHeight,
      platform,
      isPC,
    };
  },
});
