Component({
  // 启用多 slot 支持
  options: {
    multipleSlots: true,
  },
  relations: {
    '../i-page-item/index': {
      type: 'child',
      linked(target) {
        const { pages } = this.data;
        pages.push(target.data);
        this.setData({ pages });
      },
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
  },
  methods: {
    onChange(e: any) {
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

      if (children.length == 0) {
        console.error(
          'i-page 必须配合具名插槽使用, 否则将存在渲染层错误(由 swiper 无子节点导致)'
        );
      }
    },
  },
});
