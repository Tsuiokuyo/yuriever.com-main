---
title: '網站連結©[趴會兒Project]No.004 洞察秋毫的觀測者 - 伺服器監控助手（基於PHP探針和Raspberry Pi）'
tags:
  - 網站連結
  - 樹莓派
categories: 網站連結
preview_text: 無授權聲明，故僅提供原文網址
abbrlink: '4693'
date: 2019-01-20 10:00:00
preview:
password: nocopyright
message: https://steinslab.io/archives/1164

---

找尋原因：樹莓派扔著也是扔著，想拿來做PT機，搞這個還能順便看一下有沒有流量......。

因作者並沒有明說是否可以轉貼，故僅放上原文網址。

原文：https://steinslab.io/archives/1164

------

# [趴會兒Project]No.004 洞察秋毫的觀測者 - 伺服器監控助手（基於PHP探針和Raspberry Pi）

用Python爬蟲抓取PHP探針提供的即時訊息，比如網速、負載、記憶體訊息等等，然後顯示在1602螢幕上。讓你隨時監控伺服器



關鍵字：PHP探針、伺服器監控、VPS監控、Python、樹莓派、Raspberry Pi、1602。

![img](https://steinslab.io/wp-content/uploads/2017/02/DSC_0031-1024x576.jpg)





本項目隸屬於**趴會兒Project項目組，詳見[企劃]趴會兒Project–宿舍床上趴到底&解放雙腿計劃**

項目編號004，分類為訊息/監控。

![thumb](http://steinslab.xyz/wp-content/uploads/2016/08/thumb-1024x648.jpg)

## Contents

1. [0.序言](https://steinslab.io/archives/1164#0.)

2. 1.PHP探針

   

   1. [1.1 關於PHP探針](https://steinslab.io/archives/1164#PHP_1)
   2. [1.2 分析](https://steinslab.io/archives/1164#1.2_)
   3. [1.3 伺服器返回json](https://steinslab.io/archives/1164#json)

3. [2 Python爬蟲](https://steinslab.io/archives/1164#Python)

4. 3.使用1602液晶屏

   

   1. [3.1 1602及介面定義](https://steinslab.io/archives/1164#3.1_1602)
   2. [3.2 Raspberry Pi 3B 的引腳定義](https://steinslab.io/archives/1164#Raspberry_Pi_3B_)
   3. [3.3 Adafruit的charLCD庫](https://steinslab.io/archives/1164#AdafruitcharLCD)
   4. [3.4 點亮1602和運行範例代碼](https://steinslab.io/archives/1164#3.4_1602)

5. [4.最終組合](https://steinslab.io/archives/1164#4.)

6. [5.包裝及最終效果](https://steinslab.io/archives/1164#5.)

7. [6.結語](https://steinslab.io/archives/1164#6.)

 

 



## 0.序言



我的ipv6代理伺服器很受歡迎，因此按需求來講，我需要一個能即時監控流量的工具。PHP探針作為一個很方便的工具，成為了我的選擇。但是自帶的web界面對我來說不是很方便。

玩了一假期的樹莓派，之前做項目剩了很多1602螢幕。它們之間的組合，就有了今天的作品。

> 伺服器監控助手，基於PHP探針和Raspberry Pi。用Python爬蟲抓取PHP探針提供的即時訊息，比如網速、負載、記憶體訊息等等，然後經過處理，顯示在1602螢幕上。讓你隨時監控伺服器網速。伺服器down掉了也能一秒發現。

又到了激動人心的命名環節了。不用考慮那麼多，名字我早想好了

> **《洞察秋毫的觀測者》——基於PHP探針和樹莓派的伺服器監控助手**

 

 



## 1.PHP探針



使用PHP探針是有理由的，不光是因為MJJ最喜歡以針會友，也是因為對於一個有LNMP環境的伺服器，上一個探針並不會帶來多少性能損失。因此，準備PHP探針既方便，又合適。

我也做了一個提前預備，探索了一下雅黑PHP探針的結構，嘗試用爬蟲抓取了一下。

詳細筆記參見：

[[學習筆記\]利用PHP探針和Python爬蟲監控伺服器狀態](https://steinslab.io/archives/1144)–https://steinslab.io/archives/1144

這裡調出一些骨架內容。

 



### 1.1 關於PHP探針



關於PHP探針，給不知道的讀者說道說道。

[雅黑實驗室  –  http://www.yahei.net/](http://www.yahei.net/)

> **【雅黑PHP探針】**
> 雅黑PHP探針最大的優點：每秒更新，不用刷網頁。有一個負責的站長，會對探針進行長期支持和更新。
> 用於Linux系統（不推薦使用於Windows系統）。
> 可以即時查看伺服器硬碟資源、記憶體占用、網卡流量、系統負載、伺服器時間等訊息，1秒鐘刷新一次。
> 以及包括伺服器IP位址，Web伺服器環境監測，php等訊息。

php探針對於經常購買VPS折騰的人肯定不陌生，簡單地老說就是一個可以獲取系統訊息並在網頁上顯示的php程式。雅黑PHP探針的界面如下：

我一個Digitalocean伺服器上掛的示範探針：  <http://sfo01.misaka.cc:888/tz.php>

![img](https://steinslab.io/wp-content/uploads/2017/02/WPKQNNSTUC38A1V47TU-1024x826.png)

因此，經常有人買各種廉價小記憶體的VPS，只能掛個探針，卻因此獲得巨大快感，並從bbs上交流。叫做以針會友。

 



### 1.2 分析



具體的分析方法請參見筆記：

[[學習筆記\]利用PHP探針和Python爬蟲監控伺服器狀態](https://steinslab.io/archives/1144)–https://steinslab.io/archives/1144

 



### 1.3 伺服器返回json



這個探針，在前端使用ajax每秒向伺服器請求數據，請求的url為：

http://sfo01.misaka.cc:888/tz.php?act=rt

伺服器會返回一個json數據，用於解析計算，在前端顯示伺服器負載網速訊息等。返回的json其實多了小括號，範例如下：

















| 1    | ({"useSpace":"3.986","freeSpace":"15.576","hdPercent":"20.38","barhdPercent":"20.38%","TotalMemory":"490.23 M","UsedMemory":"414.94 M","FreeMemory":"75.29 M","CachedMemory":"84.82 M","Buffers":"105.35 M","TotalSwap":"0 M","swapUsed":"0 M","swapFree":"0 M","loadAvg":"0.05 0.01 0.00 1\/117","uptime":"3\u59293\u5c0f\u65f644\u5206\u949f","freetime":"","bjtime":"","stime":"2017-02-18 15:35:36","memRealPercent":"45.85","memRealUsed":"224.77 M","memRealFree":"265.46 M","memPercent":"84.64%","memCachedPercent":"17.3","barmemCachedPercent":"17.3%","swapPercent":"0","barmemRealPercent":"45.85%","barswapPercent":"0%","NetOut2":"44 K 505 B ","NetOut3":"2 G 826 M 560 K 68 B ","NetOut4":"","NetOut5":"","NetOut6":"","NetOut7":"","NetOut8":"","NetOut9":"","NetOut10":"","NetInput2":"44 K 505 B ","NetInput3":"3 G 146 M 334 K 784 B ","NetInput4":"","NetInput5":"","NetInput6":"","NetInput7":"","NetInput8":"","NetInput9":"","NetInput10":"","NetOutSpeed2":"45561","NetOutSpeed3":"3014180932","NetOutSpeed4":"0","NetOutSpeed5":"","NetInputSpeed2":"45561","NetInputSpeed3":"3374660368","NetInputSpeed4":"0","NetInputSpeed5":""}) |
| ---- | ------------------------------------------------------------ |
|      |                                                              |



爬蟲的思路也清晰了。

 

 

 

------



## 2 Python爬蟲



Python爬蟲的簡易教學我參考了：

[Python爬蟲教學 – 崔慶才的個人部落格](http://cuiqingcai.com/1052.html)

文章簡潔精悍。沒多少字，簡單帶過後，了解了爬蟲運用的一些思想。

我的探索筆記見：

[[學習筆記\]利用PHP探針和Python爬蟲監控伺服器狀態](https://steinslab.io/archives/1144)–https://steinslab.io/archives/1144

 

最後的爬蟲代碼（Python3）：















Python



| 1234567891011121314151617181920212223242526 | # -*- coding:utf-8 -*-from urllib import requestimport json #探針爬蟲類class PHPTZ:     #初始化方法，定義一些變數    def __init__(self):        self.url = 'http://138.197.193.89:888/tz.php?act=rt'            def getData(self):        try:            f = request.urlopen(self.url)            data = f.read()            data2 = str(data.decode('utf-8')).strip('(').strip(')')            dataj = json.loads(data2)            print(dataj)            print(type(dataj))                    except            print('Error')            return None                myserver = PHPTZ()myserver.getData() |
| ------------------------------------------- | ------------------------------------------------------------ |
|                                             |                                                              |



運行一下：

















| 123  | pi@raspberrypi:~ $ sudo python3 tz.py{'NetInput7': '', 'NetInput5': '', 'NetOut2': '44 K 505 B ', 'uptime': '3天4小時48分鐘', 'loadAvg': '0.00 0.00 0.00 1/115', 'NetInput10': '', 'stime': '2017-02-18 16:39:49', 'NetInput4': '', 'NetOutSpeed2': '45561', 'NetInputSpeed3': '3379146879', 'freetime': '', 'NetOut9': '', 'UsedMemory': '418.66 M', 'hdPercent': '20.39', 'swapFree': '0 M', 'NetOut7': '', 'CachedMemory': '87.81 M', 'NetInput3': '3 G 150 M 620 K 127 B ', 'NetOut3': '2 G 830 M 296 K 887 B ', 'NetInputSpeed4': '0', 'NetOut6': '', 'NetInput2': '44 K 505 B ', 'memRealPercent': '45.61', 'FreeMemory': '71.57 M', 'NetInput8': '', 'NetOut8': '', 'memRealFree': '266.66 M', 'freeSpace': '15.573', 'swapPercent': '0', 'barmemRealPercent': '45.61%', 'memCachedPercent': '17.91', 'TotalMemory': '490.23 M', 'NetInputSpeed2': '45561', 'barmemCachedPercent': '17.91%', 'NetInputSpeed5': '', 'TotalSwap': '0 M', 'NetOut4': '', 'barhdPercent': '20.39%', 'Buffers': '107.28 M', 'useSpace': '3.989', 'memPercent': '85.4%', 'bjtime': '', 'NetOutSpeed4': '0', 'NetInput6': '', 'memRealUsed': '223.57 M', 'barswapPercent': '0%', 'swapUsed': '0 M', 'NetOut5': '', 'NetInput9': '', 'NetOutSpeed5': '', 'NetOutSpeed3': '3018105719', 'NetOut10': ''}<class 'dict'> |
| ---- | ------------------------------------------------------------ |
|      |                                                              |



確實得到了一個包含數據的字典。

這裡注意一下。字典中“speed”的值為一累計數，在後來的數據處理用，需要算出差值，在本機估算網速。

 

------

 



## 3.使用1602液晶屏





### 3.1 1602及介面定義



16是指一行顯示16個字元，02表示2行。1602是一種非常常見的、在DIY和工業中廣泛使用的顯示期間。價格低，可以選用各種顏色的背光，字元顏色也是可選的。

![img](https://steinslab.io/wp-content/uploads/2017/03/u29663121621931248118fm23gp0.jpg)

 

這裡不是i2c介面的1602螢幕。

1602的引腳定義如下：

1. VSS，接地
2. VDD，接5V電源
3. VO，液晶對比度調節，接電位器中間的引腳
4. RS，暫存器選擇
5. RW，讀寫選擇
6. EN，使能信號
7. D0，數據位0，4位工作模式下不用，不接
8. D1，數據位1，4位工作模式下不用，不接
9. D2，數據位2，4位工作模式下不用，不接
10. D3，數據位3，4位工作模式下不用，不接
11. D4，數據位4
12. D5，數據位5
13. D6，數據位6
14. D7，數據位7
15. A，液晶屏背光+，接5V
16. K，液晶屏背光-，接地

 



### 3.2 Raspberry Pi 3B 的引腳定義



![img](https://steinslab.io/wp-content/uploads/2017/03/20161123172320207.png)

該圖是型號3b的引腳定義圖。之前也是圖不對被坑了好久。注意在以下Python代碼中，介面號碼指的是**“GPIO”代號**。

 



### 3.3 Adafruit的charLCD庫



Adafruit系列的庫是我比較喜歡的庫，好用，簡潔易懂！

<https://github.com/adafruit/Adafruit_Python_CharLCD>

下載後在樹莓派上安裝時，注意：

需要注意python命令默認代表的Python版本號。我的樹莓派，“python”這條命令默認指的是Python2。因此，我需要運行

















| 1    | sudo python3 setup.py install |
| ---- | ----------------------------- |
|      |                               |



 



### 3.4 點亮1602和運行範例代碼



來看一下charLCD庫的範例代碼：















Python



| 123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384 | #!/usr/bin/python# Example using a character LCD connected to a Raspberry Pi or BeagleBone Black.import time import Adafruit_CharLCD as LCD  # Raspberry Pi pin configuration:lcd_rs        = 27  # Note this might need to be changed to 21 for older revision Pi's.lcd_en        = 22lcd_d4        = 25lcd_d5        = 24lcd_d6        = 23lcd_d7        = 18lcd_backlight = 4 # BeagleBone Black configuration:# lcd_rs        = 'P8_8'# lcd_en        = 'P8_10'# lcd_d4        = 'P8_18'# lcd_d5        = 'P8_16'# lcd_d6        = 'P8_14'# lcd_d7        = 'P8_12'# lcd_backlight = 'P8_7' # Define LCD column and row size for 16x2 LCD.lcd_columns = 16lcd_rows    = 2 # Alternatively specify a 20x4 LCD.# lcd_columns = 20# lcd_rows    = 4 # Initialize the LCD using the pins above.lcd = LCD.Adafruit_CharLCD(lcd_rs, lcd_en, lcd_d4, lcd_d5, lcd_d6, lcd_d7,                           lcd_columns, lcd_rows, lcd_backlight) # Print a two line messagelcd.message('Hello\nworld!') # Wait 5 secondstime.sleep(5.0) # Demo showing the cursor.lcd.clear()lcd.show_cursor(True)lcd.message('Show cursor') time.sleep(5.0) # Demo showing the blinking cursor.lcd.clear()lcd.blink(True)lcd.message('Blink cursor') time.sleep(5.0) # Stop blinking and showing cursor.lcd.show_cursor(False)lcd.blink(False) # Demo scrolling message right/left.lcd.clear()message = 'Scroll'lcd.message(message)for i in range(lcd_columns-len(message)):    time.sleep(0.5)    lcd.move_right()for i in range(lcd_columns-len(message)):    time.sleep(0.5)    lcd.move_left() # Demo turning backlight off and on.lcd.clear()lcd.message('Flash backlight\nin 5 seconds...')time.sleep(5.0)# Turn backlight off.lcd.set_backlight(0)time.sleep(2.0)# Change message.lcd.clear()lcd.message('Goodbye!')# Turn backlight on.lcd.set_backlight(1) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
|                                                              |                                                              |



用起來感覺和Arduino一樣。

已經很清楚了，主要是注意，數字代表GPIO介面。

ok，我找到正確的GPIO參照圖後，成功點亮。

![img](https://steinslab.io/wp-content/uploads/2017/03/DSC_0010-1024x576.jpg)

 

 

 

------



## 4.最終組合



先貼出來完整代碼

















Python



| 123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960 | from urllib import requestimport jsonimport timeimport Adafruit_CharLCD as LCDimport math class PHPTZ:     def __init__(self):        self.url = 'http://150.95.151.229:8888/tz.php?act=rt'        self.dataj = []            def getData(self):        try:            f = request.urlopen(self.url)            data = f.read()            data2 = str(data.decode('utf-8')).strip('(').strip(')')            self.dataj = json.loads(data2)                        return self.dataj        except :            print('Error')            return None    def getSpeed(self):        return self.dataj['NetOutSpeed3']        class my1602:    def __init__(self,a):        self.lcd_rs        = 27          self.lcd_en        = 22        self.lcd_d4        = 25        self.lcd_d5        = 24        self.lcd_d6        = 23        self.lcd_d7        = 18        self.lcd_backlight = 4        self.lcd_columns = 16        self.lcd_rows = 2        self.lcd = LCD.Adafruit_CharLCD(self.lcd_rs, self.lcd_en, self.lcd_d4, self.lcd_d5, self.lcd_d6, self.lcd_d7,self.lcd_columns, self.lcd_rows, self.lcd_backlight)        self.dataj = a    def display(self,b,d,t):        self.dataj = b        self.lcd.clear()        self.lcd.message(self.dataj['NetOut3']+'\n'+str("%.3f"%(d/1024/t))+' KB/s')  #主函數開始，前四行類似於setupmyserver = PHPTZ()mylcd = my1602(data)time1 = time.time()speed2=speed1=myserver.getSpeed() #大循環while(1):       data=myserver.getData()    speed2=speed1    data1=myserver.getSpeed()    time2=time1    time1=time.time()    mylcd.display(data,float(speed1)-float(speed2),float(time1)-float(time2)) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
|                                                              |                                                              |



1. 主函數，前四行類似於Arduino中的setup()，只運行一次初始化。然後進入大循環。
2. myserver.getSpeed()返回值為字串，需要轉化成float。
3. 計算網速，用了兩次time.time獲取時間戳，然後再相除換算得到具體網速。鑑於本地和伺服器延遲基本穩定，此方法比較準確。
4. `"%.3f"%(d/1024/t)`保留3位小數
5. 面向對象的設計模式意識淺薄，多多包涵

運行，成功！

![img](https://steinslab.io/wp-content/uploads/2017/03/DSC_0011-1024x576.jpg)

 

 

 

------



## 5.包裝及最終效果



包裝見：

[殘念系手工藝人：手把手教你用濕巾盒DIY樹莓派外殼 — https://steinslab.io/archives/1151](https://steinslab.io/archives/1151)

 

最終效果：

![img](https://steinslab.io/wp-content/uploads/2017/02/DSC_0031-1024x576.jpg)![img](https://steinslab.io/wp-content/uploads/2017/02/DSC_0033-1024x576.jpg)

 



## 6.結語



假期學了一點點Python，玩了樹莓派。在學期初真真正正用樹莓派做出了一個符合自己需求的東西。

樹莓派真的好玩，我突然發現我對Linux的理解更深了，一些日常操作也不在話下了。

樹莓派真好玩兒，您得來一個。



此文章轉載自：[Steins;Lab](https://steinslab.io/archives/1164)