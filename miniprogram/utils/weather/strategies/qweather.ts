import * as w from '../models/index'
import http from '../../http/http'
import { qWeatherCode } from '../../http/code'
import Location from '../../location'
import { Strategies } from './base'

// 处理请求结果
class QWeatherHandler {
  static aqiHandler(res: Record<string, any>): w.Aqi {
    return new w.Aqi({
      dateTime: new Date(res.pubTime),
      aqi: Number(res.aqi),
      level: Number(res.level),
      category: res.category,
      component: {
        pm10: Number(res.pm10),
        pm2p5: Number(res.pm2p5),
        no2: Number(res.no2),
        so2: Number(res.so2),
        co: Number(res.co),
        o3: Number(res.o3),
      },
    })
  }

  static sunHandler(res: Record<string, any>): w.Sun {
    return new w.Sun({
      sunRise: new Date(res.sunrise),
      sunSet: new Date(res.sunset),
    })
  }

  static moonHandler(res: Record<string, any>): w.Moon {
    return new w.Moon({
      moonRise: new Date(res.moonrise),
      moonSet: new Date(res.moonset),
      moonPhase: res.moonPhase.map((e: Record<string, any>): w.MoonPhase => {
        return new w.MoonPhase({
          dateTime: new Date(e.fxTime),
          value: Number(e.value),
          name: e.name,
          illumination: Number(e.illumination),
          icon: e.icon,
        })
      }),
    })
  }

  static warningHandler(res: Array<Record<string, any>>): Array<w.Warning> {
    return res.map((e: Record<string, any>): w.Warning => {
      return new w.Warning({
        id: e.id,
        dateTime: new Date(e.pubTime),
        description: e.text,
        title: e.title,
        status: e.status,
        level: e.level,
        type: Number(e.type),
        typeName: e.typeName,
        sender: e.sender ?? '暂无发布单位',
      })
    })
  }

  static indicesHandler(res: Array<Record<string, any>>): Array<w.LivingIndex> {
    return res.map((e: Record<string, any>): w.LivingIndex => {
      return new w.LivingIndex({
        type: Number(e.type),
        name: e.name.replace(/指数/, ''),
        level: Number(e.level),
        category: e.category,
        description: e.text,
      })
    })
  }

  static precipHandler(res: Record<string, any>): FuturePrecipitationInterface {
    const noPrecip: boolean = res.minutely.every(
      (e: Record<string, any>) => e.precip === '0.0'
    )

    return {
      summary: res.summary,
      minutely: noPrecip
        ? []
        : res.minutely.map((e: Record<string, any>): w.Precipitation => {
            return new w.Precipitation({
              dateTime: new Date(e.fxTime),
              precip: parseFloat(e.precip),
              type: e.type,
            })
          }),
    }
  }

  static hourlyHandler(res: Record<string, any>): Array<w.WeatherItem> {
    return res.map((e: Record<string, any>): w.WeatherItem => {
      return new w.WeatherItem({
        dateTime: new Date(e.fxTime),
        main: {
          temperature: Number(e.temp),
          humidity: {
            name: '湿度',
            value: Number(e.humidity),
            unit: '%',
          },
          precipitation: parseFloat(e.precip),
          pressure: {
            name: '大气压',
            value: Number(e.pressure),
            unit: 'hPa',
          },
        },
        weather: {
          description: e.text,
          icon: e.icon,
        },
        wind: {
          wind360: Number(e.wind360),
          windDir: e.windDir,
          windScale: e.windScale,
          windSpeed: {
            name: '风速',
            value: Number(e.windSpeed),
            unit: 'km/h',
          },
        },
        clouds: {
          name: '云量',
          value: Number(e.cloud),
          unit: '%',
        },
        dewPoint: {
          name: '露点温度',
          value: Number(e.dew),
          unit: '℃',
        },
        pop: Number(e.pop),
      })
    })
  }

  static dailyHandler(res: Record<string, any>): DailyInterface {
    let temp: number = 0
    const maxTemps: Array<number> = [],
      minTemps: Array<number> = []

    const r: Array<w.DailyWeatherItem> = res.map(
      (e: Record<string, any>): w.DailyWeatherItem => {
        const d = new Date(e.fxDate)
        const max = Number(e.tempMax),
          min = Number(e.tempMin)
        temp += max + min
        maxTemps.push(max)
        minTemps.push(min)

        return new w.DailyWeatherItem({
          dateTime: d,
          sun: {
            sunrise: new Date(e.sunrise),
            sunset: new Date(e.sunset),
          },
          moon: {
            moonrise: new Date(e.moonrise),
            moonset: new Date(e.moonset),
            moonPhase: e.moonPhase,
            moonPhaseIcon: e.moonPhaseIcon,
          },
          temperature: {
            maxTemp: max,
            minTemp: min,
          },
          day: {
            icon: e.iconDay,
            description: e.textDay,
            wind360: Number(e.wind360Day),
            windDir: e.windDirDay,
            windScale: e.windScaleDay,
            windSpeed: {
              name: '风速',
              value: Number(e.windSpeedDay),
              unit: 'km/h',
            },
          },
          night: {
            icon: e.iconNight,
            description: e.textNight,
            wind360: Number(e.wind360Night),
            windDir: e.windDirNight,
            windScale: e.windScaleNight,
            windSpeed: {
              name: '风速',
              value: Number(e.windSpeedNight),
              unit: 'km/h',
            },
          },
          humidity: {
            name: '空气湿度',
            value: Number(e.humidity),
            unit: '%',
          },
          precipitation: parseFloat(e.precip),
          pressure: {
            name: '大气压强',
            value: Number(e.pressure),
            unit: 'hPa',
          },
          visibility: {
            name: '能见度',
            value: Number(e.vis),
            unit: 'km',
          },
          clouds: {
            name: '大气压力',
            value: Number(e.cloud),
            unit: 'hPa',
          },
          uvIndex: Number(e.uvIndex),
        })
      }
    )

    return {
      daily: r,
      average: temp / (r.length * 2),
      max: Math.max(...maxTemps),
      min: Math.min(...minTemps),
    }
  }

