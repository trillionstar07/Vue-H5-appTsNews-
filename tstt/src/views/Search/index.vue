<template>
<div>
     <!-- 搜索页面头部 -->
     <div class="search-header">
         <!-- 后退按钮 -->
         <van-icon name="arrow-left" color="white" size="0.48rem" class="goback"
         @click="$router.back()"/>
         <!-- 搜索组件 -->
         <van-search
         v-model.trim="kw"
         v-fofo
         placeholder="请输入关键词"
         background= 'rgb(184, 20, 20)'
         shape="round"
         @input="inputFn"
         @search="searchFn"
          />
     </div>
     <!-- 搜索建议列表 -->
     <div class="sugg-list" v-if="kw.length !== 0">
       <div class="sugg-item" v-for="(str,index) in suggestList" :key="index"
       v-html="lightFn(str,kw)" @click="suggestClickFn(str)">
       </div>
     </div>
     <!-- 搜索历史记录 -->
    <div class="scarch-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用right-icon 插槽定义右侧删除图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="clearFn"/>
        </template>
      </van-cell>
      <!-- 历史列表 -->
      <div class="history-list">
        <span class="history-item" v-for="(str, index) in history"
        :key="index" @click="historyClickFn(str)">
        {{str}}
        </span>
      </div>
    </div>
</div>
</template>

<script>
// 跳转到搜索结果页面
// 1输入框回车，2点击联想菜单，3点击历史记录
import { suggestListAPI } from '@/api'

export default {
  name: 'Search',
  data () {
    return {
      kw: '', // 搜索关键字
      timer: null, // 防抖的定时器
      suggestList: [], // 联想建议列表的文字数组
      history: JSON.parse(localStorage.getItem('his')) || []// 搜索历史记录
    }
  },
  methods: {
    // 输入框内容实时改变触发的方法
    inputFn () {
      clearTimeout(this.timer)
      // 如果搜索框中没有文字，建议列表为空
      if (this.kw.length === 0) {
        this.suggestList = []
      } else {
        // 防抖、延时执行逻辑代码，事件在此出发时清除上一个定时器
        this.timer = setTimeout(async () => {
          const res = await suggestListAPI({
            keywords: this.kw
          })
          console.log(res)
          this.suggestList = res.data.data.options
        }, 500)
      }
    },
    // 高亮关键字的方法
    lightFn (originStr, target) {
      // originStr：原来的字符串 // target: 关键字
      // 字符串.replace()
      // 返回值是替换脏的字符串
      // 如果要使用变量作为正则的判断条件，则不能简写正则
      const reg = new RegExp(target, 'ig')

      // 替换后的值不能用target，如输入框里面是java，匹配回来的是JaVa/JAVA都会被替换成输入框里面的java
      return originStr.replaceAll(reg, (match) => {
        // match是匹配中时，原来字符串中的字符
        return `<span style="color:red;">${match}</span>`
      })
    },
    // 输入框搜索事件
    moveFn (theKw) {
      // 坑：路由跳转在watch之前执行，所有让路由跳转，需要来一个定时器包裹，让跳转最后执行
      setTimeout(() => {
        this.$router.push({
          path: `/search_result/${theKw}`
        })
      }, 0)
    },
    searchFn () {
      // 点击搜索将文字保存到历史记录
      if (this.kw.length > 0) {
        this.history.push(this.kw)
        this.moveFn(this.kw)
      }
    },
    // 联想菜单点击事件
    suggestClickFn (str) {
      this.history.push(str)
      this.moveFn(str)
    },
    // 历史记录点击事件
    historyClickFn (str) {
      this.moveFn(str)
    },
    // 清除历史记录
    clearFn () {
      this.history = []
    }
  },
  watch: { // 监听历史记录数组改变
    history: {
      deep: true,
      handler () {
        // ES6新增了两种引用类型，map和set：特点，会自动清理掉重复的元素，返回新的set对象
        const theSet = new Set(this.history)
        const arr = Array.from(theSet)// 把theSet在转换回数组
        localStorage.setItem('his', JSON.stringify(arr))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header{
    height:46px;
    display: flex;
    align-items: center;
    background-color: rgb(184, 20, 20);
    overflow: hidden;
/*  后退按钮 */
.goback{
    padding-left: 14px;
    }
/*  搜索组件 */
.van-search{
    flex:1
    }
}
.sugg-list{
  .sugg-item{
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.search-icon{
  font-size: 16px;
  line-height: inherit;
}
.history-list{
  padding: 0 10px;
  .history-item{
    display: inline-block;
    font-size: 12px;
    padding: 10px 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
