---
title: 在HEXO底下新增自定義網頁
tags: [hexo]
categories: [hexo]
slug: f192
date: 2019-02-21 10:00:00
---

其實這也只是上一篇文章[使Hexo不渲染html檔](https://tsuiokuyo.netlify.com/posts/d644)的延伸而已

要新增一個hexo底下的html網頁，就我目前的知識，方法約有兩種

一種是通過子域名以及在github&gitlab各新增一個倉庫，我一次架設在兩個地方，先不提域名，光要在弄一遍我就覺得很麻煩......，不過我倒是沒試過，也許是我理解錯誤，還是這只是弄成入口網頁才需要的，其實這方法非必要？




另一種是先修改主題的_config.yml，在其中menu下新增一個page

如:

```
  menu:
  - title:  子網站建構中
    icon: bug
    url: test
```

或是

```
menu:
 test: test/
```

端看那個主題是如何撰寫的，反正就依樣畫葫蘆，我的網站也都是這樣走過來的......

而那個test路徑等同於在source下的資料夾



新增完之後，就是直接在根目錄下的_config.yml新增

```
skip_render: test/**
```

然後就把html檔丟進去就完成了，有如：

https://tsuiokuyo.netlify.com/b/

本來想說單純都使用html5+css搞出子網站首頁，不過能力不足阿，只能去找好看的模板......

至於其他包在test裡面的網頁因為skip_render直接用星號表示內含的所有資料夾，所以也不會編譯，只不過資料夾不建議弄太深，畢竟不利於SEO，我記得網址的結構深度好像不超過第二層比較好，不過這是與我不相關的東西，所以我也沒太在意。

