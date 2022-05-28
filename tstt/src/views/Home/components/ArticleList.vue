<template>
  <div>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="100"
      >
        <!-- 文章列表等待加载中 -->
          <van-skeleton title avatar :row="10" v-if="Object.keys(list).length === 0"/>
          <ArticleItem
          v-else
          v-for="obj in list"
          :key="obj.art_id"
          :artObj="obj"
          @disLikeEV="disLikeFn"
          @reportEV='reportFn'
          @click.native="itemClickFn(obj.art_id)"
          >
          </ArticleItem>
      </van-list>

    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '../../../components/ArticleItem.vue'
import { getAllArticleListAPI, dislikeArticleAPI, reportArticleAPI } from '@/api'
import { Notify } from 'vant'
export default {
  props: {
    // list: Array // 文章列表数组
    channelID: Number
  },
  data () {
    return {
      list: [],
      loading: false, // 底部加载状态
      finished: false, // 底部是否完成状态
      theTime: new Date().getTime(), // 默认系统时间，用于分页
      loading: false// 顶部下拉加载状态
    }
  },
  components: {
    ArticleItem
  },
  async created () {
    const res = await getAllArticleListAPI({
      channel_id: this.channelID,
      timestamp: this.theTime
    })
    console.log(res)
    // 下一段开头文章时间戳
    // 第一次请求用系统时间（timestamp)，后台返回0-10条数据
    // 第二次请求时 从上一次时间戳再往后球球10-19条数据......
    this.list = res.data.data.results
    this.theTime = res.data.data.pre_timestamp
  },
  methods: {
    // 底部加载的事件方法
    async onLoad () {
      // 请求更多数据
      const res = await getAllArticleListAPI({
        channel_id: this.channelID,
        timestamp: this.theTime
      })
      console.log(res)
      this.list = [...this.list, ...res.data.data.results] // 数组合并
      this.theTime = res.data.data.pre_timestamp

      this.loading = false // 关闭加载状态提示,如果不关闭底部会一直加载
      if (res.data.data.pre_timestamp === null) {
        this.finished = true
      }
    },
    // 顶部刷新数据时间方法
    async onRefresh () {
      // 清空list刷新数据
      this.list = [...this.list]
      this.theTime = new Date().getTime()
      const res = await getAllArticleListAPI({
        channel_id: this.channelID,
        timestamp: this.theTime
      })
      console.log(res)
      this.list = [...res.data.data.results] // 数组合并
      this.theTime = res.data.data.pre_timestamp

      // 顶部加载状态改为false
      this.loading = false
    },
    // 反馈的不感兴趣
    async disLikeFn (id) {
      await dislikeArticleAPI({
        artId: id
      })
      Notify({ type: 'success', message: '反馈成功', duration: 1000 })
    },
    // 反馈垃圾内容
    async reportFn (id, value) {
      await reportArticleAPI({
        artId: id,
        type: value
      })
      console.log(this.artId, this.type)
      Notify({ type: 'success', message: '举报成功', duration: 1000 })
    },
    // 文章单元格点击事件
    itemClickFn (id) {
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }

  }
}
</script>

<style>
</style>
