Component({
  properties: {
    // 901 | 152 | 102 | 151 | 101 | 104 | 509 | 501 | 315 | 306 | 313 | 311 | 307 | 314 | 318 | 310 | 316 | 351 | 317 | 301 | 305 | 303 | 309 | 302 | 308 | 312 | 399 | 300 | 350 | 304 | 999 | 805 | 806 | 800 | 801 | 804 | 802 | 803 | 807 | 403 | 410 | 405 | 407 | 457 | 409 | 400 | 402 | 401 | 456 | 408 | 404 | 406 | 499 | 500 | 502 | 504 | 512 | 900 | 515 | 100 | 503 | 153 | 507 | 103 | 150 | 513 | 511 | 508 | 514 | 510
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          colors: this.fixColor(),
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 40,
      observer: function(size) {
        this.setData({
          svgSize: size,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: 40,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
