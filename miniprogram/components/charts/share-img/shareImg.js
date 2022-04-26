import { Canvas } from '../canvas';

export default class shareImg extends Canvas {
    constructor(chart) {
        super(chart);
    }
    init(options) {
        return new Promise(resolve => {
            // 背景
            this.ctx.fillStyle = options.bgColor || '#fff';
            this.ctx.fillRect(0, 0, this.width, this.height);

            this.ctx.textAlign = 'center';
            // 主标题
            this.ctx.fillStyle = options.title.color;
            this.ctx.font = `${options.title.fontSize || '30px'} monospace`;
            this.ctx.fillText(options.title.text, this.width / 2, this.height * 0.3);
            // 副标题
            this.ctx.font = '20px monospace';
            this.ctx.fillText(options.subTitle.text, this.width / 2, this.height * 0.6);
            // 其他
            this.ctx.fillStyle = options.other.color;
            this.ctx.fillText(options.other.text, this.width / 2, this.height * 0.8);
            resolve();
        });
    }
    // 获取分享图片
    getShareImg() {
        return wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: this.width,
            height: this.height,
            canvas: this.canvas,
        });
    }
}
