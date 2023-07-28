---
title: "使用Foobar2000+request_http建個基於icecast2的可點歌網路電台"
date: 2022-10-13T14:48:06+08:00
slug: 9e31d4b6
featuredImage: "/assets/foobar2000.jpg"
featuredImagePreview: "/assets/foobar2000.jpg"
tags: [foobar2000]
categories: [foobar2000]
lastmod: 2023-07-28
weight: 2
---

成品大概是這樣吧

<!--more-->

(有封鎖特定IP區段連入)

點歌台
http://tsuiokuyo.ddns.net:8763/js_index.html

狀態
http://tsuiokuyo.ddns.net:8764
(icecast)

<s>http://tsuiokuyo.ddns.net:8765</s>
(shoutcast)

其實會收聽的都在shoutcast，因為很多程式都能直接搜尋shoutcast電台</s>

不過我這幾乎都是日本人在收聽的，擔心哪天吃官司，因此關閉icecast的yp跟shoutcast。

補充目前所使用的DSP，

1.Resampler (Sox) mod2

目前44.1kHz約有(82.5%)、96kHz(10.2%)、48kHz(7.1%)、192kHz(0.2)、88.2(?)kHz(0.0%)

因為我自己串流主要用48kHz聽歌，因此第一個Sox為升頻至48kHz

Passband:95%，phase response:50%

2.Resampler (Sox) mod2

第二個則降頻192kHz及96kHz至48kHz

Passband:95%，phase response:0%

3.ReplayGain(alternative)

基於EBU R 128音軌增益，-14LUFS,-1dBTP(compress peaks)

4.跳過靜音區域

其他類似的DSP是Fake Gapless、Corssmix、Fade in/out

5.交叉漸變器

淡出淡入功能

類似的插件是 SqrSoft Advanced Crossfader

6.<s>Vorbis Streamer</s>

要注意的是，上方的順序不能擺錯，因為DSP的順序是從上到下，串流插件一定要擺在最下面，不然會發現串流與本機的播放聲音不同，第4點比vorbis streamer低則會讓串流中斷，也因此我才會知道那些類似的DSP，試到最後發現只是擺錯位置。

推送已改用butt，因為超過4萬首歌後，換首歌時讀取會卡住導致foo_Vorbis推送中斷，
估計是我訊源及IO負荷太重的關係...，緩衝太長又會讓問題更嚴重...

另外重採樣部分 foobar2000的DSP大概有

Sox、SRC(Secret Rabbit Code)、SSRC、RetroArch、multiresampler

雖然爬文大多都是推薦Sox，但我當時還是浪費一堆時間爬文弄軟體測試，結果最後還是選擇Sox...

順便留一個國外各種特定轉換的重採樣的圖表網頁參考

http://src.infinitewave.ca/

剩下關於機碼、MMCSS模式、記憶體優先級、峰值限制等等，無聊時再回來補，

其實這些google都有，畢竟我只是跟著別人的腳步，跟著各種發燒友文章重新調整，雖然在這裡最後都會因為串流關係壓成320k就是了。

順帶一提，聽歌通常建議軟體音量調最大，剩餘就是用硬體調整

用電腦端舉例：系統音量、播放器音量(100%) -> DAC、擴大機音量(調整2) -> 主動式喇叭(調整1)、耳機、被動式喇叭

基本上就是從最右邊開始調整

因為從最左邊的數位音訊，降低就相當於失真了，然後到最右邊轉成類比音訊也只是把失真後的資料再放大而已，基本上用頻譜圖就能看出來了，軟體的聲音低，可以看到某些細節已經歸零了，那你終端音量再大細節也不會憑空產生，其實就跟降頻後再升頻一樣

不過如果因為系統音量問題導致破音，那也只能從軟體部份或用衰減器看看來處理了

2023/06/01 隨著歌曲量增多，換歌時會莫名卡住，全文件緩衝設1GB反而得到嚴重副作用

測試後確定為訊源問題，緩衝寫入RAM時會卡住，調整細節寫在裡面，因為隨時都可能進行調整。

不過最大的原因我覺得是我的訊源撐不住就是了，弄台好的設備也許就沒問題了

