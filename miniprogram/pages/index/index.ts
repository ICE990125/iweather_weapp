import Location from '../../utils/location'

const app = getApp()

Page({
  data: {},
  onLoad() {
    const loc = new Location(20, 110)
    app.globalData.weather.getAllweather(loc).then((res: any) => {
      console.log(res)
      this.setData({
        weather: res,
      })
    })
  },
})
