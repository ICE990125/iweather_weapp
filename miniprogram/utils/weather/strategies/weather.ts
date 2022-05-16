import Location from '../../location'
import * as w from '../models/index'
import { Strategies } from './base'

export default class Weather {
  // 根据不同的策略进行天气信息请求
  public constructor(private _strategy: Strategies) {}

  set strategy(s: Strategies) {
    this._strategy = s
  }

  getAqi(loc: Location): Promise<w.Aqi> {
    return this._strategy.getAqi(loc)
  }

  getSunTime(loc: Location, date?: string): Promise<w.Sun> {
    return this._strategy.getSunTime(loc, date)
  }

  getMoonTime(loc: Location, date?: string): Promise<w.Moon> {
    return this._strategy.getMoonTime(loc, date)
  }

  getDisasterWaring(loc: Location): Promise<w.Warning> {
    return this._strategy.getDisasterWaring(loc)
  }

  getLivingIndices(
    loc: Location,
    type: number = 0
  ): Promise<Array<w.LivingIndex>> {
    return this._strategy.getLivingIndices(loc, type)
  }

  getPrecipitationInTheNextTwoHours(
    loc: Location
  ): Promise<FuturePrecipitationInterface> {
    return this._strategy.getPrecipitationInTheNextTwoHours(loc)
  }

  getWeatherInTheNext24Hours(loc: Location): Promise<Array<w.WeatherItem>> {
    return this._strategy.getWeatherInTheNext24Hours(loc)
  }

  getWeatherInTheNext7Days(loc: Location): Promise<DailyInterface> {
    return this._strategy.getWeatherInTheNext7Days(loc)
  }

  getNowWeather(loc: Location): Promise<w.WeatherItem> {
    return this._strategy.getNowWeather(loc)
  }

  getAllweather(loc: Location): Promise<w.WeatherInfo> {
    return this._strategy.getAllweather(loc)
  }
}
