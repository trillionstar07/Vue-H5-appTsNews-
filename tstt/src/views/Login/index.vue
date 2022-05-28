<template>
  <div>
    <van-nav-bar title="TsNews-登录"/>
      <div>
        <!-- 整体表单组件
        @submit：是自定义事件，提交事件
        van-field：输入框
        v-model：数据双向绑定
    输入框的name属性桑声明，在表单整体提交的时候默认手机一个提交对象，往后台发送的参数就是name的值
    lable属性是输入框左侧文本
    rules表示表单校验规则   :属性名="表达式"，如果没有冒号则是字符串
        -->
         <div class="logo">
          <img src="@/assets/TsNewsLogo.png" alt="" class="avatar" />
         </div>
          <van-form @submit="onSubmit">
          <van-field
            v-model="user.mobile"
            required
            name="mobile"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[{  required: true, message: '请填写用户手机号'
            ,pattern: /^1[3-9]\d{9}$/ }]"
          />
          <van-field
            v-model="user.code"
            required
            type="password"
            name="code"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码'
            ,pattern: /^\d{6}/ }]"
          />
          <div style="margin: 30px;">
          <!--
            round：是否为圆形
            block：是否为块级元素
            type：代表类型
            native-type：代表原生button的type属性
            submit：代表这个van-button组件渲染的原生button标签type数submit提交整个表单功能的按钮
           -->
            <van-button
            :disabled= 'isLoading'
            :loading = 'isLoading'
            loading-text="请稍后· · ·"
            :round="false"
            block type="info"
            native-type="submit"
            >
            登录</van-button>
          </div>
        </van-form>
      </div>
  </div>
</template>

<script>
/*
写需求的套路：
1、html+css
2、数据铺设、数据绑定、数据微调
3、js交互
组件使用套路：
1、找组件、引组件、用组件（标签和js复制），读、删、改
 */

// 目标一、实现顶部导航，自定义样式
// 目标二、表单组件的增、改、读
// 目标三、手机值后调用接口查看登录结果
// 目标四、提示正在登录，防止用户频繁点击
import { loginAPI } from '@/api'
import { setToken } from '@/utils/token'
import { Notify } from 'vant'

export default {
  data () {
    return {
      user: {
        mobile: '13007437453', // 手机号
        code: '246810'// 验证码（密码，必须是246810）
      },
      isLoading: false // 登录按钮的加载状态
    }
  },
  methods: {
    // 提交方法（from整体通过验证后才会触发）
    async onSubmit (values) {
      console.log('submit', values)
      console.log(this.user)
      this.isLoading = true // 登录按钮的加载状态

      try {
        const res = await loginAPI({
          mobile: this.user.mobile,
          code: this.user.code
        // 获取到收集到的值并提交请求
        })
        Notify({ type: 'success', message: '登录成功', duration: 1500, background: 'red' })
        setToken(res.data.data.token)
        localStorage.setItem('refresh_token', res.data.data.refresh_token)
        // 登陆成功后跳转、跳转一定要写在最后，尽量最后执行
        // this.$router.push:会产生历史记录，可以回退,this.$router.replace()替换不可回退
        this.$router.replace({
          path: this.$route.query.path || 'layout/home' // 要写全
        })
      } catch (err) {
        // Promise内的ajax抛出错误进入这里
        // 这里不建议用alert提示，最好使用反馈弹窗
        Notify({ type: 'primary', message: '账号或者密码错误', duration: 2000, background: '#ff6700' })
      }
      this.isLoading = false // 登录按钮的加载状态
    }
  }
}
</script>

<style scoped lang="less">
/* lang = 'less' 表示当前标签是less语法，该语法中/deep/就不会报错
 .van-nav-bar{
   background-color: #1b1b1bd0
 }
 /* 此选择器名字是van-nav-bar组件内标签
 scoped尝试把此选择器后属性选择器匹配当前页
 面标签（选不中组件内部的） */

 /* /deep/ .van-nav-bar__title{
   color: white;
   font-size: 20px;
 } */
 /* 结论： 如果要修改组件内的样式，而用了scoped，就需要在选择器前面加上/deep/ */

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
    padding-top: 80px;
    //border-radius: 0 0 800px 800px;
    &::after {
      display: none;
    }

  }

</style>
