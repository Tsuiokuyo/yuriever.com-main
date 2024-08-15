---
title: "XA2刷機筆記"
date: 2023-06-15T13:54:43+08:00
slug: d418a9ce
featuredImage: "/assets/xa2.jpg"
featuredImagePreview: "/assets/xa2.jpg"
tags: [SONY]
categories: [SONY]
lastmod: 2024-08-15
---

前一篇Z3 因此懶得重打一遍了，因為其實操作流程都一樣

<!--more-->

格式又跑掉了...，未來有空再改了

[Install LineageOS on pioneer | LineageOS Wiki](https://wiki.lineageos.org/devices/pioneer/install)

[LineageOS Downloads](https://download.lineageos.org/devices/pioneer/builds)

此處為2024-08-14紀錄，目前最新版本是android 14

換電腦後二次刷機的懶人包

準備好

boot.img

lineage.zip

mindTheGapps.zip

1.官網下載 adb fastboot 工具
[SDK Platform Tools 版本資訊 &nbsp;|&nbsp; Android Studio &nbsp;|&nbsp; Android Developers](https://developer.android.com/tools/releases/platform-tools?hl=zh-tw)

2.進階系統設定->環境變數->系統變數->path設定好路徑

3.測試是否設定正常，擇一即可

`adb --version`

`fastboot --version`

4.手機開啟usb偵錯

`adb reboot bootloader`

或是

關機同時按音量鍵下 進入刷機模式(藍燈)

XA2的藍燈超級不明顯

5.

`fastboot devices`

應該會顯示一串英數字

XXXXXXXXXX    fastboot

如果沒有則確認

裝置管理員->其他裝置->Android(黃色驚嘆號)

安裝驅動[Get the Google USB Driver &nbsp;|&nbsp; Android Studio &nbsp;|&nbsp; Android Developers](https://developer.android.com/studio/run/win-usb)

Download the Google USB Driver ZIP file (ZIP)

找好位置後更新驅動程式->瀏覽電腦上的驅動程式->

讓我從電腦上可用驅動程式清單中挑選->

顯示所有裝置->

從磁片安裝->

選擇剛剛下載的usb_driver內inf檔案->Android Bootload Interface->

選擇是，安裝即可

6.

忘了是哪一個了，反正不對就用另一個

`fastboot boot boot.img `

`fastboot flash boot boot.img`

7.手機

用電源鍵+音量鍵下進入recovery模式

8.手機 

Apply Update -> Apply from ADB

9.電腦輸入

`adb sideload lineage-21.0-20XXXXXX-pioneer-signed.zip`



10.刷入google套件

adb sideload MindTheGapps-XXXX-arm64-XXXXX.zip

然後手機會遇到

**Signature verification failed**

**Install anyway?**

點選yes

11.手機

**Reboot system now**







下方為2023-06-15的紀錄

下載rom包及boot.img

而recover.img則需另外去抓

[Sony Xperia XA2](https://twrp.me/sony/sonyxperiaxa2.html)

唯一要注意的是

**必須先到開發人員選項 打開OEM解鎖**

上面這選項讓我卡關好一段時間...

拿錯誤訊息去找也都找不到解決方案，重設也沒用

最後還是在sony的官網找到解的...

首先記下IMEI碼

到SONY官方網站生成解鎖序號

關機

按住音量鍵上插入傳輸線

此時左上提示燈會變成藍色的

小黑盒輸入

```
fastboot devices
```

應該也是因為沒驅動而不會有任何反應

一樣手動安裝 不過我在弄得時候剛好sony開發者網站剛好在更新...

在此之前那又沒找到XA2的驅動，

因此我是用XZ2的驅動，其實google查詢出來的xa2 drive usb Driver 前幾個應該也都能用啦

只是當時我沒開啟OEM解鎖，一直查不出原因到底是甚麼而已

解鎖後

音量鍵下+電源鍵開機進入twrp畫面進行四清，

wipe -> advanced wipe

Dalvik/Art cache、System、Data、Cache

重新啟動，如果沒進入twrp無限重啟記得音量鍵上加電源鍵強制關機(震動三次)

音量鍵下+電源鍵回到twrp

然後到advanced 開啟adb sideload

刷入 

`adb sideload copy-partitions-20220613-signed.zip`

為何要刷上面這個請看下面文章，載點也在裡面就是了

[Install LineageOS on pioneer | LineageOS Wiki](https://wiki.lineageos.org/devices/pioneer/install#ensuring-all-firmware-partitions-are-consistent)

再來就是必要的刷入

`adb sideload rom.zip`

`adb sideload gapp.zip`

基本上大概就這樣而已，手機刷機都是大同小異的

其他詳情請看Z3那篇

不過其他更舊的手機似乎目前就沒推出rom了

雖然自己搞也可以，不過現在倒是沒那個心情了，

因為已經確定辦不到的事情就算刷rom還是辦不到...
