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
    <rigth-menu ref="rightMenu" v-if="rightMenuShow" :style="style"></rigth-menu>
  </div>
</template>

<script>
  import AppHeader from './app-header'
  import AppFooter from './app-footer'
  import RigthMenu from './right-menu'
  import {FOLDER_TREE} from '@/assets/js/const-value.js'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'app',
    computed: {
      ...mapGetters(['rightMenuShow', 'left', 'top']),
      style() {
        let x = this.left
        let y = this.top
        if (window.innerWidth - x < 200) {
          x = x - 200
        }
        if (window.innerHeight - y < 300) {
          y = y - 300
        }
        return {left: x + 'px', top: y + 'px'}
      }
    },
    created() {
      this.$axios(FOLDER_TREE, {
        params: {
          personId: '59ba8c5c000000880b000002'
        }
      }).then((res) => {
        let dataTree = res.data.data
        dataTree.id = 1
        let data = [dataTree]
        this.setTreeData(data)
      })
    },
    mounted() {
      document.addEventListener('mousedown', () => {
        this.changeMenuShow({isShow: false, left: 0, top: 0})
      })
    },
    methods: {
      ...mapMutations({changeMenuShow: 'CHANGE_RIGHT_MENU_SHOW', setTreeData: 'SET_TREE_DATA'})
    },
    components: {
      AppHeader,
      RigthMenu,
      AppFooter
    }
  }
</script>

<style lang="scss" scoped>

</style>
