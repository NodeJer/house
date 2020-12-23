/**
 * @version [v1.0]
 * [移动端页面自适应脚本]
 * @param  {[type]} docSize  [ui设计稿的尺寸]
 * @param  {[type]} fontSize [根据设计稿开发页面时html设置的字体大小px 使用rem做自适应]
 * @return {[type]}          [无]
 */
(function(docSize, fontSize){
	var resizeEvt = "orientationchange" in window? "orientationchange" : 'resize';

	window.addEventListener(resizeEvt, function(){
		resize();
	});

	resize();
	
	function resize(){
		var doc = document.documentElement;
		var phoneSize = doc.clientWidth;
		var scale = phoneSize / docSize;

		doc.style.fontSize = parseInt(scale * fontSize) + 'px';
	}
})(1125, 100);