---
title: 轉貼©藏在CPU裡面的小小太上皇CPU：Intel ME跟AMD PSP
tags: [轉貼,電腦安全]
categories: 轉貼
preview_text: 轉貼文
date: 2019-02-10 10:00:00
preview: 

---



### 藏在 CPU 裡面的小小太上皇 CPU： Intel ME 跟 AMD PSP



{% asset_img 1.gif %}多數自由軟體用戶 （包含我） 以為採用了 GNU/Linux 作業系統， 資訊安全就有了基本保障 -- 不敢說沒有 bugs， 但至少不會有後門。 有時我們被迫使用沒有原始碼的週邊裝置 （例如 wifi） 驅動程式， 不過至少作業系統主體是安全的。 但是如果後門藏在電腦最重要、 最核心的硬體裡面呢？ 如果廠商在你以為的 「（宿）主」 CPU 裡面藏一顆更小的~~崔順實~~太上皇 CPU、 上面跑的是不明的作業系統、 隨時監控著 「（宿）主」 CPU 和 「（宿）主」 作業系統的一舉一動呢？

逆向工程專家 Igor Skochinsky 在 2012 年時發表 [Rootkit in Your Laptop](http://me.bios.io/images/c/ca/Rootkit_in_your_laptop.pdf) （2014 年： [Intel ME Secrets](https://www.slideshare.net/codeblue_jp/igor-skochinsky-enpub)） 指出 Intel 的 CPU 裡面有一個 Management Engine， 基本上是獨立於 「（宿）主」 CPU 之外的另一部小電腦。 它不受 「（宿）主」 CPU 控制， 甚至可以反過來控制 「（宿）主」 CPU 以及「（宿）主」電腦的週邊裝置。 就像 MIB 星際戰警裡面， 把（擬）人類頭顱當成駕駛艙的小小外星人一樣。 最近 Intel ME 爆發嚴重資安危機， 大家又再次注意到這個太上皇 CPU。

我對硬體不熟； 還好有 [libreboot 計畫的 FAQ](https://libreboot.org/faq.html) 較白話的解說。 他們的目標是希望做到 「從一打開電源就始用自由軟體」， 所以這些開發者對於 BIOS/UEFI 韌體及 CPU 的運作非常熟悉。 以下兩節是 FAQ 當中關於 Intel 跟 AMD 部分的摘譯/轉述。

#### 一、 為什麼 libreboot 不支援較新的 Intel CPU？

Intel 在 2006 年 6 月推出 965 Express 系列 （G）MCH 晶片以及 ICH8 I/O 控制系列。 從這以後， 所有 Intel CPU （含桌機、 筆電、 伺服器） 都含有 ME。

ME 包含 ARC 處理器 （新版改用別的處理器）、 程式碼及資料快取、 時鐘、 內部匯流排、 加密引擎、 內部 ROM 與 RAM， 還有一個 DMA 引擎可以存取 「主」 作業系統的記憶體， 並且指定保留一塊外部記憶體來彌補它自身記憶體不足的限制。

[Intel 的 vPro 技術](http://ithelp.ithome.com.tw/articles/10014670) 包含 Active Management Technology （AMT）。 這個網頁介面的應用軟體讓遠端用戶可以 （透過 [網路喚醒](http://www.techbang.com/posts/14695-a-forgotten-wake-on-lan) 功能） 開機、 關機、 查詢及管理 PC。

Intel ME 的專屬韌體可以對 PC 有完整的控制權： 它可以啟動/關閉 PC、 讀取所有開啟的檔案、 查看所有正在執行的應用軟體、 記錄鍵盤及滑鼠的所有活動， 甚至可以做螢幕快照或在螢幕上顯示資訊。 它的網路介面已被證實極不安全， 可以允許網路上的攻擊者植入 rootkit （取得電腦最高權限的工具）， 讓 PC 完全失守， 還可以向攻擊者回報 PC 上的所有活動。 它對自由、 安全、 隱私所造成的威脅不該被忽略。

在 6.0 版之前 （也就是 2008/2009 之前） 的版本， 要關閉 ME 的功能還比較容易； 但是自從 6.0 版開始 （Core i3/i5/i7 系列 CPU）， ME 的 Boot ROM 堅持一定要看到 「經過 Intel 數位簽章認證」 的韌體才會正常開機， 否則 30 分鐘後這部 PC 會自動關機。

2013 年第二季所推出的 Intel Boot Guard 讓 PC 的 OEM 廠商可以產生一對 [非對稱式金鑰](https://newtoypia.blogspot.tw/2010/09/asymmetric-cryptography.html)、 把公鑰安裝到 CPU 裡面， 以便 CPU 拒絕執行其他 （未以 OEM 私鑰簽章的） 韌體。 這也是為什麼 coreboot 跟 libreboot 無法支援這類 PC。

[追求開機速度但並不堅持全程使用自由軟體的] coreboot 計畫， 他們處理較新的 Intel CPU 的方式， 是接受 Intel 所提供的 FSP （firmware support package）。 它負責硬體 （包含 CPU 跟記憶體） 的初始化， 因此 SMM （System Management Mode） 也是由它處理。 這是一個比作業系統更底層的模式。 這可以是 rootkit 攻擊的入口， 開啟了無限多種攻擊使用者的大門。 事實上已經有好幾個 SMM rootkit 的實作 -- 搜尋一下就找得到。

另一個阻礙是 Intel 的 CPU 微碼 （microcode） 更新機制。 微碼是比機器語言還要更低階的東西 -- 一個機器碼指令， 可能是許多個微碼的組合所定義出來的， 例如有些機器碼指令可能需要用一個迴圈來完成。 這些定義很少更改； 但偶爾可能因為後來才發現 CPU 的設計有 bug， 需要更新微碼。 過去這些更新由作業系統處理； 但較新的系統都必須由韌體來處理。 在較舊的 Intel CPU 上， 你可以選擇不要更新； 但在較新的 Intel CPU 上， 你一定要更新， 否則 CPU 連開機都開不起來。 而更新一定要 Intel 的數位簽章。 這意謂著就算你有微碼的原始碼， 也無法套用自己修改的版本。 「更新微碼」 這個動作有可能會從很基本的層面全盤改變 CPU 的運作方式； 如果要提供這些不明內容的封閉原始碼更新， 將會抵觸 libreboot 的宗旨。

這幾年來， coreboot 計畫一直在跟 Intel 搏鬥。 Intel 一直極度不願合作。 很多 coreboot 開發者及公司希望 Intel 可以釋出韌體元件的原始碼。 就連賣了數百萬部 （裝載 coreboot 的） chromebook 的 google 都勸不動 Intel。

#### 二、 為什麼 libreboot 不支援較新的 AMD CPU？

AMD 的 Platform Security Processor （PSP） 等同於 Intel 的 ME 技術， 它的實作方式很不相同， 但造成的資安危機跟自由縮限問題是相同的。

跟 ME 一樣， PSP 韌體上需要有數位簽章， 否則電腦根本就無法開機。 PSP 是一顆具有 TrustZone 功能的 ARM CPU。 它跟主 CPU 放在同一個晶粒 （die） 上面， 所以它有能力隱藏自己的程式碼、 查看記憶體、 還有它從 [低權限的] （宿主） x86 系統記憶體撈來的任何資料 （例如核心的金鑰、 登入資訊、 瀏覽歷史、 按鍵活動、 ... 天知道還有什麼）。 更糟的是， PSP 理論上有能力取得整個系統的記憶體， 也就是說它最起碼能透過 MMIO 的方式存取網路及 PCI/PCIe 上面的裝置。

如果有惡意人士取得 AMD 的金鑰， 他就能夠在你的電腦裡安裝長駐的惡意軟體， 沒有用外部的燒錄裝置是無法刪除的。 AMD 的韌體過去已經出包過很多次。 PSP 的權限又極高 （ring -2 或 ring -3） 一旦出事， 啟用 PSP 的機器將被遠端監控與遙控， 而用戶將渾然不覺。

就跟 Intel Boot Guard 一樣， AMD 的 PSP 像個暴君一樣檢查開機韌體的數位簽章， 所以在某些板子上根本無法安裝諸如 coreboot 及 libreboot 之類的替代開機韌體。

在較新的系統上， AMD 的 AGESA 韌體負責所有核心硬體的初始化。 2011 年起， AMD 跟 coreboot 合作， 以自由軟體方式釋出原始碼； 但到了 2014 年， AMD 突然又改變主意， 只釋出執行檔。 也就是說， 現在的 AMD AGESA 基本上跟 Intel FSP 一樣。

AMD 一樣有微碼更新 （microcode update）， 不過相對於 Intel， AMD 有較新的 「允許不更新」 的機型。

#### 三、 近況

這個後門之所以現在又 （略微） 受到重視， 是因為5月1日， Intel 終於公布並修復了一個 （九年多前就被警告過的） 嚴重高風險等級安全漏洞。 不過除了 [inside](https://www.inside.com.tw/2017/05/04/intel-fixes-security-bug-affecting-business-pcs) 轉載雷鋒網比較明確的質疑、 [iThome](http://www.ithome.com.tw/news/113815) 的簡短報導、 [這一篇教學](http://blog.xuite.net/tolarku/blog/505530289) 之外， 華文世界似乎找不太到更多相關報導， 讓人覺得安靜得可怕。

2013 年中 Edward Snowden 開始爆料 NSA 的稜鏡計畫等等一系列全面監控技術， 當時中文媒體也曾大篇幅報導。 不過直到現在， 政府機關還是繼續用 （[ 帶有 （但預設並未啟動的） Dual EC DRBG 後門的](https://ckhung0.blogspot.tw/2014/03/dual-ec-drbg.html)） 微軟 windows。 甚至連暨南大學只是想跨出邁出自由的第一步， 就 [遭到學生反對](https://www.dcard.tw/f/ncnu/p/226224557)。

現在這個 CPU 等級的後門讓我們所有人更加無所遁逃、 更加全面地曝露在美國情治單位的全面掌控之下 -- 包含 GNU/linux 跟 *BSD 用戶。 事實上 GNU/Linux 跟 *BSD 用戶對此特別有感， 因為要捨棄這兩大 CPU 的困難度遠高於捨棄 windows。 但知道這問題嚴重性的人似乎卻更少。

就在 5/1 的公告及報導之後的一個多月， 微軟的資安團隊又發現了一個名為 PLATINUM 的 野生的惡意軟體利用上述的 Intel AMT 功能來監控南中國海附近的南亞及東南亞國家的國防、 情治、 政治、 電信單位/組織： [中文](https://tw.wxwenku.com/d/100792959)、 英文： [the hackernews](https://thehackernews.com/2017/06/intel-amt-firewall-bypass.html)、 [bleepingcomputer](https://www.bleepingcomputer.com/news/security/malware-uses-obscure-intel-cpu-feature-to-steal-data-and-avoid-firewalls/)、 [register](https://www.theregister.co.uk/2017/06/08/vxers_exploit_intels_amt_for_malwareoverlan/)、 [微軟部落格](https://blogs.technet.microsoft.com/mmpc/2017/06/07/platinum-continues-to-evolve-find-ways-to-maintain-invisibility/)。 微軟在去年的 [2016 年的原始報告](http://download.microsoft.com/download/2/2/5/225BFE3E-E1DE-4F5B-A77B-71200928D209/Platinum%20feature%20article%20-%20Targeted%20attacks%20in%20South%20and%20Southeast%20Asia%20April%202016.pdf) 當中指出： 看來它至少從 2009 年開始就持續運作。 受害單位組織當中， 馬來西亞佔超過一半； 印尼佔五分之一強； 中國佔 11.4%。 今年六月所發現的版本， 比舊版 PLATINUM 及其他所有傳統惡意軟體更強大的地方在於： 它進化採用 Intel ME 裡的 AMT 技術。 因為 AMT 歸小小太上皇 CPU 管， 所以 只要網路線還插著， 就算 「（宿）主」 作業系統以軟體方式切斷網路連線也沒有用； 「（宿）主」 CPU 的防火牆當然也完全不知道它在傳資料。 更重要的是： **Intel 回應： 這不是安全漏洞！** 就算你已套用 Intel 5/1 所發佈的修補也沒有用。 這個能力及動機都像是國家等級的潰客組織採用的是 AMT 的 Serial-over-LAN **正常功能**； 他們只是從別處 （例如透過 spearfishing e-mail） 取得入侵入口， 再善用 Intel 的 AMT 貼心功能而已。 很可以想像絕少客戶懂得針對這個重大資安問題質問 Intel， 也很可以想像 Intel 的立場依舊會是： 為了用戶的安全 （咳咳）， 我們還是堅決不允許你用 libreboot 來取消 (這個你從來就用不到、 但讓潰客很感恩 Intel 的) AMT 功能； **就算這會傷害到用戶的安全， 我們還是堅持要用我們的方式來維護用戶的安全 （咳咳）！**

#### 四、 對策

小格一再引述資安專家 [Bruce Schneier 的名言](https://www.schneier.com/crypto-gram/archives/1999/0915.html)： 「在資安領域， 開放原始碼是必要條件。 幾十年來都是如此。」 CPU 之於電腦的資訊安全， 就像地基之於大樓的穩固性。 很不幸的是， 今日兩大主流 CPU 廠商不僅沒有提供一個開放透明、 值得信任的地基給消費者， 甚至進一步用數位簽章的方式， 拒絕允許消費者選擇改用自己所信任的其他安全地基 （例如 libreboot）。 因為他們不信任消費者、 他們認為每一位消費者都是潛在的盜版者， 所以堅持用 [「信任運算」](https://ckhung0.blogspot.tw/2011/10/windows-8-secure-boot.html) 技術來鎖住消費者， 即使必須讓消費者付出嚴重的資安代價， 他們也不願改變立場， **因為他們真正在乎的是用數位權利管理 (DRM) 技術來保護著作權人的權利**。 而且 Intel 知道， 身為市場龍頭， 不論它如何糟蹋消費者， 消費者都還是會繼續乖乖地持續付錢。 看! [微軟綁架臺灣政府](https://www.twreporter.org/a/software-microsoft-tw-government) 多麼成功! 諸如成大醫院、台北市採購發包中心之類， 力挺壟斷市場龍頭的重要單位， 一定也會持續用銀彈跟發言來支持我們 Intel 的!

Libreboot 網站只能這樣建議： 「基於安全及自由的嚴重限制， libreboot 不太可能支援 2008 年之後的 Intel CPU 及 2013 年之後的 AMD CPU。 libreboot 計畫建議大家避免購買較新的 Intel CPU 及較新的 AMD CPU。」

對於較新的 Intel CPU 來說， [me_cleaner 計畫](https://github.com/corna/me_cleaner) 提供了一絲希望： 它能把 skylake 之前版本的可疑 ME 程式碼從 1.5MB 或 5MB 降到大約 90KB 而保持電腦仍能正常開機。 希望這 90KB 的程式碼只剩下最少的後門功能。 至於 Skylake 系列 CPU 則只能降到 650KB。

Linux 用戶還多了一個 （不是非常務實的） 替代方案： 改用 raspberry pi。 至少跟隱私與安全高度相關的資料與應用可以搬到這上面來執行。 其他 「被偷窺無所謂」 的資料及運算， 才留在運算速度較高的 PC 上執行。

3F/4F 讀者 Cheng-Chia Tseng 分享： [Purism 公司](https://puri.sm/learn/avoiding-intel-amt/) 有在賣去除後門的 Intel CPU。 下一批出貨的 librem 筆電將安裝 coreboot。 如果有人開了團購社團， 請留言分享一下網址。

這篇文章貼出來之後， 政府機關跟各大學會有反應嗎？ 連我自己都沒把握要花多少時間才能把自己的電腦處理完 （因為我連 BIOS 都沒刷過， 更不用說 CPU）。 我們國家有很多軟硬體人才， 可能是全世界最有潛力可以處理這個問題的國家之一。 但如果一項工作跟 「提升生活品質」、「提升安全」 比較相關， 跟 「拼經濟」 或 「衝 SCI 論文點數」、 「衝大學排名」 等等 [量化指標](https://ckhung0.blogspot.tw/2017/02/goodharts-law.html) 比較無關， 那麼恐怕就很難吸引到夠多人才投入。 我們生活在一個難以理解的年代、 難以理解的國家。 想要保護自己的資訊安全， 如果太過度期待政府、 資訊大廠跟學術卓越的大學， 恐怕會很失望。 自己的資安還是要靠自己顧。 這也是為什麼近幾年我把主力轉移到教學部落格 [玩具烏托邦](https://newtoypia.blogspot.tw/)。 聽勸的讀者請趕快學技術、 [邁向自由穩健走](https://www.cyut.edu.tw/~ckhung/g/ofset/post.php?id=08ag)， 或請懂自由軟體的廠商或朋友幫忙； 聽不進勸的... 我再跳針一百次也沒用啊！

#### 五、 後續

[11/15 補充]

1. [擔心Intel ME成為企業資安的後門？研究人員找到關閉的方法了!](https://www.ithome.com.tw/news/116509)
2. [沒想到的小贈品：Intel CPU 電腦都內建附贈 Minix 作業系統，買一送一真的賺到嗎？](https://technews.tw/2017/11/15/intel-and-me-and-why-we-should-get-rid-of-me/)
3. [Google Working To Remove MINIX-Based ME From Intel Platforms](https://linux.slashdot.org/story/17/11/09/2121237/google-working-to-remove-minix-based-me-from-intel-platforms)





{% asset_img 0.png %}
本著作係採用[創用 CC 姓名標示-相同方式分享 2.5 台灣 授權條款](https://creativecommons.org/licenses/by-sa/2.5/tw/)授權



此文章轉載自：[資訊人權貴ㄓ疑](https://ckhung0.blogspot.com/2017/06/intel-me-amd-psp.html)