以下3月的調整一段時間內不會放改法教學上來，因為有點麻煩，暫時也沒有心力來寫。
估計之後想寫時也忘了改了啥。

2023/03/15 解決嵌入chatango聊天室報錯問題，簡單的說就是聊天室抓不到特定的數值，因此只能抓原始碼並忽略某數值了，而忽略似乎沒產生甚麼問題，算是只有用foobar編譯時才會有的問題，不過近期到是想把它移除就是了。

2023/03/12 花了兩天研究，基本上搞定串流動態歌詞了，靜態歌詞基本上無法處理，特殊版本也無法處理，如:歌名 XXXver.，直接去掉字尾很容易比對錯誤，基本上翻唱、LIVE、同人歌其實也很容易有問題。

2023/03/10 取封面平均色來改變背景色，本來是想實現頻譜會依封面而變色，不過有些平均不是很明顯，因此作罷，下一步估計是研究弄出動態歌詞。

2023/03/08 換成了上面那個畫面，本來想用Javascript version ( New! )這個畫面的，但想要有以前那種黑底風格因此換了個模板，也塞入了頻譜與進度條等等調整，只不過因為黑底面畫面的畫面生成方式不同，引入js套件會出現問題，所以沒有甚麼新花樣。
，在Javascript version ( New! )能辦到的事情，黑底畫面的js不一定能辦到，這連jquery都無法引入...。

2023/03/07 花了一大段時間想辦法在網頁上塞入封面，因為串流的metadata不含圖片資訊，用foobar2000串流送出圖片資訊，這基本上完全沒有相關資料及討論，request_http沒有原始碼，反編譯重寫難度太高，所以只能去找其他元件來混用，
但因為別的元件是區網用的，在公網會有安全性問題，因此我取得後原始碼把一些功能移除，移除的難度就不大了，只是花了很多時間建置C++的環境來重新編譯dll檔...，實際上90%的時間就是花在建置環境，編譯完成後又遇到跨網域問題...。

2023/02/24 修復換頁千分位錯誤，

<!--
<audio controls="controls" preload="none" __idm_id__="21979137"><source src="http://tsuiokuyo.ddns.net:8764/vorbis" type="application/ogg"></audio>

{{< audio >}}
-->

<!-- ^^themes\LoveIt\layouts\shortcodes\audio.html -->

2022/12/15 補充
當前(v2.4.1)版本的ICECAST的FLAC尚不支援METADATA，難怪手機串流時能抓到METADATA，但是
官網那邊看不到，不過github看到有人提出問題過，才知道不是我的問題，不知何時才會支援，
而其他格式倒是正常，雖然這其實沒啥必要，只是看到這邊有顯示on Air的歌曲會比較爽一點
http://dir.xiph.org/search?q=tsuiokuyo

目前已不使用foo_shuicast，因為用shuicast在某些時候會有破音問題，因為只有hi-res跟mp3會破音，懷疑是跟歌曲本身的位元率高低有關，因此改用butt+vb audio cable來播放，這樣才不會接收到本機的音效，順便一提icecast的多個Genre 設定有固定格式，否則會直接送你異常，第二個以後的類型都要加, 才行，一定要用",空格"，如：Anime,  Jpop, Game，這爛分割方式讓我剛開始研究好久。

<h3>以下為舊文章(2022/10)</h3>

現在雖然都用google drive串流來聽歌，但不曉得哪一天無限空間會被拔掉，總要有幾個備援方案，

現在只有emby能當成備援而已，但emby不太可能支援小眾的無損壓縮格式，雖然無損壓縮互轉除非編碼有問題不然是會相同的，但我還是保留EAC時的格式，而且emby的app我覺得不是很好用，因此來玩玩看這個

此文為簡單的icecast v2.4.4 foobar2000 stream Components 以及 foo_request_http_v09-0.4說明

不過這些東西九成都已經過時了...教學都好幾年以前的產物了，而且連載點都很難找了，可惜的是PTT的foo_request_http_v09-0.4_fix版我倒是真的找不到了，所以那邊只能自己用懶人改法了，
不過這也是因為我只想在windows用foobar直接推送的關係，不然現在還有很多其他更方便的軟體...。

