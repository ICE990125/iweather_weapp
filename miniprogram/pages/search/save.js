export function saveCityHistory({ address, title, lng, lat }) {
    // 先获取缓存数据
    getCityHistory().then(res => {
        let r = new Set(res);
        r.add({
            address,
            title,
            lng,
            lat,
        });

        // 重新存进缓存
        wx.setStorage({
            key: 'city_history',
            data: [...r],
        }).catch(() => {
            console.log('数据存入缓存时出错啦');
        });
    });
}

export function getCityHistory() {
    return new Promise(resolve => {
        wx.getStorage({
            key: 'city_history',
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                // 失败就返回一个空的集合
                resolve([]);
            });
    });
}
