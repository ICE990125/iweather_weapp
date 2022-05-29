import Location from '../../location';

// 策略模式...
export abstract class Strategies {
  abstract getAir(loc: Location): Promise<any>;
  abstract getSunTime(loc: Location, date?: string): Promise<any>;
  abstract getMoonTime(loc: Location, date?: string): Promise<any>;
  abstract getDisasterWarning(loc: Location): Promise<any>;
  abstract getLivingIndices(loc: Location, type: number): Promise<any>;
  abstract getPrecipitationInTheNextTwoHours(loc: Location): Promise<any>;
  abstract getWeatherByHours(loc: Location): Promise<any>;
  abstract getWeatherByDays(loc: Location): Promise<any>;
  abstract getNowWeather(loc: Location): Promise<any>;
  abstract getAllweather(loc: Location): Promise<any>;
}
