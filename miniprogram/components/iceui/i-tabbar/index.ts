Component({
  // 启用多 slot 支持
  options: {
    multipleSlots: true,
  },
  relations: {
    '../i-tabbar-item/index': {
      type: 'child',
    },
    '../i-page/index': {
      type: 'parent',
    },
  },
  properties: {
    selected: {
      // 选中的 tab
      type: Number,
      value: 0,
    },
    shadow: {
      // 是否有阴影
      type: Boolean,
      value: true,
    },
  },
  data: {
    children: <any>[],
    nodes: <any>[],
    current: 0,
  },
  methods: {
    switchTab(idx: number): void {
      // 取消激活
      this.data.children[this.data.current].deActivate();

      // 允许外部获取当前 idx
      // xx.wxml
      // <i-tabbar bind:change="onChange"></i-tabbar>
      //
      // xx.ts
      // onChange(e) { const idx = e.detail.idx }
      this.triggerEvent('change', { idx });
    },
  },
  lifetimes: {
    ready() {
      const nodes = this.getRelationNodes('../i-tabbar-item/index');

      this.setData({
        children: nodes,
        nodes: nodes.map((e) => e.data),
        current: this.data.selected,
      });

      if (nodes && nodes.length > 0) {
        // 父组件准备完成, 把相关子组件激活
        nodes[this.data.selected].activate();
      }
    },
  },
  observers: {
    selected: function (n: number) {
      if (this.data.children.length > 0) {
        this.data.children[this.data.current].deActivate();
        this.data.children[n].activate();
      }

      this.setData({
        current: n,
      });
    },
  },
});
