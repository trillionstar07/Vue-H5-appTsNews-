<template>
    <div class="user-edit-container">
        <!-- header区域 -->
        <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

        <!-- 用户资料 -->
        <van-cell-group class="action-card">
            <van-cell title="头像" is-link center @click="imageClickFn">
                <template #default>
                    <van-image round class="avatar" :src="profileObj.photo" @click="imageClickFn" />
                    <!-- 文件选择框，上传头像更改 -->
                    <!-- v-show="false" 视觉上隐藏，但是标签还在DOM树上还可以实现功能 -->
                    <input type="file"
                    ref="iptFile"
                    v-show="false"
                    accept="image/*"
                    @change="onFileChange"
                    />
                </template>
            </van-cell>
            <van-cell title="昵称" is-link :value="profileObj.name" @click="nameClickFn" />
                <!-- 更改昵称弹出提示框 -->
                <van-dialog v-model="show" title="修改昵称" show-cancel-button :before-close="beforeCloseFn">
                <input type="text" v-fofo v-model="inputUserName">
                </van-dialog>
            <van-cell title="生日" is-link :value="profileObj.birthday" @click="BirthdayFn" />
                <!-- 日期选择弹出框 -->
                <van-popup v-model="dataTimePickerShow" round position="bottom" :style="{ height: '40%'}">
                  <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    title="选择年月日"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @cancel="dateCancelFn"
                    @confirm="confirmFn"
                    />
                </van-popup>
        </van-cell-group>
    </div>

</template>

<script>
import { userProfileAPI, updateUserPhotoAPI, updateUserProfileAPI } from '@/api'
import { Notify } from 'vant'
import { formatDate } from '@/utils/date.js'
export default {
  name: 'UserEdit',
  data () {
    return {
      profileObj: {}, // 用户信息的对象
      show: false, // 控制姓名修改弹出的出现或者隐藏
      inputUserName: '',
      minDate: new Date(1949, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      dataTimePickerShow: false
    }
  },
  async created () {
    const res = await userProfileAPI()
    this.profileObj = res.data.data
    console.log(res)
  },
  methods: {
    // 更改头像的方法
    async onFileChange (e) {
      if (e.target.files.length === 0) return // 用户没有选择图片
      console.log(e.target.files[0])
      // 文件选择器
      // 创建FormData对象
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0])

      const res = await updateUserPhotoAPI(theFd)
      console.log(res)
      this.profileObj.photo = res.data.data.photo
    },
    imageClickFn () {
      // 图片点击事件
      this.$refs.iptFile.click() // js模拟标签的事件触发
    },
    // 更改用户昵称的方法
    nameClickFn () {
      this.show = true
      this.inputUserName = this.profileObj.name
    },
    // 姓名编辑框关闭前的回调函数
    async beforeCloseFn (action, done) {
      if (action === 'confirm') {
        // 确定
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.inputUserName) === true) {
          // 通过校验
          await updateUserProfileAPI({
            name: this.inputUserName
          })
          this.profileObj.name = this.inputUserName
          done()
        } else {
        // 没有通过不关闭弹窗校验并给出提示
          Notify({ type: 'warning', message: '请输入1-7位中英文数字组合' })
          done(false)
        }
      } else {
        done()
      }
    },
    // 生日修编辑击事件
    BirthdayFn () {
      this.dataTimePickerShow = true
      this.currentDate = new Date(this.profileObj.birthday)
    },
    // 日期选择器取消事件
    dateCancelFn () {
      this.dataTimePickerShow = false
    },
    // 日期选择器完成确认事件
    async confirmFn () {
      await updateUserProfileAPI({
        birthday: formatDate(this.currentDate)
      })
      this.dataTimePickerShow = false
      this.profileObj.birthday = formatDate(this.currentDate)
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .van-dialog__content{
  text-align: center;
    input{
      padding: 0;
      outline: none;
      border: none;
      text-align: center;
      height: 30px;
      border: 1px solid gray;
      border-radius: 6px;
      }
  }
.user-edit-container {
    padding-top: 46px;
    .avatar {
        width: 50px;
        height: 50px;
    }
}
</style>
