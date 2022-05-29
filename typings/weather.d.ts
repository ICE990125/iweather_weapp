interface IComponents {
  co: number;
  no?: number;
  no2: number;
  o3: number;
  so2: number;
  pm2p5: number;
  pm10: number;
  nh3?: number;
}

interface IAir {
  dateTime: Date;
  aqi: number;
  level: number;
  category?: string;
  components: IComponents;
}

interface IWarning {
  description: string;
  title: string;
  sender?: string; // 发布单位
  start?: Date; // 预警开始时间
  end?: Date; // 预警结束时间
  // Only qWeather supports ↓
  dateTime?: Date;
  status?: string; // 预警状态 Active | Update | Cancel
  level?: string; // 预警等级 白色 | 蓝色 | 黄色 | 橙色 | 红色
  type?: string; // 预警类型 ID
  typeName?: string | Array<string>; // 预警类型名称
  urgency?: string; // 紧迫程度 Immediate | Expected | Future | Past | Unknown
}

interface ISun {
  sunRise: Date;
  sunSet: Date;
}

interface IMoonPhase {
  dateTime?: Date;
  value?: number; // 月相数值
  name?: string; // 月相名字
  illumination?: number; // 月亮照明度, %
  icon?: string; // 月相图标代码
}

interface IMoon {
  moonRise: Date;
  moonSet: Date;
  moonPhase: IMoonPhase | Array<IMoonPhase>;
}

interface ILivingIndex {
  type: number;
  name: string;
  level: number;
  category: string;
  description: string;
}

interface IPrecip {
  dateTime: Date;
  precip: number;
  type?: string; // rain | snow
}

interface IFuturePrecip {
  summary?: string;
  minutely: Array<IPrecip>;
}

interface IWeatherItem {
  dateTime: Date;
  temperature: ITemperature;
  feelsLike?: ITemperature;
  dewPoint: number;
  description: string;
  icon: number | string;
  wind: IWind;
  visibility?: number;
  pressure: number;
  humidity: number;
  clouds?: number;
  pop?: number; // Probability of precipitation
  precip?: number; // current precipitation
  uvIndex?: number;
}

interface ITemperature {
  day?: number;
  min?: number;
  max?: number;
  night?: number;
  eve?: number;
  morn?: number;
}

interface IWind {
  wind360: number;
  windDir?: string;
  windScale?: string;
  windSpeed: number;
  windGust?: number;
}

interface IDailyItem {
  dateTime: Date;
  sun: ISun;
  moon: IMoon;
  dayDesc: string;
  dayIcon: number | string;
  nightDesc?: string;
  nightIcon?: number | string;
  temperature: ITemperature;
  feelsLike?: ITemperature;
  dayWind: IWind;
  dewPoint?: number;
  nightWind?: IWind;
  humidity: number;
  precip?: number;
  pop?: number;
  pressure: number;
  visibility?: number;
  clouds?: number;
  uvIndex: number;
}

interface IWeather {
  location: ILocation;
  air: IAir;
  airForcast?: Array<IAir>; // only openweather supports
  sun: ISun;
  moon?: IMoon;
  waring: Array<IWarning>;
  livingIndices?: Array<ILivingIndex>;
  precip: IFuturePrecip;
  hourly: Array<IWeatherItem>;
  daily: Array<IDailyItem>;
  now: IWeatherItem;
}