而選擇使用icecast的原因則單純只是因為它支援FLAC格式串流，目前Shoutcast看起來似乎不支援flac的樣子，我也不確定，我也懶得去測...，兩個電台的插件操作方式是一樣的，就改個選項而已。

目前手邊的無損格式至少有六種，WAV、FLAC、APE、TAK、TTA、M4A(ALAC)，本想說大不了全部轉為FLAC而已，不過看來是可以靠foobar自己轉碼成FLAC推送(?)

首先先提以下四個插件

<img src="images/foo_streamer.jpg" title="" alt="foo_streamer" data-align="left">

foo_streamer，版本:v141(2015)，選單位於view -> streaming client，可以看到目前傳輸的位元率、目前在線的用戶端、以及播放歷史，對我來說最有用的就是看位元率吧，很直觀就能了解我確實是在推送FLAC，但換歌時，網頁(用戶)端會自動暫停播放音樂，這個真不能忍，不過我倒是沒特別去研究解決方法，且因為metadata沒有自動推送也是原因之一，在Icecast states沒辦法看到目前播放的音樂名稱，因此放棄。

2023/04/06 目前shoutcast是走這個推MP3，上面為舊文只是沒設定好罷了

<img src="images/foo_vorbisstream_fix3.jpg" title="" alt="foo_vorbisstream_fix3" data-align="left">

foo_vorbisstream_fix3，版本:v1.1_fix3(2013)，選單位於設定 -> dps管理器中，這個應該是問題最少的了，但是他沒辦法調整推送的編碼。
2023/04/06 如果要吃DSP的話，必須把它移到最下面，否則因為優先順序關係會吃不到。

foo_edcast，版本:v3.1.23(2009)，我的foobar2000版本過高(1.6.10)，直接掰掰

<img src="images/foo_shuicast.jpg" title="" alt="foo_shuicast" data-align="left">

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

<img src="images/Icecast2_Status.jpg" title="" alt="Icecast2_Status" data-align="left">

而掛載點則為http://localhost:8000/stream.ogg，也就是插件內的mountpoint路徑

預設是stream，就是這個電台的檔案名稱，能直接讀取它

弄上實體IP或動態域名後

基本上支援串流的軟體應該都能直接吃這串路徑來聽歌，應該啦。

順便一提，這掛載點如果直接進入時有IDM或其他下載器，瀏覽器開啟後可能會變成下載ogg檔。

最後就是有bug的foo_request_http點歌插件了...，選單位於設定 -> 工具 -> request http

<img src="images/basic_settings.jpg" title="" alt="basic_settings" data-align="left">

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
就不會出現在專輯或歌手歌單裡，
設為0就是所有歌全部都編到條目裡。
不過歌名搜尋有問題可以嘗試點ReIndex讓它重建索引看看，
我有遇到歌名卻找到關鍵字的下一首歌的問題，重建索引就正常了。

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

<img src="images/request_http_index.jpg" title="" alt="request_http_index" data-align="left">

Javascript version ( New! ) <s>看起來還未完成，不能用</s>

<img src="images/ext.jpg" title="" alt="ext" data-align="left">

2023/02/24，我發現光是這個找歌部分就比flat好上幾百倍了，

但如要改用這個的話，還要想辦法美化，因為畫面真的空的

有看到網友改的，起初還看不出來是的模板，也是塞進去一些東西

不過這東西，有機會再去改吧

恩，有機會......

畢竟我只是用來自己聽的，所以才選擇flat，而且現在都考慮走UPnP了...

Simple version

<img src="images/Simple.jpg" title="" alt="Simple" data-align="left">

還不錯的畫面

song file uploader，這個沒甚麼好提的

Javascript version ( 2 column )

<img src="images/2_column.jpg" title="" alt="2_column" data-align="left">

Javascript version ( flat )

<img src="images/flat.jpg" title="" alt="flat" data-align="left">

後弄成以下這樣，不過我已經棄用了

<img src="images/flatEdit.jpg" title="" alt="flatEdit" data-align="left">

基本上會選擇的大概就是Simple version、2 column 、 flat 三擇一後並自己調整了

至於bug部分 PTT倒是有人也提供解法啦，雖然改好的檔已經沒了，但問題點都已經有指出來了，有點懶得去碰它...

