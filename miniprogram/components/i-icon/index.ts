import map from './map';

Component({
  externalClasses: ['i-icon-class'],
  properties: {
    name: {
      type: String,
      value: '',
    },
    size: {
      type: Number,
      value: 30,
    },
  },
  lifetimes: {
    attached() {
      if (this.data.name !== '') {
        if (map.hasOwnProperty(this.data.name)) {
          this.setData({
            imgUrl: map[this.data.name as keyof typeof map],
          });
        } else {
          console.warn('i-icon 暂不支持当前类型图标');
        }
      } else {
        console.warn('图标类型不能为空');
      }
    },
  },
  // 允许 <i-icon name="{{xxx ? A : B}}"></i-icon>
  observers: {
    name: function (n: string) {
      this.setData({
        imgUrl: map[n as keyof typeof map],
      });
    },
  },
});
