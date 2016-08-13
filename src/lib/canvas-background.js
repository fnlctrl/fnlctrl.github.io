/**
 * Adapted from 'canvas-nest.js'
 * Original repo: https://github.com/aTool-org/canvas-nest.js
 */

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const config = {
    zIndex: 0,
    opacity: 0.7,
    color: "255,255,255",
    numPoints: isMobile ? 33 : 99
};

const theCanvas = document.createElement("canvas");
theCanvas.config = config;
var context = theCanvas.getContext("2d"),
    canvasWidth,
    canvasHeight,
    cursorPoint = {
        x: null, //当前鼠标x
        y: null, //当前鼠标y
        max: 20000
    };

theCanvas.style = "position:fixed; pointer-events:none; top:0; left:0; z-index:" + config.zIndex + ";opacity:" + config.opacity;

resize();
window.onresize = resize;

if (!isMobile) {
    theCanvas.config.numPoints = 40;
    window.onmousemove = ({clientX, clientY}) => {
        cursorPoint.x = clientX;
        cursorPoint.y = clientY;
    };
    window.onmouseout = () => {
        cursorPoint.x = null;
        cursorPoint.y = null;
    };
}

//随机生成config.n条线位置信息
var randomPoints = [];
var random = Math.random;
for (let i = 0, points = config.numPoints; i < points; i++) {
    randomPoints.push({
        x: random() * canvasWidth, //随机位置
        y: random() * canvasHeight,
        xa: (isMobile ? 0.3 : 0.5) * (2 * random() - 1), //随机运动方向
        ya: (isMobile ? 0.3 : 0.5) * (2 * random() - 1),
        max: 6000 //黏附距离
    });
}
//0.1秒后绘制
setTimeout(render, 100);

//设置canvas的高宽
function resize() {
    canvasWidth = theCanvas.width = window.innerWidth;
    canvasHeight = theCanvas.height = window.innerHeight;
}

function render() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    //随机的线条和当前位置联合数组
    var all_array = [cursorPoint].concat(randomPoints);
    var e, i, d, x_dist, y_dist, dist; //临时节点
    //遍历处理每一个点
    randomPoints.forEach((point, index) => {
        point.x += point.xa;
        point.y += point.ya; //移动
        point.xa *= (point.x > canvasWidth || point.x < 0) ? -1 : 1;
        point.ya *= (point.y > canvasHeight || point.y < 0) ? -1 : 1; //碰到边界，反向反弹
        context.fillStyle = `rgb(${theCanvas.config.color})` || '#fff';
        context.fillRect(point.x - 0.5, point.y - 0.5, 1, 1); //绘制一个宽高为1的点
        context.beginPath();
        // context.arc(point.x - 0.5, point.y, 1, 0, 2 * Math.PI, false);
        context.fill();
        for (i = 0; i < all_array.length; i++) {
            e = all_array[i];
            //不是当前点
            if (point !== e && e.x !== null && e.y !== null) {
                x_dist = point.x - e.x; //x轴距离 l
                y_dist = point.y - e.y; //y轴距离 n
                dist = x_dist * x_dist + y_dist * y_dist; //总距离, m
                if (dist < e.max) {
                    //靠近的时候加速
                    if (e === cursorPoint && dist >= e.max / 2) {
                        point.x -= 0.03 * x_dist;
                        point.y -= 0.03 * y_dist
                    }
                    d = (e.max - dist) / e.max;
                    context.beginPath();
                    context.lineWidth = d / 2;
                    context.strokeStyle = "rgba(" + config.color + "," + (d + 0.2) + ")";
                    context.moveTo(point.x, point.y);
                    context.lineTo(e.x, e.y);
                    context.stroke();
                }
            }
        }
        //all_array.pop()
        all_array.splice(all_array.indexOf(point), 1);
    });
    window.requestAnimationFrame(render);
}

export default theCanvas;