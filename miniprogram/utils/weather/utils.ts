export function aqiLevel(aqi: number): number {
  if (aqi >= 0 && aqi <= 50) return 1;
  else if (aqi > 50 && aqi <= 100) return 2;
  else if (aqi > 100 && aqi <= 150) return 3;
  else if (aqi > 150 && aqi <= 200) return 4;
  else if (aqi > 200 && aqi <= 300) return 5;
  else return 6;
}
