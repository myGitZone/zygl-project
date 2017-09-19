// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
// import router from './router'
import axios from '@/assets/js/vueAxios.js'
import store from './store'
import {mapMutations} from 'vuex'
import '@/assets/scss/base.scss'
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-default/index.css'

document.oncontextmenu = function(e) {
  return false
}
Vue.config.productionTip = false
Vue.use(axios)
Vue.use(ElementUI)
import {FOLDER_TREE} from '@/assets/js/const-value.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  store,
  created() {
    this.$axios(FOLDER_TREE).then((res) => {
      let dataTree = res.data.data
      dataTree.id = 1
      let data = [dataTree]
      this.setTreeData(data)
    })
  },
  methods: {
    ...mapMutations({setTreeData: 'SET_TREE_DATA'})
  },
  template: '<App/>',
  components: {App}
})
