<template>
    <div>
        <!-- 头部导航
            fixed 可以让头部div带固定定位样式 -->
       <div>
           <van-nav-bar fixed>
                <template v-slot:left>
                    <img class="logo" src="@/assets/TsNewsLogo.png" alt="" />
                    <span class="news">TsNews</span>
                </template>
                <template v-slot:right>
                    <!-- 坑：postcss只能翻译style的css样式的代码
                            标签内行样式无法px转rem，需要手动计算
                         坑：sticky参照‘父级div标签’进行粘性布局，如果body/html设置导读，父级div一起走了所以内部的sticky也会往上走
                         重要：每一个van-tab代表一个标签导航，中间夹着内容，对应下属列表内容
                         重要：每一个v-tab 都对应独立的自己的ArticleList
                         细节：v-tab循环了很多导航，对对应的内容列表并不是一上来就创建的，而是切换到对应频道的时候才会创建
                              第二次切换的时候是显示/隐藏组件 -->
                    <van-icon name="search" size="0.7rem" color="#fff" @click="moveSearchPageFn" />
                </template>
           </van-nav-bar>
       </div>
       <!-- tab栏导航 -->
       <div class="main">
            <van-tabs
            @change="channelChange"
            animated
            swipeable
            v-model="channelID"
            sticky
            offset-top="1.226667rem"
            >
                <van-tab class="tabname"
                :title="obj.name"
                v-for="obj in userChannelList"
                :key = "obj.id"
                :name="obj.id"
                >
                <ArticleList :channelID="channelID"></ArticleList>

                </van-tab>
            </van-tabs>
          <!-- 频道编辑图标 -->
          <van-icon @click="plusClickFn" name="plus" size="0.373333334rem" class="moreChannels"/>
       </div>
       <!-- 频道管理弹出层 -->
          <van-popup
            class="channel_popup"
            v-model="show"
            get-container="body"
            position="bottom"
            round :style="{ height: '85%' }"
          >
        <ChannelEdit
        :userList="userChannelList"
        :unCheckList="unCheckChannelList"
        @addChannelEV="addChannelFn"
        @removeChannelEV="removeChannelFn"
        @closeEV="closeFn"
        ref = "editRef"
        v-model="channelID"
        >
        </ChannelEdit>
       </van-popup>

    </div>
</template>

<script>
// van-tabs的v-model给他脸频道ID实现切换
import {
  getUserChannelsAPI,
  getAllChannelsAPI,
  updateChannelsAPI,
  removeTheChannelAPI
} from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'
// 外面现在用的是同一个数组切换数据
// 文章列表的数据、请求、数组、分别放入到articlelist内部（自己请求自己的数据）
// 外面只负责当前激活的频道ID
export default {
  data () {
    return {
      channelID: 0, // 默认打开的是频道是0
      userChannelList: [], // 用户选择的频道列表
      allChannelList: [], // 所有频道列表
      // articleList: [] // 文章列表
      show: false // 频道弹出层默认/显示/隐藏
    }
  },
  async created () {
    // 获取频道列表
    const res = await getUserChannelsAPI()
    // console.log(res)
    this.userChannelList = res.data.data.channels
    // this.channelChange()
    // 所有频道列表
    const res2 = await getAllChannelsAPI()
    // console.log(res2)
    this.allChannelList = res2.data.data.channels
  },
  methods: {
    // tabs的切换事件，获取文章频道数据
    async channelChange () {
      // 获取文章列表
    //   const res2 = await getAllArticleListAPI({
    //     channel_id: this.channelID,
    //     timestamp: (new Date()).getTime()
    //   })
    //   console.log(res2)
    //   this.articleList = res2.data.data.results
    },
    // +号点击方法
    plusClickFn () {
      this.show = true
    },
    // 添加频道
    async addChannelFn (channelObj) {
      this.userChannelList.push(channelObj)
      // 把最新的数组发送给后台
      // 过滤出 推荐频道，只传推荐频道之后的频道
      // const newArr = this.userChannelList.filter(obj => obj.id !== 0)
      // newArr.forEach((obj, index) => {
      //   delete obj.name
      //   obj.seq = index
      // })
      // const res = await updateChannelsAPI({
      //   channels: newArr
      // })
      // console.log(res)
      const newArr = this.userChannelList.filter(obj => obj.id !== 0)
      const theNewArr = newArr.map((obj, index) => {
        const newObj = { ...obj }
        delete newObj.name
        newObj.seq = index

        return newObj
      })
      const res = await updateChannelsAPI({
        channels: theNewArr
      })
      console.log(res)
    },
    // 移除频道
    async removeChannelFn (channelObj) {
      const index = this.userChannelList.findIndex(obj => obj.id === channelObj.id)
      this.userChannelList.splice(index, 1)
      // 调用删除接口
      const res = await removeTheChannelAPI({
        channelId: channelObj.id
      })
      console.log(res)
    },
    // 关闭弹出层
    closeFn () {
      this.show = false
      // 让编辑状态回归false
      this.$refs.editRef.isEdit = false
    },
    // 首页搜索放大镜按钮点击事件
    moveSearchPageFn () {
      this.$router.push('/search')
    },
    scrollFn () {
      this.$route.meta.scrollT = document.documentElement.scrollTop
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },

  // 计算属性
  computed: {
    unCheckChannelList () {
      // 作用：把所有的频道数组取出，去用户选择的频道数组里查找
      // 如果没有找到则让filter方法收集到一个新的数组
    //   const newArr = this.allChannelList.filter(bigObj => {
    //     const index = this.userChannelList.findIndex(smallObj => {
    //       return smallObj.id === bigObj.id
    //     })
    //     // 如果找到
    //     if (index > -1) {
    //       return false
    //     } else {
    //       return true
    //     }
    //   })
    //   return newArr// 好难写啊，救命
    // }
    // 极致优化 233333
      return this.allChannelList.filter(bigObj =>
        (this.userChannelList.findIndex(smallObj =>
          smallObj.id === bigObj.id) === -1))
    }
  },
  activated () {
    console.log(this.$route)
    window.addEventListener('scroll', this.scrollFn)
    // 得到滚动条位置后like进行设置
    document.documentElement.scrollTop = this.$route.meta.scrollT
  },
  deactivated () {
    window.removeEventListener('scroll', this.scrollFn)
  }
}
</script>

<style scoped lang="less">
.logo{
    width: 40px;
    height: 40px;
}
.news{
    color: white;
    margin-top: 20px;
}
.main{
    padding-top: 46px;
    /* 底部在layout上留了padding-button */
}
// 设置tabs容器的样式
/deep/ .van-tabs__wrap{
  padding-right: 30px;
  background-color: #fff;
}
// 设置小图标的样式
.moreChannels{
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}

</style>
