var snowStorm=function(o,l){this.autoStart=!0,this.excludeMobile=!0,this.flakesMax=128,this.flakesMaxActive=32,this.animationInterval=33,this.useGPU=!0,this.className=null,this.excludeMobile=!0,this.flakeBottom=null,this.followMouse=!1,this.snowColor="#fff",this.snowCharacter="&bull;",this.snowStick=!0,this.targetElement=null,this.useMeltEffect=!0,this.useTwinkleEffect=!1,this.usePositionFixed=!1,this.usePixelPosition=!1,this.freezeOnBlur=!0,this.flakeLeftOffset=0,this.flakeRightOffset=0,this.flakeWidth=8,this.flakeHeight=8,this.vMaxX=5,this.vMaxY=4,this.zIndex=0;var n,a=this,t=navigator.userAgent.match(/msie/i),e=navigator.userAgent.match(/msie 6/i),i=navigator.userAgent.match(/mobile|opera m(ob|in)/i),r=t&&"BackCompat"===l.compatMode||e,f=null,s=null,m=null,h=null,u=null,c=null,d=null,v=1,p=!1,y=!1,k=function(){try{l.createElement("div").style.opacity="0.5"}catch(e){return!1}return!0}(),g=!1,x=l.createDocumentFragment();function w(e,t){return isNaN(t)&&(t=0),Math.random()*e+t}function F(){o.setTimeout(function(){a.start(!0)},20),a.events.remove(t?l:o,"mousemove",F)}return n=function(){var e;var t,i=o.requestAnimationFrame||o.webkitRequestAnimationFrame||o.mozRequestAnimationFrame||o.oRequestAnimationFrame||o.msRequestAnimationFrame||function(e){o.setTimeout(e,1e3/(a.animationInterval||20))};function s(e){return void 0!==t.style[e]?e:null}e=i?function(){return i.apply(o,arguments)}:null,t=l.createElement("div");var n={transform:{ie:s("-ms-transform"),moz:s("MozTransform"),opera:s("OTransform"),webkit:s("webkitTransform"),w3:s("transform"),prop:null},getAnimationFrame:e};return n.transform.prop=n.transform.w3||n.transform.moz||n.transform.webkit||n.transform.ie||n.transform.opera,t=null,n}(),this.timer=null,this.flakes=[],this.disabled=!1,this.active=!1,this.meltFrameCount=20,this.meltFrames=[],this.setXY=function(e,t,i){if(!e)return!1;a.usePixelPosition||y?(e.style.left=t-a.flakeWidth+"px",e.style.top=i-a.flakeHeight+"px"):r?(e.style.right=100-t/f*100+"%",e.style.top=Math.min(i,u-a.flakeHeight)+"px"):a.flakeBottom?(e.style.right=100-t/f*100+"%",e.style.top=Math.min(i,u-a.flakeHeight)+"px"):(e.style.right=100-t/f*100+"%",e.style.bottom=100-i/m*100+"%")},this.events=function(){var n=!o.addEventListener&&o.attachEvent,s=Array.prototype.slice,l={add:n?"attachEvent":"addEventListener",remove:n?"detachEvent":"removeEventListener"};function e(e){var t=s.call(e),i=t.length;return n?(t[1]="on"+t[1],3<i&&t.pop()):3===i&&t.push(!1),t}function t(e,t){var i=e.shift(),s=[l[t]];n?i[s](e[0],e[1]):i[s].apply(i,e)}return{add:function(){t(e(arguments),"add")},remove:function(){t(e(arguments),"remove")}}}(),this.randomizeWind=function(){var e;if(c=function(e){return 1===parseInt(w(2),10)?-1*e:e}(w(a.vMaxX,.2)),d=w(a.vMaxY,.2),this.flakes)for(e=0;e<this.flakes.length;e++)this.flakes[e].active&&this.flakes[e].setVelocities()},this.scrollHandler=function(){var e;if(h=a.flakeBottom?0:parseInt(o.scrollY||l.documentElement.scrollTop||(r?l.body.scrollTop:0),10),isNaN(h)&&(h=0),!p&&!a.flakeBottom&&a.flakes)for(e=0;e<a.flakes.length;e++)0===a.flakes[e].active&&a.flakes[e].stick()},this.resizeHandler=function(){m=o.innerWidth||o.innerHeight?(f=o.innerWidth-16-a.flakeRightOffset,a.flakeBottom||o.innerHeight):(f=(l.documentElement.clientWidth||l.body.clientWidth||l.body.scrollWidth)-(t?0:8)-a.flakeRightOffset,a.flakeBottom||l.documentElement.clientHeight||l.body.clientHeight||l.body.scrollHeight),u=l.body.offsetHeight,s=parseInt(f/2,10)},this.resizeHandlerAlt=function(){f=a.targetElement.offsetWidth-a.flakeRightOffset,m=a.flakeBottom||a.targetElement.offsetHeight,s=parseInt(f/2,10),u=l.body.offsetHeight},this.freeze=function(){if(a.disabled)return!1;a.disabled=1,a.timer=null},this.resume=function(){if(!a.disabled)return!1;a.disabled=0,a.timerInit()},this.toggleSnow=function(){a.flakes.length?(a.active=!a.active,a.active?(a.show(),a.resume()):(a.stop(),a.freeze())):a.start()},this.stop=function(){var e;for(this.freeze(),e=0;e<this.flakes.length;e++)this.flakes[e].o.style.display="none";a.events.remove(o,"scroll",a.scrollHandler),a.events.remove(o,"resize",a.resizeHandler),a.freezeOnBlur&&(t?(a.events.remove(l,"focusout",a.freeze),a.events.remove(l,"focusin",a.resume)):(a.events.remove(o,"blur",a.freeze),a.events.remove(o,"focus",a.resume)))},this.show=function(){var e;for(e=0;e<this.flakes.length;e++)this.flakes[e].o.style.display="block"},this.SnowFlake=function(e,t,i){var s=this;this.type=e,this.x=t||parseInt(w(f-20),10),this.y=isNaN(i)?-w(m)-12:i,this.vX=null,this.vY=null,this.vAmpTypes=[1,1.2,1.4,1.6,1.8],this.vAmp=this.vAmpTypes[this.type]||1,this.melting=!1,this.meltFrameCount=a.meltFrameCount,this.meltFrames=a.meltFrames,this.meltFrame=0,this.twinkleFrame=0,this.active=1,this.fontSize=10+this.type/5*10,this.o=l.createElement("div"),this.o.innerHTML=a.snowCharacter,a.className&&this.o.setAttribute("class",a.className),this.o.style.color=a.snowColor,this.o.style.position=p?"fixed":"absolute",a.useGPU&&n.transform.prop&&(this.o.style[n.transform.prop]="translate3d(0px, 0px, 0px)"),this.o.style.width=a.flakeWidth+"px",this.o.style.height=a.flakeHeight+"px",this.o.style.fontFamily="arial,verdana",this.o.style.cursor="default",this.o.style.overflow="hidden",this.o.style.fontWeight="normal",this.o.style.zIndex=a.zIndex,x.appendChild(this.o),this.refresh=function(){if(isNaN(s.x)||isNaN(s.y))return!1;a.setXY(s.o,s.x,s.y)},this.stick=function(){r||a.targetElement!==l.documentElement&&a.targetElement!==l.body?s.o.style.top=m+h-a.flakeHeight+"px":a.flakeBottom?s.o.style.top=a.flakeBottom+"px":(s.o.style.display="none",s.o.style.bottom="0%",s.o.style.position="fixed",s.o.style.display="block")},this.vCheck=function(){0<=s.vX&&s.vX<.2?s.vX=.2:s.vX<0&&-.2<s.vX&&(s.vX=-.2),0<=s.vY&&s.vY<.2&&(s.vY=.2)},this.move=function(){var e=s.vX*v;s.x+=e,s.y+=s.vY*s.vAmp,s.x>=f||f-s.x<a.flakeWidth?s.x=0:e<0&&s.x-a.flakeLeftOffset<-a.flakeWidth&&(s.x=f-a.flakeWidth-1),s.refresh(),m+h-s.y+a.flakeHeight<a.flakeHeight?(s.active=0,a.snowStick?s.stick():s.recycle()):(a.useMeltEffect&&s.active&&s.type<3&&!s.melting&&.998<Math.random()&&(s.melting=!0,s.melt()),a.useTwinkleEffect&&(s.twinkleFrame<0?.97<Math.random()&&(s.twinkleFrame=parseInt(8*Math.random(),10)):(s.twinkleFrame--,k?s.o.style.opacity=s.twinkleFrame&&s.twinkleFrame%2==0?0:1:s.o.style.visibility=s.twinkleFrame&&s.twinkleFrame%2==0?"hidden":"visible")))},this.animate=function(){s.move()},this.setVelocities=function(){s.vX=c+w(.12*a.vMaxX,.1),s.vY=d+w(.12*a.vMaxY,.1)},this.setOpacity=function(e,t){if(!k)return!1;e.style.opacity=t},this.melt=function(){a.useMeltEffect&&s.melting&&s.meltFrame<s.meltFrameCount?(s.setOpacity(s.o,s.meltFrames[s.meltFrame]),s.o.style.fontSize=s.fontSize-s.fontSize*(s.meltFrame/s.meltFrameCount)+"px",s.o.style.lineHeight=a.flakeHeight+2+.75*a.flakeHeight*(s.meltFrame/s.meltFrameCount)+"px",s.meltFrame++):s.recycle()},this.recycle=function(){s.o.style.display="none",s.o.style.position=p?"fixed":"absolute",s.o.style.bottom="auto",s.setVelocities(),s.vCheck(),s.meltFrame=0,s.melting=!1,s.setOpacity(s.o,1),s.o.style.padding="0px",s.o.style.margin="0px",s.o.style.fontSize=s.fontSize+"px",s.o.style.lineHeight=a.flakeHeight+2+"px",s.o.style.textAlign="center",s.o.style.verticalAlign="baseline",s.x=parseInt(w(f-a.flakeWidth-20),10),s.y=parseInt(-1*w(m),10)-a.flakeHeight,s.refresh(),s.o.style.display="block",s.active=1},this.recycle(),this.refresh()},this.snow=function(){var e,t,i=0,s=null;for(e=0,t=a.flakes.length;e<t;e++)1===a.flakes[e].active&&(a.flakes[e].move(),i++),a.flakes[e].melting&&a.flakes[e].melt();i<a.flakesMaxActive&&0===(s=a.flakes[parseInt(w(a.flakes.length),10)]).active&&(s.melting=!0),a.timer&&n.getAnimationFrame(a.snow)},this.mouseMove=function(e){if(!a.followMouse)return!0;var t=parseInt(e.clientX,10);v=t<s?t/s*2-2:(t-=s)/s*2},this.createSnow=function(e,t){var i;for(i=0;i<e;i++)a.flakes[a.flakes.length]=new a.SnowFlake(parseInt(w(6),10)),(t||i>a.flakesMaxActive)&&(a.flakes[a.flakes.length-1].active=-1);a.targetElement.appendChild(x)},this.timerInit=function(){a.timer=!0,a.snow()},this.init=function(){var e;for(e=0;e<a.meltFrameCount;e++)a.meltFrames.push(1-e/a.meltFrameCount);a.randomizeWind(),a.createSnow(a.flakesMax),a.events.add(o,"resize",a.resizeHandler),a.events.add(o,"scroll",a.scrollHandler),a.freezeOnBlur&&(t?(a.events.add(l,"focusout",a.freeze),a.events.add(l,"focusin",a.resume)):(a.events.add(o,"blur",a.freeze),a.events.add(o,"focus",a.resume))),a.resizeHandler(),a.scrollHandler(),a.followMouse&&a.events.add(t?l:o,"mousemove",a.mouseMove),a.animationInterval=Math.max(20,a.animationInterval),a.timerInit()},this.start=function(e){if(g){if(e)return!0}else g=!0;if("string"==typeof a.targetElement){var t=a.targetElement;if(a.targetElement=l.getElementById(t),!a.targetElement)throw new Error('Snowstorm: Unable to get targetElement "'+t+'"')}if(a.targetElement||(a.targetElement=l.body||l.documentElement),a.targetElement!==l.documentElement&&a.targetElement!==l.body&&(a.resizeHandler=a.resizeHandlerAlt,a.usePixelPosition=!0),a.resizeHandler(),a.usePositionFixed=a.usePositionFixed&&!r&&!a.flakeBottom,o.getComputedStyle)try{y="relative"===o.getComputedStyle(a.targetElement,null).getPropertyValue("position")}catch(e){y=!1}p=a.usePositionFixed,f&&m&&!a.disabled&&(a.init(),a.active=!0)},a.autoStart&&a.events.add(o,"load",function e(){a.excludeMobile&&i||F(),a.events.remove(o,"load",e)},!1),this}(window,document)