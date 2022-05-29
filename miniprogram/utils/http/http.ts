export type Methods =
  | 'GET'
  | 'OPTIONS'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT'
  | undefined;

export default class Http {
  private _mock: boolean;
  private _baseUrl: string;

  constructor(options: { baseUrl: string }) {
    this._mock = true;
    this._baseUrl = options.baseUrl;
  }

  set mock(m: boolean) {
    this._mock = m;
  }

  request(options: {
    url: string;
    data?: object;
    method?: Methods;
  }): Promise<any> {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this._baseUrl}${options.url}`,
        method: options.method ?? 'GET',
        data: Object.assign(
          {
            mock: this._mock,
          },
          options.data
        ),
        dataType: 'json',
        timeout: 5000,
        success(res: WechatMiniprogram.IAnyObject) {
          resolve(res.data);
        },
        fail(err: WechatMiniprogram.GeneralCallbackResult) {
          reject(err.errMsg);
        },
      });
    });
  }
}
