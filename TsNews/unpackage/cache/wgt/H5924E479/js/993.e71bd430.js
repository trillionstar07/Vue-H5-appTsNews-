(self["webpackChunktstt"]=self["webpackChunktstt"]||[]).push([[993],{7993:function(t,e,n){"use strict";n.d(e,{Z:function(){return f}});var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("van-cell",{scopedSlots:t._u([{key:"title",fn:function(){return[n("div",{staticClass:"title-box"},[n("span",[t._v(t._s(t.artObj.title))]),1===t.artObj.cover.type?n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.artObj.cover.images[0],expression:"artObj.cover.images[0]"}],staticClass:"thumb"}):t._e()]),t.artObj.cover.type>1?n("div",{staticClass:"title-box"},t._l(t.artObj.cover.images,(function(t,e){return n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t,expression:"imgUrl"}],key:e,staticClass:"thumb",attrs:{alt:""}})})),0):t._e()]},proxy:!0},{key:"label",fn:function(){return[n("div",{staticClass:"label-box"},[n("div",[n("span",[t._v(t._s(t.formatTime(t.artObj.pubdate)))])]),t.isShow?n("van-icon",{attrs:{name:"cross"},on:{click:function(e){e.stopPropagation(),t.show=!0}}}):t._e()],1)]},proxy:!0}])}),n("van-action-sheet",{attrs:{actions:t.actions,"cancel-text":t.bottomText,"get-container":"body"},on:{cancel:t.cancelFn,closed:t.closeFn,select:t.onSelect},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}})],1)},i=[],s=n(1709);const a=[{name:"不感兴趣"},{name:"反馈垃圾内容"}],o=[{value:0,name:"其它问题"},{value:1,name:"标题党"},{value:2,name:"搞黄色"},{value:3,name:"错字多"},{value:4,name:"旧闻重复"},{value:5,name:"广告软文"},{value:6,name:"虚假内容"},{value:7,name:"涉嫌违法犯罪"},{value:8,name:"侵权"}];var u={props:{artObj:Object,isShow:{type:Boolean,default:!0}},data(){return{show:!1,actions:a,bottomText:"取消"}},methods:{formatTime:s.S,onSelect(t,e){"反馈垃圾内容"===t.name?(this.actions=o,this.bottomText="返回"):"不感兴趣"===t.name?(this.$emit("disLikeEV",this.artObj.art_id),this.show=!1):(this.$emit("reportEV",this.artObj.art_id,t.value),this.show=!1)},cancelFn(){"返回"===this.bottomText&&(this.show=!0,this.actions=a,this.bottomText="取消")},closeFn(){this.actions=a,this.bottomText="取消"}}},c=u,h=n(1001),l=(0,h.Z)(c,r,i,!1,null,"c2eded1a",null),f=l.exports},3189:function(t){!function(e,n){t.exports=n()}(0,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",a="hour",o="day",u="week",c="month",h="quarter",l="year",f="date",d="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},_=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},y={s:_,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+_(r,2,"0")+":"+_(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,a=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:l,w:u,d:o,D:f,h:a,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},p="en",M={};M[p]=$;var Y=function(t){return t instanceof S},g=function t(e,n,r){var i;if(!e)return p;if("string"==typeof e){var s=e.toLowerCase();M[s]&&(i=s),n&&(M[s]=n,i=s);var a=e.split("-");if(!i&&a.length>1)return t(a[0])}else{var o=e.name;M[o]=e,i=o}return!r&&i&&(p=i),i||!r&&p},D=function(t,e){if(Y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},w=y;w.l=g,w.i=Y,w.w=function(t,e){return D(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function $(t){this.$L=g(t.locale,null,!0),this.parse(t)}var _=$.prototype;return _.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(m);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},_.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},_.$utils=function(){return w},_.isValid=function(){return!(this.$d.toString()===d)},_.isSame=function(t,e){var n=D(t);return this.startOf(e)<=n&&n<=this.endOf(e)},_.isAfter=function(t,e){return D(t)<this.startOf(e)},_.isBefore=function(t,e){return this.endOf(e)<D(t)},_.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},_.unix=function(){return Math.floor(this.valueOf()/1e3)},_.valueOf=function(){return this.$d.getTime()},_.startOf=function(t,e){var n=this,r=!!w.u(e)||e,h=w.p(t),d=function(t,e){var i=w.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(o)},m=function(t,e){return w.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,$=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(h){case l:return r?d(1,0):d(31,11);case c:return r?d(1,$):d(0,$+1);case u:var p=this.$locale().weekStart||0,M=(v<p?v+7:v)-p;return d(r?_-M:_+(6-M),$);case o:case f:return m(y+"Hours",0);case a:return m(y+"Minutes",1);case s:return m(y+"Seconds",2);case i:return m(y+"Milliseconds",3);default:return this.clone()}},_.endOf=function(t){return this.startOf(t,!1)},_.$set=function(t,e){var n,u=w.p(t),h="set"+(this.$u?"UTC":""),d=(n={},n[o]=h+"Date",n[f]=h+"Date",n[c]=h+"Month",n[l]=h+"FullYear",n[a]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[u],m=u===o?this.$D+(e-this.$W):e;if(u===c||u===l){var v=this.clone().set(f,1);v.$d[d](m),v.init(),this.$d=v.set(f,Math.min(this.$D,v.daysInMonth())).$d}else d&&this.$d[d](m);return this.init(),this},_.set=function(t,e){return this.clone().$set(t,e)},_.get=function(t){return this[w.p(t)]()},_.add=function(r,h){var f,d=this;r=Number(r);var m=w.p(h),v=function(t){var e=D(d);return w.w(e.date(e.date()+Math.round(t*r)),d)};if(m===c)return this.set(c,this.$M+r);if(m===l)return this.set(l,this.$y+r);if(m===o)return v(1);if(m===u)return v(7);var $=(f={},f[s]=e,f[a]=n,f[i]=t,f)[m]||1,_=this.$d.getTime()+r*$;return w.w(_,this)},_.subtract=function(t,e){return this.add(-1*t,e)},_.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=w.z(this),s=this.$H,a=this.$m,o=this.$M,u=n.weekdays,c=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},l=function(t){return w.s(s%12||12,t,"0")},f=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:w.s(o+1,2,"0"),MMM:h(n.monthsShort,o,c,3),MMMM:h(c,o),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,u,2),ddd:h(n.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(s),HH:w.s(s,2,"0"),h:l(1),hh:l(2),a:f(s,a,!0),A:f(s,a,!1),m:String(a),mm:w.s(a,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:i};return r.replace(v,(function(t,e){return e||m[t]||i.replace(":","")}))},_.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},_.diff=function(r,f,d){var m,v=w.p(f),$=D(r),_=($.utcOffset()-this.utcOffset())*e,y=this-$,p=w.m(this,$);return p=(m={},m[l]=p/12,m[c]=p,m[h]=p/3,m[u]=(y-_)/6048e5,m[o]=(y-_)/864e5,m[a]=y/n,m[s]=y/e,m[i]=y/t,m)[v]||y,d?p:w.a(p)},_.daysInMonth=function(){return this.endOf(c).$D},_.$locale=function(){return M[this.$L]},_.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=g(t,e,!0);return r&&(n.$L=r),n},_.clone=function(){return w.w(this.$d,this)},_.toDate=function(){return new Date(this.valueOf())},_.toJSON=function(){return this.isValid()?this.toISOString():null},_.toISOString=function(){return this.$d.toISOString()},_.toString=function(){return this.$d.toUTCString()},$}(),b=S.prototype;return D.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",a],["$W",o],["$M",c],["$y",l],["$D",f]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),D.extend=function(t,e){return t.$i||(t(e,S,D),t.$i=!0),D},D.locale=g,D.isDayjs=Y,D.unix=function(t){return D(1e3*t)},D.en=M[p],D.Ls=M,D.p={},D}))},7448:function(t,e,n){!function(e,r){t.exports=r(n(3189))}(0,(function(t){"use strict";function e(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var n=e(t),r={name:"zh",weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),ordinal:function(t,e){return"W"===e?t+"周":t+"日"},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日Ah点mm分",LLLL:"YYYY年M月D日ddddAh点mm分",l:"YYYY/M/D",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日dddd HH:mm"},relativeTime:{future:"%s后",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},meridiem:function(t,e){var n=100*t+e;return n<600?"凌晨":n<900?"早上":n<1100?"上午":n<1300?"中午":n<1800?"下午":"晚上"}};return n.default.locale(r,null,!0),r}))},190:function(t){!function(e,n){t.exports=n()}(0,(function(){"use strict";return function(t,e,n){t=t||{};var r=e.prototype,i={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function s(t,e,n,i){return r.fromToBase(t,e,n,i)}n.en.relativeTime=i,r.fromToBase=function(e,r,s,a,o){for(var u,c,h,l=s.$locale().relativeTime||i,f=t.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],d=f.length,m=0;m<d;m+=1){var v=f[m];v.d&&(u=a?n(e).diff(s,v.d,!0):s.diff(e,v.d,!0));var $=(t.rounding||Math.round)(Math.abs(u));if(h=u>0,$<=v.r||!v.r){$<=1&&m>0&&(v=f[m-1]);var _=l[v.l];o&&($=o(""+$)),c="string"==typeof _?_.replace("%d",$):_($,r,v.l,h);break}}if(r)return c;var y=h?l.future:l.past;return"function"==typeof y?y(c):y.replace("%s",c)},r.to=function(t,e){return s(t,e,this,!0)},r.from=function(t,e){return s(t,e,this)};var a=function(t){return t.$u?n.utc():n()};r.toNow=function(t){return this.to(a(this),t)},r.fromNow=function(t){return this.from(a(this),t)}}}))},1709:function(t,e,n){"use strict";n.d(e,{S:function(){return o},p:function(){return u}});var r=n(3189),i=n.n(r),s=n(190),a=n.n(s);n(7448);const o=t=>{i().extend(a()),i().locale("zh");const e=i()(),n=i()(t);return e.to(n)},u=t=>i()(t).format("YYYY-MM-DD")}}]);
//# sourceMappingURL=993.e71bd430.js.map