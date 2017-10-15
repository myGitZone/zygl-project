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
    <upload-component></upload-component>
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
  created() {
    this.$axios(FOLDER_TREE).then((res) => {
      if (res.data.status) {
        let dataTree = res.data.data
        this.id = 1
        this.setSelectId(this.id)
        dataTree.id = this.id
        this.setIdToTreeData(dataTree.folder)
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
      this.changeMenuShow({ isShow: false, left: 0, top: 0 })
    })
  },
  methods: {
    // 给左侧树绑定id
    setIdToTreeData(folders) {
      for (let i = 0, len = folders.length; i < len; i++) {
        let folder = folders[i]
        this.id = this.id + 1
        folder.id = this.id
        if (folder.folder) {
          this.setIdToTreeData(folder.folder)
        }
      }
    },
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
