/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div id="main-container">
    <app-header></app-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <app-footer></app-footer>
    <rigth-menu ref="rightMenu"></rigth-menu>
    <upload-component :show.sync="showUpload"></upload-component>
  </div>
</template>

<script>
import AppHeader from './app-header'
import AppFooter from './app-footer'
import RigthMenu from './right-menu'
import UploadComponent from './upload-component'
import { FOLDER_TREE, GET_ORGS } from '@/assets/js/const-value.js'
import { mapMutations } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      showUpload: true
    }
  },
  created() {
    this.$axios(FOLDER_TREE).then((res) => {
      if (res.data.status) {
        let dataTree = res.data.data
        dataTree.id = 1
        let data = [dataTree]
        this.setTreeData(data)
      }
    })
    this.$axios.get(GET_ORGS).then((res) => {
      if (res.data.status) {
        this.setOrgDatas(res.data.data)
      }
    })
  },
  mounted() {
    document.addEventListener('mousedown', () => {
      this.changeMenuShow({ isShow: false, left: 0, top: 0, menuType: -1 })
    })
  },
  methods: {
    ...mapMutations({ changeMenuShow: 'CHANGE_RIGHT_MENU_SHOW', setTreeData: 'SET_TREE_DATA', setOrgDatas: 'SET_ORG_DATAS', changeIndex: 'CHANGE_INDEX' })
  },
  components: {
    AppHeader,
    RigthMenu,
    AppFooter,
    UploadComponent
  }
}
</script>

<style lang="scss" scoped>

</style>
