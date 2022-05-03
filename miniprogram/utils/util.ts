// 获取 UUID
export function uuid(): string {
  const s: Array<string> = []
  const hexDigits: string = '0123456789abcdef'
  
  for (var i = 0; i < 36; i++) {
    const start: number = Math.floor(Math.random() * 0x10)
    s[i] = hexDigits.substring(start, start + 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substring((Number(s[19]) & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}
