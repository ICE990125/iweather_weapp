// 单例模式...

class Http {
  private static singleton: Http
  private constructor() {}

  private _mock: boolean = true

  static getInstance(): Http {
    if (!Http.singleton) Http.singleton = new Http()

    return Http.singleton
  }

  set mock(m: boolean) {
    this._mock = m
  }

  requests({
    url,
    data,
    method = 'GET',
  }: {
    url: string
    data?: object
    method?: methods
  }): Promise<any> {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: method,
        data: Object.assign(
          {
            mock: this._mock,
          },
          data
        ),
        dataType: 'json',
        timeout: 5000,
        success(res: WechatMiniprogram.IAnyObject) {
          resolve(res.data)
        },
        fail(err: WechatMiniprogram.GeneralCallbackResult) {
          reject(err.errMsg)
        },
      })
    })
  }
}

export default Http.getInstance()
