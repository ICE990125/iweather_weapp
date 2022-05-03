import { WaringColor } from './color'

export function aqiHandler(res: Record<string, any>): QWeather.AqiInterface {
  const d = new Date(res.pubTime)
  return {
    pubTime: d,
    time: d.format('yyyy-MM-dd hh:mm:ss'),
    aqi: Number(res.aqi),
    level: Number(res.level),
    category: res.category,
    component: {
      pm10: Number(res.pm10),
      pm2p5: Number(res.pm2p5),
      no2: Number(res.no2),
      so2: Number(res.so2),
      co: Number(res.co),
      o3: Number(res.o3),
    },
  }
}

export function sunHandler(res: Record<string, any>): QWeather.SunInterface {
  return {
    sunRise: new Date(res.sunrise),
    sunSet: new Date(res.sunset),
  }
}

export function moonHandler(res: Record<string, any>): QWeather.MoonInterface {
  return {
    moonRise: new Date(res.moonrise),
    moonSet: new Date(res.moonset),
    moonPhase: res.moonPhase.map((e: Record<string, any>) => {
      return {
        fxTime: new Date(e.fxTime),
        value: Number(e.value),
        name: e.name,
        illumination: Number(e.illumination),
        icon: e.icon,
      }
    }),
  }
}

export function warningHandler(
  res: Array<Record<string, any>>
): QWeather.warings {
  return res.map((e: Record<string, any>) => {
    const c: wColor = WaringColor.getWaringColor(e.level)
    return {
      id: e.id,
      pubTime: new Date(e.pubTime),
      description: e.text,
      title: e.title,
      status: e.status,
      level: e.level,
      type: Number(e.type),
      typeName: e.typeName,
      sender: e.sender ?? '暂无发布单位',
      color: c.color,
      backgroundColor: c.backgroundColor,
    }
  })
}

export function indicesHandler(
  res: Array<Record<string, any>>
): QWeather.indices {
  return res.map((e: Record<string, any>) => {
    return {
      type: Number(e.type),
      name: e.name.replace(/指数/, ''),
      level: Number(e.level),
      category: e.category,
      description: e.text,
    }
  })
}

export function precipHandler(
  res: Record<string, any>
): QWeather.futurePrecipitationInterface {
  const noPrecip = res.minutely.every(
    (e: Record<string, any>) => e.precip === '0.0'
  )
  return {
    summary: res.summary,
    minutely: noPrecip
      ? []
      : res.minutely.map((e: Record<string, any>) => {
          return {
            fxTime: new Date(e.fxTime),
            precip: parseFloat(e.precip),
            type: e.type,
          }
        }),
  }
}

export function hourlyHandler(res: Record<string, any>): QWeather.hourly {
  return res.map((e: Record<string, any>) => {
    const d = new Date(e.fxTime)
    return {
      pubTime: d,
      time: d.format('hh:mm'),
      main: {
        temperature: Number(e.temp),
        humidity: Number(e.humidity),
        precipitation: parseFloat(e.precip),
        pressure: Number(e.pressure),
      },
      weather: {
        description: e.text,
        icon: e.icon,
      },
      wind: {
        wind360: Number(e.wind360),
        windDir: e.windDir,
        windScale: e.windScale,
        windSpeed: Number(e.windSpeed),
      },
      clouds: Number(e.cloud),
      dewPoint: Number(e.dew),
      pop: Number(e.pop),
    }
  })
}

export function dailyHandler(
  res: Record<string, any>
): QWeather.dailyInterface {
  let temp: number = 0
  const maxTemps: Array<number> = [],
    minTemps: Array<number> = []

  const r: Array<QWeather.dInterfaces> = res.map(
    (e: Record<string, any>): QWeather.dInterfaces => {
      const d = new Date(e.fxDate)
      const max = Number(e.tempMax),
        min = Number(e.tempMin)
      temp += max + min
      maxTemps.push(max)
      minTemps.push(min)

      return {
        fxDate: d,
        week: d.week(),
        date: d.format('M-dd'),
        sun: {
          sunrise: new Date(e.sunrise),
          sunset: new Date(e.sunset),
        },
        moon: {
          moonrise: new Date(e.moonrise),
          moonset: new Date(e.moonset),
          moonPhase: e.moonPhase,
          moonPhaseIcon: e.moonPhaseIcon,
        },
        temperature: {
          maxTemp: max,
          minTemp: min,
        },
        day: {
          icon: e.iconDay,
          description: e.textDay,
          wind360: Number(e.wind360Day),
          windDir: e.windDirDay,
          windScale: e.windScaleDay,
          windSpeed: {
            name: '风速',
            value: Number(e.windSpeedDay),
            unit: 'km/h',
          },
        },
        night: {
          icon: e.iconNight,
          description: e.textNight,
          wind360: Number(e.wind360Night),
          windDir: e.windDirNight,
          windScale: e.windScaleNight,
          windSpeed: {
            name: '风速',
            value: Number(e.windSpeedNight),
            unit: 'km/h',
          },
        },
        humidity: {
          name: '空气湿度',
          value: Number(e.humidity),
          unit: '%',
        },
        precipitation: parseFloat(e.precip),
        pressure: {
          name: '大气压强',
          value: Number(e.pressure),
          unit: 'hPa',
        },
        visibility: {
          name: '能见度',
          value: Number(e.vis),
          unit: 'km',
        },
        clouds: {
          name: '大气压力',
          value: Number(e.cloud),
          unit: 'hPa',
        },
        uvIndex: Number(e.uvIndex),
      }
    }
  )

  return {
    daily: r,
    average: temp / (r.length * 2),
    max: Math.max(...maxTemps),
    min: Math.min(...minTemps),
  }
}

export function nowWeatherHandler(
  res: Record<string, any>
): QWeather.aWeatherInterface {
  return {
    pubTime: new Date(res.obsTime),
    main: {
      temperature: Number(res.temp),
      feelsLike: Number(res.feelsLike),
      humidity: {
        name: '空气湿度',
        value: Number(res.humidity),
        unit: '%',
      },
      precipitation: Number(res.precip),
      pressure: {
        name: '大气压力',
        value: Number(res.pressure),
        unit: 'hPa',
      },
    },
    weather: {
      description: res.text,
      icon: res.icon,
    },
    wind: {
      wind360: Number(res.wind360),
      windDir: res.windDir,
      windScale: res.windScale,
      windSpeed: {
        name: '风速',
        value: Number(res.windSpeed),
        unit: 'km/h',
      },
    },
    visibility: {
      name: '能见度',
      value: Number(res.vis),
      unit: 'km',
    },
    clouds: {
      name: '云量',
      value: Number(res.cloud),
      unit: '%',
    },
    dewPoint: {
      name: '露点温度',
      value: Number(res.dew),
      unit: '°',
    },
  }
}
