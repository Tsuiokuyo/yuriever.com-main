---
title: "賽馬娘支援卡訓練排名表"
date: 2024-01-18T10:16:44+08:00
slug: e8a30688
featuredImage: "/assets/umaTier.jpg"
featuredImagePreview: "/assets/umaTier.jpg"
tags: [其他]
categories: [其他]
weight: 1
lastmod: 2024-01-18
---

用於台服賽馬娘的最優訓練牌組排名表

<!--more-->

<img src="images\1.jpg" title="" alt="OSD02" data-align="left">

### 這邊的文章比較凌亂，可能去巴哈看同一篇文會比較清楚，這邊算初稿而已，要調兩邊很麻煩...



### 先提一下，這個畫面不是我開發的，

我只是調整成台服適用以及讓我自己能更方便用而已，

當自身支援卡不多的時候，用來比較低破卡的訓練效益還是有點用處的，

#### 也許應該叫做支援卡訓練組合效益排名表。

#### 該網頁是基於目前選擇的支援卡給出訓練組合分數，因此當前使用的支援卡越多張，

分數會越來越高，他並不是單純計算一張卡的效益，而是多卡的組合效益，但並沒有考慮技能組。

#### 例如，牌組第一張是速北黑，那麼下一張牌的分數則是計算他跟速北黑的搭配的訓練效益。

#### 我將她弄成中文並僅顯示台服現有以及即將有的支援卡，

#### 再加入及調整一些細微末節以及參數不合理處，

#### 並在畫面上顯示出選擇的卡片擅長率跟一些參數，

#### 以及增加自己牌組設定，設定後會自動儲存在瀏覽器，

#### 用來比較自己擁有的低破SSR跟高破SR的訓練效果就不用再看一堆牌了。

<img src="images\2.jpg" title="" alt="123" data-align="left">

### 因為網頁不算複雜，都有寫用途了，

### 按下預定的劇本後，參數就預設好了，賽程、成長率都預設也行，

### 只需要選你的基底卡即可。

#### 已選擇的卡片會變灰色，因為無法重複的馬娘，要到上方把它點掉

### [Github](https://ref.gamer.com.tw/redir.php?url=https%3A%2F%2Fgithub.com%2FTsuiokuyo%2Fumamusume-tierlist%2Ftree%2Fmain)

### 畫面網址：[https://yuriever.com/umaTier/index.html](https://yuriever.com/umaTier/index.html)

