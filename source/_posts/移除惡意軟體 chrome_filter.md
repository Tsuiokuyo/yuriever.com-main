---
title: 移除廣告病毒 chrome_filter
tags: [其他,電腦安全]
categories: 其他
preview_text: 真是...有夠麻煩
date: 2019-01-24 10:00:00
preview: 


---

​	這幾天手癢，裝了一個東西之後就感染了名叫chrome_filter的chrome擴充功能，症狀大概就是在網頁點擊左鍵會跳轉到某個網站以及搜尋的時候多了一堆廣告，然後chrome擴充功能的圖示消失以及進入擴充功能頁面的時候會自動跳轉到Chrome線上應用程式商店，且即使移除了chrome_filter，重新開機之後還是會自動產生，從工作管理員詳細資料也找不到明顯異常的程序，那麼大概就是機碼或者dll被感染修改了，本來想說乾脆趁現在換一個新的瀏覽器就算了，不過這好像只能治標而不治本阿，而且誰知道它裡面還有塞甚麼PUP軟體在裡面，說不定這只是個煙霧彈，畢竟重開機就發現有一些軟體都被強制登出了，可能是有塞一些偽裝過的後台程式，不弄掉也很危險。

​	而搜尋了關鍵字都找不到移除的方法，只有找到一些看起來更容易多出其他問題的網頁，只好去依靠專門移除惡意軟體的工具了。



首先

​	chrome恢復為預設值，使用chomre內建的尋找並移除有害的軟體，跑一跑就當掉了......。

​	第一個軟體使用windows defender完整掃描，甚麼都沒發現。

​	第二個軟體使用Malwarebytes自訂掃描包含rookit，甚麼都沒發現。

​	第三個軟體使用ESET Online Scanner掃描，甚麼都沒發現。

​	第四個軟體使用malwarebytes adwcleaner掃，雖然有出現一些機碼，但chrome_filter還是沒成功砍掉。

​	第五個軟體使用superantispyware掃描，這倒是刪除了我一堆cookies。

​	再來使用微軟的Malicious Software Removal Tool掃描，又是甚麼都沒發現。

​	最後爬文看到別人用roguekiller砍掉hao123後就抓來試試看，沒想到還真的幫我把chrome_filter給砍了。



​	光是掃描的時間，兩天就這樣過了......

​	話說，原本還打算買Malwarebytes來使用，不過看來可能要再考慮其他的反間諜軟體了。