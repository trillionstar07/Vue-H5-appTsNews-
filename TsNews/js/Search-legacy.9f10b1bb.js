(self["webpackChunktstt"]=self["webpackChunktstt"]||[]).push([[288],{9998:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return h}});var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"search-header"},[n("van-icon",{staticClass:"goback",attrs:{name:"arrow-left",color:"white",size:"0.48rem"},on:{click:function(e){return t.$router.back()}}}),n("van-search",{directives:[{name:"fofo",rawName:"v-fofo"}],attrs:{placeholder:"请输入关键词",background:"rgb(184, 20, 20)",shape:"round"},on:{input:t.inputFn,search:t.searchFn},model:{value:t.kw,callback:function(e){t.kw="string"===typeof e?e.trim():e},expression:"kw"}})],1),0!==t.kw.length?n("div",{staticClass:"sugg-list"},t._l(t.suggestList,(function(e,r){return n("div",{key:r,staticClass:"sugg-item",domProps:{innerHTML:t._s(t.lightFn(e,t.kw))},on:{click:function(n){return t.suggestClickFn(e)}}})})),0):n("div",{staticClass:"scarch-history"},[n("van-cell",{attrs:{title:"搜索历史"},scopedSlots:t._u([{key:"right-icon",fn:function(){return[n("van-icon",{staticClass:"search-icon",attrs:{name:"delete"},on:{click:t.clearFn}})]},proxy:!0}])}),n("div",{staticClass:"history-list"},t._l(t.history,(function(e,r){return n("span",{key:r,staticClass:"history-item",on:{click:function(n){return t.historyClickFn(e)}}},[t._v(" "+t._s(e)+" ")])})),0)],1)])},i=[],s=n(6198),o=(n(4603),n(8450),n(4916),n(8386),n(9714),n(5306),n(8757),n(1539),n(189),n(8783),n(3948),n(1038),n(8862),n(8975),n(693)),a={name:"Search",data:function(){return{kw:"",timer:null,suggestList:[],history:JSON.parse(localStorage.getItem("his"))||[]}},methods:{inputFn:function(){var t=this;clearTimeout(this.timer),0===this.kw.length?this.suggestList=[]:this.timer=setTimeout((0,s.Z)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,o.Bq)({keywords:t.kw});case 2:n=e.sent,console.log(n),t.suggestList=n.data.data.options;case 5:case"end":return e.stop()}}),e)}))),500)},lightFn:function(t,e){var n=new RegExp(e,"ig");return t.replaceAll(n,(function(t){return'<span style="color:red;">'.concat(t,"</span>")}))},moveFn:function(t){var e=this;setTimeout((function(){e.$router.push({path:"/search_result/".concat(t)})}),0)},searchFn:function(){this.kw.length>0&&(this.history.push(this.kw),this.moveFn(this.kw))},suggestClickFn:function(t){this.history.push(t),this.moveFn(t)},historyClickFn:function(t){this.moveFn(t)},clearFn:function(){this.history=[]}},watch:{history:{deep:!0,handler:function(){var t=new Set(this.history),e=Array.from(t);localStorage.setItem("his",JSON.stringify(e))}}}},c=a,u=n(1001),l=(0,u.Z)(c,r,i,!1,null,"92b50b1e",null),h=l.exports},8457:function(t,e,n){"use strict";var r=n(7854),i=n(9974),s=n(6916),o=n(7908),a=n(3411),c=n(7659),u=n(4411),l=n(6244),h=n(6135),f=n(8554),g=n(1246),v=r.Array;t.exports=function(t){var e=o(t),n=u(this),r=arguments.length,p=r>1?arguments[1]:void 0,d=void 0!==p;d&&(p=i(p,r>2?arguments[2]:void 0));var k,m,w,y,F,C,x=g(e),b=0;if(!x||this==v&&c(x))for(k=l(e),m=n?new this(k):v(k);k>b;b++)C=d?p(e[b],b):e[b],h(m,b,C);else for(y=f(e,x),F=y.next,m=n?new this:[];!(w=s(F,y)).done;b++)C=d?a(y,p,[w.value,b],!0):w.value,h(m,b,C);return m.length=b,m}},3411:function(t,e,n){var r=n(9670),i=n(9212);t.exports=function(t,e,n,s){try{return s?e(r(n)[0],n[1]):e(n)}catch(o){i(t,"throw",o)}}},1038:function(t,e,n){var r=n(2109),i=n(8457),s=n(7072),o=!s((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:o},{from:i})},8757:function(t,e,n){"use strict";var r=n(2109),i=n(7854),s=n(6916),o=n(1702),a=n(4488),c=n(614),u=n(7850),l=n(1340),h=n(8173),f=n(4706),g=n(647),v=n(5112),p=n(1913),d=v("replace"),k=i.TypeError,m=o("".indexOf),w=o("".replace),y=o("".slice),F=Math.max,C=function(t,e,n){return n>t.length?-1:""===e?n:m(t,e,n)};r({target:"String",proto:!0},{replaceAll:function(t,e){var n,r,i,o,v,x,b,_,S,A=a(this),L=0,T=0,E="";if(null!=t){if(n=u(t),n&&(r=l(a(f(t))),!~m(r,"g")))throw k("`.replaceAll` does not allow non-global regexes");if(i=h(t,d),i)return s(i,t,A,e);if(p&&n)return w(l(A),t,e)}o=l(A),v=l(t),x=c(e),x||(e=l(e)),b=v.length,_=F(1,b),L=C(o,v,0);while(-1!==L)S=x?l(e(v,L,o)):g(v,o,L,[],void 0,e),E+=y(o,T,L)+S,T=L+b,L=C(o,v,L+_);return T<o.length&&(E+=y(o,T)),E}})}}]);
//# sourceMappingURL=Search-legacy.9f10b1bb.js.map