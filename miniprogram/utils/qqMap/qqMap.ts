/*************************
 *       腾讯地图         *
 *************************/

import qqMap from './qqmap-wx-jssdk';
import { qqMapCode } from '../http/code';

export default class QQMap {
  private map: qqMap;

  constructor(key: string) {
    this.map = new qqMap({
      key: key,
    });
  }

  // 获取当前位置
  addressInfo() {
    return new Promise((resolve, reject) => {
      this.map.reverseGeocoder({
        success(res: Record<string, any>) {
          if (res.status == 0) {
            const {
              location: {
                lat: latitude, // 纬度
                lng: longitude, // 经度
              },
              formatted_addresses: {
                recommend: address, // 位置描述
              },
              address_component: {
                city, // 市
                province, // 省
              },
            } = res.result;

            resolve({
              latitude,
              longitude,
              province,
              address,
              city,
            });
          } else {
            const c: keyof typeof qqMapCode = res.status;
            reject(qqMapCode[c]);
          }
        },
        fail(err: any) {
          reject(err);
        },
      });
    });
  }

  // 关键词搜索
  getSuggestions(value: string) {
    return new Promise((resolve, reject) => {
      this.map.getSuggestion({
        keyword: value,
        success(res: Record<string, any>) {
          if (res.status === 0) {
            resolve(res.data);
          } else {
            const c: keyof typeof qqMapCode = res.status;
            reject(qqMapCode[c]);
          }
        },
        fail(err: any) {
          reject(err);
        },
      });
    });
  }
}
