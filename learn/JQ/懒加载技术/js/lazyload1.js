		/***功能：实现图片懒加载技术 占用全局lazyload变量
		**参数：
		*	@objs: object 选中的图片对象
		*	@placeholder: string  给一个替代图片的路径(必选)
		*	@effect: string  给一个切换图片的效果
		*	@threshold: number  给一个滚动距离底边多少开始显示的距离
		*时间：2020年1月2日 ---  兮夜老师
		*/
			function lazyload(json) {
				var aImages = json['objs'],
					originer = [],
					placeholder = json['placeholder'] || '',
					effect = json['effect'] || '',
					threshold = json['threshold'] || 0;
				aImages = [].slice.call(aImages);
				for(var i = 0; i < aImages.length; i++) {
					if(aImages[i].hasAttribute('src')) {
						originer[i] = aImages[i].getAttribute('src');
						aImages[i].setAttribute('originer',originer[i]);
					}
					aImages[i].src = placeholder;
				}
				document.addEventListener('scroll',scroll,false);
				scroll();
				function scroll() {
					var scrollTop = document.documentElement.scrollTop,
						clientHeight = document.documentElement.clientHeight,
						top = scrollTop + clientHeight;
					for(var i = aImages.length - 1; i >= 0; i--) {
						var img = aImages[i];
						if(getElementTop(img) <= top + threshold) {
							if(/fadeIn/i.test(effect)) {
								img.style.opacity = '0';
								moveTime(img,{opacity:1},1000);
								aImages.splice(i,1);
							}
							img.src = img.getAttribute('originer');
							
						}
					}
				}
				function getElementTop(obj) {
					var top = 0;
					while(obj !== null) {
						top += obj.offsetTop;
						obj = obj.offsetParent;
					}
					return top;
				}
			}