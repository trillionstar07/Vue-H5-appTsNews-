<template>
    <div>
        <!-- 弹出层头部区域 -->
        <van-nav-bar title="频道管理">
            <template #right>
                <van-icon name="cross" size="0.37333334rem" color="white" @click="closeFn"/>
            </template>
        </van-nav-bar>
        <!-- 我的频道 -->
        <div class="my-channel-box">
            <div class="channel-title">
                <span>
                        我的频道
                    <span class="small-title">
                        点击{{ isEdit? '删除' : '进入' }}频道
                    </span>
                </span>
                <span @click="editFn">{{ isEdit? '完成':'编辑'}}</span>
            </div>
            <!-- 我的频道列表 -->
            <van-row type="flex">
                <van-col span="6"
                 v-for="obj in userList"
                  :key="obj.id"
                  @click="userChannleFn(obj)">
                    <div class="channel-item van-hairline--surround">
                        {{obj.name}}
                        <!-- 删除的徽标 -->
                        <van-badge color="transparent" class="cross-badge" v-show="isEdit && obj.id !== 0">
                            <template #content>
                                <van-icon name="cross" class="badge-icon" color="#cfcfcf" size="0.32rem"/>
                            </template>
                        </van-badge>
                    </div>
                </van-col>
            </van-row>
        </div>

        <!-- 更多频道 -->
        <div class="more-channel-box">
            <div class="channel-title">
                <span>点击添加更多频道：</span>
            </div>
            <!-- 更多频道列表 -->
            <van-row type="flex">
                <van-col
                span="6"
                v-for="obj in unCheckList"
                :key="obj.id"
                @click="moreFn(obj)"
                >
                    <div class="channel-item van-hairline--surround">
                        {{obj.name}}
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    userList: Array,
    unCheckList: Array
  },
  data () {
    return {
      isEdit: false // 编辑频道的编辑状态
    }
  },
  methods: {
    editFn () { // 编辑点击事件
      this.isEdit = !this.isEdit
    }, // 更多频道点击事件
    moreFn (channelObj) {
      if (this.isEdit === true) {
        // this.userList.push(channelObj)
        this.$emit('addChannelEV', channelObj)
      }
    },
    // 用户频道点击事件
    userChannleFn (channelObj) {
      if (this.isEdit === true) {
        if (channelObj.id !== 0) {
          this.$emit('removeChannelEV', channelObj)
        }
      } else {
        // 切换频道
        this.$emit('closeEV') // 关闭弹出层
        this.$emit('input', channelObj.id)
      }
    },
    // 关闭弹出层
    closeFn () {
      this.$emit('closeEV')
    //   this.isEdit = false
    }
  }
}
</script>

<style scoped lang="less">
.van-popup,
.popup-container{
    background-color: transparent;
    height: 100%;
    width: 100%;
}
.popup-container{
    display: flex;
    flex-direction: column;
}
.pop-header{
    height: 90px;
    background-color: rgb(184, 20, 20);
    color: white;
    text-align: center;
    font-size: 14px;
    position: relative;
    .title{
        width: 100%;
        position: absolute;
        bottom: 15px;
    }
}
.pop-body{
    flex:1;
    overflow: scroll;
    padding: 8px;
    background-color: white;
}
.my-channel-box,
.more-channel-box{
    .channel-title{
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        line-height: 28px;
        padding: 0 6px;
    }
}
.channel-item{
    font-size: 12px;
    text-align: center;
    line-height: 36px;
    background-color: #fafafa;
    margin: 5px;
}
// 删除的徽标
.cross-badge{
    position: absolute;
    right: -3px;
    top: 0;
    border: none;
}
// 提示文字
.small-title{
    font-size: 10px;
    color: gray;
}
</style>
