interface LocationInterface {
  _latitude: number
  _longitude: number
  _city?: string
  _address?: string

  get toString(): string
}
