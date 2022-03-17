import { Canvas } from '../canvas';

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Line extends Canvas {
  constructor(chart) {
    super(chart);
  }

  init(options) {
    const series = options.series;
    const textStyle = options.textStyle;
    // 横纵坐标数据
    this.XAxis = options.XAxis;
    this.YAxis = options.YAxis;

    // 字体大小
    const fontSize = textStyle?.fontSize || 14;
    // 字体类型
    const fontFamily = textStyle?.fontFamily || 'monospace';
    // 设置画布字体
    this.ctx.font = `${fontSize}px ${fontFamily}`;
    // 设置字体对齐
    this.ctx.textAlign = textStyle?.textAlign || 'center';

    let data = [],
      maxLength = 0;

    series.forEach(el => {
      if (el.data instanceof Array) {
        data.push(el.data);
        if (el.data.length > maxLength) maxLength = el.data.length;
      }
    });

    let Max = this.YAxis[0].value * 1.2; // 纵坐标最大值
    let dataMax = Math.max(...data.flat());

    if (dataMax > Max) {
      // 如果数据比给定的最大值大
      Max = dataMax * 1.2;
    }

    this.Max = Max;
    // 起始点的横坐标 X
    this.startX = 0;
    // 基线的纵坐标 Y (留给横坐标文字 1.1 倍字体空间)
    this.baseY = this.height - fontSize * 1.1;
    // 每个点所占有的宽度
    // 这里由于起始点 starX=0
    // 为了让末尾的点出现在 this.width 处, 所以 maxLength - 1
    this.diffX = this.width / (maxLength - 1);
    // 单位长度占据的高度
    this.diffY = this.baseY / Max;

    // 开始绘图

    // 绘制坐标轴网格
    this.drawAxisGrid();

    // 绘制曲线
    series.forEach(el => {
      if (el.data instanceof Array) {
        this.BezierLine(el); // 贝塞尔曲线
        this.drawBackground(el); // 背景
      }
    });

    // 绘制坐标轴
    this.drawAxis();
  }

  // 绘制坐标网格
  drawAxisGrid() {
    // 纵向分成 5 段
    const diffY = this.baseY / 5;
    // 横向分成给定坐标个数
    let num;
    if (this.XAxis instanceof Array) {
      num = this.XAxis.length - 1;
    } else {
      num = 4;
    }
    this.AxisDiffX = this.width / num;

    // 开始绘制
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#C0C4CC';
    this.ctx.setLineDash([5, 5]);

    // 横向网络
    for (let i = 0; i <= 5; i++) {
      const y = i * diffY;
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
    }

    // 纵向网络
    for (let i = 0; i <= num; i++) {
      const x = i * this.AxisDiffX;
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.baseY);
    }

    this.ctx.stroke();
  }

  // 绘制坐标轴
  drawAxis() {
    this.ctx.beginPath();
    // 绘制横坐标标识线及文字
    this.ctx.strokeStyle = '#606266';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'bottom';
    this.ctx.fillStyle = '#606266';
    this.YAxis.forEach(e => {
      const y = this.baseY - e.value * this.diffY;
      this.ctx.moveTo(0, y);
      this.ctx.fillText(e.name, 0, y);
      this.ctx.lineTo(this.width, y);
    });

    this.ctx.stroke();

    // 绘制横坐标文字
    this.XAxis.forEach((e, index) => {
      if (index === 0) {
        this.ctx.textAlign = 'left';
      } else if (index === this.XAxis.length - 1) {
        this.ctx.textAlign = 'right';
      } else {
        this.ctx.textAlign = 'center';
      }
      this.ctx.fillText(e, index * this.AxisDiffX, this.height);
    });
  }

  // 画曲线图背景
  drawBackground(el) {
    const { lineStyle } = el;

    if (typeof lineStyle?.backgroundColor !== 'undefined') {
      const { data } = el;
      // 基线终点
      this.ctx.lineTo(this.startX + (data.length - 1) * this.diffX, this.baseY);
      // 基线起点
      this.ctx.lineTo(this.startX, this.baseY);

      this.ctx.fillStyle = lineStyle.backgroundColor;
      this.ctx.fill();
    }
  }

  /**
   * 计算当前点的贝塞尔曲线控制点
   * @param {Point} previousPoint: 前一个点
   * @param {Point} currentPoint: 当前点
   * @param {Point} nextPoint1: 下一个点
   * @param {Point} nextPoint2: 下下个点
   * @param {Number} scale: 系数
   */
  calcBezierControlPoints(
    previousPoint,
    currentPoint,
    nextPoint1,
    nextPoint2,
    scale = 0.25
  ) {
    let x = currentPoint.x + scale * (nextPoint1.x - previousPoint.x);
    let y = currentPoint.y + scale * (nextPoint1.y - previousPoint.y);

    const controlPointA = new Point(x, y); // 控制点 A

    x = nextPoint1.x - scale * (nextPoint2.x - currentPoint.x);
    y = nextPoint1.y - scale * (nextPoint2.y - currentPoint.y);

    const controlPointB = new Point(x, y);

    return { controlPointA, controlPointB };
  }

  /**
   * 绘制贝塞尔曲线路径
   * @param {*} ctx
   * @param {*} data
   * @param {*} options
   */
  BezierLine(el) {
    const { data } = el;

    const { startX, baseY, diffY, diffX } = this;

    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.baseY - data[0] * this.diffY);

    data.forEach((e, i) => {
      let curPoint, prePoint, nextPoint1, nextPoint2, x, y;

      // 当前点
      x = startX + diffX * i;
      y = baseY - e * diffY;
      curPoint = new Point(x, y);

      // 前一个点
      x = startX + diffX * (i - 1);
      y = baseY - data[i - 1] * diffY;
      prePoint = new Point(x, y);

      // 下一个点
      x = startX + diffX * (i + 1);
      y = baseY - data[i + 1] * diffY;
      nextPoint1 = new Point(x, y);

      // 下下个点
      x = startX + diffX * (i + 2);
      y = baseY - data[i + 2] * diffY;
      nextPoint2 = new Point(x, y);

      if (i === 0) {
        // 如果是第一个点, 则前一个点用当前点代替
        prePoint = curPoint;
      } else if (i === data.length - 2) {
        // 如果是倒数第二个点, 则下下个点用下一个点代替
        nextPoint2 = nextPoint1;
      } else if (i === data.length - 1) {
        // 最后一个点直接退出
        return;
      }

      const { controlPointA, controlPointB } = this.calcBezierControlPoints(
        prePoint,
        curPoint,
        nextPoint1,
        nextPoint2
      );

      this.ctx.bezierCurveTo(
        controlPointA.x,
        controlPointA.y,
        controlPointB.x,
        controlPointB.y,
        nextPoint1.x,
        nextPoint1.y
      );
    });
  }
}
