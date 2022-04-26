import getRainConfig from './rain';
import Pollutions from '../aqi/tools/pollutions';
import Waring from '../../utils/weather/waring';
import uuid from '../../utils/uuid';
import { qWeatherCode } from '../../utils/weather/qWeatherCode';

const app = getApp();

function getShareImgOptions(title, subTitle, other) {
    return {
        bgColor: '#FEEDD7',
        title: {
            text: title,
            color: '#FB8900',
            fontSize: '50px',
        },
        subTitle: {
            text: subTitle,
            color: '#FB8900',
        },
        other: {
            text: other,
            color: '#FB8900',
        },
    };
}

Page({
    data: {
        navBgColor: 'transparent', // 导航栏颜色
        paddingTop: 0,
        navHeight: 0, // 导航栏高度
        isPC: false, // 是否是 PC 端
        city: '正在定位...', // 当前城市
        address: '', // 详细城市
        isReady: false, // 天气信息是否加载完毕
        average: 0, // 平均值
        deltaTemp: 0, // 温度最大最小值差
        unit: '°', // 温度单位
        weatherType: 'sun', // 当前天气类型
        img: '',
    },
    onLoad(options) {
        // 获取状态栏高度
        const { navHeight, statusBarHeight, isPC } = app.globalData;
        this.setData({
            isPC,
            navHeight,
            paddingTop: navHeight + statusBarHeight,
        });

        // 如果当前页面是跳转过来的
        if (options.lat && options.lon) {
            this.getQweather({
                latitude: options.lat,
                longitude: options.lon,
                city: options.name,
                address: typeof options.address === 'undefined' ? '' : options.address,
                isCurrent: false,
            });
        } else if (options.isCurrent) {
            const key = app.globalData.currentLocationUuid;
            const Weather = app.globalData[key];

            this.setData({
                isReady: true,
                ...Weather,
            });
        } else {
            // 如果当前页面是直接进入
            // 获取位置信息
            app.globalData.qqMap
                .addressInfo()
                .then(res => {
                    const { latitude, longitude, address, city } = res;
                    this.getQweather({
                        latitude,
                        longitude,
                        city,
                        address,
                        isCurrent: true,
                    });
                })
                .catch(err => {
                    console.error(`获取位置信息出错, 原因: ${err.message}`);
                });
        }
    },
    getQweather(kwargs) {
        // 获取天气
        // app.globalData.qweather.setMockStatus(false);
        const location = `${kwargs.longitude},${kwargs.latitude}`;
        app.globalData.qweather
            .getAllweather(location)
            .then(res => {
                const Weather = {}; // 天气对象

                // 城市信息
                Weather.city = kwargs.city;
                Weather.address = kwargs.address;
                Weather.latitude = kwargs.latitude;
                Weather.longitude = kwargs.longitude;

                // 当前天气
                const now = res.now;
                Weather.now = {
                    detail: [
                        // 一些比较重要的数据
                        {
                            name: '大气压强',
                            value: now.pressure,
                            unit: 'hPa',
                        },
                        {
                            name: '相对湿度',
                            value: now.humidity,
                            unit: '%',
                        },
                        {
                            name: '能见度',
                            value: now.vis,
                            unit: 'km',
                        },
                        {
                            name: '风速',
                            value: now.windSpeed,
                            unit: 'km/h',
                        },
                    ],
                    feelsLike: now.feelsLike, // 体感温度
                    temperature: now.temp, // 温度
                    desc: now.text, // 天气情况
                    windDir: now.windDir, // 风向
                };

                // 天气类型
                let weatherType = qWeatherCode[now.icon];

                // 空气质量
                const aqi = res.aqi;
                const pollutions = new Pollutions();
                pollutions.pm2p5.value = aqi.pm2p5;
                pollutions.pm10.value = aqi.pm10;
                pollutions.no2.value = aqi.no2;
                pollutions.so2.value = aqi.so2;
                pollutions.co.value = aqi.co;
                pollutions.o3.value = aqi.o3;

                Weather.aqi = {
                    value: aqi.aqi,
                    pubTime: new Date(aqi.pubTime).format('yyyy-MM-dd hh:mm:ss'),
                    category: aqi.category,
                    components: pollutions,
                };

                // 降水
                const minutely = res.precipitation.minutely;
                const prec = minutely.every(e => e.precip === '0.0');

                if (!prec) {
                    // 如果存在降雨
                    Weather.precipitation = res.precipitation;
                    Weather.precipitation.options = getRainConfig(); // 获取降雨图配置
                    const data = Weather.precipitation.options.series[0].data;

                    Weather.precipitation.minutely.forEach(e => {
                        const precip = parseFloat(e.precip); // 和风天气返回的是字符串
                        e.precip = precip;
                        data.push(precip); // 传入降雨数据
                    });
                }

                // 逐小时
                Weather.hours = [...res.next24h];
                Weather.hours.forEach(hour => {
                    hour.time = new Date(hour.fxTime).format('hh:mm');
                });

                // 逐日
                let temp = 0;
                const maxTemps = [],
                    minTemps = [];
                Weather.days = [...res.next7days];
                Weather.days.forEach(day => {
                    const date = new Date(day.fxDate);
                    day.weekday = date.week(); // 星期
                    day.day = date.format('M-dd'); // 日期

                    temp += parseInt(day.tempMax) + parseInt(day.tempMin);

                    maxTemps.push(day.tempMax);
                    minTemps.push(day.tempMin);
                });

                Weather.average = temp / (Weather.days.length * 2); // 温度平均值
                const tempMax = Math.max(...maxTemps);
                const tempMin = Math.min(...minTemps);
                Weather.deltaTemp = tempMax - tempMin; // 最高温度与最低温度之差

                // 生活指数
                Weather.livingIndices = [...res.livingIndices];
                Weather.livingIndices.forEach(e => {
                    e.name = e.name.replace(/指数/, '');
                });

                // 灾害预警
                Weather.warings = [...res.waring];
                Weather.warings.forEach(waring => {
                    const { color, bgColor } = Waring.getWaringColor(waring.level);
                    waring.color = color;
                    waring.bgColor = bgColor;
                });

                // 月亮
                Weather.moonTime = {
                    moonRise: res.moonTime.moonRise, // 月出时间
                    moonSet: res.moonTime.moonSet, // 月落时间
                    moonPhase: res.moonTime.moonPhase, // 月相
                    icon: res.moonTime.moonPhase[0].icon, // 月相图标
                };

                // 太阳
                Weather.sunTime = {
                    sunRise: res.sunTime.sunRise, // 日出时间
                    sunSet: res.sunTime.sunSet, // 日落时间
                };

                // 将天气对象绑定到 globalData 上去
                const key = uuid();
                Weather.uuid = key; // 方便挂载到当前页面
                app.globalData[key] = Weather;

                if (kwargs.isCurrent) {
                    // 仅保存当前位置天气的 uuid
                    app.globalData.currentLocationUuid = key;
                }

                Weather.imgOptions = getShareImgOptions(
                    `${now.temp}${this.data.unit}`,
                    `${now.text}·${now.windDir}·体感 ${now.feelsLike}`,
                    `空气质量 ${aqi.aqi} ${aqi.category}`
                );

                this.setData({
                    isReady: true,
                    weatherType,
                    ...Weather,
                });
            })
            .catch(err => {
                const logManager = wx.getRealtimeLogManager();
                const logger = logManager.tag('getWeatherFail');
                logger.error('w', err);

                let e = typeof err === 'string' ? err : '获取天气失败';
                wx.showToast({
                    title: e,
                    icon: 'none',
                    duration: 2000,
                });
            });
    },
    cites() {
        wx.navigateTo({
            url: '../like/index',
        });
    },
    aqiPage() {
        wx.navigateTo({
            url: `../aqi/index?uuid=${this.data.uuid}`,
        });
    },
    waringPage(e) {
        const index = e.target.dataset.index;

        wx.navigateTo({
            url: `../warn/index?uuid=${this.data.uuid}&index=${index}`,
        });
    },
    onShareAppMessage() {
        const { latitude, longitude, address, city } = this.data;
        return {
            title: `${city}${address}`,
            path: `/pages/home/index?lat=${latitude}&lon=${longitude}&name=${city}&address=${address}`,
            imageUrl: this.data.img,
        };
    },

    ready(e) {
        this.setData({
            img: e.detail.imgTempUrl,
        });
    },
});
