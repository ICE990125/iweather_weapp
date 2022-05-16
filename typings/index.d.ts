/// <reference path="./wx/index.d.ts" />
/// <reference path="./weather/index.d.ts" />
/// <reference path="./location/index.d.ts" />

type methods =
  | 'GET'
  | 'OPTIONS'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT'
  | undefined

type wColor = Record<string, string>

interface Date {
  format(fmt: string): string
  week(): string
  deltaDay(n: number): Date
}

interface IAppOption {
  globalData: {
    [key: string]: any
  }
}
