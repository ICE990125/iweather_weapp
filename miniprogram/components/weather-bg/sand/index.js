Component({
  properties: {
    nums: {
      type: Number,
      value: 100,
    },
  },
  data: {
    sand: [],
  },
  lifetimes: {
    ready() {
      // 生成沙尘及其位置
      const sand = [];
      for (let i = 0; i < this.data.nums; i++) {
        let r1 = Math.random();
        let r2 = Math.random();
        let r3 = Math.random();
        let r4 = Math.random();
        sand.push({
          top: r1 * 50,
          delay: r2 * 20,
          color: Math.floor(r1 * 6),
          size: r3 * 10,
          animate: Math.floor(r4 * 5),
        });
      }
      this.setData({
        sand,
      });
    },
  },
});
