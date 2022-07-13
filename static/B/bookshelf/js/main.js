var animationSpeed = 750;
var library = [];

$(document).ready(function(){
    fillLibrary();
    attachAnimations();
});

/* -----------------------------------------------------------------------------
    FILL PAGE HTML
    ---------------------------------------------------------------------------*/
    function fillLibrary() {
        assembleData();
        var classlist = ['left-side first','left-side','left-side','right-side','right-side','right-side last'];
        for (i=0; i < library.length; i++) {
            var book = library[i];
            // add html for current book
            var html = '<li class="book ' + classlist[0] + '">';
            html += '<div class="cover"><img src="' + book.cover + '" /></div>';
            html += '<div class="summary">';
            html += '<h1><center>' + book.title + '</center></h1>';
            html += '<a align="right"><h2>' + book.author + '</h2></a>';
            html += '<p>' + book.abstract + '</p>';
            html += '<p>' + book.button + '</p>';
            html += '</div></li>';

            $('.library').append(html);
            // shift the classlist array for the next iteration
            var cn = classlist.shift();
            classlist.push(cn);

        }
    }
/* -----------------------------------------------------------------------------
    ANIMATION
    ---------------------------------------------------------------------------*/
    function attachAnimations() {
        $('.book').click(function(){
            if (!$(this).hasClass('selected')) {
                selectAnimation($(this));
            }
        });
        $('.book .cover').click(function(){
            if ($(this).parent().hasClass('selected')) {
             deselectAnimation($(this).parent());
         }
     });
    }

    function selectAnimation(obj) {
        obj.addClass('selected');
    // elements animating
    var cover = obj.find('.cover');
    var image = obj.find('.cover img');
    var library = $('.library');
    var summaryBG = $('.overlay-summary');
    var summary = obj.find('.summary');
    // animate book cover
    cover.animate({
        width: '300px',
        height: '468px'
    }, {
        duration: animationSpeed
    });
    image.animate({
        width: '280px',
        height: '448px',
        borderWidth: '10px'
    },{
        duration: animationSpeed
    });
    // add fix if the selected item is in the bottom row
    if (isBtmRow()){
      library.css('paddingBottom','234px');
  }
    // slide page so book always appears
    positionTop();
    // add background overlay
    $('.overlay-page').show();
    // locate summary overlay
    var px = overlayVertPos();
    summaryBG.css('left',px);
    // animate summary elements
    var ht = $('.content').height();
    var pos = $('.book.selected').position();
    var start = pos.top + 30; // 10px padding-top on .book + 20px padding of .summary
    var speed = Math.round((animationSpeed/ht) * 450); // 450 is goal height
    summaryBG.show().animate({
        height: ht + 'px'
    },{
        duration: animationSpeed,
        easing: 'linear',
        step: function(now,fx){
            if (now > start && fx.prop === "height"){
                if(!summary.is(':animated') && summary.height() < 450){
                    summary.show().animate({
                        height: '450px'
                    },{
                        duration: speed,
                        easing: 'linear'
                    });
                }
            }
        }
    });
}

function deselectAnimation(obj) {
    // elements animating
    var cover = obj.find('.cover');
    var image = obj.find('.cover img');
    var library = $('.library');
    var summaryBG = $('.overlay-summary');
    var summary = obj.find('.summary');
    // stop summary animation
    summary.stop();
    // animate book cover
    cover.stop().animate({
        width: '140px',
        height: '224px'
    },{
        duration:animationSpeed
    });
    image.stop().animate({
        width: '140px',
        height: '224px',
        borderWidth: '0px'
    },{
        duration: animationSpeed,
        complete: function() {
            obj.removeClass('selected');
        }
    });
    // remove fix for bottom row, if present
    library.stop().animate({
        paddingBottom:'10px'
    },{
        duration: animationSpeed
    });
    // remove background overlay and summary
    var ht = summaryBG.height();
    var pos = $('.book.selected').position();
    var start = pos.top + 480; //10px of top padding + 470px for .summary height + padding
    var speed = Math.round((animationSpeed/ht) * summary.height());
    summaryBG.stop().animate({
        height: '0px'
    },{
        duration: animationSpeed,
        easing: 'linear',
        step: function(now,fx){
            if (now < start && fx.prop === "height"){
                if(!summary.is(':animated') && summary.height() > 0){
                    summary.animate({
                        height: '0px'
                    },{
                        duration: speed,
                        easing: 'linear',
                        complete: function(){
                            summary.hide();
                        }
                    });
                }
            }
        },
        complete: function(){
            $('.overlay-page').hide();
            summary.hide(); // catching this twice to insure for aborted animation
            summaryBG.hide();
        }
    });
}

