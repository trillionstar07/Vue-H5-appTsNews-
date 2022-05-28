import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 引入flexible.js 设置根标签的字体大小
import 'highlight.js/styles/default.css' // 代码高亮样式插件
import {
  NavBar, Form, Field, Button,
  Tabbar, TabbarItem, Icon, Tab, Tabs, Cell,
  List, PullRefresh, ActionSheet, Popup, Row,
  Col, Badge, Search, Image as VanImage, Divider,
  ShareSheet, CellGroup, Tag, Rate, Dialog, DatetimePicker
  , Skeleton, Lazyload
} from 'vant'

Vue.use(Lazyload, {
  reeor: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-fc044a235e2c25da02782af0d8cb0504_1200x500.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656220636&t=8ccbd1a390042a7f6e1fb8021beef214'
})
Vue.use(Skeleton)
Vue.use(DatetimePicker)
Vue.use(Dialog)
Vue.use(Rate)
Vue.use(Tag)
Vue.use(CellGroup)
Vue.use(ShareSheet)
Vue.use(Divider)
Vue.use(VanImage)
Vue.use(Search)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
Vue.use(Popup)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Icon)
Vue.config.productionTip = false
Vue.config.devtools = true

// 封装中间件函数的插件
const directiveObj = {
  install (Vue) {
    Vue.directive('fofo', {
      inserted (el) {
        // 指令所在van-search组件 input在组件div的内部
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'input') {
          el.focus()
        } else {
          // el本身不是输入框，尝试往里获取一下
          setTimeout(() => {
            const theInput = el.querySelector('input')
            const theTextArea = el.querySelector('textarea')
            if (theInput) theInput.focus()
            if (theTextArea) theTextArea.focus()
          })
        }
      },
      update (el) {
        // 指令所在标签被更新时候触发
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'input') {
          el.focus()
        } else {
          // el本身不是输入框，尝试往里获取一下
          setTimeout(() => {
            const theInput = el.querySelector('input')
            const theTextArea = el.querySelector('textarea')
            if (theInput) theInput.focus()
            if (theTextArea) theTextArea.focus()
          })
        }
      }
    })
  }
}
// 执行目标对象里面的install方法并传入Vue类
Vue.use(directiveObj)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// webpack开发服务器在保存时检查代码
// vscode+eslint插件在保存时检查代码
// 写代码时用插件解决问题，webpack就不会再报错

// 组件使用的套路
// 1.明确目标后找到类似的组件
// 2.引入组件后复制组件的代码
// 3.读和删没用
// 4.修改成想要的样子

// 样式修改：
// 找到类名，1、自己写css覆盖掉2、看组件是否支持样式修改
