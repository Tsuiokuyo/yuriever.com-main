    <script>
  let vueA = new Vue({
    el: "#app",
    data: {
      anime: [],
    },
    mounted: function() {
      this.anime = getData();
    },
    methods: {
      filterTag(value, row) {
        var checkTag = row.data.type.some(function(item, index, array) {
          return item === value
        });
        return checkTag;
      },
    }, //end methods
  }); //end vue
</script>

---
title: 關於我
date: 2020-02-17 13:08:00
---

~~今年剛當完兵，正失業中~~~

~~換了幾次個人紀錄用的平台，現在跑來這邊寫，等哪天有多餘的資金的時候想買個來域名玩玩~~

~~這網站有些地方應該有bug，不過沒有很明顯的話我就懶得管了...~~

~~然後我又因為太懶，文章還會直接把明後天的份都上傳，畢竟hexo沒有很方面的排程發佈，所以就一次性丟上去啦，更新的頻率也是看心情。~~

找到了一份~~軟體工程師~~碼農的工作，不過也正因為如此，已經更懶得更新這個部落格了

畢竟...

嗯...

我真正想做的事情是其他方面的，雖然這個網站也沒甚麼明確的主題走向

還會有這個部落格到底再貼甚麼

我真正想幹的事情會有版權的問題，而且八成也不會放上公網....

也還不知道要如何實作以及真的很懶

因為有這個時間我不如去看動畫！



我是滿重視法律問題的，所以沒有明確說可以轉載的就直接貼網址而已

當然，若我的文章有侵權問題請聯繫我

話說，本人U2可發邀，有興趣經營的也歡迎聯絡我，其實只要能維持不被砍帳的程度就行了......

Gmail:<tsuiokuyo@gmail.com>
