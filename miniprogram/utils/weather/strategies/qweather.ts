import Http from '../../http/http';
import Location from '../../location';
import { Strategies } from './base';
import moment from 'moment';
import { qWeatherCode } from '../../http/code';

// 处理请求结果
class QWeatherHandler {
  static aqiHandler(res: Record<string, any>): IAir {
    return {
      dateTime: new Date(res.pubTime),
      aqi: Number(res.aqi),
      level: Number(res.level),
      category: res.category,
      components: {
        pm10: Number(res.pm10),
        pm2p5: Number(res.pm2p5),
        no2: Number(res.no2),
        so2: Number(res.so2),
        co: Number(res.co),
        o3: Number(res.o3),
      },
    };
  }

  static sunHandler(res: Record<string, any>): ISun {
    return {
      sunRise: new Date(res.sunrise),
      sunSet: new Date(res.sunset),
    };
  }

  static moonHandler(res: Record<string, any>): IMoon {
    return {
      moonRise: new Date(res.moonrise),
      moonSet: new Date(res.moonset),
      moonPhase: res.moonPhase.map((e: Record<string, any>): IMoonPhase => {
        return {
          dateTime: new Date(e.fxTime),
          value: Number(e.value),
          name: e.name,
          illumination: Number(e.illumination),
          icon: e.icon,
        };
      }),
    };
  }

  static warningHandler(
    res: Array<Record<string, any>> | undefined
  ): Array<IWarning> {
    return typeof res !== 'undefined'
      ? res.map((e: Record<string, any>): IWarning => {
          return {
            dateTime: new Date(e.pubTime),
            start: new Date(e.startTime),
            end: new Date(e.endTime),
            description: e.text,
            title: e.title,
            status: e.status,
            level: e.level,
            type: e.type,
            typeName: e.typeName,
            sender: e.sender ?? '暂无发布单位',
          };
        })
      : [];
  }

  static indicesHandler(res: Array<Record<string, any>>): Array<ILivingIndex> {
    return res.map((e: Record<string, any>): ILivingIndex => {
      return {
        type: Number(e.type),
        name: e.name.replace(/指数/, ''),
        level: Number(e.level),
        category: e.category,
        description: e.text,
      };
    });
  }

  static precipHandler(res: Record<string, any>): IFuturePrecip {
    const noPrecip: boolean = res.minutely.every(
      (e: Record<string, any>) => e.precip === '0.0'
    );

    return {
      summary: res.summary,
      minutely: noPrecip
        ? [] // 未降雨
        : res.minutely.map((e: Record<string, any>): IPrecip => {
            return {
              dateTime: new Date(e.fxTime),
              precip: parseFloat(e.precip),
              type: e.type,
            };
          }),
    };
  }

  static hourlyHandler(res: Record<string, any>): Array<IWeatherItem> {
    return res.map((e: Record<string, any>): IWeatherItem => {
      return {
        dateTime: new Date(e.fxTime),
        temperature: {
          day: Number(e.temp),
        },
        humidity: Number(e.humidity),
        precip: parseFloat(e.precip),
        pressure: Number(e.pressure),
        description: e.text,
        icon: e.icon,
        wind: {
          wind360: Number(e.wind360),
          windDir: e.windDir,
          windScale: e.windScale,
          windSpeed: Number(e.windSpeed),
        },
        clouds: Number(e.cloud),
        dewPoint: Number(e.dew),
        pop: Number(e.pop),
      };
    });
  }

  static dailyHandler(res: Record<string, any>): Array<IDailyItem> {
    return res.map((e: Record<string, any>): IDailyItem => {
      return {
        dateTime: new Date(e.fxDate),
        sun: {
          sunRise: new Date(`${e.fxDate} ${e.sunrise}`),
          sunSet: new Date(`${e.fxDate} ${e.sunset}`),
        },
        moon: {
          moonRise: new Date(`${e.fxDate} ${e.moonrise}`),
          moonSet: new Date(`${e.fxDate} ${e.moonset}`),
          moonPhase: {
            icon: e.moonPhaseIcon,
            name: e.moonPhase,
          },
        },
        temperature: {
          max: e.tempMax,
          min: e.tempMin,
        },
        dayIcon: e.iconDay,
        dayDesc: e.textDay,
        dayWind: {
          wind360: Number(e.wind360Day),
          windDir: e.windDirDay,
          windScale: e.windScaleDay,
          windSpeed: Number(e.windSpeedDay),
        },
        nightIcon: e.iconNight,
        nightDesc: e.textNight,
        nightWind: {
          wind360: Number(e.wind360Night),
          windDir: e.windDirNight,
          windScale: e.windScaleNight,
          windSpeed: Number(e.windSpeedNight),
        },
        humidity: Number(e.humidity),
        precip: parseFloat(e.precip),
        pressure: Number(e.pressure),
        visibility: Number(e.vis),
        clouds: Number(e.cloud),
        uvIndex: Number(e.uvIndex),
      };
    });
  }

