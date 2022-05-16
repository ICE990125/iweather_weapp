export default class Precipitation implements PrecipItem {
  dateTime: Date
  precip: number
  type: string

  constructor({ dateTime, precip, type }: PrecipItem) {
    this.dateTime = dateTime
    this.precip = precip
    this.type = type
  }

  get datetime(): string {
    return this.dateTime.format('yyyy-MM-dd hh:mm:ss')
  }

  get time(): string {
    return this.dateTime.format('HH:mm')
  }
}
