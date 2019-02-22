---
title: 使Hexo不渲染html檔
tags:
  - hexo
categories: hexo
preview_text: 是時候做一個隱藏的網頁塞看過的動畫的名了
abbrlink: d644
date: 2019-02-15 10:00:00
preview:
---

這個早在我使用Google Search Console就已經弄過了，不過我原本使用的skip_render有點麻煩，現在要搞一個不被hexo渲染的HTML頁面在我的網站裡，所以找找有沒有更好的方式，而名稱倒是有各種翻譯，不曉得哪個是正確的，編譯、解析、渲染，而在中國方面似乎比較多使用渲染這個詞？
不過這只是針對單一檔案方便而已，若是整個網頁檔的話，還是使用skip_render方便，畢竟能夠直接跳過整個資料夾

原本使用根目錄下的_config.yml，skip_render參數

`skip_render: '*.html'`

這路徑代表著source資料夾下全部的html檔跳過渲染

所以若要用一個多弄一個html檔勢必會變成

`skip_render:  ['*.html', anime/test.html]`

而其他的參數大概是

跳過資料夾所有的文件，含md檔

`skip_render: anime/*`

跳過資料夾所有的文件與內含的資料夾

`skip_render: anime/**`

跳過多個文件或資料夾，如我使用的方式

`skip_render: ['\*.html', anime/\*\*, test/*]`

或

`skip_render:`

​	`-	anime/*.html`

​	`-	test/**`



不過後來發現若是只有單一檔案有點麻煩，所以最後使用

```
---
layout: false
---
```

直接在html檔或是md檔上方添加就好了