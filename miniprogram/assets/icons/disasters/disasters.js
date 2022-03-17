Component({
  properties: {
    // 2015 | 9998 | 1050 | 2019 | 1018 | 1008 | 1056 | 1012 | 1045 | 1049 | 1030 | 9999 | 1027 | 1001 | 2008 | 1037 | 1042 | 1015 | 2009 | 2010 | 1011 | 1044 | 1006 | 1606 | 2003 | 1041 | 1059 | 2002 | 1033 | 1005 | 1022 | 2017 | 1603 | 1101 | 2022 | 2007 | 1601 | 1039 | 2028 | 1038 | 2011 | 2016 | 2013 | 1302 | 1034 | 1026 | 1055 | 2014 | 1025 | 2004 | 2018 | 1028 | 1036 | 1607 | 1061 | 1021 | 1054 | 2005 | 1605 | 2026 | 2023 | 2020 | 1004 | 1024 | 2012 | 1048 | 2001 | 1010 | 1053 | 2025 | 1009 | 1032 | 1007 | 1058 | 1057 | 2021 | 1023 | 1051 | 2024 | 1035 | 1046 | 2006 | 1016 | 1047 | 1602 | 1003 | 1402 | 1604 | 1064 | 1014 | 1043 | 1017 | 1040 | 1002 | 1029 | 1013 | 1019 | 1031 | 2027 | 1052 | 1020
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
