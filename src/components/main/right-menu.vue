/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="right-menu" :style="style" v-if="rightMenuShow">
    <ul class="menu-list" @click="menuClick">
      <li class="menu-list-item" @mousedown.stop="downloadClick">下载</li>
      <li class="menu-list-item" @mousedown.stop="uploadClick">上传</li>
      <li class="menu-list-item" @mousedown.stop="deleteClick">删除</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { DOWNLOAD_URL, JWT_TOKEN, LEFT_TREE_MENU, FILE_MENU, DELETE_FILE_URL, DELETE_FOLDER_URL } from '@/assets/js/const-value'
import { downloadFiles } from '@/assets/js/util'
import Cookies from 'js-cookie'
// console.log(BLANK_MENU)
export default {
  computed: {
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
    },
    ...mapGetters(['rightMenuShow', 'left', 'top', 'menuType', 'fileList', 'currentPath', 'leftSelect'])
  },
  methods: {
    /**
     * 右键菜单被点击
     */
    menuClick() {
      this.changeMenuShow({ isShow: false, left: 0, top: 0 })
    },
    /**
     * 下载点击事件
     */
    downloadClick() {
      let urls
      if (this.menuType === LEFT_TREE_MENU) {

      } else if (this.menuType === FILE_MENU) {
        urls = this.fileList.map((item) => {
          return `${DOWNLOAD_URL}?filePath=${this.currentPath}/${item}&authorization=${Cookies.get(JWT_TOKEN)}`
        })
      }
      downloadFiles(urls)
    },
    /**
     * 上传点击事件
     */
    uploadClick() {
      this.setUploadState(true)
    },
    /**
     * 删除点击事件
     */
    deleteClick() {
      let params = new URLSearchParams()
      // 如果点击的是左侧目录是，是文件夹的话，则删除文件夹
      if (this.menuType === LEFT_TREE_MENU) {
        debugger
        let path = this.currentPath
        let pathArr = path.split('/')
        let deleteFolder = pathArr[pathArr.length - 1]
        let rootFolder = pathArr.slice(0, pathArr.length - 1).join('/')
        params.append('delFolder', deleteFolder)
        params.append('baseFolder', rootFolder)
        this.$axios.post(DELETE_FOLDER_URL, params).then((res) => {
          if (res.data.status) {
            this.deleteNode({ rootFolder, deleteFolder })
          } else {
            this.$message({
              message: '刪除失败！'
            })
          }
        })
      } else if (this.menuType === FILE_MENU) {
        // 删除文件所在文件夹
        let path = this.currentPath
        let deleteFiles = this.fileList
        params.append('baseFolder', path)
        params.append('delFileNames', deleteFiles.join('*'))
        this.$axios.post(DELETE_FILE_URL, params).then((res) => {
          if (res.data.status) {
            this.deleteFile(deleteFiles)
          } else {
            this.$message({
              message: '刪除失败！'
            })
          }
        })
      }
    },
    ...mapMutations({ changeMenuShow: 'CHANGE_RIGHT_MENU_SHOW', deleteNode: 'DELETE_TREE_NODE', deleteFile: 'DELETE_FILE', setUploadState: 'SET_UPLOAD_STATE' })
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
