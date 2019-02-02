---
title: '轉貼©[如何隱藏你的蹤跡，避免跨省追捕[7]：用虛擬機隱匿公網IP（配置圖解）]'
tags:
  - 轉貼
  - 電腦安全
categories: 轉貼
preview_text: 轉貼文
abbrlink: 1de2
date: 2019-01-12 10:00:00
preview:
---

找尋原因：恩，說白了一點，當時想用BT抓日本的成人影片來看，就找到這裡了，過程大概是 
找片 -> torrent檔（覺得用BT下載，很危險，可能被告，雖然還沒有這種判例，但小心使得萬年船） -> 掛VPN（太危險了，VPN商隨時可能把數據給警方） -> [掛註冊在戰亂國家VPN公司，指不會搭理台灣的地方(無可信度，一樣放棄)] ->找不到好方法，單用tor其實也挺危險的 ----->乾脆串一堆VPN算了就找到這篇了。



這位作者是名中國人，講解得相當詳細，而且也挺有意思的，他的每一篇文章幾乎都能夠吸引我點進去，看他發的每一篇文章都感覺自己變聰明了......

我當時是從這一篇開始實作的，而雖然這篇文章軟體的版本比較低，但win10 搭 VMware Workstation 12是成功的，所以就先丟這篇，反正會看到這篇的應該也有相關知識，而且點網址就能看原文。
當然，裡面的超連結也是直接連到原文提供的地方。

下面文章本人已簡單繁化。

----------

# [如何隱藏你的蹤跡，避免跨省追捕[7\]：用虛擬機隱匿公網IP（配置圖解）]

**文章目錄**

★準備工作

★真實系統（Host OS）的物理網卡

★真實系統（Host OS）的虛擬網卡

★單虛擬機方案

★雙虛擬機方案（NAT+HostOnly）

★雙虛擬機方案（NAT+Internal）

★驗證虛擬機的隔離性

★結尾

　　4天前發布了《用虛擬機隱匿公網IP》，好些個讀者到部落格留言，抱怨說講得太簡單。缺少傻瓜化的、帶截圖的配置教學。俺恭敬不如從命，今天再發一篇《用虛擬機隱匿公網IP（配置圖解）》，竭盡所能，寫得儘量傻瓜化。

　　至於前面那一篇，標題修改為《用虛擬機隱匿公網IP（原理介紹）》。

​	順便說一下：

　　前面那篇發到 G+ 上，好像被頂到 G+ 熱門榜，轉發數很多。看來有不少網友關注“隱匿身份”這個話題 :) 所以俺今後會多花點時間，普及這方面的相關常識。

## ★準備工作

### ◇思想上的準備

