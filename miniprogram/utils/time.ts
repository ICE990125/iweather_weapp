// 日期格式化
Date.prototype.format = function (fmt: string) {
  // 年
  const y = /y+/.exec(fmt)
  fmt = y
    ? fmt.replace(y[0], String(this.getFullYear()).substring(4 - y[0].length))
    : fmt

  const o: { [key: string]: number } = {
    'M+': this.getMonth() + 1, // 月
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    ms: this.getMilliseconds(), // 毫秒
  }

  for (let key in o) {
    const regex = new RegExp(key)
    const v = regex.exec(fmt)
    fmt = v
      ? fmt.replace(
          v[0],
          v[0].length === 1
            ? String(o[key])
            : `00${o[key]}`.substring(String(o[key]).length)
        )
      : fmt
  }

  return fmt
}

// 星期几
Date.prototype.week = function (): string {
  const w: Array<string> = ['日', '一', '二', '三', '四', '五', '六']

  return w[this.getDay()]
}

// 获取距离 n 天的日期
Date.prototype.deltaDay = function (n): Date {
  const timestamp = new Date().getTime() // 当前日期的时间戳

  // 时间戳加上指定天数(1000 * 3600 * 24)
  return new Date(timestamp + n * 86400000)
}
