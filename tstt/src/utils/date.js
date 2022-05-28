// 封装处理时间的方法

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 指定事件需要的插件
import 'dayjs/locale/zh' // 中文

/**
 * @param {*} 之前的事件
 * @returns 系统时间到指定时间的距离
 */
export const timeAgo = (targetTime) => {
  // 格式化时间
  dayjs.extend(relativeTime)
  dayjs.locale('zh')
  const a = dayjs()
  const b = dayjs(targetTime)
  return a.to(b) // 返回多久之前
}
export const formatDate = (dateObj) => {
  return dayjs(dateObj).format('YYYY-MM-DD')
}
