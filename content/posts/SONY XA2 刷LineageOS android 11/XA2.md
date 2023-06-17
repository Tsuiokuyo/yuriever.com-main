---
title: "XA2"
date: 2023-06-15T13:54:43+08:00
slug: d418a9ce
featuredImage: "/assets/xa2.jpg"
featuredImagePreview: "/assets/xa2.jpg"
tags: [SONY]
categories: [SONY]
---

前一篇Z3 因此懶得重打一遍了，因為其實操作流程都一樣

<!--more-->

格式又跑掉了...，未來有空再改了

[Install LineageOS on pioneer | LineageOS Wiki](https://wiki.lineageos.org/devices/pioneer/install)

[LineageOS Downloads](https://download.lineageos.org/devices/pioneer/builds)

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
