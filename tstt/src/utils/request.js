import theAxios from 'axios'
// import router from '@/router'
// import { Notify } from 'vant'
import { getToken, removeToken, setToken } from '@/utils/token.js'
// import { getNewTokenAPI } from '@/api'
import router from '@/router'
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000 // 20秒超时时间
})

// // 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log(config, '@@@')
  //   // 在发送请求之前做些什么
  //   // 目标：统一携带token
  //   // 判断本地有token再携带，判断具体api/index.js里如果没有携带Authorization，再添加
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
//   // 对请求错误做些什么
  return Promise.reject(error)
})

// // 添加响应拦截器
axios.interceptors.response.use(function (response) {
//   // 对响应数据做什么/http状态码2/3开头
  return response
}, async function (error) {
  console.dir(error)
  //   // 对响应错误做些什么/http状态码4/5开头
  if (error.response.status === 401) {
  //     console.log('错误代码', error.response.status)
  //     // 不能使用this.$router,因为this不是vue的组件对象
  //     // 解决方法，直接@/router引入后使用
    // Notify({ type: 'warning', message: '身份已过期', duration: 1500, background: '#ff6700' })
    removeToken() // 先清空token，让路由守卫判断失效，放行去登录页
    // router.replace('/login') // 强制跳转到用户登录页，用户有感知
    router.replace(`/login?path=${router.currentRoute.fullPath}`)// router.currentRoute.fullPath相当于vue文件中的this.$route，拿到当前路由对象的信息
  }

  // 使用refresh_token来更新token来继续使用，用户无感知，js代码实现
  // const res = await getNewTokenAPI()
  // // 1、401后得到更新的token存在本地
  // setToken(res.data.data.token)
  // // 2、更新新的token在请求头里
  // error.config.headers.Authorization = `Bearer ${res.data.data.token}`
  // // 3、重新发起未完成的请求
  // return axios(error.config)// error.config:错误请求的配置对象，但是结果要return回原本逻辑页面调用的地方，Promise对象
  // } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' &&
  // error.config.method === 'put') {
  //   // 刷新的refresh_token也过期了，清除’所有‘token返回登录页面
  //   localStorage.clear()
  //   router.replace('/login')
  // }
  return Promise.reject(error)
})

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
