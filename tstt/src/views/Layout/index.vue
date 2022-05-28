<template>
        <!-- 二级路由页面 -->
    <div>
        <div class="home_container">
            <keep-alive>
            <router-view></router-view>
            </keep-alive>
            <!-- 底部导航 -->
            <div>
                <van-tabbar v-model="active" route>
                    <van-tabbar-item
                    icon="home-o"
                    to="/layout/home"
                    >首页</van-tabbar-item>
                    <van-tabbar-item
                    icon="setting-o"
                    to="/layout/user"
                    >我的</van-tabbar-item>
                </van-tabbar>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'myLayout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
/* 内容底部内边距 */
.home_container{
    padding-bottom: 60px;
}
/* 底部导航上边框 */
.var-tabbar{
    border-top: 20px solid black;
}
</style>
