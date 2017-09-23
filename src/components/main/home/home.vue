/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="home-container">
    <panel-split :leftWidth="400"
                 :left-max-width="600">
      <left-panel slot="left"></left-panel>
      <right-panel slot="right"></right-panel>
    </panel-split>
  </div>
</template>

<script>
  import PanelSplit from '@/base/panel-split'
  import RightPanel from './content/right/right-panel'
  import LeftPanel from './content/left/left-panel'

  export default {
    components: {
      PanelSplit,
      RightPanel,
      LeftPanel
    }
  }
</script>

<style lang="scss" scoped>

</style>
