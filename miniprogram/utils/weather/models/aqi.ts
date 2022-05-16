export default class Aqi implements AqiInterface {
  dateTime: Date
  aqi: number
  level: number
  category: string
  component: { [key: string]: number }

  constructor({ dateTime, aqi, level, category, component }: AqiInterface) {
    this.dateTime = dateTime
    this.aqi = aqi
    this.level = level
    this.category = category
    this.component = component
  }

  get datetime(): string {
    return this.dateTime.format('yyyy-MM-dd hh:mm:ss')
  }
}
