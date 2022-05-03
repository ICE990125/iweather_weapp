export class WaringColor {
  // 未知预警
  static unknown: wColor = {
    backgroundColor: '#EEEEEE',
    color: '#909399',
  }

  //  蓝色预警
  static minor: wColor = {
    backgroundColor: '#C6E5FC',
    color: '#2598F3',
  }

  //  黄色预警
  static moderate: wColor = {
    backgroundColor: '#FEEDD7',
    color: '#FB8900',
  }

  //  橙色预警
  static severe: wColor = {
    backgroundColor: '#FFEBE5',
    color: '#FF7347',
  }

  //  红色预警
  static extreme: wColor = {
    backgroundColor: '#FFD3D3',
    color: '#FF5353',
  }

  static getWaringColor(level: string): wColor {
    switch (level) {
      case '蓝色':
        return WaringColor.minor
      case '黄色':
        return WaringColor.moderate
      case '橙色':
        return WaringColor.severe
      case '红色':
        return WaringColor.extreme
      default:
        return WaringColor.unknown
    }
  }
}
