//封装获取元素方法
function query(selector) {
	//selector: css选择器

	return document.querySelector(selector);
}

//封装绑定事件方法(考虑兼容性)
function addEvent(element, type, fn, isCapture){
	isCapture = isCapture ? true : false;

	//非IE8或者IE8以下的浏览器绑定事件
	if (window.addEventListener) {
		element.addEventListener(type, fn, isCapture);
	} else {
		//IE8或者IE8以下的浏览器绑定事件
		element.attachEvent('on' + type, fn);
	}
}

//获取开始游戏按钮
var begin = query('#begin');

//获取开始游戏界面元素
var start = query('#start');

//获取游戏界面元素
var game = query('#game');

//获取游戏主界面元素
var plane = query('#plane');

//获取游戏主界面元素计算后样式
var planeStyle = window.getComputedStyle(plane);

//获取游戏主界面元素计算后样式的宽度
var planeWidth = parseInt(planeStyle.width);

//获取游戏主界面元素计算后样式的高度
var planeHeight = parseInt(planeStyle.height);

//获取我方飞机的元素
var myplane = query('#myplane');
var myplaneStyle  = window.getComputedStyle(myplane);
var myplaneWidth = parseInt(myplaneStyle.width);
var myplaneHeight = parseInt(myplaneStyle.height);

//获取游戏界面layer绑定鼠标移动事件的元素
var layer = query('#layer');


//移动背景定时器序号
var moveBgTimer = null;

//生成子弹实例定时器序号
var bulletTimer = null;

//移动子弹实例定时器序号
var moveBulletTimer = null;

//生成敌机实例定时器序号
var enemyPlaneTimer = null;

//移动敌机实例定时器序号
var moveEnemyPlaneTimer = null;

//移动游戏背景
function moveGameBg() {
	//获取背景所有元素
	var bgs = document.getElementsByClassName('bg');

	//开启定时器移动背景
	moveBgTimer = setInterval(function () {
		for (var i = 0; i < bgs.length; i++) {
			//获取当前背景元素的top
			var currentTop = parseInt(window.getComputedStyle(bgs[i]).top);
			//每一步移动2个像素
			currentTop += 2;

			//如果当前的元素top值超出游戏主界面高度, 将当前的元素top值重置为 -planeHeight
			if (currentTop >= planeHeight) {
				currentTop = -planeHeight;
			}

			//移动背景
			bgs[i].style.top = currentTop + 'px';

		}
	}, 50);

}

//移动我方敌机
function myPlane(e) {

	//e: 事件对象
	//获取鼠标坐标
	var x = e.offsetX;
	var y = e.offsetY;

	//我方飞机横向移动范围
	var maxX = planeWidth - myplaneWidth;
	var minX = 0;

	//我方飞机纵向移动范围
	var maxY = planeHeight - myplaneHeight;
	var minY = 0;

	//我方飞机移动坐标
	var x0 = x - myplaneWidth / 2;
	var y0 = y - myplaneHeight / 2;

	//控制我方飞机移动范围
	x0 = x0 > maxX ? maxX : x0 < minX ? minX : x0;
	y0 = y0 > maxY ? maxY : y0 < minY ? minY : y0;

	//移动我方飞机
	myplane.style.left = x0 + 'px';
	myplane.style.top = y0 + 'px';

}

//构建子弹类

//子弹实例
var bullet; 

//子弹类
function Bullet() {
	//子弹宽度和高度
	this.bulletWidth = 6;
	this.bulletHeight = 14;

	//子弹移动坐标
	this.bulletX = 0;
	this.bulletY = 0;

	//子弹DOM元素
	this.currentBullet = null;

	//子弹图片路径
	this.bulletSrc = './images/bullet.png';
}

//创建子弹
Bullet.prototype.createBullet = function () {

	//创建子弹图片元素
	this.currentBullet = document.createElement('img');

	//链接子弹图片资源
	this.currentBullet.src = this.bulletSrc;

	this.currentBullet.style.position = 'absolute';
	this.currentBullet.style.zIndex = 2;
	this.currentBullet.style.width = this.bulletWidth;
	this.currentBullet.style.height = this.bulletHeight;

	//获取我方飞机坐标
	var myplaneX = parseInt(myplane.style.left);
	var myplaneY = parseInt(myplane.style.top);

	//生成子弹坐标
	this.bulletX = myplaneX + myplaneWidth / 2 - this.bulletWidth / 2;
	this.bulletY = myplaneY - this.bulletHeight;

	//设置子弹坐标
	this.currentBullet.style.left = this.bulletX + 'px';
	this.currentBullet.style.top = this.bulletY + 'px';

	//将子弹DOM添加在游戏界面元素game中
	game.appendChild(this.currentBullet);

}

//移动子弹
Bullet.prototype.moveBullet = function (bullets, index) {
	//bullets: 子弹实例数组
	//index: 子弹实例索引

	//每一步移动一个像素
	this.bulletY -= 2;

	if (this.bulletY <= 0) {
		//移除子弹DOM元素
		this.currentBullet.remove();

		//从子弹实例数组移除当前子弹实例
		bullets.splice(index, 1);
	} else {
		//移动子弹
		this.currentBullet.style.top = this.bulletY + 'px';
	}
}

