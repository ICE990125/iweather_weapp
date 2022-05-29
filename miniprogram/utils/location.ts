export default class Location implements ILocation {
  constructor(
    private options: {
      latitude: number;
      longitude: number;
      city?: string;
      address?: string;
    }
  ) {}

  get latitude(): number {
    return this.options.latitude;
  }

  get longitude(): number {
    return this.options.longitude;
  }

  get city(): string | undefined {
    return this.options.city;
  }

  get address(): string | undefined {
    return this.options.address;
  }

  toString(): string {
    return `${this.options.longitude},${this.options.latitude}`;
  }
}
