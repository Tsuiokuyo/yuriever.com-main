---
title: 在omv4上用docker GUI部屬transmission
tags: [其他]
categories: 其他,軟體
preview_text: 單純紀錄，沒甚麼特別的
date: 2020-02-17 13:50:00
preview:

---

#### U2收後宮哦，都沒好人卡覺得QQ

前陣子買新硬碟後，想給PT站的種子做個分類及總整理
決定除了omv4提供的transmission之外多用幾個BT軟體
只是OMV4不打算弄deluge的插件
就只能用docker部屬了

大概研究了一下deluge與transmission的優缺點後，
就決定用Docker部屬deluge！！

畢竟用deluge搶流量的部分比transmission還要好

簡單的說
想搶流量就用deluge + itconfig調參數
想保種就用transmission

而itconfig懶得研究參數的話，其實設定high-performance-seed也行
畢竟有些參數調大很吃記憶體，慢慢調又很浪費時間

至於為什麼我部屬完deluge後卻沒有留下紀錄的原因是......
deluge果然沒辦法搶流量又保種這麼爽的兩全齊美呢，至少我失敗了= =

我deluge大概在1600做種左右出現異常，詳情忘記了，畢竟測試一天後認為不可行就直接改搭transmission了，所以deluge就沒有特別留紀錄了

其實這都只是很基礎的設定而已，就是網路弄host，改webUI及映射存放路徑而已
不過我找到的教學文都是下指令的阿！
都找不到直接用DOCKER GUI建transmission的教學文

{% asset_img up.jpg %}

如果docker預設儲存的路徑沒動的話，檔案存放點的映射路徑就那樣
而transmission裡面的下載點就是/downloads

{% asset_img down.jpg %}

不過config檔的地方沒貼出來，我印象中應該只有改port而已，因為要多開，所以不改port的話，
想也知道會有問題，在裡面搜尋9091後改成其他port就好了

雖然從docker這裡加參數應該能直接改port......
