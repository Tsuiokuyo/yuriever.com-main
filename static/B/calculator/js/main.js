    var transferTime = new Vue({
      el: '#transferTime',
      data: {
        bit: 1, //容量大小
        dnByte: 0, //頻寬
        dnbit: 0, //速度
        upByte: 0, //頻寬
        upbit: 0, //速度
        volume: 'GB', //容量單位
        lostPacket: 90,
        bpsType: 'Mbps',
        // storage: ['YB', 'ZB', 'EB', 'PB', 'TB', 'GB', 'MB', 'KB'],
        storage: ['PB', 'TB', 'GB', 'MB', 'KB'],
        bandwidth: ['Gbps', 'Mbps', 'Kbps'],
        starttime: '',
        fixed: [{type:'固定網路',down:1000,up:600},{type:'固定網路',down:500,up:250},
        	{type:'固定網路',down:300,up:100},{type:'固定網路',down:100,up:100},
        	{type:'固定網路',down:100,up:40},{type:'固定網路',down:60,up:20},
        	{type:'固定網路',down:35,up:6},{type:'固定網路',down:16,up:3},
        	{type:'固定網路',down:8,up:0.64},{type:'固定網路',down:5,up:0.384},
        	{type:'固定網路',down:2,up:0.064}
        ],
        generation: [{type:'5G',down:500,up:250},{type:'4G',down:100,up:75},
		{type:'3.9G',down:100,up:75},{type:'3.75G',down:14.4,up:5.8},
		{type:'3.5G',down:3.6,up:0.384},{type:'3G',down:2,up:0.384},
		{type:'2.75G',down:0.384,up:0.384},{type:'2.5G',down:0.115,up:0.115},
		{type:'2G',down:0.064,up:250}
        ],
      },
      created: function () {
        let time = new Date();
        this.starttime = time.getTime();
      },
      mounted: function () {
        //簡略的下載速度測試≒網頁載入速度
        let time = new Date();
        let endtime = time.getTime();
        let downloadtime = 0;
        if (endtime == this.starttime) {
          downloadtime = 0
        }
        else {
          downloadtime = (endtime - this.starttime) / 1000;
        }
        let kbytes_of_data = 210; // 檔案大小
        let linespeed = kbytes_of_data / downloadtime;
        let kbps = (Math.round((linespeed * 8) * 10)) / 10;
        let kbytes_sec = (Math.round((kbytes_of_data * 10) / downloadtime)) / 10;

        this.dnByte = Math.floor(kbps / 1000);
        // this.dnbit = navigator.connection.downlink;  //直接用API抓網速，準確度也不高，IE不支援

      },
      computed: {
        targetDownload: function () {
          let size = this.bitSize(); //單位(KB)
          let secs = size / (this.dnbit * Math.pow(10, 3)) //秒(MB)
          return isFinite(secs) ? this.calcTime(secs) : '0秒';
        },
        targetUpload: function () {
          let size = this.bitSize(); //單位(KB)
          let secs = size / (this.upbit * Math.pow(10, 3)) //秒(MB)
          return isFinite(secs) ? this.calcTime(secs) : '0秒';
        },
        actualDownload: function(){
          let size = this.bitSize(); //單位(KB)
          let secs = size / (this.dnbit * (this.lostPacket / 100 ) * Math.pow(10, 3)) //秒(MB)
          return isFinite(secs) ? this.calcTime(secs) : '0秒';
        },
        actualUpload: function(){
          let size = this.bitSize(); //單位(KB)
          let secs = size / (this.upbit * (this.lostPacket / 100) * Math.pow(10, 3)) //秒(MB)
          return isFinite(secs) ? this.calcTime(secs) : '0秒';
        },
      },
      watch: {
        dnByte: {
          handler: function (newValue, oldValue) {
            this.dnbit = newValue / 8;
          }
        },
        dnbit: {
          handler: function (newValue, oldValue) {
            this.dnByte = newValue * 8;
          }
        },
        upByte: {
          handler: function (newValue, oldValue) {
            this.upbit = newValue / 8;
          }
        },
        upbit: {
          handler: function (newValue, oldValue) {
            this.upByte = newValue * 8;
          }
        },
      },
      methods: {
        //點擊按鈕
        setValue: function (down,up){
          this.dnByte = down;
          this.upByte = up;
        },
        currentSel: function (selVal) {
          //下拉式選單用，暫時想不到可以幹嘛
        },
        calcbps: function (bit) { //換算 暫時不用
          switch (this.bpsType) {
            case 'Gbps':
              return bit * Math.pow(10, 9);
            case 'Mbps':
              return bit * Math.pow(10, 6);
            case 'Kbps':
              return bit * Math.pow(10, 3);
          }
          return 0;
        },
        bitSize: function () { //計算容量(KB)
          let size = 0;
          switch (this.volume) {
            case 'YB':
              size = this.bit * Math.pow(2, 70)
              break;
            case 'ZB':
              size = this.bit * Math.pow(2, 60)
              break;
            case 'EB':
              size = this.bit * Math.pow(2, 50)
              break;
            case 'PB':
              size = this.bit * Math.pow(2, 40)
              break;
            case 'TB':
              size = this.bit * Math.pow(2, 30)
              break;
            case 'GB':
              size = this.bit * Math.pow(2, 20)
              break;
            case 'MB':
              size = this.bit * Math.pow(2, 10)
              break;
            case 'KB':
              size = this.bit;
              break;
          }
          return size;
        },
        calcTime: function (secs) { //計算時間
		  let year = Math.floor(secs / 31536000);
          let day = Math.floor((secs - (year * 31536000)) / 86400);
          let hr = Math.floor((secs - ((year * 31536000)+(day * 86400))) / 3600);
          let min = Math.floor((secs - ((year * 31536000)+ (day * 86400)+(hr * 3600))) / 60);
          let sec = parseInt(secs - ((year * 31536000)+(day * 86400) +(hr * 3600) + (min * 60)));
		  if (year && year != Infinity) { year += '年'; }else{year = ''}
          if (day && day != Infinity) { day += '日'; }else{day = ''}
          if (hr) { hr += '小時'; }else{hr = ''}
          if (min) { min += '分'; }else{min = ''}
		  let time = year + day + hr + min + sec + '秒'
          return time;
        },
      },
    })
