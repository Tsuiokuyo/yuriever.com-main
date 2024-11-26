// 麵條式代碼，其實我也很無奈，功能不小心越玩越多
// Vue.config.devtools = true;
// import { genreMap } from './genreMap.js';
// import { simp, trad } from './simpAndTrad.js';


// let OriginTitile = document.title;
// let titleTime;
// document.addEventListener("visibilitychange", function() {
//     if (document.hidden) {
//         document.title = "ლ(´•д• ̀ლ" + " - " + OriginTitile;
//         clearTimeout(titleTime);
//     } else {
//         document.title = "( •́ _ •̀)？" + " - " + OriginTitile;
//         titleTime = setTimeout(function() {
//             document.title = OriginTitile;
//         }, 1500);
//     }
// });


let vue = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    components: {
        rating: {
            props: ['item', 'website', 'bScore'],
            template: `<div>
                                <v-chip :color="setChipColor(bScore,website)" dark>
                                <span style="font-size:15px;" v-if="!!!bScore">不計分</span>
                                <span v-else>{{ Number(bScore).toFixed(2) }}<span v-if="website == 'annict' || website =='sakuhindb' || website =='trakt'" style="font-size:small;">*</span></span>
                                </v-chip>
                                <br />
                                <a v-if="item" class="original" @click="toAnime(website,item.id)"><br />
                                {{!!item.score ? item.score : 0 }}<br /> ({{!!item.votes? item.votes : 0 }})
                                </a>
                                </div>`,
            methods: {
                setChipColor(bScore, website) {
					if (website != 'annict' && website != 'sakuhindb' && website != 'trakt') {
						if (bScore >= 9) return 'green darken-1'          
						else if (bScore >= 8) return 'light-green darken-1' 
						else if (bScore >= 7) return 'lime darken-1'        
						else if (bScore >= 6) return 'amber darken-1'       
						else if (bScore >= 4) return 'orange darken-1'      
						else if (bScore > 0) return 'red darken-1'         
						else return 'grey darken-2'                          
					}

                },
                toAnime(page, id) {
                    const urlMap = {
                        'gamer': 'https://acg.gamer.com.tw/acgDetail.php?s=' + id,
                        'mal': 'https://myanimelist.net/anime/' + id,
                        'anidb': 'https://anidb.net/anime/' + id,
                        'bgm': 'https://bangumi.tv/subject/' + id,
                        'anikore': 'https://www.anikore.jp/anime/' + id,
                        'aniList': 'https://anilist.co/anime/' + id,
                        'animePlanetCom': 'https://anime-planet.com/anime/' + id,
                        'ann': 'https://www.animenewsnetwork.com/encyclopedia/anime.php?id=' + id,
                        'anisearch': 'https://www.anisearch.com/anime/' + id,
                        'kitsu': 'https://kitsu.app/anime/' + id,
                        'notifyMoe': 'https://notify.moe/anime/' + id,
                        'trakt': 'https://trakt.tv/shows/' + id,
                        'livechart': 'https://livechart.me/anime/' + id,
                        'sakuhindb': 'https://sakuhindb.com/janime/' + id,
                        'annict': 'https://annict.com/works/' + id,
                        'shikimori': 'https://shikimori.one/animes/' + id
                    };
                
                    const url = urlMap[page] || ''; // 如果找不到對應的 `page`，則返回空字符串
                    if (url) {
                        window.open(url);
                    }
                }
            }
        },
    },
    data: {
        rawData: [],
        updateDate:'',
        randomTen: [],
        toRandom: false,

        windowWidth: window.innerWidth,
        isLoading: true,
		loadingProgress: 0,
		currentLoaded :0,
		fileSize:0,
        panel: [3],
        hug: '',
        snackbarHug: true,
        saveMsg: { 'state': false, 'text': '' },

        page: 1,
        itemsPerPage: 15,
        itemsPerPages: [5, 15, 30, 50, 100],
        totalVis: 15,
        pageCount: 1,

        srhImage: '',
        srhImageUrl: '',
        srhImageRes: [],
        srhImgPre: '',
        srhImgSize: [
            value => !value || value.size < 26214400 || '圖片大小不可超過25MB!'
        ],

        inputErr: '',
        search: '',
        preSearch:'',
        queryBtn : false,
        year: '',
        year2: '',
        rank1: '',
        rank2: '',
        diff: '',
        selYear: '等於',
        selType: 'ALL',
        selSource: 'ALL',
        sortDesc: false,
        sortBy: 'rank',
        sorts: [{ 'name': '加權評分', 'value': 'rank' },
		{ 'name': '巴哈姆特', 'value': 'gamer' }, { 'name': 'MyAnimeList', 'value': 'mal' },
           { 'name': 'Bangumi', 'value': 'bgm' }, { 'name': 'anikore', 'value': 'anikore' },
           { 'name': 'anidb', 'value': 'anidb' }
           , { 'name': 'aniList', 'value': 'aniList' }, { 'name': 'animePlanetCom', 'value': 'animePlanetCom' }
           , { 'name': 'AnimeNewsNetwork', 'value': 'ann' }, { 'name': 'anisearch', 'value': 'anisearch' }
           , { 'name': 'kitsu', 'value': 'kitsu' }, { 'name': 'notifyMoe', 'value': 'notifyMoe' }
           , { 'name': 'livechart', 'value': 'livechart' }
        ],

        selectedImage: false,
        tab: '',
        selectYears: ['等於', '大於', '小於', '介於'],

        selectTypes: [{ value: 'ALL', cht: '全部' }, { value: 'TV', cht: '電視' }, { value: 'MOVIE', cht: '劇場版' }, { value: 'OVA', cht: 'OVA' }, { value: 'ONA', cht: 'ONA' }],
        selectSources: [{ value: 'ALL', cht: '全部' }, { value: 'Original', cht: '原創' }, { value: 'Light novel', cht: '輕小說' },
            { value: 'Visual novel', cht: '電子小說' }, { value: 'Manga', cht: '漫畫' }, { value: 'Mixed media', cht: '跨媒體製作' },
            { value: '4-koma manga', cht: '四格漫畫' }, { value: 'Game', cht: '遊戲' }, { value: 'Card game', cht: '卡牌遊戲' },
            { value: 'Radio', cht: '廣播劇' }, { value: 'Music', cht: '音樂' }, { value: 'Web manga', cht: '網路漫畫' },
            { value: 'Novel', cht: '小說' }, { value: 'Book', cht: '書籍' },
            { value: 'Picture book', cht: '繪本' }
        ],

        ratingSites: [
            { key: 'gamer', name: 'gamer', image: 'gamer' },
            { key: 'mal', name: 'mal', image: 'mal' },
            { key: 'bgm', name: 'bgm', image: 'bgm' },
            { key: 'shikimori', name: 'shikimori', image: 'shikimori' },
            { key: 'aniList', name: 'aniList', image: 'anilist' },
            { key: 'anidb', name: 'anidb', image: 'anidb' },
            { key: 'anisearch', name: 'anisearch', image: 'anisearch' },
            { key: 'kitsu', name: 'kitsu', image: 'kitsu' },
            { key: 'animePlanetCom', name: 'apc', image: 'apc' },
            { key: 'livechart', name: 'livechart', image: 'livechart' },
            { key: 'ann', name: 'ann', image: 'ann' },
            { key: 'anikore', name: 'anikore', image: 'anikore' },
            { key: 'notifyMoe', name: 'notifymoe', image: 'notifymoe' },
            { key: 'annict', name: 'annict', image: 'annict' },
            { key: 'sakuhindb', name: 'sakuhindb', image: 'sakuhindb' },
          ],


        // count: undefined,
        overlay: false,
        leimuUrl: 'image/leimuA.webp',
        lamuUrl: 'image/lamuA.webp',
        destroy: true,
        disabledBgImage: false,
        dialogYt: {},
		dialogSummary: {},
        genreList: [],
        genreSel: [],
        cmpList: [],
        cmpSel: [],
        badges: {},
        badgesDef: {},
        onlineWatchs: [],
        onlineWatchSel: [],

        moelong: {},
        gnn: {},
        disabledZero: false,
        disabledNSFW: true,

        voiceCount: 0,
        voiceOpen: false,
        selectedElement: null,
        selectedEvent: null,

        eventVoice: [],
        dialogCal: false,
        focus: '',
        memory: null,

        auth: null,
        providerGoogle: null,
        user: null,
        token: null,
        db: null,
        seenData: null,
        disableBtn: true,
    },
    computed: {
        listenChange() {
            const {
                search,
                queryBtn,
                year,
                selYear,
                selType,
                itemsPerPage,
                genreSel,
                selSource,
                disabledZero,
                disabledNSFW,
                onlineWatchSel,
                cmpSel
            } = this
            return {
                search,
                queryBtn,
                year,
                selYear,
                selType,
                itemsPerPage,
                genreSel,
                selSource,
                disabledZero,
                disabledNSFW,
                onlineWatchSel,
                cmpSel
            }
        },
        headers() {
            return [{
                    text: '封面',
                    value: 'cover',
                    align: 'center',
                    filterable: false,
                    width: '10%'
                }, {
                    text: '名稱',
                    align: 'center',
                    value: 'name',
                    width: '25%',
                    filter: (value, search, item) => {
                        if (!this.search) this.search = '';
                    
                        // 1. 檢查搜尋字串長度
                        if (this.search.length === 1) {
                            this.inputErr = '請至少輸入兩個字';
                            return false;
                        }
                        this.inputErr = '';
                    
                        // 2. 預先處理篩選條件，並使用高效返回以提高效能
                        if (this.disabledNSFW && item.mal.genres.includes('Hentai')) return false;
                        if (this.disabledZero && item.score === 0) return false;
                    
                        // 3. 檢查 sortBy 項目是否為零
                        if (this.sortBy !== 'rank' && (!item[this.sortBy] || item[this.sortBy].b_score <= 0.01)) return false;
                    
                        // 4. 檢查年份篩選條件
                        if (this.year && this.year > 1900) {
                            const premiered = parseInt(item.mal.premiered);
                            const year = parseInt(this.year);
                            const year2 = parseInt(this.year2 > 99 ? this.year2 : 9999);
                            let bYear = false;
                    
                            switch (this.selYear) {
                                case '等於':
                                    bYear = premiered === year;
                                    break;
                                case '大於':
                                    bYear = premiered >= year;
                                    break;
                                case '小於':
                                    bYear = premiered <= year;
                                    break;
                                case '介於':
                                    bYear = premiered >= year && premiered <= year2;
                                    break;
                            }
                            if (!bYear) return false;
                        }
                    
                        // 5. 檢查排名篩選
                        const rank = parseInt(item.rank);
                        if ((this.rank1 && rank < parseInt(this.rank1)) || (this.rank2 && rank > parseInt(this.rank2))) return false;
                    
                        // 6. 差異篩選條件
                        if (this.diff) {
                            let difference = true
                            if (item.gamer && item.gamer.b_score > 0) {
                                function comput(a, b, range) {
                                    if (b == null) return false;
                                    b = b.b_score > 0 ? b.b_score : false
                                    return Math.abs(parseFloat(a) - parseFloat(b)) >= parseFloat(range)
                                }
                                let gScore = item.gamer.b_score
                                difference = Math.abs(parseFloat(gScore) - parseFloat(item.mal.b_score > 0 ? item.mal.b_score : false)) >= parseFloat(this.diff) ||
                                    comput(gScore, item.bgm, this.diff) ||
                                    comput(gScore, item.anikore, this.diff) ||
                                    comput(gScore, item.aniList, this.diff) ||
                                    comput(gScore, item.animePlanetCom, this.diff) ||
                                    comput(gScore, item.ann, this.diff) ||
                                    comput(gScore, item.anisearch, this.diff) ||
                                    comput(gScore, item.notifyMoe, this.diff) ||
                                    // comput(gScore, item.trakt, this.diff) ||
                                    comput(gScore, item.livechart, this.diff)
                            } else {
                                return false;
                            }
                            if (!difference) {
                                return false;
                            }
                        }
                    
                        // 7. 篩選 source 和 type 條件
                        if (this.selSource !== 'ALL' && item.mal.source !== this.selSource) return false;
                        if (this.selType !== 'ALL' && item.mal.type.toUpperCase() !== this.selType.toUpperCase()) return false;
                    
                        // 8. 在線觀看條件
                        if (this.onlineWatchSel.length && !this.onlineWatchSel.some(key => item.online[key])) return false;
                    
                        // 9. 檢查所選 genre
                        if (this.genreSel.some(gen => !item.mal.genres.includes(gen))) return false;
                    
                        // 10. 檢查所選公司 (studios)
                        if (this.cmpSel.length && !this.cmpSel.some(cmp => item.mal.studios.includes(cmp))) return false;
                    
                        // 11. 搜尋條件
                        if (this.search.trim()) {
                            const searchValue = this.search.trim().toUpperCase();
                        
                            // 判斷是否包含中文字元
                            const isChinese = /[\u4e00-\u9fa5]/.test(searchValue);
                        
                            let simpSearch = "";
                            let tradSearch = "";
                        
                            if (isChinese) {
                                simpSearch = simp(searchValue);
                                tradSearch = trad(searchValue);
                            }
                        
                            const nameMatch = [
                                item.mal?.en_name, item.mal?.jp_name, item.bgm?.cn_name,
                                item.gamer?.title, ...(item.bgm?.alias || [])
                            ].some(name => 
                                name && (
                                    name.toUpperCase().includes(searchValue) ||
                                    (isChinese && (name.includes(simpSearch) || name.includes(tradSearch)))
                                )
                            );
                        
                            if (!nameMatch) return false;
                        }
                        
                        return true;
                    },
                    
                },
                {
                    text: 'Bayesian加權分數',
                    align: 'center',
                    value: 'score',
                    filterable: false,
                    width: '8%'
                },
                {
                    text: '巴哈姆特評分',
                    value: 'gamer',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'MyAnimeList評分',
                    value: 'mal',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'bangumi評分',
                    value: 'bgm',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'anikore評分',
                    value: 'anikore',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'aniList評分',
                    value: 'anilist',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'animePlanetCom評分',
                    value: 'animeplanetcom',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'AnimeNewsNetwork評分',
                    value: 'ann',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'anisearch評分',
                    value: 'anisearch',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'kitsu評分',
                    value: 'kitsu',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'notifyMoe評分',
                    value: 'notifymoe',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'livechart評分',
                    value: 'livechart',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'anidb評分',
                    value: 'anidb',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'shikimori評分',
                    value: 'shikimori',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'annict評分*',
                    value: 'annict',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'sakuhindb評分*',
                    value: 'sakuhindb',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
            ]
        },
    },
    filters: {
        seasonCht(sen) {
            switch (sen.toLowerCase()) {
                case 'spring':
                    return '春';
                case 'summer':
                    return '夏';
                case 'fall':
                case 'autumn':
                    return '秋';
                case 'winter':
                    return '冬';
                default:
                    return sen
            }
        },
        sourceToCht(src) {
            const mapping = {
                '4-koma manga': '四格漫畫',
                'Book': '書籍',
                'Card game': '卡牌遊戲',
                'Game': '遊戲',
                'Light novel': '輕小說',
                'Manga': '漫畫',
                'Mixed media': '跨媒體製作',
                'Music': '音樂',
                'Novel': '小說',
                'Original': '原創',
                'Picture book': '繪本',
                'Radio': '廣播',
                'Other': '未知',
                'undefined': '未知',
                'Unknown': '未知',
                'Visual novel': '電子小說',
                'Web manga': '網路漫畫'
            };
        
            return mapping[src] || src; 
        },
        genreToCht(gen) {
            return genreMap.get(gen)?.name || gen;  // 返回中文名稱
          },
        returnZero(score) {
            return score != 0 ? score : '不計分'
        }
    },
    watch: {
        queryBtn(){
            if(this.queryBtn){
                this.search = this.preSearch;
            }
        },
        preSearch(){
            if(this.queryBtn){
                this.queryBtn = false;
            }else if (this.preSearch == null || this.preSearch.length === 0) {
                this.search = '';
            }
        },
        toRandom() {
            this.rawToRandom(this.toRandom)
        },
        listenChange() {
            this.badges = {}; 
            let filters = this.$refs.tb.$children[0].filteredItems;  
            for (let item of filters) { 
                for (let gen of item.mal.genres) { 
                    if (this.disabledZero) {
                        if (item.score > 0) {
                            if (this.disabledNSFW) {
                                if (!item.mal.genres.includes('Hentai')) {
                                    this.badges[gen] = ++this.badges[gen] || 1;
                                }
                            } else {
                                this.badges[gen] = ++this.badges[gen] || 1;
                            }
                        }
                    } else {
                        if (this.disabledNSFW) {
                            if (!item.mal.genres.includes('Hentai')) {
                                this.badges[gen] = ++this.badges[gen] || 1;
                            }
                        } else {
                            this.badges[gen] = ++this.badges[gen] || 1;
                        }
                    }
                }
            }
            this.destroyTable();  // 呼叫 destroyTable 方法
        }
        
    },
    async created() {
        // 初始化圖片和數據加載
        if (this.windowWidth >= 600) {
            await this.fetchHugImage();
        }
        await this.loadCompressedData();
        this.isLoading = null; 
        await this.loadRSSData();
    
        this.$nextTick(() => {
            // this.panel.push(3);
            this.initializeData();
            this.parseURLParams();
            this.randomizeData();
            this.detectBrowser();
            
        });
    },
    async mounted() {

    }, //mounted
    updated() {},
    methods: {
        async fetchHugImage() {
            try {
                const response = await fetch('https://api.waifu.pics/sfw/hug');
                const data = await response.json();
                this.hug = data.url;
            } catch (error) {
                console.error("Error fetching hug image:", error);
            }
        },
    
        async loadCompressedData() {
            // try {
            //     const response = await fetch('https://raw.githubusercontent.com/Tsuiokuyo/animeListTW/refs/heads/master/test2min.msgpack.zst');
            //     const reader = response.body.getReader();
            //     const contentLength = +response.headers.get('Content-Length');
            //     let loaded = 0;
            //     const chunks = [];

            //     if (contentLength) {
            //         this.loadingProgress = 0;
            //         this.fileSize = (contentLength / (1024 * 1024)).toFixed(2) + ' MB'; // 顯示文件大小
            //     }
    
            //     while (true) {
            //         const { done, value } = await reader.read();
            //         if (done) break;
            //         chunks.push(value);
            //         loaded += value.length;
            //         if (contentLength) {
            //             this.loadingProgress = Math.min((loaded / contentLength * 99).toFixed(2), 99);
            //             this.currentLoaded = (loaded / (1024 * 1024)).toFixed(2);
            //         }
            //     }
    
            //     const zippedContent = new Uint8Array(chunks.reduce((acc, val) => acc.concat(Array.from(val)), []));
            //     const decompressed = fzstd.decompress(zippedContent);
            //     this.rawData = msgpack.decode(decompressed);
            //     this.fileSize = contentLength ? (contentLength / (1024 * 1024)).toFixed(2) : (zippedContent.length / (1024 * 1024)).toFixed(2);
    
            // } catch (error) {
            //     console.error("Error loading compressed data:", error);
            // }
                try {
                    this.rawData = []; // 初始化資料容器
                    this.loadingProgress = 0;
                    this.fileSize = '0 MB';
                    const totalChunks = 5;
                    
                    // 依次讀取 5 個 chunk
                    for (let i = 1; i <= totalChunks; i++) {
                        const chunkUrl = `https://raw.githubusercontent.com/Tsuiokuyo/animeListTW/refs/heads/master/chunk_${i}.msgpack.zst`;
                        
                        const response = await fetch(chunkUrl);
                        if (!response.ok) {
                            console.error(`Failed to load chunk ${i}:`, response.statusText);
                            continue; // 如果某一塊失敗，繼續處理下一塊
                        }
                        
                        const reader = response.body.getReader();
                        const contentLength = +response.headers.get('Content-Length');
                        let loaded = 0;
                        const chunks = [];
            
                        if (contentLength) {
                            this.fileSize = (contentLength / (1024 * 1024)).toFixed(2) + ' MB';
                        }
                        
                        while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;
                            chunks.push(value);
                            loaded += value.length;
                            if (contentLength) {
                                // 針對單一 chunk 的讀取進度
                                const chunkProgress = (loaded / contentLength) * 100;
                                this.loadingProgress = Math.min(((i - 1) / totalChunks * 100) + (chunkProgress / totalChunks), 99).toFixed(2);
                                this.currentLoaded = (loaded / (1024 * 1024)).toFixed(2);
                            }
                        }
            
                        const zippedContent = new Uint8Array(chunks.reduce((acc, val) => acc.concat(Array.from(val)), []));
                        const decompressed = fzstd.decompress(zippedContent);
                        const decodedData = msgpack.decode(decompressed);
            
                        if (i === 1) {
                            // 如果是第一個 chunk，提取更新時間並保存
                            const updateDate = decodedData.date;
                            this.updateDate = `${updateDate.slice(0, 4)}年${updateDate.slice(4, 6)}月${updateDate.slice(6, 8)}日`;
                            this.rawData = this.rawData.concat(decodedData.data);
                        } else {
                            // 如果不是第一個 chunk，直接追加資料
                            this.rawData = this.rawData.concat(decodedData);
                        }
                        
                        // 更新總進度（每次讀取一個 chunk 就更新 10%）
                        this.loadingProgress = ((i / totalChunks) * 100).toFixed(2);
                        
                        // console.log(`Chunk ${i} loaded and processed.`);
                        // if(i == 1){
                        //     this.injectStructuredData();
                        // }
                    }
                    
                    // console.log("所有資料已讀取完成");
                    this.loadingProgress = 100; // 讀取完成
                } catch (error) {
                    console.error("Error loading compressed data:", error);
                } finally {
                    this.isLoading = false;
                }
            
        },
    
        async loadRSSData() {
            const urls = [
                { name: 'moelong', url: 'https://raw.githubusercontent.com/Tsuiokuyo/animeListTW/refs/heads/master/rss_data/moelong.json' },
                { name: 'gnn', url: 'https://raw.githubusercontent.com/Tsuiokuyo/animeListTW/refs/heads/master/rss_data/gnn.json' }
            ];
            
            for (const { name, url } of urls) {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    this.setNewsData(name, data);
                } catch (error) {
                    console.error(`Error loading RSS data for ${name}:`, error);
                    this[name] = { title: `${name.toUpperCase()} RSS 撈取失敗。` };
                }
            }
        },
    
        setNewsData(name, data) {
            const items = data.rss.channel.item;
            const newsList = items.map(el => {
                const date = new Date(el.pubDate._text);
                return {
                    title: name === 'moelong' ? el.title._text : el.title._cdata,
                    link: name === 'moelong' ? el.link._text : el.link._cdata,
                    date: `(${date.getFullYear()}${date.getMonth() + 1}${date.getDate()})`
                };
            });
    
            if (newsList.length) {
                this[name] = newsList[0];
                const intervalId = setInterval(() => {
                    this[name] = newsList[Math.floor(Math.random() * newsList.length)];
                }, 6000);
    
                setTimeout(() => {
                    clearInterval(intervalId);
                    this[name] = { title: '在此網站待了10分鐘以上，已停止RSS。' };
                }, 600000);
            }
        },
    
        initializeData() {
            this.getRandomArray();
            let { onlines, studios, genres, births } = this.processRawData();
            
            // 去重
            const set = new Set();
            const uniqueBirths = [];
            births.forEach(item => {
                if (!set.has(item.voice)) {
                    set.add(item.voice);
                    uniqueBirths.push(item);  
                }
            });
            this.voiceCount = uniqueBirths.length; 
        

            let events = [];
            let now = new Date();
            uniqueBirths.forEach(item => {
                if (item.birth != null) {
                    let bir = new Date(item.birth);
                    let todayBir = (now.getMonth() === bir.getMonth() && now.getDate() === bir.getDate());
                    bir = `${now.getFullYear()}-${bir.getMonth() + 1}-${bir.getDate()}`;
                    events.push({
                        name: item.name,
                        start: bir,
                        voice: item.voice,
                        isMain: item.isMain,
                        isSup: item.isSup,
                        chId: item.chId,
                        voiceImg : item.voiceImg,
						charEngName: item.charEngName,
                        color: this.setVoiceColor(item.isMain, item.isSup, todayBir),
                    });
                }
            });
        
            events.sort((a, b) => b.isMain - a.isMain);
            this.eventVoice = events;
        
            this.badgesDef = this.badges;
            genres = [...new Set(genres.sort())];
            this.genreList = genres;

            this.cmpList = this.processStudios(studios);
            this.onlineWatchs = [...new Set(onlines.sort())];

        },
    
        processRawData() {
            const onlines = [];
            const studios = [];
            const genres = [];
            const births = [];
            
            for (const item of this.rawData) {
                this.initializeItem(item);
                // if (this.disabledNSFW && item.mal.genres.includes('Hentai')) continue;
                
                this.collectGenres(item, genres);
                this.collectOnlineStudios(item, onlines, studios);
                this.collectBirths(item, births);  
            }
        
            return { onlines, studios, genres, births };
        },
    
        initializeItem(item) {
            item.myRank = '0';
            item.memo = '';
            item.seen = false;
            if (item.mal.type === "Movie" && item.mal.duration < 3) item.mal.duration *= 60;
            if ('duration' in item.mal && item.mal.duration < 16 && item.mal.type !== "Movie") this.assignCupGenre(item);
        },
    
        collectGenres(item, genres) {
            item.mal.genres.forEach(gen => {
                if ((this.disabledZero && item.score > 0) || !this.disabledZero) {
                    if (!this.disabledNSFW || !item.mal.genres.includes('Hentai')) {
                        this.badges[gen] = ++this.badges[gen] || 1;
                    }
                }
            });
            genres.push(...item.mal.genres);
        },
    
        collectOnlineStudios(item, onlines, studios) {
            onlines.push(...Object.keys(item.online));
            studios.push(...Object.values(item.mal.studios));
        },
    
        collectBirths(item, births) {
            if ('voices' in item.mal && item.mal.voices.length) {
                births.push(...item.mal.voices); 
            }
        },

        assignCupGenre(item) {
            item.mal.genres.push('cup');
            this.badges['cup'] = ++this.badges['cup'] || 1;
        },
    
        processStudios(studios) {
            const studiosMap = new Map();
            studios.forEach(studio => studiosMap.set(studio, (studiosMap.get(studio) || 0) + 1));
            const sortedStudios = [...studiosMap.entries()].sort((a, b) => b[1] - a[1]);
            return sortedStudios.slice(0, 50).map(entry => entry[0]);
        },
    
        getEventVoices(births) {
            const events = [];
            const now = new Date();
            const uniqueBirths = [...new Set(births.map(item => item.voice))];
    
            uniqueBirths.forEach(item => {
                if (item.birth) {
                    const birDate = new Date(item.birth);
                    const formattedBirth = `${now.getFullYear()}-${birDate.getMonth() + 1}-${birDate.getDate()}`;
                    events.push({
                        name: item.name,
                        start: formattedBirth,
                        voice: item.voice,
                        isMain: item.isMain,
                        isSup: item.isSup,
                        chId: item.chId,
                        color: this.setVoiceColor(item.isMain, item.isSup, birDate.getMonth() === now.getMonth() && birDate.getDate() === now.getDate())
                    });
                }
            });
    
            return events.sort((a, b) => b.isMain - a.isMain);
        },
    
        parseURLParams() {
            const urlParams = new URLSearchParams(window.location.search);
            this.preSearch = urlParams.get('name') || '';
            this.year = urlParams.get('year') || '';
        },
    
        randomizeData() {
            if (this.toRandom) this.rawData.sort(() => 0.5 - Math.random());
        },
    
        detectBrowser() {
            if (navigator.userAgent.includes("Chrome") || navigator.userAgent.includes("Opera")) {
                this.memory = 0;
            }
        },
        clearSearch () {
            this.search = '';
            this.queryBtn = false;
        },

        setRankColor(i) {
            const pitch = 255 - (255 / this.rawData.length * i);
            return `color: rgb(255, ${pitch}, 0);`;
        },
        
        setSimilarityColor(i) {
            return `color: ${parseFloat(i) > 0.9 ? 'red' : parseFloat(i) > 0.8 ? 'orange' : 'black'}`;
        },
        setCover(item, lazy) {
            // let cdn2 = 'https://wsrv.nl/?url=' //&output=webp&q=54
            if (lazy) {
                // if (item.bgm && item.bgm.image) {
                //     return cdn2 + "https://lain.bgm.tv/pic/cover/g/" + item.bgm.image + ".jpg" + "&output=webp&q=80"
                // } else {
                    return "https://cdn.myanimelist.net/images/anime/" + item.mal.image.replace('.webp', '').replace('.jpg', '') + 't.webp'
                // }
            } else {
                // if (item.bgm && item.bgm.image) {
                //     return cdn2 + "https://lain.bgm.tv/pic/cover/c/" + item.bgm.image + ".jpg" + "&output=webp&q=80"
                // } else { //FIXME 下一輪
                //     if (item.mal.image.length > 50) {
                //         return item.mal.image
                //     }
                    return "https://cdn.myanimelist.net/images/anime/" + item.mal.image.replace('.webp', '').replace('.jpg', '') + '.webp'
                // }
            }
        },
        toggleFullscreen(item) {
            this.selectedImage = `https://cdn.myanimelist.net/images/anime/${item.mal.image.replace('.webp', '')}l.webp`;
        },
        customSort(items, index, isDescending) {
            if (this.toRandom) {
                this.destroyTable()
            } else {
                if (!!!index) {
                    index[0] = this.sortBy
                }
                this.destroyTable()
                items.sort((a, b) => {
                    switch (index[0]) {
                        case 'rank':
                            if (isDescending[0]) {
                                return b.rank > a.rank ? 1 : -1;
                            } else {
                                return a.rank > b.rank ? 1 : -1;
                            }
                        // case 'score':
                        //     if (isDescending[0]) {
                        //         return b.score > a.score ? 1 : -1;
                        //     } else {
                        //         return a.score > b.score ? 1 : -1;
                        //     }
                        case 'mal':
                            if (!isDescending[0]) {
                                return b.mal.b_score > a.mal.b_score ? 1 : -1;
                            } else {
                                return a.mal.b_score > b.mal.b_score ? 1 : -1;
                            }
                        case 'gamer':
                            b = !!b.gamer ? b.gamer.b_score : 0;
                            a = !!a.gamer ? a.gamer.b_score : 0;
                            if (!isDescending[0]) {
                                return b > a ? 1 : -1
                            } else {
                                return a > b ? 1 : -1
                            }
                        case 'anidb':
                            b = !!b.anidb ? b.anidb.b_score : 0;
                            a = !!a.anidb ? a.anidb.b_score : 0;
                            if (!isDescending[0]) {
                                return b > a ? 1 : -1
                            } else {
                                return a > b ? 1 : -1
                            }
                        case 'bgm':
                            b = !!b.bgm ? b.bgm.b_score : 0;
                            a = !!a.bgm ? a.bgm.b_score : 0;
                            if (!isDescending[0]) {
                                return b > a ? 1 : -1
                            } else {
                                return a > b ? 1 : -1
                            }
                        case 'anikore':
                            b = !!b.anikore ? b.anikore.b_score : 0;
                            a = !!a.anikore ? a.anikore.b_score : 0;
                            if (!isDescending[0]) {
                                return b > a ? 1 : -1
                            } else {
                                return a > b ? 1 : -1
                            }
                        case 'anisearch':
                            b = !!b.anisearch ? b.anisearch.b_score : 0;
                            a = !!a.anisearch ? a.anisearch.b_score : 0;
                            if (!isDescending[0]) {
                                return b > a ? 1 : -1
                            } else {
                                return a > b ? 1 : -1
                            }
                        case 'aniList':
                            b = !!b.aniList ? b.aniList.b_score : 0;
                            a = !!a.aniList ? a.aniList.b_score : 0;
                            if (!isDescending[0]) {
                                return b > a ? 1 : -1
                            } else {
                                return a > b ? 1 : -1
                            }
                        case 'animePlanetCom':
                            b = !!b.animePlanetCom ? b.animePlanetCom.b_score : 0;
                            a = !!a.animePlanetCom ? a.animePlanetCom.b_score : 0;
                            if (!isDescending[0]) {
                                return b > a ? 1 : -1
                            } else {
                                return a > b ? 1 : -1
                            }
                        case 'ann':
                            b = !!b.ann ? b.ann.b_score : 0;
                            a = !!a.ann ? a.ann.b_score : 0;
                            if (!isDescending[0]) {
                                return b > a ? 1 : -1
                            } else {
                                return a > b ? 1 : -1
                            }
                        case 'kitsu':
                            b = !!b.kitsu ? b.kitsu.b_score : 0;
                            a = !!a.kitsu ? a.kitsu.b_score : 0;
                            if (!isDescending[0]) {
                                return b > a ? 1 : -1
                            } else {
                                return a > b ? 1 : -1
                            }
                        case 'notifyMoe':
                            b = !!b.notifyMoe ? b.notifyMoe.b_score : 0;
                            a = !!a.notifyMoe ? a.notifyMoe.b_score : 0;
                            if (!isDescending[0]) {
                                return b > a ? 1 : -1
                            } else {
                                return a > b ? 1 : -1
                            }
                        // case 'trakt':
                        //     b = !!b.trakt ? b.trakt.b_score : 0;
                        //     a = !!a.trakt ? a.trakt.b_score : 0;
                        //     if (!isDescending[0]) {
                        //         return b > a ? 1 : -1
                        //     } else {
                        //         return a > b ? 1 : -1
                        //     }
                        case 'livechart':
                            b = !!b.livechart ? b.livechart.b_score : 0;
                            a = !!a.livechart ? a.livechart.b_score : 0;
                            if (!isDescending[0]) {
                                return b > a ? 1 : -1
                            } else {
                                return a > b ? 1 : -1
                            }
                        case 'sakuhindb':
                            b = !!b.sakuhindb ? b.sakuhindb.b_score : 0;
                            a = !!a.sakuhindb ? a.sakuhindb.b_score : 0;
                            if (!isDescending[0]) {
                                return b > a ? 1 : -1
                            } else {
                                return a > b ? 1 : -1
                            }
                    }
                });
            }
            return items;
        },
        getRandomArray() {
            function shuffleArray(arr) {
                let shuffled = arr.slice(); 
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                return shuffled;
            }
        
            const shuffled = shuffleArray(this.rawData).slice(-10);
            
            if (this.disabledNSFW && shuffled.some(item => item.mal.genres.includes('Hentai'))) {
                return this.getRandomArray();
            }
            
            this.randomTen = shuffled;
        },
        randomListTitle(item) {
            return item.gamer?.title || item.bgm?.cn_name || item.mal.jp_name || item.mal.title;
        },
        onlineList(item) {
            return Object.entries(item || {}).reduce((format, [key, value]) => {
                format[key] = this.addUrl(key, value);
                return format;
            }, {});
        },
        addUrl(key, id) {
           
            if (id.includes('watchnow')) {
                return 'https://trakt.tv' + id;
            }
        
            const urlMap = {
                'Amazon Prime Video': id.length > 50 ? id : 'https://www.primevideo.com/detail/' + id,
                '羚邦(Ani-One) YouTube': 'https://www.youtube.com/' + id,
                'AnimeLog Youtube': 'https://www.youtube.com/' + id,
                'GUNDAM.INFO Youtube': 'https://www.youtube.com/' + id,
                '木棉花(Muse) Youtube': 'https://www.youtube.com/' + id,
                '動畫瘋': 'https://ani.gamer.com.tw/animeVideo.php?sn=' + id,
                '中華電信MOD': 'https://mod.cht.com.tw/video/' + id,
                'CatchPlay+ TW': 'https://www.catchplay.com/' + id,
                'Disney+': 'https://www.disneyplus.com/' + id,
                'Google Play': 'https://play.google.com/store/' + id,
                'HamiVideo': 'https://hamivideo.hinet.net/' + id,
                'KKTV': 'https://www.kktv.me/' + id,
                'LINE TV Taiwan': 'https://www.linetv.tw/' + id,
                'LiTV立視': 'https://www.litv.tv/vod/' + id,
                'Netflix': 'https://www.netflix.com/' + id,
                'Yahoo! TV Taiwan': 'https://tw.tv.yahoo.com/' + id,
                'bilibili': 'https://www.bilibili.com/bangumi/' + id,
                'friDay影音': 'https://video.friday.tw/' + id,
                'iQIYI愛奇藝': 'https://www.iq.com/' + id,
                '愛奇藝': 'https://www.iq.com/' + id,
                'MyVideo': 'https://www.myvideo.net.tw/' + id,
            };
        
            if (urlMap[key]) {
                return urlMap[key];
            }
        
            return id;
            
            // if (id.indexOf('watchnow') != -1) {
            //     return 'https://trakt.tv' + id
            // }

            // switch (key) {
            //     case 'Amazon Prime Video':
            //         if (id.length > 50) { //FIXME
            //             return id;
            //         }
            //         return 'https://www.primevideo.com/detail/' + id
            //     case '羚邦(Ani-One) YouTube':
            //     case 'AnimeLog Youtube':
            //     case 'GUNDAM.INFO Youtube':
            //     case '木棉花(Muse) Youtube':
            //         return 'https://www.youtube.com/' + id
            //     case '動畫瘋':
            //         return 'https://ani.gamer.com.tw/animeVideo.php?sn=' + id
            //     case '中華電信MOD':
            //         return 'http://mod.cht.com.tw/video/' + id
            //     case 'CatchPlay+ TW':
            //         return 'https://www.catchplay.com/' + id
            //     case 'Disney+':
            //         return 'https://www.disneyplus.com/' + id
            //     case 'Google Play':
            //         return 'https://play.google.com/store/' + id
            //     case 'HamiVideo':
            //         return 'https://hamivideo.hinet.net/' + id
            //     case 'KKTV':
            //         return 'https://www.kktv.me/' + id
            //     case 'LINE TV Taiwan':
            //         return 'https://www.linetv.tw/' + id
            //     case 'LiTV立視':
            //         return 'https://www.litv.tv/vod/' + id
            //     case 'Netflix':
            //         return 'https://www.netflix.com/' + id
            //     case 'Yahoo! TV Taiwan':
            //         return 'https://tw.tv.yahoo.com/' + id
            //     case 'bilibili':
            //         return 'https://www.bilibili.com/bangumi/' + id
            //     case 'friDay影音':
            //         return 'https://video.friday.tw/' + id
            //             // case 'hmvod':
            //             //     return ''
            //     case 'iQIYI愛奇藝':
            //         return 'https://www.iq.com/' + id
            //     case '愛奇藝': //有些地方沒規範好，暫留
            //         return 'https://www.iq.com/' + id
            //             // case 'iTunes':
            //             //     return ''
            //     case 'MyVideo':
            //         return 'https://www.myvideo.net.tw/' + id
            //     default:
            //         return id
            // }
        },
        switchName(name, id) {
            name = name.toLowerCase();
            const platformMap = {
                'trakt.tv': [name, id],
                'bahamut': ['bahamut', 'https://ani.gamer.com.tw/animeVideo.php?sn=' + id],
                'bilibili': ['bilibili', 'https://www.bilibili.com/bangumi/' + id],
                'disney': ['disney', 'https://www.disneyplus.com/' + id],
                'friday': ['friday', 'https://video.friday.tw/' + id],
                'hamivideo': ['hamivideo', 'https://hamivideo.hinet.net/' + id],
                'kktv': ['kktv', 'https://www.kktv.me/' + id],
                'line': ['line', 'https://www.linetv.tw/' + id],
                'litv': ['litv', 'https://www.litv.tv/vod/' + id],
                'myvideo': ['myvideo', 'https://www.myvideo.net.tw/' + id],
                'netflix': ['netflix', 'https://www.netflix.com/' + id],
                'ani-one asia': ['ani-one asia', 'https://www.youtube.com/' + id],
                'yahoo': ['yahoo', 'https://tw.tv.yahoo.com/' + id],
                'catchplay': ['catchplay', 'https://www.catchplay.com/' + id],
                'cht': ['cht', 'https://mod.cht.com.tw/video/' + id],
                'iqiyi': ['iqiyi', 'https://www.iq.com/' + id],
                'muse': ['muse', 'https://www.youtube.com/' + id],
                'google': ['googleplay', 'https://play.google.com/store/' + id],
                'crunchyroll': ['crunchyroll', 'https://www.crunchyroll.com/' + id],
                'nhk world-japan on demand': ['NHK(英文)', id],
                'prime': ['Amazon Prime Video', 'https://www.primevideo.com/detail/' + id],
                'gundam.info': ['gundam.info', 'https://www.youtube.com/' + id],
                'animelog': ['AnimeLog', 'https://www.youtube.com/' + id]
            };
        
            for (const [key, value] of Object.entries(platformMap)) {
                if (name.includes(key)) {
                    return value;
                }
            }
            return [name, id];
        
            
            // name = name.toLowerCase()
            // if (id.indexOf('trakt.tv') != -1) {
            //     return [name, id]
            // } else if (name.indexOf('bahamut') != -1) {
            //     return ['bahamut', 'https://ani.gamer.com.tw/animeVideo.php?sn=' + id]
            // } else if (name.indexOf('bilibili') != -1) {
            //     return ['bilibili', 'https://www.bilibili.com/bangumi/' + id]
            // } else if (name.indexOf('disney') != -1) {
            //     return ['disney', 'https://www.disneyplus.com/' + id]
            // } else if (name.indexOf('friday') != -1) {
            //     return ['friday', 'https://video.friday.tw/' + id]
            // } else if (name.indexOf('hamivideo') != -1) {
            //     return ['hamivideo', 'https://hamivideo.hinet.net/' + id]
            // } else if (name.indexOf('kktv') != -1) {
            //     return ['kktv', 'https://www.kktv.me/' + id]
            // } else if (name.indexOf('line') != -1) {
            //     return ['line', 'https://www.linetv.tw/' + id]
            // } else if (name.indexOf('litv') != -1) {
            //     return ['litv', 'https://www.litv.tv/vod/' + id]
            // } else if (name.indexOf('myvideo') != -1) {
            //     return ['myvideo', 'https://www.myvideo.net.tw/' + id]
            // } else if (name.indexOf('netflix') != -1) {
            //     return ['netflix', 'https://www.netflix.com/' + id]
            // } else if (name.indexOf('ani-one asia') != -1) {
            //     return ['ani-one asia', 'https://www.youtube.com/' + id]
            // } else if (name.indexOf('yahoo') != -1) {
            //     return ['yahoo', 'https://tw.tv.yahoo.com/' + id]
            // } else if (name.indexOf('catchplay') != -1) {
            //     return ['catchplay', 'https://www.catchplay.com/' + id]
            // } else if (name.indexOf('cht') != -1) {
            //     return ['cht', 'http://mod.cht.com.tw/video/' + id]
            // } else if (name.indexOf('iqiyi') != -1) {
            //     return ['iqiyi', 'https://www.iq.com/' + id]
            // } else if (name.indexOf('muse') != -1) {
            //     return ['muse', 'https://www.youtube.com/' + id]
            // } else if (name.indexOf('google') != -1) {
            //     return ['googleplay', 'https://play.google.com/store/' + id]
            // } else if (name.indexOf('crunchyroll') != -1) {
            //     return ['crunchyroll', 'https://www.crunchyroll.com/' + id]
            // } else if (name.indexOf('nhk world-japan on demand') != -1) { //FixMe
            //     return ['NHK(英文)', id]
            // } else if (name.indexOf('prime') != -1) { //FixMe
            //     return ['Amazon Prime Video', 'https://www.primevideo.com/detail/' + id]
            // } else if (name.indexOf('gundam.info') != -1) {
            //     return ['gundam.info', 'https://www.youtube.com/' + id]
            // } else if (name.indexOf('animelog') != -1) {
            //     return ['AnimeLog', 'https://www.youtube.com/' + id]
            // }
            // return [name, id];
        },
        lamu(value) {
            if (value == 'A') {
                return 'image/lamuA.webp'
            } else {
                return 'image/lamuB.webp'
            }
        },
        leimu(value) {
            if (value == 'A') {
                return 'image/leimuA.webp'
            } else {
                return 'image/leimuB.webp'
            }
        },
        getBackground(item) {
            if (!this.disabledBgImage) {

                if (null != item.banner) {
                    if (item.banner.indexOf('kitsuQWQ') != -1) { //FIXME
						if (item.banner.indexOf('https://media.kitsu.app/anime/') === -1) {
							return 'https://media.kitsu.app/anime/' + item.banner.replace('kitsuQWQ', '');
						}else{
							return item.banner.replace('kitsuQWQ', '');
						}
                    } else if (item.banner.indexOf('anisearchQWQ') != -1) {
                        return 'https://cdn.anisearch.com/images/anime/header/' + item.banner.replace('anisearchQWQ', '') + '.webp';
                    } else if (item.banner.indexOf('traktQWQ') != -1) {
                        return 'https://walter.trakt.tv/images/shows/000/' + item.banner.replace('traktQWQ', '');
                    } else {
                        return 'https://' + item.banner;
                    }
                } else {
                    return 'image/noImage.webp'
                }
            }
            return 'image/noImage.webp'
        },
        
        setBackgroundLazy(entries, observer, isIntersecting) {
            let bg = 'image/background.webp'
            let cdn = 'https://tsuiokuyo-9688.imgix.net/'
            let cdn2 = 'https://wsrv.nl/?url=' //&output=webp&q=54

            let aniBg = entries[0].target.lastChild.innerText
            if (isIntersecting) {
                if (!!aniBg) {
                    // entries[0].target.attributes.style.value = 'background-image:url(' + bg + '),url(' + cdn + aniBg + ');background-blend-mode: luminosity;background-size:100% 100%;'
                    if (aniBg.indexOf("noImage.webp") == -1) {
                        entries[0].target.attributes.style.value = 'background-image:url(' + bg + '),url(' + cdn2 + aniBg + '&output=webp&q=54' + ');background-blend-mode: luminosity;background-size:100% 100%;'
                    } else {
                        entries[0].target.attributes.style.value = 'background-image:url(' + bg + '),url(' + aniBg + ');background-blend-mode: luminosity;background-size:100% 100%;'

                    }

                } else {
                    // entries[0].target.attributes.style.value = 'background-image:url(' + bg + ');background-size:cover;'
                    entries[0].target.attributes.style.value = 'background-image:url(' + bg + ');background-size:100% 100%;'
                }

                return entries
            } else {
                entries[0].target.attributes.style.value = 'background-image:url(' + bg + ');background-size:100% 100%;'
                return entries
            }
        },
        goToBlog() {
            window.open('https://yuriever.com/');
        },
        next() {
            this.destroyTable()
        },
        previous() {
            this.destroyTable()
        },
        destroyTable() {
            this.destroy = false
            this.$nextTick(function() {
                this.destroy = true
            })
        },
        setGenColor(gen) {
            let genre = genreMap.get(gen); 
            return genre ? genre.color : 'B'; 
          },
        getYoutube(id) {
            return 'https://www.youtube.com/embed/' + id + '?enablejsapi=1&wmode=opaque&autoplay=1'
        },

        rawToRandom(check) {
            if (check) {
                this.rawData.sort(function() {
                    return (0.5 - Math.random());
                });
            } else {
                this.rawData.sort(function(a, b) {
                    return a.rank - b.rank
                })
            }

        },
        getEvents({ start, end }) {
            let now = new Date()
            let events = []
            let calYear = String(start.year)
            for (let item of this.eventVoice) {
                if (null != item.start) {
                    let bir = new Date(item.start)
                    let todayBir = false;
                    if (now.getMonth() == bir.getMonth() && now.getDate() == bir.getDate()) {
                        todayBir = true
                    }
                    bir = calYear.concat('-', String(bir.getMonth() + 1), '-', String(bir.getDate()))
                    events.push({
                        name: item.name,
                        start: bir,
                        voice: item.voice,
                        isMain: item.isMain,
                        isSup: item.isSup,
                        chId: item.chId,
                        // end: bir,
                        voiceImg : item.voiceImg,
						charEngName: item.charEngName,
                        color: this.setVoiceColor(item.isMain, item.isSup, todayBir),
                    })

                }
            }
            this.eventVoice = events
        },
        setVoiceColor(isMain, isSup, todayBir) {
            if (todayBir) {
                return 'deep-purple accent-1'
            }
            if (isMain > 150) {
                return 'purple accent-1'
            } else if (isMain > 100) {
                return 'yellow accent-2'
            } else if (isMain > 80) {
                return 'light-green accent-1'
            } else if (isMain > 60) {
                return 'cyan accent-1'
            } else if (isMain > 40) {
                return 'light-blue accent-1'
            } else if (isMain > 20) {
                return 'red accent-1'
            } else if (isMain > 10) {
                return 'blue-grey lighten-5'
            } else {
                return 'white'
            }
        },
        voiceClick({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event
                let anime = []
                anime = this.rawData.filter(item => {
                    if (item.mal.voices) {
                        let data = item.mal.voices.filter(vo => vo.voice == event.voice)
                        if (data.length > 0)
                            return true
                    } else {
                        return false
                    }
                })
                let names = []
                for (let item of anime) {
                    let voice = item.mal.voices.find(vo => vo.voice == event.voice)
                    if (item.gamer && item.gamer.title) {
                        names.push({ 'title': item.gamer.title, 'img': voice.img != null ? voice.img : '' })
                    } else if (item.bgm && item.bgm.cn_name) {
                        names.push({ 'title': item.bgm.cn_name, 'img': voice.img != null ? voice.img : '' })
                    } else if (item.mal.jp_name) {
                        names.push({ 'title': item.mal.jp_name, 'img': voice.img != null ? voice.img : '' })
                    } else {
                        names.push({ 'title': item.mal.titlee, 'img': voice.img != null ? voice.img : '' })
                    }
                }
                this.selectedEvent['details'] = names

                this.selectedElement = nativeEvent.target
                requestAnimationFrame(() => requestAnimationFrame(() => this.voiceOpen = true))
            }

            if (this.voiceOpen) {
                this.voiceOpen = false
                requestAnimationFrame(() => requestAnimationFrame(() => open()))
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },
        setMyrankColor(score) {
            switch (score) {
                case 5:
                    return '#FFFF00';
                case 4:
                    return '#FFEA00';
                case 3:
                    return '#FFD600';
                case 2:
                    return '#F9A825';
                case 1:
                    return '#FF3D00';
            }
        },
        async searchImage(bol) {
            try {
                this.overlay = true
                let resJson = ""
                if (!bol && this.srhImage) {
                    if (this.srhImage.size > 26214400) {
                        this.overlay = false
                        return false;
                    }
                    const formData = new FormData();
                    formData.append("image", this.srhImage);
                    resJson = await fetch("https://api.trace.moe/search?cutBorders", {
                        method: "POST",
                        body: formData,
                    }).then((e) => e.json());

                    this.srhImgPre = URL.createObjectURL(this.srhImage)
                } else if (bol && this.srhImageUrl) {
                    resJson = await fetch(
                        `https://api.trace.moe/search?cutBorders&url=${encodeURIComponent(
                        this.srhImageUrl
                      )}`
                    ).then((e) => e.json());
                    this.srhImgPre = this.srhImageUrl
                } else {
                    this.overlay = false
                    return false;
                }

                this.srhImageRes = []
                let hourSec = 60 * 60;
                let minuteSec = 60;

                for (let obj of resJson.result) {
                    let vo = {}
                    let filter = this.rawData.find(element => null != element.aniList && element.aniList.id == obj.anilist)
                    vo.jp_name = filter.mal.jp_name
                    vo.en_name = filter.mal.en_name
                    vo.ch_name = null != filter.gamer ? filter.gamer.title : null != filter.bgm ? filter.bgm.hasOwnProperty('cn_name') ? filter.bgm.cn_name : null : null

                    vo.hentai = false
                    if (filter.mal.genres.includes('Hentai')) {
                        vo.hentai = true;
                    }

                    vo.episode = obj.episode
                    vo.online = filter.online

                    let hhFrom = String(Math.floor(obj.from / hourSec)).padStart(2, '0');
                    let mmFrom = String(Math.floor((obj.from % hourSec) / minuteSec)).padStart(2, '0');
                    let ssFrom = String(Math.floor(obj.from % minuteSec)).padStart(2, '0');
                    vo.from = hhFrom + ":" + mmFrom + ":" + ssFrom

                    let hhTo = String(Math.floor(obj.to / hourSec)).padStart(2, '0');
                    let mmTo = String(Math.floor((obj.to % hourSec) / minuteSec)).padStart(2, '0');
                    let ssTo = String(Math.floor(obj.to % minuteSec)).padStart(2, '0');
                    vo.to = hhTo + ":" + mmTo + ":" + ssTo

                    vo.similarity = Math.round(obj.similarity * 100) / 100
                    vo.video = obj.video + '&mute'
                    vo.image = obj.image

                    this.srhImageRes.push(vo)
                }
                const set = new Set();
                this.srhImageRes = this.srhImageRes.filter(item => !set.has(item.en_name) ? set.add(item.en_name) : false);
                this.overlay = false
                setTimeout(() => {
                    this.srhImageRes = []
                }, 300000);
            } catch (error) {
                this.overlay = false
                return false;
            }
        },
        toTop: () => $("html,body").animate({ scrollTop: $(document).height() }, 800),
        toFooter: () => $("html,body").animate({ scrollTop: 0 }, 800),
    }, //methonds
});