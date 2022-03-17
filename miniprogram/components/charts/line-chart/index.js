import { Line } from './line';

Component({
  externalClasses: ['line-class'],
  properties: {
    height: {
      type: String,
      value: '150px',
    },
    options: Object,
  },
  lifetimes: {
    ready() {
      this.draw(this.data.options);
    },
  },
  methods: {
    draw(options) {
      this.createSelectorQuery()
        .in(this)
        .select('#line')
        .fields({ node: true, size: true })
        .exec(res => {
          const line = new Line(res[0]);
          line.init(options);
        });
    },
  },
});
