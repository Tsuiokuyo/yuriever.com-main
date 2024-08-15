// /* 輪播背景圖片 */
// var images = [
// 		  "/background/background1.jpg",
// 		  "/background/background2.jpg",
// 		  "/background/background3.jpg",
// 		  "/background/background4.jpg",
// 		];
// var slideshow = images.sort(function() { return 0.5 - Math.random() });
// $(function () {
// 	$.backstretch(slideshow,{ duration: 20000, fade: 1500 });
// });

var images = {
  morning: "/background/background1.jpg",  // 早上 0600 ~ 1100
  noon: "/background/background2.jpg",     // 中午 1100 ~ 1300
  afternoon: "/background/background3.jpg", // 下午 1300 ~ 1700
  evening: "/background/background4.jpg",  // 傍晚 1700 ~ 1900
  night: "/background/background5.jpg",    // 晚上 1900 ~ 2400
  lateNight: "/background/background6.jpg" // 入夜 2400 ~ 0600
};

function getBackgroundImage() {
  var hour = new Date().getHours();
  if (hour >= 6 && hour < 11) {
      return images.morning;
  } else if (hour >= 11 && hour < 13) {
      return images.noon;
  } else if (hour >= 13 && hour < 17) {
      return images.afternoon;
  } else if (hour >= 17 && hour < 19) {
      return images.evening;
  } else if (hour >= 19 && hour < 24) {
      return images.night;
  } else {
      return images.lateNight;
  }
}

$(function () {
  var backgroundImage = getBackgroundImage();
  $.backstretch(backgroundImage);
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
