Component({
  properties: {
    nums: {
      type: Number,
      value: 100,
    },
  },
  data: {
    snow: [],
  },
  lifetimes: {
    ready() {
      // 生成雪花及其位置
      const snow = [];
      for (let i = 0; i < this.data.nums; i++) {
        let r1 = Math.random();
        let r2 = Math.random();
        let r3 = Math.random();
        let r4 = Math.random();
        snow.push({
          left: r1 * 100,
          delay: r2 * 20,
          color: Math.floor(r1 * 6),
          size: r3 * 10,
          animate: Math.floor(r4 * 2),
        });
      }
      this.setData({
        snow,
      });
    },
  },
});
