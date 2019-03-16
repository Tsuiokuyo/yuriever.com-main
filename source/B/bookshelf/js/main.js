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
        book014 = new Book('cover/014.jpg','書名','作者　著','內容','<button class="nbutton" onclick="nbutton(14)">read more</button>');
        book015 = new Book('cover/015.jpg','書名','作者　著','內容','<button class="nbutton" onclick="nbutton(15)">read more</button>');
        book016 = new Book('cover/016.jpg','書名','作者　著','內容','<button class="nbutton" onclick="nbutton(16)">read more</button>');
        book017 = new Book('cover/017.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(17)">read more</button>');
        book018 = new Book('cover/018.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(18)">read more</button>');
        book019 = new Book('cover/019.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(19)">read more</button>');
        book020 = new Book('cover/020.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(20)">read more</button>');
        book021 = new Book('cover/021.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(21)">read more</button>');
        book022 = new Book('cover/022.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(22)">read more</button>');
        book023 = new Book('cover/023.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(23)">read more</button>');
        book024 = new Book('cover/024.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(24)">read more</button>');
        book025 = new Book('cover/025.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(25)">read more</button>');
        book026 = new Book('cover/026.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(26)">read more</button>');
        book027 = new Book('cover/027.jpg','書名','作者','內容','<button class="nbutton" onclick="nbutton(27)">read more</button>');
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