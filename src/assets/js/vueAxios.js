/*
 * @Author: yanchanglu
 * @Date: 2017-07-31 17:59:00
 * @description 集成安装axios以及jsonp两组件
 */
// 为了解决不兼容promise的版本，这里做了兼容处理
require('es6-promise').polyfill()
import axios from 'axios'
import originJsonp from 'jsonp'

function jsonp(url, option) {
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
};

export default {
  install(Vue) {
    Vue.prototype.$axios = axios
    Vue.axios = axios
    Vue.prototype.$jsonp = jsonp
    Vue.jsonp = jsonp
  }
}
