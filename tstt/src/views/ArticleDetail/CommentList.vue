<template>
    <div>
        <!-- 评论列表 -->
        <div class="cmt-list" :class="{ 'art-cmt-container-1': true, 'art-cmt-container-2': true }">

            <!-- 评论的Item项 -->
            <van-list v-model="loading" :finished="finished" finished-text="已经到底啦，发表你的看法吧!" @load="onLoad"
                :immediate-check="false">
                <div class="cmt-item" v-for="obj in commentArr" :key="obj.com_id">
                    <!-- 头部区域 -->
                    <div class="cmt-header">
                        <!-- 头部左侧 -->
                        <div class="cmt-header-left">
                            <img :src="obj.aut_photo" alt="" class="avatar">
                            <span class="uname">{{ obj.aut_name }}</span>
                        </div>
                        <!-- 头部右侧 -->
                        <div class="cmt-header-right">
                            <van-icon name="good-job" size="20" color="red" v-if="obj.is_liking === true"
                                @click="likeFn(true, obj)" />
                            <van-icon name="good-job-o" size="16" color="gray" v-else @click="likeFn(false, obj)" />
                        </div>
                    </div>
                    <!-- 主体区域 -->
                    <div class="cmt-body">
                        {{ obj.content }}
                    </div>
                    <!-- 尾部区域 -->
                    <div class="cmt-footer">{{ timeAgo(obj.pubdate) }}</div>
                </div>
            </van-list>
        </div>

        <!-- 底部评论区1 -->
        <div>
            <div class="add-cmt-box van-hairline--top">
                <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
                <div class="ipt-cmt-left" @click="toggleShowFn">说说你的看法</div>
                <div class="icon-box">
                    <van-badge :content="totalCount === 0 ? '' : totalCount" max="99">
                        <van-icon name="comment-o" size="0.53333334rem" @click="commentClickFn" />
                    </van-badge>
                    <!-- 收藏按钮 -->
                    <van-icon name="star" size="0.53333334rem" color="#ff6700" v-if="starFn()" @click="starFn" />
                    <van-icon name="star-o" size="0.53333334rem"  v-else @click="starFn" />

                    <!-- 分享按钮 -->
                    <van-icon name="share-o" size="0.53333334rem" @click="showShare = true" />
                    <!-- 分享面板 -->
                    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" />
                </div>
            </div>
            <van-popup class="channel_popup" v-model="show" position="bottom" duration="0.3" closed round
                :safe-area-inset-bottom="true" :style="{ height: '25%' }">
                <!-- 底部评论区2 -->
                <div class="cmt-box van-hairline--top">
                    <textarea placeholder="友善是交流的起点" v-fofo v-model.trim="comText"></textarea>
                    <van-button type="default" :disabled="comText.length === 0" @click="sendFn">发布</van-button>
                </div>
            </van-popup>

        </div>
    </div>
</template>

<script>
import { commentsListAPI, commentsDisLikingAPI, commentsLikingAPI, commentSendAPI } from '@/api'
import { timeAgo } from '@/utils/date'

