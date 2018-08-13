// 过滤器指令
import Vue from 'vue'

// 年月日时间日期过滤器
Vue.filter('formatTime', function (value) { // value是过滤器前面的值，type是过滤器中定义的字段
  let date = new Date(value)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
})
// 时间日期前的"0"占位数字
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// premiere初次上演
Vue.filter('premiere', function (value) { // 如果传递的类型是引用类型需要深拷贝
  let date = new Date(value)
  return date.getMonth() + 1 + '月' + date.getDate() + '日'
})

Vue.filter('day', (value) => {
  let date = new Date(value)
  let result = ''
  switch (date.getDay()) {
    case 0 : result = '星期日'; break
    case 1 : result = '星期一'; break
    case 2 : result = '星期二'; break
    case 3 : result = '星期三'; break
    case 4 : result = '星期四'; break
    case 5 : result = '星期五'; break
    case 6 : result = '星期六'; break
  }
  return result
})
