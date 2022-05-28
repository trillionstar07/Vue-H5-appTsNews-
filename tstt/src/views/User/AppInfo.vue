<template>
  <div>
    <div class="info-container">
      <!-- header区域 -->
      <van-nav-bar title="关于" left-arrow @click-left="$router.back()" fixed />
      <!-- 用户基本信息面板 -->
      <div class="logo">
        <img src="@/assets/TsNewsLogo.png" alt="" class="avatar" />
      </div>
    </div>
    <!-- 操作面板 -->
    <van-cell-group>
      <van-cell icon="info" title="版本" is-link value="v1.0.0" @click="banbeFn" />
      <!-- 版本提示框 -->
      <van-dialog v-model="showVersion"  show-cancel-button message="当前版本：v1.0.0" >
      </van-dialog>
      <van-cell icon="sort" title="更新" is-link @click="updateFn" />
      <!-- 更新提示框 -->
      <van-dialog v-model="showUpdate" show-cancel-button message="检查更新">
      </van-dialog>
      <van-cell icon="thumb-circle" title="去评分" is-link @click="pingfenFn" />
      <!-- 评价提示框 -->
      <van-dialog v-model="showScore" title="评分" show-cancel-button >
        <!-- 打星 -->
        <van-rate v-model="value" gutter=45 size=30 />
      </van-dialog>
      <van-cell icon="smile-comment" title="建议" is-link @click="suggestFn" />
      <!-- 建议提示框 -->
      <van-dialog v-model="showSuggest" title="建议" show-cancel-button @confirm="confirmFn">
      <textarea v-fofo></textarea>
      </van-dialog>
    </van-cell-group>
    <!-- 底部介绍 -->
    <div>
     <footer class="down">
       <span class="f82">
        服务条款 | 使用规范 | 客服中心 | 隐私保护指引
       </span><br>
     <span class="f75">Copyright © 1998-2022 赵欣.<br>保留一切权利. </span>
     </footer>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      showVersion: false,
      showUpdate: false,
      showSuggest: false,
      showScore: false,
      value: 3
    }
  },
  methods: {
    // 版本提示
    banbeFn () {
      this.showVersion = true
    },
    // 评分提示
    pingfenFn () {
      this.showScore = true
    },
    // 更新提示
    updateFn () {
      this.showUpdate = true
    },
    // 建议提示
    suggestFn () {
      this.showSuggest = true
    },
    confirmFn () {
      console.log(123)
    }
  }
}
</script>

<style scoped lang="less">

.info-container {
  .avatar {
    width: 70px;
    height: 70px;
    background-color: red;
    border-radius: 5px;
    margin-bottom: 60px;
    margin-left: 40%;
  }

  .logo {
    background-color: #f8f8f8;
    color: white;
    padding-top: 100px;

    //border-radius: 0 0 800px 800px;
    &::after {
      display: none;
    }
  }
}
::v-deep .van-dialog__content{
  text-align: center;
  textarea{
    padding: 10;
    width: 8rem;
    outline: none;
    border: 1px solid gray;
    height: 100px;
    border-radius: 10px;
  }
  }
.down {
background-color: #ffffff;
text-align: center;
height: 50px;
width: 100%;
padding-top: 40px;
padding-bottom: 40px;
margin-top: 40px;
}
.f82 {font-size: 0.82px;
color: darkblue;
}
.f75 {
font-size: 0.75px;
color: #a0a2a0;
}
</style>
