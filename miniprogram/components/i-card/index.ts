Component({
  externalClasses: ['i-card-class'],
  relations: {
    '../i-card-title/index': {
      type: 'child',
    },
  },
  properties: {
    outlined: {
      type: Boolean,
      value: false,
    },
  },
  methods: {},
});
