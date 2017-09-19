<template>
  <div id="app">
    <app-header></app-header>
    <panel-split :leftWidth="400" :rightWidth="50"
                 :left-max-width="600">
      <left-panel slot="left"></left-panel>
      <right-panel slot="right"></right-panel>
    </panel-split>
    <app-footer></app-footer>
    <rigth-menu ref="rightMenu" v-if="rightMenuShow" :style="style"></rigth-menu>
  </div>
</template>

<script>
  import AppHeader from './components/app-header'
  import AppFooter from './components/app-footer'
  import PanelSplit from '@/base/panel-split'
  import RightPanel from './components/content/right/right-panel'
  import LeftPanel from './components/content/left/left-panel'
  import RigthMenu from './components/right-menu'

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
    mounted() {
      document.addEventListener('mousedown', () => {
        this.changeMenuShow({isShow: false, left: 0, top: 0})
      })
    },
    methods: {
      ...mapMutations({changeMenuShow: 'CHANGE_RIGHT_MENU_SHOW'})
    },
    components: {
      AppHeader,
      PanelSplit,
      RightPanel,
      LeftPanel,
      RigthMenu,
      AppFooter
    }
  }
</script>

<style lang="scss" scoped>

</style>
