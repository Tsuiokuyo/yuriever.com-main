---
title: "從HEXO 搬到 HUGO"
date: 2022-07-13T10:11:04+08:00
tags: [hugo]
categories: [hugo]
slug: b540a171
---





由於一大段時間沒管過這個網站，所以HEXO一大段時間也沒更新了，指令早就忘光了，勉強更新後，套件拋一堆問題給我，雖然起初也覺得無所謂啦，但其實早就看原本的佈景不是很順眼了，弄了一堆沒用的東西，有些沒在運作的程式碼也懶得去拔掉，乾脆趁現在沒工作一次打掉重來好了。



目前markdown跟內建樣式有點懶的研究，所以文章排版就比較爛了

hexo改到hugo沒甚麼特大問題，畢竟網路資源一大堆，路也不是只有一條能走，windows我的順序是

### 1.下載hugo.exe

### 2.設定使用者變數到這個exe檔



### 3.創建網站 

在隨意的地方 下個CMD 

```cmd
hugo new site XXXX
```



### 4.創建文章 

創完XXXX後進入XXXX資料夾之中，測試建一個文章

```cmd
hugo new xxxx.md 
```

確定OK沒問題後 

### 5.找主題

我找的是 https://github.com/dillonzq/LoveIt 

沒甚麼特別的原因，單純是官方的主題查詢功能很爛，而且使用者多才好找教學文



### 6.把舊文章搬到hugo並且對應原本的網址

以前hexo有hexo-abbrlink這種亂數網址的永久連結插件能用，但hugo可沒有套件可以使用，所以使用其他方式。

到archetypes/default.md裡面添加

```yaml
slug: {{ substr (md5 (printf "%s%s" .Date (replace .TranslationBaseName "-" " " | title))) 4 8 }}
```

簡單的說是用時間加文章名+md5隨便取幾位數做網址

![1](images/1.jpg)

未來使用 hugo new 就會自動產生網址，就跟hexo-abbrlink差不多了

新增後再到config.toml最底下加入

```toml
[permalinks]
  post = "/post/:slug"
```

然後就是慢慢的把以前的廢文

一個一個從 `abbrlink: XXXA`

改成`slug: XXXA`

現在想想 好像可以直接用全部取代

然後要記得就是每個冒號":"後面要加空格，不然建構時會不給過...



### 7.把hexo的標籤外掛改成Hugo的shortcode或是markdown語法

舉個例子 我在hexo引入圖片都用 {% asset_img 1.jpg %}

hugo可看不懂這是啥，所以打算都改成用markdown的語法，不然未來無聊又去改環境的話...



### 8.讀一讀Loveit https://hugoloveit.com/zh-cn/posts/ 提供的教學看有甚麼簡單的事情能弄



### 9.稍微改一改主題

後續有心情再寫，畢竟也都是其他人的文章找來的，要複製貼上再改成自己的話有點麻煩



### 10.修改netlify部屬設定

畢竟我是整包丟在上面讓netlify去Build，也只是把原本的`hexo generate`改成`hugo`



### 11.增加netlify Environment variables的參數，

版本就看當前的版本

![2](images/2.jpg)



### 12.裝個[giscus](https://giscus.app/zh-TW) 留言功能

建個新個倉庫，建完後從setting內往下勾選Discussion功能，後在github安裝 [giscus](https://github.com/apps/giscus)  應用程式，至於對應方式因為我是用永久連結，所以就直接用路徑名稱來對應了，然後因為Loveit主題有支援，所以就到config.toml內把相關參數填進去即可。

順帶一提，Loveit包了兩層判斷，所以除了

```toml
[params.page.comment]

​enable = true
```

之外

還要設定

```toml
[params.page.comment.giscus]

​enable = true
```



### 13.基本設定大概就這樣而已吧

剩下的就是排版跟改改主題了，因為目前排版基本上全部亂掉了...。

