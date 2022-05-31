/**
 * 与 i-notify 的区别是这是静态的...
 */

Component({
  externalClasses: ['i-alert-class'],
  properties: {
    backgroundColor: {
      type: String,
      value: '#fff',
    },
    color: {
      type: String,
      value: '#000',
    },
    type: String,
    message: String,
    icon: String,
  },
  data: {
    icon_: '',
  },
  lifetimes: {
    attached() {
      const { icon, type } = this.data;

      // 如果 icon 没有定义则使用 type 定义的图标
      if (typeof icon === 'undefined' && typeof type !== 'undefined') {
        this.setData({
          icon_: type,
        });
      }
    },
  },
});
