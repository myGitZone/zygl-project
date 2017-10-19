/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="home-container">
    <panel-split :leftWidth="400" :left-max-width="600">
      <left-panel slot="left"></left-panel>
      <component :is="componentId" slot="right"></component>
      <!-- <right-panel slot="right"></right-panel> -->
    </panel-split>
  </div>
</template>

<script>
import PanelSplit from '@/base/panel-split'
import RightPanel from './content/right/right-panel'
import LeftPanel from './content/left/left-panel'
import AuthPanel from './content/auth/auth-panel'
import { mapGetters } from 'vuex'
export default {
  computed: {
    componentId() {
      return this.showAuth ? AuthPanel : RightPanel
    },
    ...mapGetters(['showAuth'])
  },
  components: {
    PanelSplit,
    RightPanel,
    LeftPanel,
    AuthPanel
  }
}
</script>

<style lang="scss" scoped>

</style>