//子弹碰撞敌机
Bullet.prototype.shootEnemyPlane = function (bullets, enemyPlanes, index) {
	//子弹碰撞敌机条件
	//每一个子弹实例都需要遍历所有敌机实例
	for (var i = 0; i < enemyPlanes.length; i++) {
		//子弹碰撞敌机
		if (this.bulletX >= enemyPlanes[i].enemyPlaneX - this.bulletWidth && this.bulletX <= enemyPlanes[i].enemyPlaneX + enemyPlanes[i].enemyPlaneWidth && this.bulletY >= enemyPlanes[i].enemyPlaneY - this.bulletHeight && this.bulletY <= enemyPlanes[i].enemyPlaneY + enemyPlanes[i].enemyPlaneHeight) {
			//减少敌机的血量
			enemyPlanes[i].enemyPlaneBlood -= 1;

			//如果敌机的血量为0, 需要移除敌机DOM, 并且从敌机实例数组移除当前敌机
			if (enemyPlanes[i].enemyPlaneBlood <= 0) {

				//创建敌机爆炸图
				var boomEnemyPlane = document.createElement('img');
				boomEnemyPlane.src = enemyPlanes[i].enemyPlaneDieSrc;
				boomEnemyPlane.style.width = enemyPlanes[i].enemyPlaneWidth + 'px';
				boomEnemyPlane.style.height = enemyPlanes[i].enemyPlaneHeight + 'px';
				boomEnemyPlane.style.position = 'absolute';
				boomEnemyPlane.style.zIndex = 3;
				boomEnemyPlane.style.left = enemyPlanes[i].enemyPlaneX + 'px';
				boomEnemyPlane.style.top = enemyPlanes[i].enemyPlaneY + 'px';

				//移除敌机DOM
				enemyPlanes[i].currentEnemyPlane.remove();

				//从敌机实例数组移除当前敌机
				enemyPlanes.splice(i, 1);

				game.appendChild(boomEnemyPlane);

				(function (element) {
					setTimeout(function () {
						//移除爆炸敌机DOM
						boomEnemyPlane.remove();
					}, 400)
				})(boomEnemyPlane);

			}

			//移除碰撞敌机的子弹
			this.currentBullet.remove();

			//从子弹实例数组移除当前子弹
			bullets.splice(index, 1);

		}
	}
}

//保存子弹实例数组
var bullets = [];

//创建子弹实例
function createEveryBullet() {
	//每100ms创建子弹
	bulletTimer = setInterval(function () {
		//调用子弹类构造子弹实例
		bullet = new Bullet();

		//调用创建子弹实例方法
		bullet.createBullet();

		//保存子弹实例
		bullets.push(bullet);
	}, 300)
}

//移动每一个子弹实例
function moveEveryBullet() {

	moveBulletTimer = setInterval(function () {
		//如果不存子弹实例, 拦截子弹移动
		if (bullets.length == 0) {return;}

		for (var i = 0; i < bullets.length; i++) {
			//每一个子弹实例 bullets[i]
			bullets[i].moveBullet(bullets, i);

			//如果当前子弹不存在, 拦截检测子弹碰撞敌机
			if (bullets[i] == undefined) {return;}

			//存在敌机, 需要判断子弹是否碰撞敌机
			bullets[i].shootEnemyPlane(bullets, enemyPlanes, i);

		}

	}, 5)
}

//敌机数据
var enemy = [
	{img: './images/enemy1.png', dieImg: './images/enemy1b.gif', width: 34, height: 24, blood: 1},
	{img: './images/enemy2.png', dieImg: './images/enemy2b.gif', width: 46, height: 60, blood: 5},
	{img: './images/enemy3.png', dieImg: './images/enemy3b.gif', width: 110, height: 164, blood: 10}
];

//创建敌机
//敌机实例
var enemyPlane;

//构建敌机类
function EnemyPlane() {

	//根据敌机数据创建相应的敌机
	var emy = null;
	//0-0.5生成小型敌机
	//0.5-0.9生成中型敌机
	//0.9-1生成大型敌机
	var random = Math.random();
	if (random <= 0.5) {
		emy = enemy[0]; //小型敌机
	} else if (random <= 0.9) {
		emy = enemy[1]; //中型敌机
	} else {
		emy = enemy[2]; //大型敌机
	}

	//敌机宽度和高度
	this.enemyPlaneWidth = emy.width;
	this.enemyPlaneHeight = emy.height;

	//随机生成敌机横向坐标, 纵向坐标
	this.enemyPlaneX = Math.random() * (planeWidth - this.enemyPlaneWidth);
	this.enemyPlaneY = -this.enemyPlaneHeight;

	//敌机图片路径
	this.enemyPlaneSrc = emy.img;

	//敌机爆炸图片路径
	this.enemyPlaneDieSrc = emy.dieImg;

	//敌机血量
	this.enemyPlaneBlood = emy.blood;

	//敌机DOM元素
	this.currentEnemyPlane = null;

}

