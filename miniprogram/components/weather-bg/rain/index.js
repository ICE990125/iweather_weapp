// 根据雨量控制降雨动画时间
function dropDuration(e) {
  if (e >= 0 && e <= 20) {
    return 2;
  } else if (e <= 50) {
    return 1.5;
  } else {
    return 1;
  }
}

Component({
  properties: {
    nums: {
      type: Number,
      value: 50,
    },
  },
  data: {
    rain: [],
    duration: 2,
  },
  lifetimes: {
    ready() {
      // 生成雨滴及其位置
      const rain = [];
      for (let i = 0; i < this.data.nums; i++) {
        let r1 = Math.random();
        let r2 = Math.random();
        rain.push({
          left: r1 * 100,
          delay: r2 * 5,
          color: Math.floor(r1 * 6),
        });
      }
      this.setData({
        rain,
        duration: dropDuration(this.data.nums),
      });
    },
  },
});
