// 策略...

export abstract class Strategies {
  abstract getAqi(loc: LocationInterface): Promise<any>
  abstract getSunTime(loc: LocationInterface, date?: string): Promise<any>
  abstract getMoonTime(loc: LocationInterface, date?: string): Promise<any>
  abstract getDisasterWaring(loc: LocationInterface): Promise<any>
  abstract getLivingIndices(loc: LocationInterface, type: number): Promise<any>
  abstract getPrecipitationInTheNextTwoHours(
    loc: LocationInterface
  ): Promise<any>
  abstract getWeatherInTheNext24Hours(loc: LocationInterface): Promise<any>
  abstract getWeatherInTheNext7Days(loc: LocationInterface): Promise<any>
  abstract getNowWeather(loc: LocationInterface): Promise<any>
  abstract getAllweather(loc: LocationInterface): Promise<any>
}
