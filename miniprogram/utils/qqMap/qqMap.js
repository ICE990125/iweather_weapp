/*************************
 *       腾讯地图         *
 *************************/

import qqMap from './qqmap-wx-jssdk';
import { appKey } from '../../appKey';

class QQMap {
  constructor(key) {
    this.map = new qqMap({
      key: key,
    });
  }

  // 获取当前位置
  addressInfo() {
    return new Promise((resolve, reject) => {
      this.map.reverseGeocoder({
        success(res) {
          const result = res.result;
          const latitude = result.location.lat; // 纬度
          const longitude = result.location.lng; // 经度
          const address = result.formatted_addresses.recommend; // 位置描述
          const city = result.address_component.city; // 市
          const province = result.address_component.province; // 市

          resolve({
            latitude,
            longitude,
            province,
            address,
            city,
          });
        },
        fail(err) {
          reject(err);
        },
      });
    });
  }

  // 关键词搜索
  getSuggestions(value) {
    return new Promise((resolve, reject) => {
      this.map.getSuggestion({
        keyword: value,
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  }
}

// 导出地图实例
export default new QQMap(appKey.qqMap);
