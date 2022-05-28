// 统一封装接口方法
// 每个方法负责请求一个url地址，逻辑页面导入这个接口方法就能发送请求
// 好处：请求url路径可以再这里统一管理
import request from '@/utils/request.js'
// import { getToken } from '@/utils/token.js'
// import axios from '@/utils/request.js'
// 登录的接口
// axios内部会把对象自动转成json字符串格式发给后台
// axios还会自动携带handers
// Content-Type: 'application/json'会自动帮我们添加
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})
// 频道更新覆盖
export const updateChannelsAPI = ({ channels }) => request({
  url: '/v1_0/user/channels',
  // headers:{
  //   Authorization: `Bearer ${getToken()}`
  // }
  method: 'PUT',
  data: {
    channels // 用户已选的整个频道数组
  }
})
// 删除用户指定的频道
export const removeTheChannelAPI = ({ channelId }) => request({
  url: `/v1_0/user/channels/${channelId}`,
  method: 'DELETE'
})
// 获取所有频道
export const getAllChannelsAPI = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})
// 获取用户选择的频道，用户没有登录默认返回后台设置默认频道列表
export const getUserChannelsAPI = () => request({
  url: '/v1_0/user/channels'
})
// 获取文章列列表
export const getAllArticleListAPI = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  method: 'GET',
  // headers:{
  //   Authorization: `Bearer ${getToken()}`
  // }
  params: { // 这里的参数，axios会拼接在URL后面（查询字符串）
    channel_id,
    timestamp
  }
})
// 文章 不感兴趣反馈
export const dislikeArticleAPI = ({ artId }) => request({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  // headers:{
  //   Authorization: `Bearer ${getToken()}`
  // }
  data: {
    target: artId
  }
})
// 文章 反馈垃圾内容
export const reportArticleAPI = ({ artId, type }) => request({
  url: '/v1_0/article/reports',
  method: 'POST',
  // headers:{
  //   Authorization: `Bearer ${getToken()}`
  // }
  data: {
    target: artId,
    type: type,
    remark: '其它问题的反馈'
  }
})
// 搜索 联想菜单
export const suggestListAPI = ({ keywords }) => request({
  url: '/v1_0/suggestion',
  params: {
    q: keywords
  }
})
// 搜索 结果列表
export const searchResultAPI = ({ page = 1, per_page = 10, q }) => request({
  url: '/v1_0/search',
  maethod: 'GET',
  params: {
    page: page,
    per_page,
    q
  }
})
// 文章 详情页面
export const detailAPI = ({ artId }) => request({
  url: `/v1_0/articles/${artId}`
})
// 用户关注
export const userFollowedAPI = ({ userId }) => request({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target: userId
  }
})
// 用户取关
export const userUnFollowedAPI = ({ userId }) => request({
  url: `/v1_0/user/followings/${userId}`,
  method: 'DELETE'
})
// 文章点赞
export const likeArticleAPI = ({ artId }) => request({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: {
    target: artId
  }
})
// 取消文章点赞
export const unLikeArticleAPI = ({ artId }) => request({
  url: `/v1_0/article/likings/${artId}`,
  method: 'DELETE'
})
// 文章获取评论
export const commentsListAPI = ({ a, id, offset = null, limit = 10 }) => request({
  url: '/v1_0/comments',
  method: 'GET',
  params: {
    type: a,
    source: id,
    offset,
    limit
  }
})
// 评论的点赞
export const commentsLikingAPI = ({ comId }) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: comId
    }
  })
}
// 评论取消点赞
export const commentsDisLikingAPI = ({ comId }) => {
  return request({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}
// 发布评论
export const commentSendAPI = ({ id, content, art_id = null }) => {
  // 1.axios中data请求体传参，如果值为空null，是不会忽略该参数的，也会把参数名和值携带给后台
  // 只有params遇到null才会忽略
  // 2.形参art_id是可选参数，对文章评论不需要art_id,如果art_id值为空，表示此次调用是对文章评论，否则是对评论进行回复。
  const obj = {
    target: id,
    content
  }
  if (art_id === null) {
    obj.art_id = art_id // 如果art_id不为null表示对评论进行回复
  }
  return request({
    url: 'v1_0/comments',
    method: 'POST',
    data: obj
  })
}
// 获取用户个人资料
export const userProfileAPI = () => request({
  url: '/v1_0/user/profile'
})
// 获取用户基本信息
export const getUserInfoAPI = () => request({
  url: '/v1_0/user'
})
// 用户更新头像
export const updateUserPhotoAPI = (fd) => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data: fd // 外面传入的new FormData() 表单对象
})
// 编辑用户基本资料
export const updateUserProfileAPI = (dataObj) => {
  // 循环判断每一对key+value,如果值是undefined删除这对key+value
  const obj = {
    name: '',
    gender: 0,
    birthday: '',
    intro: ''
    // name,
    // gender, // 0男1女
    // birthday, // 生日（年-月-日字符串）
    // intro // 个人介绍
  }
  for (const prop in obj) {
    if (dataObj[prop] === undefined) {
      delete obj[prop]
    } else {
      obj[prop] = dataObj[prop]
    }
  }
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH', // 局部更新
    data: obj
  })
}
// 刷新用户token
export const getNewTokenAPI = () => request({
  url: '/v1_0/authorizations',
  method: 'PUT',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('refresh_token')
  }
})
