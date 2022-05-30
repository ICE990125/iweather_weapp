Component({
  relations: {
    '../i-page/index': {
      type: 'parent',
    },
  },
  properties: {
    key: String,
  },
  lifetimes: {
    ready() {
      console.log('hello');
    },
  },
});
