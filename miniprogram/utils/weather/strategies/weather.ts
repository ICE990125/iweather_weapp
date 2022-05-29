import Location from '../../location';
import { Strategies } from './base';

export default class Weather {
  // 根据不同的策略进行天气信息请求
  public constructor(private _strategy: Strategies) {}

  set strategy(s: Strategies) {
    this._strategy = s;
  }

  getAqi(loc: Location): Promise<IAir> {
    return this._strategy.getAir(loc);
  }

  getSunTime(loc: Location, date?: string): Promise<ISun> {
    return this._strategy.getSunTime(loc, date);
  }

  getMoonTime(loc: Location, date?: string): Promise<IMoon> {
    return this._strategy.getMoonTime(loc, date);
  }

  getDisasterWaring(loc: Location): Promise<Array<IWarning>> {
    return this._strategy.getDisasterWarning(loc);
  }

  getLivingIndices(loc: Location, type = 0): Promise<Array<ILivingIndex>> {
    return this._strategy.getLivingIndices(loc, type);
  }

  getPrecipitationInTheNextTwoHours(loc: Location): Promise<IFuturePrecip> {
    return this._strategy.getPrecipitationInTheNextTwoHours(loc);
  }

  getWeatherByHours(loc: Location): Promise<Array<IWeatherItem>> {
    return this._strategy.getWeatherByHours(loc);
  }

  getWeatherInTheNext7Days(loc: Location): Promise<Array<IDailyItem>> {
    return this._strategy.getWeatherByDays(loc);
  }

  getNowWeather(loc: Location): Promise<IWeatherItem> {
    return this._strategy.getNowWeather(loc);
  }

  getAllweather(loc: Location): Promise<IWeather> {
    return this._strategy.getAllweather(loc);
  }
}
