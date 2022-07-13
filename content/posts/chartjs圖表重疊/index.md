---
title: chartjs圖表重疊
tags: [其他]
categories: [其他]
slug: 860e
date: 2020-03-24 10:21:00
---
對，前陣子，這篇放在我本機好一段時間了，不知道為什麼沒有push上去，整理一些檔案才發現居然還有這個md檔...，刪除又覺得可惜，雖然沒甚麼內容，不過畢竟回家沒東西想寫了，現在除了打魔物就是看動畫了......。

前陣子，只會複製貼上的小弟，被畫面都弄好了還要我生一個折線圖出來
對vue都已經不是很熟了，也沒有參考的畫面給我看QQ，不過到處google之後，感覺chartjs意外的能行呢
，只不過測到最後的時候，居然發現圖表會重疊......

找了一下別人提供的方法
```myLineChart.destroy();```
```$('#lineChart').remove(); // this is my <canvas> element```
```$('#lineChartParent').append('<canvas id="lineChart" height="230"></canvas>');```
恩......搭配相關的文件一起看
https://chartjs-doc.abingoal.com/developers/api.html
https://www.bookstack.cn/read/ChartJS-zh/40.md
哇，結果失敗啦，跟我想像的不同啊，是不是跟生命週期有相關？早就知道不要用vue寫了= =

最後只能朝向，在畫面建立的時候生成一個圖表，然後用他提供的.update()更新資料
大概是這樣
<code>
let vue = new Vue({
	el: "#app",
	data: {
  	charts: {
			labels : [],
			datas: [],
		},
    ...略
    },
    	mounted: function () {
		doAction('init', null, function (resp) {
			if (resp.severity === "Success") {
				vue.isAuth = resp.isAuth;
			}
		});
		newChart();
	},
  	methods: {
		query: function () {
			var vm = this;
			var data = {
			...略,
			};
			doAction('query', data, function (resp) {
				if (resp.severity === "Success") {
  					vm.charts.datas = Object.values(vm.model.weightMap);
  					vm.charts.labels = Object.keys(vm.model.weightMap);
					//設定圖表參數
					myChart.data.labels = vm.charts.labels; //月份
					myChart.data.datasets[0].data = vm.charts.datas; //數據
					myChart.data.datasets[0].label = vm.model.type; //標籤標題
					myChart.update(); //修改圖表
				}//if
			}); //doAction
		}, //end query
	}, //end methods
});

function newChart() { //建立空的圖表
	const ctx = document.getElementById('myChart');
	chartT = new Chart(ctx, {
      type: 'line',
      data: {
    	    labels: [],
    	    datasets: [
    	      {
    	        ...略,
            }
    	  });//new Chart
});
</code>

不過這是初版的只要單條資料列，確實可以解決重疊的問題，如果真的跟我用一樣的方法造輪子的話= =
本來要想辦法把那個index[0]的datasets部分改掉的時候，需求變要多條數據啦。