function isBtmRow() {
    var pos = $('.book.selected').position();
    var libHgt = $('.content').height();
    if (libHgt-pos.top===254) { // this is current height of the book, plus 30 for padding on the book and library
        return true;
    } else {
        return false;
    }
}

function positionTop() {
 var offset = $('.book.selected').offset();
 var bTop = offset.top;
 $('html, body').animate({ scrollTop: bTop }, animationSpeed);
}

function overlayVertPos() { // determines the vertical position for the summary overlay based on selection position
    var pos = $('.book.selected').position();
    switch(pos.left) {
        case 0:
        return '320px';
        case 160:
        return '320px';
        case 320:
        return '480px';
        case 480:
        return '0px';
        case 640:
        return '160px';
        case 800:
        return '160px';
        default:
        return false;
    }
}
/* -----------------------------------------------------------------------------
    BUILD LIBRARY ARRAY
    ---------------------------------------------------------------------------*/
    function Book(cover,title,author,abstract,button) {
        this.cover = cover;
        this.title = title;
        this.author = author;
        this.abstract = abstract;
        this.button = button;
        library.push(this);

    }
    function assembleData() {
        book001 = new Book('cover/001.jpg','晨星月<h1>2920，第一紀元末年</h1>卷一','卡羅瓦克·唐威　著','晨星月，1日，2920年<p></p>哀傷之城，晨風<p></p>　　阿瑪萊西亞躺在她毛皮鋪就的床上，漂游在夢境中。直到陽光從她的窗間直射而入，將房間淺淡的顏色籠罩在一片乳白色的光芒之中','<button class="nbutton" onclick="nbutton(1)">read more</button>');
        book002 = new Book('cover/002.jpg','日曉月<h1>2920，第一紀元末年</h1>卷二','卡羅瓦克·唐威　著','日曉月，3日，2920年<p></p>阿塔尤姆，夏暮島<p></p>　　索薩·希爾看著他的學徒一個接一個浮上奧松樹頂，從它高聳的枝頭上摘下一顆果子或一朵花，隨即以各種優雅的姿勢落回地面。他讚許地點了點頭，享受著這段時光。白色粉刷的希拉班古老塑像矗立在峭壁上，俯瞰著海灣。淡紫色的泊斯卡托花叢在風中來回搖擺。遠方，是海洋，以及阿塔尤姆與夏暮群島主島間若隱若現的邊界。','<button class="nbutton" onclick="nbutton(2)">read more</button>');
        book003 = new Book('cover/003.jpg','初種月<h1>2920，第一紀元末年</h1>卷三','卡羅瓦克·唐威　著','初種月，15日，2920年<p></p>凱爾·蘇維奧，賽瑞迪爾<p></p>　　身處山巒高處，雷曼三世大帝能看到帝都的高塔尖頂，但他知道他離他溫暖的壁爐、他的家很遠很遠。戈拉維烏斯勳爵有一座豪華的莊園，但遠不足以容下整個軍隊。帳篷一座連一座地在山坡上豎起，士兵們爭先恐後地享受勳爵那著名的溫泉。這也難怪，因為冬日的寒意仍殘留在空氣之中。','<button class="nbutton" onclick="nbutton(3)">read more</button>');
        book004 = new Book('cover/004.jpg','惠雨月<h1>2920，第一紀元末年</h1>卷四','卡羅瓦克·唐威　著','雨手月，3日，2920年<p></p>冷港領域，湮滅<p></p>　　索薩·希爾趟著齊腰深的黑水，在宮殿漆黑的大廳中儘可能以最快的速度前進。在他身邊，令人作嘔的膠狀生物受到驚嚇，疾奔入蘆葦叢中；白色的火苗不斷冒出，照亮大廳上層的拱頂，隨即消失；廳中的氣味撲面而至，一時是腐朽的死亡氣息，一時又是甜膩的香水氣味。他曾數次拜訪過湮滅界域中的魔神們，但每一次，都有一些不同的東西等待著。','<button class="nbutton" onclick="nbutton(4)">read more</button>');
        book005 = new Book('cover/005.jpg','次種月<h1>2920，第一紀元末年</h1>卷五','卡羅瓦克·唐威　著','次種月，10日，2920年<p></p>帝都，賽瑞迪爾<p></p>　　“陛下，”大領主貝西多·夏爾打開自己房間的門，微微一笑。“最近我沒有見到您呢。我想，您大概是像您可愛的瑞嘉一樣，身體有點……不適啊。”','<button class="nbutton" onclick="nbutton(5)">read more</button>');
        book006 = new Book('cover/006.jpg','年中月<h1>2920，第一紀元末年</h1>卷六','卡羅瓦克·唐威　著','年中月，2日，2920年<p></p>石樹城，晨風<p></p>　　“帝國軍在南方集結，”凱索說，“他們全部著重甲，距艾德·尤瓦爾和寇隆那提湖有兩週行程。”','<button class="nbutton" onclick="nbutton(6)">read more</button>');
        book007 = new Book('cover/007.jpg','日高月<h1>2920，第一紀元末年</h1>卷七','卡羅瓦克·唐威　著','日高月，4日，2920年<p></p>帝都，賽瑞迪爾<p></p>　　雷曼三世大帝和他的大領主貝西多·夏爾在帝國花園中漫步。遍布雕塑和噴泉的北花園很對皇帝的胃口，尤其它還是炎熱的夏季中，整個城市最涼爽的地方。他們所過之處，花壇中盛開著樸素的藍白和綠色花朵。','<button class="nbutton" onclick="nbutton(7)">read more</button>');
        book008 = new Book('cover/008.jpg','末種月<h1>2920，第一紀元末年</h1>卷八','卡羅瓦克·唐威　著','末種月，1日，2920年<p></p>哀傷之城，晨風<p></p>　　他們於黃昏時分在公爵的庭院中集結，享受著干樹枝和樹葉燃起的篝火散發出的暖意，以及清香的氣味。零星的火花飛入天空，停留幾秒，隨後消失。','<button class="nbutton" onclick="nbutton(8)">read more</button>');
        book009 = new Book('cover/009.jpg','爐火月<h1>2920，第一紀元末年</h1>卷九','卡羅瓦克·唐威　著','爐火月，2日，2920年<p></p>吉迪安，黑沼澤<p></p>　　塔維亞皇后躺倒在床上，晚夏的熱風猛擊著她房間的窗戶，窗扇一次又一次砸在鐵欄杆上。她對此毫無感覺。她的喉嚨好像著了火一般灼痛，但她仍然無法控制地抽泣著，手中絞著最後一塊掛毯。她的哀號在吉奧維瑟城堡空蕩的廳堂中迴響著，令女僕們停止了洗衣，衛兵們也停止了交談。她的一個侍女爬上狹窄的樓梯來看女主人，但侍衛長祖克站在門口，搖搖頭。','<button class="nbutton" onclick="nbutton(9)">read more</button>');
        book010 = new Book('cover/010.jpg','霜落月<h1>2920，第一紀元末年</h1>卷十','卡羅瓦克·唐威　著','霜落月，10日，2920年<p></p>菲拉蓋斯，高岩<p></p>　　他們面前的生物無意識地眨了眨眼，雙目無神，嘴巴一張一合彷彿在確定它的作用；一長串列埠水從它的毒牙之間滴下垂在了半空。圖婭拉從來沒見到過這種東西，龐大的爬行類，但卻能像人一樣用後肢站立。邁尼斯特拉興奮的拍掌大叫。','<button class="nbutton" onclick="nbutton(10)">read more</button>');
        book011 = new Book('cover/011.jpg','日暮月<h1>2920，第一紀元末年</h1>卷十一','卡羅瓦克·唐威　著','日暮月，2日，2920年<p></p>泰爾阿芴，晨風<p></p>　　“有個人要見你，夜母。”衛兵說道，“是個考斯林部落成員，根據他提交的證明文件，此人是吉德昂帝國要塞屬地黑沼澤的祖克領主。”','<button class="nbutton" onclick="nbutton(11)">read more</button>');
        book012 = new Book('cover/012.jpg','夜星月<h1>2920，第一紀元末年</h1>卷十二','卡羅瓦克·唐威　著','夜星月，1日，2920年<p></p>石樹城，晨風<p></p>　　冬季早晨的太陽光穿過在窗子上的霜，阿瑪萊西亞睜開了他的眼睛。一位老醫師帶著微笑放了一張濕毛巾在她的頭上。在旁邊一張椅子上睡著的是維威克。醫師跑進了一旁的小房間端來一杯水。','<button class="nbutton" onclick="nbutton(12)">read more</button>');
        book013 = new Book('cover/013.jpg','火中舞<h1>卷一</h1>','瓦辛·賈斯　著','場景：賽瑞迪爾帝都<p></p>日期：3紀元397年霜落月7日<p></p>　　似乎皇宮中一直存在阿特里奧斯建築上古議會，一個由負責建造和公正帝國所有建築的職員以及地產代理人所組成的商行。從皇帝瑪格努斯的統治時代到現在，它已經在那裡屹立了250年，一個樸素莊重的大廳錯落於帝都中一個雖小卻高雅的廣場之上。','<button class="nbutton" onclick="nbutton(13)">read more</button>');
        book014 = new Book('cover/014.jpg','火中舞<h1>卷二</h1>','瓦辛·賈斯　著　著','真是一個徹底的損失。就在幾分鐘之內，卡塞·拉特偷走或毀掉了商隊中幾乎所有值錢的東西。德庫姆斯·斯科提希望用於和波茲莫交易的那車木材起先著火了，而後翻入了山谷中。他的衣服和契約被撕成碎片，丟在了泥土和酒的混合物中。當團隊中所有朝聖者、商人和冒險家迎著朝陽收集自己的殘有物品時，他們都哀嘆和哭泣起來。','<button class="nbutton" onclick="nbutton(14)">read more</button>');
        book015 = new Book('cover/015.jpg','火中舞<h1>卷三</h1>','瓦辛·賈斯　著　著','帕斯克大娘消失在了骯髒的洞穴中，那洞穴其實就是她的客棧。一會她拿著一片帶有賈魯斯那熟悉的潦草字跡的紙。德庫姆斯·斯科提拿起它對著透過葉縫的一縷陽光讀了起來。','<button class="nbutton" onclick="nbutton(15)">read more</button>');
        book016 = new Book('cover/016.jpg','火中舞<h1>卷四</h1>','瓦辛·賈斯　著　著','十八個波茲莫和一個賽瑞迪爾帝國建築上古議會前任高級職員離開艾克西羅河，步履艱難地穿過叢林向古老的村莊文迪西出發。對於德庫姆斯·斯科提來說叢林是一個既可怕又陌生的地方。大量爬滿蟲子的樹，讓陽光明媚的早上變得漆黑一片。它們酷似緊握的爪子，好像在有意阻攔他們前進。甚至低矮植物的葉子也帶有惡意的顫動。更糟糕的是帶有這種焦慮情緒的不只有他一個人。他的同行者，逃過虎人襲擊的格雷諾斯和阿賽人，臉上都帶著不加掩飾的恐懼。','<button class="nbutton" onclick="nbutton(16)">read more</button>');
        book017 = new Book('cover/017.jpg','火中舞<h1>卷五</h1>','瓦辛·賈斯　著','“肥皂！森林吃起來很香！向前走！傻子和笨牛！”','<button class="nbutton" onclick="nbutton(17)">read more</button>');
        book018 = new Book('cover/018.jpg','火中舞<h1>卷六</h1>','瓦辛·賈斯　著','德庫姆斯·斯科提坐下來，聽著里奧迪斯·賈魯斯講話。他幾乎不敢相信自己從前在阿特里奧斯建築上古議會的同事變得多麼胖。周圍烤肉開胃的香氣消失了，普利薩拉大廈中所有其他聲音和工藝品都在斯科提眼前不見了，似乎除賈魯斯巨大的形體外什麼也不存在。斯科提不覺得自己容易激動，但當見到那個在霜降月用潦草的書信把他騙出帝都的人時，他感到一股潮水在胸中湧動。','<button class="nbutton" onclick="nbutton(18)">read more</button>');
        book019 = new Book('cover/019.jpg','火中舞<h1>卷七</h1>','瓦辛·賈斯　著','場景：威木省席文納爾<p></p>　　日期：第3紀元日暮月 13日 <p></p>　　曾經試圖承包威木省重建工程的官僚和商人心懷嫉妒地參加這場宴會。他們以不加掩飾的憎恨眼光看著德庫姆斯·斯科提、里奧迪斯·賈魯斯和巴斯。這使得斯科提感到很不舒服，但賈魯斯喜歡這樣。當僕人端上一盤盤烤肉時，賈魯斯倒了一碗賈嘎為斯科提祝酒。','<button class="nbutton" onclick="nbutton(19)">read more</button>');
        book020 = new Book('cover/020.jpg','狼女王<h1>卷一</h1>','瓦辛·賈斯　著','來自第三紀元第一世紀賢哲蒙托凱的紀實：<p></p>第3紀元63年：<p></p>　　在這年的秋潮，偉大皇帝泰伯·塞普汀的侄女金泰拉女皇的兒子尤里爾王子的兒子佩拉吉奧斯，來到了高岩行省的卡姆隆城邦向烏爾斯泰德國王的女兒求愛。她的名字是昆緹拉，泰姆瑞爾最美麗的公主，精於所有淑女的禮儀並且是一個熟練的女法師。','<button class="nbutton" onclick="nbutton(20)">read more</button>');
        book021 = new Book('cover/021.jpg','狼女王<h1>卷二</h1>','瓦辛·賈斯　著','來自第三紀元第一世紀賢哲蒙托凱的紀實：<p></p>第3紀元82年：<p></p>　　在他14歲的孫女波特瑪公主嫁給諾德人王國獨孤城的國王曼提亞科之後一年，尤里爾·賽普汀二世去世了。他的兒子佩拉吉奧斯·賽普汀二世成了皇帝，並且他面臨著空虛的國庫，而這得感謝他父親糟糕的管理。','<button class="nbutton" onclick="nbutton(21)">read more</button>');
        book022 = new Book('cover/022.jpg','狼女王<h1>卷三</h1>','瓦辛·賈斯　著','來自第三紀元第一世紀賢哲蒙托凱的紀實：<p></p>第3紀元98年<p></p>　　距離這一年的年終還剩幾個星期，皇帝佩拉吉奧斯二世於夜星月的15日駕崩。這給原本是北風之祈的日子蒙上了一層暗影，人們都認為這對帝國來說不是什麼好兆頭。過去的十七年中，他需要慘澹地經營整個帝國的生計，尤其是為了擺脫國庫的空虛的窘境，他強行解散了上古議會，規定這些官僚們要花上一筆不菲的代價來買回自己原來的職務。因此他失去了一些並不富裕的能臣。傳言說，皇帝就是被一個懷恨在心的前議員所毒殺的。','<button class="nbutton" onclick="nbutton(22)">read more</button>');
        book023 = new Book('cover/023.jpg','狼女王<h1>卷四</h1>','瓦辛·賈斯　著','寫自第一世紀第三紀元智者蒙托凱：<p></p>第三紀元109年：<p></p>　　泰姆瑞爾加冕後的十年，安提奧庫斯·塞普汀只給人們留下了他對肉慾極大貪求的印象。104年他與第二任妻子生下一名女兒，並以他曾曾曾曾姨媽女皇的名命名為金泰拉。由於安提奧庫斯極其肥胖，並患有治療師所知道的所有性病，他很少參政。與他截然不同，他的兄弟在政治領域表現十分出色。瑪格努斯娶了里爾莫斯的賽瑞迪爾女皇海倫娜——亞龍人的僧侶王被處死了——並且他出色得表達了帝國對黑沼澤的興趣。塞弗勒斯和他妻子碧昂姬統治著落錘省的基蘭恩；他們有許多孩子。然而任何人都沒有波特瑪政治活躍；她是天際獨孤城的狼女王。','<button class="nbutton" onclick="nbutton(23)">read more</button>');
        book024 = new Book('cover/024.jpg','狼女王<h1>卷五</h1>','瓦辛·賈斯　著','摘自第二紀元聖賢，蒙托凱的學生英佐里卡斯的著作：<p></p>　　第三紀元119年：賽普汀·安提奧庫斯皇帝統治了泰姆瑞爾21年，雖然他十分驕縱，但是他仍不失為一個強有力的領導者。他最偉大的勝利是110年的島嶼之戰，當時帝國艦隊攜帶著皇室成員，與賽伊克教團一起進駐了夏暮島，徹底粉碎了派安多尼亞艦隊的入侵。他的兄弟姐妹們，包括里爾莫斯的瑪格努斯國王，基蘭恩的塞弗勒斯國王以及獨孤城的狼女王波特瑪，都將自己的領地治理的不錯並且加強了與帝國之間的聯繫。當然，幾百年的相安無事並沒有撫平帝國與高岩，天際省之間的傷痕。','<button class="nbutton" onclick="nbutton(24)">read more</button>');
        book025 = new Book('cover/025.jpg','狼女王<h1>卷六</h1>','瓦辛·賈斯　著','二世紀的賢者，英作里卡斯執筆：<p></p>　　第三紀元120年：15歲的女皇金泰拉·塞普汀二世，安提奧庫斯的女兒，在初種月第三天加冕。她的叔叔們，里爾莫斯王瑪格努斯和基蘭恩王塞弗勒斯都出席儀式，但是她的姑媽波特瑪，獨孤城的狼女王卻被法庭放逐。一旦回到她的國度，波特瑪女王開始集結叛亂者，這被後世稱為紅鑽戰爭。所有她的同盟者常年以來都對皇帝和貴族們不滿，他們加入了她的反叛武裝反對新女皇。','<button class="nbutton" onclick="nbutton(25)">read more</button>');
        book026 = new Book('cover/026.jpg','狼女王<h1>卷七</h1>','瓦辛·賈斯　著','出自英佐里卡斯筆下，第二世紀的賢者：<p></p>　　第三紀元125年：對於皇帝金泰拉·塞普汀二世在格倫波特城堡行刑的準確日期，有人覺得有待商榷。一些人認為她是在第121年入獄後不久被殺害的，而其他人則保持他們的看法，認為直到第125年夏天，她的叔叔塞弗勒斯、基蘭恩的國王，再度征服了西部高岩之前，她很可能一直作為人質活著。金泰拉被證實死亡後，許多人集結起來反抗狼女王波特瑪和他的兒子，也就是四年前入侵守衛森嚴的帝都，然後加冕的皇帝尤里爾·塞普汀三世。','<button class="nbutton" onclick="nbutton(26)">read more</button>');
        book027 = new Book('cover/027.jpg','狼女王<h1>卷八</h1>','瓦辛·賈斯　著','出自於第二世紀的聖者英佐里卡斯之筆：<p></p>　　第三紀元127年：在伊馳達格戰役結束之後，皇帝尤里爾·塞普汀三世被擒，並且在他被押送到他位於落錘省基蘭恩的叔叔那裡之前，他就被一個憤怒的暴徒殺害了。他叔叔塞弗勒斯隨後正式稱帝並移駕帝都。之前效忠皇帝尤里爾以及他母親，狼女王波特瑪的軍隊都紛紛轉投到新皇帝的麾下。作為手下部隊歸降的報答，皇帝給予了天際，高岩，落錘，夏暮島，威木省，黑沼澤以及晨風這些地區的貴族更高的自治和獨立權。','<button class="nbutton" onclick="nbutton(27)">read more</button>');
        book028 = new Book('cover/028.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(28)">read more</button>');
        book029 = new Book('cover/029.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(29)">read more</button>');
        book030 = new Book('cover/030.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(30)">read more</button>');
        book031 = new Book('cover/031.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(31)">read more</button>');
        book032 = new Book('cover/032.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(32)">read more</button>');
        book033 = new Book('cover/033.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(33)">read more</button>');
        book034 = new Book('cover/034.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(34)">read more</button>');
        book035 = new Book('cover/035.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(35)">read more</button>');
        book036 = new Book('cover/036.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(36)">read more</button>');
        book037 = new Book('cover/037.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(37)">read more</button>');
        book038 = new Book('cover/038.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(38)">read more</button>');
        book039 = new Book('cover/039.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(39)">read more</button>');
        book040 = new Book('cover/040.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(40)">read more</button>');
        book041 = new Book('cover/041.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(41)">read more</button>');
        book042 = new Book('cover/042.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(42)">read more</button>');
        book043 = new Book('cover/043.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(43)">read more</button>');
        book044 = new Book('cover/044.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(44)">read more</button>');
        book045 = new Book('cover/045.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(45)">read more</button>');
        book046 = new Book('cover/046.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(46)">read more</button>');
        book047 = new Book('cover/047.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(47)">read more</button>');
        book048 = new Book('cover/048.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(48)">read more</button>');
        book049 = new Book('cover/049.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(49)">read more</button>');
        book050 = new Book('cover/050.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(50)">read more</button>');
        book051 = new Book('cover/051.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(51)">read more</button>');
        book052 = new Book('cover/052.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(52)">read more</button>');
        book053 = new Book('cover/053.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(53)">read more</button>');
        book054 = new Book('cover/054.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(54)">read more</button>');
        book055 = new Book('cover/055.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(55)">read more</button>');
        book056 = new Book('cover/056.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(56)">read more</button>');
        book057 = new Book('cover/057.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(57)">read more</button>');
        book058 = new Book('cover/058.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(58)">read more</button>');
        book059 = new Book('cover/059.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(59)">read more</button>');
        book060 = new Book('cover/060.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(60)">read more</button>');
        book061 = new Book('cover/061.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(61)">read more</button>');
        book062 = new Book('cover/062.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(62)">read more</button>');
        book063 = new Book('cover/063.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(63)">read more</button>');
        book064 = new Book('cover/064.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(64)">read more</button>');
        book065 = new Book('cover/065.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(65)">read more</button>');
        book066 = new Book('cover/066.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(66)">read more</button>');
        book067 = new Book('cover/067.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(67)">read more</button>');
        book068 = new Book('cover/068.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(68)">read more</button>');
        book069 = new Book('cover/069.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(69)">read more</button>');
        book070 = new Book('cover/070.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(70)">read more</button>');
        book071 = new Book('cover/071.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(71)">read more</button>');
        book072 = new Book('cover/072.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(72)">read more</button>');
        book073 = new Book('cover/073.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(73)">read more</button>');
        book074 = new Book('cover/074.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(74)">read more</button>');
        book075 = new Book('cover/075.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(75)">read more</button>');
        book076 = new Book('cover/076.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(76)">read more</button>');
        book077 = new Book('cover/077.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(77)">read more</button>');
        book078 = new Book('cover/078.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(78)">read more</button>');
        book079 = new Book('cover/079.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(79)">read more</button>');
        book080 = new Book('cover/080.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(80)">read more</button>');

    }



    function nbutton(num) {
    var num = padLeft(num,3);
        if (num) {
            window.location.href = 'book/'+ num +'.html';
        }
        else {
            document.write(' 錯誤 ');
        }
    }

    function padLeft(str, lenght) {
        str = '' + str;
        if (str.length >= lenght) {
            return str;
        } else {
            return padLeft("0" + str, lenght);
        }
    }
