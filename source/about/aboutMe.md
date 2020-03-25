---
title: 還是關於我
date: 9999-99-99
---

  <!-- The core Firebase JS SDK is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/7.9.1/firebase.js"></script>

  <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
  <script src="https://www.gstatic.com/firebasejs/7.9.1/firebase-analytics.js"></script>

  <div id="app">
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
                  <img slot="reference" :src="scope.row.data.cover" :alt="scope.row.data.cover"
                    style="max-height: 100px;max-width: 150px">
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

            <el-table-column label="類型" :filters="selectData | selectType" :filter-method="filterTag">
              <template slot-scope="scope">
                <el-tag v-for="item in subString(scope.row.data.type)" :key="item" :type="item" effect="plain">
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
    <div class="row">
      <div class="col-md-12">
      <div class="input-group">
        帳：<input class="form-control" v-model="mynae" placeholder="號"> 密：<input class="form-control" v-model="mypws" placeholder="碼">
        <button class="btn btn btn-warning" @click="lgin()" type="button">登入</button>
        </div>
        <hr />
          <form>
          <div class="form-group">
            <H3>{{firebaseMsg}}</H3>
              <div class="input-group">
                 <span class="input-group-addon">名稱：</span>
                 <input class="form-control" v-model="id" placeholder=" id">
             </div>
              <div class="input-group">
            	<span class="input-group-addon">封面：</span>
            	 <input class="form-control" v-model="aniData.cover" placeholder="cover">
                       </div>
                   <div class="input-group">
                 <span class="input-group-addon">集數：</span>
                 <input class="form-control" v-model="aniData.episode" placeholder="episode">
             </div>
                           <div class="input-group">
                 <span class="input-group-addon">第一：</span>
                 <input class="form-control" v-model="aniData.firstRank" placeholder="firstRank">
             </div>
                           <div class="input-group">
                 <span class="input-group-addon">備註：</span>
                 <input class="form-control" v-model="aniData.memo" placeholder="memo">
             </div>
                           <div class="input-group">
                 <span class="input-group-addon">原名：</span>
                 <input class="form-control" v-model="aniData.name" placeholder="name">
             </div>
                           <div class="input-group">
                 <span class="input-group-addon">分數：</span>
                 <input class="form-control" v-model="aniData.rank" placeholder="rank">
             </div>
                          <div class="input-group">
                 <span class="input-group-addon">標籤：</span>
                 <input class="form-control" v-model="aniData.type" placeholder="type">
             </div>
            <button class="btn btn-success" @click="addAnime()" type="button">送出</button>
            <button class="btn btn-danger" @click="clean()" type="button">清除</button>
            <H3>{{firebaseMsg}}</H3>
            </div>
          </form>
      </div>
    </div>
  </div>

<script>
  let vue = new Vue({
    el: "#app",
    data: {
      anime: [],
      selectData: [],
      firebasecfg: {},
      firebasedb: {},
      firebaseref: {},
      firebaseMsg: '',
      id: '',
      aniData: {
        cover: '',
        episode: '',
        firstRank: 1,
        memo: '',
        name: '',
        rank: 1,
        type: '',
      },
      mynae:'',
      mypws:'',
    },
    mounted: function () {
      //取得資料
      this.anime = this.setData();
    },
    watch:{
    	firebaseMsg: function(value)
    {
    		if(value == ''){
    			this.$message('清除成功');
    		}else{
    			this.$message('新增成功');
    		}
    }},
    methods: {
      //登入
      lgin(){
        firebase.auth().signInWithEmailAndPassword(this.mynae + '@gmail.com', this.mypws);
      },
      //清除
      clean() {
        this.id = '';
        this.aniData.cover = '';
        this.aniData.episode = '';
        this.aniData.firstRank = 1;
        this.aniData.memo = '';
        this.aniData.name = '';
        this.aniData.rank = 1;
        this.aniData.type = '';
        this.firebaseMsg = '';
      },

      //產生標籤
      subString(tag) {
        if (tag != undefined && tag != null) {
          return tag.split(',');
        }
      },
      //取得資料
      setData() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
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

        var db = firebase.firestore();
        var ref = db.collection('動畫');
        var object = [];
        ref.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            object.push({
              id: doc.id,
              data: doc.data()
            })
          });
        });

        this.firebasecfg = firebaseConfig;
        this.firebasedb = db;
        this.firebaseref = ref;


        return object;
      },
      //篩選
      filterTag(value, row) {
        let result = Array.from(new Set(this.subString(row.data.type)));
        var checkTag = result.some(function (item, index, array) {
          return item === value
        });
        return checkTag;
      },
      //篩選的選項
      selectType(column, event) {
        let vm = this;
        if (vm.selectData.length == 0) {
          let list = []
          vm.anime.forEach(element => element.data.type == undefined ? console.log("空") : this.subString(element.data.type).forEach(item => list.push(item)));
          let result = Array.from(new Set(list));
          this.selectData = result.map(element => {
            return {
              text: element,
              value: element
            }
          })
        };// end if
      },
      //新增資料
      addAnime() {
        let ref = this.firebasedb.collection('動畫').doc(this.id);
        ref.set(
          this.aniData
          , { merge: true }).then(() => {
            this.firebaseMsg = '成功'
          }).catch(function (error) {
            this.firebaseMsg = '失敗'
          });
      },
    }, //end methods
  }); //end vue
</script>
