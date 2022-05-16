export class WeatherItem implements WeatherItemInterface {
  dateTime: Date
  main: {
    temperature: number
    feelsLike?: number | undefined
    humidity: DetailInfoInterface
    precipitation: number
    pressure: DetailInfoInterface
  }
  weather: {
    description: string
    icon: string | number
  }
  wind: {
    wind360: number
    windDir: string
    windScale: string | number
    windSpeed: DetailInfoInterface
  }
  visibility?: DetailInfoInterface | undefined
  clouds?: DetailInfoInterface | undefined
  dewPoint?: DetailInfoInterface | undefined
  pop?: number | undefined

  constructor({
    dateTime,
    main: { temperature, feelsLike, humidity, precipitation, pressure },
    weather: { description, icon },
    wind: { wind360, windDir, windScale, windSpeed },
    visibility,
    clouds,
    dewPoint,
    pop,
  }: WeatherItemInterface) {
    this.dateTime = dateTime
    this.main = {
      temperature,
      feelsLike,
      humidity,
      precipitation,
      pressure,
    }
    this.wind = { wind360, windDir, windScale, windSpeed }
    this.weather = { description, icon }
    this.visibility = visibility
    this.clouds = clouds
    this.dewPoint = dewPoint
    this.pop = pop
  }

  get datetime(): string {
    return this.dateTime.format('yyyy-MM-dd hh:mm:ss')
  }

  get time(): string {
    return this.dateTime.format('hh:mm')
  }
}

export class DailyWeatherItem implements DailyWeatherItemInterface {
  dateTime: Date
  sun: { sunrise: Date; sunset: Date }
  moon: {
    moonrise: Date
    moonset: Date
    moonPhase: string
    moonPhaseIcon: string | number
  }
  temperature: {
    maxTemp: number
    minTemp: number
  }
  day: {
    icon: string | number
    description: string
    wind360: number
    windDir: string
    windScale: string
    windSpeed: DetailInfoInterface
  }
  night: {
    icon: string | number
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
  clouds?: DetailInfoInterface | undefined
  uvIndex: number

  constructor({
    dateTime,
    sun: { sunrise, sunset },
    moon: { moonrise, moonset, moonPhase, moonPhaseIcon },
    temperature: { maxTemp, minTemp },
    day,
    night,
    humidity,
    precipitation,
    pressure,
    visibility,
    clouds,
    uvIndex,
  }: DailyWeatherItemInterface) {
    this.dateTime = dateTime
    this.sun = { sunrise, sunset }
    this.moon = { moonrise, moonset, moonPhase, moonPhaseIcon }
    this.temperature = { maxTemp, minTemp }
    this.day = day
    this.night = night
    this.humidity = humidity
    this.precipitation = precipitation
    this.pressure = pressure
    this.visibility = visibility
    this.clouds = clouds
    this.uvIndex = uvIndex
  }

  get datetime(): string {
    return this.dateTime.format('yyyy-MM-dd hh:mm:ss')
  }

  get time(): string {
    return this.dateTime.format('hh:mm')
  }
}
