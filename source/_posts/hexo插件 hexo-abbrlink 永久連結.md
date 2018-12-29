---
title: hexo插件 hexo-abbrlink永久連結
tags:
  - hexo
  - 插件
categories: hexo
preview: 'https://i.imgur.com/QV9MVC4.jpg'
preview_text: 簡單的說就是網址美化
abbrlink: ca1a
date: 2018-12-29 12:00:00
---



由於hexo預設的文章連結是依照年/月/日/標題設定，而網址名稱若是中文的話會被編譯成ASCII碼，而變得相當冗長以及不好看，而且修改標題的話網址會變更及失效，像我這種事後有空才會再次修改舊文章的就不適合使用，所以就使用該插件把網址變得稍微美觀以及縮短網址。



當然，也可以使用另一個插件[hexo-uuid](https://github.com/chekun/hexo-uuid) ，不過我是覺得變成網址沒有 [hexo-abbrlink](https://github.com/rozbo/hexo-abbrlink)好看。

**hexo-uuid**

`https://tsuiokuyo.netlify.com/posts/2f2dd790-1e71-11e6-95e1-ffc09ba0b003`



**hexo-abbrlink**

`crc16 & hex`
`https://tsuiokuyo.netlify.com/posts/3ab2`

`crc16 & dec`
`https://tsuiokuyo.netlify.com/posts/12345.html`
`crc32 & hex`
`https://tsuiokuyo.netlify.com/posts/9a8b6c4d.html`

`crc32 & dec`
`https://tsuiokuyo.netlify.com/posts/1690090958.html`



其中dec表示十進位

hex表示十六進位



使用git bash安裝 hexo-abbrlink

使用git bash安裝 hexo-abbrlink

`npm install hexo-abbrlink --save`





更改站點目錄的config.yml

像我想要讓人知道我是用靜態網頁 就在最後面加上.html，所以可加可不加

```
permalink:  posts/:abbrlink.html
permalink_defaults:
abbrlink:
  alg: crc16
  rep: hex    
```

不過簡短的話 其實只要用crc16+hex就好了

不用dec的原因是我覺得純數字不利於SEO

當然 網頁的SEO沒有那麼簡單

若是要更短的話可以把posts/去掉

變成

```
permalink:  :abbrlink
permalink_defaults:
abbrlink:
  alg: crc16
  rep: hex  
```

`https://tsuiokuyo.netlify.com/3ab2`

當然，他也可以自定義格式

```
permalink_defaults:
  author_name: tsuiokuyo
permalink: :author_name/:abbrlink
```

網址會變成

`https://tsuiokuyo.netlify.com/tsuiokuyo/3ab2`

一切端看個人喜好。



參考資料：

[silentink blog](https://david6686.github.io/blog/silentink/54803/)