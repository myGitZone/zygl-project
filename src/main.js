// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import axios from '@/assets/js/vueAxios.js'
import store from './store'
import 'babel-polyfill'
import '@/assets/scss/base.scss'
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-default/index.css'
import { GET_ORGS } from '@/assets/js/const-value'
import { mapMutations } from 'vuex'
document.oncontextmenu = (e) => {
  return false
}
Vue.config.productionTip = false
Vue.use(axios)
Vue.use(ElementUI)
router.beforeEach((to, from, next) => {
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  mounted() {
    this.$nextTick(() => {
      this.$axios.get(GET_ORGS).then((res) => {
        if (res.data.status) {
          this.setOrgDatas(res.data.data)
        }
      })
    })
  },
  methods: {
    ...mapMutations({ setOrgDatas: 'SET_ORG_DATAS' })
  },
  template: '<App/>',
  components: { App }
})
