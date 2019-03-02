---
title: 基於linux mint的網站典藏系統
tags: [其他]
categories: 其他
preview_text: 成就感0，我還是去用別人的算了......
date: 2019-03-02 10:00:00
preview: 
---

　　在待業中一直不曉得自己未來到底要幹嘛，只好繼續完善我的小網站，這大概是我的松鼠病網站最重要的一部分了，雖然很早之前就有預計實施這個了，不過因為種種的原因一直推遲，但是如今也是時候該去找工作了，所以這個再不弄，感覺自己會覺得用別人架設好的不就好了，雖然事實上也是如此。



　　雖然是可以在本機(VMware)架設完成，不過由於我只找到一堆英文字的文章，找不到能用的中文文章，九成都是閉門造車用google翻譯，還有一成是靠運氣，所以這篇文章肯定有很多漏洞，而且由於觀念問題加上有些自己根本不知道問題出在哪裡，所以許多問題對於我是無解的，畢竟落落長的文章用機翻很痛苦。

而由於我已經架設好，所以有些地方可能因為忘記了所以有遺漏或者步驟錯誤。



#### 系統要求：

Java： Oracle Java 1.7或更高版本。
Tomcat： Apache Tomcat 6.0或更高版本。

不過似乎windown兩樣也都能架設。



Linux Mint

https://linuxmint.com/download.php



heritrix3

github：https://github.com/internetarchive/heritrix3



Apache Tomcat

https://tomcat.apache.org/download-70.cgi



openwayback

github：https://github.com/iipc/openwayback

#### 環境設定

首先安裝Linux Mint，中文化以及更新之後查詢java是否安裝，至少我安裝Linux Mint與ubuntu發現都有裝。

解壓縮各項檔案(.tar.gz)

Apache Tomcat、heritrix3、openwayback

(我把所有的東西都丟家目錄底下)

在 terminal輸入`java -version` 確認java版本高於1.7

在來安裝gedit

`sudo apt install gedit`

在家目錄下確認有無.bashrc

`ls -a`

編輯.bashrc

`gedit .bashrc`



設定變數

參：https://github.com/internetarchive/heritrix3/wiki/Heritrix%20Configuration

```
#heririx
export HERITRIX_HOME=$HOME/heritrix
export JAVA_OPTS=-Xmx1024M
#tomcat
export CATALINA_HOME=$HOME/tomcat
```

重啟後確認變數

`echo $HERITRIX_HOME`

`echo $CATALINA_HOME`

設定權限

`chomd u+x $heritrix_home/bin/heritrix`

`chmod 755 $CATALINA_HOME/bin/*.sh`

啟動heritrix

`$HERITRIX_HOME/bin/heritrix -a admin:admin`

出現表示已啟動

```
(星期)  (月)  (時間) CST 2019 Heritrix starting (pid 2201)...........
Using ad-hoc HTTPS certificate with fingerprint...
SHA1:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX
Verify in browser before accepting exception.
engine listening at port 8443
operator login set per command-line
NOTE: We recommend a longer, stronger password, especially if your web 
interface will be internet-accessible.
```

而根據https://github.com/internetarchive/heritrix3/wiki/Running%20Heritrix%203.0%20and%203.1

指令

-a為web UI 

admin為帳號 後者為密碼

#### 設定heritrix

在瀏覽器輸入

`https://localhost:8443`

記得要加https，前幾次沒加s結果以為環境設定錯誤，一直不知道為什麼打不開

由於上面設定為admin 所以帳號密碼為admin 

成功後即出現頁面

{% asset_img 01.png %}

其中create new job 輸入名稱創造新的爬蟲工作

創造完成之後點擊新工作名稱進入頁面

{% asset_img 02.png %}

點選工具欄右上角configuration配置文件

修改

```
metadata.operatorContactUrl
metadata.jobName
metadata.description
三項
大約是表 
1)控制爬蟲的網址(ex:http://127.0.0.1)
2)爬蟲任務的名稱ㄍ
3)爬蟲任務的敘述

再來修改
# URLS HERE
http://example.example/example
改為要抓取的網址
如http://tsuiokuyo.netlify.com

在下面的
<bean id="metadata" class="org.archive.modules.CrawlMetadata" autowire="byName">
其中operatorContactUrl、jobName、description的值也順便填入

修改完成後左下角save chnges
```

回到job頁面

點擊build  出現Job is Ready

點擊launch、checkpoint、unpause

即可看見Job is Active: RUNNING

而資料預設儲存在/heritrix/jobs底下

也就是$HERITRIX_HOME的jobs



##### 其他的configuration配置文件設定

輸出html檔案

而若想要保存成html檔案需修改warcWriter bean

如：

```
<bean id="warcWriter" class="org.archive.modules.writer.WARCWriterProcessor">
改成
<bean id="warcWriter" class="org.archive.modules.writer.MirrorWriterProcessor">
```

參考：https://github.com/internetarchive/heritrix3/wiki/Mirroring%20HTML%20Files%20Only

抓取限制

```
< bean  id = " crawlLimitEnforcer "  class = " org.archive.crawler.framework.CrawlLimitEnforcer " >
< property  name = " maxBytesDownload "  value = " 0 " />
< property  name = " maxDocumentsDownload "  value = " 0 " />
< property  name = " maxTimeSeconds "  value = " 0 " />
</ bean >
```

1. maxBytesDownload  - 在下載固定數量的位元組後停止爬網零等於無限。
   - 1 KB ≒ 1024 Bytes
   - 1 MB ≒ 1048576 Bytes
   - 1 GB ≒1073741824 Bytes



2. maxDocumentDownload  - 下載固定數量的文檔後停止爬網，零等於無限。

   

3. maxTimeSeconds-在經過一定秒數後停止爬網，零等於無限。 

   - 一小時有3600秒
   - 一天有86400秒

參考：https://github.com/internetarchive/heritrix3/wiki/Basic%20Crawl%20Job%20Settings



#### 設定openwayback

將OpenWayback資料夾中的.war檔重新命名成ROOT.war

從Tomcat/webapps中刪除ROOT資料夾

將ROOT.war放置在Tomcat/webapps

啟動Tomcat(openwayback)

`$CATALINA_HOME/bin/startup.sh`

在瀏覽器輸入

`http://localhost:8080/wayback/`

應該可看見頁面

{% asset_img 03.png %}

關閉Tomcat(openwayback)

`$CATALINA_HOME/bin/shutdown.sh`

接下來查看配置文件

預設路徑為/home/tsuiokuyo/tomcat/webapps/ROOT/WEB-INF

預設的wayback.xml

```
簡單使用的話，基本上只要了解這兩樣就行了
wayback.basedir.default = / TMP / openwayback

wayback.archivedir.1 = $ {wayback.basedir} /files1 /
```

由上可知，wrac檔預設在根目錄的/TMP/openwayback/files讀取

{% asset_img 06.png %}

但由於我還沒摸熟，所以尚無法其他給出有用的資訊
畢竟都是用google翻譯

參考：https://github.com/iipc/openwayback/wiki/How-to-configure

WARC文件放入後，即可搜尋自己使用heritrix下載的頁面

http://localhost:8080/wayback/

{% asset_img 04.png %}

{% asset_img 05.png %}





