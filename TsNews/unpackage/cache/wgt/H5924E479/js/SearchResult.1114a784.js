"use strict";(self["webpackChunktstt"]=self["webpackChunktstt"]||[]).push([[181],{2521:function(t,a,e){e.r(a),e.d(a,{default:function(){return u}});var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"search-result-container"},[e("van-nav-bar",{attrs:{title:"搜索结果","left-arrow":"",fixed:""},on:{"click-left":function(a){return t.$router.back()}}})],1),e("div",[e("van-list",{attrs:{finished:t.finished,"finished-text":"已经到底了哦  o(>﹏<)o","immediate-check":!1},on:{load:t.onLoad},model:{value:t.loading,callback:function(a){t.loading=a},expression:"loading"}},t._l(t.articleList,(function(a){return e("ArticleItem",{key:a.art_id,attrs:{artObj:a,isShow:!1},nativeOn:{click:function(e){return t.itemClickFn(a.art_id)}}})})),1)],1)])},s=[],n=e(693),r=e(7993),l={name:"SearchResult",data(){return{page:1,articleList:[],loading:!1,finished:!1}},async created(){const t=await(0,n.G_)({page:this.page,q:this.$route.params.kw});console.log(t),this.articleList=t.data.data.results},components:{ArticleItem:r.Z},methods:{async onLoad(){if(this.articleList.length>0){this.page++;const t=await(0,n.G_)({page:this.page,q:this.$route.params.kw});0===t.data.data.results.length&&(this.finished=!0),console.log(t),this.articleList=[...this.articleList,...t.data.data.results],this.loading=!1}},itemClickFn(t){this.$router.push({path:`/detail?art_id=${t}`})}}},c=l,o=e(1001),d=(0,o.Z)(c,i,s,!1,null,"0ddcaf04",null),u=d.exports}}]);
//# sourceMappingURL=SearchResult.1114a784.js.map