Component({
  // 启用多 slot 支持
  options: {
    multipleSlots: true,
  },
  relations: {
    '../i-page-item/index': {
      type: 'child',
    },
    '../i-tabbar/index': {
      type: 'child',
    },
  },
  properties: {
    lazyRender: {
      // 是否开始延迟加载
      type: Boolean,
      value: true,
    },
    selected: {
      // 当前页
      type: Number,
      value: 0,
    },
  },
  data: {
    pages: <any>[],
    display: <any>[], // 实现懒加载? ...emmm
  },
  methods: {
    onChange(e: any) {
      const d = this.data.display;
      d[e.detail.current] = true;

      this.setData({
        display: d,
      });
      // 向父组件/页面传值, 方便修改 tabbar 的 current
      this.triggerEvent('change', { idx: e.detail.current });
    },
  },
  lifetimes: {
    ready() {
      const children = this.getRelationNodes('../i-page-item/index');
      const nodes = this.getRelationNodes('../i-tabbar/index');

      if (nodes.length > 0) {
        const tabbar = nodes[0];
        const tabbarItems = tabbar.data.children;

        if (tabbarItems.length > 0 && children.length !== tabbarItems.length) {
          console.warn('page 个数与 tabbar 个数不匹配, 将会导致奇怪的错误');
        }
      }

      if (this.data.lazyRender) {
        const d = new Array<boolean>(children.length);
        d[this.data.selected] = true;

        this.setData({
          pages: children.map((e) => e.data), // 没太大用, 主要用来使用 wx:for 渲染 slot
          display: d,
        });
      } else {
        // 不需要懒加载的话全部都位都为 true
        const d = new Array<boolean>(children.length).fill(true);

        this.setData({
          pages: children.map((e) => e.data),
          display: d,
        });
      }
    },
  },
});
