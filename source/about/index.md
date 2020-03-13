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

Gmail:<mailto:tsuiokuyo@gmail.com>

<!--
  <div id="vueAnime">
  <div class="row">
      <div class="col-md-12">
        <template>
          <el-table :data="anime" stripe border height="250" style="width: 100%" @header-click="selectType">

            <el-table-column fixed prop="id" label="譯名" sortable>
            </el-table-column>

            <el-table-column prop="cover" label="IMDB">
              <template slot-scope="scope">
                <el-popover placement="right" title="" trigger="hover">
                  <img lazy :src="scope.row.data.cover">
                  <img slot="reference" :src="scope.row.data.cover" :alt="scope.row.data.cover" style="max-height: 100px;max-width: 150px">
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="nameJ" label="原文名">
            </el-table-column>

            <el-table-column prop="data.firstRank" label="前期感覺" sortable>
              <template slot-scope="scope">
                <el-rate v-model="scope.row.data.firstRank" disabled :max=6>
                </el-rate>
              </template>
            </el-table-column>

            <el-table-column prop="data.rank" label="喜愛程度" sortable>
              <template slot-scope="scope">
                <el-rate v-model="scope.row.data.rank" disabled :max=6>
                </el-rate>
              </template>
            </el-table-column>

            <el-table-column label="類型" :filters="select" :filter-method="filterTag">
              <template slot-scope="scope">
                <el-tag v-for="item in scope.row.data.type" :key="item" :type="item" effect="plain">
                  {{ item}}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="data.episode" label="集數">
            </el-table-column>

            <el-table-column prop="data.memo" label="備註">
            </el-table-column>

          </el-table>
        </template>
      </div>
    </div>
  </div>
    <script>
    ELEMENT.locale(ELEMENT.lang.zhTW);
    </script>
    <script src="https://www.gstatic.com/firebasejs/7.9.1/firebase.js"></script>
     <script src="https://www.gstatic.com/firebasejs/7.9.1/firebase-analytics.js"></script>
     <script>
         function getData() {
      // Your web app's Firebase configuration
      let firebaseConfig = {
        apiKey: "AIzaSyC5veCoPDfBM7Vj4WOfI-xN0lLwiZUK_yo",
        authDomain: "tsuiokuyo-8a31a.firebaseapp.com",
        databaseURL: "https://tsuiokuyo-8a31a.firebaseio.com",
        projectId: "tsuiokuyo-8a31a",
        storageBucket: "tsuiokuyo-8a31a.appspot.com",
        messagingSenderId: "546368251283",
        appId: "1:546368251283:web:23253f9e609b874d897466",
        measurementId: "G-DXFDWHTMQX"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
      let db = firebase.firestore();
      let ref = db.collection('動畫');
      let object = [];
      ref.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          object.push({
            id: doc.id,
            data: doc.data()
          })
        });
      });
      return object;
    }
     </script>
<script>
  let vueAnime = new Vue({
    el: "#vueAnime",
    data: {
      anime: [],
      selectData: [],
    },
    mounted: function() {
      //取得資料
      this.anime = getData();

    },
    methods: {
      //篩選
      filterTag(value, row) {
        var checkTag = row.data.type.some(function(item, index, array) {
          return item === value
        });
        return checkTag;
      },

      //篩選的選項
      selectType(column, event) {
        let vm = this;
        if (vm.selectData.length == 0) {
          let list = []
          vm.anime.forEach(element => element.data.type !== undefined ? element.data.type.forEach(item => list.push(item)) : console.log("空"));
          let result = Array.from(new Set(list));
          this.selectData = result.map(element => {
            return {
              text: element,
              value: element
            }
          })
        };// end if
      },
    }, //end methods
  }); //end vue
</script>
-->
