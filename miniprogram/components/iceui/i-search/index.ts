Component({
  externalClasses: ['placeholder-class'],
  properties: {
    shape: {
      type: String,
      value: 'round', // round | square
    },
    value: {
      type: String,
      value: '',
    },
    background: {
      //  搜索输入框外背景色
      type: String,
      value: '#fff',
    },
    disabled: {
      // 是否禁用
      type: Boolean,
      value: false,
    },
    placeholder: {
      type: String,
      value: '输入搜索内容',
    },
    maxlength: {
      // 最大输入长度
      type: Number,
      value: 100,
    },
    focus: {
      // 是否立即聚集
      type: Boolean,
      value: false,
    },
    center: {
      // placeholder 是否居中
      type: Boolean,
      value: false,
    },
    borderRadius: Number, // 自定义 border-radius
  },
  data: {
    radius: 0,
  },
  lifetimes: {
    attached() {
      const { shape, borderRadius } = this.data;

      if (shape === 'round') {
        this.setData({
          radius: 50 / 2,
        });
      } else if (shape !== 'square') {
        if (borderRadius !== 0) {
          this.setData({
            radius: borderRadius,
          });
        }
      }
    },
  },
  methods: {
    search(e: any) {
      this.triggerEvent('search', e.detail);
    },
    blur(e: any) {
      this.triggerEvent('blur', e.detail);
    },
    focus(e: any) {
      this.triggerEvent('focus', e.detail);
    },
    change(e: any) {
      // 输入时触发
      this.triggerEvent('change', e.detail);
    },
  },
});
