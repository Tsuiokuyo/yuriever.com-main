---
title: hexo插件 Hexo-blog-encrypt文章加密
tags:
  - hexo
  - 插件
categories: hexo
preview_text: 文章加密功能
abbrlink: '153'
date: 2019-01-19 10:00:00
preview:
---



我發現有些想轉貼的文章，有些作者並沒有標示CC，而我也沒有必要為了自己這小小的網站去打擾作者，那麼我不如把文章加密就好了，畢竟這網站本意是為了日後想起來，想在實作的時候至少有個地方可以讓我找到教學...



## [hexo-blog-encrypt](https://github.com/MikeCoder/hexo-blog-encrypt/blob/master/ReadMe.zh.md)



安裝

`npm install --save hexo-blog-encrypt`



更改站點目錄的config.yml 新增

```
# Security
##
encrypt:
    enable: true
```

之後就直接在文章Front-matter上增加對應的字段即可

```
---
title: hexo插件 Hexo-blog-encrypt文章加密
date: 2019-01-19 21:18:02
tags: [hexo,插件]
password: hexo
abstract: Welcome to my blog, enter password to read.
message: Welcome to my blog, enter password to read.
---
```

password: 加密的密碼
abstract: 是該部落格的摘要，會顯示在部落格的列表頁，與description相同，可省略
message: 密碼輸入框上面的描述文字



至於其他的功能，由於我不需要就不寫了。