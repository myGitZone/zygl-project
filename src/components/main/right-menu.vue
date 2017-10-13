/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="right-menu" :style="style" v-if="rightMenuShow">
    <ul class="menu-list">
      <li class="menu-list-item" @mousedown.stop="downloadClick">下载</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { DOWNLOAD_URL, JWT_TOKEN, LEFT_TREE_MENU, FILE_MENU, BLANK_MENU } from '@/assets/js/const-value'
import { downloadFiles } from '@/assets/js/util'
import Cookies from 'js-cookie'
console.log(BLANK_MENU)
export default {
  computed: {
    ...mapGetters(['rightMenuShow', 'left', 'top', 'menuType', 'fileList', 'currentPath']),
    style() {
      let x = this.left
      let y = this.top
      let maxHeight = 2 * 25 + 20
      if (window.innerWidth - x < 200) {
        x = x - 200
      }
      if (window.innerHeight - y < maxHeight) {
        y = y - maxHeight
      }
      return { left: x + 'px', top: y + 'px' }
    }
  },
  methods: {
    /**
     * 下载点击事件
     */
    downloadClick() {
      if (this.menuType === LEFT_TREE_MENU) {

      } else if (this.menuType === FILE_MENU) {
        let urls = this.fileList.map((item) => {
          return `${DOWNLOAD_URL}?filePath=${this.currentPath}/${item}&authorization=${Cookies.get(JWT_TOKEN)}`
        })
        downloadFiles(urls)
      }
      setTimeout(() => {
        this.changeMenuShow({ isShow: false, left: 0, top: 0, menuType: -1 })
      }, 200)
    },
    ...mapMutations({ changeMenuShow: 'CHANGE_RIGHT_MENU_SHOW' })
  }
}
</script>

<style lang="scss" scoped>
.right-menu {
  position: absolute;
  width: 200px;
  z-index: 9999;
  box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-clip: padding-box;
  background: #fff;
  margin: 0;
  margin-left: 4px;
  font-size: 1.5rem;
  padding: 8px 0px;
  animation-duration: 0.25s;
  .menu-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    .menu-list-item {
      line-height: 25px;
      height: 25px;
      padding: 0 15px 0 20px;
      cursor: pointer;
      &:hover {
        background: #e1e1e1;
      }
    }
  }
}
</style>
