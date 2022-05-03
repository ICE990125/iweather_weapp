class Location implements LocationInterface {
  constructor(
    readonly _latitude: number,
    readonly _longitude: number,
    readonly _city?: string,
    readonly _address?: string
  ) {}

  get locationString(): string {
    return `${this._longitude},${this._latitude}`
  }
}

export default Location
