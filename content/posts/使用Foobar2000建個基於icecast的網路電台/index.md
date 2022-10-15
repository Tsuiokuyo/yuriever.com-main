---
title: "使用Foobar2000+request_http建個基於icecast2的可點歌網路電台"
date: 2022-10-13T14:48:06+08:00
slug: 9e31d4b6
featuredImage: "/assets/.jpg"
featuredImagePreview: "/assets/.jpg"
tags: [foobar2000]
categories: [foobar2000]
---





ㄔ

成品大概是這樣吧

http://tsuiokuyo.ddns.net:8763/js_flat.html

http://tsuiokuyo.ddns.net:8764/status.xsl



現在雖然都用google drive串流來聽歌，但不曉得哪一天無限空間會被拔掉，總要有幾個備援方案，

現在只有emby能當成備援而已，但emby不太可能支援小眾的無損壓縮格式，雖然無損壓縮互轉除非編碼有問題不然是會相同的，但我還是保留EAC時的格式，而且emby的app我覺得不是很好用，因此來玩玩看這個



此文為簡單的icecast v2.4.4 foobar2000 stream Components 以及 foo_request_http_v09-0.4說明

不過這些東西九成都已經過時了...教學都好幾年以前的產物了，而且連載點都很難找了，可惜的是PTT的foo_request_http_v09-0.4_fix版我倒是真的找不到了，
不過也是因為我只想在windows用foobar直接推送的關係，不然現在還有很多其他更方便的軟體...。



而選擇使用icecast的原因則單純只是因為它支援FLAC格式串流，目前Shoutcast看起來似乎不支援flac的樣子，我也不確定，我也懶得去測...，兩個電台的插件操作方式是一樣的，就改個選項而已。

目前手邊的無損格式至少有六種，WAV、FLAC、APE、TAK、TTA、M4A(ALAC)，本想說大不了全部轉為FLAC而已，不過看來是可以靠foobar自己轉碼成FLAC推送(?)

首先先提以下四個插件



![foo_streamer](images/foo_streamer.jpg)

foo_streamer，版本:v141(2015)，選單位於view -> streaming client，可以看到目前傳輸的位元率、目前在線的用戶端、以及播放歷史，對我來說最有用的就是看位元率吧，很直觀就能了解我確實是在推送FLAC，但換歌時，網頁(用戶)端會自動暫停播放音樂，這個真不能忍，不過我倒是沒特別去研究解決方法，且因為metadata沒有自動推送也是原因之一，在Icecast states沒辦法看到目前播放的音樂名稱，因此放棄。



![foo_vorbisstream_fix3](images/foo_vorbisstream_fix3.jpg)

foo_vorbisstream_fix3，版本:v1.1_fix3(2013)，選單位於設定 -> dps管理器中，這個應該是問題最少的了，而且在Icecast states**可以**看到目前播放的音樂，但是他沒辦法調整推送的編碼，但既然叫Vorbis，裡面的編碼大概也是Vorbis了，所以我也只能放棄。



foo_edcast，版本:v3.1.23(2009)，我的foobar2000版本過高(1.6.10)，直接掰掰



![foo_shuicast](images/foo_shuicast.jpg)

foo_shuicast，版本:v0.47(2018年)，選單位於設定 -> dps管理器，其實這個介面我不太喜歡，鑒於上面幾個我都有意見，那麼也只能用這個了，亂碼似乎改個UTF-8就行了，反正也不能弄到目前播放的音樂，只不過這個可選編碼，網頁(用戶)端又不會自動暫停，我還能說甚麼。



順便一提 
插件內選用quality的話，0=64,1=80,2=96,3=112,4=128,5=160(kbps)，能到多高，我就不知道了

foobar2000設定大概就這樣而已，再來是icecast2(v2.4.4)部分

官網下載安裝完成後，到根目錄簡單的調整icecast.xml


基本上較重要的大概只有

<admin-user> <admin-password> 網頁端管理員登入用

<source-password> foobar2000推送用密碼

 <port>根據需求改port

<hostname>

<directory> 可否收錄在icacast2 中

