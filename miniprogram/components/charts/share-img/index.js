import shareImg from './shareImg';

Component({
    properties: {
        options: Object,
    },
    lifetimes: {
        ready() {
            this.createSelectorQuery()
                .in(this)
                .select('#share-img')
                .fields({ node: true, size: true })
                .exec(res => {
                    const s = new shareImg(res[0]);

                    s.init(this.data.options).then(() => {
                        s.getShareImg()
                            .then(res => {
                                this.triggerEvent('isReady', {
                                    imgTempUrl: res.tempFilePath,
                                });
                            })
                            .catch(err => {
                                console.log(err.errMsg);
                            });
                    });
                });
        },
    },
});