  static nowWeatherHandler(res: Record<string, any>): w.WeatherItem {
    return new w.WeatherItem({
      dateTime: new Date(res.obsTime),
      main: {
        temperature: Number(res.temp),
        feelsLike: Number(res.feelsLike),
        humidity: {
          name: '空气湿度',
          value: Number(res.humidity),
          unit: '%',
        },
        precipitation: Number(res.precip),
        pressure: {
          name: '大气压力',
          value: Number(res.pressure),
          unit: 'hPa',
        },
      },
      weather: {
        description: res.text,
        icon: res.icon,
      },
      wind: {
        wind360: Number(res.wind360),
        windDir: res.windDir,
        windScale: res.windScale,
        windSpeed: {
          name: '风速',
          value: Number(res.windSpeed),
          unit: 'km/h',
        },
      },
      visibility: {
        name: '能见度',
        value: Number(res.vis),
        unit: 'km',
      },
      clouds: {
        name: '云量',
        value: Number(res.cloud),
        unit: '%',
      },
      dewPoint: {
        name: '露点温度',
        value: Number(res.dew),
        unit: '°',
      },
    })
  }
}

export default class QWeatherStrategies extends Strategies {
  constructor(
    private _key: string,
    private _baseUrl: string = 'https://devapi.qweather.com/v7/'
  ) {
    super()
  }

  requests({ url, data }: { url: string; data: object }): Promise<any> {
    return new Promise((resolve, reject) => {
      http
        .requests({
          url: `${this._baseUrl}${url}`,
          data: Object.assign(
            {
              key: this._key,
            },
            data
          ),
        })
        .then((res) => {
          if (res.code === '200') {
            resolve(res)
          } else {
            reject(qWeatherCode[res.code] ?? '其他请求错误')
          }
        })
    })
  }

  // 获取 AQI 指数
  getAqi(loc: Location): Promise<w.Aqi> {
    return this.requests({
      url: 'air/now',
      data: { location: loc.toString },
    }).then((res) => {
      return QWeatherHandler.aqiHandler(res.now)
    })
  }

  // 获取日出日落时间
  getSunTime(loc: Location, date?: string): Promise<w.Sun> {
    return this.requests({
      url: 'astronomy/sun',
      data: {
        location: loc.toString,
        date: date ?? new Date().format('yyyyMMdd'),
      },
    }).then((res) => {
      return QWeatherHandler.sunHandler(res)
    })
  }

  // 获取月升月落
  getMoonTime(loc: Location, date?: string): Promise<w.Moon> {
    return this.requests({
      url: 'astronomy/moon',
      data: {
        location: loc.toString,
        date: date || new Date().format('yyyyMMdd'),
      },
    }).then((res) => {
      return QWeatherHandler.moonHandler(res)
    })
  }

  // 获取灾害预警
  getDisasterWaring(loc: Location): Promise<Array<w.Warning>> {
    return this.requests({
      url: 'warning/now',
      data: { location: loc.toString },
    }).then((res) => {
      return QWeatherHandler.warningHandler(res.warning)
    })
  }

  // 获取生活指数, 默认获取全部生活指数
  getLivingIndices(
    loc: Location,
    type: number = 0
  ): Promise<Array<w.LivingIndex>> {
    return this.requests({
      url: 'indices/1d',
      data: {
        location: loc.toString,
        type,
      },
    }).then((res) => {
      return QWeatherHandler.indicesHandler(res.daily)
    })
  }

  // 获取 2 小时降水
  getPrecipitationInTheNextTwoHours(
    loc: Location
  ): Promise<FuturePrecipitationInterface> {
    return this.requests({
      url: 'minutely/5m',
      data: { location: loc.toString },
    }).then((res) => {
      return QWeatherHandler.precipHandler(res)
    })
  }

  // 获取 24 小时天气预报
  getWeatherInTheNext24Hours(loc: Location): Promise<Array<w.WeatherItem>> {
    return this.requests({
      url: 'weather/24h',
      data: { location: loc.toString },
    }).then((res) => {
      return QWeatherHandler.hourlyHandler(res.hourly)
    })
  }

  // 获取未来 7 天天气预报
  getWeatherInTheNext7Days(loc: Location): Promise<DailyInterface> {
    return this.requests({
      url: 'weather/7d',
      data: { location: loc.toString },
    }).then((res) => {
      return QWeatherHandler.dailyHandler(res.daily)
    })
  }

  // 获取实时天气预报
  getNowWeather(loc: Location): Promise<w.WeatherItem> {
    return this.requests({
      url: 'weather/now',
      data: { location: loc.toString },
    }).then((res) => {
      return QWeatherHandler.nowWeatherHandler(res.now)
    })
  }

  // 一键获取全部天气数据
  getAllweather(loc: Location): Promise<w.WeatherInfo> {
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
    ]).then((values): w.WeatherInfo => {
      return new w.WeatherInfo({
        location: loc,
        aqi: values[0],
        sun: values[1],
        moon: values[2],
        waring: values[3],
        livingIndices: values[4],
        precipitation: values[5],
        next24h: values[6],
        next7days: values[7],
        now: values[8],
      })
    })
  }
}
