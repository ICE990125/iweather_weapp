Component({
  externalClasses: ['alert-class'],
  properties: {
    backgroundColor: {
      type: String,
      value: '#fff',
    },
    color: {
      type: String,
      value: '#000'
    },
    text: String,
    rightIcon: {
      type: String,
      value: 'enter',
    },
    type: String, // 自然灾害类型
    size: {
      type: Number, // 图标大小
      value: 20,
    },
  },
});
