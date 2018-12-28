---
title: (一)架設hexo部落格
date: 2018-12-28 00:00:00
tags: hexo
categories: hexo
preview: https://i.imgur.com/Q9gk4TW.jpg
preview_text: 拋棄前一個部落格，跑來這邊重新做一個@@

---



安裝需求

1. Git

   網址：https://git-scm.com/

2. Node.js

   網址：https://nodejs.org/en/

3. hexo

   網址：https://hexo.io/zh-tw/index.html

Git與Node.js兩個軟體的安裝選項，老實說我看不懂，所以全都是使用預設的選項。

兩樣安裝完畢後，

右鍵使用Git bash或命令提示字元安裝HEXO。

![Git](https://i.imgur.com/tIrfRxK.jpg)

`npm install -g hexo-cli`

可發現HEXO安裝到這個路徑C:\Users\\**"USER"**\AppData\Roaming\npm\hexo。



檢測 Node.js及npm是否有安裝成功，有數字表示成功。

`node -v`
`npm -v`



初始化HEXO

`hexo init blog`

其中blog是指存放hexo生成檔案的資料夾。



若出現

Error: Cannot find module ‘*:\Program Files\Git\node_modules\hexo\bin\hexo’

去HEXO安裝的路徑把node_modules放進git目錄。



產生靜態檔案

`hexo g`



啟動伺服器

`hexo s`



之後即可在http://localhost:4000/看見架設的頁面

默認主題為landscape

首頁出現的檔案為\source\_posts的地方看到hello-world.md檔案，為markdown語法

![首頁](https://i.imgur.com/Q9gk4TW.jpg)



目前本人使用的markdown撰寫平台

基本上都是看哪個有人推薦就用哪個

Typora

網址：https://typora.io/

所見即所得，單一介面，輸入語法時字體會同步改變，有繁體中文，畫面超級簡潔。

![Typora](https://i.imgur.com/EjXk78v.jpg)

先前使用的平台

Haroopad

網址：http://pad.haroopress.com/user.html

![Haroopad](https://i.imgur.com/FHxFDtr.jpg)

所見即所得，介面分為左右兩側，左側輸入語法的時右側畫面就會跟著改變，簡體中文，有時候我開啟會卡住。