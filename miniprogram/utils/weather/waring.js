export default class Waring {
  static Unknown = {
    bgColor: '#EEEEEE',
    color: '#909399',
  };

  //  蓝色预警
  static Minor = {
    bgColor: '#C6E5FC',
    color: '#2598F3',
  };

  //  黄色预警
  static Moderate = {
    bgColor: '#FEEDD7',
    color: '#FB8900',
  };

  //  橙色预警
  static Severe = {
    bgColor: '#FFEBE5',
    color: '#FF7347',
  };

  //  红色预警
  static Extreme = {
    bgColor: '#FFD3D3',
    color: '#FF5353',
  };

  static getWaringColor(level) {
    switch (level) {
      case '蓝色':
        return {
          color: Waring.Minor.color,
          bgColor: Waring.Minor.bgColor,
        };
      case '黄色':
        return {
          color: Waring.Moderate.color,
          bgColor: Waring.Moderate.bgColor,
        };
      case '橙色':
        return {
          color: Waring.Severe.color,
          bgColor: Waring.Severe.bgColor,
        };
      case '红色':
        return {
          color: Waring.Extreme.color,
          bgColor: Waring.Extreme.bgColor,
        };
      default:
        return {
          color: Waring.Unknown.color,
          bgColor: Waring.Unknown.bgColor,
        };
    }
  }
}
