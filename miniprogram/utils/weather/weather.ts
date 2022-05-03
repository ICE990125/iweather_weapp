import Location from '../location'
import { uuid } from '../util'
import { qWeatherCode } from './code'
import {
  aqiHandler,
  sunHandler,
  moonHandler,
  warningHandler,
  indicesHandler,
  precipHandler,
  hourlyHandler,
  dailyHandler,
  nowWeatherHandler,
} from './handler'
import { appKey } from '../../appKey'

class Weather {
  public constructor(
    private _key: string,
    private _baseUrl: string = 'https://devapi.qweather.com/v7/',
    private _mock: boolean = true
  ) {}

  wxRequest(url: string, data: object, method: methods = 'GET'): Promise<any> {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this._baseUrl}${url}`,
        method: method,
        data: Object.assign(
          {
            mock: this._mock,
            key: this._key,
          },
          data
        ),
        dataType: 'json',
        timeout: 5000,
        success(res: WechatMiniprogram.IAnyObject) {
          if (res.data.code === '200') {
            resolve(res.data)
          } else {
            reject(qWeatherCode[res.data.code])
          }
        },
        fail(err: WechatMiniprogram.GeneralCallbackResult) {
          reject(err.errMsg)
        },
      })
    })
  }

  set mock(m: boolean) {
    this._mock = m
  }

  // 获取 AQI 指数
  getAqi(loc: Location): Promise<QWeather.AqiInterface> {
    return this.wxRequest('air/now', { location: loc.locationString }).then(
      (res) => {
        return aqiHandler(res.now)
      }
    )
  }

  // 获取日出日落时间
  getSunTime(loc: Location, date?: string): Promise<QWeather.SunInterface> {
    return this.wxRequest('astronomy/sun', {
      location: loc.locationString,
      date: date ?? new Date().format('yyyyMMdd'),
    }).then((res) => {
      return sunHandler(res)
    })
  }

  // 获取月升月落
  getMoonTime(loc: Location, date?: string): Promise<QWeather.MoonInterface> {
    return this.wxRequest('astronomy/moon', {
      location: loc.locationString,
      date: date || new Date().format('yyyyMMdd'),
    }).then((res) => {
      return moonHandler(res)
    })
  }

  // 获取灾害预警
  getDisasterWaring(loc: Location): Promise<QWeather.warings> {
    return this.wxRequest('warning/now', { location: loc.locationString }).then(
      (res) => {
        return warningHandler(res.warning)
      }
    )
  }

  // 获取生活指数, 默认获取全部生活指数
  getLivingIndices(loc: Location, type: number = 0): Promise<QWeather.indices> {
    return this.wxRequest('indices/1d', {
      location: loc.locationString,
      type,
    }).then((res) => {
      return indicesHandler(res.daily)
    })
  }

  // 获取 2 小时降水
  getPrecipitationInTheNextTwoHours(
    loc: Location
  ): Promise<QWeather.futurePrecipitationInterface> {
    return this.wxRequest('minutely/5m', { location: loc.locationString }).then(
      (res) => {
        return precipHandler(res)
      }
    )
  }

  // 获取 24 小时天气预报
  getWeatherInTheNext24Hours(loc: Location): Promise<QWeather.hourly> {
    return this.wxRequest('weather/24h', { location: loc.locationString }).then(
      (res) => {
        return hourlyHandler(res.hourly)
      }
    )
  }

  // 获取未来 7 天天气预报
  getWeatherInTheNext7Days(loc: Location): Promise<QWeather.dailyInterface> {
    return this.wxRequest('weather/7d', { location: loc.locationString }).then(
      (res) => {
        return dailyHandler(res.daily)
      }
    )
  }

  // 获取实时天气预报
  getNowWeather(loc: Location): Promise<QWeather.aWeatherInterface> {
    return this.wxRequest('weather/now', { location: loc.locationString }).then(
      (res) => {
        return nowWeatherHandler(res.now)
      }
    )
  }

  // 一键获取全部天气数据
  getAllweather(loc: Location): Promise<any> {
    return Promise.all([
      this.getAqi(loc),
      this.getSunTime(loc),
      this.getMoonTime(loc),
      this.getDisasterWaring(loc),
      this.getLivingIndices(loc),
      this.getPrecipitationInTheNextTwoHours(loc),
      this.getWeatherInTheNext24Hours(loc),
      this.getWeatherInTheNext7Days(loc),
      this.getNowWeather(loc),
    ]).then((values): QWeather.WeatherInterface => {
      return {
        uuid: uuid(),
        location: loc,
        aqi: values[0],
        sunTime: values[1],
        moonTime: values[2],
        waring: values[3],
        livingIndices: values[4],
        precipitation: values[5],
        next24h: values[6],
        next7days: values[7],
        now: values[8],
      }
    })
  }
}

export default new Weather(appKey.qWeather)
