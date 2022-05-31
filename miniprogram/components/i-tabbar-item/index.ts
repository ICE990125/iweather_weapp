Component({
  relations: {
    '../i-tabbar/index': {
      type: 'parent',
    },
  },
  properties: {
    icon: String, // 目前仅支持 home | me | location | like
    name: String,
    key: Number,
  },
  data: {
    active: false,
  },
  methods: {
    // tab 激活事件
    activate() {
      //  避免反复点击触发多次 setData
      if (!this.data.active) {
        this.setData({
          active: true,
        });

        // 父组件一般只有一个
        const parent = this.getRelationNodes('../i-tabbar/index')[0];

        const idx = parent.data.children.indexOf(this);

        if (idx !== parent.data.current) {
          // 父组件 tabbar 进行切换(关掉其他 tabbar-item)
          parent.switchTab(idx);
        }
      }
    },
    // tab 取消激活事件
    deActivate() {
      if (this.data.active) {
        this.setData({
          active: false,
        });
      }
    },
  },
});