這是原開發者的畫面網址:[Uma Musume Tier List](https://ref.gamer.com.tw/redir.php?url=https%3A%2F%2Feuophrys.github.io%2Fuma-tiers%2F)**

[**Github**](https://ref.gamer.com.tw/redir.php?url=https%3A%2F%2Fgithub.com%2FEuophrys%2Fumamusume-tierlist)

**內附賽馬娘英文教學手冊(日服進度)，****目前共217頁，鉅細靡遺，只差沒告訴你要如何開發遊戲而已**

**[googleDocs](https://ref.gamer.com.tw/redir.php?url=https%3A%2F%2Fdocs.google.com%2Fdocument%2Fd%2F1gNcV7XLmxx0OI2DEAR8gmKb8P9BBhcwGhlJOVbYaXeo%2Fedit)**

#### 這邊提一下卡片的分數怎麼來的

花了一點時間理解下他的分數計算方式，雖然對方參數命名很清楚，但不懂的地方還是不懂。

因此下方直接引用原文，並翻成中文

[https://docs.google.com/document/d/1gNcV7XLmxx0OI2DEAR8gmKb8P9BBhcwGhlJOVbYaXeo/edit#heading=h.aohtlry4ctho](https://ref.gamer.com.tw/redir.php?url=https%3A%2F%2Fdocs.google.com%2Fdocument%2Fd%2F1gNcV7XLmxx0OI2DEAR8gmKb8P9BBhcwGhlJOVbYaXeo%2Fedit%23heading%3Dh.aohtlry4ctho)

我稍微提一下大概是在程式碼的哪個地方

大概而已，因為路徑會隨著更新跑掉。

下面這段的邏輯大概在[processCards](https://github.com/Tsuiokuyo/umamusume-tierlist/blob/main/src/components/TierList.js#L127-L381) 中

> 這個分數是以相當複雜的方式生成的。首先計算卡片需要多少次訓練才能達到橘色羈絆，
> 然後計算這些訓練的平均專長訓練次數。使用這些非彩圈專長訓練的分數，
> 計算時考慮到你的牌組中每張其他卡片出現的機率百分比。

> 接著計算彩圈訓練的平均次數，然後使用你的牌組中每張其他卡片出現的機率百分比來計算獲得的屬性點。
> 同樣，計算卡片在其他彩圈中出現的機會，並以與上述相同的方式為分數做出貢獻。

> 其餘的分數是透過將它們的連鎖事件、起始屬性和比賽獎勵的屬性點作為固定的獎勵加總而得到的。

下面這段的邏輯大概在[function CalculateTrainingGain](https://github.com/Tsuiokuyo/umamusume-tierlist/blob/main/src/components/TierList.js#L383-L483) 中

> 分數的計算是通過首先計算沒有該卡片的情況下的訓練增益，然後將該增益減去有該卡片的情況下的增益。

下面這段的邏輯大概在[function CalculateCrossTrainingGain](https://github.com/Tsuiokuyo/umamusume-tierlist/blob/main/src/components/TierList.js#L485-L562) 中...?

> 組合機率是組合中每張卡片都存在的機率，這些機率相乘在一起。例如，如果 速北黑 和 力米浴 都在牌組中，該組合的機會將是 33% * 18% = 5.94%。會考慮到牌組中存在的每種可能的組合。

> 如果你的牌組是 ABCDE，那麼就會有 A、B、C、D、E、AB、AC、AD、AE、ABC、ABD、ABE、ACD、ACE 等等的組合，以此類推。

#### 該網頁的擅長率的計算公式以小北來說，

(100+80)x1.2 / (400+50+(180x1.2))=32.43%

**以下是廢話，一些擅長率的公式，基本上其他算法都算被推翻了**

順便查了一下目前賽馬娘得意率(擅長率)的計算公式，包應該已經被解析得差不多了，不過在各個討論、攻略區查了一下，被提起算法還是當初的那些，
實際上說不定根本沒有人在意得意率的公式，反倒比賽及賽道的公式很明確

至於最早是誰或哪個攻略網提出這些算式的我就沒有特地去找了，就隨意的貼上幾個網址供參考。

以速北黑50等滿破為計算基準

卡片基準擅長率是80 固有技能是20

在沒有得意率加成時，每項訓練自帶100點，不在訓練是50點，計算出來在每項訓練的機率是100/(100*5+50)=18.18%， 不在訓練的機率是50/(100*5+50)=9.09%

其實在巴哈也有人提過很多次了，有人用比較讓人能理解的方式講解算法

> 對於0得意的支援卡，出現在每項訓練的概率為100/550，不出現的概率是50/550；對於X得意率的支援卡，出現在自己對應屬性的訓練的概率為100+X/550+X，出現在其他四項訓練的概率是100/550+X，不出現的概率是50/550+X。

算法1:(100+100)/(400+50+100+100)=30.77%

(100+得意率+固有)/(100*5+50+得意率+固有)

> 小北的固有是1.2倍得意率

算法2:(100+80)x1.2 / (400+50+(180x1.2))=32.43%

[得意率の計算式＠ウマ娘 - マイセンのブログ](https://mysen.muragon.com/entry/2296.html)

> 基準值（約18%）x 得意率 = 訓練出現率。

> 由於驗證結果完全不出現的機率約為10％，因此假定訓練出現率為90%，每個訓練的得意率約為18%。這些數值似乎是通過乘以得意率得到的機率。朋友並沒有得意率，且兩人以上不會在同一位置出現。

> 根据总训练次数为1024次的数据发布

這個網站內提供的速北黑機率是  33.5%

算法3:18x (80+固有) = **33.5%**

[【ウマ娘】サポート効果と計算式一覧 - ゲームウィズ](https://gamewith.jp/uma-musume/article/show/274990)

> 18×(1+「得意率アップ」/100) [%]

算法4:18×(1+(80+20)/100)=**36%**

[[ウマ娘]サポートボーナス「得意率アップ」が100でも100%得意トレーニングにいないのはなんで？ | ウマ娘 プリティーダービーのQ&amp;A](https://game-question.com/qa/umamusume/dYfuCm4vNftVgGflYp2F)

而這裡有一個使用95%信賴區間做計算的說明影片(日文)

[【ウマ娘／最終的な計算式＆結論は概要欄記載】得意率の計算式を1327件（累計7962件）のデータに基づき分析！　元ネタはあのゲーム!? - YouTube](https://www.youtube.com/watch?v=yXhhifZg9MA)

https://i.gyazo.com/51fe0be75f87b9c38eaed3915ccc8080.png

最後該影片是認為得意率32.43%這個機率是當時最準確的

大概是這樣。

順便一提，雖然 [ウマ娘 サポカ性能比較ツール | 数字でわかるウマ娘攻略](https://ogatetsu.shop/entry/2023/03/26/support-card-compare-tool)

算是類似的作品，還有線圖，但是是單卡效益，而且要一個一個挑在加上日文及選卡麻煩，我還是覺得很難用。

感謝
