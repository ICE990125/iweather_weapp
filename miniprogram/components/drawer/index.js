Component({
  properties: {
    isOpen: {
      type: Boolean,
      value: false,
    },
    placement: String,
  },
  methods: {
    closeDrawer() {
      this.setData({
        isOpen: false,
      });
      // 通知外部组件已关闭抽屉
      this.triggerEvent('closeDrawer');
    },
  },
});
