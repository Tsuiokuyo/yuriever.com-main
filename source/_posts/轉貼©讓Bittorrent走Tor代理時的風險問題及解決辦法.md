---
title: 轉貼©讓Bittorrent走Tor代理時的風險問題及解決辦法
tags:
  - 轉貼
  - 電腦安全
categories: 轉貼
preview_text: 轉貼文
abbrlink: 87f4
date: 2019-01-13 10:00:00
preview:
---

​	找尋原因跟我前面的文章有點相關的......，會用BT當然是為了抓東西，而這篇就提到單用Tor抓BT的風險，所以我才會想搞多重代理，而使用Whonix作業系統也是不錯，我記得當時也有安裝來玩，只不過當時的教學文有出現問題，結果蒐尋也找不到相關的原因，弄了兩三天才用安裝好，但是最後果然普通使用者都是習慣使用windows介面了。

下文的超連結會直接連到原文提供的地方

下面文章本人已簡單繁化

# 讓Bittorrent走Tor代理時的風險問題及解決辦法

### 文章目錄

1. [前言](https://2xiangzi.blogspot.com/2015/09/bittorrent-over-tor-problem-and-solution.html#1)
2. [當Bittorrent走Tor代理](https://2xiangzi.blogspot.com/2015/09/bittorrent-over-tor-problem-and-solution.html#2)
3. [第一重攻擊](https://2xiangzi.blogspot.com/2015/09/bittorrent-over-tor-problem-and-solution.html#3)
4. [第二重攻擊](https://2xiangzi.blogspot.com/2015/09/bittorrent-over-tor-problem-and-solution.html#4)
5. [第三重攻擊](https://2xiangzi.blogspot.com/2015/09/bittorrent-over-tor-problem-and-solution.html#5)





# 1. 前言

我寫這篇博文的目的是想讓大家明白：

1. 僅僅透過**讓軟體走Tor代理**來達到匿名的目的是遠遠不夠的。想要實現真正的匿名，還有其他許多需要注意的地方；
2. 即使使用Tor代理，使用某些軟體（本文主要涉及：Bittorrent類和中間代理類軟體），仍可能增加身份暴露的風險；
3. 透過本文下面介紹的多種手段，可以有效地降低上述風險。

這篇博文是我在[Tor Blog](https://blog.torproject.org/blog)的[這篇博文](https://blog.torproject.org/blog/bittorrent-over-tor-isnt-good-idea)的基礎之上，結合如今Tor用戶的一些實際使用情況寫成的。那篇洋文博文的標題叫“Bittorrent over Tor isn’t a good idea”，翻譯過來就是“讓Bittorren走Tor代理不是個好主意”，而這也是Tor官方給出的[保持匿名的幾個基本建議](https://www.torproject.org/download/download.html.en#warning)之一。

另外，如果我的博文裡面有任何錯誤或者你不太理解的地方，請在留言中告訴我，因為這樣可以幫我把博文變得更加清楚、容易理解：)

# 2. 當Bittorrent走Tor代理

## 2.1 什麼是Bittorrent類軟體

這一小節的目的是讓大伙兒對Bittorrent類軟體（以下簡稱BT軟體）有個感性的認識，所以不涉及到技術層面的問題。簡單來說，我們常接觸到的“BitTorrent Sync”、“MLDonkey”、“迅雷”、“QQ旋風”都屬於BT類軟體。

## 2.2 BT軟體對匿名性的威脅

根據BT軟體和BT協議本身存在的問題，人們已經發現並掌握了針對該類軟體去匿名化攻擊的方式。這種攻擊方式可以分為三部分，或者可以說是三種不同攻擊的組合。下面我使用“重”這個量詞來描述攻擊的原因就在於：每一重攻擊的實行都是要建立在前一重攻擊已經實現的基礎之上。

# 3. 第一重攻擊

## 3.1 攻擊對象

第一重攻擊針對的是那些把BT應用程式設置為走Tor代理的同學。這類同學希望藉此能夠在Tracker伺服器上隱匿自己真實的IP位址，防止同在使用該Tracker伺服器的用戶（以下簡稱：Peers）查看到。（見圖）

[![img](https://4.bp.blogspot.com/-zP6FPp5KdN0/Vec21PatZKI/AAAAAAAAADk/5oLh6r7loq4/s1600/BT%2BIP%25E5%2588%2597%25E8%25A1%25A8.PNG)](https://4.bp.blogspot.com/-zP6FPp5KdN0/Vec21PatZKI/AAAAAAAAADk/5oLh6r7loq4/s1600/BT%2BIP%25E5%2588%2597%25E8%25A1%25A8.PNG)

## 3.2 BT用戶端的設計缺陷之一

上述做法的問題在於：許多流行的BT用戶端（包括Bittorent Sync）都會在某些情況下選擇忽略他們的代理設置。為什麼會這樣呢？簡單來說就是，你的代理設置有誤（可能是因為Tracker伺服器使用UDP協議而你提供的socks代理僅支持TCP協議，也可能純粹就是你把埠號輸錯了），BT用戶端用不了，而BT用戶端的開發者又不想讓你誤以為是他的軟體太垃圾，因此就選擇了忽略代理設置。

大家如果手頭就有Bittorent Sync可以試一下，把在代理設置裡隨便填個IP和埠，然後保存。怎麼樣？是不是軟體運行正常？那是因為軟體開發者“不想讓你失望”：(

### 3.2.1 導致的問題

上述缺陷導致的問題是：你不確定此時此刻BT用戶端是否在走代理。對於天朝用戶來講，代理不穩定，容易突然“斷線”，就更是加劇了這一風險。比如：使用的Tor代理突然斷線，BT用戶端不管不顧地繼續工作，你的真實IP就暴露給了Tracker伺服器和Peers。

### 3.2.2 二翔子的解決辦法

1. 使用雙虛擬機隔離技術，確保BT用戶端“不走代理埠就沒埠走”。具體操作方法參見編程隨想的[這個系列博文](https://program-think.blogspot.com/2010/04/howto-cover-your-tracks-0.html)。
2. 使用更加安全，匿名性更好的作法是使用[Whonix操作系統](https://2xiangzi.blogspot.com/2016/05/whonix0.html)。

## 3.3 BT用戶端的設計缺陷之二

另外，一些BT用戶端（Tor Blog上提到uTorrent、BitSpirit和 libTorrent，Bittorrent Sync還沒測試）會直接把你的**真實IP**寫入到要發送給Tracker伺服器或者Peers的訊息中。

### 3.3.1 導致的問題

這時，Tor還是在履行自己的任務：“匿名地”將你的**真實IP**發送給Tracker或者Peers。所以結果就是，“沒有人知道你是從哪裡把你的真實IP發送出去的”。是不是很諷刺？

### 3.3.2 解決辦法

1. 使用雙虛擬機隔離技術，確保BT用戶端“不走代理埠就沒埠走”。具體操作方法參見編程隨想的[這個系列博文](https://program-think.blogspot.com/2010/04/howto-cover-your-tracks-0.html)。
2. 使用更加安全，匿名性更好的作法是使用[Whonix操作系統](https://2xiangzi.blogspot.com/2016/05/whonix0.html)。

# 4. 第二重攻擊

第二重攻擊的目的在於：讓同在該Tracker伺服器上的攻擊者（Attacking Peer，簡稱:AP）識別出你的身份。前面說過，第二重攻擊是在第一重攻擊已經成功的基礎之上實現的，也就是說AP已經知道了伺服器上的那個真實IP位址以及其埠號。

## 4.1 BT協議的缺陷

BT協議，至少是在BT用戶端使用它時，會要求選擇一個**隨機**的監聽埠號（比如：50344）（如圖），然後把這個50344的埠號告訴Tracker伺服器和Peers。由於這個數是隨機的，所以每個人的監聽埠號通常也是Tracker伺服器上獨一無二的一個。

[![img](https://3.bp.blogspot.com/-LaKjAeVFaS8/Vec21OD2ejI/AAAAAAAAADc/NcR50GRv_mo/s1600/BT%25E7%259B%2591%25E5%2590%25AC%25E7%25AB%25AF%25E5%258F%25A3.PNG)](https://3.bp.blogspot.com/-LaKjAeVFaS8/Vec21OD2ejI/AAAAAAAAADc/NcR50GRv_mo/s1600/BT%25E7%259B%2591%25E5%2590%25AC%25E7%25AB%25AF%25E5%258F%25A3.PNG)

### 4.1.1 導致的問題

與你通訊的AP此時可以看到你的IP（也就是Tor出口節點的IP）和你的埠號：50344。接著他就拿著你的埠號（50344）和Tracker伺服器上的相同埠號比對，**於是你的“Tor出口節點的IP”就被和你的“真實IP”對應上了**。此時你的身份也就被確認了：(

另外，如果Peers之間的通訊沒有經過加密，出口節點同樣可以偵測到你的明文數據並進行上述攻擊。（好在Bittorrent Sync採用了強加密技術）

## 4.2 解決辦法

### 4.2.1 Tor官方的解決辦法

1. 不要讓Bittorrent走Tor代理：這種情況下，不但Tor提供不了匿名性，BT反而會拖累Tor網路的整體速度；
2. 告訴開發者改進BT協議和用戶端：Tor保護不了洩露你身份的應用。

### 4.2.2 二翔子的解決辦法

1. 避免第一重攻擊的發生；
2. 由編程隨想統一發布一個監聽埠號供大家設置，因為這裡的讀者之所以使用Bittorrent Sync，多是因為他的那個網路硬碟：)

# 5. 第三重攻擊

第三重攻擊可以借助前兩重攻擊的成功來實現，**但是也可以透過其他攻擊的成功來實現**（後面我會討論到），因此顯得**更加重要**。

## 5.1 Tor是如何處理你的流量的？

為了說清楚第三重攻擊，我們必須先了解Tor是怎麼處理你的流量的。我們都知道，為了幫你實現匿名，Tor每次執行起來後，都會為你準備多條線路（circuit），每條線路都包含“入口節點”、“中間節點”和“出口節點”這三台伺服器。Tor把每個應用需要通訊的數據都交給一個單獨的線路來完成（如下圖），也就是說，當你載入一個網頁只需要“麻煩”三台伺服器，而不是九台。這樣做不但**保證了傳輸效率**，而且**提高你的匿名性**，因為要知道，每多用一條線路（實際上是每多經過一個出口節點），你的流量被竊聽的機率就多了一分。

需要說明的是，下圖之所以寫“針對Linux和Unix環境”是因為這兩個操作系統下所有連接到Tor的應用都有一個“進程ID”（pid：process ID)，可以方便Tor識別出每個流量是哪個應用的，而那篇博文發出時（2010年），作者只說了Windows下會比較困難，至於現在實現沒有，二翔子沒來得及調查，很慚愧。

[![img](https://4.bp.blogspot.com/-Juyf28iQ1Gk/Vec21GPbQXI/AAAAAAAAADY/uH_PHXJmfKM/s1600/Linux%25E6%2588%2596Unix%25E7%258E%25AF%25E5%25A2%2583%25E4%25B8%258B.png)](https://4.bp.blogspot.com/-Juyf28iQ1Gk/Vec21GPbQXI/AAAAAAAAADY/uH_PHXJmfKM/s1600/Linux%25E6%2588%2596Unix%25E7%258E%25AF%25E5%25A2%2583%25E4%25B8%258B.png)

### 5.1.1 設計的缺點

但是這樣的設計**不好的一面**是，出口節點可以把你經過它的全部流量做成一個短快照（short snapshots of user profiles）。**一旦這些流量中有一個被識別出身份，那麼其他的流量的身份也就自然而然地知道了**。

比如說：第二重攻擊已經把你的“Tor出口節點的IP”就被和你的“真實IP”對應上了，也就是你與Tracker伺服器的通訊已經被識別出了身份。那麼你經過了該出口節點的其他流量也被識別出來了：(

### 5.1.2 問題很嚴重

讀到這裡，**你有沒有發現其實問題很嚴重？因為能夠確認你身份的流量有很多！**比如說：二翔子一邊用Tor聊著QQ（或者其他能確認為我身份的服務），一邊回復Blogspot（對，它**沒有**啟用加密）裡的留言，朝廷運行的出口節點截獲了這段流量，一下子就可以知道二翔子是誰了：(

## 5.2 中間代理放大了風險

細心的同學可能會問，你在5.1里不是說“Tor把每個應用需要通訊的數據都交給一個單獨的線路來完成”嗎？怎麼會出現兩個應用數據全跑到一個出口節點（共用一條線路）的情況？其實出現這種情況至少有兩種可能：

1. 使用Tor的應用多於其Tor用戶端創建的線路個數，因此必然有多個應用數據傳輸共用一個Tor線路的情況（傳說中的抽屜原理）；
2. 我使用了中間代理（比如：Privoxy），導致Tor（可能）以為我只有一個應用使用了Tor，因此只走一條線路（經過一個出口節點）。（如下圖）

[![img](https://1.bp.blogspot.com/-luVoYK-Wc2U/Vec21wt74VI/AAAAAAAAADo/ikEgPLjpms0/s1600/%25E4%25BD%25BF%25E7%2594%25A8%25E4%25B8%25AD%25E9%2597%25B4%25E4%25BB%25A3%25E7%2590%2586%25E6%2583%2585%25E5%2586%25B5%25E4%25B8%258B.png)](https://1.bp.blogspot.com/-luVoYK-Wc2U/Vec21wt74VI/AAAAAAAAADo/ikEgPLjpms0/s1600/%25E4%25BD%25BF%25E7%2594%25A8%25E4%25B8%25AD%25E9%2597%25B4%25E4%25BB%25A3%25E7%2590%2586%25E6%2583%2585%25E5%2586%25B5%25E4%25B8%258B.png)

## 5.3 解決辦法

### 5.3.1 Tor官方的解決辦法

Tor官方在這篇[博文](https://blog.torproject.org/blog/bittorrent-over-tor-isnt-good-idea)的結尾處討論了幾種當時（2010年）還沒付諸行動的解決辦法，但至於最後改進沒有，改進方案是什麼，二翔子還沒來得及跟蹤。

### 5.3.2 二翔子的解決辦法

最為簡單的辦法是使用更加安全，匿名性更好的[Whonix操作系統](https://2xiangzi.blogspot.com/2016/05/whonix0.html)。但如果同學覺得現在上手Whonix還有困難，不妨參考以下建議：

1. 不要嫌麻煩，在不同的虛擬機中多運行幾個Tor用戶端，詳細的說明可以看編程隨想的這篇[博文](https://program-think.blogspot.com/2015/04/howto-cover-your-tracks-8.html)中的，“多個隔離虛擬機共用同一個閘道器虛擬機”這一小節；
2. 只讓暴露身份風險不大的程式共用一個中間代理程式，而對於暴露身份風險較大的程式要自己走一個Tor用戶端；
3. **不要讓任何與你真實身份有關的流量（比如聊QQ時的流量）走Tor**：第一，這樣做只是有可能幫你隱匿你的物理位置，根本達不到匿名的目的；第二，**朝廷會特別留意網路行為怪異的人**，試問：如果騰訊伺服器上記錄到你的IP全是Tor出口節點的IP，你不算怪異誰算？



------



# **版權聲明**

[![知識共享許可協議](https://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/3.0/)
本作品採用[知識共享署名-非商業性使用-相同方式共享 3.0 [未本地化版本許可協議]()](https://creativecommons.org/licenses/by-nc-sa/3.0/)進行許可。



此文章轉載自：[二翔子的博客](https://2xiangzi.blogspot.com/2015/09/bittorrent-over-tor-problem-and-solution.html)