其實xml檔提供的註解還挺充實的，雖然我是靠翻譯看的

剩餘如<location> <admin>僅用於前端顯示，有能力的倒也能直接去改xsl檔



由localhost:port/status-json.xsl能看到推送的資料，有能力的也能去改DLL檔...



改完後執行icecast.bat啟動icecast後記得到foobar插件內connect

就能到localhost:8000、127.0.0.1:8000看看icecast是否正常以及測試播放

![Icecast2_Status](images/Icecast2_Status.jpg)

而掛載點則為http://localhost:8000/stream.ogg，也就是插件內的mountpoint路徑

預設是stream，就是這個電台的檔案名稱，能直接讀取它

<audio xmlns="http://www.w3.org/1999/xhtml" controls="controls" preload="none"><source src="http://localhost:8763/stream.ogg" type="application/ogg" /></audio>

弄上實體IP或動態域名後

基本上支援串流的軟體應該都能直接吃這串路徑來聽歌，應該啦。

順便一提，這掛載點如果直接進入時有IDM或其他下載器，瀏覽器開啟後可能會變成下載ogg檔。



最後就是有bug的foo_request_http點歌插件了...，選單位於設定 -> 工具 -> request http

![basic_settings](images/basic_settings.jpg)

basic settings頁面

畫面沒甚麼好說的就是port不要互衝，模板路徑選好，要播放的歌曲放進public playlist內

勾選Update when requests changed



再來是more settings頁面

Admin Settings: 設定遠端http登入foobar控制，預設是全鎖
右邊的三選項是下載選項，

1.Allow download in public playlist
2.Allow in upload playlist
3.Allow in play history
設定如下
完全不允許下載 => 三個都別勾
只允許下載別人上傳的 => 勾2和3
所有都可以下載 => 勾1和3
Enable Upload:允許別人可上傳音樂,看你要不要開啟


Search format: 設定搜尋時尋找歌曲的那些資訊
Use fast search: 不要勾，這個搜尋模式有BUG會讓電台當掉
Max song view: 歌單單頁顯示最大歌曲數
Max request num: 最大點歌數
Max request per ip: 每人最大點播歌曲數
Max search result num: 搜尋數量上限
當搜尋到的結果量到達這個數量就會強制停止
減輕伺服器負擔
Index threshold: 條目歌曲下限，當同專輯或歌手歌曲少於這個數量，
就不會出現在專輯或歌手歌單裡。
設為0就是所有歌全部都編到條目裡。
Song history num: 歷史紀錄的歌曲數量，當被點過的歌還在歷史紀錄上，
就不能再次點同首歌。
Sub list item num: 系統預先選歌的數量
Priority per IP: 每個人點歌的權重
Priority per time: 當前面的點播歌曲播完，已點的歌增加的權重
Max priority: 歌曲最大權重
 (權重越大的歌曲播放越優先)
Debug Requst: 除錯
Deny Proxy: 防止Proxy來的連線，安全和點播上的顧慮，可以勾起來



到點擊start後 status會從offline變成online，屆時就能進去localhost:xxxx測試了，

有個明顯的bug就是所有的列表換頁功能無法使用，也就是沒去修bug的話Playlist list只能顯示前100筆



![request_http_index](images/request_http_index.jpg)



Javascript version ( New! ) ，看起來還未完成，不能用

Simple version

![Simple](images/Simple.jpg)

還不錯的畫面

song file uploader，這個沒甚麼好提的

Javascript version ( 2 column )

![2_column](images/2_column.jpg)

Javascript version ( flat )

![flat](images/flat.jpg)





基本上會選擇的大概就是Simple version、2 column 、 flat 三擇一後並自己調整了

至於bug部分 PTT倒是有人也提供解法啦，雖然改好的檔已經沒了，但問題點都已經有指出來了，有點懶得去碰它...

https://www.ptt.cc/bbs/WebRadio/M.1296124848.A.E0A.html

https://ptt.healtyman.xyz/?man/WebRadio/D766/D6CE/M.1296145083.A.AB6.html
