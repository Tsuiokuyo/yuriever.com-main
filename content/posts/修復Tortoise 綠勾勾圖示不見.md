---
title: "修復Tortoise 綠勾勾圖示不見、資料夾同步圖示不見"
date: 2024-08-15T13:47:41+08:00
slug: 5a54d269
featuredImage: "/assets/.jpg"
featuredImagePreview: "/assets/.jpg"
tags: []
categories: []
---



主因是微軟的OverlayIcon限制15個問題



懶人包:

開啟regedit.exe後，路徑到

HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers

![](images/1.jpg)

在將Tortoise系列弄到前面即可，

例如將其他資料夾的檔名刪除空白建，或是將Tortoise資料夾加個!或是 ATortoise 都行，



而如果之後又加入了其他會有小圖示的程式，他們似乎會自動將自己的登錄檔資料夾前面再加一個空白鍵，讓自己保證安裝後會有圖示






