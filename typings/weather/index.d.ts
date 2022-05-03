declare namespace QWeather {
  interface PropetyInterface {
    name: string
    value: number
    unit: string
  }

  // 空气质量接口
  interface AqiInterface {
    pubTime: Date // 发布时间
    time?: string // 发布时间格式化
    aqi: number // 空气质量指数
    level: number // 空气质量指数等级
    category: string // 空气质量指数级别
    component: {
      // 污染物组成
      [key: string]: number
    }
  }

  // 单一天气接口
  interface aWeatherInterface {
    pubTime: Date // 数据观测时间
    time?: string // hh:mm
    main: {
      temperature: number // 当前温度
      feelsLike?: number // 体感指数
      humidity: PropetyInterface // 空气湿度
      precipitation: number // 累计降水量
      pressure: PropetyInterface // 大气压力
    }
    weather: {
      description: string // 天气状况
      icon: number | string // 天气图标
    }
    wind: {
      wind360: number // 风向(deg)
      windDir: string // 风向
      windScale: number | string // 风力等级
      windSpeed: PropetyInterface // 风速
    }
    visibility?: PropetyInterface // 能见度
    clouds?: PropetyInterface // 云量
    dewPoint?: PropetyInterface // 露点温度
    pop?: number // 逐小时预报降水概率
  }

  // 天气预警接口
  type warings = Array<{
    readonly id: string
    pubTime: Date
    description: string // 预警文字描述
    title: string
    status: string
    level: string // 预警等级
    type: number // 预警类型ID
    typeName: string // 预警类型名称
    related?: string // 与本条预警相关的预警ID
    sender?: string
    startTime?: string // 预警开始时间
    endTime?: string // 预警结束时间
    urgency?: string // 预警紧迫程度
    color?: string // 预警颜色
    backgroundColor?: string // 预警背景色
  }>

  // 日升日落
  interface SunInterface {
    sunRise: Date
    sunSet: Date
  }

  // 月升月落
  interface MoonPhaseInterface {
    fxTime: Date
    value: number
    name: string
    illumination: number
    icon: number | string
  }

  interface MoonInterface {
    moonRise: Date
    moonSet: Date
    moonPhase: Array<MoonPhaseInterface>
  }

  // 生活指数
  type indices = Array<{
    type: number // 指数类型
    name: string // 指数名称
    level: number
    category: string
    description: string
  }>

  // 逐小时预报
  type hourly = Array<aWeatherInterface>

  // 逐日预报
  interface dInterfaces {
    fxDate: Date
    week?: string
    date?: string // M-dd
    sun: {
      sunrise: Date
      sunset: Date
    }
    moon: {
      moonrise: Date
      moonset: Date
      moonPhase: string
      moonPhaseIcon: number | string
    }
    temperature: {
      maxTemp: number
      minTemp: number
    }
    day: {
      icon: number | string
      description: string
      wind360: number
      windDir: string
      windScale: string
      windSpeed: PropetyInterface
    }
    night: {
      icon: number | string
      description: string
      wind360: number
      windDir: string
      windScale: string
      windSpeed: PropetyInterface
    }
    humidity: PropetyInterface
    precipitation: number
    pressure: PropetyInterface
    visibility: PropetyInterface
    clouds: PropetyInterface
    uvIndex: number
  }

  interface dailyInterface {
    daily: Array<dInterfaces>
    average: number
    max: number
    min: number
  }

  // 两小时降水
  interface futurePrecipitationInterface {
    summary: string
    minutely: Array<{
      fxTime: Date
      precip: number
      type: string
    }>
  }

  // 天气接口
  interface WeatherInterface {
    uuid?: string
    location: LocationInterface
    aqi: AqiInterface
    sunTime: SunInterface
    moonTime: MoonInterface
    waring: warings
    livingIndices: indices
    precipitation: futurePrecipitationInterface
    next24h: hourly
    next7days: dailyInterface
    now: aWeatherInterface
  }
}
