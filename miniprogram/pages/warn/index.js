const app = getApp();
let waring, uuid;

Page({
    data: {
        bgColor: '', // 预警颜色
        color: '', // 字体颜色
        warn: '', // 预警
        desc: '', // 预警详细信息
        type: 0, // 预警类型
        navIcon: '', // 是否显示返回图标
        isReady: false,
        img: '',
        options: {},
    },

    onLoad(options) {
        const { navHeight, statusBarHeight, isPC } = app.globalData;
        const paddingTop = navHeight + statusBarHeight;

        uuid = options.uuid; // 获取上一页传过来天气对象的 uuid
        const index = options.index;
        waring = app.globalData[uuid].warings[index];

        const bgColor = waring.bgColor;
        const color = waring.color;
        const warn = `${waring.typeName}${waring.level}预警`;
        const desc = waring.text;
        const type = waring.type;

        const re_1 = /\d*年\d*月\d*日\d*时\d*分/;
        const re_2 = /\d*日\d*时\d*分/;
        const res_1 = re_1.exec(waring.text);
        const res_2 = re_2.exec(waring.text);
        const other = res_1 ? res_1[0] : res_2 ? res_2[0] : '暂无发布时间...';

        const op = {
            bgColor,
            title: {
                text: warn,
                color,
            },
            subTitle: {
                text: waring.sender,
                color,
            },
            other: {
                text: other,
                color,
            },
        };

        if (isPC) {
            this.setData({ bgColor, color, warn, desc, paddingTop, type, options: op });
        } else {
            this.setData({
                bgColor,
                color,
                warn,
                desc,
                paddingTop,
                type,
                navIcon: 'back',
                options: op,
            });
        }
    },

    back() {
        wx.navigateBack({
            delta: 1,
        });
    },

    onShareAppMessage() {
        const { latitude, longitude, address, city } = app.globalData[uuid];
        return {
            title: waring.title,
            path: `/pages/home/index?lat=${latitude}&lon=${longitude}&name=${city}&address=${address}`,
            imageUrl: this.data.img,
        };
    },

    ready(e) {
        this.setData({
            img: e.detail.imgTempUrl,
            isReady: true,
        });
    },
});
