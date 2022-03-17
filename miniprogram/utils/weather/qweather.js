/*************************
 *    和风天气查询        *
 *************************/
import { appKey } from '../../appKey';
import { qWeatherCode } from '../code';

class Qweather {
  constructor(key) {
    this.key = key; // 和风天气的 key
    this.baseUrl = 'https://devapi.qweather.com/v7/';
    this.mock = true; // 默认使用 mock
  }

  // 简单封装的 wx.request
  wxRequest({ url, method = 'GET', data }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.baseUrl}${url}`,
        method: method,
        data: Object.assign(
          {
            mock: this.mock,
            key: this.key,
          },
          data
        ),
        dataType: 'json',
        timeout: 5000,
        success(res) {
          const code = res.data.code;
          if (code === '200') {
            resolve(res.data);
          } else {
            reject(qWeatherCode[code]);
          }
        },
        fail(err) {
          reject(err);
        },
      });
    });
  }

  /**
   * 设置 mock 状态
   * @param { Boolean } mock: 可选值, true && false
   */
  setMockStatus(mock) {
    if (typeof mock === 'boolean') {
      this.mock = mock;
    }
  }

  // 获取 AQI 指数
  getAqi(location) {
    return this.wxRequest({
      url: 'air/now',
      data: { location },
    }).then(res => {
      return res.now;
    });
  }

  // 获取日出日落时间
  getSunTime(location, date) {
    return this.wxRequest({
      url: 'astronomy/sun',
      data: { location, date: date || new Date().format('yyyyMMdd') },
    }).then(res => {
      return {
        sunRise: res.sunrise,
        sunSet: res.sunset,
      };
    });
  }

  // 获取月升月落
  getMoonTime(location, date) {
    return this.wxRequest({
      url: 'astronomy/moon',
      data: { location, date: date || new Date().format('yyyyMMdd') },
    }).then(res => {
      return {
        moonRise: res.moonrise,
        moonSet: res.moonset,
        moonPhase: res.moonPhase,
      };
    });
  }

  // 获取灾害预警
  getDisasterWaring(location) {
    return this.wxRequest({
      url: 'warning/now',
      data: { location },
    })
      .then(res => {
        return res.warning;
      })
      .catch(err => {
        return err;
      });
  }

  // 获取生活指数, 默认获取全部生活指数
  getLivingIndices(location, type = 0) {
    return this.wxRequest({
      url: 'indices/1d',
      data: { location, type },
    }).then(res => {
      return res.daily;
    });
  }

  // 获取 2 小时降水
  getPrecipitationInTheNextTwoHours(location) {
    return this.wxRequest({
      url: 'minutely/5m',
      data: { location },
    }).then(res => {
      return {
        summary: res.summary,
        minutely: res.minutely,
      };
    });
  }

  // 获取 24 小时天气预报
  getWeatherInTheNext24Hours(location) {
    return this.wxRequest({
      url: 'weather/24h',
      data: { location },
    }).then(res => {
      return res.hourly;
    });
  }

  // 获取未来 7 天天气预报
  getWeatherInTheNext7Days(location) {
    return this.wxRequest({
      url: 'weather/7d',
      data: { location },
    }).then(res => {
      return res.daily;
    });
  }

  // 获取实时天气预报
  getNowWeather(location) {
    return this.wxRequest({
      url: 'weather/now',
      data: { location },
    }).then(res => {
      return res.now;
    });
  }

  // 一键获取全部天气数据
  getAllweather(location) {
    return Promise.all([
      this.getAqi(location),
      this.getSunTime(location),
      this.getMoonTime(location),
      this.getDisasterWaring(location),
      this.getLivingIndices(location),
      this.getPrecipitationInTheNextTwoHours(location),
      this.getWeatherInTheNext24Hours(location),
      this.getWeatherInTheNext7Days(location),
      this.getNowWeather(location),
    ]).then(values => {
      const keys = [
        'aqi',
        'sunTime',
        'moonTime',
        'waring',
        'livingIndices',
        'precipitation',
        'next24h',
        'next7days',
        'now',
      ];

      const res = {};

      keys.forEach((key, index) => {
        res[key] = values[index];
      });

      return res;
    });
  }
}

export default new Qweather(appKey.qWeather);