export default {
  data () {
    return {
      offset: null, // 偏移量评论ID
      commentArr: [], // 评论列表
      totalCount: '', // 评论总数量（必须由后端返回）
      isShowCmtBox: true,
      show: false,
      comText: '', // 关联发布评论的内容
      loading: false,
      finished: false,
      showShare: false, // 分享面板
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
          { name: '复制链接', icon: 'link' }
        ]
      ]
    }
  },
  async created () {
    const res = await commentsListAPI({
      a: 'a', // a为文章评论，c为评论的评论
      id: this.$route.query.art_id // 文章id
    })
    this.commentArr = res.data.data.results
    this.totalCount = res.data.data.total_count
    this.lastId = res.data.data.last_id // 分页、最后一个评论的id
    if (res.data.data.results.length === 0) {
      this.finished = true
    }
  },
  methods: {
    timeAgo,
    async likeFn (bool, commentObj) {
      // 评论的点赞
      if (bool === true) {
        // 取消评论点赞
        commentObj.is_liking = false
        await commentsDisLikingAPI({
          comId: commentObj.com_id
        })
      } else {
        // 评论点赞
        commentObj.is_liking = true
        await commentsLikingAPI({
          comId: commentObj.com_id
        })
      }
    },
    // 显示评论输入框
    toggleShowFn () {
      this.show = true
      // this.isShowCmtBox = false
    },
    // 评论按钮点击事件，展示第一条评论
    commentClickFn () {
      // 设置window.scrollTo(0,文章内容高度)
      // window.scrollTo可以使网页进行滚动，根据相应的坐标即可滚动到对应的位置
      //           const articleHeight = document.querySelector('.article-container').scrollHeight
      //           window.scrollTo(0, articleHeight)
      // 可以修改CSS的属性：animation（帧动画）、transition(过渡动画)实现动画效果
      // 也可以使用js左动画：计时器间隔时间修改目标的状态

      // 比较方便的方法，既可以滚动也可以带动画
      // 原生标签.scrollIntoView(),让原生的标签滚动到屏幕的最上面
      // '.like-box'是评论区
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    },
    // 发布评论按钮点击事件
    async sendFn () {
      // 前端效果：把评论加入到评论区列表中
      const res = await commentSendAPI({
        id: this.$route.query.art_id,
        content: this.comText
      })
      console.log(res)
      this.commentArr.unshift(res.data.data.new_obj)
      this.totalCount++
      this.comText = ''
      this.show = false
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    },
    // 底部加载更多
    async onLoad () {
      if (this.commentArr.length > 0) {
        // 请求下一页
        const res = await commentsListAPI({
          a: 'a', // a为文章评论，c为评论的评论
          id: this.$route.query.art_id, // 文章id
          offset: this.lastId
        })
        this.totalCount = res.data.data.total_count
        this.lastId = res.data.data.last_id // 分页、最后一个评论的id
        if (res.data.data.last_id === null) {
          // 没有下一页
          this.finished = true
          this.commentArr = [...this.commentArr, ...res.data.data.results]
        }
        this.loading = false
      } else {
        this.loading = false
      }
    },
    // 分享按钮
    shareFn () {
      this.showShare = true
    },
    // 收藏按钮
    starFn () {
      return false
    }
  }
}

</script>

<style scoped lang="less">
// .channel_popup{
//     background-color: rgb(184, 20, 20);
// }
.cmt-list {
    padding: 10px;

    .cmt-item {
        padding: 15px 0;

        .cmt-item {
            border-top: 1px solid #f8f8f8
        }

        .cmt-header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .cmt-header-left {
                display: flex;
                align-items: center;

                .avatar {
                    width: 40px;
                    height: 40px;
                    background-color: #f8f8f8;
                    border-radius: 50%;
                    margin-right: 15px;
                }

                .uname {
                    font-size: 12px;
                }
            }
        }

        .cmt-body {
            font-size: 14px;
            line-height: 28px;
            text-indent: 2em;
            margin-top: 6px;
            word-break: break-all;
        }

        .cmt-footer {
            font-size: 12px;
            color: gray;
            margin-top: 10px
        }
    }
}

// 外层容器
.art-cmt-container-1 {
    padding-bottom: 46px;
}

.art-cmt-container-2 {
    padding-bottim: 80px;
}

// 发布评论的盒子1
.add-cmt-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;
    padding-left: 10px;

    .ipt-cmt-left {
        flex: 1;
        border: 1px solid #efefef;
        border-radius: 15px;
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        padding-left: 15px;
        margin-left: 10px;
        background-color: #f8f8f8;
    }

    .icon-box {
        width: 40%;
        display: flex;
        justify-content: space-evenly;
        line-height: 0;
    }
}

.child {
    width: 20px;
    height: 20px;
    background: #f2f3f5;
}

// 发布评论的盒子
.cmt-box {
    //bottom: 0;
    left: 0;
    width: 100%;
    height: 90%;
    display: flex;
    position: absolute;
    justify-content: space-evenly;
    align-items: center;
    font-size: 12px;
    padding-left: 10px;
    box-sizing: border-box;
    border-radius: 0.42667rem 0.42667rem 0 0;
    background-color: white;

    textarea {
        flex: 1;
        height: 70%;
        border: 1px solid #efefef;
        background-color: #f8f8f8;
        resize: none;
        border-radius: 6px;
    }

    .van-button {
        height: 75%;
        border-radius: 6px;
        border: none;
    }
}
</style>
