Component({
  properties: {
    open: {
      type: Boolean,
      value: false,
    },
    placement: {
      // bottom | right | top | left
      type: String,
      value: 'bottom',
    },
  },
  methods: {
    close() {
      this.setData({
        open: false,
      });
      // 通知外部组件已关闭抽屉
      this.triggerEvent('close');
    },
  },
});
