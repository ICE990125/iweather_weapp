import Aqi from './aqi'
import { Sun, MoonPhase, Moon } from './astronomy'
import Warning from './warings'
import LivingIndex from './livingIndex'
import Precipitation from './precipitation'
import { WeatherItem, DailyWeatherItem } from './weatherItem'
import { uuid } from '../../util'
import Location from '../../location'

interface weatherInfoInterface {
  location: Location
  aqi: Aqi
  sun: Sun
  moon: Moon
  waring: Array<Warning>
  livingIndices: Array<LivingIndex>
  precipitation: FuturePrecipitationInterface
  next24h: Array<WeatherItem>
  next7days: DailyInterface
  now: WeatherItem
}

class WeatherInfo {
  readonly uuid: string
  public location: Location
  public aqi: Aqi
  public sun: Sun
  public moon: Moon
  public waring: Array<Warning>
  public livingIndices: Array<LivingIndex>
  public precipitation: FuturePrecipitationInterface
  public next24h: Array<WeatherItem>
  public next7days: DailyInterface
  public now: WeatherItem

  constructor({
    location,
    aqi,
    sun,
    moon,
    waring,
    livingIndices,
    precipitation,
    next24h,
    next7days,
    now,
  }: weatherInfoInterface) {
    this.uuid = uuid()
    this.location = location
    this.aqi = aqi
    this.sun = sun
    this.moon = moon
    this.waring = waring
    this.livingIndices = livingIndices
    this.precipitation = precipitation
    this.next7days = next7days
    this.next24h = next24h
    this.now = now
  }
}

export {
  Aqi,
  Sun,
  MoonPhase,
  Moon,
  Warning,
  LivingIndex,
  Precipitation,
  WeatherItem,
  DailyWeatherItem,
  WeatherInfo,
}
