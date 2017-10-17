/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="tree-item-container" @mouseup.prevent.stop="mouseup" @mousedown.prevent.stop="mousedown">
    <i class="font-icon-common" :class="[id===1?'font-icon-home':'font-icon-folder']"></i>
    <span class="item-text">{{info.data.name}}</span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { RIGHT_CODE, LEFT_TREE_MENU } from '@/assets/js/const-value.js'
console.log(LEFT_TREE_MENU)
export default {
  props: {
    info: {
      type: Object
    },
    id: {
      type: Number
    }
  },
  methods: {
    /**
     * 鼠标右键抬起
     */
    mouseup(e) {
      if (e.button === RIGHT_CODE && this.info.data.id !== 1) {
        this.changeMenuShow({ isShow: true, left: e.clientX, top: e.clientY, menuType: LEFT_TREE_MENU })
        let node = this.info
        if (node.data.id && node.data.id === 1) {
          return
        }
        let path = node.data.name
        while (node.parent && node.parent.data.id !== 1) {
          path = node.parent.data.name + '/' + path
          node = node.parent
        }
        this.pushPath(path)
        this.setSelectId(this.info.id)
      }
    },
    /**
     * 鼠标按下
     */
    mousedown(e) {
      this.changeMenuShow({ isShow: false, left: 0, top: 0, menuType: LEFT_TREE_MENU })
    },
    ...mapMutations({ changeMenuShow: 'CHANGE_RIGHT_MENU_SHOW', setSelectId: 'SET_SELECT_ID', pushPath: 'PUSH_PATH' })
  }
}
</script>

<style lang="scss" scoped>
.tree-item-container {
  display: inline-block;
  width: 100%;
  font-size: 10px;
  vertical-align: middle;
  .font-icon-common {
    display: inline-block;
    height: 16px;
    width: 16px !important;
    margin-right: 0px;
    vertical-align: middle;
    background-size: auto !important;
    background-repeat: no-repeat;
  }
  .font-icon-home {
    margin-top: -2px;
    background-image: url("../../../../../assets/image/menu_icon.png");
    background-position: -16px -496px;
  }
  .font-icon-folder {
    height: 18px !important;
    width: 18px !important;
    background-image: url("../../../../../assets/image/folder_win10_small.png");
  }
  .item-text {
    vertical-align: middle;
  }
}
</style>
