<template>
  <div>
      <!-- header区域 -->
      <van-nav-bar
        fixed
        title="文章详情"
        left-arrow
        @click-left="$router.back()"
      />
       <!-- 文章信息区域 -->
       <div class="article-container">
           <!-- 文章标题 -->
           <h1 class="art-title">{{artObj.title}}</h1>
           <!-- 用户信息 -->
           <van-cell cennter :title="artObj.aut_name" :label="formateDate(artObj.pubdate)">
               <template #icon>
                   <img :src="artObj.aut_photo" alt="" class="avatar"/>
               </template>
               <template #default>
                   <div>
                            <van-button
                            type="info"
                            size="mini"
                            v-if="artObj.is_followed === true"
                            @click="followedFn(true)"
                            >已 关 注</van-button>

                            <van-button
                            icon="plus"
                            type="info"
                            size="mini"
                            plain v-else
                            @click="followedFn(false)"
                            >关 注</van-button>
                   </div>
               </template>
           </van-cell>
           <!-- 分割 -->
           <van-divider></van-divider>
              <!-- 文章等待加载中 -->
                <van-skeleton title :row="10" v-if="Object.keys(artObj).length === 0"/>
                    <!-- 文章内容 -->
                    <div class="art-content" v-html="artObj.content" v-else></div>
           <!-- 分割 -->
           <van-divider>End</van-divider>
           <!-- 点赞 -->
           <!-- attitude： -1无态度，0不喜欢 1点赞 -->
           <div class="like-box">
               <van-button
               icon="good-job"
               type="danger"
               size="small"
               @click="likeFn(true)"
               v-if="artObj.attitude === 1">
                   已点赞</van-button>
               <van-button
               icon="good-job-o"
               type="danger"
               @click="likeFn(false)"
               plain size="small" v-else>
                   点个赞</van-button>
           </div>
       </div>
       <!-- 文章评论区 -->
       <div>
         <CommentListVue></CommentListVue>
       </div>
  </div>
</template>

<script>
import {
  detailAPI,
  userFollowedAPI,
  userUnFollowedAPI,
  unLikeArticleAPI,
  likeArticleAPI
} from '@/api'
import { timeAgo } from '@/utils/date'
import CommentListVue from './CommentList.vue'
export default {
  name: 'myDetail',
  data () {
    return {
      artObj: { // 文章对象
      }
    }
  },
  async created () {
    const res = await detailAPI({
      artId: this.$route.query.art_id
    })
    console.log(res)
    this.artObj = res.data.data
  },
  methods: {
    formateDate: timeAgo,
    // 关注、取关作者
    async followedFn (bool) {
      if (bool === true) {
        // 调取关接口
        this.artObj.is_followed = false
        const res = await userUnFollowedAPI({
          userId: this.artObj.aut_id
        })
        console.log(res)
      } else {
        // 调关注接口
        this.artObj.is_followed = true
        const res = await userFollowedAPI({
          userId: this.artObj.aut_id
        })
        console.log(res)
      }
    },
    // 文章点赞/取消点赞
    async likeFn (bool) {
      if (bool === true) {
        // 调取消点赞接口
        this.artObj.attitude = 0
        const res = await unLikeArticleAPI({
          artId: this.artObj.art_id
        })
        console.log(res)
      } else {
        // 调已点赞接口
        this.artObj.attitude = 1
        const res = await likeArticleAPI({
          artId: this.artObj.art_id
        })
        console.log(res)
      }
    }
  },
  components: {
    CommentListVue
  }
}
</script>

<style scoped lang="less">
.article-container{
    padding:10px;
    margin-top: 46px;
}
.art-title{
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0;
}
.art-content{
    font-size:12px;
    line-height: 24px;
    width: 100%;
    overflow-x: scroll;
    word-break: break-all;
    /deep/ img {
        width: 100%;
    }
    /deep/ pre {
        white-space: pre-wrap;
        word-wrap: break-word;
    }
}
.van-cell{
    padding:5px 0;
    &::after{
        display: none;
    }
}
.avatar{
    width:60px;
    height: 60px;
    border-radius: 50%;
    background-color: #f8f8f8;
    margin-right: 5px;
    border:none;
}
.like-box{
    display:flex;
    justify-content: center;
}
</style>
