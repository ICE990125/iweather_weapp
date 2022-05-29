import { qWeatherKey } from './appKey'; // 导入密钥
import QWeatherStrategies from './utils/weather/strategies/qweather';
import Weather from './utils/weather/strategies/weather';
import './utils/weather/test/index';

App<IAppOption>({
  globalData: {},
  onLaunch() {
    const qw: QWeatherStrategies = new QWeatherStrategies(qWeatherKey);

    this.globalData.weather = new Weather(qw);
  },
});
