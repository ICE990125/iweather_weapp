import './utils/time'
import { appKey } from './appKey' // 导入密钥
import QWeatherStrategies from './utils/weather/strategies/qweather'
import Weather from './utils/weather/strategies/weather'

App<IAppOption>({
  globalData: {},
  onLaunch() {
    const qw: QWeatherStrategies = new QWeatherStrategies(appKey['qWeather'])

    this.globalData.weather = new Weather(qw)
  },
})
