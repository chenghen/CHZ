
/*
 **时间版运动框架，占用全局 moveTime 变量
 *
 * 参数：
     @ obj   object 执行动画的对象
     @ attr  json 要改变的属性及目标值
     @ timer  number 动画持续时间
     @ callback function （可缺省） 回调函数
 * return： 
 *   默认不需要使用return，当tMove变量被占用是，可以用来代替
 *
    * tMove 函数本身返回一个json，拥有timer属性，可以用来清除定时器
 */
(function () {
    function moveTime(obj, attr, timer, callback) {

        window.requestAnimationFrame = window.requestAnimationFrame || function ( fn ) {return setTimeout(fn,1000/60)};
        window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

        var jsonAttr = obj.currentStyle || getComputedStyle(obj);
        var jsonAttrNum = {};
        var newSize = {};
        var stop = {};
        for (var key in attr) {
            jsonAttrNum[key] = parseFloat(jsonAttr[key]);
            newSize[key] = attr[key] - jsonAttrNum[key];
            if (!newSize[key]) {
                delete jsonAttrNum[key];
                delete newSize[key];
            }
        }
        var date = new Date();
        (function fn() {
            var newDate = new Date();
            var newTimer = newDate - date;
            var scal = newTimer / timer;
            scal >= 1 ? scal = 1 : stop.timer = requestAnimationFrame(fn);
            for (var key in jsonAttrNum) {
                var newAttr = jsonAttrNum[key] + scal * newSize[key];
                if ( key === "opacity" ){
                    obj.style[key] = newAttr;
                    obj.style.filter = "alpha(opacity="+ newAttr*100 +")"; //兼容IE678
                }else {
                    obj.style[key] = newAttr + "px";
                }
            }
            if (scal === 1) {
                callback && callback.call(obj);
            }
        })()
        return stop;
    }
    window.moveTime = moveTime;
    return moveTime;
})()