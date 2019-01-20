---
title: hexo內嵌影片及影片自適應網頁
tags: [hexo,css,影片]
categories: hexo
preview_text: 或許還有更輕鬆的方法?
abbrlink: 5a26
date: 2018-12-31 12:00:00
---



### 過程：

​	在寫hexo的時候想在網頁嵌入一些影片以便懷舊事物的時候，發現markdown不支援直接在網站上瀏覽，必須以連結才可以播放，所以就打算直接使用html語法來嵌入影片，但是直接使用youtube給與的語法又無法自適應網頁大小，而直接修改影片的大小也只能治標，只好到處尋找有何方法可以處理。

​	各個語法測試之後，發現使用css確實有解，但是我這主題是使用scss語法，那麼我又要轉換一下才可以使用，更何況還不確定轉換的正不正確，經過一番測試之後發現影片大小一樣超出網頁，後來又輾轉找了一下，發現hexo就直接支援youtube嵌入影片。

​	使用hexo自己支援的嵌入影片又發現跟我的要求不太符合，所以就直接查看原始碼，看看hexo支援嵌入的格式是長怎樣的，最後發現有此語法`<div class="video-container">`，哎，好像有解了，雖然可能不是最正確的解答，但是我覺得我這樣就行了。



## 各語法出現的樣式

### 方案一 (失敗)

#### 使用markdown內建

`[![TEST](https://img.youtube.com/vi/44aeZKGfHUY/0.jpg)](https://youtu.be/44aeZKGfHUY "點擊進入youtube觀看")`

[![TEST](https://img.youtube.com/vi/44aeZKGfHUY/0.jpg)](https://youtu.be/44aeZKGfHUY "點擊進入youtube觀看")

<p>

壞處：需要點擊才能進入youtube觀看，而無法直接在網站中看，且若不提醒，會以為只是單純一張照片，照片的解析度看起來也不高。

### 方案二 (失敗)

#### 使用youtube提供格式(iframe)

`<iframe width="1280" height="720" src="https://www.youtube.com/embed/44aeZKGfHUY?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

<iframe width="1280" height="720" src="https://www.youtube.com/embed/44aeZKGfHUY?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<p>

壞處：一目了然，使用720P畫面直接超出我的網頁框架，即使修改width、 height大小也只是治標而不治本，只要螢幕解析度不同，看到的影片大小不一樣。

#### 使用embed格式

`<embed src="https://www.youtube.com/embed/44aeZKGfHUY" allowfullscreen="true" width="1280" height="720">`



<embed src="https://www.youtube.com/embed/44aeZKGfHUY" allowfullscreen="true" width="1280" height="720">

<p>

壞處：同上



### 方案三 (失敗)

#### 使用hexo的標籤外掛

`{\% youtube 44aeZKGfHUY \%}`

![標籤外掛](https://i.imgur.com/inVpFnV.jpg)

<p>

壞處：雖然可以直接在網頁中播放而且也沒有超出框架，但是畫面又太小了，所以要另尋方法。



### 方案四 (成功)

### 使用hexo的標籤外掛加CSS(SCSS)語法

首先使用`{\% youtube 44aeZKGfHUY \%}`

在至主題目錄新增CSS語法

**themes/(主題名)/source/css**

新增資料夾以存放自己新增的語法 

**themes/(主題名)/source/css/_my**

由於從標籤外掛所產生的原始碼所看到的名稱為`<div class="video-container">`

所以新增檔名為_video-container.css的檔案

CSS語法：

```CSS
.video-container {
position: relative;
padding-bottom: 56.25%;
padding-top: 30px;
height: 0;
overflow: hidden; }
.video-container iframe, .video-container object, .video-container embed {
position: absolute;
top: 0;left: 0;
width: 100%;
height: 100%;}
```

但是由於我的主題使用的語法並非使用CSS，而是使用SCSS，為了不出現bug，所以我把它轉換成SCSS語法

SCSS語法：

```scss
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
  iframe, object, embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
```

完成後回上一層修改style.scss文件(有些主題的名稱不同如main.styl等)

在裡面新增

`@import "_my/video-container"`

存檔，完成

{% youtube 44aeZKGfHUY %}

<p>

參考資料：

一化網頁設計：https://www.webdesigns.com.tw/youtube-rwd.asp

Dong's blog：http://deepwater.online/2017/01/12/%E5%A6%82%E4%BD%95%E5%9C%A8hexo%E4%B8%AD%E6%8F%92%E5%85%A5css%E4%B8%8Ejs/