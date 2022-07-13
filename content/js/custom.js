/* 輪播背景圖片 */
var images = [
		  "/background/background1.jpg",
		  "/background/background2.jpg",
		  "/background/background3.jpg",
		  "/background/background4.jpg",
		];
var slideshow = images.sort(function() { return 0.5 - Math.random() });
$(function () {
	$.backstretch(slideshow,{ duration: 20000, fade: 1500 });
});

/* 拉姆蕾姆回到頂部或底部按鈕 */
$(function() {
	$("#lamu img").eq(0).click(function() {
		$("html,body").animate({scrollTop:$(document).height()},800);
		return false;
	});
	$("#leimu img").eq(0).click(function() {
		$("html,body").animate({scrollTop:0},800);
		return false;
	});
});

/* 站點運行時間 */
function runtime() {
	window.setTimeout("runtime()", 1000);
	/* 請修改這裡的起始時間 */
    let startTime = new Date('12/28/2018 00:00:00');
    let endTime = new Date();
    let usedTime = endTime - startTime;
    let days = Math.floor(usedTime / (24 * 3600 * 1000));
    let leavel = usedTime % (24 * 3600 * 1000);
    let hours = Math.floor(leavel / (3600 * 1000));
    let leavel2 = leavel % (3600 * 1000);
    let minutes = Math.floor(leavel2 / (60 * 1000));
    let leavel3 = leavel2 % (60 * 1000);
    let seconds = Math.floor(leavel3 / (1000));
    let runbox = document.getElementById('run-time');
    runbox.innerHTML = '這個網站活了<i class="far fa-clock fa-fw"></i> '
        + ((days < 10) ? '0' : '') + days + ' 天 '
        + ((hours < 10) ? '0' : '') + hours + ' 時 '
        + ((minutes < 10) ? '0' : '') + minutes + ' 分 '
        + ((seconds < 10) ? '0' : '') + seconds + ' 秒 ';
}
runtime();
