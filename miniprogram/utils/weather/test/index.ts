// 用于测试天气接口, 直接在 app.ts 中引入即可

import QWeatherStrategies from '../strategies/qweather';
import Weather from '../strategies/weather';
import { qWeatherKey } from '../../../appKey';
import Location from '../../location';

const qw = new QWeatherStrategies(qWeatherKey);

const w = new Weather(qw);

const loc = new Location({
  latitude: 21,
  longitude: 110,
});

w.getAllweather(loc).then((res) => console.log(res));
