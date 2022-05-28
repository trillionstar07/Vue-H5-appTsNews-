// 此文件封装用于操作token的三个方法
const key = 'geek-zhaoxin'

// 设置
export const setToken = (token) => {
  localStorage.setItem(key, token)
}
// 获取
export const getToken = () => localStorage.getItem(key)
// 删除
export const removeToken = () => {
  localStorage.removeItem(key)
}