//创建敌机
EnemyPlane.prototype.createEnemeyPlane = function () {
	//创建敌机DOM
	this.currentEnemyPlane = document.createElement('img');
	this.currentEnemyPlane.src = this.enemyPlaneSrc;
	this.currentEnemyPlane.style.width = this.enemyPlaneWidth + 'px';
	this.currentEnemyPlane.style.height = this.enemyPlaneHeight + 'px';

	this.currentEnemyPlane.style.position = 'absolute';
	this.currentEnemyPlane.style.zIndex = 3;

	this.currentEnemyPlane.style.left = this.enemyPlaneX + 'px';
	this.currentEnemyPlane.style.top = this.enemyPlaneY + 'px';

	game.appendChild(this.currentEnemyPlane);
}

//移动敌机
EnemyPlane.prototype.moveEnemeyPlane = function (enemyPlanes, index) {
	//enemyPlanes: 敌机实例数组
	//index: 敌机实际索引
	this.enemyPlaneY += 2;
	if (this.enemyPlaneY >= planeHeight + this.enemyPlaneHeight) {
		//移除敌机DOM
		this.currentEnemyPlane.remove();

		//从敌机实例数组移除当前敌机
		enemyPlanes.splice(index, 1);

	} else {

		//移动敌机
		this.currentEnemyPlane.style.top = this.enemyPlaneY + 'px';

	}

}

//保存敌机实例数组
var enemyPlanes = [];

//创建每一架敌机
function createEveryEnemyPlane() {
	enemyPlaneTimer = setInterval(function () {
		//敌机实例
		enemyPlane = new EnemyPlane();

		//创建敌机实例
		enemyPlane.createEnemeyPlane();

		//保存敌机实例
		enemyPlanes.push(enemyPlane);

	}, 1500)
}

//移动每一架敌机
function moveEveryEnemyPlane() {
	moveEnemyPlaneTimer = setInterval(function () {
		//如果不存敌机实例, 拦截敌机移动
		if (enemyPlanes.length == 0) {return;}

		//获取我方飞机的坐标
		var myplaneX = parseInt(myplane.style.left);
		var myplaneY = parseInt(myplane.style.top);

		//遍历移动每一架敌机实例
		for (var i = 0; i < enemyPlanes.length; i++) {
			//移动敌机, 每一架敌机的实例 enemyPlanes[i]
			enemyPlanes[i].moveEnemeyPlane(enemyPlanes, i);

			//判断敌机是否碰撞我方飞机
			if (enemyPlanes[i].enemyPlaneX >= myplaneX - enemyPlanes[i].enemyPlaneWidth && enemyPlanes[i].enemyPlaneX <= myplaneX + myplaneWidth && enemyPlanes[i].enemyPlaneY >= myplaneY - enemyPlanes[i].enemyPlaneHeight && enemyPlanes[i].enemyPlaneY <= myplaneY + myplaneHeight) {

				myplane.querySelector('img').src = './images/planeb.gif';

				//清除所有定时器
				clearInterval(moveBgTimer);
				moveBgTimer = null;
				clearInterval(bulletTimer);
				bulletTimer = null;
				clearInterval(moveBulletTimer);
				moveBulletTimer = null;
				clearInterval(enemyPlaneTimer);
				enemyPlaneTimer = null;
				clearInterval(moveEnemyPlaneTimer);
				moveEnemyPlaneTimer = null;

				layer.onmousemove = null;
				layer.onmouseenter = null;

				console.log('游戏结束');

				var imgs = plane.querySelectorAll('#game>img');
				for (var i = 0; i < imgs.length; i++) {
					imgs[i].remove();
				}

				enemyPlanes = []
				bullets = []

				setTimeout(function () {
					myplane.querySelector('img').src = './images/plane.gif';
					myplane.style.left = 0 + 'px';
					myplane.style.top = 607 + 'px';

					game.style.display = 'none';
					start.style.display = 'block';
				}, 2000);

			}

		}

	}, 20)
}


//初始化游戏
function initGame() {
	//为开始游戏按钮绑定点击事件
	addEvent(begin, 'click', function () {
		//隐藏开始游戏界面元素
		start.style.display = 'none';

		//显示游戏界面元素
		game.style.display = 'block';

		//游戏界面layer绑定鼠标移动onmousemove事件
		// addEvent(layer, 'mousemove', function (e) {
		// 	//移动我方飞机
		// 	myPlane(e);
		// })

		//游戏界面layer绑定鼠标移动onmouseenter事件
		// addEvent(layer, 'mouseenter', function (e) {
		// 	//移动我方飞机
		// 	myPlane(e);
		// })

		layer.onmousemove = function (e) {
			myPlane(e);
		}

		layer.onmouseenter = function (e) {
			myPlane(e);
		}


		//移动游戏背景
		moveGameBg();

		//创建子弹
		createEveryBullet();

		//移动子弹
		moveEveryBullet();

		//生成敌机
		createEveryEnemyPlane();

		//移动敌机
		moveEveryEnemyPlane();

	})

}

//页面加载完成触发事件
window.onload = function () {
	//初始化游戏
	initGame();
}
