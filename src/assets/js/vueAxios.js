/*
 * @Author: yanchanglu
 * @Date: 2017-07-31 17:59:00
 * @description 集成安装axios以及jsonp两组件
 */
// 为了解决不兼容promise的版本，这里做了兼容处理
import axios from 'axios'
import originJsonp from 'jsonp'
import Cookies from 'js-cookie'
import { JWT_TOKEN } from '@/assets/js/const-value'
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
    axios.interceptors.request.use(
      config => {
        if (Cookies.get(JWT_TOKEN)) {
          config.headers.authorization = `Bearer ${Cookies.get(JWT_TOKEN)}`
        }
        return config
      },
      err => {
        return Promise.reject(err)
      })
    axios.interceptors.response.use(
      response => {
        Cookies.set(JWT_TOKEN, response.headers.authorization)
        return response
      },
      err => {
        return Promise.reject(err)
      })
    Vue.prototype.$axios = axios
    Vue.axios = axios
    Vue.prototype.$jsonp = jsonp
    Vue.jsonp = jsonp
  }
}
