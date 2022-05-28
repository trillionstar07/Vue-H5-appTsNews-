<template>
    <div>
        <!-- 搜索结果页头部导航 -->
        <div class="search-result-container">
            <!-- 点击实现后退效果 -->
            <van-nav-bar
            title="搜索结果"
            left-arrow
            @click-left="$router.back()"
            fixed
        />
        </div>
        <!-- 文章列表 -->
        <div>
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="已经到底了哦  o(>﹏<)o"
            @load="onLoad"
            :immediate-check="false"
            >
                <ArticleItem v-for="obj in articleList"
                :key="obj.art_id"
                :artObj="obj"
                :isShow="false"
                @click.native="itemClickFn(obj.art_id)"
                ></ArticleItem>

        </van-list>
        </div>

    </div>
</template>

<script>
// 事件修饰符.native--->给组件内部的根标签绑定原生的click点击事件
import { searchResultAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'

export default {
  name: 'SearchResult',
  data () {
    return {
      page: 1, // 页码
      articleList: [], // 文章列表
      loading: false, // 加载状态
      finished: false // 是否加载完成
    }
  },
  async created () {
    const res = await searchResultAPI({
      page: this.page,
      q: this.$route.params.kw
    })
    console.log(res)
    this.articleList = res.data.data.results
  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad () {
      if (this.articleList.length > 0) {
        this.page++
        const res = await searchResultAPI({
          page: this.page,
          q: this.$route.params.kw
        })
        if (res.data.data.results.length === 0) {
          // 没有更多数据
          this.finished = true
        }
        console.log(res)
        this.articleList = [...this.articleList, ...res.data.data.results]

        this.loading = false
      }
    },
    // 跳转到详情
    itemClickFn (id) {
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  }
}
// 业务问题：
// 如果前端和后端都是自己，但是后端保存的文章数据中的图片地址来源是其它的服务器，
// 后端数据中仅保存了一个图片的地址，后端会吧数据图片和地址发送给前端，前端铺设页面用img标签请求第三方图片的时候
// 有可能会遇到（404/403—）：第三方删除了图片。
// 解决方案：后台换图，在这之前前端可以设置一个默认的提示图片提示”图片搬家了“
// 404: 无法解决：前端只能给个展位图
// 403: 无权利请求此地址：后端如果做了图片的防盗链，
</script>

<style lang="less" scoped>
.search-result-container{
    padding-top: 46px;
}
</style>
