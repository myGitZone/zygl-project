/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="right-menu" :style="style" @mousedown.stop="menuMouseDown">
    <ul class="menu-list" @click="menuClick">
      <li class="menu-list-item" @mouseup.stop="downloadClick">
        <i class="icon-item download-icon vertical"></i>
        <span class="vertical">下载</span>
      </li>
      <li class="menu-list-item" @mouseup.stop="uploadClick">
        <i class="icon-item upload-icon vertical"></i>
        <span class="vertical">上传</span>
      </li>
      <li class="menu-list-item" @mouseup.stop="deleteClick">
        <i class="icon-item delete-icon vertical"></i>
        <span class="vertical">删除</span>
      </li>
      <li class="menu-list-item" @mouseup.stop="newFolderClick">
        <i class="icon-item new-icon vertical"></i>
        <span class="vertical">新建文件夹</span>
      </li>
      <li class="menu-list-item" @mouseup.stop="renameClick" v-show="fileList.length===1||menuType === 0">
        <i class="icon-item rename-icon vertical"></i>
        <span class="vertical">重命名</span>
      </li>
      <li class="menu-list-item" @mouseup.stop="attributeClick" v-show="fileList.length===1||menuType === 0">
        <i class="attribute-icon fa fa-info vertical"></i>
        <span class="vertical">属性</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { DOWNLOAD_URL, JWT_TOKEN, LEFT_TREE_MENU, FILE_MENU, DELETE_FILE_URL, DELETE_FOLDER_URL, CREATE_FOLDER_URL, RENAME_FOLDER, RENAME_FILE, FILE_ATTRIBUTE, FOLDER_ATTRIBUTE } from '@/assets/js/const-value'
import { downloadFiles } from '@/assets/js/util'
import Cookies from 'js-cookie'
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
    ...mapGetters(['left', 'top', 'menuType', 'fileList', 'currentPath'])
  },
  methods: {
    menuMouseDown() {
    },
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
    /**
     * 新建文件夹
     * atime，mtime，ctime就分别代表了访问时间，修改时间以及创建时间
     */
    newFolderClick() {
      let params = new URLSearchParams()
      let path = this.currentPath
      params.append('baseFolder', path)
      params.append('newFolder', '新建文件夹')
      this.$axios.post(CREATE_FOLDER_URL, params).then((res) => {
        if (res.data.status) {
          this.addNewFolder(res.data.newName)
        } else {
          this.$message({
            message: res.data.message
          })
        }
      })
    },
    /**
     * 重命名
     */
    renameClick() {
      let params = new URLSearchParams()
      let url
      let path = this.currentPath
      let oldName
      if (this.menuType === LEFT_TREE_MENU) {
        oldName = path.split('/')
        let pathArr = path.split('/')
        oldName = pathArr[pathArr.length - 1]
        path = pathArr.slice(0, pathArr.length - 1).join('/')
        url = RENAME_FOLDER
      } else if (this.menuType === FILE_MENU) {
        // let name = this.fileList[0]
        oldName = this.fileList[0] // name.substring(0, name.lastIndexOf('.'))
        url = RENAME_FILE
      }
      this.$prompt('请输入文件名称', '重命名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: oldName
      }).then(({ value }) => {
        params.append('oldName', oldName)
        params.append('baseFolder', path)
        params.append('newName', value)
        this.$axios.post(url, params).then((res) => {
          if (res.data.status) {
            if (this.menuType === LEFT_TREE_MENU) {
              let obj = { rootFolder: path, oldName: oldName, newName: value }
              this.updateFolder(obj)
            }
          } else {
            this.$message({
              message: '重命名失败，请刷新后重试'
            })
          }
        })
      }).catch(() => {

      })
    },
    /**
     * 属性查询
     */
    attributeClick() {
      let params = new URLSearchParams()
      let path = this.currentPath
      if (this.menuType === LEFT_TREE_MENU) {
        params.append('folderPath', path)
        let pathArr = path.split('/')
        let folderName = pathArr[pathArr.length - 1]
        this.$axios.post(FOLDER_ATTRIBUTE, params).then((res) => {
          if (res.data.status) {
            res.data.data.name = folderName
            res.data.data.isFolder = true
            this.pushAttribute(res.data.data)
          }
        })
      } else if (this.menuType === FILE_MENU) {
        params.append('filePath', path + '/' + this.fileList[0])
        this.$axios.post(FILE_ATTRIBUTE, params).then((res) => {
          if (res.data.status) {
            res.data.data.name = this.fileList[0]
            this.pushAttribute(res.data.data)
          }
        })
      }
    },
    ...mapMutations({ pushAttribute: 'PUSH_ATTRIBUTE', updateFolder: 'UPDATE_FOLDER_NAME', changeMenuShow: 'CHANGE_RIGHT_MENU_SHOW', deleteNode: 'DELETE_TREE_NODE', deleteFile: 'DELETE_FILE', setUploadState: 'SET_UPLOAD_STATE', addNewFolder: 'ADD_FOLDER_NODE' })
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
      .vertical {
        vertical-align: middle;
      }
      .icon-item {
        display: inline-block;
        width: 16px !important;
        background-size: auto !important;
        background-repeat: no-repeat;
        height: 16px;
        margin-right: 15px;
      }
      .download-icon {
        background-position: -16px -48px;
        background-image: url(../../assets/image/menu_icon.png);
      }
      .upload-icon {
        background-position: 0px -48px;
        background-image: url(../../assets/image/menu_icon.png);
      }
      .delete-icon {
        background-position: 0 -80px;
        background-image: url(../../assets/image/menu_icon.png);
      }
      .new-icon {
        background-position: 0 -15px;
        background-image: url(../../assets/image/menu_icon.png);
      }
      .rename-icon {
        background-position: 0 -64px;
        background-image: url(../../assets/image/menu_icon.png);
      }
      .attribute-icon {
        color: #fff !important;
        background: #c4e5ff;
        text-align: center;
        width: 15px;
        border-radius: 50%;
        height: 15px;
        line-height: 15px;
        margin-right: 15px;
        box-shadow: 0 0 0 1px #6db9f5;
      }
      .fa-info::before {
        color: #249dff;
        background-image: -webkit-linear-gradient(2deg, #249dff, #08558a);
        background-clip: text;
        text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
      }
    }
  }
}
</style>
