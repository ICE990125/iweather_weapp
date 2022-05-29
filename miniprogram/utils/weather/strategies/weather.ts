import Location from '../../location';
import { Strategies } from './base';

export default class Weather {
  private strategies: { [key: string]: Strategies };

  // 根据不同的策略进行天气信息请求
  public constructor(private current: Strategies, type: string) {
    // 初始化时必须传入默认策略
    this.strategies = {};
    this.strategies[type] = this.current;
  }

  // 添加策略
  addStrategy(s: Strategies, type: string) {
    this.strategies[type] = s;
  }

  // 修改策略
  changeStrategy(type: string) {
    this.current = this.strategies[type];
  }

  getAqi(loc: Location): Promise<IAir> {
    return this.current.getAir(loc);
  }

  getSunTime(loc: Location, date?: string): Promise<ISun> {
    return this.current.getSunTime(loc, date);
  }

  getMoonTime(loc: Location, date?: string): Promise<IMoon> {
    return this.current.getMoonTime(loc, date);
  }

  getDisasterWaring(loc: Location): Promise<Array<IWarning>> {
    return this.current.getDisasterWarning(loc);
  }

  getLivingIndices(loc: Location, type = 0): Promise<Array<ILivingIndex>> {
    return this.current.getLivingIndices(loc, type);
  }

  getPrecipitationInTheNextTwoHours(loc: Location): Promise<IFuturePrecip> {
    return this.current.getPrecipitationInTheNextTwoHours(loc);
  }

  getWeatherByHours(loc: Location): Promise<Array<IWeatherItem>> {
    return this.current.getWeatherByHours(loc);
  }

  getWeatherInTheNext7Days(loc: Location): Promise<Array<IDailyItem>> {
    return this.current.getWeatherByDays(loc);
  }

  getNowWeather(loc: Location): Promise<IWeatherItem> {
    return this.current.getNowWeather(loc);
  }

  getAllweather(loc: Location): Promise<IWeather> {
    return this.current.getAllweather(loc);
  }
}
