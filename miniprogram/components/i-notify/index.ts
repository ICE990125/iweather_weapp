let timer: number; // 定时器

Component({
  properties: {
    message: {
      // 通知内容
      type: String,
      value: '',
    },
    color: {
      // 通知内容颜色
      type: String,
      value: '#fff',
    },
    type: {
      // 通知类型
      type: String,
      value: 'info', // error | warning | info | success
    },
    backgroundColor: String, // 自定义背景颜色
    duration: {
      // 持续时间
      type: Number,
      value: 1000,
    },
  },
  data: {
    innerBackground: '#409EFF', // blue
    show: false, // 是否展示消息通知
  },
  lifetimes: {
    attached() {
      if (this.data.backgroundColor == undefined) {
        if (this.data.type === 'error') {
          this.setData({
            innerBackGround: '#F56C6C',
          });
        } else if (this.data.type === 'success') {
          this.setData({
            innerBackGround: '#67C23A',
          });
        } else if (this.data.type === 'waring') {
          this.setData({
            innerBackGround: '#E6A23C',
          });
        }
      } else {
        this.setData({
          innerBackGround: this.data.backgroundColor,
        });
      }
    },
  },
  methods: {
    hide() {
      clearTimeout(timer);
      this.setData({ show: false });
    },
    show() {
      this.setData({ show: true });

      const { duration } = this.data;
      if (duration > 0 && duration !== Infinity) {
        timer = setTimeout(() => {
          this.hide();
        }, duration);
      }
    },
  },
});