https://www.ptt.cc/bbs/WebRadio/M.1296124848.A.E0A.html

https://ptt.healtyman.xyz/?man/WebRadio/D766/D6CE/M.1296145083.A.AB6.html

既然已知是參數問題，

所以我倒是沒改那麼多，直接用懶人方式調整

僅僅在requester.js中多加三行讓他的列表能夠正常運作而已

.replace(',','')已直接補進去，100這個數值需要同時調整前端，所以沒在這裡直接調整

<code>

  updateFromThis: function(element, params, isFocus, isBackground) {

​    **params = params.replace('_song_id=', '&song_id=')**

​    **page = params.substring(params.lastIndexOf('=') + 1, params.length)**

​    **params += '&page=' + page.replace(',','') / 100**

​    var p = element;

​    for (; p != null; p = p.parentNode) {

​      logDebug(p);

​      if (Element.hasClassName(p, 'tab_item')) break;

​    }
</code>

第一行是把傳入的參數修正，

第二行是取得他要查詢的N筆資料，

第三行是把那N筆轉成頁數，

大概是這樣

其他bug如果有遇到就再說了

2023/02/24 修正頁數千分位異常，以及分頁改foobar2000獲取
由
<code>
**params += '&page=' + page / 100**
</code>
這部分已經直接在上面改了就是補上.replace(',','')去除千分位而已而已

再來就是把那個最大檢視數量改由foobar2000拿取而不是寫死，不然分頁會有點小小的問題
<code>
***maxView = document.getElementById("maxView").innerText***
**params += '&page=' + page.replace(',','') / maxView**
</code>

另外到前端中FOOBAR2000-Info的tag隨便找個地方塞進%max_song_view%這個參數
例如
<code>
    <span>View# <span class="caution">$if(%playlist_name%, %playlist_name% ,  $if(%search_text%, " %search_text% " search result, %index_id%))</span> 

    ***顯示筆數：<span id='maxView'>%max_song_view%</span> ***
    Page: %current_page%</span>
    <script>
    var isDownload = %enable_download_in_playlist% == 1;
    if '('isDownload')' {
        addRule'(''''.download''', '''display:table-cell;'''')';
    }
    </script>

</code>

個人用備註

shoutcast則需要到 https://radiomanager.shoutcast.com/ 註冊拿到Authhash才會被搜尋到

歌詞部分需要修改LargeFieldsConfig檔，否則http上會顯示"?"

至於一些foobar2000音質上的調整就直接放在網頁左上了

用於篩選是否有設定增益

```
$if(%replaygain_track_gain%,$char(13)有播放增益信息,$char(13)無播放增益信息)|$puts(path,$replace($directory_path(%path%),\,|$char(13))|%filename_ext%
$ifgreater(%subsong%,0,|%tracknumber%.%title%,))
$puts(path,$substr($get(path),$add($strchr($get(path),|),1),$len($get(path))))
$substr($get(path),$add($strchr($get(path),|),1),$len($get(path)))
```

基於音頻md5篩選是否為重複歌

```
insert into Playlist_Updatable (path, playlist_name)
  select path,
         '完全重複'
  from mediaLibrary
  where md5 in (select md5
                  from mediaLibrary
                  group by md5
                  having count(*)>1
               );
```

只要來源相同，基本上相同格式的音頻md5都會一樣的，即使修改過tag或無損互轉

例如:wav轉alac再轉ape再轉flac 跟wav直接flac

兩者的音頻md5也會是一樣的，



基於其他條件重複，藝術家、標題、專輯、相簿、長度、曲目編號、作曲家

```
insert into PlaylistUpdatable(path,playlist_name)
select a.path, '其他重複'
  from mediaLibrary a
         inner join
       (select artist, title, album, length, tracknumber, composer
          from MediaLibrary
          group by artist, title, album, length, tracknumber, composer
          having count(*)>1
       ) b on (    a.artist is b.artist
               and a.title is b.title
               and a.album is b.album
               and a.length is b.length              
               and a.tracknumber is b.tracknumber
               and a.composer is b.composer)
  order by a.path
```

畢竟即使md5不同也可能是重複的

例如:拿張DVD ISO 跟 OTOTOY買的同一專輯，兩者出來的音頻MD5就可能不一樣了
