import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/token.js'

// import Login from '@/views/Login'
// import Layout from '@/views/Layout'
// import Home from '@/views/Home'
// import User from '@/views/User'
// import Search from '@/views/Search'
// import SearchResult from '@/views/Search/SearchResult.vue'
// import ArticleDetail from '@/views/ArticleDetail'
// import UserEdit from '@/views/User/UserEdit'
// import AppInfo from '@/views/User/AppInfo'

// 改为路由懒加载：目的让第一个加载的页面app.js小一点，打开的时候会更快。
// 当路由切换到对应的页面的时候才会加载当前页面.

Vue.use(VueRouter)
// 配置路由
const routes = [
  {
    path: '/',
    redirect: '/layout/home' // 默认打开layoyt和layout下的home页面
  },
  { // 登录页面
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */'@/views/Login'),
    beforeEnter (to, from, next) {
      if (getToken()?.length > 0 && to.path === '/login') {
        // 获取到登录的token长度大于零，且要去的路径是/login登录页
        next('/layout/home') // 如果用户想要强制进入登录页，则让他返回到首页
      } else {
        next() // 其他情况放行
      }
      // 路由独享守卫
    }
  },
  {
    path: '/layout',
    component: () => import(/* webpackChunkName: "Layout" */'@/views/Layout'),
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "Home" */'@/views/Home'),
        meta: {
          scrollT: 0// 保存首页离开时滚动条的位置
        }
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "User" */'@/views/User')
      }
    ]
  },
  { // 搜索页面
    path: '/search',
    component: () => import(/* webpackChunkName: "Search" */'@/views/Search')
  },
  { // 文章详情页
    path: '/detail',
    component: () => import(/* webpackChunkName: "ArticleDetail" */'@/views/ArticleDetail')
  },
  { // 搜索结果页面
    path: '/search_result/:kw',
    component: () => import(/* webpackChunkName: "SearchResult" */'@/views/Search/SearchResult.vue')
  },
  { // 用户编辑页面
    path: '/user_edit',
    component: () => import(/* webpackChunkName: "UserEdit" */'@/views/User/UserEdit')
  },
  { // 关于app
    path: '/app_info',
    component: () => import(/* webpackChunkName: "AppInfo" */'@/views/User/AppInfo')
  }

]

const router = new VueRouter({
  routes
})
// 路由的全局前置守卫。在路由真正发生跳转之前会执行此函数
// 此函数可以决定路由是否跳转，取消/终止/
// router.beforeEach((to, from, next) => {
//   // 需求：如果以及登录则不可切换会登录页，如果未登录无法进入其他页面。
//   if (getToken()?.length > 0 && to.path === '/login') {
//     // 获取到登录的token长度大于零，且要去的路径是/login登录页
//     next('/layout/home')
//   } else {
//     next() // 其他情况放行
//   }
// })

export default router
