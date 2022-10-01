// 麵條式代碼，其實我也很無奈，一開始沒想到會變得這麼亂...
// Vue.config.devtools = true;

let vue = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    components: {
        rating: {
            props: ['item', 'website', 'bScore'],
            template: `<div>
                                <v-chip :color="setChipColor(bScore,website)" dark>
                                <span style="font-size:15px;" v-if="!!!bScore">不計分</span>
                                <span v-else>{{ bScore }}</span>
                                </v-chip>
                                <br />
                                <a v-if="item" class="original" @click="toAnime(website,item.id)"><br />
                                {{!!item.score ? item.score : !!item.averageScore ? item.averageScore : !!item.weighted_score ? item.bayesian_score: 0 }}<br /> ({{!!item.votes? item.votes : 0 }})
                                </a>
                                </div>`,
            methods: {
                setChipColor(bScore, website) {
                    if (website != 'annict' && website != 'sakuhindb') {
                        if (bScore >= 7) return 'green'
                        else if (bScore >= 4) return 'orange'
                        else if (bScore > 0) return 'red'
                        else return 'Default'
                    }
                },
                toAnime(page, id) {
                    let url = ''
                    switch (page) {
                        case 'Gamer':
                            url = 'https://acg.gamer.com.tw/acgDetail.php?s=' + id;
                            break;
                        case 'MAL':
                            url = 'https://myanimelist.net/anime/' + id;
                            break;
                        case 'anidb':
                            url = 'https://anidb.net/anime/' + id;
                            break;
                        case 'BGM':
                            url = 'https://bangumi.tv/subject/' + id;
                            break;
                        case 'Anikore':
                            url = 'https://www.anikore.jp/anime/' + id;
                            break
                        case 'AniList':
                            url = 'https://anilist.co/anime/' + id;
                            break
                        case 'AnimePlanetCom':
                            url = 'https://anime-planet.com/anime/' + id;
                            break
                        case 'ANN':
                            url = 'https://www.animenewsnetwork.com/encyclopedia/anime.php?id=' + id;
                            break
                        case 'anisearch':
                            url = 'https://www.anisearch.com/anime/' + id;
                            break
                        case 'kitsu':
                            url = 'https://kitsu.io/anime/' + id;
                            break
                        case 'notifyMoe':
                            url = 'https://notify.moe/anime/' + id;
                            break
                        case 'trakt':
                            url = 'https://trakt.tv/shows/' + id;
                            break
                        case 'livechart':
                            url = 'https://livechart.me/anime/' + id;
                            break
                        case 'sakuhindb':
                            url = 'https://sakuhindb.com/janime/' + id;
                            break
                        case 'annict':
                            url = 'https://annict.com/works/' + id;
                            break;
                    }
                    window.open(url);
                },
            }
        },
    },
    data: {
        // rawUrl: 'https://raw.githubusercontent.com/Tsuiokuyo/tsuiokuyo.netlify.com/master/static/result.json',
        // rawUrl: 'https://tsuiokuyo.netlify.app/result.json',
        rawData: [],
        randomTen: [],
        toRandom: true,

        windowWidth: window.innerWidth,
        isLoading: true,
        panel: '',
        hug: '',
        snackbarHug: true,


        page: 1,
        itemsPerPage: 15,
        itemsPerPages: [5, 15, 30, 50, 100],
        totalVis: 15,
        pageCount: 1,

        search: '',
        year: '',
        year2: '',
        rank1: '',
        rank2: '',
        diff: '',
        selYear: '等於',
        selType: 'ALL',
        selSource: 'ALL',

        // true: true,
        // false: false,
        selectedImage: false,
        tab: '',
        selectYears: ['等於', '大於', '小於', '介於'],

        selectTypes: [{ value: 'ALL', cht: '全部' }, { value: 'TV', cht: '電視' }, { value: 'MOVIE', cht: '劇場版' }, { value: 'OVA', cht: 'OVA' }],
        selectSources: [{ value: 'ALL', cht: '全部' }, { value: 'Original', cht: '原創' }, { value: 'Light novel', cht: '輕小說' },
            { value: 'Visual novel', cht: '電子小說' }, { value: 'Manga', cht: '漫畫' }, { value: 'Mixed media', cht: '跨媒體製作' },
            { value: '4-koma manga', cht: '四格漫畫' }, { value: 'Game', cht: '遊戲' }, { value: 'Card game', cht: '卡牌遊戲' },
            { value: 'Radio', cht: '廣播劇' }, { value: 'Music', cht: '音樂' }, { value: 'Web manga', cht: '網路漫畫' },
            { value: 'Novel', cht: '小說' }, { value: 'Book', cht: '書籍' },
            { value: 'Picture book', cht: '繪本' }
        ],


        // count: undefined,
        // overlay: false,
        leimuUrl: 'https://tsuiokuyo.netlify.app/image/leimuA.webp',
        lamuUrl: 'https://tsuiokuyo.netlify.app/image/lamuA.webp',
        destroy: true,
        disabledBgImage: false,
        dialogYt: {},

        genreList: [],
        genreSel: [],
        badges: {},
        badgesDef: {},
        onlineWatchs: [],
        onlineWatchSel: [],

        moelong: {},
        gnn: {},
        disabledZero: true,
        disabledNSFW: true,
        rssDisabledMoe: false,
        rssDisabledGNN: false,

        voiceCount: 0,
        voiceOpen: false,
        selectedElement: null,
        selectedEvent: null,

        // value: '',
        eventVoice: [],
        dialogCal: false,
        focus: '',
        memory: null,
    },
    computed: {
        listenChange() {
            const {
                search,
                year,
                selYear,
                selType,
                itemsPerPage,
                genreSel,
                selSource,
                disabledZero,
                disabledNSFW,
                onlineWatchSel
            } = this
            return {
                search,
                year,
                selYear,
                selType,
                itemsPerPage,
                genreSel,
                selSource,
                disabledZero,
                disabledNSFW,
                onlineWatchSel
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
                        if (this.disabledNSFW) {
                            if (item.MAL.genres.includes('Hentai')) {
                                return false;
                            }
                        }
                        if (this.disabledZero) {
                            if (item.score == 0) {
                                return false;
                            }
                        }
                        if (this.year && this.year > 1900) {
                            let bYear = true
                            switch (this.selYear) {
                                case '等於':
                                    bYear = parseInt(item.MAL.premiered) == parseInt(this.year)
                                    break;
                                case '大於':
                                    bYear = parseInt(item.MAL.premiered) >= parseInt(this.year)
                                    break;
                                case '小於':
                                    bYear = parseInt(item.MAL.premiered) <= parseInt(this.year)
                                    break;
                                case '介於':
                                    bYear = (parseInt(item.MAL.premiered) >= parseInt(this.year) && parseInt(item.MAL.premiered) <= parseInt(this.year2 > 99 ? this.year2 : 9999))
                                    break;
                            }
                            if (!bYear) {
                                return false;
                            }
                        }
                        let rank = true
                        if (this.rank1 && this.rank2) {
                            rank = (parseInt(item.rank) >= parseInt(this.rank1) && parseInt(item.rank) <= parseInt(this.rank2))
                        } else if (this.rank1) {
                            rank = parseInt(item.rank) >= parseInt(this.rank1)
                        } else if (this.rank2) {
                            rank = parseInt(item.rank) <= parseInt(this.rank2)
                        }
                        if (!rank) {
                            return false;
                        }
                        if (this.diff) {
                            let difference = true
                            if (item.Gamer && item.Gamer.bayesian_score > 0) {
                                function comput(a, b, range) {
                                    if (b == null) return false;
                                    b = b.bayesian_score > 0 ? b.bayesian_score : false
                                    return Math.abs(parseFloat(a) - parseFloat(b)) >= parseFloat(range)
                                }
                                let gScore = item.Gamer.bayesian_score
                                difference = Math.abs(parseFloat(gScore) - parseFloat(item.MAL.score > 0 ? item.MAL.score : false)) >= parseFloat(this.diff) ||
                                    comput(gScore, item.BGM, this.diff) ||
                                    comput(gScore, item.Anikore, this.diff) ||
                                    comput(gScore, item.AniList, this.diff) ||
                                    comput(gScore, item.AnimePlanetCom, this.diff) ||
                                    comput(gScore, item.ANN, this.diff) ||
                                    comput(gScore, item.anisearch, this.diff) ||
                                    comput(gScore, item.notifyMoe, this.diff) ||
                                    comput(gScore, item.trakt, this.diff) ||
                                    comput(gScore, item.livechart, this.diff)
                            } else {
                                return false;
                            }
                            if (!difference) {
                                return false;
                            }
                        }
                        if (this.selSource != 'ALL') {
                            let selSrc = item.MAL.source == this.selSource
                            if (!selSrc) {
                                return false;
                            }
                        }
                        if (this.selType != 'ALL') {
                            let bSelType = item.MAL.type.toUpperCase() == this.selType.toUpperCase()
                            if (!bSelType) {
                                return false;
                            }
                        }
                        if (this.onlineWatchSel.length > 0) {
                            let check = false
                            if (Object.keys(item.online).length != 0) {
                                for (key of this.onlineWatchSel) {
                                    if (item.online.hasOwnProperty(key)) {
                                        check = true
                                    }
                                }
                                if (!check) {
                                    return false
                                }
                            } else {
                                return false
                            }
                            // if (!check) {
                            //     return false
                            // }
                        }
                        if (this.genreList) {
                            for (gen of this.genreSel) {
                                let generCheck = item.MAL.genres.find(element => element == gen)
                                if (!generCheck) {
                                    return false
                                }
                            }
                        }
                        if (this.search) {
                            let name = false
                            if (item.MAL && null != item.MAL.en_name && item.MAL.en_name.indexOf(this.search) != -1) {
                                name = true;
                            } else if (item.MAL && null != item.MAL.jp_name && item.MAL.jp_name.indexOf(this.search) != -1) {
                                name = true;
                            } else if (item.BGM && null != item.BGM.cn_name && item.BGM.cn_name.indexOf(this.search) != -1) {

                                name = true;
                            } else if (item.Gamer && null != item.Gamer.title && item.Gamer.title.indexOf(this.search) != -1) {
                                name = true;
                            } else if (item.BGM && null != item.BGM.cn_name && item.BGM.cn_name.indexOf(this.simp(this.search)) != -1) {
                                name = true;
                            } else if (item.Gamer && null != item.Gamer.title && item.Gamer.title.indexOf(this.trad(this.search)) != -1) {
                                name = true;
                            }
                            if (!name) {
                                return false;
                            }
                        }
                        return true
                    },
                },
                {
                    text: '算數平均值',
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
                    text: 'Anikore評分',
                    value: 'anikore',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'AniList評分',
                    value: 'anilist',
                    align: 'center',
                    filterable: false,
                    width: '5%',
                },
                {
                    text: 'AnimePlanetCom評分',
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
                    text: 'trakt評分',
                    value: 'trakt',
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
            switch (src) {
                case '4-koma manga':
                    return '四格漫畫';
                case 'Book':
                    return '書籍';
                case 'Card game':
                    return '卡牌遊戲';
                case 'Game':
                    return '遊戲';
                case 'Light novel':
                    return '輕小說';
                case 'Manga':
                    return '漫畫';
                case 'Mixed media':
                    return '跨媒體製作';
                case 'Music':
                    return '音樂';
                case 'Novel':
                    return '小說';
                case 'Original':
                    return '原創';
                case 'Picture book':
                    return '繪本';
                case 'Radio':
                    return '廣播';
                case 'Other':
                case 'undefined':
                case 'Unknown':
                    return '未知';
                case 'Visual novel':
                    return '電子小說';
                case 'Web manga':
                    return '網路漫畫';
            }
            return src
        },
        // onlineNameFormat(name) {
        //     switch (name) {
        //         case 'bahamut':
        //             return '巴哈姆特';
        //         case 'bilibili':
        //             return '哔哩哔哩';
        //         case 'disney':
        //             return '迪士尼+'
        //         case 'friday':
        //             return 'friDay影音'
        //         case 'hamivideo':
        //             return 'HamiVideo'
        //         case 'kktv':
        //             return 'KKTV'
        //         case 'line':
        //             return 'LINE TV'
        //         case 'litv':
        //             return 'LiTV'
        //         case 'myvideo':
        //             return 'myVideo'
        //         case 'netflix':
        //             return 'Netflix'
        //         case 'yahoo':
        //             return 'Yahoo! TV'
        //         case 'ani-one asia':
        //             return 'Ani-One YouTube'
        //         case 'catchplay':
        //             return 'Catchplay'
        //         case 'cht':
        //             return '中華電信MOD'
        //         case 'iqiyi':
        //             return '愛奇藝'
        //         case 'muse':
        //             return '木棉花 Youtube'
        //         case 'googleplay':
        //             return 'Google Play';
        //         case 'animelog':
        //             return 'Animelog Youtube'
        //         case 'crunchyroll':
        //             return 'crunchyroll(英文)'
        //     }
        //     return name;
        // },
        // onlineNameFormat2(name) { //FIXME
        //     switch (name) {
        //         case 'Amazon Prime Video':
        //             return 'Amazon Prime Video';
        //         case 'Ani-One Asia':
        //         case 'Ani-One Asia (Playlist)':
        //             return '羚邦集團(Ani-One) YouTube'
        //         case 'Animelog':
        //             return 'Animelog Youtube'
        //         case 'Bahamut Anime Crazy':
        //             return '巴哈姆特';
        //         case 'CHT MOD':
        //             return '中華電信MOD'
        //         case 'CatchPlay+ TW':
        //             return 'Catchplay'
        //         case 'crunchyroll':
        //         case 'Crunchyroll (Film)':
        //             return 'crunchyroll(英文)'
        //         case 'Disney+ (Movies)':
        //         case 'Disney+ (Series)':
        //             return '迪士尼+'
        //         case 'GUNDAM.INFO':
        //             return 'GUNDAM.INFO'
        //         case 'GagaOOLala':
        //             return 'GagaOOLala'
        //         case 'Google Play (Movie)':
        //             return 'Google Play (Movie)';
        //         case 'HamiVideo':
        //             return 'HamiVideo'
        //         case 'KKTV':
        //             return 'KKTV'
        //         case 'LINE TV Taiwan':
        //             return 'LINE TV'
        //         case 'LiTV':
        //             return 'LiTV'
        //         case 'LiTV (Movie)':
        //             return 'LiTV (Movie)'
        //         case 'Muse TW (Playlist)':
        //             return '木棉花 Youtube'
        //         case 'NHK WORLD-JAPAN On Demand':
        //             return 'NHK WORLD-JAPAN On Demand'
        //         case 'Netflix':
        //             return 'Netflix'
        //         case 'Pokémon YouTube (Playlist)':
        //             return 'Pokémon YouTube (Playlist)'
        //         case 'Rooster Teeth':
        //             return 'Rooster Teeth'
        //         case 'Tencent Video':
        //             return '騰訊'
        //         case 'Yahoo! TV Taiwan':
        //             return 'Yahoo! TV Taiwan'
        //         case 'YouTube':
        //             return 'YouTube'
        //         case 'YouTube (Channel)':
        //             return 'YouTube (Channel)'
        //         case 'YouTube (Playlist)':
        //             return 'YouTube (Playlist)'
        //         case 'bilibili':
        //             return 'bilibili'
        //         case 'friDay':
        //             return 'friDay'
        //         case 'friDay Video (Movie)':
        //             return 'friDay Video (Movie)'
        //         case 'hmvod':
        //             return 'hmvod'
        //         case 'i-Fun':
        //             return 'i-Fun'
        //         case 'iQIYI':
        //             return 'iQIYI'
        //         case 'iTunes':
        //             return 'iTunes'
        //         case 'myVideo':
        //             return 'myVideo'
        //     }
        //     return name;
        // },
        genreToCht(gen) {
            let i = vue.engGen().indexOf(gen)
            if (i != -1) {
                return vue.chtGen()[i]
            } else {
                return gen
            }
        },
        returnZero(score) {
            return score != 0 ? score : '不計分'
        }
    },
    watch: {
        toRandom() {
            this.rawToRandom(this.toRandom)
        },
        listenChange() {
            this.badges = {}
            let filters = this.$refs.tb.$children[0].filteredItems
            for (item of filters) {
                for (gen of item.MAL.genres) {
                    if (this.disabledZero) {
                        if (item.score > 0) {
                            if (this.disabledNSFW) {
                                if (!item.MAL.genres.includes('Hentai')) {
                                    this.badges[gen] = ++this.badges[gen] || 1
                                }
                            } else {
                                this.badges[gen] = ++this.badges[gen] || 1
                            }
                        }
                    } else {
                        if (this.disabledNSFW) {
                            if (!item.MAL.genres.includes('Hentai')) {
                                this.badges[gen] = ++this.badges[gen] || 1
                            }
                        } else {
                            this.badges[gen] = ++this.badges[gen] || 1
                        }
                    }
                }
            }
            this.destroyTable()
        }
    },
    async created() {
        // async function checkResponseTime(testURL) {
        //     let time1 = performance.now();
        //     await fetch(testURL);
        //     let time2 = performance.now();
        //     return time2 - time1;
        // }
        // console.log(await checkResponseTime('https://some-random-api.ml/animu/hug'))

        if (this.windowWidth >= 600) {
            this.hug = await fetch('https://api.waifu.pics/sfw/hug').then((res) => res.json().then((obj) => obj.url));
            // this.hug = await fetch('https://some-random-api.ml/animu/hug').then((res) => res.json().then((obj) => obj.link));
        }
        // this.rawData = await fetch(
        //     this.rawUrl,
        // ).then((res) => res.json());
        // await fetch('https://tsuiokuyo.netlify.app/test.gzip').then((res) => res.arrayBuffer().then(buf => {
        //記憶體爆炸
        await fetch('https://raw.githubusercontent.com/Tsuiokuyo/tsuiokuyo.netlify.com/master/static/test.gzip').then((res) => res.arrayBuffer().then(buf => {
            let zippedContent = new Uint8Array(buf);
            let byteArray = pako.ungzip(zippedContent);
            let textDecoder = new TextDecoder();
            let textContent = textDecoder.decode(byteArray);
            this.rawData = JSON.parse(textContent)
            vue.isLoading = null;
        }));



        let newMoes = []
            // https://thingproxy.freeboard.io/fetch/
            // http://www.whateverorigin.org/get?url=
            // https://api.allorigins.win/get?url=
            // 只有rss部分是靠node.js才實現的 但11/28 heroku會停止支援免費版，上面三個算屆時備用的，但我也可能會直接放棄使用RSS
        const moelongUrl = 'https://tsuiokuyo.herokuapp.com/https://www.moelong.com/moelongnews/feed';
        const gnnUrl = 'https://tsuiokuyo.herokuapp.com/https://gnn.gamer.com.tw/rss.xml';

        fetch(moelongUrl)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = data.querySelectorAll("item");
                items.forEach(el => {
                    let date = new Date(el.getElementsByTagName('pubDate')[0].textContent)
                    let year = date.toLocaleString("default", {
                        year: "numeric"
                    });
                    let month = date.toLocaleString("default", {
                        month: "numeric"
                    });
                    let day = date.toLocaleString("default", {
                        day: "numeric"
                    });
                    let formattedDate = '(' + year + '' + month + '' + day + ')';
                    let news = {
                        'title': el.getElementsByTagName('title')[0].textContent,
                        'link': el.getElementsByTagName('link')[0].textContent,
                        'date': formattedDate
                    }
                    newMoes.push(news)
                })
                if (newMoes.length > 0) {
                    this.moelong = newMoes[0]
                    let moeId = setInterval((() => {
                        this.moelong = newMoes[Math.floor(Math.random() * newMoes.length)]
                    }), 5000);
                    setTimeout(() => {
                        clearInterval(moeId);
                        this.moelong = {
                            'title': '已在此網站待了半小時，已停止新聞迴圈'
                        }
                    }, 1800000);
                    this.rssDisabledMoe = true;
                } else {
                    this.moelong = {
                        'title': '萌朧動漫情報網 RSS撈取失敗，暫停使用，反正也沒甚麼人會看這些資訊'
                    }
                }
            })

        let newGnns = []

        fetch(gnnUrl)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = data.querySelectorAll("item");
                items.forEach(el => {
                    let date = new Date(el.getElementsByTagName('pubDate')[0].textContent)
                    let year = date.toLocaleString("default", {
                        year: "numeric"
                    });
                    let month = date.toLocaleString("default", {
                        month: "numeric"
                    });
                    let day = date.toLocaleString("default", {
                        day: "numeric"
                    });
                    let formattedDate = '(' + year + '' + month + '' + day + ')';

                    let news = {
                        'title': el.getElementsByTagName('title')[0].textContent,
                        'link': el.getElementsByTagName('link')[0].textContent,
                        'date': formattedDate
                    }
                    newGnns.push(news)
                })
                if (newGnns.length > 0) {
                    this.gnn = newGnns[0]
                    let gnnId = setInterval((() => {
                        this.gnn = newGnns[Math.floor(Math.random() * newGnns.length)]
                    }), 5000);
                    setTimeout(() => {
                        clearInterval(gnnId);
                        this.gnn = {
                            'title': '已在此網站待了半小時，已停止新聞迴圈'
                        }
                    }, 1800000);
                    this.rssDisabledGNN = true;
                } else {

                    this.gnn = {
                        'title': '巴哈GNN新聞 RSS撈取失敗，請無視，反正也沒甚麼人會看這些資訊'
                    }
                }

            })

        this.$nextTick(function() {

                this.getRandomArray();
                let genres = []
                let births = []
                let onlines = []
                for (item of this.rawData) {
                    if (this.disabledNSFW) { //移除18禁
                        if (item.MAL.genres.includes('Hentai')) {}
                    }
                    // if (null != item.Gamer && null != item.Gamer.online) {
                    //     onlines.push('Bahamut Anime Crazy')
                    // }
                    // if (null != item.livechart && null != item.livechart.online) {
                    //     for (const [key, value] of Object.entries(item.livechart.online)) {
                    //         if (key != 'Twitter' && key != 'Instagram' && key != 'Plex' && key != 'Steam') {
                    //             // let obj = this.switchName(key, value)
                    //             // onlines.push(obj[0])
                    //             onlines.push(key)
                    //         }

                    //     }
                    // }

                    for (let [key, value] of Object.entries(item.online)) {
                        // if (key.toLowerCase().indexOf('tencent') != -1) {
                        //     break;
                        // }
                        // [key, value] = this.switchName(key, value)
                        // format[key] = value
                        onlines.push(key)
                    }
                    // onlines.push(item.online)
                    // if (null != item.trakt && null != item.trakt.online) {
                    //     for (const [key, value] of Object.entries(item.trakt.online)) {
                    //         if (key != 'Twitter' && key != 'Instagram' && key != 'Plex' && key != 'Steam') {
                    //             // let obj = this.switchName(key, value)
                    //             // onlines.push(obj[0])
                    //             onlines.push(key)
                    //         }
                    //     }
                    // }
                    // }
                    // onlines = [...new Set(onlines.sort())]
                    // this.voicesList = voices

                    // voices = voices.concat(item.MAL.voices)
                    for (gen of item.MAL.genres) {
                        if (this.disabledZero) {
                            if (item.score > 0) {
                                if (this.disabledNSFW) {
                                    if (!item.MAL.genres.includes('Hentai')) {
                                        this.badges[gen] = ++this.badges[gen] || 1
                                    }
                                } else {
                                    this.badges[gen] = ++this.badges[gen] || 1
                                }
                            }
                        } else {
                            if (this.disabledNSFW) {
                                if (!item.MAL.genres.includes('Hentai')) {
                                    this.badges[gen] = ++this.badges[gen] || 1
                                }
                            } else {
                                this.badges[gen] = ++this.badges[gen] || 1
                            }

                        }
                    }
                    genres = genres.concat(item.MAL.genres)

                    //FixMe 正規打錯了 
                    if (item.MAL.type == "Movie" && item.MAL.duration < 3) {
                        item.MAL.duration = item.MAL.duration * 60
                    }
                    if ('duration' in item.MAL && null != item.MAL.duration && item.MAL.type != "Movie" && item.MAL.duration < 16) {
                        if (this.disabledZero) {
                            // if (item.score > 0) {
                            item.MAL.genres.push('cup')
                            genres.push('cup')
                            this.badges['cup'] = ++this.badges['cup'] || 1
                                // }
                        } else {
                            item.MAL.genres.push('cup')
                            genres.push('cup')
                            this.badges['cup'] = ++this.badges['cup'] || 1
                        }
                    }
                    if ('voices' in item.MAL && item.MAL.voices.length != 0) {
                        births = births.concat(item.MAL.voices)
                    }
                }
                onlines = [...new Set(onlines.sort())]
                console.log(onlines)
                this.onlineWatchs = onlines
                    //FIXME 正規化
                const set = new Set();
                births = births.filter(item => !set.has(item.voice) ? set.add(item.voice) : false);
                this.voiceCount = births.length
                let events = []
                let now = new Date()
                for (item of births) {
                    if (null != item.birth) {
                        let bir = new Date(item.birth)
                        let todayBir = false;
                        if (now.getMonth() == bir.getMonth() && now.getDate() == bir.getDate()) {
                            todayBir = true
                        }
                        bir = String(now.getFullYear()).concat('-', String(bir.getMonth() + 1), '-', String(bir.getDate()))
                        events.push({
                            name: item.name,
                            start: bir,
                            voice: item.voice,
                            isMain: item.isMain,
                            isSup: item.isSup,
                            chId: item.chId,
                            // end: bir,
                            color: this.setVoiceColor(item.isMain, item.isSup, todayBir),
                        })
                    }
                }
                events.sort(function(a, b) {
                    return b.isMain - a.isMain
                })
                this.eventVoice = events

                this.badgesDef = this.badges
                genres = [...new Set(genres.sort())]

                //FIXME 不該出現，下一輪再看看
                genres = genres.filter(function(item) {
                    return item !== 'Josei'
                });

                this.genreList = genres

                //抓網址參數
                let geturl = window.location.href
                let getqyinfo = geturl.split('?')[1]
                if (getqyinfo) {
                    let getqys = new URLSearchParams('?' + getqyinfo)
                    let getQName = getqys.get('name')
                    this.search = getQName
                }

                if (this.toRandom) {
                    this.rawData.sort(function() {
                        return (0.5 - Math.random());
                    });
                }
                // this.pageCount = Math.ceil(this.rawData.length / this.itemsPerPage)
                // delete newGnns, newMoes, events, now, genres, births, moelongUrl, gnnUrl, geturl, getqyinfo, set

                if (navigator.userAgent.search("Chrome") > -1 || navigator.userAgent.search("Opera") > -1) {
                    this.memory = 0
                }
            }

        )


    },
    async mounted() {}, //mounted
    updated() {},
    methods: {
        setRankColor(i) {
            let pitch = 255 / this.rawData.length;
            pitch = 255 - (pitch * i)
            return 'color: rgb(255,' + pitch + ',0);';
        },
        setCover(item, lazy) {
            if (lazy) {
                if (item.BGM && item.BGM.image) {
                    return "http://lain.bgm.tv/pic/cover/g/" + item.BGM.image + ".jpg"
                } else { //FIXME 下一輪
                    if (item.MAL.image.length > 50) {
                        return item.MAL.image
                    }
                    return "https://cdn.myanimelist.net/images/anime/" + item.MAL.image.replace('.webp', '').replace('.jpg', '') + 't.webp'
                }
            } else {
                if (item.BGM && item.BGM.image) {
                    return "http://lain.bgm.tv/pic/cover/c/" + item.BGM.image + ".jpg"
                } else { //FIXME 下一輪
                    if (item.MAL.image.length > 50) {
                        return item.MAL.image
                    }
                    return "https://cdn.myanimelist.net/images/anime/" + item.MAL.image.replace('.webp', '').replace('.jpg', '') + '.webp'
                }
            }
        },
        toggleFullscreen(item) {
            if (null != item.BGM) {
                this.selectedImage = "http://lain.bgm.tv/pic/cover/l/" + item.BGM.image + ".jpg"
            } else {
                this.selectedImage = "https://cdn.myanimelist.net/images/anime/" + item.MAL.image
            }
        },
        customSort(items, index, isDescending) {
            this.destroyTable()
            items.sort((a, b) => {
                switch (index[0]) {
                    case 'name':
                        if (isDescending[0]) {
                            return b.rank > a.rank ? 1 : -1;
                        } else {
                            return a.rank > b.rank ? 1 : -1;
                        }
                    case 'score':
                        if (isDescending[0]) {
                            return b.score > a.score ? 1 : -1;
                        } else {
                            return a.score > b.score ? 1 : -1;
                        }
                    case 'mal':
                        if (isDescending[0]) {
                            return b.MAL.score > a.MAL.score ? 1 : -1;
                        } else {
                            return a.MAL.score > b.MAL.score ? 1 : -1;
                        }
                    case 'gamer':
                        b = !!b.Gamer ? b.Gamer.bayesian_score : 0;
                        a = !!a.Gamer ? a.Gamer.bayesian_score : 0;
                        if (isDescending[0]) {
                            return b > a ? 1 : -1
                        } else {
                            return a > b ? 1 : -1
                        }
                    case 'anidb':
                        b = !!b.anidb ? b.anidb.bayesian_score : 0;
                        a = !!a.anidb ? a.anidb.bayesian_score : 0;
                        if (isDescending[0]) {
                            return b > a ? 1 : -1
                        } else {
                            return a > b ? 1 : -1
                        }
                    case 'bgm':
                        b = !!b.BGM ? b.BGM.bayesian_score : 0;
                        a = !!a.BGM ? a.BGM.bayesian_score : 0;
                        if (isDescending[0]) {
                            return b > a ? 1 : -1
                        } else {
                            return a > b ? 1 : -1
                        }
                    case 'anikore':
                        b = !!b.Anikore ? b.Anikore.bayesian_score : 0;
                        a = !!a.Anikore ? a.Anikore.bayesian_score : 0;
                        if (isDescending[0]) {
                            return b > a ? 1 : -1
                        } else {
                            return a > b ? 1 : -1
                        }
                    case 'anisearch':
                        b = !!b.anisearch ? b.anisearch.bayesian_score : 0;
                        a = !!a.anisearch ? a.anisearch.bayesian_score : 0;
                        if (isDescending[0]) {
                            return b > a ? 1 : -1
                        } else {
                            return a > b ? 1 : -1
                        }
                    case 'anilist':
                        b = !!b.AniList ? b.AniList.bayesian_score : 0;
                        a = !!a.AniList ? a.AniList.bayesian_score : 0;
                        if (isDescending[0]) {
                            return b > a ? 1 : -1
                        } else {
                            return a > b ? 1 : -1
                        }
                    case 'animeplanetcom':
                        b = !!b.AnimePlanetCom ? b.AnimePlanetCom.bayesian_score : 0;
                        a = !!a.AnimePlanetCom ? a.AnimePlanetCom.bayesian_score : 0;
                        if (isDescending[0]) {
                            return b > a ? 1 : -1
                        } else {
                            return a > b ? 1 : -1
                        }
                    case 'ann':
                        b = !!b.ANN ? b.ANN.bayesian_score : 0;
                        a = !!a.ANN ? a.ANN.bayesian_score : 0;
                        if (isDescending[0]) {
                            return b > a ? 1 : -1
                        } else {
                            return a > b ? 1 : -1
                        }
                    case 'kitsu':
                        b = !!b.kitsu ? b.kitsu.bayesian_score : 0;
                        a = !!a.kitsu ? a.kitsu.bayesian_score : 0;
                        if (isDescending[0]) {
                            return b > a ? 1 : -1
                        } else {
                            return a > b ? 1 : -1
                        }
                    case 'notifymoe':
                        b = !!b.notifyMoe ? b.notifyMoe.bayesian_score : 0;
                        a = !!a.notifyMoe ? a.notifyMoe.bayesian_score : 0;
                        if (isDescending[0]) {
                            return b > a ? 1 : -1
                        } else {
                            return a > b ? 1 : -1
                        }
                    case 'trakt':
                        b = !!b.trakt ? b.trakt.bayesian_score : 0;
                        a = !!a.trakt ? a.trakt.bayesian_score : 0;
                        if (isDescending[0]) {
                            return b > a ? 1 : -1
                        } else {
                            return a > b ? 1 : -1
                        }
                    case 'livechart':
                        b = !!b.livechart ? b.livechart.bayesian_score : 0;
                        a = !!a.livechart ? a.livechart.bayesian_score : 0;
                        if (isDescending[0]) {
                            return b > a ? 1 : -1
                        } else {
                            return a > b ? 1 : -1
                        }
                    case 'redditanimelist':
                        b = !!b.sakuhindb ? b.sakuhindb.bayesian_score : 0;
                        a = !!a.sakuhindb ? a.sakuhindb.bayesian_score : 0;
                        if (isDescending[0]) {
                            return b > a ? 1 : -1
                        } else {
                            return a > b ? 1 : -1
                        }
                    case 'sakuhindb':
                        b = !!b.sakuhindb ? b.sakuhindb.bayesian_score : 0;
                        a = !!a.sakuhindb ? a.sakuhindb.bayesian_score : 0;
                        if (isDescending[0]) {
                            return b > a ? 1 : -1
                        } else {
                            return a > b ? 1 : -1
                        }
                }
            });
            return items;
        },
        getRandomArray() {
            // this.$nextTick(function() {
            this.randomTen = []
            let shuffled = this.rawData.slice(0),
                i = this.rawData.length,
                min = i - 10,
                temp, index;
            while (i-- > min) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            let check = shuffled.slice(min)
            for (item of check) {
                if (this.disabledNSFW) {
                    if (item.MAL.genres.includes('Hentai')) {
                        return this.getRandomArray()
                    }
                }
                // if (this.disabledZero) {
                //     if (item.score == 0) {
                //         return this.getRandomArray()
                //     }
                // }
            }
            this.randomTen = check
        },
        randomListTitle(item) {
            if (null != item.Gamer) {
                return item.Gamer.title
            } else if (null != item.BGM) {
                return item.BGM.cn_name
            } else if (null != item.MAL.jp_name) {
                return item.MAL.jp_name;
            } else {
                return item.MAL.title
            }
        },
        onlineList(item) {
            let online = new Object();
            // if (null != item.trakt && !!item.trakt.online) { //FIXME
            //     for (const [key, value] of Object.entries(item.trakt.online)) {
            //         online[key] = 'https://trakt.tv/watchnow/' + value
            //     }
            // }
            // if (null != item.Gamer && !!item.Gamer.online) {
            //     online['Bahamut Anime Crazy'] = item.Gamer.online
            // }
            // if (null != item.livechart && !!item.livechart.online) {
            //     online = item.livechart.online;
            // }
            let format = new Object();
            if (!!item) {
                for (let [key, value] of Object.entries(item)) {
                    // if (key.toLowerCase().indexOf('tencent') != -1) {
                    //     break;
                    // }
                    // [key, value] = this.switchName(key, value)
                    // format[key] = value
                    value = this.addUrl(key, value)
                    format[key] = value

                }
            }
            return format;
        },
        addUrl(key, id) {
            if (id.indexOf('watchnow') != -1) {
                return 'https://trakt.tv' + id
            }

            switch (key) {
                case 'Amazon Prime Video':
                    if (id.length > 50) { //FIXME
                        return id;
                    }
                    return 'https://www.primevideo.com/detail/' + id
                case '羚邦集團(Ani-One) YouTube':
                case 'AnimeLog Youtube':
                case 'GUNDAM.INFO Youtube':
                case '木棉花國際(Muse) Youtube':
                    return 'https://www.youtube.com/' + id
                case '巴哈姆特':
                    return 'https://ani.gamer.com.tw/animeVideo.php?sn=' + id
                case '中華電信MOD':
                    return 'http://mod.cht.com.tw/video/' + id
                case 'CatchPlay+ TW':
                    return 'https://www.catchplay.com/' + id
                case 'Disney+':
                    return 'https://www.disneyplus.com/' + id
                case 'Google Play':
                    return 'https://play.google.com/store/' + id
                case 'HamiVideo':
                    return 'https://hamivideo.hinet.net/' + id
                case 'KKTV':
                    return 'https://www.kktv.me/' + id
                case 'LINE TV Taiwan':
                    return 'https://www.linetv.tw/' + id
                case 'LiTV立視':
                    return 'https://www.litv.tv/vod/' + id
                case 'Netflix':
                    return 'https://www.netflix.com/' + id
                case 'Yahoo! TV Taiwan':
                    return 'https://tw.tv.yahoo.com/' + id
                case 'bilibili':
                    return 'https://www.bilibili.com/bangumi/' + id
                case 'friDay影音':
                    return 'https://video.friday.tw/' + id
                        // case 'hmvod':
                        //     return ''
                case 'iQIYI愛奇藝':
                    return 'https://www.iq.com/' + id
                        // case 'iTunes':
                        //     return ''
                case 'MyVideo':
                    return 'https://www.myvideo.net.tw/' + id
                default:
                    return id
            }
        },
        switchName(name, id) {
            name = name.toLowerCase()
            if (id.indexOf('trakt.tv') != -1) {
                return [name, id]
            } else if (name.indexOf('bahamut') != -1) {
                if (id.indexOf('https://') != -1) {
                    return ['bahamut', id] //LC犬夜叉異常 FIXME
                } else {
                    return ['bahamut', 'https://ani.gamer.com.tw/animeVideo.php?sn=' + id]
                }
            } else if (name.indexOf('bilibili') != -1) {
                return ['bilibili', 'https://www.bilibili.com/bangumi/' + id]
            } else if (name.indexOf('disney') != -1) {
                return ['disney', 'https://www.disneyplus.com/' + id]
            } else if (name.indexOf('friday') != -1) {
                return ['friday', 'https://video.friday.tw/' + id]
            } else if (name.indexOf('hamivideo') != -1) {
                return ['hamivideo', 'https://hamivideo.hinet.net/' + id]
            } else if (name.indexOf('kktv') != -1) {
                return ['kktv', 'https://www.kktv.me/' + id]
            } else if (name.indexOf('line') != -1) {
                return ['line', 'https://www.linetv.tw/' + id]
            } else if (name.indexOf('litv') != -1) {
                return ['litv', 'https://www.litv.tv/vod/' + id]
            } else if (name.indexOf('myvideo') != -1) {
                return ['myvideo', 'https://www.myvideo.net.tw/' + id]
            } else if (name.indexOf('netflix') != -1) {
                return ['netflix', 'https://www.netflix.com/' + id]
            } else if (name.indexOf('ani-one asia') != -1) {
                return ['ani-one asia', 'https://www.youtube.com/' + id]
            } else if (name.indexOf('yahoo') != -1) {
                return ['yahoo', 'https://tw.tv.yahoo.com/' + id]
            } else if (name.indexOf('catchplay') != -1) {
                return ['catchplay', 'https://www.catchplay.com/' + id]
            } else if (name.indexOf('cht') != -1) {
                return ['cht', 'http://mod.cht.com.tw/video/' + id]
            } else if (name.indexOf('iqiyi') != -1) {
                return ['iqiyi', 'https://www.iq.com/' + id]
            } else if (name.indexOf('muse') != -1) {
                return ['muse', 'https://www.youtube.com/' + id]
            } else if (name.indexOf('google') != -1) {
                return ['googleplay', 'https://play.google.com/store/' + id]
            } else if (name.indexOf('crunchyroll') != -1) {
                return ['crunchyroll', 'https://www.crunchyroll.com/' + id]
            } else if (name.indexOf('nhk world-japan on demand') != -1) { //FixMe
                return ['NHK(英文)', id]
            } else if (name.indexOf('prime') != -1) { //FixMe
                return ['Amazon Prime Video', 'https://www.primevideo.com/detail/' + id]
            } else if (name.indexOf('gundam.info') != -1) {
                return ['gundam.info', 'https://www.youtube.com/' + id]
            } else if (name.indexOf('animelog') != -1) {
                return ['AnimeLog', 'https://www.youtube.com/' + id]
            }

            // if (id.indexOf('trakt.tv') != -1) {
            //     return [name, id]
            // } else if (name.indexOf('bahamut') != -1) {
            //     if (id.indexOf('https://') != -1) {
            //         return ['bahamut', id] //LC犬夜叉異常 FIXME
            //     } else {
            //         return ['bahamut', 'https://ani.gamer.com.tw/animeVideo.php?sn=' + id]
            //     }
            // } else if (name.indexOf('bilibili') != -1) {
            //     return [name, 'https://www.bilibili.com/bangumi/' + id]
            // } else if (name.indexOf('disney') != -1) {
            //     return [name, 'https://www.disneyplus.com/' + id]
            // } else if (name.indexOf('friday') != -1) {
            //     return [name, 'https://video.friday.tw/' + id]
            // } else if (name.indexOf('hamivideo') != -1) {
            //     return [name, 'https://hamivideo.hinet.net/' + id]
            // } else if (name.indexOf('kktv') != -1) {
            //     return [name, 'https://www.kktv.me/' + id]
            // } else if (name.indexOf('line') != -1) {
            //     return [name, 'https://www.linetv.tw/' + id]
            // } else if (name.indexOf('litv') != -1) {
            //     return [name, 'https://www.litv.tv/vod/' + id]
            // } else if (name.indexOf('myvideo') != -1) {
            //     return [name, 'https://www.myvideo.net.tw/' + id]
            // } else if (name.indexOf('netflix') != -1) {
            //     return [name, 'https://www.netflix.com/' + id]
            // } else if (name.indexOf('ani-one asia') != -1) {
            //     return [name, 'https://www.youtube.com/' + id]
            // } else if (name.indexOf('yahoo') != -1) {
            //     return [name, 'https://tw.tv.yahoo.com/' + id]
            // } else if (name.indexOf('catchplay') != -1) {
            //     return [name, 'https://www.catchplay.com/' + id]
            // } else if (name.indexOf('cht') != -1) {
            //     return [name, 'http://mod.cht.com.tw/video/' + id]
            // } else if (name.indexOf('iqiyi') != -1) {
            //     return [name, 'https://www.iq.com/' + id]
            // } else if (name.indexOf('muse') != -1) {
            //     return [name, 'https://www.youtube.com/' + id]
            // } else if (name.indexOf('google') != -1) {
            //     return [name, 'https://play.google.com/store/' + id]
            // } else if (name.indexOf('crunchyroll') != -1) {
            //     return [name, 'https://www.crunchyroll.com/' + id]
            // } else if (name.indexOf('nhk world-japan on demand') != -1) { //FixMe
            //     return [name, id]
            // }

            return [name, id];
        },
        toTop() {
            $("html,body").animate({
                scrollTop: $(document).height()
            }, 800);
        },
        toFooter() {
            $("html,body").animate({
                scrollTop: 0
            }, 800);
        },
        lamu(value) {
            if (value == 'A') {
                return 'https://tsuiokuyo.netlify.app/image/lamuA.webp'
            } else {
                return 'https://tsuiokuyo.netlify.app/image/lamuB.webp'
            }
        },
        leimu(value) {
            if (value == 'A') {
                return 'https://tsuiokuyo.netlify.app/image/leimuA.webp'
            } else {
                return 'https://tsuiokuyo.netlify.app/image/leimuB.webp'
            }
        },
        getBackground(item) {
            if (!this.disabledBgImage) {
                if (null != item.anisearch && null != item.anisearch.coverS) {
                    return 'https://cdn.anisearch.com/images/anime/header/' + item.anisearch.coverS + '.webp';
                    // } else if (null != item.trakt && null != item.trakt.coverS) {
                    //     return 'https://walter.trakt.tv/images/shows/000/' + item.trakt.coverS
                    // } else if (null != item.kitsu && null != item.kitsu.coverT) {
                    // return 'https://media.kitsu.io/anime/' + item.kitsu.coverT;
                } else if (null != item.kitsu && null != item.kitsu.coverT) {
                    return 'https://media.kitsu.io/anime/' + item.kitsu.coverT;
                } else if (null != item.trakt && null != item.trakt.coverS) {
                    return 'https://walter.trakt.tv/images/shows/000/' + item.trakt.coverS;
                } else {
                    return ''
                }
            }
            return ''
        },
        setBackgroundLazy(entries, observer, isIntersecting) {
            let bg = 'https://tsuiokuyo.netlify.app/image/background.webp'
            let aniBg = entries[0].target.lastChild.innerText
            if (isIntersecting) {
                if (!!aniBg) {
                    entries[0].target.attributes.style.value = 'background-image:url(' + bg + '),url(' + aniBg + ');background-blend-mode: luminosity;background-size:cover;'
                } else {
                    entries[0].target.attributes.style.value = 'background-image:url(' + bg + ');background-size:cover;'
                }
                return entries
            }
        },
        goToBlog() {
            window.open('https://tsuiokuyo.netlify.app/');
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
            switch (gen) {
                case 'Action':
                case 'Adult Cast':
                case 'Adventure':
                case 'CGDCT':
                case 'Combat Sports':
                case 'Comedy':
                case 'Delinquents':
                case 'Ecchi':
                case 'Educational':
                case 'Gore':
                case 'Harem':
                case 'Idols (Female)':
                case 'Mahou Shoujo':
                case 'Martial Arts':
                case 'Mecha':
                case 'Military':
                case 'Organized Crime':
                case 'Racing':
                case 'Samurai':
                case 'Sci-Fi':
                case 'Sports':
                case 'Super Power':
                case 'Survival':
                case 'Team Sports':
                case 'Vampire':
                    return 'A'
                case 'Anthropomorphic':
                case 'Avant Garde':
                case 'Award Winning':
                case 'Childcare':
                case 'Crossdressing':
                case 'Detective':
                case 'Drama':
                case 'Fantasy':
                case 'Gag Humor':
                case 'Gourmet':
                case 'High Stakes Game':
                case 'Historical':
                case 'Horror':
                case 'Isekai':
                case 'Love Polygon':
                case 'Iyashikei':
                case 'Magical Sex Shift':
                case 'Medical':
                case 'Music':
                case 'Mystery':
                case 'Otaku Culture':
                case 'Mythology':
                case 'Parody':
                case 'Performing Arts':
                case 'Pets':
                case 'Psychological':
                case 'Reincarnation':
                case 'Romance':
                case 'Romantic Subtext':
                case 'School':
                case 'Showbiz':
                case 'Slice of Life':
                case 'Space':
                case 'Strategy Game':
                case 'Supernatural':
                case 'Suspense':
                case 'Time Travel':
                case 'Video Game':
                case 'Visual Arts':
                case 'Workplace':
                    return 'B'
                case 'Erotica':
                case 'Boys Love':
                case 'Idols (Male)':
                case 'Reverse Harem':
                case 'Girls Love':
                    return 'C'
                case 'Hentai':
                    return 'D'
            }
            return 'B'
        },
        getYoutube(id) {
            return 'https://www.youtube.com/embed/' + id + '?enablejsapi=1&wmode=opaque&autoplay=1'
        },
        engGen() {
            return ['Hentai', 'cup', 'Action', 'Adult Cast', 'Adventure', 'Anthropomorphic', 'Avant Garde', 'Award Winning', 'Boys Love', 'CGDCT', 'Childcare', 'Combat Sports', 'Comedy', 'Crossdressing', 'Delinquents', 'Detective', 'Drama', 'Ecchi', 'Educational', 'Erotica', 'Fantasy', 'Gag Humor', 'Girls Love', 'Gore', 'Gourmet', 'Harem', 'High Stakes Game', 'Historical', 'Horror', 'Idols (Female)', 'Idols (Male)', 'Isekai', 'Iyashikei', 'Love Polygon', 'Magical Sex Shift', 'Mahou Shoujo', 'Martial Arts', 'Mecha', 'Medical', 'Military', 'Music', 'Mystery', 'Mythology', 'Organized Crime', 'Otaku Culture', 'Parody', 'Performing Arts', 'Pets', 'Psychological', 'Racing', 'Reincarnation', 'Reverse Harem', 'Romance', 'Romantic Subtext', 'Samurai', 'School', 'Sci-Fi', 'Showbiz', 'Slice of Life', 'Space', 'Sports', 'Strategy Game', 'Super Power', 'Supernatural', 'Survival', 'Suspense', 'Team Sports', 'Time Travel', 'Vampire', 'Video Game', 'Visual Arts', 'Workplace']
        },
        chtGen() {
            return ['裏番', '泡麵番', '動作', '成年人主角', '冒險', '擬人化', '前衛', '曾經得獎', '耽美', '純女角', '育兒', '格鬥運動', '喜劇', '變裝', '不良', '偵探', '劇情', '賣肉', '教育', '成人耽美', '奇幻', '惡作劇幽默', '百合', '血腥', '美食', '後宮', '高風險遊戲', '歷史', '恐怖', '偶像(女性)', '偶像(男性)', '異世界', '療癒', '多角戀', '性轉', '魔法少女', '武術', '機甲', '醫療', '軍事', '音樂', '神秘', '神話', '組織犯罪', '宅圈', '惡搞', '表演藝術', '寵物', '心理', '競速', '異世界重生', '乙女', '浪漫', '浪漫敘事', '武士', '學園', '科幻', '娛樂圈', '空氣系', '太空', '體育', '策略', '超能力', '超自然力量', '生存', '懸疑', '團隊運動', '時間旅行', '吸血鬼', '電玩', '視覺藝術', '職場']
        },
        simpPYStr() {
            return '啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸尽劲荆兢觉决诀绝均菌钧军君峻俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座锕嗳嫒瑷暧霭谙铵鹌媪骜鳌钯呗钣鸨龅鹎贲锛荜哔滗铋筚跸苄缏笾骠飑飙镖镳鳔傧缤槟殡膑镔髌鬓禀饽钹鹁钸骖黪恻锸侪钗冁谄谶蒇忏婵骣觇禅镡伥苌怅阊鲳砗伧谌榇碜龀枨柽铖铛饬鸱铳俦帱雠刍绌蹰钏怆缍鹑辍龊鹚苁骢枞辏撺锉鹾哒鞑骀绐殚赕瘅箪谠砀裆焘镫籴诋谛绨觌镝巅钿癫铫鲷鲽铤铥岽鸫窦渎椟牍笃黩簖怼镦炖趸铎谔垩阏轭锇锷鹗颚颛鳄诶迩铒鸸鲕钫鲂绯镄鲱偾沣凫驸绂绋赙麸鲋鳆钆赅尴擀绀戆睾诰缟锆纥镉颍亘赓绠鲠诟缑觏诂毂钴锢鸪鹄鹘鸹掴诖掼鹳鳏犷匦刿妫桧鲑鳜衮绲鲧埚呙帼椁蝈铪阚绗颉灏颢诃阖蛎黉讧荭闳鲎浒鹕骅桦铧奂缳锾鲩鳇诙荟哕浍缋珲晖诨馄阍钬镬讦诘荠叽哜骥玑觊齑矶羁虿跻霁鲚鲫郏浃铗镓蛲谏缣戋戬睑鹣笕鲣鞯绛缰挢峤鹪鲛疖颌鲒卺荩馑缙赆觐刭泾迳弪胫靓阄鸠鹫讵屦榉飓钜锔窭龃锩镌隽谲珏皲剀垲忾恺铠锴龛闶钪铐骒缂轲钶锞颔龈铿喾郐哙脍狯髋诓诳邝圹纩贶匮蒉愦聩篑阃锟鲲蛴崃徕涞濑赉睐铼癞籁岚榄斓镧褴阆锒唠崂铑铹痨鳓诔缧俪郦坜苈莅蓠呖逦骊缡枥栎轹砺锂鹂疠粝跞雳鲡鳢蔹奁潋琏殓裢裣鲢魉缭钌鹩蔺廪檩辚躏绫棂蛏鲮浏骝绺镏鹨茏泷珑栊胧砻偻蒌喽嵝镂瘘耧蝼髅垆撸噜闾泸渌栌橹轳辂辘氇胪鸬鹭舻鲈脔娈栾鸾銮囵荦猡泺椤脶镙榈褛锊呒唛嬷杩劢缦镘颡鳗麽扪焖懑钔芈谧猕祢渑腼黾缈缪闵缗谟蓦馍殁镆钼铙讷铌鲵辇鲶茑袅陧蘖嗫颟蹑苎咛聍侬哝驽钕傩讴怄瓯蹒疱辔纰罴铍谝骈缥嫔钋镤镨蕲骐绮桤碛颀颃鳍佥荨悭骞缱椠钤嫱樯戗炝锖锵镪羟跄诮谯荞缲硗跷惬锲箧锓揿鲭茕蛱巯赇虮鳅诎岖阒觑鸲诠绻辁铨阕阙悫荛娆桡饪轫嵘蝾缛铷颦蚬飒毵糁缫啬铯穑铩鲨酾讪姗骟钐鳝垧殇觞厍滠畲诜谂渖谥埘莳弑轼贳铈鲥绶摅纾闩铄厮驷缌锶鸶薮馊飕锼谡稣谇荪狲唢睃闼铊鳎钛鲐昙钽锬顸傥饧铴镗韬铽缇鹈阗粜龆鲦恸钭钍抟饨箨鼍娲腽纨绾辋诿帏闱沩涠玮韪炜鲔阌莴龌邬庑怃妩骛鹉鹜饩阋玺觋硖苋莶藓岘猃娴鹇痫蚝籼跹芗饷骧缃飨哓潇骁绡枭箫亵撷绁缬陉荥馐鸺诩顼谖铉镟谑泶鳕埙浔鲟垭娅桠氩厣赝俨兖谳恹闫酽魇餍鼹炀轺鹞鳐靥谒邺晔烨诒呓峄饴怿驿缢轶贻钇镒镱瘗舣铟瘾茔莺萦蓥撄嘤滢潆璎鹦瘿颏罂镛莸铕鱿伛俣谀谕蓣嵛饫阈妪纡觎欤钰鹆鹬龉橼鸢鼋钺郓芸恽愠纭韫殒氲瓒趱錾驵赜啧帻箦谮缯谵诏钊谪辄鹧浈缜桢轸赈祯鸩诤峥钲铮筝骘栉栀轵轾贽鸷蛳絷踬踯觯锺纣绉伫槠铢啭馔颞骓缒诼镯谘缁辎赀眦锱龇鲻偬诹驺鲰镞缵躜鳟讠谫郄勐凼坂垅垴埯埝苘荬荮莜莼菰藁揸吒吣咔咝咴噘噼嚯幞岙嵴彷徼犸狍馀馇馓馕愣憷懔丬溆滟溷漤潴澹甯纟绔绱珉枧桊桉槔橥轱轷赍肷胨飚煳煅熘愍淼砜磙眍钚钷铘铞锃锍锎锏锘锝锪锫锿镅镎镢镥镩镲稆鹋鹛鹱疬疴痖癯裥襁耢颥螨麴鲅鲆鲇鲞鲴鲺鲼鳊鳋鳘鳙鞒鞴齄';
        },

        ftPYStr() {
            return '啊阿埃挨哎唉哀皚癌藹矮艾礙愛隘鞍氨安俺按暗岸胺案骯昂盎凹敖熬翺襖傲奧懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙壩霸罷爸白柏百擺佰敗拜稗斑班搬扳般頒板版扮拌伴瓣半辦絆邦幫梆榜膀綁棒磅蚌鎊傍謗苞胞包褒剝薄雹保堡飽寶抱報暴豹鮑爆杯碑悲卑北輩背貝鋇倍狽備憊焙被奔苯本笨崩繃甭泵蹦迸逼鼻比鄙筆彼碧蓖蔽畢斃毖幣庇痹閉敝弊必辟壁臂避陛鞭邊編貶扁便變卞辨辯辮遍標彪膘表鱉憋別癟彬斌瀕濱賓擯兵冰柄丙秉餅炳病並玻菠播撥缽波博勃搏鉑箔伯帛舶脖膊渤泊駁捕蔔哺補埠不布步簿部怖擦猜裁材才財睬踩采彩菜蔡餐參蠶殘慚慘燦蒼艙倉滄藏操糙槽曹草廁策側冊測層蹭插叉茬茶查碴搽察岔差詫拆柴豺攙摻蟬饞讒纏鏟產闡顫昌猖場嘗常長償腸廠敞暢唱倡超抄鈔朝嘲潮巢吵炒車扯撤掣徹澈郴臣辰塵晨忱沈陳趁襯撐稱城橙成呈乘程懲澄誠承逞騁秤吃癡持匙池遲弛馳恥齒侈尺赤翅斥熾充沖蟲崇寵抽酬疇躊稠愁籌仇綢瞅醜臭初出櫥廚躇鋤雛滁除楚礎儲矗搐觸處揣川穿椽傳船喘串瘡窗幢床闖創吹炊捶錘垂春椿醇唇淳純蠢戳綽疵茨磁雌辭慈瓷詞此刺賜次聰蔥囪匆從叢湊粗醋簇促躥篡竄摧崔催脆瘁粹淬翠村存寸磋撮搓措挫錯搭達答瘩打大呆歹傣戴帶殆代貸袋待逮怠耽擔丹單鄲撣膽旦氮但憚淡誕彈蛋當擋黨蕩檔刀搗蹈倒島禱導到稻悼道盜德得的蹬燈登等瞪凳鄧堤低滴迪敵笛狄滌翟嫡抵底地蒂第帝弟遞締顛掂滇碘點典靛墊電佃甸店惦奠澱殿碉叼雕雕刁掉吊釣調跌爹碟蝶叠諜疊丁盯叮釘頂鼎錠定訂丟東冬董懂動棟侗恫凍洞兜抖鬥陡豆逗痘都督毒犢獨讀堵睹賭杜鍍肚度渡妒端短鍛段斷緞堆兌隊對墩噸蹲敦頓囤鈍盾遁掇哆多奪垛躲朵跺舵剁惰墮蛾峨鵝俄額訛娥惡厄扼遏鄂餓恩而兒耳爾餌洱二貳發罰筏伐乏閥法琺藩帆番翻樊礬釩繁凡煩反返範販犯飯泛坊芳方肪房防妨仿訪紡放菲非啡飛肥匪誹吠肺廢沸費芬酚吩氛分紛墳焚汾粉奮份忿憤糞豐封楓蜂峰鋒風瘋烽逢馮縫諷奉鳳佛否夫敷膚孵扶拂輻幅氟符伏俘服浮涪福袱弗甫撫輔俯釜斧脯腑府腐赴副覆賦復傅付阜父腹負富訃附婦縛咐噶嘎該改概鈣蓋溉幹甘桿柑竿肝趕感稈敢贛岡剛鋼缸肛綱崗港杠篙臯高膏羔糕搞鎬稿告哥歌擱戈鴿胳疙割革葛格蛤閣隔鉻個各給根跟耕更庚羹埂耿梗工攻功恭龔供躬公宮弓鞏汞拱貢共鉤勾溝茍狗垢構購夠辜菇咕箍估沽孤姑鼓古蠱骨谷股故顧固雇刮瓜剮寡掛褂乖拐怪棺關官冠觀管館罐慣灌貫光廣逛瑰規圭矽歸龜閨軌鬼詭癸桂櫃跪貴劊輥滾棍鍋郭國果裹過哈骸孩海氦亥害駭酣憨邯韓含涵寒函喊罕翰撼捍旱憾悍焊汗漢夯杭航壕嚎豪毫郝好耗號浩呵喝荷菏核禾和何合盒貉閡河涸赫褐鶴賀嘿黑痕很狠恨哼亨橫衡恒轟哄烘虹鴻洪宏弘紅喉侯猴吼厚候後呼乎忽瑚壺葫胡蝴狐糊湖弧虎唬護互滬戶花嘩華猾滑畫劃化話槐徊懷淮壞歡環桓還緩換患喚瘓豢煥渙宦幻荒慌黃磺蝗簧皇凰惶煌晃幌恍謊灰揮輝徽恢蛔回毀悔慧卉惠晦賄穢會燴匯諱誨繪葷昏婚魂渾混豁活夥火獲或惑霍貨禍擊圾基機畸稽積箕肌饑跡激譏雞姬績緝吉極棘輯籍集及急疾汲即嫉級擠幾脊己薊技冀季伎祭劑悸濟寄寂計記既忌際繼紀嘉枷夾佳家加莢頰賈甲鉀假稼價架駕嫁殲監堅尖箋間煎兼肩艱奸緘繭檢柬堿鹼揀撿簡儉剪減薦檻鑒踐賤見鍵箭件健艦劍餞漸濺澗建僵姜將漿江疆蔣槳獎講匠醬降蕉椒礁焦膠交郊澆驕嬌嚼攪鉸矯僥腳狡角餃繳絞剿教酵轎較叫窖揭接皆稭街階截劫節莖睛晶鯨京驚精粳經井警景頸靜境敬鏡徑痙靖竟競凈炯窘揪究糾玖韭久灸九酒廄救舊臼舅咎就疚鞠拘狙疽居駒菊局咀矩舉沮聚拒據巨具距踞鋸俱句懼炬劇捐鵑娟倦眷卷絹撅攫抉掘倔爵桔傑捷睫竭潔結解姐戒藉芥界借介疥誡屆巾筋斤金今津襟緊錦僅謹進靳晉禁近燼浸盡勁荊兢覺決訣絕均菌鈞軍君峻俊竣浚郡駿喀咖卡咯開揩楷凱慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕顆科殼咳可渴克刻客課肯啃墾懇坑吭空恐孔控摳口扣寇枯哭窟苦酷庫褲誇垮挎跨胯塊筷儈快寬款匡筐狂框礦眶曠況虧盔巋窺葵奎魁傀饋愧潰坤昆捆困括擴廓闊垃拉喇蠟臘辣啦萊來賴藍婪欄攔籃闌蘭瀾讕攬覽懶纜爛濫瑯榔狼廊郎朗浪撈勞牢老佬姥酪烙澇勒樂雷鐳蕾磊累儡壘擂肋類淚棱楞冷厘梨犁黎籬貍離漓理李裏鯉禮莉荔吏栗麗厲勵礫歷利傈例俐痢立粒瀝隸力璃哩倆聯蓮連鐮廉憐漣簾斂臉鏈戀煉練糧涼梁粱良兩輛量晾亮諒撩聊僚療燎寥遼潦了撂鐐廖料列裂烈劣獵琳林磷霖臨鄰鱗淋凜賃吝拎玲菱零齡鈴伶羚淩靈陵嶺領另令溜琉榴硫餾留劉瘤流柳六龍聾嚨籠窿隆壟攏隴樓婁摟簍漏陋蘆盧顱廬爐擄鹵虜魯麓碌露路賂鹿潞祿錄陸戮驢呂鋁侶旅履屢縷慮氯律率濾綠巒攣孿灤卵亂掠略掄輪倫侖淪綸論蘿螺羅邏鑼籮騾裸落洛駱絡媽麻瑪碼螞馬罵嘛嗎埋買麥賣邁脈瞞饅蠻滿蔓曼慢漫謾芒茫盲氓忙莽貓茅錨毛矛鉚卯茂冒帽貌貿麽玫枚梅酶黴煤沒眉媒鎂每美昧寐妹媚門悶們萌蒙檬盟錳猛夢孟瞇醚靡糜迷謎彌米秘覓泌蜜密冪棉眠綿冕免勉娩緬面苗描瞄藐秒渺廟妙蔑滅民抿皿敏憫閩明螟鳴銘名命謬摸摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌謀牟某拇牡畝姆母墓暮幕募慕木目睦牧穆拿哪吶鈉那娜納氖乃奶耐奈南男難囊撓腦惱鬧淖呢餒內嫩能妮霓倪泥尼擬妳匿膩逆溺蔫拈年碾攆撚念娘釀鳥尿捏聶孽嚙鑷鎳涅您檸獰凝寧擰濘牛扭鈕紐膿濃農弄奴努怒女暖虐瘧挪懦糯諾哦歐鷗毆藕嘔偶漚啪趴爬帕怕琶拍排牌徘湃派攀潘盤磐盼畔判叛乓龐旁耪胖拋咆刨炮袍跑泡呸胚培裴賠陪配佩沛噴盆砰抨烹澎彭蓬棚硼篷膨朋鵬捧碰坯砒霹批披劈琵毗啤脾疲皮匹痞僻屁譬篇偏片騙飄漂瓢票撇瞥拼頻貧品聘乒坪蘋萍平憑瓶評屏坡潑頗婆破魄迫粕剖撲鋪仆莆葡菩蒲埔樸圃普浦譜曝瀑期欺棲戚妻七淒漆柒沏其棋奇歧畦崎臍齊旗祈祁騎起豈乞企啟契砌器氣迄棄汽泣訖掐洽牽扡釬鉛千遷簽仟謙乾黔錢鉗前潛遣淺譴塹嵌欠歉槍嗆腔羌墻薔強搶橇鍬敲悄橋瞧喬僑巧鞘撬翹峭俏竅切茄且怯竊欽侵親秦琴勤芹擒禽寢沁青輕氫傾卿清擎晴氰情頃請慶瓊窮秋丘邱球求囚酋泅趨區蛆曲軀屈驅渠取娶齲趣去圈顴權醛泉全痊拳犬券勸缺炔瘸卻鵲榷確雀裙群然燃冉染瓤壤攘嚷讓饒擾繞惹熱壬仁人忍韌任認刃妊紉扔仍日戎茸蓉榮融熔溶容絨冗揉柔肉茹蠕儒孺如辱乳汝入褥軟阮蕊瑞銳閏潤若弱撒灑薩腮鰓塞賽三三傘散桑嗓喪搔騷掃嫂瑟色澀森僧莎砂殺剎沙紗傻啥煞篩曬珊苫杉山刪煽衫閃陜擅贍膳善汕扇繕墑傷商賞晌上尚裳梢捎稍燒芍勺韶少哨邵紹奢賒蛇舌舍赦攝射懾涉社設砷申呻伸身深娠紳神沈審嬸甚腎慎滲聲生甥牲升繩省盛剩勝聖師失獅施濕詩屍虱十石拾時什食蝕實識史矢使屎駛始式示士世柿事拭誓逝勢是嗜噬適仕侍釋飾氏市恃室視試收手首守壽授售受瘦獸蔬樞梳殊抒輸叔舒淑疏書贖孰熟薯暑曙署蜀黍鼠屬術述樹束戍豎墅庶數漱恕刷耍摔衰甩帥栓拴霜雙爽誰水睡稅吮瞬順舜說碩朔爍斯撕嘶思私司絲死肆寺嗣四伺似飼巳松聳慫頌送宋訟誦搜艘擻嗽蘇酥俗素速粟僳塑溯宿訴肅酸蒜算雖隋隨綏髓碎歲穗遂隧祟孫損筍蓑梭唆縮瑣索鎖所塌他它她塔獺撻蹋踏胎苔擡臺泰酞太態汰坍攤貪癱灘壇檀痰潭譚談坦毯袒碳探嘆炭湯塘搪堂棠膛唐糖倘躺淌趟燙掏濤滔絳萄桃逃淘陶討套特藤騰疼謄梯剔踢銻提題蹄啼體替嚏惕涕剃屜天添填田甜恬舔腆挑條迢眺跳貼鐵帖廳聽烴汀廷停亭庭挺艇通桐酮瞳同銅彤童桶捅筒統痛偷投頭透凸禿突圖徒途塗屠土吐兔湍團推頹腿蛻褪退吞屯臀拖托脫鴕陀馱駝橢妥拓唾挖哇蛙窪娃瓦襪歪外豌彎灣玩頑丸烷完碗挽晚皖惋宛婉萬腕汪王亡枉網往旺望忘妄威巍微危韋違桅圍唯惟為濰維葦萎委偉偽尾緯未蔚味畏胃餵魏位渭謂尉慰衛瘟溫蚊文聞紋吻穩紊問嗡翁甕撾蝸渦窩我斡臥握沃巫嗚鎢烏汙誣屋無蕪梧吾吳毋武五捂午舞伍侮塢戊霧晤物勿務悟誤昔熙析西硒矽晰嘻吸錫犧稀息希悉膝夕惜熄烯溪汐犀檄襲席習媳喜銑洗系隙戲細瞎蝦匣霞轄暇峽俠狹下廈夏嚇掀鍁先仙鮮纖鹹賢銜舷閑涎弦嫌顯險現獻縣腺餡羨憲陷限線相廂鑲香箱襄湘鄉翔祥詳想響享項巷橡像向象蕭硝霄削哮囂銷消宵淆曉小孝校肖嘯笑效楔些歇蠍鞋協挾攜邪斜脅諧寫械卸蟹懈泄瀉謝屑薪芯鋅欣辛新忻心信釁星腥猩惺興刑型形邢行醒幸杏性姓兄兇胸匈洶雄熊休修羞朽嗅銹秀袖繡墟戌需虛噓須徐許蓄酗敘旭序畜恤絮婿緒續軒喧宣懸旋玄選癬眩絢靴薛學穴雪血勛熏循旬詢尋馴巡殉汛訓訊遜迅壓押鴉鴨呀丫芽牙蚜崖衙涯雅啞亞訝焉咽閹煙淹鹽嚴研蜒巖延言顏閻炎沿奄掩眼衍演艷堰燕厭硯雁唁彥焰宴諺驗殃央鴦秧楊揚佯瘍羊洋陽氧仰癢養樣漾邀腰妖瑤搖堯遙窯謠姚咬舀藥要耀椰噎耶爺野冶也頁掖業葉曳腋夜液壹壹醫揖銥依伊衣頤夷遺移儀胰疑沂宜姨彜椅蟻倚已乙矣以藝抑易邑屹億役臆逸肄疫亦裔意毅憶義益溢詣議誼譯異翼翌繹茵蔭因殷音陰姻吟銀淫寅飲尹引隱印英櫻嬰鷹應纓瑩螢營熒蠅迎贏盈影穎硬映喲擁傭臃癰庸雍踴蛹詠泳湧永恿勇用幽優悠憂尤由郵鈾猶油遊酉有友右佑釉誘又幼迂淤於盂榆虞愚輿余俞逾魚愉渝漁隅予娛雨與嶼禹宇語羽玉域芋郁籲遇喻峪禦愈欲獄育譽浴寓裕預豫馭鴛淵冤元垣袁原援轅園員圓猿源緣遠苑願怨院曰約越躍鑰嶽粵月悅閱耘雲鄖勻隕允運蘊醞暈韻孕匝砸雜栽哉災宰載再在咱攢暫贊贓臟葬遭糟鑿藻棗早澡蚤躁噪造皂竈燥責擇則澤賊怎增憎曾贈紮喳渣劄軋鍘閘眨柵榨咋乍炸詐摘齋宅窄債寨瞻氈詹粘沾盞斬輾嶄展蘸棧占戰站湛綻樟章彰漳張掌漲杖丈帳賬仗脹瘴障招昭找沼趙照罩兆肇召遮折哲蟄轍者鍺蔗這浙珍斟真甄砧臻貞針偵枕疹診震振鎮陣蒸掙睜征猙爭怔整拯正政幀癥鄭證芝枝支吱蜘知肢脂汁之織職直植殖執值侄址指止趾只旨紙誌摯擲至致置幟峙制智秩稚質炙痔滯治窒中盅忠鐘衷終種腫重仲眾舟周州洲謅粥軸肘帚咒皺宙晝驟珠株蛛朱豬諸誅逐竹燭煮拄矚囑主著柱助蛀貯鑄築住註祝駐抓爪拽專磚轉撰賺篆樁莊裝妝撞壯狀椎錐追贅墜綴諄準捉拙卓桌琢茁酌啄著灼濁茲咨資姿滋淄孜紫仔籽滓子自漬字鬃棕蹤宗綜總縱鄒走奏揍租足卒族祖詛阻組鉆纂嘴醉最罪尊遵昨左佐柞做作坐座錒噯嬡璦曖靄諳銨鵪媼驁鰲鈀唄鈑鴇齙鵯賁錛蓽嗶潷鉍篳蹕芐緶籩驃颮飆鏢鑣鰾儐繽檳殯臏鑌髕鬢稟餑鈸鵓鈽驂黲惻鍤儕釵囅諂讖蕆懺嬋驏覘禪鐔倀萇悵閶鯧硨傖諶櫬磣齔棖檉鋮鐺飭鴟銃儔幬讎芻絀躕釧愴綞鶉輟齪鶿蓯驄樅輳攛銼鹺噠韃駘紿殫賧癉簞讜碭襠燾鐙糴詆諦綈覿鏑巔鈿癲銚鯛鰈鋌銩崠鶇竇瀆櫝牘篤黷籪懟鐓燉躉鐸諤堊閼軛鋨鍔鶚顎顓鱷誒邇鉺鴯鮞鈁魴緋鐨鯡僨灃鳧駙紱紼賻麩鮒鰒釓賅尷搟紺戇睪誥縞鋯紇鎘潁亙賡綆鯁詬緱覯詁轂鈷錮鴣鵠鶻鴰摑詿摜鸛鰥獷匭劌媯檜鮭鱖袞緄鯀堝咼幗槨蟈鉿闞絎頡灝顥訶闔蠣黌訌葒閎鱟滸鶘驊樺鏵奐繯鍰鯇鰉詼薈噦澮繢琿暉諢餛閽鈥鑊訐詰薺嘰嚌驥璣覬齏磯羈蠆躋霽鱭鯽郟浹鋏鎵蟯諫縑戔戩瞼鶼筧鰹韉絳韁撟嶠鷦鮫癤頜鮚巹藎饉縉贐覲剄涇逕弳脛靚鬮鳩鷲詎屨櫸颶鉅鋦窶齟錈鐫雋譎玨皸剴塏愾愷鎧鍇龕閌鈧銬騍緙軻鈳錁頷齦鏗嚳鄶噲膾獪髖誆誑鄺壙纊貺匱蕢憒聵簣閫錕鯤蠐崍徠淶瀨賚睞錸癩籟嵐欖斕鑭襤閬鋃嘮嶗銠鐒癆鰳誄縲儷酈壢藶蒞蘺嚦邐驪縭櫪櫟轢礪鋰鸝癘糲躒靂鱺鱧蘞奩瀲璉殮褳襝鰱魎繚釕鷯藺廩檁轔躪綾欞蟶鯪瀏騮綹鎦鷚蘢瀧瓏櫳朧礱僂蔞嘍嶁鏤瘺耬螻髏壚擼嚕閭瀘淥櫨櫓轤輅轆氌臚鸕鷺艫鱸臠孌欒鸞鑾圇犖玀濼欏腡鏍櫚褸鋝嘸嘜嬤榪勱縵鏝顙鰻麼捫燜懣鍆羋謐獼禰澠靦黽緲繆閔緡謨驀饃歿鏌鉬鐃訥鈮鯢輦鯰蔦裊隉蘗囁顢躡苧嚀聹儂噥駑釹儺謳慪甌蹣皰轡紕羆鈹諞駢縹嬪釙鏷鐠蘄騏綺榿磧頎頏鰭僉蕁慳騫繾槧鈐嬙檣戧熗錆鏘鏹羥蹌誚譙蕎繰磽蹺愜鍥篋鋟撳鯖煢蛺巰賕蟣鰍詘嶇闃覷鴝詮綣輇銓闋闕愨蕘嬈橈飪軔嶸蠑縟銣顰蜆颯毿糝繅嗇銫穡鎩鯊釃訕姍騸釤鱔坰殤觴厙灄畬詵諗瀋謚塒蒔弒軾貰鈰鰣綬攄紓閂鑠廝駟緦鍶鷥藪餿颼鎪謖穌誶蓀猻嗩脧闥鉈鰨鈦鮐曇鉭錟頇儻餳鐋鏜韜鋱緹鵜闐糶齠鰷慟鈄釷摶飩籜鼉媧膃紈綰輞諉幃闈溈潿瑋韙煒鮪閿萵齷鄔廡憮嫵騖鵡鶩餼鬩璽覡硤莧薟蘚峴獫嫻鷴癇蠔秈躚薌餉驤緗饗嘵瀟驍綃梟簫褻擷紲纈陘滎饈鵂詡頊諼鉉鏇謔澩鱈塤潯鱘埡婭椏氬厴贗儼兗讞懨閆釅魘饜鼴煬軺鷂鰩靨謁鄴曄燁詒囈嶧飴懌驛縊軼貽釔鎰鐿瘞艤銦癮塋鶯縈鎣攖嚶瀅瀠瓔鸚癭頦罌鏞蕕銪魷傴俁諛諭蕷崳飫閾嫗紆覦歟鈺鵒鷸齬櫞鳶黿鉞鄆蕓惲慍紜韞殞氳瓚趲鏨駔賾嘖幘簀譖繒譫詔釗謫輒鷓湞縝楨軫賑禎鴆諍崢鉦錚箏騭櫛梔軹輊贄鷙螄縶躓躑觶鍾紂縐佇櫧銖囀饌顳騅縋諑鐲諮緇輜貲眥錙齜鯔傯諏騶鯫鏃纘躦鱒訁譾郤猛氹阪壟堖垵墊檾蕒葤蓧蒓菇槁摣咤唚哢噝噅撅劈謔襆嶴脊仿僥獁麅餘餷饊饢楞怵懍爿漵灩混濫瀦淡寧糸絝緔瑉梘棬案橰櫫軲軤賫膁腖飈糊煆溜湣渺碸滾瞘鈈鉕鋣銱鋥鋶鐦鐧鍩鍀鍃錇鎄鎇鎿鐝鑥鑹鑔穭鶓鶥鸌癧屙瘂臒襇繈耮顬蟎麯鮁鮃鮎鯗鯝鯴鱝鯿鰠鰵鱅鞽韝齇';
        },
        simp(cc) {
            let str = '';
            for (let i = 0; i < cc.length; i++) {
                if (this.ftPYStr().indexOf(cc.charAt(i)) != -1)
                    str += this.simpPYStr().charAt(this.ftPYStr().indexOf(cc.charAt(i)));
                else
                    str += cc.charAt(i);
            }
            return str;
        },
        trad(cc) {
            let str = '';
            for (let i = 0; i < cc.length; i++) {
                if (this.simpPYStr().indexOf(cc.charAt(i)) != -1)
                    str += this.ftPYStr().charAt(this.simpPYStr().indexOf(cc.charAt(i)));
                else
                    str += cc.charAt(i);
            }
            return str;
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
                // if (String(start.year) != now.getFullYear()) {
            let events = []
            let calYear = String(start.year)
            for (item of this.eventVoice) {
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
                        color: this.setVoiceColor(item.isMain, item.isSup, todayBir),
                    })

                }
            }
            this.eventVoice = events
                // }
        },
        setVoiceColor(isMain, isSup, todayBir) {
            if (todayBir) {
                return 'deep-purple accent-1'
            }
            if (isMain > 100) {
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
                    if (item.MAL.voices) {
                        let data = item.MAL.voices.filter(vo => vo.voice == event.voice)
                        if (data.length > 0)
                            return true
                    } else {
                        return false
                    }
                })
                let names = []
                for (item of anime) {
                    let voice = item.MAL.voices.find(vo => vo.voice == event.voice)
                    if (item.Gamer && item.Gamer.title) {
                        names.push({ 'title': item.Gamer.title, 'img': voice.img != null ? voice.img : '' })
                    } else if (item.BGM && item.BGM.cn_name) {
                        names.push({ 'title': item.BGM.cn_name, 'img': voice.img != null ? voice.img : '' })
                    } else if (item.MAL.jp_name) {
                        names.push({ 'title': item.MAL.jp_name, 'img': voice.img != null ? voice.img : '' })
                    } else {
                        names.push({ 'title': item.MAL.titlee, 'img': voice.img != null ? voice.img : '' })
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
    }, //methonds
});