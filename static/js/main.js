// Vue.config.devtools = true;

let vue = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    components: {
        rating: {
            props: ['item', 'website', 'bScore'],
            template: `<div>
                                <v-chip :color="setChipColor(bScore,website)" dark>
                                <span v-if="!!!bScore">票數過少</span>
                                <span v-else>{{ bScore }}</span>
                                </v-chip>
                                <br />
                                <a v-if="item" class="original" @click="toAnime(website,item.id)"><br />{{!!item.score ? item.score : 0 }}<br /> ({{!!item.votes? item.votes : 0 }})
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
        //rawUrl: 'https://tsuiokuyo.netlify.app/all.save.json',
        rawUrl: 'https://raw.githubusercontent.com/Tsuiokuyo/tsuiokuyo.netlify.com/master/static/all.save.json',
        //rawUrl: 'https://cdn.jsdelivr.net/gh/tsuiokuyo/tsuiokuyo.netlify.com@master/static/data/all.save.json',
        rawData: [],
        windowWidth: window.innerWidth,
        search: '',
        isLoading: true,
        page: 1,
        itemsPerPage: 10,
        itemsPerPages: [5, 10, 30, 50, 100],
        panel: 1,
        pageCount: 1,
        year: '',
        year2: '',
        rank1: '',
        rank2: '',
        diff: '',
        true: true,
        selectedImage: false,
        tab: '',
        selectYears: ['等於', '大於', '小於', '介於'],
        selYear: '等於',
        selectTypes: ['ALL', 'TV', 'MOVIE', 'OVA'],
        selType: 'ALL',
        noResultsText: '該條件查無任何資料，可能是沒有收錄進來，請嘗試其他條件',
        loadingText: '讀取中，除非網速慢，不然初次進入應該不會超過10秒啦...',
        randomTen: [],
        count: undefined,
        overlay: false,
        leimuUrl: 'https://cdn.jsdelivr.net/gh/tsuiokuyo/tsuiokuyo.netlify.com@master/static/image/leimuA.png',
        lamuUrl: 'https://cdn.jsdelivr.net/gh/tsuiokuyo/tsuiokuyo.netlify.com@master/static/image/lamuA.png',
        destroy: true,
        disabledBgImage: false,
        // disabledCovImage: false,
        dialog: {},
        genreList: [],
        genreSel: [],
        badges: {},
        badgesDef: {},
        isSearch: false,
        moelong: {},
        gnn: {},
        bangumiDisable: false,

    },
    computed: {
        listenChange() {
            const {
                search,
                year,
                selYear,
                selType,
                itemsPerPage,
                genreSel
            } = this
            return {
                search,
                year,
                selYear,
                selType,
                itemsPerPage,
                genreSel
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
                    let bYear = true;
                    let bSelType = true;
                    let generCheck = true
                    let rank = true;
                    let difference = true;
                    if (this.year && this.year > 1900) {
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
                    }
                    if (this.rank1 && this.rank2) {
                        rank = (parseInt(item.rank) >= parseInt(this.rank1) && parseInt(item.rank) <= parseInt(this.rank2))
                    } else if (this.rank1) {
                        rank = parseInt(item.rank) >= parseInt(this.rank1)
                    } else if (this.rank2) {
                        rank = parseInt(item.rank) <= parseInt(this.rank2)
                    }

                    if (this.diff) {
                        if (item.Gamer && item.Gamer.bayesian_score > 0) {
                            function comput(a, b, range) {
                                if (b == null) return false;
                                b = b.bayesian_score > 0 ? b.bayesian_score : false
                                return Math.abs(parseFloat(a) - parseFloat(b)) >= parseFloat(range)
                            }

                            let gScore = item.Gamer.bayesian_score
                            difference = Math.abs(parseFloat(gScore) - parseFloat(item.MAL.score > 0 ? item.MAL.score : false)) >= parseFloat(this.diff) ||
                                comput(gScore, !this.bangumiDisable ? item.BGM : false, this.diff) ||
                                comput(gScore, item.Anikore, this.diff) ||
                                comput(gScore, item.AniList, this.diff) ||
                                comput(gScore, item.AnimePlanetCom, this.diff) ||
                                comput(gScore, item.ANN, this.diff) ||
                                comput(gScore, item.anisearch, this.diff) ||
                                comput(gScore, item.notifyMoe, this.diff) ||
                                comput(gScore, item.trakt, this.diff) ||
                                comput(gScore, item.livechart, this.diff)

                            // Math.abs(parseInt(item.Gamer.bayesian_score) - parseInt(null != item.annict ? item.annict.bayesian_score : 0)) >= this.diff||
                            // Math.abs(parseInt(item.Gamer.bayesian_score) - parseInt(null != item.sakuhindb ? item.sakuhindb.bayesian_score : 0)) >= this.diff||
                        } else {
                            return false;
                        }
                    }
                    if (this.selType != 'ALL') {
                        bSelType = item.MAL.type.toUpperCase() == this.selType.toUpperCase()
                    }
                    if (this.genreList) {
                        for (gen of this.genreSel) {
                            generCheck = item.MAL.genres.find(element => element == gen)
                            if (!generCheck) {
                                return false
                            }
                        }
                    }
                    return bYear && bSelType && generCheck && rank && difference
                },
            }, {
                text: '簡中名稱(搜尋用)',
                value: 'BGM.cn_name',
                align: ' d-none'
            }, {
                text: '日文名稱(搜尋用)',
                value: 'MAL.jp_name',
                align: ' d-none'
            }, {
                text: '英文名稱(搜尋用)',
                value: 'MAL.en_name',
                align: ' d-none'
            }, {
                text: '繁中名稱(搜尋用)',
                value: 'Gamer.title',
                align: ' d-none'
            }, {
                text: '算數平均值',
                align: 'center',
                value: 'score',
                filterable: false,
                width: '8%'
            }, {
                text: '巴哈評分',
                value: 'gamer',
                align: 'center',
                filterable: false,
                width: '5%',
            }, {
                text: 'MyAnimeList評分',
                value: 'mal',
                align: 'center',
                filterable: false,
                width: '5%',
            }, {
                text: 'bangumi評分',
                value: 'bgm',
                align: 'center',
                filterable: false,
                width: '5%',
            }, {
                text: 'Anikore評分',
                value: 'anikore',
                align: 'center',
                filterable: false,
                width: '5%',
            }, {
                text: 'AniList評分',
                value: 'anilist',
                align: 'center',
                filterable: false,
                width: '5%',
            }, {
                text: 'AnimePlanetCom評分',
                value: 'animeplanetcom',
                align: 'center',
                filterable: false,
                width: '5%',
            }, {
                text: 'AnimeNewsNetwork評分',
                value: 'ann',
                align: 'center',
                filterable: false,
                width: '5%',
            }, {
                text: 'anisearch評分',
                value: 'anisearch',
                align: 'center',
                filterable: false,
                width: '5%',
            }, {
                text: 'kitsu評分',
                value: 'kitsu',
                align: 'center',
                filterable: false,
                width: '5%',
            }, {
                text: 'notifyMoe評分',
                value: 'notifymoe',
                align: 'center',
                filterable: false,
                width: '5%',
            }, {
                text: 'trakt評分',
                value: 'trakt',
                align: 'center',
                filterable: false,
                width: '5%',
            }, {
                text: 'livechart評分',
                value: 'livechart',
                align: 'center',
                filterable: false,
                width: '5%',
            }, {
                text: 'annict評分',
                value: 'annict',
                align: 'center',
                filterable: false,
                width: '5%',
            }, {
                text: 'sakuhindb評分',
                value: 'sakuhindb',
                align: 'center',
                filterable: false,
                width: '5%',
            }, ]
        },
    },
    filters: {
        onlineNameFormat(name) {
            switch (name) {
                case 'bahamut':
                    return '巴哈姆特';
                case 'bilibili':
                    return '哔哩哔哩';
                case 'disney':
                    return '迪士尼+'
                case 'friday':
                    return 'friDay影音'
                case 'hamivideo':
                    return 'HamiVideo'
                case 'kktv':
                    return 'KKTV'
                case 'line':
                    return 'LINE TV'
                case 'litv':
                    return 'LiTV'
                case 'myvideo':
                    return 'myVideo'
                case 'netflix':
                    return 'Netflix'
                case 'yahoo':
                    return 'Yahoo! TV'
                case 'ani-one asia':
                    return 'Ani-One YouTube'
                case 'catchplay':
                    return 'Catchplay'
                case 'cht':
                    return '中華電信MOD'
                case 'iqiyi':
                    return '愛奇藝'
                case 'muse':
                    return '木棉花 Youtube'
                case 'googleplay':
                    return 'Google Play';
                case 'animelog':
                    return 'Animelog Youtube'
                case 'crunchyroll':
                    return 'crunchyroll(英文)'
            }
            return name;
        },
        genreToCht(gen) {
            let i = vue.engGen().indexOf(gen)
            if (i != -1) {
                return vue.chtGen()[i]
            } else {
                return gen
            }
        }

    },
    watch: {
        listenChange() {
            this.badges = {}
            let filters = this.$refs.tb.$children[0].filteredItems
            for (item of filters) {
                for (gen of item.MAL.genres) {
                    this.badges[gen] = ++this.badges[gen] || 1
                }
            }
            if (this.search || this.year) {
                this.badges = {}
            } else {
                if (this.genreSel.length == 0) {
                    this.badges = this.badgesDef
                    this.isSearch = false
                } else {
                    this.isSearch = true
                }
            }
            this.destroyTable()
        }
    },
    async created() {
        this.rawData = await fetch(
            this.rawUrl,
        ).then((res) => res.json());
        vue.isLoading = false;
        this.pageCount = Math.ceil(this.rawData.length / this.itemsPerPage)
        this.getRandomArray();


        let newMoes = []
            // https://thingproxy.freeboard.io/fetch/
            // http://www.whateverorigin.org/get?url=
            // https://api.allorigins.win/get?url=
            // 11/28
        const moelongUrl = 'https://tsuiokuyo.herokuapp.com/https://www.moelong.com/moelongnews/feed';
        fetch(moelongUrl)
            .then(response =>
                response.text()
            )
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = data.querySelectorAll("item");
                items.forEach(el => {
                    let date = new Date(el.getElementsByTagName('pubDate')[0].textContent)
                    var year = date.toLocaleString("default", {
                        year: "numeric"
                    });
                    var month = date.toLocaleString("default", {
                        month: "numeric"
                    });
                    var day = date.toLocaleString("default", {
                        day: "numeric"
                    });
                    var formattedDate = '(' + year + '' + month + '' + day + ')';
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
                            'title': '已在此網站待了一小時，已停止新聞迴圈'
                        }
                    }, 3600000);

                } else {
                    this.moelong = {
                        'title': '萌朧動漫情報網 RSS撈取失敗，暫停使用，反正也沒甚麼人會看這些資訊'
                    }
                }

            })



        let newGnns = []

        const gnnUrl = 'https://tsuiokuyo.herokuapp.com/https://gnn.gamer.com.tw/rss.xml';

        fetch(gnnUrl)
            .then(response =>
                response.text()
            )
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = data.querySelectorAll("item");
                items.forEach(el => {
                    let date = new Date(el.getElementsByTagName('pubDate')[0].textContent)
                    var year = date.toLocaleString("default", {
                        year: "numeric"
                    });
                    var month = date.toLocaleString("default", {
                        month: "numeric"
                    });
                    var day = date.toLocaleString("default", {
                        day: "numeric"
                    });
                    var formattedDate = '(' + year + '' + month + '' + day + ')';

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
                            'title': '已在此網站待了一小時，已停止新聞迴圈'
                        }
                    }, 3600000);

                } else {
                    this.gnn = {
                        'title': '巴哈GNN新聞 RSS撈取失敗，暫停使用，反正也沒甚麼人會看這些資訊'
                    }
                }

            })



        this.$nextTick(function() {
            let genres = []
            for (item of this.rawData) {
                if (!'name' in item.MAL) {
                    break;
                }
                for (gen of item.MAL.genres) {
                    this.badges[gen] = ++this.badges[gen] || 1
                }

                genres = genres.concat(item.MAL.genres)
            }
            this.badgesDef = this.badges
            genres = [...new Set(genres.sort())]


            this.genreList = genres

        })

        // if (this.moelong == undefined) {
        //     this.moelong = { 'title': '萌朧動漫情報網 RSS接收異常，暫停使用，反正也沒甚麼人會看這些資訊' }
        // }


    },
    async mounted() {}, //mounted
    updated() {},
    methods: {
        setRankColor(i) {
            let pitch = 255 / this.rawData.length;
            pitch = 255 - (pitch * i)
            return 'color: rgb(255,' + pitch + ',0);';
        },
        /*setBackground(item) {
            bottoming = 'https://cdn.jsdelivr.net/gh/tsuiokuyo/tsuiokuyo.netlify.com@master/static/image/background.png'
            
            if (null != item.anisearch && null != item.anisearch.coverS) {
                return 'background-image:url(' + bottoming + '),url(https://cdn.anisearch.com/images/anime/header/' + item.anisearch.coverS + '.webp );background-blend-mode: luminosity;background-size:cover;'
            } else if (null != item.kitsu && null != item.kitsu.coverT) {
                return 'background-image:url(' + bottoming + '),url(https://media.kitsu.io/anime/' + item.kitsu.coverT + ' );background-Color:rgba(0,0,0,.8);background-blend-mode: luminosity;background-size:cover;'
            } else if (null != item.trakt && null != item.trakt.coverS) {
                return 'background-image:url(' + bottoming + '),url(https://walter.trakt.tv/images/shows/000/' + item.trakt.coverS + ' );background-blend-mode: luminosity;background-size:cover;'
            } else {
                return 'background-image:url(' + bottoming + ');background-size:cover;'
            }
        },*/
        setCover(item, lazy) {
            // if (this.disabledCovImage) {
            //     return ''
            // }
            if (lazy) {
                if (null != item.BGM) {
                    return "http://lain.bgm.tv/pic/cover/g/" + item.BGM.image + ".jpg"
                } else {
                    if (item.MAL.image.length > 50) {
                        return item.MAL.image
                    }
                    return "https://cdn.myanimelist.net/images/anime/" + item.MAL.image
                }
            } else {
                if (null != item.BGM) {
                    return "http://lain.bgm.tv/pic/cover/c/" + item.BGM.image + ".jpg"
                } else {
                    if (item.MAL.image.length > 50) {
                        return item.MAL.image
                    }
                    return "https://cdn.myanimelist.net/images/anime/" + item.MAL.image
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
            this.$nextTick(function() {
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
                this.randomTen = shuffled.slice(min)
            })
        },
        randomListTitle(item) {
            if (null != item.Gamer) {
                return item.Gamer.title
            } else if (null != item.BGM) {
                return item.BGM.cn_name
            } else {
                return item.MAL.jp_name
            }
        },
        onlineList(item) {
            let online = new Object();
            if (null != item.trakt && !!item.trakt.online) {
                for (const [key, value] of Object.entries(item.trakt.online)) {
                    online[key] = 'https://trakt.tv/watchnow/' + value
                }
            }
            if (null != item.Gamer && !!item.Gamer.online) {
                online['Bahamut Anime Crazy'] = item.Gamer.online
            }
            if (null != item.livechart && !!item.livechart.online) {
                online = item.livechart.online;
            }

            let format = new Object();
            if (!!online) {
                for (let [key, value] of Object.entries(online)) {
                    if (key.toLowerCase().indexOf('tencent') != -1) {
                        break;
                    }
                    [key, value] = this.switchName(key, value)
                        // console.log(key, value)
                    format[key] = value
                }
            }

            return format;
        },
        switchName(name, id) {
            name = name.toLowerCase()
            if (id.indexOf('trakt.tv') != -1) {
                return [name, id]
            } else if (name.indexOf('bahamut') != -1) {
                return ['bahamut', 'https://ani.gamer.com.tw/animeVideo.php?sn=' + id]
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
            }
            // else if (name.indexOf('amazon') != -1) {
            //     return [amazon,id]
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
                return 'https://cdn.jsdelivr.net/gh/tsuiokuyo/tsuiokuyo.netlify.com@master/static/image/lamuA.png'
            } else {
                return 'https://cdn.jsdelivr.net/gh/tsuiokuyo/tsuiokuyo.netlify.com@master/static/image/lamuB.png'
            }
        },
        leimu(value) {
            if (value == 'A') {
                return 'https://cdn.jsdelivr.net/gh/tsuiokuyo/tsuiokuyo.netlify.com@master/static/image/leimuA.png'
            } else {
                return 'https://cdn.jsdelivr.net/gh/tsuiokuyo/tsuiokuyo.netlify.com@master/static/image/leimuB.png'
            }
        },
        getBackground(item) {
            if (!this.disabledBgImage) {
                if (null != item.anisearch && null != item.anisearch.coverS) {
                    return 'https://cdn.anisearch.com/images/anime/header/' + item.anisearch.coverS + '.webp';
                } else if (null != item.trakt && null != item.trakt.coverS) {
                    return 'https://walter.trakt.tv/images/shows/000/' + item.trakt.coverS
                } else if (null != item.kitsu && null != item.kitsu.coverT) {
                    return 'https://media.kitsu.io/anime/' + item.kitsu.coverT;
                }
            }
            return ''
        },
        setBackgroundLazy(entries, observer, isIntersecting) {
            let bg = 'https://cdn.jsdelivr.net/gh/tsuiokuyo/tsuiokuyo.netlify.com@master/static/image/background.png'
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
        getYoutube(id) {
            return 'https://www.youtube.com/embed/' + id + '?enablejsapi=1&wmode=opaque&autoplay=1'
        },
        engGen() {
            return ['Action', 'Adult Cast', 'Adventure', 'Anthropomorphic', 'Avant Garde', 'Award Winning', 'Boys Love', 'CGDCT', 'Childcare', 'Combat Sports', 'Comedy', 'Crossdressing', 'Delinquents', 'Detective', 'Drama', 'Ecchi', 'Educational', 'Erotica', 'Fantasy', 'Gag Humor', 'Girls Love', 'Gore', 'Gourmet', 'Harem', 'High Stakes Game', 'Historical', 'Horror', 'Idols (Female)', 'Idols (Male)', 'Isekai', 'Iyashikei', 'Love Polygon', 'Magical Sex Shift', 'Mahou Shoujo', 'Martial Arts', 'Mecha', 'Medical', 'Military', 'Music', 'Mystery', 'Mythology', 'Organized Crime', 'Otaku Culture', 'Parody', 'Performing Arts', 'Pets', 'Psychological', 'Racing', 'Reincarnation', 'Reverse Harem', 'Romance', 'Romantic Subtext', 'Samurai', 'School', 'Sci-Fi', 'Showbiz', 'Slice of Life', 'Space', 'Sports', 'Strategy Game', 'Super Power', 'Supernatural', 'Survival', 'Suspense', 'Team Sports', 'Time Travel', 'Vampire', 'Video Game', 'Visual Arts', 'Workplace']
        },
        chtGen() {
            return ['動作', '成年主角', '冒險', '擬人化', '前衛', '曾經得獎', '耽美', '純女角', '育兒', '格鬥運動', '喜劇', '異性裝扮', '不良', '偵探', '劇情', 'H', '教育', '色情', '奇幻', '惡作劇幽默', '百合', '血腥', '美食', '後宮', '高風險遊戲', '歷史', '恐怖', '偶像(女性)', '偶像(男性)', '異世界', '療癒', '多角戀', '性轉', '魔法少女', '武術', '機甲', '醫療', '軍事', '音樂', '神秘', '神話', '組織犯罪', '宅文化', '惡搞', '表演藝術', '寵物', '心理', '競速', '異世界重生', '乙女', '浪漫', '浪漫潛台詞', '武士', '學園', '科幻', '娛樂圈', '日常', '太空', '體育', '策略', '超能力', '超自然力量', '生存', '懸疑', '團隊運動', '時間旅行', '吸血鬼', '電子遊戲', '視覺藝術', '職場']
        },
    }, //methonds
});