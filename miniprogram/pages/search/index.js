import suggestions from './suggestions';
import { getCityHistory, saveCityHistory } from './save';

const app = getApp();

Page({
    data: {
        paddingTop: 0,
        value: '',
        placeholder: '例如 北京市',
        cities: [...suggestions()],
        isOpen: false, // 是否打开抽屉
        search: [], // 搜索结果
        navIcon: '', // 导航栏图标
        history: [], // 搜索历史
    },
    onLoad: async function () {
        const app = getApp();
        const { navHeight, statusBarHeight, currentLocationUuid, isPC } = app.globalData;

        const cities = await getCityHistory();

        this.setData({
            paddingTop: navHeight + statusBarHeight,
            // 判断是否存在当前城市的 uuid
            showCurrent: currentLocationUuid ? true : false,
            isPC,
            history: [...cities],
        });
    },
    back() {
        wx.navigateBack({
            delta: 1,
        });
    },
    // 默认建议
    select(e) {
        const index = e.currentTarget.dataset.index;
        const loc = this.data.cities[index];
        const latitude = loc.lat;
        const longitude = loc.lng;
        const name = loc.name;

        wx.reLaunch({
            url: `../home/index?lat=${latitude}&lon=${longitude}&name=${name}`,
        });
    },
    // Geo 搜索后
    GeoSelect(e) {
        const index = e.currentTarget.dataset.index;
        const loc = this.data.search[index];

        const { address, latitude, longitude, title } = loc;
        saveCityHistory({ address, title, lat: latitude, lng: longitude });

        wx.reLaunch({
            url: `../home/index?lat=${latitude}&lon=${longitude}&name=${title}&address=${address}`,
        });
    },
    // 搜索建议
    getInput(e) {
        const value = e.detail.value;
        if (value !== '') {
            app.globalData.qqMap
                .getSuggestions(value)
                .then(res => {
                    const search = res.map(el => {
                        return {
                            city: el.city,
                            province: el.province,
                            title: el.title,
                            district: el.district,
                            latitude: el.location.lat,
                            longitude: el.location.lng,
                            address: el.address,
                        };
                    });

                    this.setData({
                        search,
                        isOpen: true,
                    });
                })
                .catch(() => {
                    wx.showToast({
                        title: '暂不支持...',
                        icon: 'none',
                        duration: 2000,
                    });
                });
        }
    },
    // 地图选点
    chooseLocation() {
        wx.chooseLocation()
            .then(res => {
                if (res.address !== '') {
                    const latitude = res.latitude;
                    const longitude = res.longitude;
                    const name = res.name;
                    const address = res.address;

                    saveCityHistory({ address, title: name, lat: latitude, lng: longitude });

                    wx.reLaunch({
                        url: `../home/index?lat=${latitude}&lon=${longitude}&name=${name}&address=${address}`,
                    });
                }
            })
            .catch(err => {
                console.error(`地图选点失败, 原因: ${err.errMsg}`);
            });
    },
    // 返回当前城市
    current() {
        wx.reLaunch({
            url: '../home/index?isCurrent=true',
        });
    },
    // 关闭遮罩
    closeDrawer() {
        this.setData({
            isOpen: false,
        });
    },
    // 历史记录
    selectHistory(e) {
        const index = e.currentTarget.dataset.index;
        const loc = this.data.history[index];
        const { address, lat, lng, title } = loc;

        wx.reLaunch({
            url: `../home/index?lat=${lat}&lon=${lng}&name=${title}&address=${address}`,
        });
    },
    // 清空历史记录
    clearHistory() {
        wx.removeStorage({ key: 'city_history' }).catch(err => {
            console.log(err.errMsg);
        });
        this.setData({
            history: [],
        });
    },
});
