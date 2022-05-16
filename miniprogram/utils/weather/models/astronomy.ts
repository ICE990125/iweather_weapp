export class Sun implements SunInterface {
  sunRise: Date
  sunSet: Date

  constructor({ sunRise, sunSet }: SunInterface) {
    this.sunRise = sunRise
    this.sunSet = sunSet
  }

  get sunrise(): string {
    return this.sunRise.format('hh:mm')
  }

  get sunset(): string {
    return this.sunSet.format('hh:mm')
  }
}

export class MoonPhase implements MoonPhaseInterface {
  dateTime: Date
  value: number
  name: string
  illumination: number
  icon: string | number

  constructor({
    dateTime,
    value,
    name,
    illumination,
    icon,
  }: MoonPhaseInterface) {
    this.dateTime = dateTime
    this.value = value
    this.name = name
    this.illumination = illumination
    this.icon = icon
  }

  get datetime() {
    return this.dateTime.format('hh:mm')
  }
}

export class Moon implements MoonInterface {
  moonRise: Date
  moonSet: Date
  moonPhase: Array<MoonPhase>

  constructor({
    moonRise,
    moonSet,
    moonPhase,
  }: {
    moonRise: Date
    moonSet: Date
    moonPhase: Array<MoonPhase>
  }) {
    this.moonPhase = moonPhase
    this.moonRise = moonRise
    this.moonSet = moonSet
  }

  get moonrise(): string {
    return this.moonRise.format('hh:mm')
  }

  get moonset(): string {
    return this.moonSet.format('hh:mm')
  }
}
