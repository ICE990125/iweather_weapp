// 天气接口...

interface DetailInfoInterface {
  name: string // 名字
  value: number // 值
  unit: string // 单位
}

// 空气质量接口
interface AqiInterface {
  dateTime: Date // 发布时间
  aqi: number // 空气质量指数
  level: number // 空气质量指数等级
  category: string // 空气质量指数级别
  component: {
    // 污染物组成
    [key: string]: number
  }
}

// 天气预警接口
interface WaringItem {
  readonly id: string
  dateTime: Date
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
}

// 日升日落
interface SunInterface {
  sunRise: Date
  sunSet: Date
}

// 月升月落
interface MoonPhaseInterface {
  dateTime: Date
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
interface LivingIndexItem {
  type: number // 指数类型
  name: string // 指数名称
  level: number
  category: string
  description: string
}

// 天气
interface WeatherItemInterface {
  dateTime: Date // 发布时间
  main: {
    temperature: number // 当前温度
    feelsLike?: number // 体感指数
    humidity: DetailInfoInterface // 空气湿度
    precipitation: number // 累计降水量
    pressure: DetailInfoInterface // 大气压力
  }
  weather: {
    description: string // 天气状况
    icon: number | string // 天气图标
  }
  wind: {
    wind360: number // 风向(deg)
    windDir: string // 风向
    windScale: number | string // 风力等级
    windSpeed: DetailInfoInterface // 风速
  }
  visibility?: DetailInfoInterface // 能见度
  clouds?: DetailInfoInterface // 云量
  dewPoint?: DetailInfoInterface // 露点温度
  pop?: number // 逐小时预报降水概率
}

// 逐日预报
interface DailyWeatherItemInterface {
  dateTime: Date
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
    windSpeed: DetailInfoInterface
  }
  night: {
    icon: number | string
    description: string
    wind360: number
    windDir: string
    windScale: string
    windSpeed: DetailInfoInterface
  }
  humidity: DetailInfoInterface
  precipitation: number
  pressure: DetailInfoInterface
  visibility: DetailInfoInterface
  clouds?: DetailInfoInterface
  uvIndex: number
}

interface DailyInterface {
  daily: Array<DailyWeatherItemInterface>
  average: number // 平均温度
  max: number // 最高温度
  min: number // 最低温度
}

// 两小时降水
interface PrecipItem {
  dateTime: Date
  precip: number
  type: string
}

interface FuturePrecipitationInterface {
  summary: string
  minutely: Array<PrecipItem>
}