  static nowWeatherHandler(res: Record<string, any>): IWeatherItem {
    return {
      dateTime: new Date(res.obsTime),
      temperature: {
        day: Number(res.temp),
      },
      feelsLike: {
        day: Number(res.feelsLike),
      },
      humidity: Number(res.humidity),
      precip: Number(res.precip),
      pressure: Number(res.pressure),
      description: res.text,
      icon: res.icon,
      wind: {
        wind360: Number(res.wind360),
        windDir: res.windDir,
        windScale: res.windScale,
        windSpeed: Number(res.windSpeed),
      },
      visibility: Number(res.vis),
      clouds: Number(res.cloud),
      dewPoint: Number(res.dew),
    };
  }
}

export default class QWeatherStrategies extends Strategies {
  private http: Http;

  constructor(
    private key: string,
    private baseUrl: string = 'https://devapi.qweather.com/v7/'
  ) {
    super();

    this.http = new Http({
      baseUrl: this.baseUrl,
    });
  }

  request(options: { url: string; data: object }): Promise<any> {
    return this.http
      .request({
        url: options.url,
        data: Object.assign(
          {
            key: this.key,
          },
          options.data
        ),
      })
      .then((res: Record<string, any>) => {
        // 由于没有响应拦截器, 这里凑合一下
        if (res.code == '200') {
          return Promise.resolve(res);
        } else {
          const c: keyof typeof qWeatherCode = res.code;
          return Promise.reject(qWeatherCode[c]);
        }
      });
  }

  // 获取 AQI 指数
  getAir(loc: Location): Promise<IAir> {
    return this.request({
      url: 'air/now',
      data: { location: loc.toString() },
    }).then((res) => {
      return QWeatherHandler.aqiHandler(res.now);
    });
  }

  // 获取日出日落时间
  getSunTime(loc: Location, date_?: string): Promise<ISun> {
    return this.request({
      url: 'astronomy/sun',
      data: {
        location: loc.toString(),
        date: date_ ?? moment(Date.now()).format('YYYYMMDD'),
      },
    }).then((res) => {
      return QWeatherHandler.sunHandler(res);
    });
  }

  // 获取月升月落
  getMoonTime(loc: Location, date_?: string): Promise<IMoon> {
    return this.request({
      url: 'astronomy/moon',
      data: {
        location: loc.toString(),
        date: date_ ?? moment(Date.now()).format('YYYYMMDD'),
      },
    }).then((res) => {
      return QWeatherHandler.moonHandler(res);
    });
  }

  // 获取灾害预警
  getDisasterWarning(loc: Location): Promise<Array<IWarning>> {
    return this.request({
      url: 'warning/now',
      data: { location: loc.toString() },
    }).then((res) => {
      return QWeatherHandler.warningHandler(res.warning);
    });
  }

  // 获取生活指数, 默认获取全部生活指数
  getLivingIndices(loc: Location, type = 0): Promise<Array<ILivingIndex>> {
    return this.request({
      url: 'indices/1d',
      data: {
        location: loc.toString(),
        type,
      },
    }).then((res) => {
      return QWeatherHandler.indicesHandler(res.daily);
    });
  }

  // 获取 2 小时降水
  getPrecipitationInTheNextTwoHours(loc: Location): Promise<IFuturePrecip> {
    return this.request({
      url: 'minutely/5m',
      data: { location: loc.toString() },
    }).then((res) => {
      return QWeatherHandler.precipHandler(res);
    });
  }

  // 获取 24 小时天气预报
  getWeatherByHours(loc: Location): Promise<Array<IWeatherItem>> {
    return this.request({
      url: 'weather/24h',
      data: { location: loc.toString() },
    }).then((res) => {
      return QWeatherHandler.hourlyHandler(res.hourly);
    });
  }

  // 获取未来 7 天天气预报
  getWeatherByDays(loc: Location): Promise<Array<IDailyItem>> {
    return this.request({
      url: 'weather/7d',
      data: { location: loc.toString() },
    }).then((res) => {
      return QWeatherHandler.dailyHandler(res.daily);
    });
  }

  // 获取实时天气预报
  getNowWeather(loc: Location): Promise<IWeatherItem> {
    return this.request({
      url: 'weather/now',
      data: { location: loc.toString() },
    }).then((res) => {
      return QWeatherHandler.nowWeatherHandler(res.now);
    });
  }

  // 一键获取全部天气数据
  getAllweather(loc: Location): Promise<IWeather> {
    return Promise.all([
      this.getAir(loc),
      this.getSunTime(loc),
      this.getMoonTime(loc),
      this.getDisasterWarning(loc),
      this.getLivingIndices(loc),
      this.getPrecipitationInTheNextTwoHours(loc),
      this.getWeatherByHours(loc),
      this.getWeatherByDays(loc),
      this.getNowWeather(loc),
    ]).then((values): IWeather => {
      return {
        location: loc,
        air: values[0],
        sun: values[1],
        moon: values[2],
        waring: values[3],
        livingIndices: values[4],
        precip: values[5],
        hourly: values[6],
        daily: values[7],
        now: values[8],
      };
    });
  }
}
