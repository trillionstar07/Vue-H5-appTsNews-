<template>
    <div>
        <div class="user-container">
            <!-- 用户基本信息面板 -->
            <div class="user-card">
                <!-- 用户头像姓名 -->
                <van-cell>
                    <!-- 使用title插槽自定义标题 -->
                    <template #icon>
                        <img :src="userObj.photo" alt="" class="avatar"/>
                    </template>
                    <template #title>
                        <span class="username">{{userObj.name}}</span>
                    </template>
                    <template #label>
                        <van-tag color="#fff" text-color="black">申请认证</van-tag>
                    </template>
                </van-cell>
                <!-- 动态、关注、粉丝 -->
                <div class="user-data">
                    <div class="user-data-item">
                        <span>{{userObj.art_count}}</span>
                        <span>动态</span>
                    </div>
                    <div class="user-data-item">
                        <span>{{userObj.follow_count}}</span>
                        <span>关注</span>
                    </div>
                    <div class="user-data-item">
                        <span>{{userObj.fans_count}}</span>
                        <span>粉丝</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 操作面板 -->
        <van-cell-group class="action-card">
            <van-cell icon="edit" title="编辑资料" is-link to="/user_edit" />
            <van-cell icon="chat-o" title="客服" is-link />
            <van-cell icon="description" title="关于" is-link to="/app_info"/>
            <van-cell icon="warning-o" center title="退出登录" is-link @click="quitFn" arrow-direction="none" />
        </van-cell-group>
    </div>
</template>

<script>
import { getUserInfoAPI } from '@/api'
import { Dialog } from 'vant'
import { removeToken } from '@/utils/token'
export default {
  data () {
    return {
      userObj: {} // 用户对象
    }
  },
  async activated () {
    const res = await getUserInfoAPI()
    console.log(res)
    this.userObj = res.data.data
  },
  methods: {
    // 退出方法
    quitFn () {
      Dialog.confirm({
        title: '退出',
        message: '确定要退出吗？'
      })
        .then(() => {
          // 点击确定内部resolve触发then
          // 业务：清除token跳回登录页面
          removeToken()
          this.$router.replace('/login')
        })
        .catch(() => {
          // 点击取消内部调用reject触发catch
        })
    }
  }
}
</script>

<style scoped lang="less">
.user-container{
    .user-card{
        background-color: rgb(184, 20, 20);
        color:white;
        padding-top:20px;
        border-radius:0 0 20px 20px;
        .van-cell{
            background: rgb(170, 20, 20);
            //width: 200px;
            color:white;
            &::after{
                display:none;
            }
            .avatar{
                width:70px;
                height:70px;
                background-color: #fff;
                border-radius: 50%;
                margin-right: 10px;
            }
            .username{
                font-size: 14px;
                font-weight: bold;
            }
        }
    }
    .user-data{
        display:flex;
        justify-content: space-evenly;
        align-items: center;
        font-size: 14px;
        padding: 30px 0;
        .user-data-item{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 33.33%;
        }
    }
}
</style>
