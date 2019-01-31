---
title: (建構中)Google試算表，懶人定存投資配息配權計算
tags: [其他]
categories: 其他
preview_text: 自己要求太高，結果弄得好痛苦...
date: 2019-01-31 10:00:00
preview: 


---



​	網路上都找不到能夠完全自動的更新股票&ETF&基金配權配息以及含配權息的自動計算目前成本，一整個完美懶人版試算表，本人比較懶打算買了就丟著了，於是想要自己來弄一個試算表，雖然說基本上內建的函數就能搞定，不過一直想不出來自己到底是要弄成怎樣的樣式，花了一天的時間弄了個大概，結果就反而做出個四不像，而且到後面又想到，如果企業減資怎麼辦...而且還要在計算買入賣出股票的盈虧的話，好像......還是有艇多問題的阿，看來要打掉整個重新審視這個方法了。



## 由於還沒完成，所以排版也很亂

自己要求太高，結果弄得好痛苦...，而且花一堆時間不滿意又打掉重弄...

目前大致上的想法是

##### ​	清單頁面

總成本、總配息、總配權、含配權息總成本、預估收益、各項投資清單、自選股並自動代入以下參數

##### ​	股票相關

只要輸入購買的股票或ETF代號，購買時間或成本單位，即可自動出現於清單頁面並直接導入中文名稱、現價、歷年配息及內扣費用等

中文名稱使用`TWNAME`程式碼

從Google財經使用`GOOGLEFINANCE`函數抓取現價，並使用`IFERROR`搭配`TWPRICE`程式碼以防google財經出現不可預期的錯誤

歷年配息使用`importHTML`導入玩股網歷年配息

ex: 輸入B12欄位0050

```
=TWNAME(B12)
=IFERROR( GoogleFinance(CONCATENATE("TPE:",B12),"price"),TWPRICE(B12))
=importHTML("https://www.wantgoo.com/stock/report/basic_dp?stockno="&B2,"table",1)
```

使用驗證資料>下拉式選單導入撿股讚券商下單手續費

`=importHTML("https://stock.wespai.com/securities","table",1)`

輸入股票買進單位及價格，透過驗證資料自動計算手續費

(目前沒時間用......貌似AVERAGE可以使用?，有待測試)

自動算出股票買入的合理價格

(待研究)

導入ETF規模避免清算風險

(待規劃)



##### ​	基金相關

導入基金名稱

`=IMPORTXML("http://tw.morningstar.com/ap/quicktake/overview.aspx?PerformanceId=0P0000XRM7","//*[@id='MainContent_Quicktakeheader_QuickTakeForm_FundNameLabel']")`



導入淨值

`=IMPORTXML("http://tw.morningstar.com/ap/quicktake/overview.aspx?PerformanceId=0P0000XRM7","//*[@id='MainContent_QuickTakeMainContent_QuickTakeForm_NAVText']")`

其他基本上與ETF相同

(待規劃)

​	貨幣目前匯率

~~美金

設TWD於B1欄、USD於A2欄

~~`=GoogleFinance("CURRENCY:"&A2&B1)`~~

南非幣

設TWD於B1欄、ZAR於A3欄

~~`=GoogleFinance("CURRENCY:"&A3&B1)`~~

其他幣以此類

順帶一提目前加密貨幣似乎只有BTC以及ETH查得到

但是由於每間銀行的匯率不同，函數待修改







##### TWPRICE及TWNAME程式碼

```google apps script
// 從證交所抓取價格
function TWPRICE(code) { 
  var url = "http://mis.tse.com.tw/stock/api/getStock.jsp?ch=" + code + ".tw&json=1&_=";
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText("UTF-8");
  var data = JSON.parse(json);
  return data.msgArray[0].y;
}

// 從證交所抓取代號對應中文名稱
function TWNAME(code) { 
  var url = "http://mis.tse.com.tw/stock/api/getStock.jsp?ch=" + code + ".tw&json=1&_=";
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText("UTF-8");
  var data = JSON.parse(json);
  return data.msgArray[0].n;
}

```





參考資料

HC愛筆記財經部落格:http://hclovenote.blogspot.com/2014/12/googlespreadsheet20141228.html

WIKI股票投資筆記:http://wiki0918.pixnet.net/blog/post/222332253-%E7%94%A8google%E8%A9%A6%E7%AE%97%E8%A1%A8%E5%8F%96%E5%BE%97%E5%8F%B0%E8%82%A1%28%E4%B8%8A%E5%B8%82-%E4%B8%8A%E6%AB%83%29%E8%82%A1%E7%A5%A8%E5%A0%B1%E5%83%B9