　　首先，如果你對虛擬機軟體不太熟悉，【一定要先看完】俺之前寫的《[扫盲操作系统虚拟机](https://program-think.blogspot.com/2012/10/system-vm-0.html)》。

　　其次，再把本系列的前一篇博文（連結在“[这里](https://program-think.blogspot.com/2013/01/howto-cover-your-tracks-6.html)”）認真看完。那篇博文是介紹“虛擬機隱匿公網IP”的原理，配有精美示意圖 :)

### ◇虛擬機軟體的準備

　　既然要用虛擬機隱匿公網IP，當然要先把虛擬機軟體準備好。假如你不曉得該選哪種虛擬機軟體，請看俺之前的一篇博文（請翻牆看“[这里](https://program-think.blogspot.com/2012/11/system-vm-3.html)”），專門介紹虛擬機軟體的選擇。

　　本文主要拿 VMware Workstation（以下簡稱 VMware）和 VirtualBox 來介紹。

### ◇代理軟體的準備

　　先聲明一下，本文提到的“代理”一詞是廣義的，包括：普通代理、VPN、多重代理。

　　由於本教學是拿虛擬機跟代理軟體進行組合搭配，所以你還得懂得使用代理軟體。這點應該不難——只要你有翻牆的經歷，你就已經在同"代理軟體"打交道了。如果你從來沒玩過翻牆，請先學習俺部落格上的諸多翻牆教學（包括：TOR、I2P、賽風、世界通、自由門、無界 ......）。

　　關於代理的類型，俺強烈建議用多重代理（教學在“[这里](https://program-think.blogspot.com/2012/03/howto-cover-your-tracks-5.html)”，需翻牆）。為什麼捏？如果你對隱匿性的要求不高，根本都不需要看本教學。你來看本教學，就說明你對隱匿性有較高的要求。既然如此，當然要用多重代理啦——這可以大大增加逆向追蹤的難度。

　　注意事項：

**要確保你用的代理軟體，是監聽在 0.0.0.0 地址，而不是監聽在 127.0.0.1 地址**

。如果代理軟體只監聽在 127.0.0.1 地址，那麼其它虛擬機的網路軟體是無法連接到這個監聽埠的。

　　如何看代理軟體在哪個地址上監聽捏？可以在 Windows 的命令行窗口（就是那黑窗口）中執行如下命令，就可以看到當前系統中開啟的所有監聽埠以及該監聽綁定的地址。

`netstat -an | find "LISTEN"`

　　那麼，萬一你的翻牆工具的監聽埠沒有綁定到 0.0.0.0 該怎麼辦捏？別擔心，俺後面又專門寫了一篇教學《

[多台电脑如何共享翻墙通道](https://program-think.blogspot.com/2013/01/cross-host-use-gfw-tool.html)》，教你如何解決監聽埠綁定地址的問題。

　　如果你光使用 VPN 作為“代理”。由於 VPN 本身是不開啟監聽埠的。那麼你就必須想辦法共享 VPN 的翻牆通道。至於如何共享，請看《

[多台电脑如何共享翻墙通道](https://program-think.blogspot.com/2013/01/cross-host-use-gfw-tool.html)》。

### ◇關於操作系統的說明

　　本教學適用於目前的各種主流操作系統，包括但不限於 Windows、Linux、Mac OS X ......

　　考慮到目前 Windows 系統的用戶占絕大多數，本教學拿 Windows 系統來說事。希望 Linux 系統和 Mac OS X 系統的用戶別怨俺偏心。

　　注意事項：

**要特別小心真實系統和虛擬系統的防火牆設置**

。很多人是因為防火牆沒設好，導致代理無法連通。



## ★真實系統（Host OS）的物理網卡

　　先跟大伙兒說一下：今天這個教學跟物理網卡【沒有】半點關係。跟你電腦上裝了多少塊物理網卡，也【沒有】半點關係。在本文後續的介紹中，不會再涉及到物理網卡。待會在配置代理的時候，也不會再涉及物理網卡上的 IP 地址。切記！

　　另外，今天這個教學，跟你用的上網方式也沒有關係。不論你是在公司上網還是在家用寬頻，本教學都適用。



## ★真實系統（Host OS）的虛擬網卡

　　【這部分是重點，注意看囉！】

　　一旦你安裝完虛擬機軟體，那麼你的操作系統中就會多出新的虛擬網卡和虛擬子網。下面俺根據 VMware 和 VirtualBox 分別說明。

### ◇VMware

　　每次安裝 VMware，新增加的虛擬子網，網路地址都可能會不同，所以俺多費點口水。

　　首先到 Windows 控制面板的網路連接看一下，如果看到下圖，就這說明 VMware 已經幫你加入了2個虛擬網卡，這兩個網卡分別位於 NAT 虛擬子網和 Host-Only 虛擬子網。

![不見圖 請翻牆](https://lh3.googleusercontent.com/I0BZO21bRYuinYFgRO87fB-ZY4Bac3L7orMMxn7m9m7y7ZfOvn4AazIltGFDj41JWAbrFZp5ah3TdbrwI_IPTEhWVEyg81iQp3BdKLhAGIv9KcZdy5TuuzlM6KM)

　　然後，你到 VMware 主選單上點”Edit“菜單，然後再點”Virtual Network Editor“菜單，會出現虛擬子網的對話框，通過該對話框可以看到 VMware 創建的所有虛擬子網。你會看到好多個虛擬子網，咱只要關心其中兩個——分別 Type 為 Host-Only 和 Type 為 NAT 的。然後，把這兩個子網的”Subnet Address“分別記下來（千萬別把這兩個記混了），待會要用到。截圖如下

![不見圖 請翻牆](https://lh6.googleusercontent.com/z-D7eOmA1xYjGQcdPZ9cSV7RSl8nGWbkls8-_fUc1fHghH7YqcI1jvZpzO77HnXw5btC9r6wByLjf_dvL96Kzlibe6XJHs6-JhcFQ39WhZBdhcrGCgk_07beKK0)

（請注意，上述截圖中列出的都是虛擬子網的網路地址，表示的是整個子網，所以最後一位是 0 ）

### ◇VirtualBox

　　每次安裝 VirtualBox 的時候，它創建的虛擬子網，網路地址總是一樣的，所以 VirtualBox 的操作比較簡單。

　　對於 NAT 模式，預設的虛擬子網總是10.0.2.0；對於 Host-Only 模式，預設的虛擬子網總192.168.56.0（請注意，這兩個是虛擬子網的【網路地址】，表示的是整個子網，所以最後一位是 0 ）

　　牢記這兩個子網的網路地址（千萬別把這兩個記混了），待會要用到。

## ★單虛擬機方案

### ◇安裝虛擬系統（Guest OS）

　　如何在虛擬機軟體中安裝 Guest OS，《[扫盲操作系统虚拟机](https://program-think.blogspot.com/2012/10/system-vm-0.html)》系列教學已經有詳細的操作圖解，此處不在囉嗦。

### ◇虛擬系統的網卡配置

　　（這部分是重點，看仔細囉！）

　　首先，你要在虛擬機軟體中設置該“虛擬系統A”的網卡模式，要設置為 Host-Only。

　　其次，要進入“虛擬系統A”，到“控制面板”的“網路連接”裡，找到那塊網卡，右鍵菜單點“屬性”，再點“TCP/IP”的屬性，會出現如下截圖

![不見圖 請翻牆](https://lh3.googleusercontent.com/bS3_NN5upSDaEuUgOTyDC38X1Q8N5Njyorp0CSatovD1CTq5y6lPkn0fOBQXUZqH6dwPAUYeeHj9pVqUVkmf6sIig18AfCRmVldSeMKoW2nVWwNdi7s0WO3EMcA)

IP 地址（這步一定要小心，別填錯了）

IP 地址一共四段，頭三段分別填寫 Host-Only 子網的網路地址的頭三個數位（請回顧剛才的章節——★真實系統的虛擬網卡）。

IP 地址的第四段，你可以填 2到254 之間的任何一個數。

子網掩碼

填寫 255.255.255.0

默認閘道器

不用填

DNS

不用填

　　這塊 Host-Only 網卡配好之後，為了驗證你是否配置成功，可以執行如下步驟驗證：

進入“虛擬系統”，用 ping 命令 ping 一下真實系統的那塊 Host-Only 網卡的 IP 地址。如果能 ping 得到就說明你配對了。

### ◇代理軟體的安裝

　　在單虛擬機方案中，代理直接安裝在 Host OS 裡面。關於代理軟體的安裝，就不用在囉嗦了吧？

### ◇上網軟體的配置

　　（這部分也是重點，看仔細囉！）

　　為網路軟體配置代理的時候，通常要填寫代理的 IP 地址和埠號。埠號通常不會搞錯。因為每一款代理軟體開啟的埠號是固定的。但是 IP 地址常常會填錯。很多人就是栽在這一步。

　　填寫代理的 IP 地址，千萬【不能】填 127.0.0.1，因為這個地址表示本機，也就是 Guest OS 自己。

正確的寫法是：填寫真實系統的那個Host-Only網卡的 IP。

　　這個 IP 地址一共四段，頭三段分別填寫 Host-Only 子網的網路地址的頭三個數位（請回顧剛才的章節——★真實系統的虛擬網卡）；第四段填 1

　　俺以 IE 瀏覽器為例，截圖如下

![不見圖 請翻牆](https://lh3.googleusercontent.com/ywn99XmncvnxcYN2hOcLND3IBzGMlA1sxqm9ovOmiv7tg3yqtsc3c5S1VwkddNOuCivOxCo0Agc04p4UBB6TZybIoU2tXdSOi1S_Yn7XrmCNTAfdcBjlACOHMDI)



## ★雙虛擬機方案（NAT+HostOnly）

### ◇安裝兩個虛擬系統（Guest OS）

　　如何在虛擬機軟體中安裝 Guest OS，《[扫盲操作系统虚拟机](https://program-think.blogspot.com/2012/10/system-vm-0.html)》系列教學已經有詳細的操作圖解，此處不在囉嗦。

　　要使用雙虛擬機方案，你需要裝【兩套】虛擬系統。

### ◇虛擬系統A 的網卡配置

　　首先，你要在虛擬機軟體中設置該“虛擬系統A”的網卡模式，要設置為Host-Only。

　　其次，要進入“虛擬系統A”，到“控制面板”的“網路連接”裡，找到那塊網卡，點屬性，會出現如下截圖

![不見圖 請翻牆](https://lh3.googleusercontent.com/bS3_NN5upSDaEuUgOTyDC38X1Q8N5Njyorp0CSatovD1CTq5y6lPkn0fOBQXUZqH6dwPAUYeeHj9pVqUVkmf6sIig18AfCRmVldSeMKoW2nVWwNdi7s0WO3EMcA)

IP 地址（這步一定要小心，別填錯了）

IP 地址一共四段，頭三段分別填寫 Host-Only 子網的網路地址的頭三個數位（請回顧剛才的章節——★真實系統的虛擬網卡）。

IP 地址的第四段，你可以填 2到254 之間的任何一個數。

子網掩碼

填寫 255.255.255.0

默認閘道器

不用填

DNS

不用填

　　這塊 Host-Only 網卡配好之後，為了驗證你是否配置成功，可以執行如下步驟驗證：

進入“虛擬系統A”，用 ping 命令 ping 一下真實系統的那塊 Host-Only 網卡的 IP 地址。如果能 ping 得到就說明你配對了。

### ◇虛擬系統B（閘道器）的網卡配置

　　“虛擬系統B”要配置兩塊網卡，【**這部分非常非常容易搞錯，一定要看仔細囉！**】

第1步

剛裝好的“虛擬系統B”，默認已經有一塊網卡了。你先把這塊網卡的網卡模式，設置為 NAT。

第2步

進入“虛擬系統B”，到“控制面板”的“網路連接”裡，找到那塊網卡，右鍵菜單點“屬性”，再點“TCP/IP”的屬性，會出現如下截圖

![不見圖 請翻牆](https://lh3.googleusercontent.com/hc60D2QGAJWQkllix3-vIwuIb7pbhsSS1rMLGhTtTAJbyatY-Kh8DzFx_dE2-MxIuraN-6b-SxtEO_JMB69wcrNR7GmV--cibnHFeyZ9v2nFBT1sMvDb3Or85JI)

IP 地址（這步一定要小心，別填錯了）

IP 地址一共四段，頭三段分別填寫 NAT 

子網的網路地址的頭三個數位（請回顧剛才的章節——★真實系統的虛擬網卡）。

IP 地址的第四段，你可以填 3到254 之間的任何一個數。

默認閘道器

（這步也要小心，別填錯了）

默認閘道器的地址也是4段，頭三段就照抄剛才 IP 地址的頭3個數字。第4個數字填寫 2（不論是 VMware 還是 VirtualBox 都填 2）

DNS

此處填寫你常用的 DNS 伺服器，俺個人建議填 Google 的那兩個（8.8.8.8 和 8.8.4.4）

子網掩碼

填寫 255.255.255.0

　　這塊 NAT 網卡配好之後，為了驗證你是否配置成功。可以在“虛擬系統B”裡面開一個瀏覽器（不設代理），訪問一下網際網路。如果能訪問，說明這塊 NAT 網卡 OK 了。

第3步

打開虛擬系統的設置對話框，再添加一塊網卡了。（如何加第二塊網卡，請看《[扫盲操作系统虚拟机](https://program-think.blogspot.com/2012/12/system-vm-5.html)》教學）然後把這塊網卡的網卡模式，設置為Host-Only。

第4步

　　進入“虛擬系統B”，到“控制面板”的“網路連接”，找到新添加的

第二塊

網卡，右鍵菜單點“屬性”，再點“TCP/IP”的屬性，會出現如下截圖

![不見圖 請翻牆](https://lh3.googleusercontent.com/bS3_NN5upSDaEuUgOTyDC38X1Q8N5Njyorp0CSatovD1CTq5y6lPkn0fOBQXUZqH6dwPAUYeeHj9pVqUVkmf6sIig18AfCRmVldSeMKoW2nVWwNdi7s0WO3EMcA)

IP 地址

【這步一定要小心，別填錯了】

IP 地址一共四段，頭三段分別填寫 Host-Only 子網的網路地址的頭三個數位（請回顧剛才的章節——★真實系統的虛擬網卡）。

IP 地址的第四段，你可以填2到254之間的任何一個數。

再提醒一下：虛擬系統A和虛擬系統B各自有一塊 Host-Only 網卡，這兩塊網卡的 IP 地址頭三位是一樣的，**第四位不能相同——否則 IP 地址會衝突**。

子網掩碼

填寫 255.255.255.0

默認閘道器

不用填

DNS

不用填

### ◇代理軟體的安裝

　　在雙虛擬機方案中，代理是安裝在“虛擬系統B”（閘道器）裡面的，別搞混囉！關於代理軟體的安裝，就不用在囉嗦了吧？

### ◇上網軟體的配置（以瀏覽器為例）

　　在雙虛擬機方案中，那些有危險的上網軟體是安裝在“虛擬系統A”裡面的，別搞錯囉！

　　下面詳細說說上網軟體的代理配置。

　　為網路軟體配置代理的時候，通常要填寫代理的 IP 地址和埠號。埠號通常不會搞錯。因為每一款代理軟體開啟的埠號是固定的。但是 IP 地址常常會填錯。所以請大伙兒把下面看仔細囉！

　　填寫代理的 IP 地址，千萬不能填 127.0.0.1，因為這個地址表示本機，也就是“虛擬系統A”自己。

​	正確的寫法是：填寫另一個虛擬系統（虛擬系統B）的那個 Host-Only網卡的 IP。

　　因為“虛擬系統B”（閘道器）有兩塊網卡，很多人填錯了，栽倒在這一步。俺以 IE 瀏覽器為例，截圖如下

![不見圖 請翻牆](https://lh3.googleusercontent.com/E4_zkEEFoQwmHuHdp9JOps50_4GNu2yfL9mxUm8uQUE3nsbzVd6p3xNSCdGlQrgLhP1VMjVeg8hsPLQ8x8wEt-oIyJDBpA5KVZM3-6tVPuFsn6dyCTENbWAq0Y8)

### ◇注意事項

　　在雙虛擬機方案中，虛擬機在啟動時有可能會出現錯誤提示：“網路上有重名”。如果你碰到這個錯誤，只需把虛擬機網卡的 NetBIOS 功能禁用，即可解決。如何禁用 NetBIOS，請看“

微軟官網這裡

”。



## ★雙虛擬機方案（NAT+Internal）

　　（經熱心讀者 meek 提醒，俺補充了這一章節）

　　在《掃盲操作系統虛擬機》系列的[第5篇](https://program-think.blogspot.com/2012/12/system-vm-5.html)，俺介紹了 Guest OS 的各種網卡模式，其中也包括“Internal 模式”。這種模式類似於“Host Only 模式”，差別在於——Host OS 上的進程無法看到“Internal 模式”的虛擬網卡。

　　因此，“雙虛擬機方案”也可以採用“NAT+Internal”的玩法。

　　好處是——隔離性更好；

　　缺點是——Internal 這種網卡模式 Virtual Box 支持而 VMware 【不】支持 （對 VMware 用戶，可以透過添加“自訂網卡”來達到類似效果）。

　　如果你想採用“NAT + Internal”的方式配置虛擬網卡，那麼整個配置過程跟前一章節介紹的“NAT + HostOnly”很相似，差別僅僅在於把兩個虛擬網卡的“HostOnly 模式”替換為“Internal 模式”。所以俺就不重複囉嗦了。



## ★驗證虛擬機的隔離性

　　無論是“雙虛擬機方案”還是“單虛擬機方案”，配置完畢，聯通代理之後，為了保險起見，你需要再驗證一下虛擬機的隔離性。

1. 先把代理關閉，到虛擬機A 中運行危險軟體，看它是否能聯網成功。（如果聯網成功，說明你的配置有誤）

2. 進入虛擬機A，開啟一個命令行窗口，用 ping 命令測試一下你常用的 DNS 伺服器的 IP（如果能 ping 到，說明你的配置有誤）



## ★結尾

　　由於涉及兩套方案，而且涉及兩種虛擬機軟體，本文有點長，步驟有點多。如果你根據本教學配置完畢，還是不行，請到[本文留言](https://program-think.blogspot.com/2013/01/howto-cover-your-tracks-7.html)，俺會儘量解答。

[回到本系列的目录](https://program-think.blogspot.com/2010/04/howto-cover-your-tracks-0.html#index)

**版權聲明**
本部落格所有的原創文章，作者皆保留版權。轉載必須包含本聲明，保持本文完整，並以超連結形式註明作者[編程隨想](mailto:program.think@gmail.com)和本文原始地址：
<https://program-think.blogspot.com/2013/01/howto-cover-your-tracks-7.html>



此文章轉載自：[编程随想的博客](https://program-think.blogspot.com/2013/01/howto-cover-your-tracks-7.html)