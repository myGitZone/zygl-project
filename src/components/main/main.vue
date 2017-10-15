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
    <rigth-menu></rigth-menu>
    <upload-component v-if="showUpload"></upload-component>
  </div>
</template>

<script>
import AppHeader from './app-header'
import AppFooter from './app-footer'
import RigthMenu from './right-menu'
import UploadComponent from './upload-component'
import { FOLDER_TREE, GET_ORGS } from '@/assets/js/const-value.js'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  created() {
    this.$axios(FOLDER_TREE).then((res) => {
      if (res.data.status) {
        let dataTree = res.data.data
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
  computed: {
    ...mapGetters(['showUpload'])
  },
  mounted() {
    document.addEventListener('mousedown', (e) => {
      this.changeMenuShow({ isShow: false, left: 0, top: 0 })
    })
  },
  methods: {
    ...mapMutations({ changeMenuShow: 'CHANGE_RIGHT_MENU_SHOW', setTreeData: 'SET_TREE_DATA', setOrgDatas: 'SET_ORG_DATAS', changeIndex: 'CHANGE_INDEX', setSelectId: 'SET_SELECT_ID' })
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
