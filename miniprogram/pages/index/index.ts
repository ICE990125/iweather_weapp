import Location from '../../utils/location'
import qweather from '../../utils/weather/weather'

Page({
  data: {},
  onLoad() {
    const loc = new Location(20, 110)
    qweather.getAllweather(loc).then((res) => {
      console.log(res)
    })
  },
})
